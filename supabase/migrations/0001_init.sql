-- Kaverne — Baustein 1: venues und venues_internal

create table if not exists venues (
  id text primary key,
  name text not null,
  typ text,
  stadt text,
  adresse text,
  lat double precision,
  lon double precision,
  genres text[],
  status text,
  oeffnungstage text[],
  kurzbeschreibung text,
  kapazitaet text,
  residents text,
  reihen text,
  preisniveau text,
  kartenzahlung text,
  garderobe text,
  raucherbereich text,
  haltestelle text,
  barrierefreiheit text,
  kamerapolitik text,
  links jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists venues_set_updated_at on venues;
create trigger venues_set_updated_at
  before update on venues
  for each row
  execute function set_updated_at();

-- venues_internal: nie von der App abgefragt. Verweist per venue_id auf venues.
create table if not exists venues_internal (
  venue_id text primary key references venues(id) on delete cascade,
  zuletzt_geprueft date,
  herkunft text,
  ansprechpartner text,
  was_passiert_dort text,
  notiz text
);

-- Zugriff: venues ist öffentlich lesbar (anon-Key), venues_internal für niemanden
-- über die API erreichbar — auch nicht mit dem anon-Key. Schreibender Zugriff
-- (Import) läuft ausschließlich über den service_role-Key, der RLS umgeht.
alter table venues enable row level security;
alter table venues_internal enable row level security;

drop policy if exists "venues_public_read" on venues;
create policy "venues_public_read" on venues
  for select
  using (true);

-- Für venues_internal wird bewusst keine Policy angelegt: ohne Policy verweigert
-- RLS jeden Zugriff über den anon- oder authenticated-Key.
