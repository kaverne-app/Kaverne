# OFFEN

Wird gepflegt, nicht überschrieben. Erledigtes bleibt eine Woche unter
„Kürzlich erledigt" und fliegt dann raus (steht in der Git-Historie).

---

## Letzte Claude-Code-Sitzung

*Claude Code überschreibt nur diesen Abschnitt. Höchstens 15 Zeilen.*

10.10.2026 — Kartenvorschau Startseite, echtes Kartenbild — **fertig und live (Pull Request 65)**
- Build und Lint sauber (ja). Bild per GitHub-Action erzeugt, weil die
  Sitzung OpenFreeMap nicht erreicht (Abweichung); Skript und Workflow liegen im Repo.
- Bild: WebP in drei Größen, 31 / 54 / 75 KB; mobil lädt eines davon (ja).
- Punkte: 31 = Einträge mit Koordinaten (ja, im Browser gezählt). Lage
  geprüft an Saarbrücken, Frankfurt, Straßburg, Stuttgart, Bodensee (ja).
- Handybreite 390 px und Desktop 1400 px angesehen (ja). Klick führt zu
  /clubs?ansicht=karte (ja). Keine Kartenbibliothek, keine Abrufe bei
  OpenFreeMap von der Startseite, kein Browser-Speicher (ja).
- Namensnennung klein in der Bildecke mit Links; Screenreader-Text nach
  Freigabe eingebaut (ja).
- Lokal mit data/venues.json als Testdaten geprüft.
- Von Tim abgenommen (10.10.). Ausschnitt rechnet sich aus den Läden, Bild
  entsteht nach dem nächtlichen Datenstand bei Bedarf neu (erst ab jetzt in main).

## Als Nächstes für Claude Code

## Du selbst

- Kurzbeschreibungen: 1 von 23 (Gotec Club). Für „Öffnen" mindestens bei
  den Läden, die du selbst kennst.
- Postfach mit AV-Vertrag: erst nötig, sobald es einen wirklichen Release
  gibt und die Seite aktiv beworben wird — bis dahin läuft es über Google.

## Zu entscheiden

- Kartenbild: OpenFreeMap verbietet automatisiertes Abrufen „ohne Erlaubnis"
  (Nutzungsbedingungen, Stand 09.09.2026). Das Bild entsteht einmal bei einer
  Stiländerung, ein paar Kacheln. [Annahme] unkritisch; falls du sicher sein
  willst, kurze Mail an info@openfreemap.org.
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

- Kartenvorschau auf der Startseite (echtes Kartenbild, Ausschnitt rechnet
  sich aus den Läden), live (10.10., Pull Request 65)
- Navigation am Desktop: Textlinks in der Kopfzeile ab 1024 px, Leiste unten
  nur mobil, live (10.10., Pull Request 63)
- Datenschutzerklärung mit Instagram-Abschnitt, Stand 09.10.2026, live
  (Pull Request 56); damit ist der Datenschutztext zu A-19 erledigt (09.10.)
- A-19 Karte: Cluster, Stadtzoom, gemerkte Stadt, Standortknopf live, von
  Tim vollständig abgenommen (09.10.)
