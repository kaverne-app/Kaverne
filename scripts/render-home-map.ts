// Erzeugt das feste Kartenbild der Startseite (public/home-map/*.webp):
// OpenFreeMap "Liberty", mit denselben Dämpfungsregeln wie die Kartenansicht,
// im Ausschnitt aus lib/home-map-projection.ts. Läuft als GitHub-Action
// (.github/workflows/render-home-map.yml), weil es Zugriff auf OpenFreeMap
// und einen Browser braucht. Neu erzeugen nur, wenn sich Kartenstil oder
// Ausschnitt ändern.
//
//   npm i --no-save playwright sharp && npx tsx scripts/render-home-map.ts
import { chromium } from "playwright";
import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";
import { buildMutedStyle, STYLE_URL } from "../components/mapMutedStyle";
import { HOME_MAP_FRAME, zoomForFrame } from "../lib/home-map-projection";

const AUSGABE = "public/home-map";
const BREITEN = [480, 720, 960];
const MAPLIBRE = `${process.cwd()}/node_modules/maplibre-gl/dist`;

async function main() {
  const f = HOME_MAP_FRAME;
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
    { style, f, zoom: zoomForFrame() },
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
