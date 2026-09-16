"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import VenueListClient from "./VenueListClient";
import VenueMapClient from "./VenueMapClient";
import type { VenueFilterable } from "@/lib/venues";

// Ansicht lebt wie der Filter in der Adresszeile, nicht im Speicher des
// Geräts — teilbar und über die Zurück-Taste erreichbar.
const VIEW_PARAM = "ansicht";
type View = "liste" | "karte";

export default function ClubsView({ venues }: { venues: VenueFilterable[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const view: View = searchParams.get(VIEW_PARAM) === "karte" ? "karte" : "liste";

  function setView(next: View) {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "liste") params.delete(VIEW_PARAM);
    else params.set(VIEW_PARAM, next);
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <>
      <div className="view-switch" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={view === "liste"}
          className={view === "liste" ? "active" : undefined}
          onClick={() => setView("liste")}
        >
          Liste
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={view === "karte"}
          className={view === "karte" ? "active" : undefined}
          onClick={() => setView("karte")}
        >
          Karte
        </button>
      </div>
      {view === "liste" ? (
        <VenueListClient venues={venues} />
      ) : (
        <VenueMapClient venues={venues} />
      )}
    </>
  );
}
