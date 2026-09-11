import BottomNav from "@/components/BottomNav";
import VenueMap from "@/components/VenueMap";
import { getVenuePins } from "@/lib/venues";

export const dynamic = "force-dynamic";

export default async function KartePage() {
  const venues = await getVenuePins();

  return (
    <main className="map-page">
      <VenueMap venues={venues} />
      <BottomNav active="karte" />
    </main>
  );
}
