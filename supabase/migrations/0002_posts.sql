-- Kaverne — Baustein 5: Beitragstabelle und Magazin-Struktur (ohne Inhalte)

create table if not exists people (
  id bigint generated always as identity primary key,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists reihen (
  id bigint generated always as identity primary key,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists posts (
  id bigint generated always as identity primary key,
  titel text not null,
  slug text not null unique,
  text text,
  datum date,
  venue_id text references venues(id) on delete set null,
  person_id bigint references people(id) on delete set null,
  reihe_id bigint references reihen(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint posts_single_reference check (
    (case when venue_id is not null then 1 else 0 end) +
    (case when person_id is not null then 1 else 0 end) +
    (case when reihe_id is not null then 1 else 0 end) <= 1
  )
);

drop trigger if exists posts_set_updated_at on posts;
create trigger posts_set_updated_at
  before update on posts
  for each row
  execute function set_updated_at();

-- Öffentlich lesbar wie venues — keine internen/personenbezogenen Felder hier.
alter table people enable row level security;
alter table reihen enable row level security;
alter table posts enable row level security;

drop policy if exists "people_public_read" on people;
create policy "people_public_read" on people for select using (true);

drop policy if exists "reihen_public_read" on reihen;
create policy "reihen_public_read" on reihen for select using (true);

drop policy if exists "posts_public_read" on posts;
create policy "posts_public_read" on posts for select using (true);
