# Prüfung für Impressum und Datenschutzerklärung (A-04)

Stand: 2026-09-14. Diese Datei beantwortet die für A-04 gestellten
Prüffragen als Grundlage für Impressum und Datenschutzerklärung. Keine
Änderung an der App — reine Bestandsaufnahme des Codes, wie er aktuell auf
`main` liegt.

**Hinweis zur Fragenzahl:** Die Aufgabenbeschreibung kündigt 14 Fragen an,
enthält aber nur 7 nummerierte Fragen. Die folgenden Antworten beziehen
sich auf genau diese 7. Falls weitere Fragen nachgereicht werden sollen,
bitte melden.

---

## 1. Werden Schriften mit der Seite ausgeliefert oder von einem fremden Server geladen (Google Fonts, Adobe, bunny.net)?

**Antwort: Weder noch — es wird ausschließlich die Systemschrift des
Geräts verwendet. Es gibt keinen Font-Ladevorgang, weder lokal noch von
einem fremden Server.**

Geprüft mit:
- `app/layout.tsx`: Kein `next/font`-Import, kein `<link>`-Tag zu einer
  Schriftart.
- `app/globals.css`: Die einzige `font-family`-Angabe im ganzen
  Stylesheet ist `font-family: system-ui, -apple-system, sans-serif;` —
  das ist die Systemschrift des jeweiligen Geräts, keine Datei, die
  irgendwo geladen wird.
- Codesuche `grep -rniE "font|googleapis|fonts\.g|bunny\.net|typekit|adobe"`
  über `app/`, `components/`, `lib/`: keine Treffer auf einen externen
  Font-Anbieter.

Damit entsteht durch Schriften keine Verbindung zu einem Drittanbieter.

## 2. Legt die App etwas in `localStorage`, `sessionStorage` oder Cookies ab — Filterzustand, Kartenposition, Zustimmungsbanner, sonst etwas?

**Antwort: Ja, zwei Werte in `localStorage`. Kein `sessionStorage`, keine
Cookies, kein Zustimmungsbanner.**

Geprüft mit Codesuche `grep -rniE "localStorage|sessionStorage|document\.cookie"`
über `app/`, `components/`, `lib/`, sowie Lesen der beiden Fundstellen:

- **`kaverne:filter`** (`lib/use-venue-filter.ts` über
  `lib/use-local-storage-state.ts`): speichert die aktuelle Filterauswahl
  (Stadt, Genre) im Browser, damit sie beim nächsten Besuch erhalten
  bleibt. Enthält nur die gewählten Filterwerte, keine Nutzerkennung.
- **`kaverne:last-report-at`** (`components/ReportButton.tsx`): speichert
  den Zeitpunkt der letzten erfolgreich abgeschickten Meldung, um
  versehentliches Mehrfach-Absenden vom selben Gerät für 60 Sekunden zu
  verhindern. Enthält nur einen Zeitstempel.

Keine Kartenposition wird gespeichert (die Karte startet immer mit dem
gleichen Ausschnitt). Kein `sessionStorage`-Zugriff im gesamten Code. Kein
`document.cookie`, keine Middleware (`find . -iname "middleware.ts"` ohne
Treffer außerhalb von `node_modules`), keine Cookie-Angaben in
`next.config.mjs` — die App setzt selbst keine Cookies. Ob Vercel als
Hosting-Anbieter serverseitig eigene technische Cookies setzt, kann ich
aus dem Repository nicht beurteilen — das müsste bei Vercel selbst
nachgesehen werden (z. B. Vercels eigene Datenschutz-/Cookie-Dokumentation).

## 3. Gibt es eingebettete Inhalte Dritter (Instagram-Feed, YouTube-Player, iframe), oder ausschließlich anklickbare Links?

**Antwort: Keine eingebetteten Drittinhalte. Instagram/Facebook/Website
erscheinen ausschließlich als anklickbare Links.**

Geprüft mit Codesuche `grep -rniE "iframe|embed|youtube|<script"` über
`app/`, `components/`, `lib/` — keine Treffer. Die Links zu externen
Profilen (`website`, `instagram`, `facebook`) werden in
`app/venues/[id]/page.tsx` als normale `<a href=... target="_blank">`
gerendert, mit sichtbarem Linktext („Website“, „Instagram“, „Facebook“).
Kein Nachladen von Inhalten dieser Anbieter, nur ein Verweis, dem der
Nutzer aktiv folgen muss.

**Nicht Teil dieser Frage, aber möglicherweise relevant:** Die Karte
(`/karte` und der Kartenausschnitt auf der Detailseite) lädt Kartenkacheln
vom externen, freien Anbieter OpenFreeMap nach — dabei erhält dieser
Anbieter technisch bedingt die IP-Adresse des Nutzers. Das ist kein
„eingebetteter Inhalt“ im Sinne von Social-Media-Widgets, aber ein
Datenabfluss an einen Drittanbieter, den ich der Vollständigkeit halber
erwähne, da er in der Datenschutzerklärung vermutlich auftauchen sollte.
Falls dazu eine eigene Prüffrage gewünscht ist, sag Bescheid.

## 4. Welchen Dienst ruft `npm run geocode` auf?

**Antwort: Nominatim (OpenStreetMap), ein freier Geocoding-Dienst.**

Geprüft mit: `package.json` (`"geocode": "tsx scripts/geocode.ts"`) und
Lesen von `scripts/geocode.ts`. Dort steht die feste URL
`https://nominatim.openstreetmap.org/search`; für jede Adresse ohne
vorhandene Koordinaten schickt das Skript die Adresse als
URL-Parameter (`q=`) dorthin, mit einem festen `User-Agent`
(`kaverne-import/0.1 (privates Club-Verzeichnis)`) und einer
Wartezeit von 1,1 Sekunden zwischen den Anfragen gemäß Nominatims
Nutzungsbedingungen.

Wichtig für die Einordnung: Dieser Aufruf passiert **nicht durch
Website-Besucher**, sondern nur, wenn du selbst `npm run geocode`
lokal auf der Kommandozeile ausführst, um Adressen aus einer neuen
CSV-Datei mit Koordinaten zu versehen (Teil des Import-Werkzeugs, siehe
`scripts/`). Für die Datenschutzerklärung der Website selbst ist das
also nicht relevant — es betrifft nur deinen eigenen Arbeitsablauf beim
Pflegen der Daten, nicht die Verarbeitung von Besucherdaten.

## 5. [Vorrang] Ist Row-Level-Security auf `venues` und `venues_internal` aktiv, und ist `venues_internal` für die Rolle `anon` gesperrt?

**Antwort laut Migrationsskript: Ja zu beidem — RLS ist auf beiden
Tabellen aktiviert, `venues` hat eine Lese-Policy für alle, für
`venues_internal` existiert bewusst keine einzige Policy, wodurch der
Zugriff über den `anon`- oder `authenticated`-Key vollständig verweigert
wird.**

Geprüft mit: Lesen von `supabase/migrations/0001_init.sql`, Zeilen 54–67:

```sql
alter table venues enable row level security;
alter table venues_internal enable row level security;

drop policy if exists "venues_public_read" on venues;
create policy "venues_public_read" on venues
  for select
  using (true);

-- Für venues_internal wird bewusst keine Policy angelegt: ohne Policy verweigert
-- RLS jeden Zugriff über den anon- oder authenticated-Key.
```

Zusätzlich geprüft, dass die App diese Trennung auch im Code respektiert:
Codesuche `grep -rn "venues_internal"` über das gesamte Repository findet
`venues_internal` ausschließlich in `scripts/import.ts` und
`scripts/generate-import-sql.ts` — beides Kommandozeilen-Werkzeuge, die
mit dem `SUPABASE_SERVICE_ROLE_KEY` arbeiten (der RLS umgeht, siehe
`scripts/import.ts` Zeile 28/48), nie mit dem öffentlichen `anon`-Key.
In `app/`, `components/` und `lib/` (also allem, was im Browser bzw. für
Website-Besucher läuft) taucht `venues_internal` kein einziges Mal auf.

**Wichtige Einschränkung — das kann ich nicht aus dem Repository
beurteilen:** Diese Aussage gilt für das, was im Migrationsskript steht.
Ob genau dieser Stand tatsächlich so auf dem echten Supabase-Projekt
aktiv ist — also ob `0001_init.sql` vollständig eingespielt wurde und
niemand nachträglich von Hand im Supabase-Dashboard eine zusätzliche,
großzügigere Policy auf `venues_internal` angelegt hat — kann ich von
hier aus nicht prüfen, da diese Umgebung keinen Netzwerkzugriff auf
Supabase hat. Das lässt sich nur direkt im Supabase-Dashboard unter
„Authentication → Policies“ für `venues_internal` verifizieren: dort darf
für die Tabelle keine einzige Policy gelistet sein.

**Da im Repository selbst keine Lücke gefunden wurde** (RLS ist korrekt
konfiguriert, `venues_internal` wird auch im Anwendungscode nirgends
abgefragt), wurde `STAND.md` in dieser Sitzung **nicht** angefasst — die
oben genannte Einschränkung ist keine Lücke im Code, sondern eine Grenze
dessen, was von hier aus prüfbar ist, und wird stattdessen hier
dokumentiert.

## 6. Fragt das Meldeformular eine Absenderadresse oder einen Namen ab, oder nur Freitext? Gibt es ein Feld, das zu personenbezogenen Angaben verleiten könnte?

**Antwort: Kein Namensfeld. Ein optionales E-Mail-Feld für Rückfragen,
klar als „optional“ beschriftet. Ansonsten eine Auswahl (fester Betreff)
und ein Freitextfeld.**

Geprüft mit Lesen von `components/ReportButton.tsx`, Zeilen 100–128 (das
komplette Formular):

- „Betroffener Punkt“ — Auswahlfeld (`<select>`) mit sechs festen
  Optionen, kein Freitext.
- „Was ist falsch oder veraltet?“ — Freitext, max. 500 Zeichen, Pflicht.
- „E-Mail für Rückfragen (optional)“ — ein einzelnes `<input
  type="email">`, nicht verpflichtend (kein `required`), Beschriftung
  macht die Freiwilligkeit explizit.

Es gibt kein Namensfeld und keine weiteren Eingabefelder. Die einzige
Stelle, die „zu personenbezogenen Angaben verleiten könnte“, ist das
Freitextfeld selbst: Nutzer könnten dort von sich aus einen Namen oder
andere persönliche Angaben hineinschreiben, obwohl danach nicht gefragt
wird — das lässt sich technisch nicht verhindern, da es sich um ein
offenes Textfeld handelt. Serverseitig (`app/api/report/route.ts`) wird
dieser Text unverändert in die Mail übernommen, nicht zusätzlich
ausgewertet oder gespeichert.

## 7. Sind aktuell Bilder auf der Seite, und liegen sie im Repository oder extern?

**Antwort: Aktuell keine Bilder — weder im Repository noch extern
eingebunden.**

Geprüft mit:
- Codesuche `grep -rn "next/image\|<img\|Image from"` über `app/`,
  `components/`, `lib/` — keine Treffer.
- Es existiert kein `public/`-Verzeichnis im Repository (üblicher Ort für
  Next.js-Assets wie Logo/Favicon).
- Dateisuche nach Bildformaten (`*.png`, `*.jpg`, `*.jpeg`, `*.svg`,
  `*.webp`, `*.gif`, `*.ico`) im gesamten Repository außerhalb von
  `node_modules`/`.next`/`.git` — keine Treffer.

Die Seite besteht aktuell ausschließlich aus Text, Formularelementen und
der Karte (Kartenkacheln sind keine Bilddatei der Seite selbst, sondern
werden von MapLibre vom externen Kachel-Anbieter geladen, siehe Antwort
zu Frage 3).
