# OFFEN

Wird gepflegt, nicht überschrieben. Erledigtes bleibt eine Woche unter
„Kürzlich erledigt" und fliegt dann raus (steht in der Git-Historie).

---

## Letzte Claude-Code-Sitzung

*Claude Code überschreibt nur diesen Abschnitt. Höchstens 15 Zeilen.*

16.09.2026 — A-15 Tabelle ausgeschieden und nächtlicher Datenstand — **fertig**
- Tabelle `ausgeschieden` existiert, RLS an, keine Policy: ja, geprüft —
  Testzeile eingefügt, mit dem öffentlichen Schlüssel abgefragt (0 Zeilen),
  Testzeile wieder gelöscht.
- Action einmal ausgelöst, data/venues.json vollständig: ja, alle 18 Läden,
  sortiert nach id — nach zwei Nachbesserungen (Node-Version, Vergleich
  überging neue Dateien) im dritten Anlauf geprüft.
- Zweiter Lauf ohne Datenänderung erzeugt keinen Commit: ja, geprüft.
- Migrationen 0004 und die zwei Korrekturen liefen über eigene Zweige +
  Pull Requests (#28–#30), auf Zuruf gemergt, kein Direkt-Push auf main.
- Kein Service-Role-Key verwendet, keine Ladendaten und kein App-Code
  geändert.

## Als Nächstes für Claude Code

- Sheet-Abgleich (Daten-Sitzung, braucht Tims CSV-Export als Anhang)

## Du selbst

- Kurzbeschreibungen: 0 von 18. Für „Öffnen" mindestens bei den Läden, die
  du selbst kennst.
- Vor dem Sheet-Abgleich: beide Tabs (Läden, Ausgeschieden) als CSV
  exportieren, Spalten Ansprechpartner und Notiz vorher löschen, Dateien als
  Anhang in der Daten-Sitzung schicken. Nach dem Abgleich Sheet in
  „ARCHIV – nicht pflegen" umbenennen.
- KUFA Saarbrücken: Programm prüfen (bleibt bis dahin drin).
- Vor der ersten Korrekturmail an Betreiber: Postfach mit AV-Vertrag.

## Zu entscheiden

- Themen für die ersten zwei bis drei Artikel.
- Schwelle für den Eventkalender — erst nach „Öffnen" relevant.

## Ideen

Ungeordnet, keine Zusage.
- Filter nach Öffnungstag
- Set-Aufnahmen, Veranstaltungsreihe, Label (siehe KAVERNE.md)

## Kürzlich erledigt

- A-15 Tabelle ausgeschieden und nächtlicher Datenstand (16.09.)
- Umstellung auf Claude Code als Arbeitsplatz (16.09.)
- Lu's Beach Club aus der Datenbank entfernt (16.09.), Grund kommt beim
  Sheet-Abgleich in die Tabelle ausgeschieden
- A-14 Grundgestaltung (16.09.)
- A-13 Feldliste an docs/KAVERNE.md angeglichen (15.09.)
- A-12 Projektdokumente umgebaut (15.09.)
- A-11 Import, 19 Einträge (15.09.)
- A-10 Datenschutzerklärung, Browser-Speicher (15.09.)
- A-08 Seite `/ueber` (15.09.)
- A-06 Filter in der Adresse statt im Browser-Speicher
