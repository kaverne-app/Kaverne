import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { loadMetrics, wrapLines } from "./text-wrap";

// Vorschaubild beim Teilen für alle Seiten außer der Startseite — nach der
// Vorlage in design/website/vorschaubild/. Läuft in Next.js selbst (next/og),
// kein zusätzlicher Dienst. Schrift IBM Plex Sans aus lib/og-fonts/, nicht
// von Google geladen.

export const shareImageSize = { width: 1200, height: 630 };
export const shareImageType = "image/png";

// Maße aus der Vorlage: rechtsbündig bei x = 875, große Zeile 80 px mit
// 88 px Zeilenabstand (vier Zeilen vorgesehen), kleine Zeile 32 px.
// Linke Grenze des Textblocks [Annahme]: 80 px Rand.
const RIGHT_EDGE = 875;
const LEFT_EDGE = 80;
const FIRST_BASELINE = 95.84;
const BIG_LINE_HEIGHT = 88;
const BIG_BASELINE_IN_LINE = 74; // Grundlinie in der 88-px-Zeile (Plex Sans, 80 px)

// Dateien liegen im Repository; next.config.mjs sorgt dafür, dass sie mit der
// Seite ausgeliefert werden (outputFileTracingIncludes).
function readAsset(...parts: string[]) {
  return readFile(path.join(process.cwd(), ...parts));
}

async function loadTemplateBackground(): Promise<string> {
  const svg = (
    await readAsset("design", "website", "vorschaubild", "vorschaubild-vorlage.svg")
  ).toString("utf8");
  // Nur Gestaltung der Vorlage behalten: Herkunftsangaben und die beiden
  // Textplatzhalter weglassen; der Text kommt unten mit Umbruch.
  const clean = svg
    .replace(/<metadata>[\s\S]*?<\/metadata>/, "")
    .replace(/<text[\s\S]*?<\/text>/g, "");
  return `data:image/svg+xml;base64,${Buffer.from(clean).toString("base64")}`;
}

export async function renderShareImage(
  gross: string,
  klein?: string | null,
  maxLines = 4,
): Promise<ImageResponse> {
  const [regular, semibold, background] = await Promise.all([
    readAsset("lib", "og-fonts", "ibm-plex-sans-latin-400-normal.woff"),
    readAsset("lib", "og-fonts", "ibm-plex-sans-latin-600-normal.woff"),
    loadTemplateBackground(),
  ]);

  const bigLines = wrapLines(loadMetrics(semibold), gross, 80, RIGHT_EDGE - LEFT_EDGE, maxLines);
  const smallLines = klein ? wrapLines(loadMetrics(regular), klein, 32, RIGHT_EDGE - LEFT_EDGE, 1) : [];

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", position: "relative" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={background} width={1200} height={630} style={{ position: "absolute", top: 0, left: 0 }} alt="" />
        <div
          style={{
            position: "absolute",
            left: LEFT_EDGE,
            top: FIRST_BASELINE - BIG_BASELINE_IN_LINE,
            width: RIGHT_EDGE - LEFT_EDGE,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          {bigLines.map((line, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                fontFamily: "IBM Plex Sans",
                fontWeight: 600,
                fontSize: 80,
                lineHeight: `${BIG_LINE_HEIGHT}px`,
                whiteSpace: "pre",
                color: "#f2f2f0",
              }}
            >
              {line}
            </div>
          ))}
          {smallLines.map((line) => (
            <div
              key={line}
              style={{
                display: "flex",
                marginTop: 8.34,
                fontFamily: "IBM Plex Sans",
                fontWeight: 400,
                fontSize: 32,
                lineHeight: "40px",
                whiteSpace: "pre",
                color: "#9b9b9f",
              }}
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...shareImageSize,
      fonts: [
        { name: "IBM Plex Sans", data: regular, weight: 400, style: "normal" },
        { name: "IBM Plex Sans", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
