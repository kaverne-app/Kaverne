import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import ClubsView from "@/components/ClubsView";
import { hasAnyPost } from "@/lib/posts";
import { getFilterableVenues } from "@/lib/venues";

// Läden ändern sich nur durch einen erneuten CSV-Import, nicht durch
// Nutzeraktionen — deshalb bei jedem Aufruf frisch von Supabase laden,
// statt den Seiteninhalt beim Build fest einzufrieren.
export const dynamic = "force-dynamic";

export default async function ClubsPage() {
  const [venues, showMagazin] = await Promise.all([
    getFilterableVenues(),
    hasAnyPost(),
  ]);

  return (
    <>
      <Header />
      <ClubsView venues={venues} />
      <BottomNav active="clubs" showMagazin={showMagazin} />
    </>
  );
}
