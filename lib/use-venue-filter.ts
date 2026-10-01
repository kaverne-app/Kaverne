"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type VenueFilter } from "./venue-view";

// Filterzustand lebt in der Adresszeile (kein Speicher auf dem Gerät), damit
// eine Auswahl teilbar ist und die Zurück-Taste durch vorherige Auswahlen
// blättert statt die Seite zu verlassen.
const STADT_PARAM = "stadt";
const GENRE_PARAM = "genre";

// Einziger Wert im Browser-Speicher für die Auswahl: der Name der zuletzt
// aktiv gewählten Stadt. Sonst nichts (kein Standort, keine Genres).
const STORED_CITY_KEY = "kaverne-stadt";

function readStoredCity(): string | null {
  try {
    return window.localStorage.getItem(STORED_CITY_KEY);
  } catch {
    return null;
  }
}

function writeStoredCity(stadt: string | null) {
  try {
    if (stadt) window.localStorage.setItem(STORED_CITY_KEY, stadt);
    else window.localStorage.removeItem(STORED_CITY_KEY);
  } catch {
    // Speicher gesperrt — die Auswahl gilt dann nur für diesen Besuch.
  }
}

function parseList(value: string | null): string[] {
  return value ? value.split(",").filter(Boolean) : [];
}

// knownCities: alle Städte, die es gibt — eine gemerkte Stadt, die es nicht
// mehr gibt, wird nicht gesetzt.
export function useVenueFilter(
  knownCities: string[],
): [VenueFilter, (filter: VenueFilter) => void] {
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

  const restored = useRef(false);

  useEffect(() => {
    // Nur beim ersten Aufruf und nur, wenn die Adresse keine Stadt vorgibt
    // (eine geteilte Adresse hat Vorrang).
    if (restored.current) return;
    restored.current = true;
    if (searchParams.get(STADT_PARAM)) return;
    const stored = readStoredCity();
    if (!stored || !knownCities.includes(stored)) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set(STADT_PARAM, stored);
    router.replace(`${pathname}?${params.toString()}`);
  }, [searchParams, knownCities, router, pathname]);

  const setFilter = useCallback(
    (next: VenueFilter) => {
      // Gemerkt wird erst nach aktiver Auswahl: die zuletzt hinzugefügte
      // Stadt; bei leerer Auswahl wird der Eintrag entfernt.
      const added = next.stadte.filter((s) => !filter.stadte.includes(s));
      if (next.stadte.length === 0) writeStoredCity(null);
      else if (added.length > 0) writeStoredCity(added[added.length - 1]);
      else if (!next.stadte.includes(readStoredCity() ?? "")) {
        writeStoredCity(next.stadte[next.stadte.length - 1]);
      }

      // Andere Parameter (z. B. die Ansicht auf /clubs) bleiben erhalten,
      // nur Stadt und Genre werden hier verändert.
      const params = new URLSearchParams(searchParams.toString());
      if (next.stadte.length > 0) params.set(STADT_PARAM, next.stadte.join(","));
      else params.delete(STADT_PARAM);
      if (next.genres.length > 0) params.set(GENRE_PARAM, next.genres.join(","));
      else params.delete(GENRE_PARAM);
      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname);
    },
    [router, pathname, searchParams, filter],
  );

  return [filter, setFilter];
}
