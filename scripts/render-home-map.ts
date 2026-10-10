// Erzeugt das feste Kartenbild der Startseite (public/home-map/*.webp):
// OpenFreeMap "Liberty", mit denselben Dämpfungsregeln wie die Kartenansicht,
// im Ausschnitt aus lib/home-map-frame.json (wird hier aus den Läden in
// data/venues.json berechnet, nur bei Änderung neu gerendert). Läuft als GitHub-Action
// (.github/workflows/render-home-map.yml), weil es Zugriff auf OpenFreeMap
// und einen Browser braucht. Neu erzeugen nur, wenn sich Kartenstil oder
// Ausschnitt ändern.
//
//   npm i --no-save playwright sharp && npx tsx scripts/render-home-map.ts
import { chromium } from "playwright";
import sharp from "sharp";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { buildMutedStyle, STYLE_URL } from "../components/mapMutedStyle";
import { HOME_MAP_FRAME, mercatorY, zoomForFrame } from "../lib/home-map-projection";

const AUSGABE = "public/home-map";
const BREITEN = [480, 720, 960];
const MAPLIBRE = `${process.cwd()}/node_modules/maplibre-gl/dist`;

const FRAME_DATEI = "lib/home-map-frame.json";
// Mindestens die vier Länder (Rheinland-Pfalz, Hessen, Saarland,
// Baden-Württemberg), dazu alle Läden aus data/venues.json, mit Rand.
const GRUNDFLAECHE = { west: 6.1, ost: 10.5, sued: 47.5, nord: 51.7 };
const RAND = 0.04;

// Kleinster Ausschnitt im Bildverhältnis, der Grundfläche und alle Läden
// enthält. Auf feste Schritte gerundet, damit er sich nur ändert, wenn ein
// Laden wirklich herausfällt — nicht bei jeder Kleinigkeit.
function berechneAusschnitt() {
  const venues: { lat: number | null; lon: number | null }[] = JSON.parse(
    readFileSync("data/venues.json", "utf8"),
  );
  let { west, ost, sued, nord } = GRUNDFLAECHE;
  for (const v of venues) {
    if (typeof v.lat !== "number" || typeof v.lon !== "number") continue;
    west = Math.min(west, v.lon);
    ost = Math.max(ost, v.lon);
    sued = Math.min(sued, v.lat);
    nord = Math.max(nord, v.lat);
  }
  const k = 1 - 2 * RAND;
  const x = ost - west;
  const y = mercatorY(nord) - mercatorY(sued);
  const lonSpan = Math.ceil((Math.max(x, (y * HOME_MAP_FRAME.width) / HOME_MAP_FRAME.height) / k) * 10) / 10;
  const mitteLon = (west + ost) / 2;
  const mitteY = (mercatorY(nord) + mercatorY(sued)) / 2;
  const mitteLat = ((2 * Math.atan(Math.exp((mitteY * Math.PI) / 180)) - Math.PI / 2) * 180) / Math.PI;
  const runde = (n: number) => Math.round(n * 20) / 20;
  return { centerLon: runde(mitteLon), centerLat: runde(mitteLat), lonSpan };
}

async function main() {
  const neu = berechneAusschnitt();
  const alt = existsSync(FRAME_DATEI) ? JSON.parse(readFileSync(FRAME_DATEI, "utf8")) : null;
  const gleich = alt && JSON.stringify(alt) === JSON.stringify(neu);
  console.log("Ausschnitt:", JSON.stringify(neu), gleich ? "(unverändert)" : "(neu)");
  if (gleich && existsSync(`${AUSGABE}/home-map-960.webp`) && !process.env.FORCE) {
    console.log("Bild passt noch, nichts zu tun (FORCE=1 erzwingt neues Rendern).");
    return;
  }
  writeFileSync(FRAME_DATEI, JSON.stringify(neu, null, 2) + "\n");
  const f = { ...neu, width: HOME_MAP_FRAME.width, height: HOME_MAP_FRAME.height };
  const roh = await (await fetch(STYLE_URL)).json();
  const style = buildMutedStyle(roh);

  // Zur Doku: was die Quellen als Namensnennung angeben.
  for (const [name, quelle] of Object.entries<{ url?: string; attribution?: string }>(
    roh.sources ?? {},
  )) {
    let text = quelle.attribution;
    if (!text && quelle.url) text = (await (await fetch(quelle.url)).json()).attribution;
    console.log(`Quelle ${name}: ${text ?? "(keine Angabe)"}`);
  }

  const browser = await chromium.launch({
    args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
  });
  const page = await browser.newPage({
    viewport: { width: f.width, height: f.height },
    deviceScaleFactor: 2,
  });
  page.on("console", (m) => console.log("Browser:", m.text()));
  await page.setContent(
    `<html><body style="margin:0;background:#0d0d0e"><div id="map" style="width:${f.width}px;height:${f.height}px"></div></body></html>`,
  );
  await page.addStyleTag({ path: `${MAPLIBRE}/maplibre-gl.css` });
  await page.addScriptTag({ path: `${MAPLIBRE}/maplibre-gl.js` });

  const grenzen = await page.evaluate(
    ({ style, f, zoom }) =>
      new Promise<unknown>((resolve, reject) => {
        // @ts-expect-error maplibregl kommt aus dem eingebundenen Skript
        const map = new maplibregl.Map({
          container: "map",
          style,
          center: [f.centerLon, f.centerLat],
          zoom,
          interactive: false,
          attributionControl: false,
          fadeDuration: 0,
        });
        map.on("error", (e: { error?: Error }) => console.log("Kartenfehler:", e.error?.message));
        map.once("idle", () => setTimeout(() => resolve(map.getBounds().toArray()), 1500));
        setTimeout(() => reject(new Error("Karte wurde nicht fertig")), 90000);
      }),
    { style, f, zoom: zoomForFrame(f) },
  );
  console.log("Sichtbarer Ausschnitt (West/Süd, Ost/Nord):", JSON.stringify(grenzen));

  const png = await page.locator("#map").screenshot({ type: "png" });
  await browser.close();

  mkdirSync(AUSGABE, { recursive: true });
  for (const breite of BREITEN) {
    const webp = await sharp(png).resize({ width: breite }).webp({ quality: 78, effort: 6 }).toBuffer();
    writeFileSync(`${AUSGABE}/home-map-${breite}.webp`, webp);
    console.log(`home-map-${breite}.webp: ${(webp.length / 1024).toFixed(1)} KB`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
