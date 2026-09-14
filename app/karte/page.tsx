import BottomNav from "@/components/BottomNav";
import VenueMapClient from "@/components/VenueMapClient";
import { getFilterableVenues } from "@/lib/venues";

export const dynamic = "force-dynamic";

export default async function KartePage() {
  const venues = await getFilterableVenues();

  return (
    <>
      <VenueMapClient venues={venues} />
      <BottomNav active="karte" />
    </>
  );
}
