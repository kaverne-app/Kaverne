# STAND.md

Wird am Ende jeder Sitzung überschrieben. Gibt den tatsächlichen Stand
wieder, nicht den geplanten.

## 1. Datum und Aufgaben-ID

2026-09-14 — Baustein 7: `CLAUDE.md` und `STAND.md` anlegen, damit
folgende Sitzungen ohne den bisherigen Gesprächsverlauf auskommen.

## 2. Status je Aufgabe

- Baustein 1 (Datenbank, Import): **fertig**. `venues` und
  `venues_internal` angelegt, CSV-Import (Kommandozeile und SQL-Editor-Weg)
  funktioniert, RLS geprüft.
- Baustein 2 (Liste, Detailseite): **fertig**.
- Baustein 3 (Karte): **fertig**. MapLibre GL 5.24.0 + OpenFreeMap.
- Baustein 4 (Filter, Favoriten, Notizen, Meldeknopf): **teilweise**. Filter
  über Stadt/Genre fertig. Favoriten, private Notiz und Meldeknopf **noch
  nicht begonnen** — Tim ist nach dem Filter direkt zu Baustein 5
  weitergegangen.
- Baustein 5 (Beitragstabelle, Magazin-Struktur ohne Inhalte): **fertig**.
- Baustein 6 (Startseite als Verteiler): **fertig**, bis auf den Text für
  `/ueber` — der ist noch offen, Tim wurde danach gefragt, Antwort steht
  noch aus.
- Baustein 7 (diese Aufgabe): **in Arbeit** — diese Datei ist das Ergebnis.

## 3. Akzeptanzkriterien (Baustein 7)

- `CLAUDE.md` existiert, unter 200 Zeilen, enthält Projektüberblick +
  geforderte Regeln — **ja**, geprüft durch Durchsicht und Zeilenzählung
  (143 Zeilen).
- `STAND.md` existiert mit den acht Abschnitten, gibt echten Stand wieder
  — **ja**, diese Datei. Warum acht statt sieben: siehe Abschnitt 4.
- Abschnitt „Abgleich mit den Festlegungen" vorhanden — **ja**, Abschnitt 8.
- `/context` zeigt `CLAUDE.md` unter den geladenen Speicherdateien — **nicht
  von mir geprüft**. Das ist ein CLI-Befehl, den nur Tim selbst ausführen
  kann; die Datei liegt korrekt im Projekt-Hauptverzeichnis, das sollte
  reichen, aber bitte einmal selbst nachsehen.

## 4. Abweichungen von der Aufgabenbeschreibung, mit Grund

- **STAND.md hat acht statt sieben Abschnitte.** Tim hat auf Nachfrage
  gesagt, die Abschnitte stünden in `CLAUDE.md` — dort standen aber nur
  sieben, ohne „Abgleich mit den Festlegungen". Ich habe diesen Abschnitt
  als achten Punkt ergänzt (in `CLAUDE.md` und hier), weil er in der
  Aufgabenbeschreibung für Baustein 7 ausdrücklich verlangt war und
  inhaltlich nicht zu den bestehenden sieben passt. Bei Bedarf einfach in
  `CLAUDE.md` korrigieren.
- **Neu entdeckte Lücke, nicht behoben:** `CLAUDE.md` (von Tim direkt
  geschrieben) verlangt unter „Anzeigeregeln", dass ein Eintrag nur
  erscheint, wenn u. a. Status „aktiv"/„unregelmäßig", mindestens ein Link
  und `zuletzt_geprueft` gesetzt sind. Die App filtert aktuell nicht danach
  — Liste, Karte und Detailseite zeigen jeden Laden aus `venues`, unabhängig
  von Status, Links oder Prüfdatum. Das war nicht Teil dieser Aufgabe
  (nur `CLAUDE.md`/`STAND.md` betroffen), deshalb nicht mit behoben.

## 5. Braucht Entscheidung von Tim

- **`genres` und `typ` sind aktuell freier Text**, keine feste Liste im
  Datenmodell hinterlegt (keine Lookup-Tabelle, kein Check-Constraint) —
  die Werte kommen unverändert aus dem CSV-Import. Um die neue Regel
  „kommen aus festen Listen" technisch durchzusetzen, wäre eine
  Datenmodell-Änderung nötig. Nicht selbst umgesetzt, siehe „Nicht selbst
  entscheiden" in `CLAUDE.md`.
- **Anzeigefilter fehlt** (Status/Link/Prüfdatum, siehe Abschnitt 4) — ist
  keine Datenmodell-Änderung, aber eine sichtbare Verhaltensänderung für
  die live laufende Seite. Rückmeldung von Tim einholen, bevor das
  umgesetzt wird.

## 6. Bekannte Fehler

- **Automatisches Geocoding ungetestet gegen den echten Dienst.** In jeder
  bisherigen Sitzung war der Kartendienst (Nominatim, OpenFreeMap) aus der
  Sandbox heraus netzwerkseitig blockiert. `npm run geocode` lief nie
  erfolgreich gegen den echten Dienst durch. Die 13 aktuell in der
  Datenbank stehenden Koordinaten hat Tim von Hand ermittelt und per SQL
  eingetragen, nicht das Skript.
- Sonst keine offenen Fehler bekannt. Alles bisher Gebaute wurde nur gegen
  einen lokalen Mock-Server bzw. eine lokale Postgres-Instanz getestet,
  nie gegen das echte Supabase-Projekt aus dieser Umgebung heraus (kein
  Netzwerkzugriff) — die eigentliche Bestätigung „funktioniert live" kam
  bisher immer von Tim selbst nach dem Deploy.

## 7. Musst du selbst tun

- **Prüfen, ob `supabase/migrations/0002_posts.sql` bereits im
  SQL-Editor eingefügt wurde.** Das wurde nach Baustein 5 geschickt, aber
  nie ausdrücklich bestätigt (anders als `0001_init.sql`). Ohne diese
  Migration fragen `/`, `/liste`, `/karte` und `/magazin` eine nicht
  existierende Tabelle `posts` ab — das würde auf der echten Seite zu
  einem Fehler führen, nicht nur auf `/magazin`.
- Text für `/ueber` liefern (siehe Abschnitt 2).
- Bei Gelegenheit selbst per `/context` nachsehen, ob `CLAUDE.md` als
  geladene Speicherdatei auftaucht (siehe Abschnitt 3).

## 8. Abgleich mit den Festlegungen

- **Trennung der internen Felder:** eingehalten. `venues_internal` hat
  keine Zugriffsregel (RLS ohne Policy), `venues` hat eine
  Lese-für-alle-Regel. Die Codebasis (`lib/venues.ts`, `lib/posts.ts`)
  fragt `venues_internal` an keiner Stelle ab — per Codesuche geprüft.
  `ansprechpartner` liegt ausschließlich in `venues_internal`.
- **Kartenanbieter:** eingehalten. MapLibre GL (Version 5.24.0) mit
  OpenFreeMap-Kachelstil, kein Google-Dienst im Code. Tim hat auf dem
  eigenen Gerät bestätigt, dass Straßen und Beschriftungen laden.
- **Beitragstabelle vorhanden:** eingehalten, mit Einschränkung. Die
  Migration `0002_posts.sql` legt `posts`, `people`, `reihen` an und wurde
  lokal gegen Postgres getestet. Ob sie im echten Supabase-Projekt schon
  eingespielt ist, ist **nicht bestätigt** (siehe Abschnitt 7).
- **`/magazin`-URL-Struktur vorhanden:** eingehalten. `/magazin` und
  `/magazin/[slug]` existieren, zeigen ohne Beiträge eine leere Übersicht
  statt eines Fehlers und liefern für einen unbekannten Slug 404 — gegen
  einen Mock-Server geprüft. Live-Verhalten hängt von Abschnitt 7 ab.
