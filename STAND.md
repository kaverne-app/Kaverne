# STAND.md

Wird am Ende jeder Sitzung überschrieben. Gibt den tatsächlichen Stand
wieder, nicht den geplanten.

## 1. Datum und Aufgaben-ID

2026-09-15 — A-11: Neue Einträge aus dem erweiterten Sheet importiert.

## 2. Status je Aufgabe

- Baustein 1–8, A-02, A-03: **fertig**, unverändert (siehe frühere
  Fassungen dieser Datei für Details).
- A-04, A-06, A-07, A-08, A-10: **fertig**, unverändert.
- A-11 (diese Aufgabe): **fertig**.

## 3. Akzeptanzkriterien (A-11)

- Prüfdatei nennt je Zeile Name, Adresse und Fundstelle im Klartext,
  Zeilen ohne Treffer erkennbar — **ja, mit Einschränkung**: Alle 19
  Zeilen im Sheet hatten bereits Koordinaten, es musste nichts
  geocodiert werden (0 Nominatim-Abfragen nötig). Dabei einen Fehler im
  bestehenden Skript behoben (`scripts/lib/read-csv.ts`,
  `scripts/geocode.ts`): Name und Adresse fehlten bisher in der
  Prüfdatei bei Zeilen mit Tabellen-Koordinaten. Eine unabhängige
  Gegenprüfung der Koordinaten per Rückwärts-Geocoding war nicht
  möglich, da diese Umgebung `nominatim.openstreetmap.org` nicht
  erreicht (wie bei den Kartenkacheln) — das steht als ehrlicher
  Hinweis in der Prüfdatei, statt eine Fundstelle vorzutäuschen. Tim
  hat die Datei erhalten und den Koordinaten vertraut.
- Import aktualisiert bestehende Zeilen anhand der id, keine Dubletten
  — **ja**: SQL mit `on conflict (id) do update` / `on conflict
  (venue_id) do update`, ausgeführt über den neu verfügbaren
  Supabase-MCP-Zugriff (direkter Netzwerkzugriff war weiterhin
  blockiert, siehe Abschnitt 4).
- Vor dem Schreiben genannt: neu/aktualisiert/Duplikate — **ja**: 6 neu
  (`mannheim-maimarkthalle`, `mannheim-msconnexioncomplex`,
  `ludwigshafen-lusbeachclub`, `heidelberg-halle02`,
  `saarbruecken-kulturfabrikkufa`, `pirmasens-lager14`), 13
  aktualisiert (alle bisher vorhandenen Zeilen), 0 doppelte IDs in der
  CSV. Vorab per `select id from venues` (13 vorhandene) gegen die 19
  CSV-IDs abgeglichen.
- Leere Zellen bleiben leer — **ja**, `emptyToNull`/`splitList`
  unverändert genutzt, keine Zelle mit „nein“/„0“/„unbekannt“ gefüllt.
- Nach Import: Gesamtzahl und Zahl ohne Koordinaten — **ja**: 19
  Einträge insgesamt, 0 ohne Koordinaten. Per SQL-Abfrage direkt gegen
  die Datenbank geprüft.
- Abbruch bei Wert außerhalb fester Liste bei `typ`/`genres` — **ja,
  mit Klärung**: Es gibt aktuell keine im Code hinterlegte feste Liste
  (nur die Regel in `CLAUDE.md`, ohne konkrete Werte). Tim hat die im
  Sheet vorkommenden Werte vorläufig bestätigt: `typ` — Bar, Club,
  Location; `genres` — Gemischt, House, Tech House, Techno, Trance.
  Ausdrücklich als vorläufig markiert, wird sich noch ändern (siehe
  Abschnitt 5). Keine Zeile lag außerhalb dieser Werte, daher kein
  Abbruch nötig.

## 4. Abweichungen von der Aufgabenbeschreibung, mit Grund

- **Zwei IDs vor dem Import korrigiert, mit Tims Bestätigung:**
  `saarbrücken-kulturfabrikkufa` → `saarbruecken-kulturfabrikkufa`
  (enthielt einen Umlaut, widersprach der ID-Regel und der Schreibweise
  der übrigen Saarbrücken-Einträge) und
  `ludiwgshafen-lusbeachclub` → `ludwigshafen-lusbeachclub`
  (Tippfehler im Stadtnamen). Nichts selbst geraten — beides
  zurückgemeldet und erst nach Tims Antwort geändert.
- **Import lief über den Supabase-MCP-Zugriff, nicht über
  `npm run import` oder eingefügtes SQL im Editor.** Zunächst war
  direkter Netzwerkzugriff auf Supabase blockiert (wie in `CLAUDE.md`
  dokumentiert); das fertige SQL wurde erst per `generate-import-sql.ts`
  erzeugt und Tim zum Selbst-Ausführen geschickt. Auf Tims Bitte, es
  „noch einmal zu versuchen“, stand ein Supabase-MCP-Werkzeug zur
  Verfügung, mit dem ich das geprüfte, unveränderte SQL direkt
  ausgeführt und das Ergebnis verifiziert habe (Tabellenschema vorher
  eingesehen, IDs vorher/nachher abgeglichen).

## 5. Braucht Entscheidung von Tim

- **Feste Wertelisten für `typ`/`genres` sind nur vorläufig**, laut Tim
  ausdrücklich noch nicht endgültig. Sobald sie feststehen, sollten sie
  irgendwo verbindlich hinterlegt werden (`CLAUDE.md` und/oder eine
  Prüfung im Import-Skript), damit „Abbruch bei Wert außerhalb der
  Liste“ beim nächsten Import auch technisch durchsetzbar ist — aktuell
  ist es nur eine Sichtprüfung durch mich ohne echte Referenzliste.

## 6. Bekannte Fehler

- **Kartenkacheln laden in der Entwicklungs-/Testumgebung dieser
  Sitzung nicht** (unverändert) — Netzwerksperre dieser Sandbox
  gegenüber `tiles.openfreemap.org`, betrifft nicht die Live-Seite.
- **Reihen-Freitext „uper Schwarzes Mannheim“ bei
  `mannheim-msconnexioncomplex`** — sieht nach einem Tippfehler im
  Original-Sheet aus („Super“?), wurde unverändert übernommen, da
  Freitextfelder nicht Teil der Prüfpflicht dieser Aufgabe waren
  (nur ID, Pflichtfelder, `typ`/`genres`). Nicht selbst korrigiert.
- Sonst keine offenen Fehler bekannt.

## 7. Musst du selbst tun

- Nichts offen für diesen Import. Weiterhin offen: die Wertelisten für
  `typ`/`genres` endgültig festlegen (siehe Abschnitt 5).
