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
}

export interface VenuePin {
  id: string;
  name: string;
  stadt: string | null;
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
  oeffnungstage: string[] | null;
  reihen: string | null;
  links: VenueLink[] | null;
  preisniveau: string | null;
  kapazitaet: string | null;
  kartenzahlung: string | null;
  garderobe: string | null;
  raucherbereich: string | null;
  haltestelle: string | null;
  barrierefreiheit: string | null;
  kamerapolitik: string | null;
}

// "residents" wird hier absichtlich nie ausgewählt — nicht nur im Frontend
// ausgeblendet, die Spalte taucht in der Abfrage gar nicht auf.
const SUMMARY_COLUMNS = "id,name,typ,stadt,genres";
const DETAIL_COLUMNS = `${SUMMARY_COLUMNS},adresse,oeffnungstage,reihen,links,preisniveau,kapazitaet,kartenzahlung,garderobe,raucherbereich,haltestelle,barrierefreiheit,kamerapolitik`;

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
