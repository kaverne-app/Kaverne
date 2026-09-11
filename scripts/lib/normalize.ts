// Leere Zellen bleiben leer (null) — nie "nein", "0" oder "unbekannt" erraten.

export function emptyToNull(value: string | undefined): string | null {
  const trimmed = (value ?? "").trim();
  return trimmed === "" ? null : trimmed;
}

export function splitList(value: string | undefined): string[] | null {
  const trimmed = (value ?? "").trim();
  if (trimmed === "") return null;
  const items = trimmed
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item !== "");
  return items.length > 0 ? items : null;
}

// "10.09.2026" -> "2026-09-10"
export function parseGermanDate(value: string | undefined): string | null {
  const trimmed = (value ?? "").trim();
  if (trimmed === "") return null;
  const match = trimmed.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  if (!match) return null;
  const [, day, month, year] = match;
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

// "49.0069,8.4037" oder "49.0069, 8.4037" -> [lat, lon]
export function parseInlineCoordinates(
  value: string | undefined,
): [number, number] | null {
  const trimmed = (value ?? "").trim();
  if (trimmed === "") return null;
  const parts = trimmed.split(",").map((part) => part.trim());
  if (parts.length !== 2) return null;
  const lat = Number(parts[0]);
  const lon = Number(parts[1]);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  return [lat, lon];
}
