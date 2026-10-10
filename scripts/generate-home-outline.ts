// Erzeugt lib/home-map-outline.ts aus Natural Earth "Admin 1 – States,
// Provinces" (10m, gemeinfrei): nur Rheinland-Pfalz, Hessen, Saarland und
// Baden-Württemberg, stark vereinfacht.
//
//   npx tsx scripts/generate-home-outline.ts <ne_10m_admin_1_states_provinces.geojson>
import { readFileSync, writeFileSync } from "node:fs";
import { projectRaw } from "../lib/home-map-projection";

const LAENDER = ["Rheinland-Pfalz", "Hessen", "Saarland", "Baden-Württemberg"];
const TOLERANZ = 0.012; // in Projektionseinheiten (Grad), ca. 1 km
const SKALIERUNG = 100; // Einheiten pro Grad im fertigen Pfad
const RAND = 3;

type Pt = [number, number];

function dist2(p: Pt, a: Pt, b: Pt) {
  const [dx, dy] = [b[0] - a[0], b[1] - a[1]];
  const len2 = dx * dx + dy * dy;
  let t = len2 === 0 ? 0 : ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / len2;
  t = Math.max(0, Math.min(1, t));
  const [ex, ey] = [a[0] + t * dx - p[0], a[1] + t * dy - p[1]];
  return ex * ex + ey * ey;
}

function simplify(pts: Pt[], tol: number): Pt[] {
  if (pts.length < 3) return pts;
  const keep = new Array(pts.length).fill(false);
  keep[0] = keep[pts.length - 1] = true;
  const stack: [number, number][] = [[0, pts.length - 1]];
  while (stack.length) {
    const [s, e] = stack.pop()!;
    let max = 0;
    let idx = -1;
    for (let i = s + 1; i < e; i++) {
      const d = dist2(pts[i], pts[s], pts[e]);
      if (d > max) [max, idx] = [d, i];
    }
    if (max > tol * tol) {
      keep[idx] = true;
      stack.push([s, idx], [idx, e]);
    }
  }
  return pts.filter((_, i) => keep[i]);
}

const [, , eingabe] = process.argv;
if (!eingabe) throw new Error("Pfad zur GeoJSON-Datei fehlt.");
const geo = JSON.parse(readFileSync(eingabe, "utf8"));

const ringe: { name: string; punkte: Pt[] }[] = [];
for (const f of geo.features) {
  const p = f.properties;
  if (p.admin !== "Germany" || !LAENDER.includes(p.name)) continue;
  const polys = f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates;
  for (const poly of polys) {
    // Nur der Außenring; Löcher gibt es hier nicht.
    const raw = (poly[0] as number[][]).map(([lon, lat]) => projectRaw(lon, lat));
    ringe.push({ name: p.name, punkte: simplify(raw, TOLERANZ) });
  }
}

let [minX, minY, maxX, maxY] = [Infinity, Infinity, -Infinity, -Infinity];
for (const r of ringe)
  for (const [x, y] of r.punkte) {
    minX = Math.min(minX, x); maxX = Math.max(maxX, x);
    minY = Math.min(minY, y); maxY = Math.max(maxY, y);
  }
const ursprung: Pt = [minX - RAND / SKALIERUNG, minY - RAND / SKALIERUNG];
const breite = Math.round((maxX - minX) * SKALIERUNG + 2 * RAND);
const hoehe = Math.round((maxY - minY) * SKALIERUNG + 2 * RAND);

const pfade = LAENDER.map((name) => {
  const d = ringe
    .filter((r) => r.name === name)
    .map((r) =>
      r.punkte
        .map(([x, y], i) => {
          const px = ((x - ursprung[0]) * SKALIERUNG).toFixed(1);
          const py = ((y - ursprung[1]) * SKALIERUNG).toFixed(1);
          return `${i === 0 ? "M" : "L"}${px} ${py}`;
        })
        .join("") + "Z",
    )
    .join("");
  return { name, d };
});

const ausgabe = `// Erzeugt von scripts/generate-home-outline.ts — nicht von Hand ändern.
// Quelle: Natural Earth, Admin 1 – States, Provinces (10m), gemeinfrei
// (Public Domain, https://www.naturalearthdata.com/about/terms-of-use/).
// Vereinfacht; nur Rheinland-Pfalz, Hessen, Saarland, Baden-Württemberg.
export const HOME_MAP = ${JSON.stringify(
  { breite, hoehe, ursprung, skalierung: SKALIERUNG, pfade },
  null,
  2,
)} as const;
`;
writeFileSync(new URL("../lib/home-map-outline.ts", import.meta.url), ausgabe);
console.log(`${breite}x${hoehe}, ${(ausgabe.length / 1024).toFixed(1)} KB`);
