import Link from "next/link";

export default function DatenschutzPage() {
  return (
    <main className="venue-detail">
      <Link href="/" className="back-link">
        ← Zur Startseite
      </Link>
      <h1>Datenschutzerklärung</h1>

      <h2>1. Verantwortlicher</h2>
      <p>Tim Fischer Deutschland E-Mail: kaverne.app@gmail.com</p>

      <h2>2. Überblick</h2>
      <p>
        Diese Website setzt keine Cookies, verwendet keine Analyse- oder
        Statistikdienste, bindet keine Inhalte Dritter ein und bietet kein
        Nutzerkonto an. Verarbeitet werden nur die technisch anfallenden
        Zugriffsdaten, die Kartenabrufe und das, was Sie freiwillig über das
        Meldeformular oder per E-Mail mitteilen.
      </p>

      <h2>3. Aufruf der Website</h2>
      <p>
        Beim Aufruf werden vom Hosting-Anbieter technische Zugriffsdaten
        verarbeitet: IP-Adresse, Zeitpunkt, aufgerufene Adresse, Browser und
        Betriebssystem. Zweck ist die Auslieferung der Seite und die Abwehr
        von Störungen und Missbrauch, Rechtsgrundlage Art. 6 Abs. 1 lit. f
        DSGVO. Eine Auswertung zu Analysezwecken findet nicht statt.
      </p>
      <p>
        Anbieter ist Vercel Inc., USA, mit Auslieferung in der Region Irland.
        Es besteht ein Vertrag zur Auftragsverarbeitung. Vercel ist nach dem
        EU-US Data Privacy Framework zertifiziert; die Übermittlung in die
        USA stützt sich auf den Angemessenheitsbeschluss der Europäischen
        Kommission vom 10. Juli 2023 (Art. 45 DSGVO).
      </p>

      <h2>4. Datenbank</h2>
      <p>
        Die Inhalte dieser Website werden bei Supabase gespeichert,
        Datenhaltung in Irland, Vertragspartner Supabase Inc. (USA) und
        Supabase Pte. Ltd. (Singapur). Es besteht ein Vertrag zur
        Auftragsverarbeitung; die Übermittlung stützt sich auf die
        Standardvertragsklauseln der Europäischen Kommission (Art. 46 Abs. 2
        lit. c DSGVO).
      </p>

      <h2>5. Karte</h2>
      <p>
        Die Karte lädt Kartenbilder vom Anbieter OpenFreeMap (Hyperknot
        Software Kft., Ungarn). Dabei wird Ihre IP-Adresse an den Anbieter
        übermittelt, weil sie für die Auslieferung der Bilder nötig ist.
        Cookies werden dabei nicht gesetzt. Rechtsgrundlage ist Art. 6 Abs. 1
        lit. f DSGVO; das berechtigte Interesse liegt in der Darstellung der
        Standorte.
      </p>
      <p>
        Datenschutzerklärung des Anbieters: https://openfreemap.org/privacy/
      </p>

      <h2>6. Speicherung auf Ihrem Endgerät</h2>
      <p>
        Gespeichert werden zwei Werte: der Zeitpunkt Ihrer letzten Meldung
        über das Meldeformular, damit dieselbe Meldung nicht versehentlich
        mehrfach abgeschickt wird, sowie Ihre zuletzt gewählte
        Filterauswahl, damit sie beim nächsten Besuch erhalten bleibt. Beide
        Werte enthalten keine Kennung und lassen keinen Rückschluss auf Ihre
        Person zu. Über die Browsereinstellungen können Sie sie löschen.
      </p>

      <h2>7. Meldeformular</h2>
      <p>
        Verarbeitet werden der betroffene Eintrag, der gewählte Meldegrund,
        Ihr Freitext und — nur wenn Sie sie angeben — Ihre E-Mail-Adresse
        für Rückfragen. Zweck ist die Korrektur der Angaben, Rechtsgrundlage
        Art. 6 Abs. 1 lit. f DSGVO.
      </p>
      <p>
        Zur Begrenzung von Massenmeldungen wird Ihre IP-Adresse während des
        Absendevorgangs kurzzeitig im Arbeitsspeicher verwendet. Sie wird
        nicht protokolliert und nicht gespeichert.
      </p>
      <p>
        Ihre Meldung wird mir per E-Mail zugestellt und gelöscht, sobald sie
        bearbeitet ist, spätestens nach 90 Tagen. Versanddienstleister ist
        Resend (Plus Five Five, Inc., USA), nach dem EU-US Data Privacy
        Framework zertifiziert; es besteht ein Vertrag zur
        Auftragsverarbeitung.
      </p>

      <h2>8. Kontakt per E-Mail</h2>
      <p>
        Schreiben Sie mir per E-Mail, verarbeite ich Ihre Angaben zur
        Bearbeitung Ihres Anliegens und lösche sie, sobald sie nicht mehr
        benötigt werden, spätestens nach 12 Monaten. Rechtsgrundlage ist
        Art. 6 Abs. 1 lit. f DSGVO. Das Postfach wird betrieben von Google
        LLC.
      </p>

      <h2>9. Ihre Rechte</h2>
      <p>
        Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
        Einschränkung der Verarbeitung und Datenübertragbarkeit (Art. 15 bis
        20 DSGVO) sowie das Recht, der Verarbeitung nach Art. 21 DSGVO zu
        widersprechen. Wenden Sie sich dafür an die oben genannte Adresse.
      </p>
      <p>
        Beschwerden können Sie nach Art. 77 DSGVO an die zuständige
        Aufsichtsbehörde richten: Der Landesbeauftragte für den Datenschutz
        und die Informationsfreiheit Rheinland-Pfalz, Hintere Bleiche 34,
        55116 Mainz, poststelle@datenschutz.rlp.de
      </p>

      <h2>10. Stand</h2>
      <p>15.09.2026</p>
    </main>
  );
}
