// Liest alle Zeilen aus "venues" mit dem öffentlichen Schlüssel und schreibt
// sie nach data/venues.json — der nächtliche Datenstand aus A-15
// (siehe .github/workflows/naechtlicher-datenstand.yml). Läuft ohne
// service_role-Key, kann also nichts lesen oder schreiben, was RLS nicht
// ohnehin öffentlich freigibt.
//
// Aufruf: npx tsx scripts/export-venues.ts

import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { mkdirSync, writeFileSync } from "node:fs";

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    console.error(
      "NEXT_PUBLIC_SUPABASE_URL und NEXT_PUBLIC_SUPABASE_ANON_KEY müssen gesetzt sein (siehe .env.example).",
    );
    process.exit(1);
  }

  const supabase = createClient(url, anonKey);
  const { data, error } = await supabase.from("venues").select("*").order("id");
  if (error) {
    console.error("Fehler beim Lesen von venues:", error.message);
    process.exit(1);
  }

  mkdirSync("data", { recursive: true });
  writeFileSync("data/venues.json", JSON.stringify(data, null, 2) + "\n");
  console.log(`${data.length} Läden nach data/venues.json geschrieben.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
