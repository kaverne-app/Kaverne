import { HOME_MAP } from "@/lib/home-map-outline";
import { projectRaw } from "@/lib/home-map-projection";

// Schematische, nicht bedienbare Vorschau für die Startseite: Umrisse der vier
// Länder und ein Punkt pro Laden mit Koordinaten. Reines SVG, ohne
// Kartenbibliothek und ohne Abrufe von außen.
export default function HomeMapPreview({
  points,
}: {
  points: { lat: number; lon: number }[];
}) {
  const { breite, hoehe, ursprung, skalierung, pfade } = HOME_MAP;

  return (
    <svg
      className="home-map"
      viewBox={`0 0 ${breite} ${hoehe}`}
      aria-hidden="true"
      focusable="false"
    >
      {pfade.map((p) => (
        <path key={p.name} d={p.d} className="home-map-land" />
      ))}
      {points.map((v, i) => {
        const [x, y] = projectRaw(v.lon, v.lat);
        return (
          <circle
            key={i}
            cx={((x - ursprung[0]) * skalierung).toFixed(1)}
            cy={((y - ursprung[1]) * skalierung).toFixed(1)}
            r={2.6}
            className="home-map-dot"
          />
        );
      })}
    </svg>
  );
}
