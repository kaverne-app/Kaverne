-- Kaverne — A-17: Floors als eigenes Praxisfeld (siehe docs/KAVERNE.md,
-- Abschnitt "Datenfelder"). Ersetzt die bisherige Erwähnung von Floors im
-- Feld "reihen".

alter table venues add column if not exists floors text;
