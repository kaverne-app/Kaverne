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

  function item(href: string, key: BottomNavProps["active"], label: string) {
    const isActive = active === key;
    return (
      <Link href={href} className={isActive ? "active" : undefined}>
        <span className="nav-dot" aria-hidden="true" />
        {label}
      </Link>
    );
  }

  return (
    <nav className="bottom-nav">
      {item("/", "start", "Start")}
      {item(withQuery("/liste"), "liste", "Liste")}
      {item(withQuery("/karte"), "karte", "Karte")}
      {showMagazin && item("/magazin", "magazin", "Magazin")}
    </nav>
  );
}
