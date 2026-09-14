# STAND.md

Wird am Ende jeder Sitzung überschrieben. Gibt den tatsächlichen Stand
wieder, nicht den geplanten.

## 1. Datum und Aufgaben-ID

2026-09-15 — A-06: Filterauswahl (Stadt/Genre) in die Adresszeile statt
in den Browserspeicher.

## 2. Status je Aufgabe

- Baustein 1–8, A-02, A-03: **fertig**, unverändert (siehe frühere
  Fassungen dieser Datei für Details).
- A-04 (Prüfdokument `PRUEFUNG-DATENSCHUTZ.md`), A-07 (Impressum/
  Datenschutz als Seiten): **fertig**, unverändert.
- A-06 (diese Aufgabe): **fertig**.

## 3. Akzeptanzkriterien (A-06)

- Auswahl ändert sichtbar die Adresse — **ja**: Stadt/Genre stehen als
  `?stadt=…&genre=…` in der URL, mit Komma bei Mehrfachauswahl. Geprüft
  per Playwright: nach Auswahl von „Techno“ und „Karlsruhe“ zeigt die
  Adressleiste `/liste?stadt=Karlsruhe&genre=Techno`.
- Geteilte Adresse zeigt auf anderem Gerät dieselbe Auswahl — **ja**,
  simuliert durch Öffnen der URL in einem zweiten, unabhängigen
  Browser-Tab ohne gemeinsamen Speicher: gleiche Chips aktiv.
- Zurück-Taste führt zur vorherigen Auswahl, nicht aus der Seite heraus
  — **ja**: jede Filteränderung erzeugt einen eigenen Browserverlauf-
  Eintrag; „Zurück“ zeigt die vorherige Auswahl, „Vor“ wieder die
  spätere. Geprüft per Playwright (`page.goBack()`/`goForward()`).
- Auswahl bleibt beim Wechsel zwischen Karte und Liste bestehen — **ja**:
  die Links „Liste“/„Karte“ in der unteren Navigation nehmen die aktuelle
  Adresszeilen-Auswahl mit. Geprüft per Klick zwischen beiden Seiten mit
  aktiver Auswahl.
- Ohne Auswahl bleibt die Adresse sauber — **ja**: kein `?` und keine
  leeren Parameter, wenn kein Filter aktiv ist oder „Zurücksetzen“
  gedrückt wird. Geprüft per Playwright.
- Filter nicht mehr im Browser gespeichert, `kaverne:filter` entfernt —
  **ja**: `lib/use-local-storage-state.ts` (nur dafür genutzt) gelöscht,
  `lib/use-venue-filter.ts` liest/schreibt ausschließlich die
  Adresszeile. Geprüft: `localStorage` ist nach mehreren Filteraktionen
  weiterhin leer (Playwright, `Object.keys(localStorage)` → `[]`), und
  eine Codesuche nach `kaverne:filter` im ganzen Repository findet
  keinen Treffer mehr.

## 4. Abweichungen von der Aufgabenbeschreibung, mit Grund

- Keine.

## 5. Braucht Entscheidung von Tim

- Beide bisherigen Punkte sind laut Tim erledigt und entfallen: die
  IP-Auslegung beim Rate-Limit des Meldewegs sowie die Werteliste für
  `typ`/`genres` (jetzt eigene Aufgabe A-09).
- **Neu, zur Prüfung:** `/datenschutz`, Abschnitt 6 („Speicherung auf
  Ihrem Endgerät“), beschreibt noch, dass die Filterauswahl auf dem
  Gerät gespeichert wird („sowie Ihre zuletzt gewählte Filterauswahl,
  damit sie beim nächsten Besuch erhalten bleibt“). Das stimmt seit
  dieser Aufgabe nicht mehr — die Auswahl steht jetzt nur noch in der
  Adresszeile, nicht mehr auf dem Gerät. Der Rechtstext selbst wurde
  hier bewusst nicht angefasst (siehe A-07: Text nicht selbst
  umformulieren). Bitte Abschnitt 6 entsprechend anpassen oder mir den
  neuen Wortlaut zum Einsetzen geben.
- **Nicht Teil dieser Aufgabe, aber aufgefallen:** Die Adresse in
  `/impressum` enthält seit einer Änderung außerhalb dieser Sitzung
  keine Straße und keinen Ort mehr (nur noch Name, „Deutschland“ und
  E-Mail). Falls das nicht beabsichtigt war: Rückmeldung, dann setze ich
  die vollständige Adresse aus A-07 wieder ein.

## 6. Bekannte Fehler

- **Kartenkacheln laden in der Entwicklungs-/Testumgebung dieser
  Sitzung nicht** (unverändert) — Netzwerksperre dieser Sandbox
  gegenüber `tiles.openfreemap.org`, betrifft nicht die Live-Seite.
- Sonst keine offenen Fehler bekannt.

## 7. Musst du selbst tun

- **Noch offen, kommt in einer der nächsten Runden:** Text für `/ueber`
  liefern — die Seite zeigt weiterhin nur die Überschrift „Über“ ohne
  Inhalt.
- **Noch offen (siehe Abschnitt 5):** Text in `/datenschutz`, Abschnitt
  6, an die neue Filter-Speicherung (nur Adresszeile) anpassen.
- **Noch offen (siehe Abschnitt 5):** Klären, ob die Adresse in
  `/impressum` vollständig sein soll.
