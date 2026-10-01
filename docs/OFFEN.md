# OFFEN

Wird gepflegt, nicht überschrieben. Erledigtes bleibt eine Woche unter
„Kürzlich erledigt" und fliegt dann raus (steht in der Git-Historie).

---

## Letzte Claude-Code-Sitzung

*Claude Code überschreibt nur diesen Abschnitt. Höchstens 15 Zeilen.*

20.09.2026 — A-17 Detailseite-Felder — **fertig, Pull Request #39**
- Blöcke/Felder wie gefordert umgesetzt (Wann & wo · Kanäle · Vor Ort),
  Spalte `floors` ergänzt. Geprüft: Build/Lint sauber, Feldlabels und
  -reihenfolge im Browser mit echten Werten bestätigt (C2 Ost), Vorschau
  von Tim abgenommen.
- Reihen-Spalte gelöscht, von Tim in Klartext bestätigt. Betroffen: C2 Ost
  · reihen · „THRILLED!" → gelöscht; Das Zimmer · reihen ·
  „Der Donnerstag" → gelöscht; Disco Zwei · reihen ·
  „Ponyclub, PALS, Raserei" → gelöscht; Erdbeermund · reihen ·
  „Freak 'n Jones, Pandora, THRILLED!" → gelöscht; Gotec Club · reihen ·
  „SCHRANZ TILL I DIE, TRANCY & BOUNCY" → gelöscht; MS Connexion Complex ·
  reihen · „Super Schwarzes Mannheim, DEX!T Techno" → gelöscht.
- Import-Skripte (scripts/lib/types.ts, read-csv.ts, generate-import-sql.ts)
  an den Wegfall angepasst. Kein bekannter Fehler.

## Als Nächstes für Claude Code

**A-18 Datenbank verschlanken (Bau-Sitzung)**

Von Tim am 01.10.2026 entschieden und in Klartext bestätigt (siehe
docs/KAVERNE.md, „Datenfelder"). Ziel: Datenbank enthält nur noch `venues`
und `posts`; `venues` nur die Spalten, die gebraucht werden.

Fällt weg: Tabellen `ausgeschieden`, `venues_internal`, `people`, `reihen`;
in `posts` die Spalten `person_id`, `reihe_id` samt Prüfregel
`posts_single_reference`; in `venues` die Spalten `kapazitaet`, `residents`,
`preisniveau`, `barrierefreiheit`, `kamerapolitik`, `created_at`,
`updated_at` samt Trigger `venues_set_updated_at` (die Funktion
`set_updated_at` bleibt, `posts` nutzt sie). Bleibt: `garderobe`, `posts`
und das Magazin-Gerüst. Gefüllte Werte, die verloren gehen: Kapazität 1,
Residents 1, Barrierefreiheit 1, Kamerapolitik 4 Läden, Preisniveau keiner;
`venues_internal` 8 Zeilen. Die Läden-Werte stehen noch in der Git-Historie
von `data/venues.json`.

Zu tun:
- Code so ändern, dass er mit alter und neuer Datenbank läuft:
  `lib/posts.ts` und `app/magazin/[slug]` ohne Person/Reihe; Import-Werkzeuge
  (`scripts/import.ts`, `generate-import-sql.ts`, `scripts/lib/types.ts`,
  `read-csv.ts`) ohne `venues_internal` und ohne die gestrichenen Spalten
  (unbekannte CSV-Spalten werden ignoriert).
- Migration `0007` als Datei (mit `if exists`), nicht ausführen.
- README.md und CLAUDE.md anpassen: Datenbankzeile, Regeln zu
  `venues_internal`/ansprechpartner/notiz, `ausgeschieden` in Recherche,
  „Datenpflege Sonntag" (statt „am längsten ungeprüft": was am
  dringendsten fehlt).

Prüfkriterien: Build und Lint sauber · in Code, Skripten und Docs kein
Verweis mehr auf gestrichene Tabellen/Spalten (Suche) · `/`, `/clubs`,
`/venues/[id]`, `/magazin` in der Vorschau ohne Fehler, vor und nach dem
Löschen in Supabase · Import-Skript läuft gegen eine Testdatei ohne Fehler.

Verbote: DROP/DELETE nicht über das Supabase-Werkzeug ausführen (hängt).
Nichts außer den oben genannten Dingen entfernen. Keine Beispieldaten.

Danach (Du selbst): Sitzung gibt Tim die fertigen Zeilen für den SQL-Editor,
Tim führt sie aus, Sitzung prüft Tabellen und Spalten.

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

- Clubliste-Bereinigung: 10 Läden aus venues gelöscht (Tim im
  Supabase-Dashboard, weil DELETE über das Werkzeug hängt), Gesamtzahl
  23 geprüft (01.10.)
- Clubliste-Import: 15 neue Läden angelegt, 5 bestehende aktualisiert,
  Mauerpfeiffer-Haltestelle nach Tims Antwort ergänzt (01.10.), Details in
  der Nachricht an Tim
- A-17 Detailseite-Felder angepasst, Floors ergänzt, Reihen-Spalte
  gelöscht (20.09.)
- Fix Kartendarstellung: Dämpfung, Kartenbereich, Attribution, Filter (17.09.)
- Clubs-Seite mit Liste/Karte-Umschalter, Wortmarke verlinkt (16.09.)
- Sheet in „ARCHIV – nicht pflegen" umbenannt (16.09.)
- Erste Kurzbeschreibung: Gotec Club (16.09.)
- A-16 Automatisches Zusammenführen für Dokument-/Datenänderungen (16.09.)
- Sheet-Abgleich: Läden-Export gegen venues geprüft (keine Abweichungen
  außer dem Tippfehler unten), Ausgeschieden-Export in die Tabelle
  ausgeschieden übernommen (19 Zeilen), Tippfehler im Reihen-Text bei
  mannheim-msconnexioncomplex korrigiert (16.09.)
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
