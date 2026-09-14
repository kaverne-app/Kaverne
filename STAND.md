# STAND.md

Wird am Ende jeder Sitzung überschrieben. Gibt den tatsächlichen Stand
wieder, nicht den geplanten.

## 1. Datum und Aufgaben-ID

2026-09-14 — A-02 (Ergänzung): Meldeweg auf ein serverseitiges Formular
umstellen statt mailto, DSA-tauglich vor Veröffentlichung.

## 2. Status je Aufgabe

- Baustein 1–3 (Datenbank/Import, Liste/Detailseite, Karte): **fertig**,
  unverändert.
- Baustein 4 (Filter, Favoriten, Notizen, Meldeknopf): Filter fertig.
  Favoriten und private Notizen **nicht gebaut** — stehen in der aktuellen
  `CLAUDE.md` auch nicht mehr als Regel. Der Meldeknopf wurde in Baustein 8
  gebaut (damals mailto) und ist jetzt mit A-02 auf serverseitigen Versand
  umgestellt.
- Baustein 5–7 (Beitragstabelle, Startseite, CLAUDE.md/STAND.md):
  **fertig**, unverändert.
- Baustein 8 (Teilen, Meldeweg, Kartenausschnitt auf der Detailseite):
  **fertig**. Teilen-Knopf und Kartenausschnitt unverändert; der Meldeweg
  ist durch A-02 ersetzt (siehe unten).
- A-02 (diese Aufgabe): **fertig**.

## 3. Akzeptanzkriterien (A-02)

- Formular auf der Seite statt `mailto` — **ja**,
  `components/ReportButton.tsx` schickt per `fetch` an `app/api/report/route.ts`.
- Fragt nach betroffenem Punkt (Auswahl) und Freitext, E-Mail optional —
  **ja**.
- Versand serverseitig an die Projektmailadresse, Nutzer sieht Bestätigung
  — **ja, mit Einschränkung**: Der Code ruft Resend serverseitig auf; ob
  eine echte Mail ankommt, ist **nicht getestet** (kein Netzwerkzugriff auf
  Resend aus dieser Sandbox, siehe Abschnitt 6). Die Bestätigung im
  Browser erscheint erst, wenn Resend den Versand bestätigt hat, nicht
  vorher.
- Freitext fest begrenzt, keine beliebig vielen Meldungen kurz
  hintereinander — **ja**: 500 Zeichen, serverseitig und im Formular
  geprüft; höchstens 3 Meldungen pro 10 Minuten pro Absender-IP
  (serverseitig), zusätzlich 60 Sekunden Sperre im Browser nach einer
  erfolgreich verschickten Meldung.
- Versanddienst mit kostenloser Stufe, dokumentiert — **ja**, Resend.
  Details unter Abschnitt 7.
- Empfänger-Mailadresse nicht im Quelltext, nicht sichtbar — **ja**,
  liegt nur in der Umgebungsvariable `REPORT_TO_EMAIL`; geprüft, dass sie
  in keiner gebauten Client-Datei auftaucht (`grep` über `.next/static`).
- Keine IP-Speicherung, Begrenzung ohne dauerhafte Speicherung
  personenbezogener Daten — **ja, mit Auslegung**: siehe Abschnitt 4.
- Verständliche Meldung bei Fehlschlag — **ja**, real geprüft: Da Resend
  aus dieser Sandbox nicht erreichbar ist, schlägt der Versand tatsächlich
  fehl, und die Seite zeigt „Meldung konnte nicht verschickt werden.“
  statt einer technischen Fehlermeldung; das Formular bleibt ausgefüllt.

## 4. Abweichungen von der Aufgabenbeschreibung, mit Grund

- **Die IP-Adresse wird kurzzeitig im Arbeitsspeicher der Serverfunktion
  gehalten**, um die Begrenzung auf 3 Meldungen pro 10 Minuten technisch
  durchzusetzen — sie wird nirgends geloggt, in eine Datenbank geschrieben
  oder sonst dauerhaft festgehalten, nur für die Laufzeit des Prozesses in
  einer einfachen Zähler-Map. Das ist eine Auslegung von „keine
  IP-Adressen speichern“ als „nicht dauerhaft speichern“. Falls das zu
  weit geht: Rückmeldung, dann bleibt nur die schwächere,
  browserseitige Sperre übrig (umgehbar durch Neuladen mit gelöschtem
  Speicher oder anderem Gerät).
- **Die Begrenzung gilt pro Serverfunktions-Instanz, nicht global.** Bei
  mehreren gleichzeitigen Vercel-Instanzen könnte die tatsächliche Grenze
  etwas über 3 pro 10 Minuten liegen. Für die erwartete Meldungsmenge
  ohne Bedeutung, aber kein hundertprozentiger Schutz vor Missbrauch.
- **Erfolgspfad des Mailversands ungetestet** (siehe Abschnitt 6) — nur
  der Fehlerpfad ließ sich in dieser Umgebung wirklich auslösen.
- **Nebenbei behoben:** Der „← Zur Liste“-Link auf der Detailseite zeigte
  auf `/` (seit Baustein 6 die Startseite, nicht mehr die Liste) statt auf
  `/liste`. Baustein 8 wurde nach Baustein 6 gebaut, hatte das aber nicht
  nachgezogen. Jetzt korrigiert.

## 5. Braucht Entscheidung von Tim

- Die frühere Frage „serverseitiger Versand ja/nein“ ist mit dieser
  Aufgabe beantwortet (ja) und umgesetzt — **erledigt**.
- Falls die engere Auslegung des IP-Punkts aus Abschnitt 4 gewünscht ist
  (IP nie anfassen, auch nicht kurzzeitig im Arbeitsspeicher): Rückmeldung.
- Weiterhin offen (aus Baustein 7, unverändert): `genres`/`typ` sind noch
  Freitext, keine feste Liste im Datenmodell.
- Weiterhin offen (aus Baustein 7, unverändert): Der in den Anzeigeregeln
  verlangte Sichtbarkeitsfilter (Status, mindestens ein Link,
  `zuletzt_geprueft` gesetzt) ist nicht implementiert.

## 6. Bekannte Fehler

- **Kartenkacheln laden in dieser Umgebung weiterhin nicht** (unverändert
  seit Baustein 3/8) — `tiles.openfreemap.org` ist aus der Sandbox heraus
  netzwerkseitig blockiert.
- **Mailversand über Resend nie gegen den echten Dienst getestet.**
  `api.resend.com` ist aus derselben Sandbox heraus ebenfalls nicht
  erreichbar. Geprüft ist nur, dass die Anfrage korrekt aufgebaut wird und
  bei einem echten Fehlschlag die richtige, verständliche Meldung
  erscheint — nicht, dass eine echte Mail ankommt.
- Sonst keine offenen Fehler bekannt.

## 7. Musst du selbst tun

- **Resend-Konto anlegen** (resend.com, kostenlose Stufe reicht für die
  erwartete Menge).
- Einen API-Key erzeugen und in Vercel als Umgebungsvariable
  `RESEND_API_KEY` eintragen (als Secret).
- `REPORT_TO_EMAIL` in Vercel auf die gewünschte Empfänger-Adresse setzen
  (nicht `NEXT_PUBLIC_…`, damit sie nie im Browser landet). Ohne diese
  Variable meldet die Funktion „gerade nicht möglich“, statt zu senden.
- **Wichtig:** Ohne eigene, bei Resend verifizierte Absender-Domain
  funktioniert der Versand nur an die E-Mail-Adresse, mit der das
  Resend-Konto angelegt wurde (Resend-Sandbox-Beschränkung). `REPORT_TO_EMAIL`
  sollte also erst mal genau diese Adresse sein. Für eine andere
  Zieladresse oder einen eigenen Absendernamen später `RESEND_FROM_EMAIL`
  setzen und eine Domain bei Resend verifizieren (eigene DNS-Einträge).
- Nach dem Einrichten: einmal selbst auf der echten Seite eine
  Testmeldung abschicken und prüfen, ob die Mail ankommt und lesbar ist.
- Weiterhin offen: prüfen, ob `supabase/migrations/0002_posts.sql` im
  SQL-Editor eingespielt ist (seit Baustein 7 ungeklärt).
- Weiterhin offen: Text für `/ueber` liefern.

## 8. Abgleich mit den Festlegungen

- **Trennung der internen Felder:** unverändert eingehalten, diese
  Aufgabe hat `venues_internal` an keiner Stelle berührt.
- **Kartenanbieter:** unverändert eingehalten, keine Änderung in dieser
  Aufgabe.
- **Beitragstabelle vorhanden:** unverändert, siehe Baustein 5/7.
- **`/magazin`-URL-Struktur vorhanden:** unverändert, siehe Baustein 5/7.
- **Neuer Dienst (Resend):** wäre laut „Nicht selbst entscheiden“
  eigentlich zustimmungspflichtig — Tim hat die Umstellung in dieser
  Sitzung ausdrücklich freigegeben („Ja, jetzt umstellen“, Kosten bei der
  erwarteten Menge für unerheblich erklärt), deshalb umgesetzt statt nur
  eingetragen.
