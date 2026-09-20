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

// "residents" wird hier absichtlich nie ausgewählt — nicht nur im Frontend
// ausgeblendet, die Spalte taucht in der Abfrage gar nicht auf. Preisniveau,
// Kapazität, Garderobe, Barrierefreiheit und Kamerapolitik stehen in
// Supabase, werden aber auf der Detailseite nicht angezeigt (siehe
// docs/KAVERNE.md, Abschnitt "Anzeige") — deshalb hier ebenfalls nicht
// abgefragt.
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

export interface VenueStats {
  count: number;
  cities: string[];
}

// Für die Startseite: Anzahl und Städte, ohne die übrigen Felder zu laden.
export async function getVenueStats(): Promise<VenueStats> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from("venues").select("id,stadt");
  if (error) throw error;

  const collator = new Intl.Collator("de");
  const cities = Array.from(
    new Set(data.map((v) => v.stadt).filter((s): s is string => Boolean(s))),
  ).sort((a, b) => collator.compare(a, b));

  return { count: data.length, cities };
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
