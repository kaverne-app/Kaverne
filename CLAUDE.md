# Kaverne — Regeln für Claude Code

Diese Datei gilt für jede Sitzung in diesem Repository, nicht nur fürs
Bauen. Was fürs Produkt gilt, steht in `docs/KAVERNE.md`, was ansteht in
`docs/OFFEN.md`. Keine Sitzungsziele oder Aufgabenlisten in dieser Datei.

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
- `/ueber` — Über-Seite

**Verzeichnisse:**
- `lib/` — Supabase-Zugriff und reine Anzeigelogik (keine Seiteneffekte)
- `components/` — Client-Komponenten (Karte, Filter, Listen)
- `scripts/` — Kommandozeilen-Werkzeuge für den CSV-Import
- `supabase/migrations/` — SQL zum Anlegen und Ändern der Tabellen
- `lokal/` — Dateien, die Tim als Anhang schickt (z. B. Sheet-Export) und
  die die Sitzung dort ablegt, nie committen

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

## Sitzungen

- Ein Thema pro Sitzung. Tims erster Satz sagt, worum es geht.
- Zu Beginn jeder Sitzung git pull. Am Ende jeder Sitzung, die etwas
  geändert hat: committen und pushen. Nichts bleibt uncommittet liegen.
- Zu Beginn jeder Sitzung prüfen, ob offene Pull Requests früherer
  Sitzungen existieren. Wenn ja, zuerst nennen, was darin steckt und ob er
  zusammengeführt werden kann.
- Jede Sitzung arbeitet auf ihrem eigenen Zweig und erstellt am Ende selbst
  einen Pull Request nach main. Ändert er nur docs/, CLAUDE.md oder data/,
  wird er automatisch zusammengeführt. Ändert er App-Code, führt Tim ihn
  zusammen, nachdem er die Vorschau geprüft hat. Dann Tim den Link zum Pull
  Request und zur Vorschau geben und in einfachen Worten sagen, wo er
  klickt.
- Sitzungen laufen in einer Cloud-Umgebung. Dateien gibt Tim als Anhang in
  der Nachricht, nicht über einen Ordner.
- Stand: „Was steht an?" aus docs/OFFEN.md beantworten, kurz, nach
  Dringlichkeit.
- Bauen: Aufgabe aus docs/OFFEN.md. Arbeit auf einem eigenen Zweig,
  pushen, Vercel baut eine Vorschau. Tim den Vorschau-Link geben und sagen,
  was er dort prüfen soll. Erst nach Tims „live" in main zusammenführen.
  Ändert die Aufgabe nichts an der Seite, entfällt die Vorschau. Danach
  „Letzte Claude-Code-Sitzung" in docs/OFFEN.md schreiben.
- Klären (Entscheidungen, Ideen, Texte, Marke, Recht): kein App-Code.
  Freigegebene Texte dürfen in bestehende Seiten eingesetzt werden, ohne
  Layout- oder Logikänderung (über Vorschau wie beim Bauen). Jede
  Entscheidung wird noch in derselben Sitzung in docs/KAVERNE.md oder
  docs/OFFEN.md eingetragen; die geänderten Sätze kurz nennen. Beschlossene
  Bauaufgaben bekommen die nächste freie Nummer A-xx und stehen mit Ziel,
  Prüfkriterien und Verboten unter „Als Nächstes für Claude Code". Eine
  Entscheidung, die nicht in einer Datei steht, gilt nicht.
- Recherche: Regeln aus docs/KAVERNE.md, Abschnitte „Recherche" und
  „Datenfelder". Ergebnis als Steckbrief mit Quellen. Nach Tims „anlegen"
  direkt in Supabase schreiben. Nach „aussortieren" in die Tabelle
  ausgeschieden. Wenige Seitenabrufe.
- Daten: Änderungen direkt in Supabase nach „Supabase-Zugriff".
  „Datenpflege Sonntag": zuerst nennen, was am längsten ungeprüft ist und
  was am dringendsten fehlt.

## Wie Tim arbeitet

- Tim entscheidet Produkt, Design und Vermarktung und liest keinen Code.
  Er prüft Ergebnisse, nicht Code. Technik so erklären, dass er sie ohne
  Code beurteilen kann. Keine Code- oder Diff-Blöcke zum Abnicken zeigen.
- Tim nie bitten, Dateien von Hand zu bearbeiten oder Text zwischen
  Werkzeugen zu kopieren. Was sich ändern muss, ändert die Sitzung selbst.
  Was nur Tim tun kann (Konten, Einstellungen, Freigaben, Recht,
  Sheet-Export), ausdrücklich und Schritt für Schritt sagen.
- Fragt Tim nach einer Entscheidung: entscheiden, keine Liste
  gleichwertiger Optionen.
- Schwache Ideen früh und direkt benennen. Kein Motivationston. Kurz halten.
- 10 h/Woche, schwache Wochen 4 h. Passt etwas nicht, streichen statt
  verdichten.
- Engpass sind Datenpflege, Nutzer und Recht, nicht Technik. Bei jedem
  Vorschlag mitprüfen: Wer pflegt die Daten, woher kommen die Nutzer?
- Bausteine aus „Bewusst nicht" in docs/KAVERNE.md nicht als Verbesserung
  vorschlagen. Bei Bedarf die Schwelle nennen.
- Widersprechen Tims Nachricht, die Dateien und die Datenbank: in einem
  Satz sagen und fragen, was gelten soll. Weicht die Praxis von einer Regel
  ab: einmal sagen und vorschlagen, Regel oder Praxis anzupassen.
- Aussagen zu Recht (DDG, DSGVO, TDDDG, DSA, MStV, UrhG, Datenbankschutz)
  und zu Preisen von Diensten nur mit Quelle und Datum oder als
  [ungeprüft]. Eigene Setzungen als [Annahme]. Keine erfundenen Zahlen.
  Bei echtem Rechtsrisiko auf anwaltliche Beratung hinweisen.

## Supabase-Zugriff

- Supabase ist die einzige Quelle für Ladendaten. Es gibt kein Sheet.
- Lesen: alle Tabellen. Ausnahme: die Spalten ansprechpartner und notiz in
  venues_internal nie lesen, ausgeben oder in Dateien schreiben; das
  Importwerkzeug darf sie schreiben.
- Ohne Rückfrage: Zeilen anlegen, Felder füllen oder ändern, Importe,
  Exporte, Migrationen, die eine in docs/KAVERNE.md beschlossene
  Feldänderung umsetzen.
- Nach jeder Datenänderung im Klartext auflisten: Laden · Feld · alt → neu.
- Nur nach Tims Bestätigung, in Klartext beschrieben statt als Code: Zeilen
  löschen, gefüllte Felder leeren, IDs ändern, gefüllte Spalten umbenennen
  oder löschen.
- Jede Schemaänderung liegt zusätzlich als Datei in supabase/migrations.

---

## Zusammenarbeit

- Die Daten sind echt und lückenhaft. Bei den meisten Läden ist ungefähr die
  Hälfte der Felder leer. Das ist Absicht, kein Fehler in den Daten.
- Bei Unklarheit nachfragen, statt Platzhalter oder Beispieldaten zu erfinden.
- Am Ende jeder Sitzung `docs/OFFEN.md` pflegen (siehe unten).

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
- Jeder Zugriff auf ansprechpartner oder notiz außerhalb des Importwerkzeugs
- Alles, was diesen Regeln widerspricht

## OFFEN.md

Am Ende jeder Bau-Sitzung in `docs/OFFEN.md`:

a) Den Abschnitt „Letzte Claude-Code-Sitzung" überschreiben: Datum,
   Aufgaben-ID, Status (fertig / blockiert / abgebrochen), je Prüfkriterium
   erfüllt ja/nein und wie geprüft, Abweichungen mit Grund, bekannte Fehler.
   Höchstens 15 Zeilen, kein Code, keine personenbezogenen Daten.
b) Die erledigte Aufgabe aus „Als Nächstes für Claude Code" nach „Kürzlich
   erledigt" verschieben, Einträge älter als eine Woche dort löschen.
c) Neues eintragen unter „Zu entscheiden" oder „Du selbst".

Andere Sitzungen (Klären, Recherche, Daten) ändern nur die davon
betroffenen Abschnitte, nicht „Letzte Claude-Code-Sitzung".

Alle anderen Abschnitte von `docs/OFFEN.md` nicht umformulieren.
