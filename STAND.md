# STAND.md

Wird am Ende jeder Sitzung überschrieben. Gibt den tatsächlichen Stand
wieder, nicht den geplanten.

## 1. Datum und Aufgaben-ID

2026-09-15 — A-07: Impressum und Datenschutzerklärung als eigene Seiten,
mit Verweis aus dem Fußbereich aller Läden-/Magazin-/Über-Seiten.

## 2. Status je Aufgabe

- Baustein 1–8, A-02, A-03: **fertig**, unverändert (siehe vorherige
  Fassungen dieser Datei für Details).
- A-04 (Prüfdokument `PRUEFUNG-DATENSCHUTZ.md` für Impressum/Datenschutz):
  **fertig**, unverändert.
- A-07 (diese Aufgabe): **fertig**.

## 3. Akzeptanzkriterien (A-07)

- `/impressum` und `/datenschutz` geben den gelieferten Text wieder,
  Überschriftenstruktur erhalten — **ja**: `/impressum` mit „Impressum“
  (h1) und „Verantwortlich für den Inhalt“ (h2); `/datenschutz` mit
  „Datenschutzerklärung“ (h1) und den zehn nummerierten Abschnitten als
  h2. Geprüft per Playwright-Screenshot beider Seiten.
- Fußbereich mit „Impressum“ und „Datenschutz“ auf `/`, `/liste`,
  `/karte`, `/venues/[id]`, `/magazin`, `/magazin/[slug]`, `/ueber` — **ja**:
  alle sieben Seiten lokal gegen einen Mock-Server aufgerufen, Fußbereich
  mit beiden Links auf jeder geprüft (Playwright, `footer.site-footer`
  gefunden, korrekte `href`-Werte).
- Klick aus dem Fußbereich führt direkt zur jeweiligen Seite — **ja**,
  per Klick-Test von `/ueber` auf „Impressum“ geprüft, URL wechselt
  korrekt.
- Beide Seiten auf dem Handy lesbar, gleiche Zeilenlänge/Schriftgröße/
  Abstände wie im Rest der App — **ja**: beide Seiten nutzen die
  bestehende `.venue-detail`-Gestaltung (gleiche Breite, Schrift,
  Abstände wie z. B. `/ueber` oder eine Ladenseite), bei 390px
  Bildschirmbreite gegengeprüft (Screenshot).
- Text nicht umformuliert/gekürzt/ergänzt — **ja**: Wortlaut unverändert
  aus der Aufgabenbeschreibung übernommen.
- Eckige Klammern im Text unverändert lassen und in „Musst du selbst
  tun“ eintragen — **entfällt**: Der gelieferte Text enthält keine
  eckigen Klammern, daher kein Eintrag nötig.
- Adresse in `/impressum` als zusammenhängender Block mit
  Zeilenumbrüchen — **ja**, per `<br />` zwischen den Zeilen, per
  Screenshot geprüft (Name, Straße, PLZ/Ort, Land, E-Mail jeweils in
  eigener Zeile).

## 4. Abweichungen von der Aufgabenbeschreibung, mit Grund

- Auf `/karte` sitzt der Fußbereich nicht am Ende einer scrollbaren
  Seite wie bei den anderen sechs Seiten, sondern als schmale Zeile
  zwischen Karte und unterer Navigation — die Kartenseite ist als
  einzelner, nicht scrollender Bildschirm gebaut (Karte füllt exakt die
  Fläche zwischen Filterleiste und Navigation). Ein gewöhnlicher
  Scroll-Fußbereich hätte dafür die bestehende Höhenberechnung der Karte
  ändern müssen, was über den Einbau des Fußbereichs hinausgegangen
  wäre. Stattdessen nutzt der Fußbereich dort eine bereits vorhandene,
  ungenutzte Lücke von rund 48px direkt über der Navigation — geprüft
  per Screenshot, keine Überlappung mit Karte oder Navigation.
- `/impressum` und `/datenschutz` selbst haben keinen eigenen
  Fußbereich — das war nicht Teil der Aufgabenbeschreibung (dort sind
  nur die sieben bestehenden Seiten aufgeführt), deshalb bewusst nicht
  ergänzt.
- Beide Seiten haben wie die übrigen Inhaltsseiten einen „← Zur
  Startseite“-Link oben, obwohl das nicht ausdrücklich verlangt war —
  das ist reine Navigation, kein Zusatz zum Rechtstext selbst, und
  entspricht dem bestehenden Muster aller anderen Inhaltsseiten.

## 5. Braucht Entscheidung von Tim

- **`genres` und `typ` sind weiterhin Freitext, keine feste Liste**
  (unverändert, siehe vorherige Fassungen) — kommt laut Tim in einer
  der nächsten Runden als eigene Aufgabe.
- **Rate-Limit beim Meldeweg speichert die Absender-IP kurzzeitig im
  Arbeitsspeicher** (unverändert, siehe vorherige Fassungen) — die
  Auslegung von „keine IP-Adressen speichern“ wird laut Tim final in
  einer der nächsten Runden geklärt.

## 6. Bekannte Fehler

- **Kartenkacheln laden in der Entwicklungs-/Testumgebung dieser
  Sitzung nicht** (unverändert) — Netzwerksperre dieser Sandbox
  gegenüber `tiles.openfreemap.org`, betrifft nicht die Live-Seite.
- Sonst keine offenen Fehler bekannt.

## 7. Musst du selbst tun

- **Noch offen, kommt in einer der nächsten Runden:** Text für `/ueber`
  liefern — die Seite zeigt weiterhin nur die Überschrift „Über“ ohne
  Inhalt (durch A-07 nicht verändert, nur um den Fußbereich ergänzt).
- **Noch offen (siehe Abschnitt 5):** Werteliste für `typ` und `genres`
  festlegen.
- **Noch offen (siehe Abschnitt 5):** Rückmeldung zur IP-Auslegung beim
  Rate-Limit des Meldewegs.
