import type { VenueDetail, VenueSummary } from "./venues";

const collator = new Intl.Collator("de");

export interface CityGroup {
  stadt: string | null;
  venues: VenueSummary[];
}

// Gruppiert nach Stadt (alphabetisch), innerhalb jeder Stadt alphabetisch
// nach Name. Läden ohne Stadt landen ohne Überschrift am Ende.
export function groupByCity(venues: VenueSummary[]): CityGroup[] {
  const groups = new Map<string, VenueSummary[]>();
  const ohneStadt: VenueSummary[] = [];

  for (const venue of venues) {
    if (!venue.stadt) {
      ohneStadt.push(venue);
      continue;
    }
    const list = groups.get(venue.stadt) ?? [];
    list.push(venue);
    groups.set(venue.stadt, list);
  }

  const sortByName = (a: VenueSummary, b: VenueSummary) =>
    collator.compare(a.name, b.name);

  const sortedGroups: CityGroup[] = Array.from(groups.entries())
    .sort(([a], [b]) => collator.compare(a, b))
    .map(([stadt, list]) => ({ stadt, venues: [...list].sort(sortByName) }));

  if (ohneStadt.length > 0) {
    sortedGroups.push({ stadt: null, venues: [...ohneStadt].sort(sortByName) });
  }

  return sortedGroups;
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
        textField("Öffnungstage", joinList(venue.oeffnungstage)),
        textField("Adresse", venue.adresse),
      ].filter(isField),
    },
    {
      title: "Programm & Kanäle",
      fields: [
        textField("Reihen", venue.reihen),
        venue.links && venue.links.length > 0
          ? ({ kind: "links", label: "Links", links: venue.links } as const)
          : null,
      ].filter(isField),
    },
    {
      title: "Preise & Größe",
      fields: [
        textField("Preisniveau", venue.preisniveau),
        textField("Kapazität", venue.kapazitaet),
      ].filter(isField),
    },
    {
      title: "Vor Ort",
      fields: [
        textField("Kartenzahlung", venue.kartenzahlung),
        textField("Garderobe", venue.garderobe),
        textField("Raucherbereich", venue.raucherbereich),
        textField("Haltestelle", venue.haltestelle),
        textField("Barrierefreiheit", venue.barrierefreiheit),
        textField("Kamerapolitik", venue.kamerapolitik),
      ].filter(isField),
    },
  ];

  return blocks.filter((block) => block.fields.length > 0);
}

function textField(label: string, value: string | null): DetailField | null {
  return value ? { kind: "text", label, value } : null;
}

function isField(f: DetailField | null): f is DetailField {
  return f !== null;
}

export function joinList(values: string[] | null): string | null {
  return values && values.length > 0 ? values.join(", ") : null;
}
