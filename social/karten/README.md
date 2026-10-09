# Instagram-Karten (nicht Teil der Website)

Grundkarte: Natural Earth, „Admin 1 – States, Provinces“ 1:10m, gemeinfrei (Public Domain).
Quelle: https://www.naturalearthdata.com – Datei bezogen über https://github.com/nvkelso/natural-earth-vector (geojson/ne_10m_admin_1_states_provinces.geojson), 2026-10-09.
Schrift: IBM Plex Sans Regular, SIL Open Font License 1.1 (Lizenz in `_grundlage/`).
Projektion für alle Regionen gleich: Lambert Conformal Conic (Mitte 9,5° O / 50° N, Parallelen 48,5° / 51,5°).

Neu erzeugen: `python3 -I erzeuge_karte.py <geojson> <region> <region>/labels.json`, danach `node render_png.cjs <region>`.
`_grundlage/laeden.json` ist ein Auszug (Name, Stadt, Koordinaten) aus Supabase, Stand 2026-10-09.
