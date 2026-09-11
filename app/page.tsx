import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { getVenues } from "@/lib/venues";
import { groupByCity, joinList } from "@/lib/venue-view";

// Läden ändern sich nur durch einen erneuten CSV-Import, nicht durch
// Nutzeraktionen — deshalb bei jedem Aufruf frisch von Supabase laden,
// statt den Seiteninhalt beim Build fest einzufrieren.
export const dynamic = "force-dynamic";

export default async function Home() {
  const venues = await getVenues();
  const groups = groupByCity(venues);

  return (
    <main className="venue-list">
      {groups.map((group) => (
        <section key={group.stadt ?? "ohne-stadt"}>
          {group.stadt && <h2 className="city-heading">{group.stadt}</h2>}
          <ul>
            {group.venues.map((venue) => (
              <li key={venue.id}>
                <Link href={`/venues/${venue.id}`} className="venue-row">
                  <span className="venue-name">{venue.name}</span>
                  <span className="venue-meta">
                    {[venue.typ, joinList(venue.genres)]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <BottomNav active="liste" />
    </main>
  );
}
