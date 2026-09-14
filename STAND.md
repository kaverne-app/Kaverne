# STAND.md

Wird am Ende jeder Sitzung überschrieben. Gibt den tatsächlichen Stand
wieder, nicht den geplanten.

**Hinweis zu dieser Fassung:** Auf Tims Wunsch ist dies eine ausführliche
Gesamt-Bestandsaufnahme über alle bisherigen Aufgaben hinweg, kein
gewöhnliches Sitzungsende. Ausnahmsweise länger als eine Seite — danach
wird wieder knapp pro Aufgabe überschrieben.

## 1. Datum und Aufgaben-ID

2026-09-14 — Gesamtstand nach A-03. A-03 (eigene Absenderdomain für den
Meldeweg) ist von Tim live getestet und als funktionsfähig bestätigt.
Kein neuer Auftrag in dieser Sitzung, sondern eine vollständige
Bestandsaufnahme über das gesamte Projekt.

## 2. Status je Aufgabe

- **Baustein 1 — Datenbank & Import:** fertig. `venues` und
  `venues_internal` angelegt, CSV-Import wiederholbar über `id`.
- **Baustein 2 — Liste & Detailseite:** fertig.
- **Baustein 3 — Karte:** fertig. MapLibre GL mit OpenFreeMap-Kacheln
  (freier Anbieter, kein Google-Dienst).
- **Baustein 4 — Filter:** fertig (Stadt, Genre). Favoriten und private
  Notizen waren ursprünglich Teil dieses Bausteins, sind aber inzwischen
  aus den Regeln gestrichen (siehe `CLAUDE.md`, „Verbote") und wurden nie
  gebaut.
- **Baustein 5 — Beitragstabelle & Magazin-Struktur:** fertig.
  `posts`/`people`/`reihen` angelegt, `/magazin`-Route vorhanden, bewusst
  ohne Inhalte.
- **Baustein 6 — Startseite:** fertig.
- **Baustein 7 — CLAUDE.md/STAND.md eingerichtet:** fertig.
- **Baustein 8 — Teilen-Knopf, Meldeweg (damals mailto), Kartenausschnitt
  auf der Detailseite:** fertig. Der Meldeweg aus diesem Baustein wurde
  danach durch A-02 ersetzt.
- **A-02 — Meldeweg auf serverseitiges Formular umgestellt:** fertig.
  Kein `mailto` mehr, Versand über Resend, Rate-Limit, Zeichenbegrenzung.
- **A-03 — Eigene Absenderdomain, feste Antwortadresse:** fertig **und
  jetzt live bestätigt** (siehe Abschnitt 3).

Insgesamt: Alle bisher beauftragten Bausteine sind fertig. Offene Punkte
sind keine unfertigen Bausteine, sondern bewusst zurückgestellte
Entscheidungen und Dinge, die nur Tim erledigen kann (Abschnitte 5–7).

## 3. Akzeptanzkriterien (A-03, jetzt live bestätigt)

- Absenderadresse `meldungen@kaverne.app` statt `onboarding@resend.dev`
  — **ja**, von Tim live getestet.
- Antwortadresse ist `REPORT_TO_EMAIL` — **ja**, von Tim live getestet
  (Antworten kommen bei ihm an).
- Absenderadresse in Umgebungsvariable (`REPORT_FROM_EMAIL`), nicht fest
  im Code — **ja**.
- Betreff nennt den betroffenen Laden — **ja**, unverändert seit A-02.
- Verhalten bei Fehlschlag unverändert — **ja**, nicht neu ausgelöst,
  aber Code seit A-02 unverändert an dieser Stelle.
- Landet nicht im Spam — **von Tim bestätigt** („Getestet und
  Funktional"). Damit ist der zuvor in dieser Sandbox nicht testbare
  Erfolgspfad des Mailversands jetzt real bestätigt — der entsprechende
  Eintrag unter „Bekannte Fehler" aus der letzten Fassung entfällt.

## 4. Abweichungen von der Aufgabenbeschreibung, mit Grund

- Keine offenen Abweichungen bei A-02/A-03. Einzige Besonderheit dieser
  Fassung: STAND.md ist diesmal absichtlich ausführlicher als sonst
  (siehe Hinweis oben), auf Tims ausdrücklichen Wunsch nach einer
  vollständigen Bestandsaufnahme.

## 5. Braucht Entscheidung von Tim

- **`genres` und `typ` sind weiterhin Freitext, keine feste Liste.** Laut
  `CLAUDE.md` sollen beide aus festen Listen kommen. Weder in der
  Datenbank (Spalten sind einfacher `text`/`text[]` ohne Einschränkung)
  noch im Import-Code gibt es bisher eine feste Werteliste. Das ist eine
  Änderung am Datenmodell und damit nicht meine Entscheidung: Ich brauche
  von dir die konkrete(n) Liste(n) für `typ` und für `genres`, dann baue
  ich die Einschränkung ein (Datenbank-Check und Import-Prüfung). Bisher
  unbeantwortet, seit Baustein 7 offen.
- **Rate-Limit beim Meldeweg speichert die Absender-IP kurzzeitig im
  Arbeitsspeicher.** Bei der Umstellung auf serverseitigen Versand (A-02)
  musste ich „keine IP-Adressen speichern" auslegen: Die IP wird
  nirgends geloggt oder dauerhaft gespeichert, dient aber für die Dauer
  des laufenden Prozesses als Schlüssel in einer einfachen Zähler-Liste,
  damit nicht beliebig viele Meldungen kurz hintereinander durchgehen.
  Diese Auslegung („nicht dauerhaft speichern" statt „nie anfassen") ist
  bisher unbeantwortet. Falls dir die engere Auslegung wichtig ist
  (IP nie anfassen, auch nicht kurzzeitig): Rückmeldung, dann bleibt nur
  die schwächere, rein browserseitige Sperre übrig (umgehbar durch
  Neuladen mit gelöschtem Speicher oder anderem Gerät).

## 6. Bekannte Fehler

- **Kartenkacheln laden in der Entwicklungs-/Testumgebung dieser Sitzung
  nicht.** Das ist keine Auffälligkeit der App, sondern eine
  Netzwerksperre dieser Sandbox gegenüber `tiles.openfreemap.org`. Auf
  der echten Vercel-Deployment hattest du das bereits bestätigt
  („Ja sieht gut aus"), betrifft also nur das Testen hier, nicht die
  Live-Seite.
- Sonst keine offenen Fehler bekannt. Der Meldeweg über Resend ist jetzt
  vollständig (inklusive Zustellung) live bestätigt.

## 7. Musst du selbst tun

- **Erledigt, nur zur Nachvollziehbarkeit:** Resend-Domain `kaverne.app`
  verifiziert, `REPORT_FROM_EMAIL` in Vercel gesetzt, Testmeldung
  verschickt und Zustellung geprüft — laut deiner Rückmeldung
  abgeschlossen und funktionsfähig.
- **Noch offen:** Prüfen, ob `supabase/migrations/0002_posts.sql`
  (Tabellen `posts`, `people`, `reihen`) im Supabase-SQL-Editor
  eingespielt ist. Das ist seit Baustein 7 unbeantwortet — ohne diese
  Migration existieren die Magazin-Tabellen in der echten Datenbank
  noch nicht, `/magazin` liefe dann bei einem echten Seitenaufruf ins
  Leere (aktuell unkritisch, da das Magazin ohnehin noch ohne Inhalte
  ist, aber vor dem ersten Beitrag nötig).
- **Noch offen:** Text für `/ueber` liefern — die Seite zeigt aktuell
  nur die Überschrift „Über" ohne Inhalt.
- **Noch offen (siehe Abschnitt 5):** feste Wertelisten für `typ` und
  `genres` festlegen.
- **Noch offen (siehe Abschnitt 5):** Rückmeldung zur IP-Auslegung beim
  Rate-Limit des Meldewegs, falls die engere Auslegung gewünscht ist.
