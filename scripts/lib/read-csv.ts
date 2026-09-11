import { readFileSync } from "node:fs";
import { parse } from "csv-parse/sync";
import {
  emptyToNull,
  parseGermanDate,
  parseInlineCoordinates,
  splitList,
} from "./normalize";
import type { VenueInternalRow, VenueLink, VenueRow } from "./types";

// Spaltennamen exakt wie im Sheet-Export.
interface RawCsvRow {
  ID: string;
  Name: string;
  Typ: string;
  Stadt: string;
  Adresse: string;
  Koordinaten: string;
  "Genre-Schwerpunkt": string;
  Status: string;
  "Regelmäßige Öffnungstage": string;
  Kurzbeschreibung: string;
  Kapazität: string;
  Residents: string;
  "Wiederkehrende Reihen": string;
  Preisniveau: string;
  Website: string;
  Instagram: string;
  Facebook: string;
  Kartenzahlung: string;
  Garderobe: string;
  Raucherbereich: string;
  ÖPNV: string;
  Parken: string;
  Barrierefreiheit: string;
  Kamerapolitik: string;
  "Zuletzt geprüft": string;
  "Quelle (URL oder benannte Quelle)": string;
  Ansprechpartner: string;
}

function buildLinks(raw: RawCsvRow): VenueLink[] | null {
  const links: VenueLink[] = [];
  const website = emptyToNull(raw.Website);
  const instagram = emptyToNull(raw.Instagram);
  const facebook = emptyToNull(raw.Facebook);
  if (website) links.push({ typ: "website", url: website });
  if (instagram) links.push({ typ: "instagram", url: instagram });
  if (facebook) links.push({ typ: "facebook", url: facebook });
  return links.length > 0 ? links : null;
}

export interface ParsedCsv {
  venues: VenueRow[];
  internal: VenueInternalRow[];
  // id -> Koordinaten, die bereits in der Tabelle standen (kein Geocoding nötig)
  inlineCoordinates: Map<string, [number, number]>;
  // id -> { name, adresse }, für das Geocoding
  addresses: Map<string, { name: string; adresse: string }>;
}

export function readVenueCsv(path: string): ParsedCsv {
  const content = readFileSync(path, "utf-8");
  const rows: RawCsvRow[] = parse(content, {
    columns: true,
    skip_empty_lines: true,
    bom: true,
  });

  const venues: VenueRow[] = [];
  const internal: VenueInternalRow[] = [];
  const inlineCoordinates = new Map<string, [number, number]>();
  const addresses = new Map<string, { name: string; adresse: string }>();

  for (const raw of rows) {
    const id = emptyToNull(raw.ID);
    const name = emptyToNull(raw.Name);
    if (!id || !name) {
      throw new Error(
        `Zeile ohne ID oder Name gefunden: ${JSON.stringify(raw)}`,
      );
    }

    venues.push({
      id,
      name,
      typ: emptyToNull(raw.Typ),
      stadt: emptyToNull(raw.Stadt),
      adresse: emptyToNull(raw.Adresse),
      genres: splitList(raw["Genre-Schwerpunkt"]),
      status: emptyToNull(raw.Status),
      oeffnungstage: splitList(raw["Regelmäßige Öffnungstage"]),
      kurzbeschreibung: emptyToNull(raw.Kurzbeschreibung),
      kapazitaet: emptyToNull(raw.Kapazität),
      residents: emptyToNull(raw.Residents),
      reihen: emptyToNull(raw["Wiederkehrende Reihen"]),
      preisniveau: emptyToNull(raw.Preisniveau),
      kartenzahlung: emptyToNull(raw.Kartenzahlung),
      garderobe: emptyToNull(raw.Garderobe),
      raucherbereich: emptyToNull(raw.Raucherbereich),
      haltestelle: emptyToNull(raw.ÖPNV),
      barrierefreiheit: emptyToNull(raw.Barrierefreiheit),
      kamerapolitik: emptyToNull(raw.Kamerapolitik),
      links: buildLinks(raw),
    });

    internal.push({
      venue_id: id,
      zuletzt_geprueft: parseGermanDate(raw["Zuletzt geprüft"]),
      herkunft: emptyToNull(raw["Quelle (URL oder benannte Quelle)"]),
      ansprechpartner: emptyToNull(raw.Ansprechpartner),
    });

    const inline = parseInlineCoordinates(raw.Koordinaten);
    const adresse = emptyToNull(raw.Adresse);
    if (inline) {
      inlineCoordinates.set(id, inline);
    } else if (adresse) {
      addresses.set(id, { name, adresse });
    }
  }

  return { venues, internal, inlineCoordinates, addresses };
}
