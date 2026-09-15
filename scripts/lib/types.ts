export interface VenueLink {
  typ: "website" | "instagram" | "facebook";
  url: string;
}

export interface VenueRow {
  id: string;
  name: string;
  typ: string | null;
  stadt: string | null;
  adresse: string | null;
  genres: string[] | null;
  status: string | null;
  oeffnungstage: string[] | null;
  kurzbeschreibung: string | null;
  kapazitaet: string | null;
  residents: string | null;
  reihen: string | null;
  preisniveau: string | null;
  kartenzahlung: string | null;
  garderobe: string | null;
  raucherbereich: string | null;
  aussenbereich: string | null;
  haltestelle: string | null;
  barrierefreiheit: string | null;
  kamerapolitik: string | null;
  links: VenueLink[] | null;
}

export interface VenueInternalRow {
  venue_id: string;
  zuletzt_geprueft: string | null;
  herkunft: string | null;
  ansprechpartner: string | null;
}

export interface CoordinateReviewRow {
  id: string;
  name: string;
  adresse: string;
  lat: string;
  lon: string;
  quelle: string;
  hinweis: string;
}
