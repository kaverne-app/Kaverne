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

// Meldungen gehen per mailto direkt an Tim — kein eigener Dienst, keine
// Speicherung, kein Blick in Supabase nötig.
const MELDE_ADRESSE = "timey.fischer@gmail.com";

export default function ReportButton({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [punkt, setPunkt] = useState(BETROFFENE_PUNKTE[0]);
  const [text, setText] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!text.trim()) return;

    const subject = `Meldung: ${name}`;
    const body = [
      `Laden: ${name}`,
      `Link: ${window.location.href}`,
      `Betroffener Punkt: ${punkt}`,
      "",
      text.trim(),
    ].join("\n");

    window.location.href = `mailto:${MELDE_ADRESSE}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
  }

  if (sent) {
    return (
      <p className="report-confirmation">
        Danke. Dein Mail-Programm sollte sich mit der Meldung geöffnet haben —
        bitte dort absenden.
      </p>
    );
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
        Betroffener Punkt
        <select value={punkt} onChange={(e) => setPunkt(e.target.value)}>
          {BETROFFENE_PUNKTE.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </label>
      <label>
        Was ist falsch oder veraltet?
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          required
        />
      </label>
      <div className="report-form-actions">
        <button type="submit">Melden</button>
        <button type="button" onClick={() => setOpen(false)}>
          Abbrechen
        </button>
      </div>
    </form>
  );
}
