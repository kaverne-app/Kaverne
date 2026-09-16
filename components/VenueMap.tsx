"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { VenuePin } from "@/lib/venues";
import { applyMutedMapStyle } from "./mapMutedStyle";

// OpenFreeMap: freier, unbegrenzter Kartenstil ohne API-Schlüssel, kein
// Google-Dienst beteiligt.
const STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";

export default function VenueMap({ venues }: { venues: VenuePin[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [selected, setSelected] = useState<VenuePin | null>(null);

  useEffect(() => {
    if (!containerRef.current || venues.length === 0) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: STYLE_URL,
      center: [venues[0].lon, venues[0].lat],
      zoom: 10,
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    map.on("load", () => applyMutedMapStyle(map));

    const elements = new Map<string, HTMLButtonElement>();
    let selectedId: string | null = null;

    function select(venue: VenuePin) {
      if (selectedId) elements.get(selectedId)?.classList.remove("venue-pin--selected");
      selectedId = venue.id;
      elements.get(venue.id)?.classList.add("venue-pin--selected");
      setSelected(venue);
    }

    function deselect() {
      if (selectedId) elements.get(selectedId)?.classList.remove("venue-pin--selected");
      selectedId = null;
      setSelected(null);
    }

    for (const venue of venues) {
      const el = document.createElement("button");
      el.type = "button";
      el.className =
        venue.status === "unregelmäßig"
          ? "venue-pin venue-pin--unregelmaessig"
          : "venue-pin";
      el.setAttribute("aria-label", venue.name);
      elements.set(venue.id, el);

      new maplibregl.Marker({ element: el }).setLngLat([venue.lon, venue.lat]).addTo(map);

      el.addEventListener("click", (event) => {
        event.stopPropagation();
        select(venue);
      });
    }

    if (venues.length > 1) {
      const bounds = venues.reduce(
        (b, v) => b.extend([v.lon, v.lat] as [number, number]),
        new maplibregl.LngLatBounds(
          [venues[0].lon, venues[0].lat],
          [venues[0].lon, venues[0].lat],
        ),
      );
      map.fitBounds(bounds, { padding: 48, maxZoom: 14, duration: 0 });
    }

    map.on("click", deselect);

    return () => map.remove();
  }, [venues]);

  return (
    <div className="venue-map-wrap">
      <div ref={containerRef} className="venue-map" />
      {selected && (
        <button
          type="button"
          className="venue-map-card"
          onClick={() => router.push(`/venues/${selected.id}`)}
        >
          <span className="venue-map-card-name">{selected.name}</span>
          <span className="venue-map-card-meta">
            {[selected.stadt, selected.typ].filter(Boolean).join(" · ")}
          </span>
        </button>
      )}
    </div>
  );
}
