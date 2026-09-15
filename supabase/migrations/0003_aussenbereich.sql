-- Kaverne — A-13: Außenbereich als eigenes Praxisfeld (siehe docs/KAVERNE.md,
-- Abschnitt "Datenfelder"). Unabhängig von Raucherbereich.

alter table venues add column if not exists aussenbereich text;
