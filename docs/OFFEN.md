# OFFEN

Wird gepflegt, nicht überschrieben. Erledigtes bleibt eine Woche unter
„Kürzlich erledigt" und fliegt dann raus (steht in der Git-Historie).

---

## Letzte Claude-Code-Sitzung

*Claude Code überschreibt nur diesen Abschnitt. Höchstens 15 Zeilen.*

09.10.2026 — Logo und Website-Grafiken — **fertig im Code, wartet auf Vorschau und Tims „live"**
- Build und Lint sauber (ja). Favicon (SVG, PNG-Ersatz), Homescreen-Icons,
  Manifest, Kopfzeile mit Zeichen und Wortmarke eingebunden; Dateien aus
  design/website/ unverändert kopiert (ja, im Code und per Seitenabruf).
- Kopfzeile auf Handybreite (390 px): Höhe weiter 56 px (ja, im Browser).
- Startseite: Vorschaubild unverändert (ja, Byte-Vergleich). Andere Seiten:
  Bilder aus der Vorlage mit Plex Sans aus eigenen Dateien (ja, lokal mit
  Testnamen erzeugt). Echte Läden-Route lokal nicht abrufbar, weil die
  Datenbank von hier nicht erreichbar ist: bitte in der Vorschau ansehen.
- Abweichung/Annahme: Vorlage ohne Beschreibung; Umbruch höchstens vier
  Zeilen (vier Zeilen in der Vorlage), Beitragstitel höchstens drei, Rest
  mit „…"; linker Rand des Textblocks 80 px [Annahme].
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

- Datenschutzerklärung mit Instagram-Abschnitt, Stand 09.10.2026, live
  (Pull Request 56); damit ist der Datenschutztext zu A-19 erledigt (09.10.)
- A-19 Karte: Cluster, Stadtzoom, gemerkte Stadt, Standortknopf live, von
  Tim vollständig abgenommen (09.10.)
- Daten: Climax Institutes neu (Koordinaten von Tim geprüft), Gotec
  umbenannt (Name „Gotec", id unverändert), Kurzbeschreibung Gotec
  geleert, Gesamtzahl 27 (01.10.)
- Haltestellen-Regel in KAVERNE.md („Datenfelder"), Haltestelle bei C2 Ost,
  Das Zimmer und Disco Zwei angepasst (01.10.)
- Daten: 3 Läden neu (Ebene 3, Motke, Adam Riese), 3 ergänzt (Erdbeermund,
  Das Zimmer, Disco Zwei), Gesamtzahl 26. Tim: bei Widerspruch gilt der Wert mit mehr
  Daten, Erdbeermund und Disco Zwei bleiben bei Genre/Öffnungstagen
  unverändert (01.10.)
- A-18 Datenbank verschlanken: Code, Migration 0007 und Löschen in Supabase
  erledigt, Tabellen und Spalten geprüft (01.10.)
- Clubliste-Bereinigung: 10 Läden aus venues gelöscht (Tim im
  Supabase-Dashboard, weil DELETE über das Werkzeug hängt), Gesamtzahl
  23 geprüft (01.10.)
- Clubliste-Import: 15 neue Läden angelegt, 5 bestehende aktualisiert,
  Mauerpfeiffer-Haltestelle nach Tims Antwort ergänzt (01.10.), Details in
  der Nachricht an Tim
