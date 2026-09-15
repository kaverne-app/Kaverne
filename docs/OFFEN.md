# OFFEN

Wird gepflegt, nicht überschrieben. Erledigtes bleibt eine Woche unter
„Kürzlich erledigt" und fliegt dann raus (steht in der Git-Historie).

---

## Letzte Claude-Code-Sitzung

*Claude Code überschreibt nur diesen Abschnitt. Höchstens 15 Zeilen.*

15.09.2026 — A-13 Feldliste an docs/KAVERNE.md angeglichen — **fertig**
- Spalte `aussenbereich` (ja/nein, leer erlaubt): Migration angelegt und
  nach Tims Bestätigung live angewendet (19 Zeilen unverändert, Spalte
  überall leer). CSV-Spalte „Außenbereich" wird gelesen, Detailseite zeigt
  sie im Block „Vor Ort", wenn gefüllt.
- Feste Listen für typ/genres jetzt an einer Stelle im Code
  (`scripts/lib/fixed-lists.ts`), wortgleich zu KAVERNE.md. Import listet
  unbekannte Werte (Zeile, Spalte, Wert) und fragt vor dem Schreiben nach.
- Lokal geprüft (nicht live): Probeimport mit „Tech-House" bricht ohne
  Bestätigung ab, mit Bestätigung läuft er durch; reiner Import mit
  gültigen Werten fragt nicht nach; „Gemischt" wird angezeigt und ist im
  Genre-Filter wählbar; leerer Vor-Ort-Block bleibt verborgen.
- `npm run build`/`lint` erfolgreich, „Tech House" kommt nur einmal im
  Code vor.

## Als Nächstes für Claude Code

## Du selbst

- Sheet, Tab „Listen": Typ = Club, Bar, Location, Festival. Genre wie in
  KAVERNE.md, „Gemischt" statt „EDM/Mixed". Dropdowns mit „Eingabe ablehnen".
  Spalte „Außenbereich" anlegen.
- Sheet: Tippfehler „uper Schwarzes Mannheim" prüfen.
- Kurzbeschreibungen: 0 von 19. Für „Öffnen" mindestens bei den Läden, die
  du selbst kennst.
- Empfangspostfach Meldeformular: Im Datenschutz-Chat war Gmail ohne
  AV-Vertrag als Lücke benannt, die Lösung lief über A-05, und A-05 wurde
  gestrichen. Klären, ob das Postfach inzwischen gewechselt ist.
- Recherche-Prompt an die Feldliste in KAVERNE.md anpassen (Parken und
  Getränkepreis raus, Raucher- und Außenbereich als ja/nein, Genre-Liste).

## Zu entscheiden

- Lu's Beach Club und KUFA Saarbrücken: In der Recherche ohne belegbares
  elektronisches Programm markiert, ein Abgleich mit der Aufnahmeregel ist
  nicht dokumentiert. Drin lassen oder aussortieren?
- Impressum: Wohnadresse oder c/o-Dienst — vor dem ersten Artikel.
- Themen für die ersten zwei bis drei Artikel.
- Gestaltung: Logo, Farben, Schrift.
- Schwelle für den Eventkalender — erst nach „Öffnen" relevant.

## Ideen

Ungeordnet, keine Zusage.
- Filter nach Öffnungstag
- Set-Aufnahmen, Veranstaltungsreihe, Label (siehe KAVERNE.md)

## Kürzlich erledigt

- A-13 Feldliste an docs/KAVERNE.md angeglichen (15.09.)
- A-12 Projektdokumente umgebaut (15.09.)
- A-11 Import, 19 Einträge (15.09.)
- A-10 Datenschutzerklärung, Browser-Speicher (15.09.)
- A-08 Seite `/ueber` (15.09.)
- A-06 Filter in der Adresse statt im Browser-Speicher
