import Link from "next/link";

// Feste Kopfzeile mit Zeichen und Wortmarke (public/kopfzeile.svg, aus
// design/website/) — erscheint auf Start, Clubs, Magazin. Führt von jeder
// Seite zur Startseite zurück.
export default function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="wordmark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/kopfzeile.svg" alt="Kaverne" width={141} height={20} />
      </Link>
    </header>
  );
}
