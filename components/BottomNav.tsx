import Link from "next/link";

export default function BottomNav({ active }: { active: "liste" | "karte" }) {
  return (
    <nav className="bottom-nav">
      <Link href="/" className={active === "liste" ? "active" : undefined}>
        Liste
      </Link>
      <Link href="/karte" className={active === "karte" ? "active" : undefined}>
        Karte
      </Link>
    </nav>
  );
}
