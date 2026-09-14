# Kaverne — Regeln für Claude Code

**Diese Datei enthält nur dauerhafte Regeln.** Sie wird in jeder Sitzung
mitgelesen. Was gerade gebaut wird, steht in der jeweiligen
Aufgabenbeschreibung; der Stand der Arbeit steht in `STAND.md`.
Keine Sitzungsziele, keine Aufgaben, keine „nicht in dieser Sitzung"-Listen
in dieser Datei.

---

## Zusammenarbeit

- Tim liest keinen Code. Entscheidungen so erklären, dass er sie ohne Code
  beurteilen kann.
- Die Daten sind echt und lückenhaft. Bei den meisten Läden ist ungefähr die
  Hälfte der Felder leer. Das ist Absicht, kein Fehler in den Daten.
- Bei Unklarheit nachfragen, statt Platzhalter oder Beispieldaten zu erfinden.
- Eine Aufgabe pro Sitzung. Nach jedem abgeschlossenen Baustein anhalten und
  zeigen, was Tim prüfen kann.
- Am Ende jeder Sitzung `STAND.md` überschreiben (siehe unten).

## Stack — verbindlich

- Next.js, gehostet auf Vercel
- Supabase (Postgres)
- MapLibre GL mit freiem Tile-Anbieter
- Mobil zuerst. Nichts einbauen, was eine spätere Überführung per Capacitor
  verhindert.

## Verbote

- Google Maps Platform oder ein anderer Google-Dienst.
- Konto, Login, öffentliche Bewertungen, Eventkalender. Alles vier gehört in
  Phase 4 und wird nicht vorbereitet.
- `venues_internal` wird von der App nie abgefragt. Nicht „im Frontend
  ausgeblendet" — die Abfrage existiert nicht. Gilt besonders für
  `ansprechpartner`, das personenbezogene Daten enthält.
- Fremde Bilder, Logos und Texte nicht übernehmen, auch nicht von Instagram.
- Fremde Datenbanken nicht automatisiert auslesen.
- Keine Beispiel- oder Platzhalterdaten in der Datenbank.

## Datenmodell — feste Regeln

- Zwei Tabellen: `venues` (sichtbar) und `venues_internal` (nie abgefragt).
- `id` ist Text nach dem Schema `stadt-name`, ohne Umlaute, ß und
  Großbuchstaben. Eine ID wird nie geändert und nie wiederverwendet.
- Der Import ist wiederholbar: ein zweiter Lauf aktualisiert bestehende Zeilen
  anhand der `id` und legt keine Dubletten an.
- Leere Zellen bleiben leer. Nie „nein", „0" oder „unbekannt".
- Koordinaten werden beim Import aus der Adresse erzeugt und zuerst in eine
  Prüfdatei geschrieben. Erst nach Bestätigung gehen sie in die Datenbank.
- `genres` und `typ` kommen aus festen Listen. Kein Freitext.
- `links` bleibt eine flexible Liste aus Typ und URL.
- Für Personen und Reihen existieren eigene Objekte. In v1 werden sie als
  Textfeld gefüllt, die Struktur steht trotzdem.
- Eine Beitragstabelle (Titel, Slug, Text, Datum, Verknüpfung auf Laden,
  Person oder Reihe) existiert und bleibt leer. Die URL-Struktur sieht
  `/magazin` von Anfang an vor.

## Anzeigeregeln

- Leere Felder verschwinden vollständig. Kein Platzhalter, kein ausgegrauter
  Text, keine Aufforderung an den Nutzer, etwas beizusteuern.
- Ist ein ganzer Block leer, verschwindet auch seine Überschrift.
- Ein Laden, bei dem nur die Pflichtfelder gefüllt sind, sieht nach einer
  fertigen Seite aus und nicht nach einem Fehler.
- `residents` steht in der Datenbank und wird nicht angezeigt.
- „Zuletzt geprüft", Herkunft und Quellenangaben werden nie angezeigt.
- Ein Eintrag erscheint nur, wenn alles davon zutrifft: Name, Typ, Stadt und
  Adresse vorhanden; Koordinaten bestätigt; mindestens ein Genre aus der
  festen Liste; Status „aktiv" oder „unregelmäßig"; mindestens ein Link;
  `zuletzt_geprueft` gesetzt.
- Blockreihenfolge auf der Detailseite: Wann & wo · Programm & Kanäle ·
  Preise & Größe · Vor Ort.
- Alles in Daumenreichweite bedienbar.

## Nicht selbst entscheiden

Diese Punkte werden nicht umgesetzt, sondern in `STAND.md` unter
„Braucht Entscheidung" eingetragen:

- Änderungen am Datenmodell
- Neue Dienste oder Abhängigkeiten, die Geld kosten können
- Jeder Zugriff auf `venues_internal`
- Alles, was diesen Regeln widerspricht

## STAND.md

Am Ende jeder Sitzung überschreiben, nicht fortschreiben. Höchstens eine
Seite, kein Code, keine personenbezogenen Daten. Abschnitte:

1. Datum und Aufgaben-ID
2. Status je Aufgabe (offen / in Arbeit / fertig / blockiert)
3. Akzeptanzkriterien: je Kriterium erfüllt ja oder nein, und wie geprüft
4. Abweichungen von der Aufgabenbeschreibung, mit Grund
5. Braucht Entscheidung von Tim
6. Bekannte Fehler
7. Musst du selbst tun (Konten, Zugangsschlüssel, Einstellungen)
