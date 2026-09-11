"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { VenuePin } from "@/lib/venues";

// OpenFreeMap: freier, unbegrenzter Kartenstil ohne API-Schlüssel, kein
// Google-Dienst beteiligt.
const STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";

export default function VenueMap({ venues }: { venues: VenuePin[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!containerRef.current || venues.length === 0) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: STYLE_URL,
      center: [venues[0].lon, venues[0].lat],
      zoom: 10,
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

    let selectedId: string | null = null;
    let popup: maplibregl.Popup | null = null;

    for (const venue of venues) {
      const el = document.createElement("button");
      el.type = "button";
      el.className = "venue-pin";
      el.setAttribute("aria-label", venue.name);

      new maplibregl.Marker({ element: el })
        .setLngLat([venue.lon, venue.lat])
        .addTo(map);

      el.addEventListener("click", (event) => {
        event.stopPropagation();
        if (selectedId === venue.id) {
          router.push(`/venues/${venue.id}`);
          return;
        }
        selectedId = venue.id;
        popup?.remove();
        popup = new maplibregl.Popup({ closeButton: false, offset: 16 })
          .setLngLat([venue.lon, venue.lat])
          .setText([venue.name, venue.stadt].filter(Boolean).join(", "))
          .addTo(map);
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

    map.on("click", () => {
      selectedId = null;
      popup?.remove();
      popup = null;
    });

    return () => map.remove();
  }, [venues, router]);

  return <div ref={containerRef} className="venue-map" />;
}
