import Link from "next/link";

export default function ImpressumPage() {
  return (
    <main className="venue-detail">
      <Link href="/" className="back-link">
        ← Zur Startseite
      </Link>
      <h1>Impressum</h1>

      <p>Angaben gemäß § 5 DDG und § 18 Abs. 1 MStV</p>

      <p>
        Tim Fischer
        <br />
        Kirchbergstraße 22
        <br />
        76889 Gleiszellen
        <br />
        Deutschland
        <br />
        kaverne.app@gmail.com
      </p>

      <h2>Verantwortlich für den Inhalt</h2>

      <p>Tim Fischer Deutschland</p>
    </main>
  );
}
