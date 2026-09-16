"use client";

import type { VenueFilter } from "@/lib/venue-view";
import { isFilterActive } from "@/lib/venue-view";

interface VenueFilterPanelProps {
  cityOptions: string[];
  genreOptions: string[];
  filter: VenueFilter;
  onChange: (filter: VenueFilter) => void;
}

export default function VenueFilterPanel({
  cityOptions,
  genreOptions,
  filter,
  onChange,
}: VenueFilterPanelProps) {
  function toggle(group: "stadte" | "genres", value: string) {
    const current = filter[group];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filter, [group]: next });
  }

  return (
    <div className="filter-bar">
      <div className="filter-chips">
        {genreOptions.map((genre) => (
          <button
            type="button"
            key={`genre-${genre}`}
            className={
              filter.genres.includes(genre) ? "filter-chip active" : "filter-chip"
            }
            onClick={() => toggle("genres", genre)}
          >
            {genre}
          </button>
        ))}
        {cityOptions.map((stadt) => (
          <button
            type="button"
            key={`stadt-${stadt}`}
            className={
              filter.stadte.includes(stadt) ? "filter-chip active" : "filter-chip"
            }
            onClick={() => toggle("stadte", stadt)}
          >
            {stadt}
          </button>
        ))}
      </div>
      {isFilterActive(filter) && (
        <button
          type="button"
          className="filter-reset"
          onClick={() => onChange({ stadte: [], genres: [] })}
        >
          Zurücksetzen
        </button>
      )}
    </div>
  );
}
