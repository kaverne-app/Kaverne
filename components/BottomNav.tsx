import Link from "next/link";

interface BottomNavProps {
  active: "start" | "liste" | "karte" | "magazin";
  showMagazin: boolean;
}

export default function BottomNav({ active, showMagazin }: BottomNavProps) {
  return (
    <nav className="bottom-nav">
      <Link href="/" className={active === "start" ? "active" : undefined}>
        Start
      </Link>
      <Link href="/liste" className={active === "liste" ? "active" : undefined}>
        Liste
      </Link>
      <Link href="/karte" className={active === "karte" ? "active" : undefined}>
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
