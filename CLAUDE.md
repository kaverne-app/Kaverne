# Kaverne — Regeln für Claude Code

**Diese Datei enthält Regeln für die Arbeit am Code**, nicht fürs
Produkt — das steht in `docs/KAVERNE.md`. Was ansteht und zu entscheiden
ist, steht in `docs/OFFEN.md`. Keine Sitzungsziele, keine Aufgaben, keine
„nicht in dieser Sitzung"-Listen in dieser Datei.

---

## Projektüberblick

Kaverne ist ein mobiles Verzeichnis von Clubs und Venues für elektronische
Musik im Südwesten Deutschlands: Liste, Karte, dazu ein noch leeres
Magazin-Gerüst.

**Stack:** Next.js 14 (App Router, TypeScript), Supabase (Postgres),
MapLibre GL für die Karte, gehostet auf Vercel.

**Seiten (`app/`):**
- `/` — Startseite/Verteiler
- `/liste` — alle Läden, gruppiert nach Stadt
- `/karte` — Karte mit Pins
- `/venues/[id]` — Detailseite eines Ladens
- `/magazin`, `/magazin/[slug]` — Beitragsübersicht/-detail (Struktur da,
  aktuell ohne Beiträge)
- `/ueber` — nur Gerüst, Text noch offen

**Verzeichnisse:**
- `lib/` — Supabase-Zugriff und reine Anzeigelogik (keine Seiteneffekte)
- `components/` — Client-Komponenten (Karte, Filter, Listen)
- `scripts/` — Kommandozeilen-Werkzeuge für den CSV-Import
- `supabase/migrations/` — SQL zum Anlegen und Ändern der Tabellen

**Datenbank:** `venues` (öffentlich lesbar) und `venues_internal` (nie
abgefragt); dazu `posts`, `people`, `reihen` für das Magazin.

**Befehle:** `npm run dev` / `build` / `lint`; `npm run geocode -- <csv>`
ermittelt Koordinaten und schreibt eine Prüfdatei; `npm run import -- <csv>`
importiert nach Supabase (braucht `SUPABASE_SERVICE_ROLE_KEY`);
`npx tsx scripts/generate-import-sql.ts` bzw. `generate-coordinates-sql.ts`
erzeugen fertiges SQL zum Einfügen im Supabase-Editor, wenn keine
Kommandozeile zur Verfügung steht.

**Umgebung:** `NEXT_PUBLIC_SUPABASE_URL` und `NEXT_PUBLIC_SUPABASE_ANON_KEY`
sind in Vercel als Config (nicht Secret) hinterlegt, weil sie absichtlich
öffentlich sind — abgesichert wird über Row-Level-Security, nicht Geheimhaltung.

## Supabase-Zugriff

- Lesen aus `venues`, `posts`, `people`, `reihen` ist erlaubt.
- Schreiben in die Live-Datenbank (Import, Migration) nur, nachdem Tim in der
  Sitzung die konkrete Änderung bestätigt hat: welche Zeilen neu sind, welche
  aktualisiert werden, welche Spalten sich ändern.
- Jede Schemaänderung liegt zusätzlich als Datei in `supabase/migrations`.
- Inhalte aus `venues_internal` nie lesen, ausgeben oder in Dateien schreiben.
  Das Importwerkzeug darf dorthin schreiben.

---

## Zusammenarbeit

- Tim liest keinen Code. Entscheidungen so erklären, dass er sie ohne Code
  beurteilen kann.
- Die Daten sind echt und lückenhaft. Bei den meisten Läden ist ungefähr die
  Hälfte der Felder leer. Das ist Absicht, kein Fehler in den Daten.
- Bei Unklarheit nachfragen, statt Platzhalter oder Beispieldaten zu erfinden.
- Eine Aufgabe pro Sitzung. Nach jedem abgeschlossenen Baustein anhalten und
  zeigen, was Tim prüfen kann.
- Am Ende jeder Sitzung `docs/OFFEN.md` pflegen (siehe unten).
- Gibt Tim eine „Übergabe" aus einem Projektchat, werden die genannten
  Änderungen wörtlich in `docs/KAVERNE.md` bzw. `docs/OFFEN.md` übernommen.
  Widerspricht eine Änderung dem Code oder dieser Datei, vorher nachfragen.

## Stack — verbindlich

- Next.js, gehostet auf Vercel
- Supabase (Postgres)
- MapLibre GL mit freiem Tile-Anbieter
- Meldeformular verschickt E-Mails serverseitig über Resend (kostenlose
  Stufe). Empfängeradresse steht nur als Umgebungsvariable, nie im Quelltext.
- Mobil zuerst. Nichts einbauen, was eine spätere Überführung per Capacitor
  verhindert.

## Verbote

- Google Maps Platform oder ein anderer Google-Dienst.
- Konto, Login, Bewertungen (öffentlich wie privat), Eventkalender,
  Merkliste, private Notizen. Gehört alles in spätere Phasen und wird nicht
  vorbereitet.
- Fremde Bilder, Logos und Texte nicht übernehmen, auch nicht von Instagram.
- Fremde Datenbanken nicht automatisiert auslesen.
- Keine Beispiel- oder Platzhalterdaten in der Datenbank.

## Produktregeln

- Feldlisten, Aufnahme-, Anzeige- und Rechercheregeln stehen in
  `docs/KAVERNE.md`. Vor jeder Aufgabe, die Daten, Import oder Anzeige
  betrifft, die Abschnitte „Datenfelder" und „Anzeige" lesen.
- `venues_internal` wird von der App nie abgefragt; die Abfrage existiert
  nicht. Gilt besonders für `ansprechpartner`.
- IDs werden nie geändert oder wiederverwendet.
- Der Import ist wiederholbar und aktualisiert anhand der `id`.
- Leere Zellen bleiben leer, nie „nein", „0" oder „unbekannt".
- Neue Koordinaten gehen zuerst in eine Prüfdatei.

## Nicht selbst entscheiden

Diese Punkte werden nicht umgesetzt, sondern in `docs/OFFEN.md` unter
„Zu entscheiden" eingetragen:

- Änderungen am Datenmodell
- Neue Dienste oder Abhängigkeiten, die Geld kosten können
- Jeder Zugriff auf `venues_internal` außerhalb des Importwerkzeugs
- Alles, was diesen Regeln widerspricht

## OFFEN.md

Am Ende jeder Sitzung in `docs/OFFEN.md`:

a) Den Abschnitt „Letzte Claude-Code-Sitzung" überschreiben: Datum,
   Aufgaben-ID, Status (fertig / blockiert / abgebrochen), je Prüfkriterium
   erfüllt ja/nein und wie geprüft, Abweichungen mit Grund, bekannte Fehler.
   Höchstens 15 Zeilen, kein Code, keine personenbezogenen Daten.
b) Die erledigte Aufgabe aus „Als Nächstes für Claude Code" nach „Kürzlich
   erledigt" verschieben, Einträge älter als eine Woche dort löschen.
c) Neues eintragen unter „Zu entscheiden" oder „Du selbst".

Alle anderen Abschnitte von `docs/OFFEN.md` nicht umformulieren.
