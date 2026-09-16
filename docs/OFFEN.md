# OFFEN

Wird gepflegt, nicht überschrieben. Erledigtes bleibt eine Woche unter
„Kürzlich erledigt" und fliegt dann raus (steht in der Git-Historie).

---

## Letzte Claude-Code-Sitzung

*Claude Code überschreibt nur diesen Abschnitt. Höchstens 15 Zeilen.*

16.09.2026 — Lu's Beach Club entfernt — **fertig**
- Auf Bestätigung hin aus `venues` gelöscht (id `ludwigshafen-lusbeachclub`);
  zugehöriger Eintrag in `venues_internal` automatisch mitgelöscht
  (Fremdschlüssel mit Kaskade). 18 Läden verbleiben.
- Kein Code geändert: Detailseite liefert für gelöschte IDs automatisch
  404, Liste und Karte laden live aus Supabase.
- Aufnahmeregel in docs/KAVERNE.md war schon direkt im Repo aktualisiert
  (nicht durch mich) — Wortlaut geprüft, stimmt mit der Übergabe überein.
- Anmerkung: Die Aufgabe nannte „STAND.md überschreiben" (Datei seit A-12
  weg) und die ID „A-06" (schon vergeben) — hier ohne Aufgaben-ID geführt.

## Als Nächstes für Claude Code

## Du selbst

- Sheet, Tab „Listen": Typ = Club, Bar, Location, Festival. Genre wie in
  KAVERNE.md, „Gemischt" statt „EDM/Mixed". Dropdowns mit „Eingabe ablehnen".
  Spalte „Außenbereich" anlegen.
- Sheet: Tippfehler „uper Schwarzes Mannheim" prüfen.
- Kurzbeschreibungen: 0 von 19. Für „Öffnen" mindestens bei den Läden, die
  du selbst kennst.
- Empfangspostfach Meldeformular: läuft weiter über
  kaverne.app@gmail.com, AV-Vertrag-Lücke bewusst akzeptiert. Wechsel des
  Postfachs geplant, kein Termin.
- Recherche-Prompt an die Feldliste in KAVERNE.md anpassen (Parken und
  Getränkepreis raus, Raucher- und Außenbereich als ja/nein, Genre-Liste).

## Zu entscheiden

- Themen für die ersten zwei bis drei Artikel.
- Gestaltung: Logo, Farben, Schrift.
- Schwelle für den Eventkalender — erst nach „Öffnen" relevant.
- KUFA Saarbrücken: bleibt regulär im Verzeichnis (nicht in Ausgeschieden).
  Belegbares elektronisches Programm noch nicht abschließend geprüft —
  bewusst akzeptiertes Zwischenrisiko, Termine werden nachgeprüft.

## Ideen

Ungeordnet, keine Zusage.
- Filter nach Öffnungstag
- Set-Aufnahmen, Veranstaltungsreihe, Label (siehe KAVERNE.md)

## Kürzlich erledigt

- Lu's Beach Club aus der Datenbank entfernt (16.09.)
- A-14 Grundgestaltung (16.09.)
- A-13 Feldliste an docs/KAVERNE.md angeglichen (15.09.)
- A-12 Projektdokumente umgebaut (15.09.)
- A-11 Import, 19 Einträge (15.09.)
- A-10 Datenschutzerklärung, Browser-Speicher (15.09.)
- A-08 Seite `/ueber` (15.09.)
- A-06 Filter in der Adresse statt im Browser-Speicher
