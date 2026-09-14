"use client";

import Link from "next/link";
import VenueFilterPanel from "./VenueFilterPanel";
import { useVenueFilter } from "@/lib/use-venue-filter";
import type { VenueFilterable } from "@/lib/venues";
import {
  availableCityOptions,
  availableGenreOptions,
  effectiveFilter,
  filterVenues,
  groupByCity,
  joinList,
} from "@/lib/venue-view";

export default function VenueListClient({ venues }: { venues: VenueFilterable[] }) {
  const [filter, setFilter] = useVenueFilter();

  const cityOptions = availableCityOptions(venues, filter);
  const genreOptions = availableGenreOptions(venues);
  const effective = effectiveFilter(venues, filter);
  const groups = groupByCity(filterVenues(venues, effective));

  return (
    <>
      <VenueFilterPanel
        cityOptions={cityOptions}
        genreOptions={genreOptions}
        filter={filter}
        onChange={setFilter}
      />
      <main className="venue-list">
        {groups.length === 0 && (
          <p className="empty-state">Keine Läden für diese Auswahl.</p>
        )}
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
      </main>
    </>
  );
}
