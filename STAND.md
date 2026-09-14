# STAND.md

Wird am Ende jeder Sitzung überschrieben. Gibt den tatsächlichen Stand
wieder, nicht den geplanten.

## 1. Datum und Aufgaben-ID

2026-09-15 — Nachtrag zu A-06: Text in `/datenschutz` an die neue
Filter-Speicherung angepasst, Adresse in `/impressum` von Tim bestätigt.

## 2. Status je Aufgabe

- Baustein 1–8, A-02, A-03: **fertig**, unverändert (siehe frühere
  Fassungen dieser Datei für Details).
- A-04 (Prüfdokument `PRUEFUNG-DATENSCHUTZ.md`), A-07 (Impressum/
  Datenschutz als Seiten), A-06 (Filter in der Adresszeile): **fertig**,
  unverändert.
- Nachtrag zu A-06 (diese Sitzung): **fertig**.

## 3. Akzeptanzkriterien

Kein neuer Auftrag mit eigenen Kriterien — Nachtrag klärt zwei Punkte aus
Abschnitt 5 der letzten Fassung:

- `/datenschutz`, Abschnitt 6, beschrieb noch die inzwischen entfallene
  Speicherung der Filterauswahl auf dem Gerät — **behoben**: Tim hat den
  von mir vorgeschlagenen Wortlaut bestätigt, Text ist eingesetzt
  („Gespeichert wird ein Wert: der Zeitpunkt Ihrer letzten Meldung über
  das Meldeformular …“). Geprüft per `tsc`/`lint`, Abschnitt gelesen.
- Adresse in `/impressum` ohne Straße/Ort — **kein Fehler**: von Tim
  ausdrücklich bestätigt, dass das so sein soll. Keine Änderung
  vorgenommen.

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

- **Noch offen, kommt in einer der nächsten Runden:** Text für `/ueber`
  liefern — die Seite zeigt weiterhin nur die Überschrift „Über“ ohne
  Inhalt.
