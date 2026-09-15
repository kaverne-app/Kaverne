# OFFEN

Wird gepflegt, nicht überschrieben. Erledigtes bleibt eine Woche unter
„Kürzlich erledigt" und fliegt dann raus (steht in der Git-Historie).

---

## Letzte Claude-Code-Sitzung

*Claude Code überschreibt nur diesen Abschnitt. Höchstens 15 Zeilen.*

15.09.2026 — A-12 Projektdokumente umgebaut — **fertig**
- `docs/KAVERNE.md`, `docs/OFFEN.md` unverändert aus den Anhängen übernommen.
- `CLAUDE.md` umgebaut: Produktregeln raus (Verweis auf KAVERNE.md statt
  doppelter Pflege), Pflege dieser Datei statt der alten Statusdatei, neuer
  Abschnitt Supabase-Zugriff, „venues_internal“-Ausnahme fürs Importwerkzeug.
- Die alte Statusdatei und die alte Datenschutz-Prüfdatei entfernt.
- Geprüft: `CLAUDE.md` jetzt unter 130 Zeilen; Repository-Suche nach dem
  Namen der alten Statusdatei ergibt keinen Treffer mehr außer hier;
  `npm run build` erfolgreich.
- Kein App-Code, keine Datenbankänderung.
- Bekannt: In den Anhängen zwei Auffälligkeiten entdeckt, nicht selbst
  korrigiert — siehe Rückmeldung im Chat.

## Als Nächstes für Claude Code

- **A-13** Feldliste nachziehen: Spalte `aussenbereich`, feste Listen für
  `typ`/`genres` an einer Stelle im Code, Import warnt bei unbekannten Werten
  (Aufgabenbeschreibung liegt vor)

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

- A-12 Projektdokumente umgebaut (15.09.)
- A-11 Import, 19 Einträge (15.09.)
- A-10 Datenschutzerklärung, Browser-Speicher (15.09.)
- A-08 Seite `/ueber` (15.09.)
- A-06 Filter in der Adresse statt im Browser-Speicher
