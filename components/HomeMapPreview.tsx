import { HOME_MAP_FRAME, projectToFrame } from "@/lib/home-map-projection";
import type { VenueCoordinate } from "@/lib/venues";

// Nicht bedienbare Kartenvorschau für die Startseite: ein festes Bild der
// Karte (public/home-map, erzeugt von scripts/render-home-map.ts) und darüber
// ein Punkt je Laden mit Koordinaten, ausgerechnet beim Seitenaufruf. Reines
// HTML — keine Kartenbibliothek, keine Abrufe bei OpenFreeMap.
export default function HomeMapPreview({ points }: { points: VenueCoordinate[] }) {
  const { width, height } = HOME_MAP_FRAME;

  return (
    <span className="home-map" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/home-map/home-map-720.webp"
        srcSet="/home-map/home-map-480.webp 480w, /home-map/home-map-720.webp 720w, /home-map/home-map-960.webp 960w"
        sizes="(min-width: 480px) 448px, calc(100vw - 64px)"
        width={width}
        height={height}
        alt=""
        draggable={false}
      />
      {points.map((v, i) => {
        const { left, top } = projectToFrame(v.lon, v.lat);
        if (left < 0 || left > 100 || top < 0 || top > 100) return null;
        return (
          <span
            key={i}
            className={v.status === "unregelmäßig" ? "home-map-pin home-map-pin-open" : "home-map-pin"}
            style={{ left: `${left.toFixed(2)}%`, top: `${top.toFixed(2)}%` }}
          />
        );
      })}
    </span>
  );
}

// Namensnennung, ausdrücklich außerhalb des Links (Links in Links sind nicht
// erlaubt). Wortlaut siehe docs/KAVERNE.md, Abschnitt „Anzeige".
export function HomeMapCredit() {
  return (
    <p className="home-map-credit">
      Karte ©{" "}
      <a href="https://openfreemap.org" target="_blank" rel="noopener noreferrer">
        OpenFreeMap
      </a>{" "}
      ©{" "}
      <a href="https://openmaptiles.org" target="_blank" rel="noopener noreferrer">
        OpenMapTiles
      </a>{" "}
      Daten von{" "}
      <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">
        OpenStreetMap
      </a>
    </p>
  );
}
