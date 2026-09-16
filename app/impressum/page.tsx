import BackLink from "@/components/BackLink";

export default function ImpressumPage() {
  return (
    <main className="venue-detail">
      <BackLink href="/">Zur Startseite</BackLink>
      <h1>Impressum</h1>

      <p>Angaben gemäß § 5 DDG und § 18 Abs. 1 MStV</p>

      <p>
        Tim Fischer
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
