// Erzeugt ein UPDATE-Statement, das nur lat/lon in "venues" setzt — für den
// Fall, dass die Läden schon importiert sind und nur noch die Koordinaten
// aus der Prüfdatei nachgetragen werden sollen (z. B. nach manueller
// Eingabe, weil der Kartendienst nicht erreichbar war).
//
// Aufruf: npx tsx scripts/generate-coordinates-sql.ts [pfad/zur/pruefdatei.csv] > koordinaten.sql

import { readCoordinateReview } from "./lib/coordinates-review";

function main() {
  const reviewPath = process.argv[2] ?? "data/koordinaten-pruefen.csv";
  const review = readCoordinateReview(reviewPath);

  const rows = Array.from(review.values()).filter(
    (row) => row.lat !== "" && row.lon !== "",
  );

  if (rows.length === 0) {
    console.error("Keine Zeilen mit gesetzten Koordinaten in der Prüfdatei gefunden.");
    process.exit(1);
  }

  const values = rows
    .map((row) => `  ('${row.id.replace(/'/g, "''")}', ${Number(row.lat)}, ${Number(row.lon)})`)
    .join(",\n");

  const sql = `begin;

update venues as t set
  lat = v.lat,
  lon = v.lon
from (values
${values}
) as v(id, lat, lon)
where t.id = v.id;

commit;
`;

  process.stdout.write(sql);
}

main();
