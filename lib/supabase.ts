import { createClient } from "@supabase/supabase-js";

export function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL und NEXT_PUBLIC_SUPABASE_ANON_KEY müssen gesetzt sein (siehe .env.example).",
    );
  }
  return createClient(url, anonKey, {
    global: {
      // Next.js cacht fetch()-Aufrufe standardmäßig, auch wenn eine Seite
      // dynamic="force-dynamic" gesetzt hat — ohne das hier bliebe die App
      // nach einem neuen Import/Update in Supabase auf altem Stand, bis
      // neu deployt wird.
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
    },
  });
}
