-- Kaverne — A-17: Spalte "reihen" entfernt (siehe docs/KAVERNE.md,
-- Abschnitt "Aufnahme" — Floors/Reihen stehen jetzt im Feld "floors").
-- Von Tim in Klartext bestätigt (6 Läden hatten dort Daten, siehe
-- docs/OFFEN.md-Historie bzw. den Pull Request).

alter table venues drop column if exists reihen;
