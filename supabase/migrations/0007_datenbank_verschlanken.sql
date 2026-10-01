-- Kaverne — A-18: Datenbank verschlanken (siehe docs/KAVERNE.md,
-- Abschnitt "Datenfelder"). Von Tim am 01.10.2026 in Klartext bestätigt.
-- Danach gibt es nur noch "venues" und "posts".
-- Gefüllte Werte, die verloren gehen: Kapazität 1, Residents 1,
-- Barrierefreiheit 1, Kamerapolitik 4 Läden, venues_internal 8 Zeilen
-- (Läden-Werte stehen noch in der Git-Historie von data/venues.json).
-- Die Funktion set_updated_at bleibt, "posts" nutzt sie.

begin;

alter table posts drop constraint if exists posts_single_reference;
alter table posts drop column if exists person_id;
alter table posts drop column if exists reihe_id;

drop trigger if exists venues_set_updated_at on venues;

alter table venues drop column if exists kapazitaet;
alter table venues drop column if exists residents;
alter table venues drop column if exists preisniveau;
alter table venues drop column if exists barrierefreiheit;
alter table venues drop column if exists kamerapolitik;
alter table venues drop column if exists created_at;
alter table venues drop column if exists updated_at;

drop table if exists venues_internal;
drop table if exists ausgeschieden;
drop table if exists people;
drop table if exists reihen;

commit;
