-- Kaverne — A-15: Tabelle für aussortierte Läden (siehe docs/KAVERNE.md,
-- Abschnitt "Aufnahme": "Aussortierte Läden stehen in der Tabelle
-- ausgeschieden mit Grund und werden einmal im Jahr durchgesehen.")

create table if not exists ausgeschieden (
  id text primary key,
  name text not null,
  stadt text,
  grund text,
  datum date
);

-- Wie venues_internal in 0001_init.sql: RLS an, aber bewusst keine Policy
-- angelegt — ohne Policy verweigert RLS jeden Zugriff über den anon- oder
-- authenticated-Key. Die Tabelle ist damit nicht öffentlich lesbar.
alter table ausgeschieden enable row level security;
