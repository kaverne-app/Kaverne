import { NextResponse } from "next/server";
import { Resend } from "resend";

// Feste Obergrenze für den Freitext — auch serverseitig geprüft, nicht nur
// über das maxLength-Attribut im Formular.
const MAX_TEXT_LENGTH = 500;

// Einfache Begrenzung ohne dauerhafte Speicherung: nur ein Zähler pro
// Absender-IP, der ausschließlich im Arbeitsspeicher dieser Funktion lebt.
// Die IP wird an keiner Stelle geloggt, in eine Datenbank geschrieben oder
// sonst wie dauerhaft festgehalten — sie dient einzig als kurzlebiger
// Schlüssel, um zu viele Meldungen kurz hintereinander abzuweisen.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const recentSubmissions = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (recentSubmissions.get(key) ?? []).filter(
    (t) => now - t < WINDOW_MS,
  );
  timestamps.push(now);
  recentSubmissions.set(key, timestamps);

  if (recentSubmissions.size > 1000) {
    for (const [k, v] of recentSubmissions) {
      if (v.every((t) => now - t >= WINDOW_MS)) recentSubmissions.delete(k);
    }
  }

  return timestamps.length > MAX_PER_WINDOW;
}

interface ReportPayload {
  venueId?: unknown;
  venueName?: unknown;
  betroffenerPunkt?: unknown;
  text?: unknown;
  email?: unknown;
}

export async function POST(request: Request) {
  const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(key)) {
    return NextResponse.json(
      { ok: false, error: "Zu viele Meldungen. Bitte später erneut versuchen." },
      { status: 429 },
    );
  }

  let payload: ReportPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }

  const venueId = typeof payload.venueId === "string" ? payload.venueId : "";
  const venueName = typeof payload.venueName === "string" ? payload.venueName : "";
  const betroffenerPunkt =
    typeof payload.betroffenerPunkt === "string" ? payload.betroffenerPunkt : "";
  const text = typeof payload.text === "string" ? payload.text.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";

  if (!venueId || !venueName || !betroffenerPunkt || !text) {
    return NextResponse.json({ ok: false, error: "Angaben unvollständig." }, { status: 400 });
  }
  if (text.length > MAX_TEXT_LENGTH) {
    return NextResponse.json(
      { ok: false, error: `Text ist länger als ${MAX_TEXT_LENGTH} Zeichen.` },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.REPORT_TO_EMAIL;
  if (!apiKey || !toEmail) {
    console.error("RESEND_API_KEY oder REPORT_TO_EMAIL fehlt.");
    return NextResponse.json(
      { ok: false, error: "Melden ist gerade nicht möglich." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "Kaverne <onboarding@resend.dev>";

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email || undefined,
      subject: `Meldung: ${venueName}`,
      text: [
        `Laden: ${venueName} (${venueId})`,
        `Betroffener Punkt: ${betroffenerPunkt}`,
        email ? `Antwortadresse: ${email}` : "Antwortadresse: keine angegeben",
        "",
        text,
      ].join("\n"),
    });
    if (error) throw error;
  } catch (err) {
    console.error("Meldung konnte nicht verschickt werden:", err);
    return NextResponse.json(
      { ok: false, error: "Meldung konnte nicht verschickt werden." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
