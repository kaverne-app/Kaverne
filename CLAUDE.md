# Aufgabenbeschreibung für Claude Code — Kaverne, erster Stand

**Ziel dieser Sitzung:** Eine Web-App, die auf dem Handy eine Karte und eine Liste der erfassten Läden zeigt, mit einer Detailseite pro Laden. Sonst nichts.

**Diese Datei wird als `CLAUDE.md` ins Hauptverzeichnis des Repositorys gelegt und bei jeder Sitzung mitgelesen.**

---

## Kontext

- Ich lese keinen Code. Erkläre Entscheidungen so, dass ich sie ohne Code beurteilen kann.
- Die Daten sind echt und lückenhaft. Ungefähr die Hälfte der Felder ist bei den meisten Läden leer. Das ist Absicht, nicht ein Fehler in den Daten.
- Wenn etwas unklar ist, frag nach, statt Platzhalter oder Beispieldaten zu erfinden.

## Stack — verbindlich

- Next.js, gehostet auf Vercel
- Supabase (Postgres) als Datenbank
- MapLibre GL mit freiem Tile-Anbieter
- Mobil zuerst. Keine Web-spezifischen Lösungen, die eine spätere Überführung per Capacitor verhindern.

**Ausdrücklich verboten:** Google Maps Platform, jede Form von Konto oder Login, Bewertungen, Events.

---

## Baustein 1 — Datenbank und Import

**Ziel:** Die Läden aus meinem Sheet liegen in Supabase.

**Tabellen:**
- `venues` — alle Felder, die der Nutzer sehen darf
- `venues_internal` — interne Felder, per Verweis auf `venues`

**Felder in `venues`:**
id (Text, z. B. `karlsruhe-gotec`, Primärschlüssel) · name · typ · stadt · adresse · lat · lon · genres (Mehrfachwerte) · status · oeffnungstage (Mehrfachwerte) · kurzbeschreibung · kapazitaet · residents · reihen · preisniveau · kartenzahlung · garderobe · raucherbereich · haltestelle · barrierefreiheit · kamerapolitik · links (Liste aus Typ und URL)

**Felder in `venues_internal`:**
venue_id · zuletzt_geprueft · herkunft · ansprechpartner · was_passiert_dort · notiz

**Akzeptanzkriterien:**
- Ein CSV-Export meines Sheets lässt sich importieren, ohne dass ich etwas von Hand nacharbeite.
- Leere Zellen landen als leer in der Datenbank, nicht als „nein", „0" oder „unbekannt".
- Der Import ist wiederholbar: ein zweiter Lauf mit korrigierten Daten aktualisiert bestehende Zeilen anhand der id und legt keine Dubletten an.
- Koordinaten werden beim Import aus der Adresse erzeugt und in eine Datei geschrieben, die ich prüfen kann, bevor sie in die Datenbank gehen.

**Verbote:**
- `venues_internal` wird von der App nie abgefragt. Nicht „im Frontend ausgeblendet" — die Abfrage existiert nicht. Das betrifft besonders `ansprechpartner`, das personenbezogene Daten enthält.

---

## Baustein 2 — Liste und Detailseite

**Ziel:** Ich kann auf dem Handy durch die Läden scrollen und einen davon öffnen.

**Liste:** pro Eintrag Name, Typ, Stadt, Genres. Sortiert nach Stadt, darin alphabetisch.

**Detailseite:** Name, Typ, Stadt, Genres, dann in Blöcken:
- Wann & wo — Öffnungstage, Adresse
- Programm & Kanäle — Reihen, Links
- Preise & Größe — Preisniveau, Kapazität
- Vor Ort — Kartenzahlung, Garderobe, Raucherbereich, Haltestelle, Barrierefreiheit, Kamerapolitik

**Akzeptanzkriterien:**
- Leere Felder verschwinden vollständig. Kein Platzhalter, kein ausgegrauter Text, keine Aufforderung, etwas beizusteuern.
- Ist ein ganzer Block leer, verschwindet auch die Überschrift.
- Ein Laden, bei dem nur die Pflichtfelder gefüllt sind, sieht trotzdem nach einer fertigen Seite aus und nicht nach einem Fehler.
- `residents` wird nicht angezeigt, obwohl es in der Datenbank steht.
- Die Seite ist auf einem Handy in Daumenreichweite bedienbar.

---

## Baustein 3 — Karte

**Ziel:** Alle Läden als Pins, Tippen führt zur Detailseite.

**Akzeptanzkriterien:**
- Die Karte zeigt alle Läden mit bestätigten Koordinaten.
- Tippen auf einen Pin zeigt Name und Stadt, ein zweiter Tipp öffnet die Detailseite.
- Startausschnitt umfasst alle Läden.
- Kein Google-Dienst im Spiel.

---

## Reihenfolge

Baustein 1, dann 2, dann 3. Nach jedem Baustein anhalten und mir zeigen, was ich prüfen kann.

## Nicht in dieser Sitzung

Filter, Favoriten, private Notizen, Meldeknopf, Suche, Impressum, Datenschutz, Gestaltung über das Nötigste hinaus, Bilder.
