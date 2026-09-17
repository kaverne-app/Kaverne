"use client";

import { useState } from "react";
import type { VenueFilter } from "@/lib/venue-view";
import { isFilterActive } from "@/lib/venue-view";

interface FilterGroup {
  key: keyof VenueFilter;
  label: string;
  options: string[];
}

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
  const [openKey, setOpenKey] = useState<string | null>(null);

  // Ein weiterer Filter später ist nur ein zusätzlicher Eintrag hier — die
  // Reihe aus Dropdowns nimmt ihn ohne Layout-Änderung auf.
  const allGroups: FilterGroup[] = [
    { key: "stadte", label: "Stadt", options: cityOptions },
    { key: "genres", label: "Genre", options: genreOptions },
  ];
  const groups = allGroups.filter((group) => group.options.length > 0);

  function toggleValue(key: keyof VenueFilter, value: string) {
    const current = filter[key];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filter, [key]: next });
  }

  return (
    <div className="filter-bar">
      <div className="filter-groups">
        {groups.map((group) => {
          const count = filter[group.key].length;
          const isOpen = openKey === group.key;
          return (
            <div className="filter-dropdown" key={group.key}>
              <button
                type="button"
                className={
                  count > 0
                    ? "filter-dropdown-toggle has-selection"
                    : "filter-dropdown-toggle"
                }
                aria-expanded={isOpen}
                onClick={() => setOpenKey(isOpen ? null : group.key)}
              >
                {group.label}
                {count > 0 ? ` (${count})` : ""}
              </button>
              {isOpen && (
                <div className="filter-dropdown-panel">
                  {group.options.map((option) => (
                    <label className="filter-checkbox-row" key={option}>
                      <span className="filter-checkbox">
                        <input
                          type="checkbox"
                          checked={filter[group.key].includes(option)}
                          onChange={() => toggleValue(group.key, option)}
                        />
                        <span className="filter-checkbox-box" aria-hidden="true" />
                      </span>
                      {option}
                    </label>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {isFilterActive(filter) && (
        <button
          type="button"
          className="filter-reset"
          onClick={() => {
            onChange({ stadte: [], genres: [] });
            setOpenKey(null);
          }}
        >
          Zurücksetzen
        </button>
      )}
      {openKey && (
        <button
          type="button"
          className="filter-backdrop"
          aria-label="Filter schließen"
          onClick={() => setOpenKey(null)}
        />
      )}
    </div>
  );
}
