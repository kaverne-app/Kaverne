# OFFEN

Wird gepflegt, nicht überschrieben. Erledigtes bleibt eine Woche unter
„Kürzlich erledigt" und fliegt dann raus (steht in der Git-Historie).

---

## Letzte Claude-Code-Sitzung

*Claude Code überschreibt nur diesen Abschnitt. Höchstens 15 Zeilen.*

17.09.2026 — Fix Kartendarstellung (Dämpfung, Kartenbereich, Attribution, Filter) — **fertig, Pull Request #37**
- Kartenbereich lückenlos bis zur Navigation, Checkbox-Farbe, Filter-Panel
  nie hinter der Navigation: ja, mit Testdaten im Browser vermessen.
- Farbdämpfung aller Ebenentypen (Gebäude, Parkumrisse) und kompakte,
  dunkle Attribution: ja, von Tim auf dem Android-Gerät in der Vorschau
  bestätigt.
- Kein bekannter Fehler. Wartet auf Tims „live" zum Zusammenführen.

## Als Nächstes für Claude Code

**A-17 — Detailseite: Felder anpassen**

Ziel: Auf `/venues/[id]` erscheinen nur noch folgende Felder, je Block
(leere Felder/Blöcke weiterhin ganz ausgeblendet, bestehende Regel):
- Kopf (unverändert): Name, Typ · Stadt, Genre-Chips + „Unregelmäßig",
  Kurzbeschreibung.
- „Wann & wo": Übliche Tage (Label für das bisherige Feld `oeffnungstage`,
  Datenfeld bleibt Mo–So-Mehrfachauswahl), Adresse + Kartenausschnitt,
  Haltestelle (zieht aus „Vor Ort" hierher).
- „Kanäle" (umbenannt von „Programm & Kanäle"): Website, Instagram,
  Facebook (nur wenn gepflegt). Reihen entfällt aus der Anzeige.
- „Vor Ort": Floors (neu), Kartenzahlung, Raucherbereich, Außenbereich.
  Garderobe, Barrierefreiheit, Kamerapolitik entfallen aus der Anzeige.
- Block „Preise & Größe" entfällt komplett (Preisniveau, Kapazität nicht
  mehr angezeigt).

Datenmodell (Migration in `supabase/migrations`):
- Neue Spalte `floors` (text) in `venues`.
- Spalte `reihen` aus `venues` entfernen. Vorher Tim noch einmal in
  Klartext bestätigen lassen — 6 Läden haben dort Daten (C2 Ost,
  Erdbeermund, Gotec Club, Das Zimmer, Disco Zwei, MS Connexion Complex),
  die beim Löschen verloren gehen.
- docs/KAVERNE.md, „Datenfelder" und „Anzeige" sowie die Aufnahme-Regel zu
  Floors/Reihen entsprechend anpassen.

Prüfkriterien:
- Detailseite zeigt genau diese Felder, alte Felder (Preisniveau,
  Kapazität, Garderobe, Barrierefreiheit, Kamerapolitik, Reihen)
  verschwinden vollständig.
- `npm run build` und `npm run lint` sauber.
- Reihen-Spalte nur gelöscht, wenn Tim das in Klartext bestätigt hat.

Verboten:
- Keine weiteren Felder ergänzen oder entfernen als hier gelistet.
- `reihen` nicht ohne Tims Bestätigung löschen.

## Du selbst

- Kurzbeschreibungen: 1 von 18 (Gotec Club). Für „Öffnen" mindestens bei
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

- Clubs-Seite mit Liste/Karte-Umschalter, Wortmarke verlinkt (16.09.)
- Sheet in „ARCHIV – nicht pflegen" umbenannt (16.09.)
- Erste Kurzbeschreibung: Gotec Club (16.09.)
- A-16 Automatisches Zusammenführen für Dokument-/Datenänderungen (16.09.)
- Sheet-Abgleich: Läden-Export gegen venues geprüft (keine Abweichungen
  außer dem Tippfehler unten), Ausgeschieden-Export in die Tabelle
  ausgeschieden übernommen (19 Zeilen), Tippfehler im Reihen-Text bei
  mannheim-msconnexioncomplex korrigiert (16.09.)
- A-15 Tabelle ausgeschieden und nächtlicher Datenstand (16.09.)
- Umstellung auf Claude Code als Arbeitsplatz (16.09.)
- Lu's Beach Club aus der Datenbank entfernt (16.09.), Grund kommt beim
  Sheet-Abgleich in die Tabelle ausgeschieden
- A-14 Grundgestaltung (16.09.)
- A-13 Feldliste an docs/KAVERNE.md angeglichen (15.09.)
- A-12 Projektdokumente umgebaut (15.09.)
- A-11 Import, 19 Einträge (15.09.)
- A-10 Datenschutzerklärung, Browser-Speicher (15.09.)
- A-08 Seite `/ueber` (15.09.)
- A-06 Filter in der Adresse statt im Browser-Speicher
