"use client";

import { useEffect, useState } from "react";

// Lädt den Wert nach dem ersten Rendern aus localStorage nach (nie beim
// Server-Rendern verfügbar) und schreibt spätere Änderungen zurück.
export function useLocalStorageState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) setValue(JSON.parse(raw));
    } catch {
      // localStorage nicht verfügbar (z. B. privater Modus) — beim Anfangswert bleiben.
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore
    }
  }, [key, value, hydrated]);

  return [value, setValue] as const;
}
