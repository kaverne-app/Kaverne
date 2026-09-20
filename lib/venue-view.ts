import type { VenueDetail, VenueFilterable } from "./venues";

const collator = new Intl.Collator("de");

export interface CityGroup {
  stadt: string | null;
  venues: VenueFilterable[];
}

// Gruppiert nach Stadt (alphabetisch), innerhalb jeder Stadt alphabetisch
// nach Name. Läden ohne Stadt landen ohne Überschrift am Ende.
export function groupByCity(venues: VenueFilterable[]): CityGroup[] {
  const groups = new Map<string, VenueFilterable[]>();
  const ohneStadt: VenueFilterable[] = [];

  for (const venue of venues) {
    if (!venue.stadt) {
      ohneStadt.push(venue);
      continue;
    }
    const list = groups.get(venue.stadt) ?? [];
    list.push(venue);
    groups.set(venue.stadt, list);
  }

  const sortByName = (a: VenueFilterable, b: VenueFilterable) =>
    collator.compare(a.name, b.name);

  const sortedGroups: CityGroup[] = Array.from(groups.entries())
    .sort(([a], [b]) => collator.compare(a, b))
    .map(([stadt, list]) => ({ stadt, venues: [...list].sort(sortByName) }));

  if (ohneStadt.length > 0) {
    sortedGroups.push({ stadt: null, venues: [...ohneStadt].sort(sortByName) });
  }

  return sortedGroups;
}

export interface VenueFilter {
  stadte: string[];
  genres: string[];
}

export const EMPTY_VENUE_FILTER: VenueFilter = { stadte: [], genres: [] };

export function isFilterActive(filter: VenueFilter): boolean {
  return filter.stadte.length > 0 || filter.genres.length > 0;
}

export function filterVenues(
  venues: VenueFilterable[],
  filter: VenueFilter,
): VenueFilterable[] {
  return venues.filter((venue) => {
    if (filter.stadte.length > 0) {
      if (!venue.stadt || !filter.stadte.includes(venue.stadt)) return false;
    }
    if (filter.genres.length > 0) {
      const genres = venue.genres ?? [];
      if (!genres.some((g) => filter.genres.includes(g))) return false;
    }
    return true;
  });
}

// Nur Städte, die unter der aktuellen Genre-Auswahl mindestens einen Laden
// haben — eine Stadtauswahl, die zu keinem Treffer führen würde, taucht
// nicht erst auf.
export function availableCityOptions(
  venues: VenueFilterable[],
  filter: VenueFilter,
): string[] {
  const relevant =
    filter.genres.length > 0
      ? venues.filter((v) => (v.genres ?? []).some((g) => filter.genres.includes(g)))
      : venues;
  const cities = new Set<string>();
  for (const venue of relevant) {
    if (venue.stadt) cities.add(venue.stadt);
  }
  return Array.from(cities).sort((a, b) => collator.compare(a, b));
}

// Entfernt aus der gespeicherten Auswahl Städte, die unter der aktuellen
// Genre-Auswahl gar nicht mehr wählbar wären — so bleiben Liste, Karte und
// die angezeigten Häkchen immer konsistent.
export function effectiveFilter(
  venues: VenueFilterable[],
  filter: VenueFilter,
): VenueFilter {
  const cityOptions = availableCityOptions(venues, filter);
  return {
    stadte: filter.stadte.filter((s) => cityOptions.includes(s)),
    genres: filter.genres,
  };
}

export function availableGenreOptions(venues: VenueFilterable[]): string[] {
  const genres = new Set<string>();
  for (const venue of venues) {
    for (const genre of venue.genres ?? []) genres.add(genre);
  }
  return Array.from(genres).sort((a, b) => collator.compare(a, b));
}

export type DetailField =
  | { kind: "text"; label: string; value: string }
  | { kind: "links"; label: string; links: NonNullable<VenueDetail["links"]> };

export interface DetailBlock {
  title: string;
  fields: DetailField[];
}

// Baut die Detail-Blöcke und lässt leere Felder — und ganze Blöcke ohne
// einen einzigen gefüllten Feld — vollständig weg.
export function buildDetailBlocks(venue: VenueDetail): DetailBlock[] {
  const blocks: DetailBlock[] = [
    {
      title: "Wann & wo",
      fields: [
        textField("Übliche Tage", joinList(venue.oeffnungstage)),
        textField("Adresse", venue.adresse),
        textField("Haltestelle", venue.haltestelle),
      ].filter(isField),
    },
    {
      title: "Kanäle",
      fields: [linksField(venue.links)].filter(isField),
    },
    {
      title: "Vor Ort",
      fields: [
        textField("Floors", venue.floors),
        textField("Kartenzahlung", venue.kartenzahlung),
        textField("Raucherbereich", venue.raucherbereich),
        textField("Außenbereich", venue.aussenbereich),
      ].filter(isField),
    },
  ];

  return blocks.filter((block) => block.fields.length > 0);
}

function textField(label: string, value: string | null): DetailField | null {
  return value ? { kind: "text", label, value } : null;
}

function linksField(links: VenueDetail["links"]): DetailField | null {
  return links && links.length > 0 ? { kind: "links", label: "Links", links } : null;
}

function isField(f: DetailField | null): f is DetailField {
  return f !== null;
}

export function joinList(values: string[] | null): string | null {
  return values && values.length > 0 ? values.join(", ") : null;
}

// Listenzeile 2: Stadt · Typ · bis zu zwei Genres, weitere als "+n".
export function buildRowMeta(venue: {
  stadt: string | null;
  typ: string | null;
  genres: string[] | null;
}): string {
  const genres = venue.genres ?? [];
  const shown = genres.slice(0, 2);
  const rest = genres.length - shown.length;
  const genrePart =
    shown.length > 0 ? shown.join(", ") + (rest > 0 ? ` +${rest}` : "") : null;
  return [venue.stadt, venue.typ, genrePart].filter(Boolean).join(" · ");
}
