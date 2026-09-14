# STAND.md

Wird am Ende jeder Sitzung überschrieben. Gibt den tatsächlichen Stand
wieder, nicht den geplanten.

## 1. Datum und Aufgaben-ID

2026-09-14 — A-03: Meldungen von eigener Domain statt Resend-Testadresse
senden, damit sie nicht im Spam landen.

## 2. Status je Aufgabe

- Baustein 1–3 (Datenbank/Import, Liste/Detailseite, Karte): **fertig**,
  unverändert.
- Baustein 4 (Filter, Favoriten, Notizen, Meldeknopf): Filter fertig.
  Favoriten und private Notizen **nicht gebaut** — stehen in der aktuellen
  `CLAUDE.md` auch nicht mehr als Regel.
- Baustein 5–7 (Beitragstabelle, Startseite, CLAUDE.md/STAND.md):
  **fertig**, unverändert.
- Baustein 8 / A-02 (Meldeweg über serverseitigen Mailversand): **fertig**,
  unverändert.
- A-03 (diese Aufgabe): **fertig**.

## 3. Akzeptanzkriterien (A-03)

- Absenderadresse ist `meldungen@kaverne.app`, nicht `onboarding@resend.dev`
  — **ja**: Die feste Sandbox-Adresse ist aus dem Code entfernt. Der
  tatsächliche Absender ergibt sich jetzt allein aus der neuen
  Umgebungsvariable `REPORT_FROM_EMAIL`.
- Antwortadresse ist `REPORT_TO_EMAIL` — **ja**: `replyTo` steht jetzt fest
  auf `REPORT_TO_EMAIL`, nicht mehr auf der vom Melder optional
  angegebenen Adresse. Eine vom Melder angegebene Adresse steht weiterhin
  im Mailtext, damit sie nicht verloren geht.
- Absenderadresse in Umgebungsvariable mit sprechendem Namen, nicht fest im
  Code — **ja**: `REPORT_FROM_EMAIL`, ohne Fallback-Wert. Fehlt sie, meldet
  die Funktion „gerade nicht möglich“ statt mit der alten
  Sandbox-Adresse zu senden. Was in Vercel einzutragen ist, steht unten
  unter Abschnitt 7.
- Betreff nennt den betroffenen Laden — **ja, unverändert**: `Meldung:
  ${venueName}` war bereits vor dieser Aufgabe so und erfüllt das
  Kriterium unverändert.
- Verhalten bei Fehlschlag bleibt wie es ist — **ja**: Prüfung real
  ausgelöst (siehe Abschnitt 6, Resend aus dieser Sandbox nicht
  erreichbar), Fehlermeldung und Statuscode sind identisch zu vorher.
- Keine weiteren Änderungen am Meldeformular — **ja**:
  `components/ReportButton.tsx` wurde in dieser Aufgabe nicht angefasst.
- Keine Mailadresse im an den Browser ausgelieferten Code — **ja**,
  geprüft per `grep` über `.next/static` nach dem Build: kein Treffer für
  `meldungen@kaverne.app` oder die Variablennamen.

## 4. Abweichungen von der Aufgabenbeschreibung, mit Grund

- Keine. Die Umsetzung folgt allen vier Akzeptanzkriterien und beiden
  Verboten unverändert.

## 5. Braucht Entscheidung von Tim

- Weiterhin offen (aus Baustein 7, unverändert): `genres`/`typ` sind noch
  Freitext, keine feste Liste im Datenmodell.

## 6. Bekannte Fehler

- **Kartenkacheln laden in dieser Umgebung weiterhin nicht** (unverändert
  seit Baustein 3/8) — `tiles.openfreemap.org` ist aus der Sandbox heraus
  netzwerkseitig blockiert.
- **Mailversand über Resend weiterhin nie gegen den echten Dienst
  getestet**, da `api.resend.com` aus derselben Sandbox nicht erreichbar
  ist. Geprüft ist in dieser Aufgabe: Ohne `REPORT_FROM_EMAIL` meldet die
  Funktion korrekt „gerade nicht möglich“; mit allen drei Variablen
  gesetzt baut sie die Anfrage mit der neuen Absender- und Antwortadresse
  auf und scheitert am blockierten Netzwerk mit derselben Fehlermeldung
  wie vorher. Ob eine echte Mail mit der neuen Absenderadresse ankommt und
  nicht im Spam landet, ist erst nach der Domain-Einrichtung durch Tim
  prüfbar (siehe Abschnitt 7).
- Sonst keine offenen Fehler bekannt.

## 7. Musst du selbst tun

- **Bei Resend die Domain `kaverne.app` verifizieren** (Resend-Dashboard
  → Domains → Domain hinzufügen), die dort angezeigten DNS-Einträge
  (SPF/DKIM, ggf. DMARC) beim Domain-Anbieter eintragen. Das ist die
  eigentliche Voraussetzung dafür, dass Mails nicht im Spam landen — ohne
  verifizierte Domain weist Resend Sendeversuche von dieser Adresse ab.
- In Vercel eine neue Umgebungsvariable **`REPORT_FROM_EMAIL`** anlegen,
  Wert z. B. `Kaverne <meldungen@kaverne.app>` (nicht `NEXT_PUBLIC_…`,
  damit sie nie im Browser landet). Ohne diese Variable meldet die
  Funktion „gerade nicht möglich“, statt zu senden.
- `REPORT_TO_EMAIL` bleibt wie bisher deine eigene Empfangsadresse — sie
  wird jetzt zusätzlich als Antwortadresse verwendet, muss also ein
  Postfach sein, das du tatsächlich liest.
- Nach dem Einrichten: einmal selbst auf der echten Seite eine
  Testmeldung abschicken, prüfen, dass sie im Posteingang (nicht im Spam)
  ankommt, und dass ein „Antworten“ tatsächlich an deine eigene Adresse
  geht.
- Weiterhin offen: prüfen, ob `supabase/migrations/0002_posts.sql` im
  SQL-Editor eingespielt ist (seit Baustein 7 ungeklärt).
- Weiterhin offen: Text für `/ueber` liefern.
