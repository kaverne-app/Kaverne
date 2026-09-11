// Importiert einen CSV-Export nach Supabase.
// Aufruf: npm run import -- pfad/zur/datei.csv [pfad/zur/pruefdatei.csv]
//
// Setzt voraus, dass vorher `npm run geocode -- pfad/zur/datei.csv` gelaufen
// ist und die Koordinaten-Prüfdatei kontrolliert wurde. Läden ohne bestätigte
// Koordinaten in der Prüfdatei werden trotzdem importiert, nur ohne lat/lon —
// sie tauchen später auf der Karte nicht auf, bis das nachgetragen ist.
//
// Der Import läuft über den service_role-Key (umgeht Row Level Security) und
// ist wiederholbar: bestehende Zeilen werden anhand der id aktualisiert,
// keine Dubletten.

import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { readCoordinateReview } from "./lib/coordinates-review";
import { readVenueCsv } from "./lib/read-csv";

async function main() {
  const csvPath = process.argv[2];
  const reviewPath = process.argv[3] ?? "data/koordinaten-pruefen.csv";

  if (!csvPath) {
    console.error("Bitte Pfad zur CSV-Datei angeben: npm run import -- datei.csv");
    process.exit(1);
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    console.error(
      "SUPABASE_URL und SUPABASE_SERVICE_ROLE_KEY müssen gesetzt sein (siehe .env.example).",
    );
    process.exit(1);
  }

  const { venues, internal } = readVenueCsv(csvPath);
  const coordinateReview = readCoordinateReview(reviewPath);

  const missingCoordinates: string[] = [];
  const venuesWithCoordinates = venues.map((venue) => {
    const review = coordinateReview.get(venue.id);
    const lat = review?.lat ? Number(review.lat) : null;
    const lon = review?.lon ? Number(review.lon) : null;
    if (lat === null || lon === null) missingCoordinates.push(venue.id);
    return { ...venue, lat, lon };
  });

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  console.log(`Importiere ${venuesWithCoordinates.length} Läden nach "venues" ...`);
  const { error: venuesError } = await supabase
    .from("venues")
    .upsert(venuesWithCoordinates, { onConflict: "id" });
  if (venuesError) {
    console.error("Fehler beim Import von venues:", venuesError.message);
    process.exit(1);
  }

  console.log(`Importiere ${internal.length} Zeilen nach "venues_internal" ...`);
  const { error: internalError } = await supabase
    .from("venues_internal")
    .upsert(internal, { onConflict: "venue_id" });
  if (internalError) {
    console.error("Fehler beim Import von venues_internal:", internalError.message);
    process.exit(1);
  }

  console.log("");
  console.log("Fertig.");
  if (missingCoordinates.length > 0) {
    console.log(
      `${missingCoordinates.length} Laden/Läden ohne bestätigte Koordinaten (kein lat/lon gesetzt):`,
    );
    for (const id of missingCoordinates) console.log(`  - ${id}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
