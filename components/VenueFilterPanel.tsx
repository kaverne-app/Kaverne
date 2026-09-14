"use client";

import { useState } from "react";
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
  const [open, setOpen] = useState(false);
  const activeCount = filter.stadte.length + filter.genres.length;

  function toggle(group: "stadte" | "genres", value: string) {
    const current = filter[group];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filter, [group]: next });
  }

  return (
    <div className="filter-bar">
      <button
        type="button"
        className="filter-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        Filter{activeCount > 0 ? ` (${activeCount})` : ""}
      </button>
      {isFilterActive(filter) && (
        <button
          type="button"
          className="filter-reset"
          onClick={() => onChange({ stadte: [], genres: [] })}
        >
          Zurücksetzen
        </button>
      )}

      {open && (
        <div className="filter-panel">
          {genreOptions.length > 0 && (
            <div className="filter-group">
              <h3>Genre</h3>
              <div className="filter-chips">
                {genreOptions.map((genre) => (
                  <button
                    type="button"
                    key={genre}
                    className={
                      filter.genres.includes(genre)
                        ? "filter-chip active"
                        : "filter-chip"
                    }
                    onClick={() => toggle("genres", genre)}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          )}

          {cityOptions.length > 0 && (
            <div className="filter-group">
              <h3>Stadt</h3>
              <div className="filter-chips">
                {cityOptions.map((stadt) => (
                  <button
                    type="button"
                    key={stadt}
                    className={
                      filter.stadte.includes(stadt)
                        ? "filter-chip active"
                        : "filter-chip"
                    }
                    onClick={() => toggle("stadte", stadt)}
                  >
                    {stadt}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button type="button" className="filter-done" onClick={() => setOpen(false)}>
            Fertig
          </button>
        </div>
      )}
    </div>
  );
}
