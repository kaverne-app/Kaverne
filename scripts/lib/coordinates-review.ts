import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { parse } from "csv-parse/sync";
import { stringify } from "csv-stringify/sync";
import type { CoordinateReviewRow } from "./types";

const COLUMNS = ["id", "name", "adresse", "lat", "lon", "quelle", "hinweis"];

export function readCoordinateReview(path: string): Map<string, CoordinateReviewRow> {
  const result = new Map<string, CoordinateReviewRow>();
  if (!existsSync(path)) return result;

  const content = readFileSync(path, "utf-8");
  const rows: CoordinateReviewRow[] = parse(content, {
    columns: true,
    skip_empty_lines: true,
    bom: true,
  });
  for (const row of rows) {
    result.set(row.id, row);
  }
  return result;
}

export function writeCoordinateReview(
  path: string,
  rows: CoordinateReviewRow[],
): void {
  const sorted = [...rows].sort((a, b) => a.id.localeCompare(b.id));
  const csv = stringify(sorted, { header: true, columns: COLUMNS });
  writeFileSync(path, csv, "utf-8");
}
