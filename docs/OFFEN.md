# OFFEN

Wird gepflegt, nicht überschrieben. Erledigtes bleibt eine Woche unter
„Kürzlich erledigt" und fliegt dann raus (steht in der Git-Historie).

---

## Letzte Claude-Code-Sitzung

*Claude Code überschreibt nur diesen Abschnitt. Höchstens 15 Zeilen.*

16.09.2026 — A-15 Tabelle ausgeschieden und nächtlicher Datenstand — **blockiert**
- Tabelle `ausgeschieden` existiert (Migration + direkt in Supabase
  angewendet), RLS an, keine Policy: ja, geprüft — Testzeile eingefügt, mit
  dem öffentlichen Schlüssel abgefragt (0 Zeilen), Testzeile wieder gelöscht.
- Action einmal ausgelöst, data/venues.json vollständig: nein — braucht
  zwei GitHub-Secrets und eine Berechtigungs-Einstellung, die nur Tim
  setzen kann (siehe „Du selbst").
- Zweiter Lauf ohne Commit: noch nicht geprüft, folgt nach dem ersten Lauf.
- Repo ist öffentlich → Action läuft im kostenlosen Rahmen, keine
  Rückfrage nötig.
- Kein Service-Role-Key verwendet, keine Ladendaten und kein App-Code
  geändert.

## Als Nächstes für Claude Code

- A-15 Tabelle ausgeschieden und nächtlicher Datenstand
- Sheet-Abgleich (Daten-Sitzung, braucht Tims CSV-Export als Anhang)

## Du selbst

- A-15 fertigstellen, zwei Dinge in GitHub anklicken (Werte stehen schon in
  Vercel unter Settings → Environment Variables, sind absichtlich
  öffentlich):
  1. github.com/kaverne-app/Kaverne → Settings → Secrets and variables →
     Actions → „New repository secret" → Name `NEXT_PUBLIC_SUPABASE_URL`,
     Wert aus Vercel übernehmen. Zweites Secret genauso mit Name
     `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
  2. Settings → Actions → General → „Workflow permissions" → „Read and
     write permissions" auswählen → Save (die Action muss committen
     können).
  Danach kurz Bescheid geben — löse ich die Action aus und prüfe die
  Prüfkriterien.
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
