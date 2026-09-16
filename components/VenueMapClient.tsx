"use client";

import VenueFilterPanel from "./VenueFilterPanel";
import VenueMap from "./VenueMap";
import { useVenueFilter } from "@/lib/use-venue-filter";
import type { VenueFilterable, VenuePin } from "@/lib/venues";
import {
  availableCityOptions,
  availableGenreOptions,
  effectiveFilter,
  filterVenues,
} from "@/lib/venue-view";

function hasCoordinates(venue: VenueFilterable): venue is VenueFilterable & VenuePin {
  return venue.lat !== null && venue.lon !== null;
}

export default function VenueMapClient({ venues }: { venues: VenueFilterable[] }) {
  const [filter, setFilter] = useVenueFilter();

  const cityOptions = availableCityOptions(venues, filter);
  const genreOptions = availableGenreOptions(venues);
  const effective = effectiveFilter(venues, filter);
  const pins = filterVenues(venues, effective).filter(hasCoordinates);

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
