# OFFEN

Wird gepflegt, nicht überschrieben. Erledigtes bleibt eine Woche unter
„Kürzlich erledigt" und fliegt dann raus (steht in der Git-Historie).

---

## Letzte Claude-Code-Sitzung

*Claude Code überschreibt nur diesen Abschnitt. Höchstens 15 Zeilen.*

10.10.2026 — Kartenvorschau auf der Startseite — **fertig, Vorschau zu prüfen (Pull Request offen)**
- Build und Lint sauber (ja). Kachel „Clubs": Überschrift und Vorschau, Zeile
  mit Anzahl und Städten entfällt, „Über" unverändert (ja, im Browser).
- Punkte: 31 = Einträge mit Koordinaten in Supabase (ja, per Abfrage und im
  Browser gezählt). Lage: Saarbrücken links, Kassel oben, Ravensburg unten (ja).
- Handybreite 390 px und Desktop 1400 px angesehen, kein Querscrollen (ja).
- Klick auf die Kachel führt zu /clubs?ansicht=karte (ja); das ging schon
  über die Adresse, nichts umgebaut.
- Umrisse: Natural Earth 10m, gemeinfrei, 5,6 KB, mit der Seite ausgeliefert.
  Keine Kartenbibliothek, kein neuer Dienst, kein Browser-Speicher (ja).
- Ladezeit lokal gleich (ca. 20 ms vorher und nachher); die Seite wird von
  9 auf 25 KB größer (Punkte und Umrisse stehen im HTML), ohne Kompression.
  Echte Netzzeit nur in der Vorschau messbar.
- Lokal mit data/venues.json als Testdaten geprüft.
- Offen: Screenreader-Wortlaut und Frankfurt-Überlappung (siehe unten).

## Als Nächstes für Claude Code

## Du selbst

- Kurzbeschreibungen: 1 von 23 (Gotec Club). Für „Öffnen" mindestens bei
  den Läden, die du selbst kennst.
- Postfach mit AV-Vertrag: erst nötig, sobald es einen wirklichen Release
  gibt und die Seite aktiv beworben wird — bis dahin läuft es über Google.

## Zu entscheiden

- Kartenvorschau Startseite: Wortlaut für Screenreader freigeben (Vorschlag
  im Pull Request); danach einbauen. Bis dahin ist die Vorschau für
  Screenreader ausgeblendet, die Kachel heißt nur „Clubs".
- Kartenvorschau: Punkte in Frankfurt/Mainz/Wiesbaden überlappen leicht. Ob
  das ruhig genug wirkt, entscheidest du an der Vorschau.
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

- Kartenvorschau auf der Startseite gebaut, wartet auf Vorschau-Prüfung
  (10.10.)
- Navigation am Desktop: Textlinks in der Kopfzeile ab 1024 px, Leiste unten
  nur mobil, live (10.10., Pull Request 63)
- Datenschutzerklärung mit Instagram-Abschnitt, Stand 09.10.2026, live
  (Pull Request 56); damit ist der Datenschutztext zu A-19 erledigt (09.10.)
- A-19 Karte: Cluster, Stadtzoom, gemerkte Stadt, Standortknopf live, von
  Tim vollständig abgenommen (09.10.)
