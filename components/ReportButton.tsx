"use client";

import { useState, type FormEvent } from "react";

// Passt zur Blockreihenfolge der Detailseite, plus einer Sammeloption —
// so kann der Nutzer ohne Fachbegriffe angeben, wo etwas nicht stimmt.
const BETROFFENE_PUNKTE = [
  "Name, Typ oder Stadt",
  "Wann & wo (Öffnungstage, Adresse)",
  "Programm & Kanäle (Reihen, Links)",
  "Preise & Größe",
  "Vor Ort (Kartenzahlung, Garderobe, Raucherbereich, Haltestelle, Barrierefreiheit, Kamerapolitik)",
  "Etwas anderes",
];

const MAX_TEXT_LENGTH = 500;
// Verhindert versehentliches Mehrfach-Absenden vom selben Gerät, ganz ohne
// serverseitige Speicherung — der Zeitstempel liegt nur im Browser.
const COOLDOWN_MS = 60_000;
const COOLDOWN_KEY = "kaverne:last-report-at";

type Status = "idle" | "sending" | "sent" | "error";

export default function ReportButton({ id, name }: { id: string; name: string }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [punkt, setPunkt] = useState(BETROFFENE_PUNKTE[0]);
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function remainingCooldownMs(): number {
    try {
      const last = Number(localStorage.getItem(COOLDOWN_KEY) ?? "0");
      return Math.max(0, COOLDOWN_MS - (Date.now() - last));
    } catch {
      return 0;
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!text.trim()) return;

    const waitMs = remainingCooldownMs();
    if (waitMs > 0) {
      setStatus("error");
      setErrorMessage(
        `Du hast gerade erst eine Meldung geschickt. Bitte noch ${Math.ceil(waitMs / 1000)} Sekunden warten.`,
      );
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          venueId: id,
          venueName: name,
          betroffenerPunkt: punkt,
          text: text.trim(),
          email: email.trim(),
        }),
      });
      const data = (await response.json()) as { ok: boolean; error?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Meldung konnte nicht verschickt werden.");
      }
      try {
        localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
      } catch {
        // Zwischenablage/Storage nicht verfügbar — Meldung ist trotzdem raus.
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error && err.message
          ? err.message
          : "Meldung konnte nicht verschickt werden. Bitte später erneut versuchen.",
      );
    }
  }

  if (status === "sent") {
    return <p className="report-confirmation">Danke, die Meldung ist raus.</p>;
  }

  if (!open) {
    return (
      <button type="button" className="report-toggle" onClick={() => setOpen(true)}>
        Falsche oder veraltete Angabe melden
      </button>
    );
  }

  return (
    <form className="report-form" onSubmit={handleSubmit}>
      <label>
        <span className="field-label">Betroffener Punkt</span>
        <select value={punkt} onChange={(e) => setPunkt(e.target.value)}>
          {BETROFFENE_PUNKTE.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span className="field-label">
          Was ist falsch oder veraltet? (max. {MAX_TEXT_LENGTH} Zeichen)
        </span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={MAX_TEXT_LENGTH}
          rows={4}
          required
        />
      </label>
      <label>
        <span className="field-label">E-Mail für Rückfragen (optional)</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      {status === "error" && <p className="report-error">{errorMessage}</p>}
      <div className="report-form-actions">
        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Wird gesendet …" : "Melden"}
        </button>
        <button type="button" onClick={() => setOpen(false)} disabled={status === "sending"}>
          Abbrechen
        </button>
      </div>
    </form>
  );
}
