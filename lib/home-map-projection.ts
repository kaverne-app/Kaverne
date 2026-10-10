// Ausschnitt und Projektion der Kartenvorschau auf der Startseite. Das feste
// Kartenbild (scripts/render-home-map.ts) und die Punkte darüber rechnen mit
// denselben Werten, sonst läge ein Punkt neben seinem Laden. Projektion wie
// MapLibre: Web-Mercator.
export const HOME_MAP_FRAME = {
  centerLon: 8.3,
  centerLat: 49.6,
  // Breite des Ausschnitts in Längengrad; die Höhe folgt aus dem Seitenverhältnis.
  lonSpan: 5.9,
  // Bildgröße in CSS-Pixeln beim Erzeugen (das Bild entsteht mit doppelter Dichte).
  width: 480,
  height: 576,
} as const;

function mercatorY(lat: number): number {
  const rad = (lat * Math.PI) / 180;
  return (Math.log(Math.tan(Math.PI / 4 + rad / 2)) * 180) / Math.PI;
}

// Lage eines Ladens im Bild in Prozent von links bzw. oben.
export function projectToFrame(lon: number, lat: number): { left: number; top: number } {
  const f = HOME_MAP_FRAME;
  const spanY = (f.lonSpan * f.height) / f.width;
  return {
    left: ((lon - f.centerLon) / f.lonSpan + 0.5) * 100,
    top: (0.5 - (mercatorY(lat) - mercatorY(f.centerLat)) / spanY) * 100,
  };
}

// MapLibre-Zoomstufe, bei der die Bildbreite genau lonSpan Grad abdeckt
// (Weltumfang bei Zoom z: 512 · 2^z Pixel für 360 Grad).
export function zoomForFrame(): number {
  const f = HOME_MAP_FRAME;
  return Math.log2((f.width * 360) / (512 * f.lonSpan));
}
