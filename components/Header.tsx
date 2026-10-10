"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

// Feste Kopfzeile mit Zeichen und Wortmarke (public/kopfzeile.svg, aus
// design/website/). Die Wortmarke führt von jeder Seite zur Startseite.
// Ab 1024 px kommen rechts die Textlinks dazu (mobil trägt die Leiste unten
// die Navigation). `desktopOnly`: Seiten, die mobil keine Kopfzeile haben
// (Detail, Über, Impressum, Datenschutz), zeigen sie erst am Desktop.
export default function Header({ desktopOnly = false }: { desktopOnly?: boolean }) {
  return (
    <header className={desktopOnly ? "site-header site-header--desktop-only" : "site-header"}>
      <Link href="/" className="wordmark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/kopfzeile.svg" alt="Kaverne" width={141} height={20} />
      </Link>
      <Suspense fallback={null}>
        <HeaderNav />
      </Suspense>
    </header>
  );
}

function HeaderNav() {
  const pathname = usePathname();
  // Wie in der Leiste unten: beim Klick auf Clubs Filter und Ansicht aus der
  // Adresszeile mitnehmen.
  const query = useSearchParams().toString();

  const clubsActive = pathname === "/clubs" || pathname.startsWith("/venues/");
  const ueberActive = pathname === "/ueber";

  return (
    <nav className="site-nav" aria-label="Hauptnavigation">
      <Link
        href={query && pathname === "/clubs" ? `/clubs?${query}` : "/clubs"}
        className={clubsActive ? "active" : undefined}
        aria-current={clubsActive ? "page" : undefined}
      >
        Clubs
      </Link>
      <Link
        href="/ueber"
        className={ueberActive ? "active" : undefined}
        aria-current={ueberActive ? "page" : undefined}
      >
        Über
      </Link>
    </nav>
  );
}
