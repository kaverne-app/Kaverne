import Link from "next/link";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import { hasAnyPost } from "@/lib/posts";
import { getVenueStats } from "@/lib/venues";

export const dynamic = "force-dynamic";

export default async function StartPage() {
  const [stats, showMagazin] = await Promise.all([getVenueStats(), hasAnyPost()]);

  return (
    <>
      <Header />
      <main className="home">
        <p className="home-tagline">
          Clubs und Venues für elektronische Musik im Südwesten
        </p>

        <Link href="/karte" className="home-block">
          <span className="home-block-title">Clubs</span>
          <span className="home-block-meta">
            {stats.count} {stats.count === 1 ? "Eintrag" : "Einträge"}
            {stats.cities.length > 0 ? ` · ${stats.cities.join(", ")}` : ""}
          </span>
        </Link>

        {showMagazin && (
          <Link href="/magazin" className="home-block">
            <span className="home-block-title">Magazin</span>
          </Link>
        )}

        <Link href="/ueber" className="home-block">
          <span className="home-block-title">Über</span>
        </Link>
      </main>
      <Footer hasBottomNav />
      <BottomNav active="start" showMagazin={showMagazin} />
    </>
  );
}
