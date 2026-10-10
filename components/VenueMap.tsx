"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { VenuePin } from "@/lib/venues";
import { loadMutedStyle } from "./mapMutedStyle";
import MapSearch from "./MapSearch";
import type { PlaceHit } from "@/lib/place-search";

const SOURCE = "venues";
const MAX_ZOOM = 17;
const ACCENT = "#ff9f1c";
const GROUND = "#0d0d0e";
// Tipp-Toleranz um Pins und Sammelpunkte, damit der kleine Punkt mit dem
// Daumen trifft.
const HIT_PADDING = 12;

type PinProps = Pick<VenuePin, "id" | "name" | "typ" | "stadt" | "status">;

function toGeoJson(venues: VenuePin[]): GeoJSON.FeatureCollection<GeoJSON.Point, PinProps> {
  return {
    type: "FeatureCollection",
    features: venues.map((v) => ({
      type: "Feature",
      geometry: { type: "Point", coordinates: [v.lon, v.lat] },
      properties: { id: v.id, name: v.name, typ: v.typ, stadt: v.stadt, status: v.status },
    })),
  };
}

function fitToVenues(map: maplibregl.Map, venues: VenuePin[], animate: boolean) {
  if (venues.length === 0) return;
  const bounds = new maplibregl.LngLatBounds(
    [venues[0].lon, venues[0].lat],
    [venues[0].lon, venues[0].lat],
  );
  for (const v of venues) bounds.extend([v.lon, v.lat]);
  map.fitBounds(bounds, { padding: 48, maxZoom: 14, duration: animate ? 600 : 0 });
}

// Schrift für die Anzahl im Sammelpunkt: aus dem geladenen Kartenstil
// übernommen, damit kein zusätzlicher Schriftsatz geladen wird.
function labelFont(map: maplibregl.Map): string[] {
  for (const layer of map.getStyle().layers ?? []) {
    const font = (layer.layout as Record<string, unknown> | undefined)?.["text-font"];
    if (Array.isArray(font) && typeof font[0] === "string") return font as string[];
  }
  return ["Noto Sans Bold"];
}

export default function VenueMap({ venues }: { venues: VenuePin[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const venuesRef = useRef(venues);
  const hasFitRef = useRef(false);
  const meRef = useRef<maplibregl.Marker | null>(null);
  const searchPinRef = useRef<maplibregl.Marker | null>(null);
  const router = useRouter();
  const [selected, setSelected] = useState<VenuePin | null>(null);
  const [group, setGroup] = useState<VenuePin[] | null>(null);

  // Karte nur einmal anlegen; Pins und Ausschnitt folgen dem Filter im
  // zweiten Effekt, ohne die Karte neu zu laden.
  useEffect(() => {
    if (!containerRef.current) return;

    let cancelled = false;

    loadMutedStyle().then((style) => {
      if (cancelled || !containerRef.current) return;

      const map = new maplibregl.Map({
        container: containerRef.current,
        style,
        center: [8.3, 49.9],
        zoom: 7,
        maxZoom: MAX_ZOOM,
        attributionControl: false,
      });
      mapRef.current = map;
      map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

      function clearSelection() {
        map.setFilter("venue-selected", ["==", ["get", "id"], ""]);
        setSelected(null);
        setGroup(null);
      }

      map.on("load", () => {
        const font = labelFont(map);
        map.addSource(SOURCE, {
          type: "geojson",
          data: toGeoJson(venuesRef.current),
          cluster: true,
          clusterRadius: 44,
          clusterMaxZoom: MAX_ZOOM,
        });
        map.addLayer({
          id: "venue-clusters",
          type: "circle",
          source: SOURCE,
          filter: ["has", "point_count"],
          paint: {
            "circle-color": ACCENT,
            "circle-radius": ["step", ["get", "point_count"], 16, 5, 20, 15, 24],
            "circle-stroke-width": 2,
            "circle-stroke-color": GROUND,
          },
        });
        map.addLayer({
          id: "venue-cluster-count",
          type: "symbol",
          source: SOURCE,
          filter: ["has", "point_count"],
          layout: {
            "text-field": ["get", "point_count_abbreviated"],
            "text-font": font,
            "text-size": 14,
            "text-allow-overlap": true,
          },
          paint: { "text-color": GROUND },
        });
        map.addLayer({
          id: "venue-pins",
          type: "circle",
          source: SOURCE,
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-radius": 6,
            "circle-color": ["case", ["==", ["get", "status"], "unregelmäßig"], GROUND, ACCENT],
            "circle-stroke-width": 2,
            "circle-stroke-color": ["case", ["==", ["get", "status"], "unregelmäßig"], ACCENT, GROUND],
          },
        });
        map.addLayer({
          id: "venue-selected",
          type: "circle",
          source: SOURCE,
          filter: ["==", ["get", "id"], ""],
          paint: {
            "circle-radius": 9,
            "circle-color": "rgba(0,0,0,0)",
            "circle-stroke-width": 2,
            "circle-stroke-color": ACCENT,
          },
        });

        if (!hasFitRef.current && venuesRef.current.length > 0) {
          fitToVenues(map, venuesRef.current, false);
          hasFitRef.current = true;
        }
      });

      function hitBox(point: maplibregl.Point): [maplibregl.PointLike, maplibregl.PointLike] {
        return [
          [point.x - HIT_PADDING, point.y - HIT_PADDING],
          [point.x + HIT_PADDING, point.y + HIT_PADDING],
        ];
      }

      map.on("click", async (event) => {
        const hits = map.queryRenderedFeatures(hitBox(event.point), {
          layers: ["venue-clusters", "venue-pins"],
        });
        const hit = hits[0];
        if (!hit) {
          clearSelection();
          return;
        }

        const source = map.getSource(SOURCE) as maplibregl.GeoJSONSource;
        const coordinates = (hit.geometry as GeoJSON.Point).coordinates as [number, number];

        if (hit.properties?.cluster) {
          const clusterId = hit.properties.cluster_id as number;
          const zoom = await source.getClusterExpansionZoom(clusterId);
          if (zoom > map.getMaxZoom()) {
            // Letzter Cluster: trennt sich auch bei maximalem Zoom nicht
            // (gleiche Koordinaten) — kurze Liste statt Auffächern.
            const leaves = await source.getClusterLeaves(clusterId, 50, 0);
            map.setFilter("venue-selected", ["==", ["get", "id"], ""]);
            setSelected(null);
            setGroup(leaves.map((f) => f.properties as VenuePin));
          } else {
            clearSelection();
            map.easeTo({ center: coordinates, zoom });
          }
          return;
        }

        const props = hit.properties as VenuePin;
        const venue = venuesRef.current.find((v) => v.id === props.id) ?? props;
        map.setFilter("venue-selected", ["==", ["get", "id"], venue.id]);
        setGroup(null);
        setSelected(venue);
      });

      map.on("mousemove", (event) => {
        const over = map.queryRenderedFeatures(hitBox(event.point), {
          layers: ["venue-clusters", "venue-pins"],
        });
        map.getCanvas().style.cursor = over.length > 0 ? "pointer" : "";
      });
    }).catch((error) => {
      console.error("Kartenstil konnte nicht geladen werden:", error);
    });

    return () => {
      cancelled = true;
      meRef.current?.remove();
      meRef.current = null;
      searchPinRef.current?.remove();
      searchPinRef.current = null;
      mapRef.current?.remove();
      mapRef.current = null;
      hasFitRef.current = false;
    };
  }, []);

  // Neue Pin-Menge (Filter): Quelle aktualisieren und auf den Ausschnitt der
  // sichtbaren Läden zoomen. Das erste Anpassen beim Laden ohne Animation.
  useEffect(() => {
    venuesRef.current = venues;
    const map = mapRef.current;
    setSelected(null);
    setGroup(null);
    if (!map) return;
    const source = map.getSource(SOURCE) as maplibregl.GeoJSONSource | undefined;
    if (!source) return;
    map.setFilter("venue-selected", ["==", ["get", "id"], ""]);
    source.setData(toGeoJson(venues));
    fitToVenues(map, venues, hasFitRef.current);
    hasFitRef.current = true;
  }, [venues]);

  // Standort nur nach Tipp. Bleibt im Browser: kein Speichern, kein Senden.
  // Bei Ablehnung oder Fehler passiert nichts.
  function locate() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const map = mapRef.current;
        if (!map) return;
        const lngLat: [number, number] = [pos.coords.longitude, pos.coords.latitude];
        if (!meRef.current) {
          const el = document.createElement("div");
          el.className = "venue-map-me";
          meRef.current = new maplibregl.Marker({ element: el }).setLngLat(lngLat).addTo(map);
        } else {
          meRef.current.setLngLat(lngLat);
        }
        map.easeTo({ center: lngLat, zoom: Math.max(map.getZoom(), 13) });
      },
      () => {},
      { enableHighAccuracy: false, maximumAge: 0, timeout: 15000 },
    );
  }

  // Gesuchter Ort: Karte springt hin, ein Markierungspunkt bleibt bis zum
  // Löschen der Suche. Nichts davon wird gespeichert.
  function showPlace(hit: PlaceHit) {
    const map = mapRef.current;
    if (!map) return;
    const lngLat: [number, number] = [hit.lon, hit.lat];
    if (!searchPinRef.current) {
      const el = document.createElement("div");
      el.className = "venue-map-search-pin";
      searchPinRef.current = new maplibregl.Marker({ element: el }).setLngLat(lngLat).addTo(map);
    } else {
      searchPinRef.current.setLngLat(lngLat);
    }
    if (hit.bounds) {
      map.fitBounds(hit.bounds, { padding: 48, maxZoom: 15, duration: 600 });
    } else {
      map.easeTo({ center: lngLat, zoom: 16 });
    }
  }

  function clearPlace() {
    searchPinRef.current?.remove();
    searchPinRef.current = null;
  }

  return (
    <div className="venue-map-wrap">
      <div ref={containerRef} className="venue-map" />
      <MapSearch onSelect={showPlace} onClear={clearPlace} />
      <button
        type="button"
        className="venue-map-locate"
        aria-label="Mein Standort"
        onClick={locate}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
          <path
            d="M12 2v4M12 18v4M2 12h4M18 12h4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
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
      {group && (
        <div className="venue-map-card venue-map-group">
          {group.map((v) => (
            <Link key={v.id} href={`/venues/${v.id}`} className="venue-map-group-item">
              <span className="venue-map-card-name">{v.name}</span>
              <span className="venue-map-card-meta">
                {[v.stadt, v.typ].filter(Boolean).join(" · ")}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
