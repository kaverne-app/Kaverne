"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type VenueFilter } from "./venue-view";

// Filterzustand lebt in der Adresszeile (kein Speicher auf dem Gerät), damit
// eine Auswahl teilbar ist und die Zurück-Taste durch vorherige Auswahlen
// blättert statt die Seite zu verlassen.
const STADT_PARAM = "stadt";
const GENRE_PARAM = "genre";

function parseList(value: string | null): string[] {
  return value ? value.split(",").filter(Boolean) : [];
}

export function useVenueFilter(): [VenueFilter, (filter: VenueFilter) => void] {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filter = useMemo<VenueFilter>(
    () => ({
      stadte: parseList(searchParams.get(STADT_PARAM)),
      genres: parseList(searchParams.get(GENRE_PARAM)),
    }),
    [searchParams],
  );

  const setFilter = useCallback(
    (next: VenueFilter) => {
      const params = new URLSearchParams();
      if (next.stadte.length > 0) params.set(STADT_PARAM, next.stadte.join(","));
      if (next.genres.length > 0) params.set(GENRE_PARAM, next.genres.join(","));
      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname);
    },
    [router, pathname],
  );

  return [filter, setFilter];
}
