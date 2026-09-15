// Einzige Stelle im Code mit den festen Werten für "typ" und "genres" —
// wortgleich zu docs/KAVERNE.md, Abschnitt "Datenfelder". Ändert sich die
// Liste dort, hier nachziehen.

export const TYP_VALUES = ["Club", "Bar", "Location", "Festival"] as const;

export const GENRE_VALUES = [
  "Techno",
  "Hardtechno",
  "House",
  "Tech House",
  "Trance",
  "Drum & Bass",
  "Hardstyle",
  "Psytrance",
  "Gemischt",
] as const;

export interface UnbekannterWert {
  zeile: number;
  id: string;
  spalte: "Typ" | "Genre-Schwerpunkt";
  wert: string;
}

export interface RowForValidation {
  zeile: number;
  id: string;
  typ: string | null;
  genres: string[] | null;
}

// Findet jeden Wert bei typ/genres, der nicht in den festen Listen steht —
// meldet, ändert nichts.
export function findeUnbekannteWerte(rows: RowForValidation[]): UnbekannterWert[] {
  const unbekannt: UnbekannterWert[] = [];

  for (const row of rows) {
    if (row.typ && !(TYP_VALUES as readonly string[]).includes(row.typ)) {
      unbekannt.push({ zeile: row.zeile, id: row.id, spalte: "Typ", wert: row.typ });
    }
    for (const genre of row.genres ?? []) {
      if (!(GENRE_VALUES as readonly string[]).includes(genre)) {
        unbekannt.push({ zeile: row.zeile, id: row.id, spalte: "Genre-Schwerpunkt", wert: genre });
      }
    }
  }

  return unbekannt;
}
