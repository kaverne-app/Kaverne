import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import VenueListClient from "@/components/VenueListClient";
import { hasAnyPost } from "@/lib/posts";
import { getFilterableVenues } from "@/lib/venues";

// Läden ändern sich nur durch einen erneuten CSV-Import, nicht durch
// Nutzeraktionen — deshalb bei jedem Aufruf frisch von Supabase laden,
// statt den Seiteninhalt beim Build fest einzufrieren.
export const dynamic = "force-dynamic";

export default async function ListePage() {
  const [venues, showMagazin] = await Promise.all([
    getFilterableVenues(),
    hasAnyPost(),
  ]);

  return (
    <>
      <VenueListClient venues={venues} />
      <Footer hasBottomNav />
      <BottomNav active="liste" showMagazin={showMagazin} />
    </>
  );
}
