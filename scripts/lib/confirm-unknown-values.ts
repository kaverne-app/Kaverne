import { createInterface } from "node:readline/promises";
import { findeUnbekannteWerte, type RowForValidation } from "./fixed-lists";

// Listet vor dem Schreiben jeden Wert außerhalb der festen Listen (Zeile,
// Spalte, Wert) im Klartext auf und fragt, ob trotzdem importiert werden
// soll. Bei ausschließlich gültigen Werten passiert nichts, kein Nachfragen.
export async function confirmUnknownValuesOrExit(rows: RowForValidation[]): Promise<void> {
  const unbekannt = findeUnbekannteWerte(rows);
  if (unbekannt.length === 0) return;

  console.error(
    "Werte außerhalb der festen Listen (siehe docs/KAVERNE.md, Abschnitt \"Datenfelder\"):",
  );
  for (const u of unbekannt) {
    console.error(`  Zeile ${u.zeile} (${u.id}), Spalte ${u.spalte}: "${u.wert}"`);
  }

  // stderr statt stdout: generate-import-sql.ts leitet stdout in eine Datei
  // um, die Rückfrage muss trotzdem im Terminal sichtbar sein.
  const rl = createInterface({ input: process.stdin, output: process.stderr });
  const antwort = await rl.question("Trotzdem importieren? (j/N) ");
  rl.close();

  if (antwort.trim().toLowerCase() !== "j") {
    console.error("Abgebrochen.");
    process.exit(1);
  }
}
