"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface BottomNavProps {
  active: "start" | "clubs" | "magazin";
  showMagazin: boolean;
}

export default function BottomNav({ active, showMagazin }: BottomNavProps) {
  // Beim Wechsel zu Clubs die aktuelle Filter- und Ansichtsauswahl aus der
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
      {item(withQuery("/clubs"), "clubs", "Clubs")}
      {showMagazin && item("/magazin", "magazin", "Magazin")}
    </nav>
  );
}
