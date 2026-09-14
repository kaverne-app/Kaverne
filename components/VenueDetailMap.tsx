"use client";

import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

// Gleicher freier Kachelstil wie auf /karte, kein Google-Dienst beteiligt.
const STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";

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

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: STYLE_URL,
      center: [lon, lat],
      zoom: 15,
      interactive: false,
    });

    const el = document.createElement("div");
    el.className = "venue-pin";
    el.setAttribute("aria-label", name);
    new maplibregl.Marker({ element: el }).setLngLat([lon, lat]).addTo(map);

    return () => map.remove();
  }, [name, lat, lon]);

  return <div ref={containerRef} className="venue-detail-map" aria-hidden="true" />;
}
