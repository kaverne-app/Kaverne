# STAND.md

Wird am Ende jeder Sitzung überschrieben. Gibt den tatsächlichen Stand
wieder, nicht den geplanten.

## 1. Datum und Aufgaben-ID

2026-09-15 — A-08: Text für `/ueber`.

## 2. Status je Aufgabe

- Baustein 1–8, A-02, A-03: **fertig**, unverändert (siehe frühere
  Fassungen dieser Datei für Details).
- A-04 (Prüfdokument `PRUEFUNG-DATENSCHUTZ.md`), A-07 (Impressum/
  Datenschutz als Seiten), A-06 (Filter in der Adresszeile) inkl.
  Nachtrag (Datenschutztext angepasst): **fertig**, unverändert.
- A-08 (diese Aufgabe): **fertig**.

## 3. Akzeptanzkriterien (A-08)

- `/ueber` zeigt den Text wortgleich, vier getrennte Absätze in der
  angegebenen Reihenfolge — **ja**, per Playwright geprüft (vier
  `<p>`-Elemente, Wortlaut exakt verglichen).
- Wortlaut unverändert, keine Zwischenüberschriften — **ja**, Text
  1:1 aus der Aufgabenbeschreibung übernommen, einschließlich
  Halbgeviertstrich (–, U+2013) statt Bindestrich im zweiten Absatz —
  per Skript auf das korrekte Zeichen geprüft.
- Bisherige Überschrift „Über“ durch neue h1 ersetzt, nicht zusätzlich
  vorhanden — **ja**, genau eine `<h1>` auf der Seite.
- Letzter Absatz „Man sieht sich.“ optisch abgesetzt, ohne neue
  CSS-Klasse — **ja**, per Inline-Stil `marginTop: 48px` auf dem
  einzelnen Absatz, `globals.css` unverändert. Per Screenshot geprüft.
- Bei 390 px lesbar, gleiche Gestaltung wie `/impressum` — **ja**, beide
  nutzen dieselbe bestehende `.venue-detail`-Klasse, Screenshot bei
  390 px Breite geprüft.
- Fußbereich mit „Impressum“/„Datenschutz“ unverändert vorhanden —
  **ja**, aus A-07 unverändert übernommen, per Playwright geprüft.
- „← Zur Startseite“ oben vorhanden — **ja**, unverändert übernommen.
- Keine Bilder/Logos/Symbole, kein Kontaktweg, keine Kanal-Links, kein
  zusätzlicher Text (Datum o. ä.) — **ja**, geprüft: 0 `<img>`/`<svg>`
  auf der Seite, keine Mailadresse, keine externen Links, keine weiteren
  Textzeilen außer den vier Absätzen.

## 4. Abweichungen von der Aufgabenbeschreibung, mit Grund

- Keine.

## 5. Braucht Entscheidung von Tim

- Keine offenen Punkte.

## 6. Bekannte Fehler

- **Kartenkacheln laden in der Entwicklungs-/Testumgebung dieser
  Sitzung nicht** (unverändert) — Netzwerksperre dieser Sandbox
  gegenüber `tiles.openfreemap.org`, betrifft nicht die Live-Seite.
- Sonst keine offenen Fehler bekannt.

## 7. Musst du selbst tun

- Nichts offen.
