"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface BottomNavProps {
  active: "start" | "liste" | "karte" | "magazin";
  showMagazin: boolean;
}

export default function BottomNav({ active, showMagazin }: BottomNavProps) {
  // Beim Wechsel zwischen Liste und Karte die aktuelle Filterauswahl aus der
  // Adresszeile mitnehmen, damit sie dabei erhalten bleibt.
  const query = useSearchParams().toString();
  const withQuery = (path: string) => (query ? `${path}?${query}` : path);

  return (
    <nav className="bottom-nav">
      <Link href="/" className={active === "start" ? "active" : undefined}>
        Start
      </Link>
      <Link href={withQuery("/liste")} className={active === "liste" ? "active" : undefined}>
        Liste
      </Link>
      <Link href={withQuery("/karte")} className={active === "karte" ? "active" : undefined}>
        Karte
      </Link>
      {showMagazin && (
        <Link href="/magazin" className={active === "magazin" ? "active" : undefined}>
          Magazin
        </Link>
      )}
    </nav>
  );
}
