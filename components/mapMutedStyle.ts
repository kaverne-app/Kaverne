import type * as maplibregl from "maplibre-gl";

// Dämpft den freien "liberty"-Kartenstil auf die vier vorgegebenen Farben,
// ohne einen eigenen Stil hosten zu müssen: nach dem Laden werden die
// vorhandenen Ebenen anhand ihres Typs und Namens eingefärbt oder verborgen
// (Hausnummern, Orts-Symbole).
const LAND = "#131315";
const WASSER = "#0A0A0C";
const STRASSEN = "#1F1F23";
const BESCHRIFTUNG = "#6E6E73";

export function applyMutedMapStyle(map: maplibregl.Map): void {
  const layers = map.getStyle()?.layers ?? [];

  for (const layer of layers) {
    const id = layer.id;

    if (/housenumber/i.test(id)) {
      map.setLayoutProperty(id, "visibility", "none");
      continue;
    }

    if (layer.type === "background") {
      map.setPaintProperty(id, "background-color", LAND);
    } else if (layer.type === "fill") {
      const istWasser = /water/i.test(id);
      map.setPaintProperty(id, "fill-color", istWasser ? WASSER : LAND);
    } else if (layer.type === "line") {
      const istWasser = /water|river|stream|canal/i.test(id);
      map.setPaintProperty(id, "line-color", istWasser ? WASSER : STRASSEN);
    } else if (layer.type === "symbol") {
      const layout = layer.layout as Record<string, unknown> | undefined;
      if (layout?.["icon-image"]) {
        map.setLayoutProperty(id, "visibility", "none");
      } else if (layout?.["text-field"]) {
        map.setPaintProperty(id, "text-color", BESCHRIFTUNG);
        map.setPaintProperty(id, "text-halo-color", LAND);
        map.setPaintProperty(id, "text-halo-width", 1);
      }
    }
  }
}
