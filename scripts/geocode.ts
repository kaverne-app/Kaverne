// Erzeugt/aktualisiert die Koordinaten-Prüfdatei aus einem CSV-Export.
// Aufruf: npm run geocode -- pfad/zur/datei.csv [pfad/zur/pruefdatei.csv]
//
// Adressen, aus der Tabelle keine Koordinaten hatten, werden über den freien
// Nominatim-Dienst (OpenStreetMap) geocodiert. Zeilen, die in der Prüfdatei
// schon Koordinaten haben, werden nicht erneut angefasst — so gehen manuelle
// Korrekturen bei einem erneuten Lauf nicht verloren.

import { readCoordinateReview, writeCoordinateReview } from "./lib/coordinates-review";
import { readVenueCsv } from "./lib/read-csv";
import type { CoordinateReviewRow } from "./lib/types";

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
const USER_AGENT = "kaverne-import/0.1 (privates Club-Verzeichnis)";
const RATE_LIMIT_MS = 1100; // Nominatim-Nutzungsbedingungen: max. 1 Anfrage/Sekunde

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function geocodeAddress(
  adresse: string,
): Promise<{ lat: number; lon: number; displayName: string } | null> {
  const url = `${NOMINATIM_URL}?format=json&limit=1&q=${encodeURIComponent(adresse)}`;
  const response = await fetch(url, {
    headers: { "User-Agent": USER_AGENT },
  });
  if (!response.ok) {
    throw new Error(`Nominatim-Fehler ${response.status} für "${adresse}"`);
  }
  const results = (await response.json()) as Array<{
    lat: string;
    lon: string;
    display_name: string;
  }>;
  if (results.length === 0) return null;
  const [first] = results;
  return {
    lat: Number(first.lat),
    lon: Number(first.lon),
    displayName: first.display_name,
  };
}

async function main() {
  const csvPath = process.argv[2];
  const reviewPath = process.argv[3] ?? "data/koordinaten-pruefen.csv";

  if (!csvPath) {
    console.error("Bitte Pfad zur CSV-Datei angeben: npm run geocode -- datei.csv");
    process.exit(1);
  }

  const { inlineCoordinates, addresses } = readVenueCsv(csvPath);
  const existingReview = readCoordinateReview(reviewPath);

  const outputRows: CoordinateReviewRow[] = [];
  let reused = 0;
  let fromSheet = 0;
  let geocoded = 0;
  let notFound = 0;

  // 1. Zeilen, die in der Tabelle bereits Koordinaten hatten.
  for (const [id, [lat, lon]] of inlineCoordinates) {
    const existing = existingReview.get(id);
    if (existing && existing.lat !== "" && existing.lon !== "") {
      outputRows.push(existing);
      reused += 1;
      continue;
    }
    outputRows.push({
      id,
      name: existing?.name ?? id,
      adresse: existing?.adresse ?? "",
      lat: String(lat),
      lon: String(lon),
      quelle: "tabelle",
      hinweis: "",
    });
    fromSheet += 1;
  }

  // 2. Adressen, die geocodiert werden müssen.
  for (const [id, { name, adresse }] of addresses) {
    const existing = existingReview.get(id);
    if (existing && existing.lat !== "" && existing.lon !== "") {
      outputRows.push(existing);
      reused += 1;
      continue;
    }

    console.log(`Geocodiere: ${name} (${adresse})`);
    let result: Awaited<ReturnType<typeof geocodeAddress>> = null;
    let fetchFailed = false;
    try {
      result = await geocodeAddress(adresse);
    } catch (error) {
      fetchFailed = true;
      console.error(`  Fehler: ${(error as Error).message}`);
    }
    await sleep(RATE_LIMIT_MS);

    if (result) {
      outputRows.push({
        id,
        name,
        adresse,
        lat: String(result.lat),
        lon: String(result.lon),
        quelle: "nominatim",
        hinweis: result.displayName,
      });
      geocoded += 1;
    } else if (fetchFailed) {
      // Kein Ergebnis eingetragen, damit der nächste Lauf es erneut versucht,
      // statt einen echten "kein Treffer" vorzutäuschen.
      outputRows.push({
        id,
        name,
        adresse,
        lat: "",
        lon: "",
        quelle: "nominatim",
        hinweis: "Abruf fehlgeschlagen — bitte erneut versuchen oder lat/lon von Hand eintragen",
      });
      notFound += 1;
    } else {
      outputRows.push({
        id,
        name,
        adresse,
        lat: "",
        lon: "",
        quelle: "nominatim",
        hinweis: "kein Treffer — bitte lat/lon von Hand eintragen",
      });
      notFound += 1;
    }
  }

  writeCoordinateReview(reviewPath, outputRows);

  console.log("");
  console.log(`Fertig. Prüfdatei: ${reviewPath}`);
  console.log(
    `  ${reused} bereits geprüft, ${fromSheet} aus der Tabelle übernommen, ` +
      `${geocoded} frisch geocodiert, ${notFound} ohne Treffer.`,
  );
  if (notFound > 0) {
    console.log(
      `  ${notFound} Adresse(n) ohne Treffer — bitte in der Prüfdatei von Hand ergänzen.`,
    );
  }
  console.log(
    "Bitte die Datei vor dem Import öffnen und die Koordinaten prüfen.",
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
