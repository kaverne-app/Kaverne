"use client";

import { useLocalStorageState } from "./use-local-storage-state";
import { EMPTY_VENUE_FILTER, type VenueFilter } from "./venue-view";

// Ein Schlüssel für Liste und Karte, damit die Filterauswahl beim Wechsel
// zwischen beiden erhalten bleibt — nur lokal auf dem Gerät, kein Konto.
const STORAGE_KEY = "kaverne:filter";

export function useVenueFilter() {
  return useLocalStorageState<VenueFilter>(STORAGE_KEY, EMPTY_VENUE_FILTER);
}
