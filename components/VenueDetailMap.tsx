"use client";

import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { loadMutedStyle } from "./mapMutedStyle";

// Gleicher freier Kachelstil wie auf /clubs, kein Google-Dienst beteiligt —
// geladen und gedämpft über denselben Weg wie die Übersichtskarte.
export default function VenueDetailMap({
  name,
  lat,
  lon,
}: {
  name: string;
  lat: number;
  lon: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let map: maplibregl.Map | undefined;
    let cancelled = false;

    loadMutedStyle().then((style) => {
      if (cancelled || !containerRef.current) return;

      map = new maplibregl.Map({
        container: containerRef.current,
        style,
        center: [lon, lat],
        zoom: 15,
        interactive: false,
        attributionControl: false,
      });
      map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");

      const el = document.createElement("div");
      el.className = "venue-pin";
      el.setAttribute("aria-label", name);
      new maplibregl.Marker({ element: el }).setLngLat([lon, lat]).addTo(map);
    }).catch((error) => {
      console.error("Kartenstil konnte nicht geladen werden:", error);
    });

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [name, lat, lon]);

  return <div ref={containerRef} className="venue-detail-map" aria-hidden="true" />;
}
