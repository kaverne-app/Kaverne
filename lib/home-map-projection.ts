// Ausschnitt und Projektion der Kartenvorschau auf der Startseite. Das feste
// Kartenbild (scripts/render-home-map.ts) und die Punkte darüber rechnen mit
// denselben Werten, sonst läge ein Punkt neben seinem Laden. Projektion wie
// MapLibre: Web-Mercator.
import frame from "./home-map-frame.json";

// Ausschnitt (Mitte und Breite in Längengrad) steht in home-map-frame.json und
// wird zusammen mit dem Bild von scripts/render-home-map.ts geschrieben —
// beide ändern sich immer im selben Commit. Die Höhe folgt aus dem
// Seitenverhältnis; Bildgröße in CSS-Pixeln beim Erzeugen (doppelte Dichte).
export const HOME_MAP_FRAME = { ...frame, width: 480, height: 576 };

export function mercatorY(lat: number): number {
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
export function zoomForFrame(f: { width: number; lonSpan: number } = HOME_MAP_FRAME): number {
  return Math.log2((f.width * 360) / (512 * f.lonSpan));
}
