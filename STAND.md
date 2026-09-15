# STAND.md

Wird am Ende jeder Sitzung überschrieben. Gibt den tatsächlichen Stand
wieder, nicht den geplanten.

## 1. Datum und Aufgaben-ID

2026-09-15 — A-10: Datenschutzerklärung an den Stand nach A-06
angepasst.

## 2. Status je Aufgabe

- Baustein 1–8, A-02, A-03: **fertig**, unverändert (siehe frühere
  Fassungen dieser Datei für Details).
- A-04 (Prüfdokument `PRUEFUNG-DATENSCHUTZ.md`), A-06 (Filter in der
  Adresszeile), A-07 (Impressum/Datenschutz als Seiten), A-08 (Text für
  `/ueber`): **fertig**, unverändert.
- A-10 (diese Aufgabe): **fertig**.

## 3. Akzeptanzkriterien (A-10)

- Abschnitt 6 lautet wortgleich wie vorgegeben (inkl. Verweis auf § 25
  Abs. 2 Nr. 2 TDDDG) — **ja**, Text 1:1 übernommen.
- Bisheriger Text von Abschnitt 6 vollständig ersetzt, „Filterauswahl“
  und „beide Werte“ kommen nicht mehr vor — **ja**, per Codesuche
  geprüft (kein Treffer).
- Abschnitt 10 „Stand“ enthält `15.09.2026` — **ja**.
- Abschnitte 1–5 und 7–9 Zeichen für Zeichen unverändert — **ja**, per
  `diff` gegen den Stand vor der Änderung geprüft: einzige Abweichung
  ist Abschnitt 6.
- Überschriftennummerierung und Gestaltung unverändert — **ja**, nur
  der Absatztext innerhalb von Abschnitt 6 geändert, keine Überschrift
  angefasst.
- `/impressum` und Fußbereich unverändert — **ja**, nicht angefasst
  (per `git status`/`diff` geprüft: einzige geänderte Datei ist
  `app/datenschutz/page.tsx`).

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
