import { inflateSync } from "node:zlib";

// Misst Textbreiten aus einer WOFF-Schriftdatei (Zeichenbreiten ohne
// Kerning), damit Vorschaubilder Namen selbst umbrechen können. Reine
// Rechenlogik, kein Seiteneffekt.

export interface Metrics {
  unitsPerEm: number;
  advance(char: string): number;
}

function tables(woff: Buffer): Map<string, Buffer> {
  const out = new Map<string, Buffer>();
  const count = woff.readUInt16BE(12);
  for (let i = 0; i < count; i++) {
    const o = 44 + i * 20;
    const tag = woff.toString("latin1", o, o + 4);
    const offset = woff.readUInt32BE(o + 4);
    const compLength = woff.readUInt32BE(o + 8);
    const origLength = woff.readUInt32BE(o + 12);
    const raw = woff.subarray(offset, offset + compLength);
    out.set(tag, compLength < origLength ? inflateSync(raw) : raw);
  }
  return out;
}

export function loadMetrics(woff: Buffer): Metrics {
  const t = tables(woff);
  const unitsPerEm = t.get("head")!.readUInt16BE(18);
  const hmtx = t.get("hmtx")!;
  const numH = t.get("hhea")!.readUInt16BE(34);
  const cmap = t.get("cmap")!;

  // cmap-Teiltabelle Format 4 (Unicode BMP) suchen
  let sub = -1;
  const n = cmap.readUInt16BE(2);
  for (let i = 0; i < n; i++) {
    const platform = cmap.readUInt16BE(4 + i * 8);
    const offset = cmap.readUInt32BE(8 + i * 8);
    if (platform === 0 || platform === 3) {
      if (cmap.readUInt16BE(offset) === 4) sub = offset;
    }
  }
  if (sub < 0) throw new Error("cmap Format 4 fehlt");
  const segX2 = cmap.readUInt16BE(sub + 6);
  const endO = sub + 14;
  const startO = endO + segX2 + 2;
  const deltaO = startO + segX2;
  const rangeO = deltaO + segX2;

  function glyph(code: number): number {
    for (let s = 0; s < segX2; s += 2) {
      if (code > cmap.readUInt16BE(endO + s)) continue;
      if (code < cmap.readUInt16BE(startO + s)) return 0;
      const range = cmap.readUInt16BE(rangeO + s);
      const delta = cmap.readInt16BE(deltaO + s);
      if (range === 0) return (code + delta) & 0xffff;
      const g = cmap.readUInt16BE(rangeO + s + range + (code - cmap.readUInt16BE(startO + s)) * 2);
      return g === 0 ? 0 : (g + delta) & 0xffff;
    }
    return 0;
  }

  return {
    unitsPerEm,
    advance(char) {
      const g = glyph(char.codePointAt(0)!);
      return hmtx.readUInt16BE(Math.min(g, numH - 1) * 4);
    },
  };
}

export function textWidth(m: Metrics, text: string, fontSize: number): number {
  let w = 0;
  for (const ch of text) w += m.advance(ch);
  return (w / m.unitsPerEm) * fontSize;
}

// Bricht an Leerzeichen (Wörter, die allein zu lang sind, zeichenweise).
// Mehr als maxLines Zeilen: Rest wird mit „…“ gekürzt.
export function wrapLines(
  m: Metrics,
  text: string,
  fontSize: number,
  maxWidth: number,
  maxLines: number,
): string[] {
  const fits = (s: string) => textWidth(m, s, fontSize) <= maxWidth;
  const lines: string[] = [];
  let current = "";
  for (const word of text.split(/\s+/).filter(Boolean)) {
    const candidate = current ? `${current} ${word}` : word;
    if (fits(candidate)) {
      current = candidate;
      continue;
    }
    if (current) lines.push(current);
    current = "";
    let rest = word;
    while (!fits(rest)) {
      let k = rest.length - 1;
      while (k > 1 && !fits(rest.slice(0, k))) k--;
      lines.push(rest.slice(0, k));
      rest = rest.slice(k);
    }
    current = rest;
  }
  if (current) lines.push(current);

  if (lines.length <= maxLines) return lines;
  const kept = lines.slice(0, maxLines);
  let last = `${kept[maxLines - 1]}…`;
  while (!fits(last) && last.length > 2) last = `${last.slice(0, -2).trimEnd()}…`;
  kept[maxLines - 1] = last;
  return kept;
}
