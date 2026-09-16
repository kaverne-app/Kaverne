import type * as maplibregl from "maplibre-gl";

// Dämpft den freien "liberty"-Kartenstil auf die vier vorgegebenen Farben,
// ohne einen eigenen Stil hosten zu müssen: nach dem Laden werden die
// vorhandenen Ebenen anhand ihres Typs und Namens eingefärbt oder verborgen
// (Hausnummern, Orts-Symbole).
const LAND = "#18181b";
const WASSER = "#0a0a0c";
const STRASSEN = "#46464c";
const BESCHRIFTUNG = "#9b9b9f";

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
      const hatSymbol = Boolean(layout?.["icon-image"]);
      const hatBeschriftung = Boolean(layout?.["text-field"]);

      if (hatSymbol && !hatBeschriftung) {
        // Reines Symbol ohne Beschriftung (z. B. ein Amt/Geschäft) — das
        // sind die "fremden Orts-Symbole", die verborgen werden sollen.
        map.setLayoutProperty(id, "visibility", "none");
        continue;
      }
      if (hatSymbol) {
        // Ortsnamen hängen in diesem Stil oft am selben Symbol wie ein
        // kleiner Punkt — nur den Punkt ausblenden, die Beschriftung bleibt.
        map.setPaintProperty(id, "icon-opacity", 0);
      }
      if (hatBeschriftung) {
        map.setPaintProperty(id, "text-color", BESCHRIFTUNG);
        map.setPaintProperty(id, "text-halo-color", LAND);
        map.setPaintProperty(id, "text-halo-width", 1);
      }
    }
  }
}
