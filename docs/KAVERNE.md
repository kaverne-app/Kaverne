# Kaverne

Was gilt. Keine Versionsnummer, ältere Stände stehen in der Git-Historie.
Was ansteht und was zu entscheiden ist, steht in `OFFEN.md`, nicht hier.
Diese Datei beschreibt Leitplanken, kein Pflichtenheft.

---

## Was es ist

Anlaufstelle für die elektronische Szene im Südwesten. Das Verzeichnis von
Clubs und Veranstaltungsorten ist Einstieg und Datengrundlage, das Ziel ist
ein Magazin unter demselben Namen. Wer über einen Laden liest, landet bei
seinem Eintrag, und umgekehrt.

**Maßstab fürs Verzeichnis:** die schnellste Art herauszufinden, welche Clubs
es hier gibt, wie sie sind und welchen ich mir ansehen will.

**Maßstab fürs Magazin:** jeder Beitrag hängt an einem Eintrag (Laden, Person
oder Reihe) und führt dorthin zurück. Sonst ist es ein Social-Media-Post.

**Zielbild in etwa zwölf Monaten:** um die 40 gepflegte Läden in mehreren
Städten, eine laufende Beitragsreihe, etwas, das ich selbst benutze und
Bookern zeigen kann. Alles darüber ist Bonus.

Entscheidungen liegen bei Tim, Unterstützung durch seine Freundin punktuell.
Gebaut wird mit Claude Code. Zeit: 10 h/Woche, schwache Wochen 4 h.

## Richtung

Reihenfolge, kein Kalender.

1. **Verzeichnis live** — erledigt: Karte, Liste, Steckbrief, Filter,
   Teilen, Meldeformular, Impressum, Datenschutz, `/ueber`, leere
   `/magazin`-Struktur.
2. **Öffnen** — mehr Läden, Kurzbeschreibungen, Korrekturmail an Betreiber
   (fragt auch nach zwei, drei Sätzen zum Laden, Verwendung nur mit
   Freigabe), zwei bis drei eigene Themenartikel.
3. **Interviews und Artists** — schriftliche Interviews, zuerst DJs, später
   Betreiber. Artists als eigene Kategorie, verlinkt mit Läden.
   Erste Interviewanfrage geht raus, sobald drei Artikel online sind.

Ehrlichkeitsprüfung: Sind drei Monate nach dem ersten Artikel keine drei
Stücke erschienen, ist Kaverne ein Verzeichnis und das Magazin wird nicht
weiter bedient.

Ideen ohne Termin: Set-Aufnahmen an Locations, eigene Veranstaltungsreihe,
Label. Faceless bleibt.

## Bewusst nicht

| Baustein | Warum nicht jetzt | Neu prüfen, wenn |
|---|---|---|
| Konto, Merkliste, private Notizen | Lokal Gespeichertes übersteht keinen Gerätewechsel; ein Konto zieht Löschkonzept, Auskunft und Haftung nach sich | ca. 60 Einträge oder Nutzer fragen danach |
| Öffentliche Bewertungen, Community | Macht Kaverne zum Hostingdienst nach DSA, erzeugt Prüfpflichten | nur nach anwaltlicher Prüfung |
| Eventkalender | Laufende Pflege, mehrere Stunden pro Woche | Schwelle offen |
| Native App | Web-App reicht, Überführung per Capacitor später möglich | 150 wiederkehrende Nutzer/Monat oder 40 Homescreen-Installationen (derzeit nicht messbar, es gibt keine Statistik) |
| Ticketing | Nicht Teil des Produkts | — |

Nichts davon wird vorbereitet, solange die Schwelle nicht erreicht ist.

## Aufnahme

Ein Laden kommt rein, wenn elektronische Musik ein erkennbarer Schwerpunkt ist, nicht nur ein gelegentlicher Programmpunkt. Belegbare Grundlage bleibt Pflicht: eine wiederkehrende Nacht oder mehrere datierbare Veranstaltungen mit benanntem Line-up im letzten Jahr. Ruf und Selbstbeschreibung reichen nicht, ebenso wenig ein einzelnes elektronisches Event bei sonst anderem Programm.

Der Schwerpunkt wird im Einzelfall beurteilt, nicht über eine feste Quote — die meisten Einträge werden ohnehin von Hand geprüft. Zwei Wege gelten ausdrücklich als Beleg: eine eigene elektronische Reihe mit eigenem Namen (Beispiel: Toxicator, Time Warp in der Maimarkthalle), auch wenn das übrige Programm des Ortes überwiegend anders ist — maßgeblich ist dann die Reihe, nicht der Ort als Ganzes. Oder ein Ort, dessen elektronisches Programm den überwiegenden, klar erkennbaren Teil seiner Identität ausmacht.

Begründung: Die reine Häufigkeitsgrenze hätte Mehrzweck-Locations mit gelegentlichem elektronischem Programm eingeschlossen und das Verzeichnis von einer Anlaufstelle für die Szene zu einem allgemeinen Veranstaltungskalender verwässert.

Floors, Bühnen und Außenformate desselben Betreibers am selben Ort bekommen
keine eigene Zeile, sondern stehen beim Hauptladen unter „Wiederkehrende
Reihen". Eigene Zeile nur bei eigener Adresse und eigenem Programm.

**Region:** Südwest — Rhein-Neckar, Karlsruhe und Bruchsal, Pfalz, Saarland.
Städte am Rand nach eigenem Ermessen. Danach: Rhein-Main, Stuttgart, Freiburg.
Eine Stadt erscheint im Filter, sobald sie einen Eintrag hat.

Aussortierte Läden stehen im Sheet-Blatt „Ausgeschieden" mit Grund und werden
einmal im Jahr durchgesehen.

## Datenfelder

Die Werte der festen Listen gelten hier. Das Sheet (Tab „Listen", Dropdown,
Eingabe ablehnen) spiegelt sie.

**Pflicht:** Name · Typ · Stadt · Adresse · Status · mindestens ein Link

**Typ** (genau einer): Club · Bar · Location · Festival
Der Typ beschreibt, was der Laden ist, nicht warum er aufgenommen wurde.

**Genre** (mehrere, sobald belegbar): Techno · Hardtechno · House ·
Tech House · Trance · Drum & Bass · Hardstyle · Psytrance · Gemischt
„Gemischt" heißt: elektronische Abende neben anderem, kein fester
elektronischer Schwerpunkt. Genre kommt aus datierbaren Veranstaltungen.
Nichts belegbar: leer.

**Status:** aktiv · unregelmäßig · geschlossen (geschlossene Läden werden
nicht aufgenommen)

**Kern:** Kurzbeschreibung · Öffnungstage (Mo–So, mehrere) · Kapazität ·
Wiederkehrende Reihen · Preisniveau `€` / `€€` / `€€€` (Eintritt) ·
Residents (nur Datenbank, nicht angezeigt)

Kurzbeschreibung: selbst geschrieben, ein bis drei Sätze, nur aus eigener
Anschauung oder mit Freigabe des Betreibers. Nie abgeschrieben, auch nicht
umformuliert. Sonst leer.

**Praxis:** Kartenzahlung · Garderobe (Pflicht ja/nein, Preis) ·
Raucherbereich · Außenbereich · nächste Haltestelle · Barrierefreiheit ·
Kamerapolitik
Raucherbereich = ausgewiesener Bereich zum Rauchen, drinnen oder draußen.
Außenbereich = Hof, Terrasse oder Fläche im Freien, egal ob dort geraucht
wird. Beide sind unabhängig voneinander.
Praxisfelder werden nicht aktiv recherchiert, sondern aus Besuchen,
Betreiberantworten und Meldungen nachgetragen.

**Nicht erfasst:** Parken, Getränkepreise, Türpolitik.

**Intern** (Tabelle `venues_internal`, nie angezeigt, von der App nie
abgefragt): zuletzt geprüft · Herkunft · Ansprechpartner · Themenspeicher ·
Notiz

**Grundregeln**
- Leer ist besser als geraten. Ja/Nein als Dropdown, leer heißt unbekannt.
- ID nach `stadt-name`, ohne Umlaute, ß und Großbuchstaben. Nie geändert,
  nie wiederverwendet.
- Koordinaten kommen aus der Adresse und werden einmal bestätigt.
- Personen, Reihen und Beiträge haben eigene Tabellen. Personen und Reihen
  werden vorerst als Text gefüllt.
- Felder ergänzen ist billig, gefüllte Felder umbenennen oder löschen teuer.

## Anzeige

- Was in `venues` steht, wird angezeigt. Keine Anzeigebedingungen.
- Leere Felder und leere Blöcke verschwinden ganz, samt Überschrift. Keine
  Platzhalter, keine Bitte um Mithilfe. Ein Laden mit nur Pflichtfeldern
  sieht fertig aus.
- Ohne Koordinaten: kein Pin, kein Kartenausschnitt. Eintrag sonst voll
  nutzbar.
- Nie angezeigt: Residents, zuletzt geprüft, Herkunft, Quellen.
- Detailseite: Wann & wo · Programm & Kanäle · Preise & Größe · Vor Ort.
- Mobil zuerst, alles in Daumenreichweite.

## Recherche

- Preise und Öffnungstage nur mit Quellen jünger als zwölf Monate.
- Status aus der Aktualität des Programms.
- Barrierefreiheit nur bei ausdrücklicher Aussage.
- Keine fremden Fotos, Logos oder Texte, auch nicht von Instagram. Bilder nur
  eigene oder schriftlich freigegebene, kein Bild ist Pflicht.
- Fremde Datenbanken nicht automatisiert auslesen. szene-radar.de ist keine
  Adressquelle.
- Recherche-Chats laufen außerhalb dieses Projekts.
- Datenpflegetag: Sonntag, sonst Montag.

## Technik

Next.js auf Vercel · Supabase (eu-west-1) · MapLibre GL mit OpenFreeMap ·
Resend für das Meldeformular · Domain über Cloudflare · GitHub.
Später Capacitor. In der App keine Google-Dienste, insbesondere nicht Google
Maps Platform.

## Marke

Name **Kaverne**, Domain `kaverne.app`, Handle `@kaverne.app` auf Instagram,
YouTube, SoundCloud, TikTok, GitHub. Ein Dachname, Inhalte als Zusatz
(„Kaverne Magazin"), keine zweite Marke. `.de` ist fremd, `.club` wird nicht
genutzt. Projektadresse: `kaverne.app@gmail.com`.
DPMA/EUIPO-Vorrecherche 09.09.2026, Klassen 9/41/42, ohne relevante Treffer
(keine anwaltliche Bewertung). Gestaltung (Logo, Farben, Schrift) offen.

## Recht

Stand 15.09.2026, übernommen aus dem Chat „Impressum und Datenschutz".
[ungeprüft] — kein Ersatz für anwaltliche Beratung.

- Die Seite ist öffentlich. Impressum nach § 5 DDG und § 18 Abs. 1 MStV mit
  Wohnadresse, Postfach genügt nicht. Bei Umzug am selben Tag ändern.
- Kein Gewerbe, solange kein Geld fließt.
- Die Datenschutzerklärung deckt ab: Vercel, Supabase, OpenFreeMap, Resend,
  Empfangspostfach, ein Wert im Browser-Speicher (Zeitstempel des
  Meldeformulars). Neuer Dienst, neuer Browser-Speicher, Einbettung oder
  Statistik: Datenschutzerklärung vorher anpassen.
- DSA greift nicht, solange Kaverne nur eigene Inhalte speichert. Sobald
  Nutzer für andere sichtbare Inhalte einstellen: vorher anwaltlich prüfen.
- Mit dem ersten eigenen Artikel: Verantwortlicher nach § 18 Abs. 2 MStV ins
  Impressum, journalistische Sorgfalt nach § 19, Gegendarstellung nach § 20.
- Interviews: schriftliche Freigabe vor Veröffentlichung.
- Verzeichnisbetrieb ist zulässig. Einzelfakten sind frei, fremde Sammlungen
  geschützt.

## Arbeitsweise

Drei Dateien tragen das Projekt, alle im Repository, per GitHub-Sync im
Claude-Projekt:

- `docs/KAVERNE.md` — was gilt (diese Datei)
- `docs/OFFEN.md` — was ansteht, was zu entscheiden ist, letzte Sitzung
- `CLAUDE.md` — Regeln für Claude Code

Ein Chat im Projekt klärt eine Frage und endet mit einer Übergabe (nur die
Änderungen). Die Übergabe geht an Claude Code, das die Dateien anpasst.
Danach im Projekt synchronisieren.
