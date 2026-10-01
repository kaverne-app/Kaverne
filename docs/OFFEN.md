# OFFEN

Wird gepflegt, nicht überschrieben. Erledigtes bleibt eine Woche unter
„Kürzlich erledigt" und fliegt dann raus (steht in der Git-Historie).

---

## Letzte Claude-Code-Sitzung

*Claude Code überschreibt nur diesen Abschnitt. Höchstens 15 Zeilen.*

01.10.2026 — A-18 Datenbank verschlanken — **fertig, Pull Request #47**
- Build und Lint sauber (ja, `npm run build`/`lint`). Suche in Code,
  Skripten und Docs: kein Verweis mehr auf gestrichene Tabellen/Spalten,
  außer in den alten Migrationen 0001–0006 und der Entscheidung in
  docs/KAVERNE.md (ja).
- Import-Werkzeug gegen Testdatei mit alten Spalten (nur lokal, nichts
  importiert): erzeugtes SQL ohne gestrichene Spalten, alte CSV-Spalten
  ignoriert (ja). `npm run import` selbst ohne Service-Key nicht gelaufen.
- Vorschau vor dem Löschen von Tim abgenommen (ja). Migration `0007` von Tim
  im SQL-Editor ausgeführt. Danach geprüft: nur `venues` (18 Spalten) und
  `posts` (8 Spalten) übrig, 23 Läden, Funktion `set_updated_at` da, alter
  Trigger weg (ja).
- Seiten nach dem Löschen: die Abfragen der Seiten (Liste, Karte, Detail,
  Magazin) laufen gegen die neue Datenbank fehlerfrei; die Live-Seite selbst
  habe ich nicht geöffnet, Tim bitte kurz ansehen.
- Abweichung: `parseGermanDate` in normalize.ts bleibt ungenutzt stehen
  (nicht in der Aufgabe genannt). Kein bekannter Fehler.

## Als Nächstes für Claude Code

Aktuell keine Aufgabe.

## Du selbst

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

- Haltestellen-Regel in KAVERNE.md („Datenfelder"), Haltestelle bei C2 Ost,
  Das Zimmer und Disco Zwei angepasst (01.10.)
- Daten: 3 Läden neu (Ebene 3, Motke, Adam Riese), 3 ergänzt (Erdbeermund,
  Das Zimmer, Disco Zwei), Gesamtzahl 26. Tim: bei Widerspruch gilt der Wert mit mehr
  Daten, Erdbeermund und Disco Zwei bleiben bei Genre/Öffnungstagen
  unverändert (01.10.)
- A-18 Datenbank verschlanken: Code, Migration 0007 und Löschen in Supabase
  erledigt, Tabellen und Spalten geprüft (01.10.)
- Clubliste-Bereinigung: 10 Läden aus venues gelöscht (Tim im
  Supabase-Dashboard, weil DELETE über das Werkzeug hängt), Gesamtzahl
  23 geprüft (01.10.)
- Clubliste-Import: 15 neue Läden angelegt, 5 bestehende aktualisiert,
  Mauerpfeiffer-Haltestelle nach Tims Antwort ergänzt (01.10.), Details in
  der Nachricht an Tim
