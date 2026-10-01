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
  kartenzahlung: string | null;
  garderobe: string | null;
  raucherbereich: string | null;
  aussenbereich: string | null;
  haltestelle: string | null;
  links: VenueLink[] | null;
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
