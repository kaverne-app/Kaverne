# OFFEN

Wird gepflegt, nicht überschrieben. Erledigtes bleibt eine Woche unter
„Kürzlich erledigt" und fliegt dann raus (steht in der Git-Historie).

---

## Letzte Claude-Code-Sitzung

*Claude Code überschreibt nur diesen Abschnitt. Höchstens 15 Zeilen.*

01.10.2026 — A-18 Datenbank verschlanken — **Code fertig, Löschen in Supabase offen**
- Build und Lint sauber (ja, `npm run build`/`lint`). Suche in Code,
  Skripten und Docs: kein Verweis mehr auf gestrichene Tabellen/Spalten,
  außer in den alten Migrationen 0001–0006 und der Entscheidung in
  docs/KAVERNE.md (ja).
- Import-Werkzeug gegen Testdatei mit alten Spalten (nur lokal, nichts
  importiert): erzeugtes SQL ohne gestrichene Spalten, alte CSV-Spalten
  ignoriert (ja). `npm run import` selbst ohne Service-Key nicht gelaufen.
- Seiten `/`, `/clubs`, `/venues/[id]`, `/magazin` in der Vorschau vor und
  nach dem Löschen: noch offen (Tim prüft Vorschau; Löschen nach Merge).
- Migration `0007` liegt als Datei bereit, nicht ausgeführt.
- Abweichung: `parseGermanDate` in normalize.ts bleibt ungenutzt stehen
  (nicht in der Aufgabe genannt). Kein bekannter Fehler.

## Als Nächstes für Claude Code

Aktuell keine Aufgabe.

## Du selbst

- A-18: Nach Merge die Zeilen aus `supabase/migrations/0007_datenbank_verschlanken.sql`
  im Supabase-SQL-Editor ausführen (Sitzung gibt sie dir fertig), danach
  prüft die Sitzung Tabellen und Spalten.
- Kurzbeschreibungen: 1 von 23 (Gotec Club). Für „Öffnen" mindestens bei
  den Läden, die du selbst kennst.
- Postfach mit AV-Vertrag: erst nötig, sobald es einen wirklichen Release
  gibt und die Seite aktiv beworben wird — bis dahin läuft es über Google.

## Zu entscheiden

- Themen für die ersten zwei bis drei Artikel.
- Schwelle für den Eventkalender — erst nach „Öffnen" relevant, kommt noch
  ein gutes Stück später.
- Filterkriterium für Läden mit nur gelegentlichem Programm (z. B. KuFa
  Saarbrücken) — erst wenn mehr Läden dazukommen. Bis dahin bleibt KuFa
  drin.

## Ideen

Ungeordnet, keine Zusage.
- Filter nach Öffnungstag
- Set-Aufnahmen, Veranstaltungsreihe, Label (siehe KAVERNE.md)

## Kürzlich erledigt

- A-18 Datenbank verschlanken: Code und Migration 0007 fertig, SQL-Ausführung
  durch Tim und Prüfung danach offen (01.10.)
- Clubliste-Bereinigung: 10 Läden aus venues gelöscht (Tim im
  Supabase-Dashboard, weil DELETE über das Werkzeug hängt), Gesamtzahl
  23 geprüft (01.10.)
- Clubliste-Import: 15 neue Läden angelegt, 5 bestehende aktualisiert,
  Mauerpfeiffer-Haltestelle nach Tims Antwort ergänzt (01.10.), Details in
  der Nachricht an Tim
