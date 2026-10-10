# OFFEN

Wird gepflegt, nicht überschrieben. Erledigtes bleibt eine Woche unter
„Kürzlich erledigt" und fliegt dann raus (steht in der Git-Historie).

---

## Letzte Claude-Code-Sitzung

*Claude Code überschreibt nur diesen Abschnitt. Höchstens 15 Zeilen.*

10.10.2026 — Navigation am Desktop — **fertig und live (Pull Request 63)**
- Build und Lint sauber (ja). Umschaltpunkt 1024 px (Tablet quer): darunter
  unverändert, darüber Textlinks „Clubs" und „Über" in der Kopfzeile, Leiste
  unten weg (ja, im Browser bei 390, 1023, 1024 und 1400 px).
- Markierung stimmt auf Start (keine), Liste, Karte, Laden (Clubs), Über (ja).
  Kein Springen, keine doppelte Navigation, kein Querscrollen (ja).
- Tab erreicht Wortmarke und Links, Fokus sichtbar (ja, orangener Rahmen).
- Reiter, Filterzeile, Liste mittig auf 480 px, Karte voll breit (ja).
- Kopfzeile erscheint am Desktop auch auf Laden, Über, Impressum, Datenschutz,
  Beitrag; mobil dort weiter keine (Abweichung: nötig, damit „Clubs" dort
  aktiv sein kann).
- Lokal mit Testdaten aus data/venues.json geprüft; Kartenkacheln dort nicht
  ladbar, Karte also nur im Rahmen, nicht im Bild: bitte in der Vorschau sehen.
- Keine neuen Dienste, Einbettungen oder Browser-Speicher (ja).

## Als Nächstes für Claude Code

## Du selbst

- Kurzbeschreibungen: 1 von 23 (Gotec Club). Für „Öffnen" mindestens bei
  den Läden, die du selbst kennst.
- Postfach mit AV-Vertrag: erst nötig, sobald es einen wirklichen Release
  gibt und die Seite aktiv beworben wird — bis dahin läuft es über Google.

## Zu entscheiden

- Themen für die ersten zwei bis drei Artikel.
- Schwelle für den Eventkalender — erst nach „Öffnen" relevant, kommt noch
  ein gutes Stück später.
- Filterkriterium für Läden mit nur gelegentlichem Programm (z. B. KuFa
  Saarbrücken) — erst wenn mehr Läden dazukommen. Bis dahin bleibt KuFa
  drin.

## Ideen

Ungeordnet, keine Zusage.
- Filter nach Öffnungstag
- Set-Aufnahmen, Veranstaltungsreihe, Label (siehe KAVERNE.md)

## Kürzlich erledigt

- Navigation am Desktop: Textlinks in der Kopfzeile ab 1024 px, Leiste unten
  nur mobil, live (10.10., Pull Request 63)
- Datenschutzerklärung mit Instagram-Abschnitt, Stand 09.10.2026, live
  (Pull Request 56); damit ist der Datenschutztext zu A-19 erledigt (09.10.)
- A-19 Karte: Cluster, Stadtzoom, gemerkte Stadt, Standortknopf live, von
  Tim vollständig abgenommen (09.10.)
