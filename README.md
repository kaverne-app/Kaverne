# Kaverne

## Einrichtung und Datenimport

### Einmalig einrichten

1. Ein Supabase-Projekt anlegen (falls noch nicht vorhanden).
2. Im Supabase-Dashboard unter „SQL Editor" den Inhalt von
   `supabase/migrations/0001_init.sql` ausführen. Das legt die beiden Tabellen
   `venues` und `venues_internal` an.
3. `.env.example` nach `.env.local` kopieren und ausfüllen:
   - `SUPABASE_URL` und `SUPABASE_SERVICE_ROLE_KEY` — für den Import (Project
     Settings → API). Der Service-Role-Key ist geheim, nie teilen.
   - `NEXT_PUBLIC_SUPABASE_URL` und `NEXT_PUBLIC_SUPABASE_ANON_KEY` — werden
     erst in Baustein 2 von der App gebraucht, können aber schon eingetragen
     werden.
4. `npm install`

### CSV importieren

Der Import läuft in zwei Schritten, damit die Koordinaten vor dem Schreiben
in die Datenbank geprüft werden können:

```
npm run geocode -- pfad/zur/datei.csv
```

Das liest die CSV-Datei, übernimmt Koordinaten, die schon in der Tabelle
standen, und ermittelt alle übrigen Adressen über den freien Kartendienst
Nominatim (OpenStreetMap). Ergebnis ist die Datei
`data/koordinaten-pruefen.csv` — mit Excel, Numbers oder Google Sheets
öffnen und prüfen. Spalten: `id`, `name`, `adresse`, `lat`, `lon`, `quelle`,
`hinweis`. Falsche oder fehlende Koordinaten direkt in dieser Datei
korrigieren. Ein erneuter Lauf von `npm run geocode` überschreibt keine
Zeile, die schon lat/lon enthält.

Wenn die Datei geprüft ist:

```
npm run import -- pfad/zur/datei.csv
```

Das schreibt alle Läden nach `venues` und die internen Felder (zuletzt
geprüft, Quelle, Ansprechpartner) nach `venues_internal`. Zeilen werden
anhand der `id` aktualisiert — ein zweiter Lauf mit korrigierten Daten legt
keine Dubletten an. Läden ohne bestätigte Koordinaten werden trotzdem
importiert, nur ohne lat/lon; sie tauchen später auf der Karte nicht auf,
bis das nachgetragen ist.

### Was zu prüfen ist

- `data/koordinaten-pruefen.csv` nach dem ersten `geocode`-Lauf: stimmen die
  Adressen zu den richtigen Punkten auf der Karte? Bei „kein Treffer" oder
  „Abruf fehlgeschlagen" lat/lon von Hand eintragen.
- Nach dem Import: in Supabase unter „Table Editor" die Tabelle `venues`
  ansehen — leere Felder sollten wirklich leer sein, nicht „nein" oder „0".
- Ein zweiter Import mit derselben oder einer korrigierten CSV sollte die
  Zeilenzahl nicht verändern.

### Absichtliche Entscheidung: Spalte „Parken"

Die CSV enthält eine Spalte „Parken", die in der Feldliste aus `CLAUDE.md`
nicht vorkommt. Sie wird beim Import nicht übernommen. Falls das ein Feld
werden soll, das die App später anzeigt, bitte Bescheid geben — dann kommt
es zur Feldliste dazu.
