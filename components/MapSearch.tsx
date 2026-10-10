"use client";

import { useEffect, useRef, useState } from "react";
import {
  MIN_QUERY_LENGTH,
  parsePlaces,
  searchUrl,
  type PlaceHit,
} from "@/lib/place-search";

// Wartezeit nach dem letzten Tastendruck, damit der Suchdienst nicht bei
// jedem Buchstaben angefragt wird.
const DEBOUNCE_MS = 400;

type Props = {
  onSelect: (hit: PlaceHit) => void;
  onClear: () => void;
};

export default function MapSearch({ onSelect, onClear }: Props) {
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<PlaceHit[]>([]);
  const [open, setOpen] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [failed, setFailed] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function cancel() {
    if (timerRef.current) clearTimeout(timerRef.current);
    abortRef.current?.abort();
  }

  useEffect(() => cancel, []);

  // Angefragt wird erst nach Eingabe, nie beim Laden der Karte.
  async function run(text: string) {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const res = await fetch(searchUrl(text), { signal: controller.signal });
      if (!res.ok) throw new Error(String(res.status));
      const found = parsePlaces(await res.json());
      setHits(found);
      setEmpty(found.length === 0);
      setFailed(false);
      setOpen(true);
    } catch (error) {
      if ((error as Error).name === "AbortError") return;
      setHits([]);
      setEmpty(false);
      setFailed(true);
      setOpen(true);
    }
  }

  function change(text: string) {
    setQuery(text);
    cancel();
    if (text.trim().length < MIN_QUERY_LENGTH) {
      setHits([]);
      setOpen(false);
      setEmpty(false);
      setFailed(false);
      return;
    }
    timerRef.current = setTimeout(() => run(text.trim()), DEBOUNCE_MS);
  }

  function pick(hit: PlaceHit) {
    cancel();
    setQuery(hit.label);
    setOpen(false);
    onSelect(hit);
  }

  function clear() {
    cancel();
    setQuery("");
    setHits([]);
    setOpen(false);
    setEmpty(false);
    setFailed(false);
    onClear();
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (hits[0] && open) pick(hits[0]);
    else if (query.trim().length >= MIN_QUERY_LENGTH) {
      cancel();
      run(query.trim());
    }
  }

  return (
    <form className="map-search" role="search" onSubmit={submit}>
      <div className="map-search-field">
        <input
          type="search"
          className="map-search-input"
          placeholder="Ort oder Adresse suchen"
          aria-label="Ort oder Adresse suchen"
          autoComplete="off"
          enterKeyHint="search"
          value={query}
          onChange={(e) => change(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        />
        {query && (
          <button type="button" className="map-search-clear" aria-label="Suche löschen" onClick={clear}>
            ×
          </button>
        )}
      </div>
      <ul className="map-search-list" hidden={!open}>
        {hits.map((hit) => (
          <li key={`${hit.lon},${hit.lat},${hit.label}`}>
            <button type="button" onClick={() => pick(hit)}>
              {hit.label}
            </button>
          </li>
        ))}
        {empty && <li className="map-search-note">Nichts gefunden.</li>}
        {failed && <li className="map-search-note">Suche gerade nicht erreichbar.</li>}
      </ul>
    </form>
  );
}
