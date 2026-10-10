import { getSupabaseClient } from "./supabase";

export interface VenueLink {
  typ: "website" | "instagram" | "facebook";
  url: string;
}

export interface VenueSummary {
  id: string;
  name: string;
  typ: string | null;
  stadt: string | null;
  genres: string[] | null;
  status: string | null;
}

export interface VenuePin {
  id: string;
  name: string;
  typ: string | null;
  stadt: string | null;
  status: string | null;
  lat: number;
  lon: number;
}

// Für Liste und Karte: beide filtern auf demselben Datensatz (Stadt, Genre),
// die Karte braucht zusätzlich lat/lon.
export interface VenueFilterable extends VenueSummary {
  lat: number | null;
  lon: number | null;
}

export interface VenueDetail extends VenueSummary {
  adresse: string | null;
  lat: number | null;
  lon: number | null;
  kurzbeschreibung: string | null;
  oeffnungstage: string[] | null;
  links: VenueLink[] | null;
  floors: string | null;
  kartenzahlung: string | null;
  raucherbereich: string | null;
  aussenbereich: string | null;
  haltestelle: string | null;
}

// Garderobe steht in Supabase, wird aber auf der Detailseite nicht angezeigt
// (siehe docs/KAVERNE.md, Abschnitt "Anzeige") — deshalb hier nicht abgefragt.
const SUMMARY_COLUMNS = "id,name,typ,stadt,genres,status";
const DETAIL_COLUMNS = `${SUMMARY_COLUMNS},adresse,lat,lon,kurzbeschreibung,oeffnungstage,links,floors,kartenzahlung,raucherbereich,aussenbereich,haltestelle`;

// Liste und Karte laden denselben Datensatz — gefiltert wird client-seitig,
// damit Filterauswahl sich sofort auswirkt, ohne bei jedem Klick neu von
// Supabase zu laden.
export async function getFilterableVenues(): Promise<VenueFilterable[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("venues")
    .select(`${SUMMARY_COLUMNS},lat,lon`);
  if (error) throw error;
  return data as VenueFilterable[];
}

export interface VenueCoordinate {
  lat: number;
  lon: number;
  status: string | null;
}

// Für die Kartenvorschau auf der Startseite: nur Koordinaten, ohne die
// übrigen Felder zu laden. Einträge ohne Koordinaten fehlen hier.
export async function getVenueCoordinates(): Promise<VenueCoordinate[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("venues")
    .select("lat,lon,status")
    .not("lat", "is", null)
    .not("lon", "is", null);
  if (error) throw error;
  return data as VenueCoordinate[];
}

export async function getVenue(id: string): Promise<VenueDetail | null> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("venues")
    .select(DETAIL_COLUMNS)
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data as VenueDetail | null;
}
