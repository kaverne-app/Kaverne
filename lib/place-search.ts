// Ortssuche auf der Karte: Antworten von Photon (photon.komoot.io, auf Basis
// von OpenStreetMap) in Trefferzeilen umrechnen. Reine Anzeigelogik.

export const PHOTON_URL = "https://photon.komoot.io/api/";
// Mitte der Region, bevorzugt Treffer in der Nähe.
export const SEARCH_BIAS = { lat: 49.9, lon: 8.3 };
export const MIN_QUERY_LENGTH = 3;

export type PlaceHit = {
  label: string;
  lon: number;
  lat: number;
  // [west, south, east, north], nur bei Flächen wie Städten oder Stadtteilen.
  bounds: [number, number, number, number] | null;
};

type PhotonFeature = {
  geometry?: { coordinates?: [number, number] };
  properties?: {
    name?: string;
    street?: string;
    housenumber?: string;
    postcode?: string;
    city?: string;
    district?: string;
    county?: string;
    state?: string;
    country?: string;
    extent?: [number, number, number, number];
  };
};

function labelOf(p: NonNullable<PhotonFeature["properties"]>): string {
  const street = p.street ? [p.street, p.housenumber].filter(Boolean).join(" ") : null;
  const town = [p.postcode, p.city ?? p.district ?? p.county].filter(Boolean).join(" ");
  const head = p.name && p.name !== p.street ? p.name : null;
  const parts = [head, street, town || null];
  // Ein Ort, der nur aus Name und gleichnamiger Stadt besteht, nicht doppeln.
  const unique = parts.filter((part, i): part is string => !!part && parts.indexOf(part) === i);
  if (p.country && p.country !== "Deutschland") unique.push(p.country);
  return unique.join(", ");
}

export function parsePlaces(data: unknown): PlaceHit[] {
  const features = (data as { features?: PhotonFeature[] } | null)?.features;
  if (!Array.isArray(features)) return [];
  const seen = new Set<string>();
  const hits: PlaceHit[] = [];
  for (const f of features) {
    const coords = f.geometry?.coordinates;
    if (!coords || !f.properties) continue;
    const label = labelOf(f.properties);
    if (!label || seen.has(label)) continue;
    seen.add(label);
    const e = f.properties.extent;
    hits.push({
      label,
      lon: coords[0],
      lat: coords[1],
      // Photon liefert [west, nord, ost, süd].
      bounds: e ? [e[0], e[3], e[2], e[1]] : null,
    });
  }
  return hits;
}

export function searchUrl(query: string): string {
  const params = new URLSearchParams({
    q: query,
    limit: "6",
    lang: "de",
    lat: String(SEARCH_BIAS.lat),
    lon: String(SEARCH_BIAS.lon),
  });
  return `${PHOTON_URL}?${params.toString()}`;
}
