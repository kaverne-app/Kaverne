import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import VenueMapClient from "@/components/VenueMapClient";
import { hasAnyPost } from "@/lib/posts";
import { getFilterableVenues } from "@/lib/venues";

export const dynamic = "force-dynamic";

export default async function KartePage() {
  const [venues, showMagazin] = await Promise.all([
    getFilterableVenues(),
    hasAnyPost(),
  ]);

  return (
    <>
      <Header />
      <VenueMapClient venues={venues} />
      <BottomNav active="karte" showMagazin={showMagazin} />
    </>
  );
}
