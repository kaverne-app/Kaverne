import Link from "next/link";

// Feste Kopfzeile mit Wortmarke — erscheint auf Start, Clubs, Magazin.
// Reiner Text, kein Symbol, kein Bild, nie im Akzent. Führt von jeder Seite
// zur Startseite zurück.
export default function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="wordmark">
        KAVERNE
      </Link>
    </header>
  );
}
