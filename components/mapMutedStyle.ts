import type { LayerSpecification, StyleSpecification } from "maplibre-gl";

// OpenFreeMap: freier, unbegrenzter Kartenstil ohne API-Schlüssel, kein
// Google-Dienst beteiligt. Übersichts- und Detailkarte laden und dämpfen
// denselben Stil über denselben Weg (loadMutedStyle) — keine Sonderwege.
export const STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";

// Dämpft den freien "liberty"-Kartenstil auf die vier vorgegebenen Farben,
// ohne einen eigenen Stil hosten zu müssen. Jede Ebene wird anhand ihres
// Typs eingefärbt oder verborgen, bevor der Stil an die Karte übergeben
// wird — kein Aufblitzen des hellen Originals beim Laden.
const LAND = "#18181b";
const WASSER = "#0a0a0c";
const STRASSEN = "#46464c";
const BESCHRIFTUNG = "#9b9b9f";

const WASSER_MUSTER = /water|ocean|sea|lake|reservoir|river|stream|canal/i;

export function buildMutedStyle(style: StyleSpecification): StyleSpecification {
  return { ...style, layers: (style.layers ?? []).map(muteLayer) };
}

let mutedStylePromise: Promise<StyleSpecification> | null = null;

// Wird einmal pro Sitzung geladen und für jede weitere Karte wiederverwendet
// — ein Wechsel zwischen Liste und Karte löst keinen erneuten Netzwerkruf aus.
export function loadMutedStyle(): Promise<StyleSpecification> {
  if (!mutedStylePromise) {
    mutedStylePromise = fetch(STYLE_URL)
      .then((res) => res.json())
      .then((raw: StyleSpecification) => buildMutedStyle(raw))
      .catch((error) => {
        // Nicht dauerhaft merken — ein späterer Kartenaufruf (z. B. nach
        // Netzwerkproblemen) darf es erneut versuchen.
        mutedStylePromise = null;
        throw error;
      });
  }
  return mutedStylePromise;
}

function muteLayer(layer: LayerSpecification): LayerSpecification {
  if (/housenumber/i.test(layer.id)) {
    return hide(layer);
  }

  switch (layer.type) {
    case "background":
      return withPaint(layer, { "background-color": LAND });
    case "fill": {
      const farbe = WASSER_MUSTER.test(layer.id) ? WASSER : LAND;
      // fill-color füllt die Fläche, fill-outline-color den Rand — beide
      // müssen gesetzt werden, sonst bleiben Umrisslinien (z. B. von
      // Parks/Schutzgebieten) in der Originalfarbe sichtbar.
      return withPaint(layer, { "fill-color": farbe, "fill-outline-color": farbe });
    }
    case "fill-extrusion":
      // 3D-Gebäude — dieselbe Fläche wie flache Gebäude, keine eigene Höhe.
      return withPaint(layer, { "fill-extrusion-color": LAND });
    case "line": {
      const farbe = WASSER_MUSTER.test(layer.id) ? WASSER : STRASSEN;
      return withPaint(layer, { "line-color": farbe });
    }
    case "circle":
      return withPaint(layer, { "circle-color": LAND, "circle-stroke-color": STRASSEN });
    case "raster":
      // Kachelbild, lässt sich nicht umfärben — ausblenden statt falsch
      // dämpfen (der Stil ist ohnehin rein vektorbasiert).
      return hide(layer);
    case "symbol":
      return muteSymbolLayer(layer);
    default:
      return layer;
  }
}

function muteSymbolLayer(layer: LayerSpecification): LayerSpecification {
  const layout = (layer.layout ?? {}) as Record<string, unknown>;
  const hatSymbol = Boolean(layout["icon-image"]);
  const hatBeschriftung = Boolean(layout["text-field"]);

  if (hatSymbol && !hatBeschriftung) {
    // Reines Symbol ohne Beschriftung (z. B. ein Amt/Geschäft) — das sind
    // die "fremden Orts-Symbole", die verborgen werden sollen.
    return hide(layer);
  }

  const paint: Record<string, unknown> = { ...layer.paint };
  if (hatSymbol) {
    // Ortsnamen hängen in diesem Stil oft am selben Symbol wie ein kleiner
    // Punkt — nur den Punkt ausblenden, die Beschriftung bleibt.
    paint["icon-opacity"] = 0;
  }
  if (hatBeschriftung) {
    paint["text-color"] = BESCHRIFTUNG;
    paint["text-halo-color"] = LAND;
    paint["text-halo-width"] = 1;
  }
  return { ...layer, paint } as LayerSpecification;
}

function withPaint(
  layer: LayerSpecification,
  extra: Record<string, unknown>,
): LayerSpecification {
  return { ...layer, paint: { ...layer.paint, ...extra } } as LayerSpecification;
}

function hide(layer: LayerSpecification): LayerSpecification {
  return { ...layer, layout: { ...layer.layout, visibility: "none" } } as LayerSpecification;
}
