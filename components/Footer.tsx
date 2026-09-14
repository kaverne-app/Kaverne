import Link from "next/link";

// Erscheint auf den Läden-, Magazin- und Über-Seiten. Reine Textlinks, keine
// Schriften/Symbole/Bilder von fremden Servern.
export default function Footer({ hasBottomNav = false }: { hasBottomNav?: boolean }) {
  return (
    <footer className={hasBottomNav ? "site-footer site-footer--bottom-nav" : "site-footer"}>
      <Link href="/impressum">Impressum</Link>
      <Link href="/datenschutz">Datenschutz</Link>
    </footer>
  );
}
