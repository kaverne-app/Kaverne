# OFFEN

Wird gepflegt, nicht überschrieben. Erledigtes bleibt eine Woche unter
„Kürzlich erledigt" und fliegt dann raus (steht in der Git-Historie).

---

## Letzte Claude-Code-Sitzung

*Claude Code überschreibt nur diesen Abschnitt. Höchstens 15 Zeilen.*

20.09.2026 — A-17 Detailseite-Felder — **teilweise fertig, Pull Request #39**
- Blöcke/Felder wie gefordert umgesetzt (Wann & wo · Kanäle · Vor Ort),
  Spalte `floors` ergänzt (schon in Supabase). Geprüft: Build/Lint sauber,
  Feldlabels und -reihenfolge im Browser mit echten Werten bestätigt
  (C2 Ost).
- Reihen-Spalte noch nicht gelöscht — wartet auf Tims Bestätigung (siehe
  „Als Nächstes"). Die App fragt `reihen` seit diesem Pull Request nicht
  mehr ab, die Spalte selbst steht noch in Supabase.
- Kein bekannter Fehler.

## Als Nächstes für Claude Code

**A-17 — Rest: Reihen-Spalte löschen**

Nur noch offen: Spalte `reihen` aus `venues` entfernen (Migration in
`supabase/migrations`), sobald Tim in Klartext bestätigt hat — 6 Läden
haben dort Daten (C2 Ost, Erdbeermund, Gotec Club, Das Zimmer, Disco Zwei,
MS Connexion Complex), die beim Löschen verloren gehen. Danach auch
`scripts/lib/types.ts` und den Import (verweisen noch auf `reihen`)
anpassen.

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

- Fix Kartendarstellung: Dämpfung, Kartenbereich, Attribution, Filter (17.09.)
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
