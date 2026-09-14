# STAND.md

Wird am Ende jeder Sitzung überschrieben. Gibt den tatsächlichen Stand
wieder, nicht den geplanten.

## 1. Datum und Aufgaben-ID

2026-09-14 — Baustein 8: Teilen-Knopf und Meldeweg auf der Detailseite;
Kartenausschnitt und Kartenverweis, sofern Koordinaten vorhanden. Laut
Aufgabenbeschreibung damit v1 funktional vollständig, bis auf Impressum
und Datenschutz.

## 2. Status je Aufgabe

- Baustein 1–3 (Datenbank/Import, Liste/Detailseite, Karte): **fertig**,
  unverändert seit den jeweiligen Sitzungen.
- Baustein 4 (Filter, Favoriten, Notizen, Meldeknopf): Filter fertig.
  Favoriten und private Notizen wurden **nicht gebaut** — sie stehen in
  der aktuellen `CLAUDE.md` auch nicht mehr als Regel, nur noch als
  Verbot für neue Funktionen. Codesuche nach „Merkliste", „Favorit",
  „Notiz" findet dazu nichts im Code (nur in `CLAUDE.md`/`STAND.md`
  selbst) — nichts zu entfernen. Der Meldeknopf ist jetzt Teil von
  Baustein 8.
- Baustein 5–7 (Beitragstabelle, Startseite, CLAUDE.md/STAND.md):
  **fertig**, unverändert.
- Baustein 8 (diese Aufgabe): **fertig**.

## 3. Akzeptanzkriterien (Baustein 8)

- Teilen-Knopf öffnet die Teilen-Funktion des Geräts, mit Name des Ladens
  und Link auf die Detailseite — **ja**, `components/ShareButton.tsx`
  ruft `navigator.share({ title, url })` auf. Im Playwright-Test (kein
  `navigator.share` vorhanden, wie in vielen Desktop-Browsern) griff der
  Rückweg.
- Auf Geräten ohne Teilen-Funktion kopiert derselbe Knopf den Link und
  bestätigt das sichtbar — **ja**, geprüft: Klick kopiert per
  `navigator.clipboard.writeText`, Beschriftung wechselt zu „Link
  kopiert" (Screenshot geprüft).
- Unauffälliger Meldeknopf fragt nach betroffenem Punkt und Freitext —
  **ja**, `components/ReportButton.tsx`: schmaler grauer Text-Knopf
  „Falsche oder veraltete Angabe melden", öffnet ein Formular mit
  Auswahlliste (an die Blockreihenfolge angelehnt) und Textfeld.
- Meldung erreicht mich ohne Supabase-Blick — **ja, mit Einschränkung**,
  siehe Abschnitt 4 (Abweichung) und Abschnitt 7.
- Nach dem Absenden Bestätigung, Weiterlesen möglich — **ja**, geprüft:
  Formular wird durch einen Bestätigungstext ersetzt, Rest der Seite
  bleibt unverändert sichtbar, keine Weiterleitung.
- Fehlen `lat` oder `lon`, kein Kartenausschnitt und kein Kartenverweis —
  **ja**, geprüft mit zwei Testfällen (mit/ohne Koordinaten): Block
  „Wann & wo" ohne Koordinaten zeigt weder Karte noch Link, mit
  Koordinaten zeigt beides.
- Keine Pflichtangabe von Name/E-Mail beim Melden — **ja**, das Formular
  fragt nur nach Punkt und Freitext. Die eigentliche Absender-Adresse
  entsteht erst im Mail-Programm des Nutzers, außerhalb meiner Seite.
- Keine Speicherung von IP-Adressen oder anderen personenbezogenen
  Daten — **ja**, es gibt keinen eigenen Speicherweg; die Meldung geht
  direkt als mailto-Link ins Mail-Programm, nichts landet in Supabase
  oder sonst einer Datenbank.
- Keine Änderung am Datenmodell von `venues` — **ja**, nur zusätzlich
  ausgewählte Spalten (`lat`, `lon`), die es in der Tabelle bereits gab
  und die Karte/Liste längst nutzen. Keine neue Spalte, keine neue
  Tabelle.
- Kein Konto, keine Merkliste, keine Notizen — **ja**, nichts davon
  wurde gebaut.

Geprüft mit `npm run build` (baut durch, keine Typfehler) und einer
lokalen Testseite mit Playwright/Chromium: Klickpfade für Teilen,
Meldeformular (leer blockiert, ausgefüllt löst mailto aus) und die
Koordinaten-Bedingung wurden durchgespielt, Screenshots kontrolliert.
Kartenkacheln selbst luden dabei nicht — siehe Abschnitt 6, bekanntes
Sandbox-Problem, kein neuer Fehler.

## 4. Abweichungen von der Aufgabenbeschreibung, mit Grund

- **Meldeweg ist ein mailto-Link, kein serverseitiger Versand.** Der
  Meldeknopf baut eine E-Mail (Laden, Link, betroffener Punkt, Text) und
  öffnet sie im Mail-Programm des Nutzers; „Senden" heißt dort: das
  Mail-Programm öffnet sich vorausgefüllt, abschicken muss der Nutzer
  selbst noch per Klick in seinem Programm. Grund: jede Alternative
  (eigener Versand-Dienst wie Resend, eigene Supabase-Tabelle für
  Meldungen) wäre entweder eine Datenmodell-Änderung oder ein neuer
  Dienst — beides steht laut `CLAUDE.md` unter „Nicht selbst
  entscheiden". mailto braucht keins von beidem und keine Einrichtung.
  Schwachstelle: Auf Geräten ohne eingerichtetes Mail-Programm (manche
  Desktop-Browser) öffnet sich nichts Sichtbares, die Meldung geht dann
  nicht raus, ohne dass die Seite das erkennen könnte. Siehe Abschnitt 5.
- **Zielsuche für „Betroffener Punkt" grob, nicht Feld für Feld.** Die
  Auswahl folgt der Blockreihenfolge der Detailseite (Wann & wo,
  Programm & Kanäle, Preise & Größe, Vor Ort) statt jedes einzelnen
  Feldes einzeln aufzulisten — sonst wären es über ein Dutzend Optionen
  in einem Dropdown. Wer genauer sagen will, was gemeint ist, nutzt das
  Freitextfeld.
- **Kartenverweis öffnet die Karten-App des Geräts (`geo:`-Link), nicht
  OpenStreetMap im Browser.** Passt zu „Mobil zuerst" und funktioniert
  ohne eigenen Dienst; auf Desktop-Browsern ohne registrierten Handler
  für `geo:`-Links tut der Klick nichts sichtbar. Bei Bedarf leicht auf
  einen OpenStreetMap-Weblink umstellbar.

## 5. Braucht Entscheidung von Tim

- **Soll der Meldeweg später auf einen serverseitigen Versand
  umgestellt werden**, damit Meldungen zuverlässig ankommen, auch ohne
  eingerichtetes Mail-Programm auf dem Gerät des Nutzers? Das wäre ein
  neuer Dienst (z. B. ein E-Mail-API-Anbieter) und braucht laut
  `CLAUDE.md` eine Entscheidung von Tim, insbesondere ob ein möglicher
  Kostenanteil akzeptabel ist. Bis dahin bleibt es beim mailto-Link.

## 6. Bekannte Fehler

- **Kartenkacheln laden in dieser Umgebung nicht.** Wie schon in
  früheren Sitzungen notiert: `tiles.openfreemap.org` ist aus dieser
  Sandbox heraus netzwerkseitig nicht erreichbar. Der neue
  Kartenausschnitt auf der Detailseite initialisiert sich korrekt
  (Karten-Objekt, Markierung, Zoomstufe stimmen, im Test geprüft), zeigt
  aber nur eine leere Fläche statt Kacheln. Kein neuer Fehler, sondern
  dieselbe bekannte Einschränkung wie bei der bestehenden `/karte`-Seite
  — muss von Tim selbst im Browser bzw. nach Deploy geprüft werden.
- Sonst keine offenen Fehler bekannt.

## 7. Musst du selbst tun

- **Prüfen, ob Meldungen bei dir ankommen.** Der Meldeknopf schickt per
  mailto an `timey.fischer@gmail.com`. Bitte einmal selbst auf der
  echten Seite eine Testmeldung durchklicken (auf dem Handy, mit
  eingerichtetem Mail-Programm) und prüfen, ob die E-Mail bei dir
  ankommt und lesbar ist.
- **Prüfen, ob `supabase/migrations/0002_posts.sql` bereits im
  SQL-Editor eingefügt wurde** — offen seit Baustein 7, hier nicht neu
  geprüft (kein Supabase-Zugriff aus dieser Umgebung möglich).
- Text für `/ueber` liefern — weiterhin offen.
- Bei Gelegenheit selbst prüfen, ob das Teilen auf deinem Handy die
  native Teilen-Funktion öffnet (iOS/Android) und ob der Meldeknopf dein
  Mail-Programm korrekt vorausgefüllt öffnet — beides ließ sich in
  dieser Umgebung nur mit einem Test-Browser ohne echte Teilen-Funktion
  bzw. echtes Mail-Programm prüfen.

## 8. Abgleich mit den Festlegungen

- **Trennung der internen Felder:** unverändert eingehalten. Diese
  Sitzung hat `lib/venues.ts` nur um `lat`/`lon` aus `venues` erweitert
  (bereits öffentliche Spalten, von `/karte` längst genutzt) —
  `venues_internal` bleibt an keiner Stelle abgefragt, per Codesuche
  erneut geprüft.
- **Kartenanbieter:** eingehalten. Der neue Kartenausschnitt nutzt
  denselben MapLibre-GL-Aufbau und denselben freien OpenFreeMap-Stil wie
  `/karte`, kein Google-Dienst. Der neue Kartenverweis nutzt einen
  geräteeigenen `geo:`-Link statt eines Kartendienstes.
- **Beitragstabelle vorhanden:** unverändert, nicht Teil dieser Sitzung.
- **`/magazin`-URL-Struktur vorhanden:** unverändert, nicht Teil dieser
  Sitzung.
