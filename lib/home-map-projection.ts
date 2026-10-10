// Projektion der Startseiten-Vorschau: einfache flächentreue Näherung
// (Länge mal Kosinus der mittleren Breite). Umrisse und Punkte laufen durch
// dieselbe Funktion, sonst läge ein Punkt neben seiner Stadt.
const MITTLERE_BREITE = 49.5;
const KOS = Math.cos((MITTLERE_BREITE * Math.PI) / 180);

export function projectRaw(lon: number, lat: number): [number, number] {
  return [lon * KOS, -lat];
}
