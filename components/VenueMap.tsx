"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { VenuePin } from "@/lib/venues";
import { loadMutedStyle } from "./mapMutedStyle";

export default function VenueMap({ venues }: { venues: VenuePin[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [selected, setSelected] = useState<VenuePin | null>(null);

  useEffect(() => {
    if (!containerRef.current || venues.length === 0) return;

    let map: maplibregl.Map | undefined;
    let cancelled = false;

    loadMutedStyle().then((style) => {
      if (cancelled || !containerRef.current) return;

      map = new maplibregl.Map({
        container: containerRef.current,
        style,
        center: [venues[0].lon, venues[0].lat],
        zoom: 10,
        attributionControl: false,
      });
      map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

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
    }).catch((error) => {
      console.error("Kartenstil konnte nicht geladen werden:", error);
    });

    return () => {
      cancelled = true;
      map?.remove();
    };
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
