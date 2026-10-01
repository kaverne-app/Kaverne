"use client";

import { useMemo } from "react";
import VenueFilterPanel from "./VenueFilterPanel";
import VenueMap from "./VenueMap";
import { useVenueFilter } from "@/lib/use-venue-filter";
import type { VenueFilterable, VenuePin } from "@/lib/venues";
import {
  availableCityOptions,
  EMPTY_VENUE_FILTER,
  availableGenreOptions,
  effectiveFilter,
  filterVenues,
} from "@/lib/venue-view";

function hasCoordinates(venue: VenueFilterable): venue is VenueFilterable & VenuePin {
  return venue.lat !== null && venue.lon !== null;
}

export default function VenueMapClient({ venues }: { venues: VenueFilterable[] }) {
  const allCities = useMemo(() => availableCityOptions(venues, EMPTY_VENUE_FILTER), [venues]);
  const [filter, setFilter] = useVenueFilter(allCities);

  const cityOptions = availableCityOptions(venues, filter);
  const genreOptions = availableGenreOptions(venues);
  const effective = effectiveFilter(venues, filter);
  const effectiveKey = JSON.stringify(effective);
  // Stabile Liste: ändert sich nur, wenn sich Daten oder Filter ändern,
  // damit die Karte nicht bei jedem Rendern neu zoomt.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pins = useMemo(() => filterVenues(venues, effective).filter(hasCoordinates), [venues, effectiveKey]);

  return (
    <main className="map-page">
      <VenueFilterPanel
        cityOptions={cityOptions}
        genreOptions={genreOptions}
        filter={filter}
        onChange={setFilter}
      />
      <VenueMap venues={pins} />
    </main>
  );
}
