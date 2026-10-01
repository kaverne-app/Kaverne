// Erzeugt eine fertige SQL-Datei zum Einfügen im Supabase SQL Editor —
// für alle, die den Import nicht über die Kommandozeile laufen lassen
// wollen. Nutzt dieselbe CSV-Umwandlung wie import.ts, schreibt aber
// INSERT-Anweisungen statt direkt in eine Datenbank zu schreiben.
//
// Aufruf: npx tsx scripts/generate-import-sql.ts pfad/zur/datei.csv [pfad/zur/pruefdatei.csv] > import.sql

import { confirmUnknownValuesOrExit } from "./lib/confirm-unknown-values";
import { readCoordinateReview } from "./lib/coordinates-review";
import { readVenueCsv } from "./lib/read-csv";
import type { VenueRow } from "./lib/types";

function sqlString(value: string | null): string {
  if (value === null) return "NULL";
  return `'${value.replace(/'/g, "''")}'`;
}

function sqlNumber(value: number | null): string {
  return value === null ? "NULL" : String(value);
}

function sqlTextArray(values: string[] | null): string {
  if (values === null) return "NULL";
  return `ARRAY[${values.map((v) => sqlString(v)).join(",")}]::text[]`;
}

function sqlJsonb(value: unknown): string {
  if (value === null) return "NULL";
  return `${sqlString(JSON.stringify(value))}::jsonb`;
}

const VENUE_COLUMNS = [
  "id",
  "name",
  "typ",
  "stadt",
  "adresse",
  "lat",
  "lon",
  "genres",
  "status",
  "oeffnungstage",
  "kurzbeschreibung",
  "kartenzahlung",
  "garderobe",
  "raucherbereich",
  "aussenbereich",
  "haltestelle",
  "links",
];

function venueValues(venue: VenueRow, lat: number | null, lon: number | null): string {
  const values = [
    sqlString(venue.id),
    sqlString(venue.name),
    sqlString(venue.typ),
    sqlString(venue.stadt),
    sqlString(venue.adresse),
    sqlNumber(lat),
    sqlNumber(lon),
    sqlTextArray(venue.genres),
    sqlString(venue.status),
    sqlTextArray(venue.oeffnungstage),
    sqlString(venue.kurzbeschreibung),
    sqlString(venue.kartenzahlung),
    sqlString(venue.garderobe),
    sqlString(venue.raucherbereich),
    sqlString(venue.aussenbereich),
    sqlString(venue.haltestelle),
    sqlJsonb(venue.links),
  ];
  return `(${values.join(",")})`;
}

async function main() {
  const csvPath = process.argv[2];
  const reviewPath = process.argv[3] ?? "data/koordinaten-pruefen.csv";
  if (!csvPath) {
    console.error(
      "Bitte Pfad zur CSV-Datei angeben: npx tsx scripts/generate-import-sql.ts datei.csv",
    );
    process.exit(1);
  }

  const { venues, lineNumbers } = readVenueCsv(csvPath);
  const coordinateReview = readCoordinateReview(reviewPath);

  await confirmUnknownValuesOrExit(
    venues.map((v) => ({
      zeile: lineNumbers.get(v.id) ?? 0,
      id: v.id,
      typ: v.typ,
      genres: v.genres,
    })),
  );

  const venueRows = venues.map((venue) => {
    const review = coordinateReview.get(venue.id);
    const lat = review?.lat ? Number(review.lat) : null;
    const lon = review?.lon ? Number(review.lon) : null;
    return venueValues(venue, lat, lon);
  });

  const venueUpdateSet = VENUE_COLUMNS.filter((c) => c !== "id")
    .map((c) => `${c} = excluded.${c}`)
    .join(",\n    ");

  const sql = `begin;

insert into venues (${VENUE_COLUMNS.join(", ")})
values
  ${venueRows.join(",\n  ")}
on conflict (id) do update set
    ${venueUpdateSet};

commit;
`;

  process.stdout.write(sql);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
