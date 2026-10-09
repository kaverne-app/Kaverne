#!/usr/bin/env python3
"""Erzeugt titelkarte.svg, regionskarte.svg, positionen.txt, liste.txt fuer eine Region.
Aufruf: python3 -I erzeuge_karte.py <ne_10m_admin_1_states_provinces.geojson> <region-kurz> <labelkonfig.json>
Grundkarte: Natural Earth Admin-1 (gemeinfrei). Gleiche Projektion fuer alle Regionen.
"""
import json, math, sys, base64, pathlib

HERE = pathlib.Path(__file__).resolve().parent
ne_path, region, cfg_path = sys.argv[1:4]
cfg = json.load(open(cfg_path))
OUT = HERE / region
OUT.mkdir(exist_ok=True)
BASE = HERE / "_grundlage"

LINE, DOT, TEXT = "#9b9b9f", "#ff9f1c", "#f2f2f0"
FOUR = ["Hessen", "Rheinland-Pfalz", "Saarland", "Baden-Württemberg"]

# Lambert Conformal Conic (Kugel), feste Parameter fuer alle Regionen
LON0, LAT0, P1, P2 = math.radians(9.5), math.radians(50.0), math.radians(48.5), math.radians(51.5)
n = math.log(math.cos(P1) / math.cos(P2)) / math.log(math.tan(math.pi/4 + P2/2) / math.tan(math.pi/4 + P1/2))
F = math.cos(P1) * math.tan(math.pi/4 + P1/2) ** n / n
R0 = F / math.tan(math.pi/4 + LAT0/2) ** n
def proj(lon, lat):  # -> km, y nach oben
    rho = F / math.tan(math.pi/4 + math.radians(lat)/2) ** n
    th = n * (math.radians(lon) - LON0)
    return 6371.0 * rho * math.sin(th), 6371.0 * (R0 - rho * math.cos(th))

feats = [f for f in json.load(open(ne_path))["features"] if f["properties"].get("admin") == "Germany"]
def rings(f):
    g = f["geometry"]
    polys = g["coordinates"] if g["type"] == "MultiPolygon" else [g["coordinates"]]
    for p in polys:
        for r in p:
            yield [proj(x, y) for x, y in r]

venues = json.load(open(BASE / "laeden.json"))
for v in venues:
    v["xy"] = proj(v["lon"], v["lat"])
reg = [v for v in venues if v["name"] in cfg["laeden"]]
other = [v for v in venues if v["name"] not in cfg["laeden"]]
missing = [n_ for n_ in cfg["laeden"] if n_ not in {v["name"] for v in reg}]
assert not missing, missing

font_b64 = base64.b64encode((BASE / "IBMPlexSans-Regular.woff2").read_bytes()).decode()
STYLE = ("<style>@font-face{font-family:'IBM Plex Sans';font-weight:400;"
         f"src:url(data:font/woff2;base64,{font_b64}) format('woff2');}}"
         "text{font-family:'IBM Plex Sans',sans-serif;}</style>")

def path_d(rs, tf, keep=None):
    """Polylinien-Pfad. keep(px,py)->bool prunt Punkte weit ausserhalb (offene Linien, keine Kanten am Rand)."""
    out = []
    for r in rs:
        pts = [tf(x, y) for x, y in r]
        if keep:
            ins = [keep(*p) for p in pts]
            run = []
            m = len(pts)
            for i in range(m):
                if ins[i] or ins[i-1] or ins[(i+1) % m]:
                    run.append(pts[i])
                else:
                    if len(run) > 1: out.append(run)
                    run = []
            if len(run) > 1: out.append(run)
        else:
            out.append(pts)
    return "".join("M" + "L".join(f"{x:.1f} {y:.1f}" for x, y in run) for run in out)

# ---------- Titelkarte ----------
four_rings = [r for f in feats if f["properties"]["name"] in FOUR for r in rings(f)]
allx = [p[0] for r in four_rings for p in r]; ally = [p[1] for r in four_rings for p in r]
x0, x1, y0, y1 = min(allx), max(allx), min(ally), max(ally)
PAD = 20
H = 1000  # Hoehe in px; Breite folgt aus dem Seitenverhaeltnis der vier Laender
s = (H - 2*PAD) / (y1 - y0)
W = round((x1 - x0) * s + 2*PAD)
tf1 = lambda x, y: ((x - x0) * s + PAD, (y1 - y) * s + PAD)
d = path_d(four_rings, tf1)
dots = "".join(f'<circle cx="{tf1(*v["xy"])[0]:.1f}" cy="{tf1(*v["xy"])[1]:.1f}" r="3.5" fill="{LINE}"/>' for v in other)
dots += "".join(f'<circle cx="{tf1(*v["xy"])[0]:.1f}" cy="{tf1(*v["xy"])[1]:.1f}" r="8" fill="{DOT}"/>' for v in reg)
(OUT / "titelkarte.svg").write_text(
    f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">'
    f'<path d="{d}" fill="none" stroke="{LINE}" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>{dots}</svg>\n')

# ---------- Regionskarte 1080x1440 ----------
RW, RH = 1080, 1440
M = cfg["rand_px"]
rx = [v["xy"][0] for v in reg]; ry = [v["xy"][1] for v in reg]
cx, cy = (min(rx) + max(rx)) / 2, (min(ry) + max(ry)) / 2
s2 = (RW - 2*M) / (max(rx) - min(rx))
tf2 = lambda x, y: ((x - cx) * s2 + RW/2, RH/2 - (y - cy) * s2)
EXT = 300
keep = lambda px, py: -EXT <= px <= RW + EXT and -EXT <= py <= RH + EXT
all_rings = [r for f in feats for r in rings(f)]
d2 = path_d(all_rings, tf2, keep)
pos = {v["name"]: tf2(*v["xy"]) for v in reg}
dots2 = "".join(f'<circle cx="{pos[v["name"]][0]:.1f}" cy="{pos[v["name"]][1]:.1f}" r="{cfg["punkt_r"]}" fill="{DOT}"/>' for v in reg)
labels = ""
for city, (anchor, dx, dy) in cfg["staedte"].items():
    pts = [pos[v["name"]] for v in reg if v["stadt"].startswith(city)]
    lx = sum(p[0] for p in pts)/len(pts) + dx; ly = sum(p[1] for p in pts)/len(pts) + dy
    labels += f'<text x="{lx:.1f}" y="{ly:.1f}" text-anchor="{anchor}" font-size="{cfg["schrift_px"]}" fill="{TEXT}">{city}</text>'
(OUT / "regionskarte.svg").write_text(
    f'<svg xmlns="http://www.w3.org/2000/svg" width="{RW}" height="{RH}" viewBox="0 0 {RW} {RH}">{STYLE}'
    f'<path d="{d2}" fill="none" stroke="{LINE}" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>{dots2}{labels}</svg>\n')

# ---------- Textdateien ----------
lines = [f"Pixelposition auf regionskarte.svg / .png ({RW}x{RH}, Ursprung links oben, x nach rechts, y nach unten)", ""]
for v in sorted(reg, key=lambda v: v["name"].casefold()):
    px, py = pos[v["name"]]
    lines.append(f'{v["name"]}: x={px:.0f}, y={py:.0f}')
(OUT / "positionen.txt").write_text("\n".join(lines) + "\n")
(OUT / "liste.txt").write_text("".join(f'{v["name"]} — {v["stadt"]}\n' for v in sorted(reg, key=lambda v: v["name"].casefold())))
print("Titelkarte", W, H, "| Massstab Region px/km", round(s2, 2))
