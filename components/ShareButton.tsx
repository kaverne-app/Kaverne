"use client";

import { useState } from "react";

export default function ShareButton({ name }: { name: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title: name, url });
      } catch {
        // Abgebrochen oder fehlgeschlagen — kein Fehlerzustand nötig.
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Zwischenablage nicht verfügbar — nichts weiter zu tun.
    }
  }

  return (
    <button type="button" className="share-button" onClick={handleShare}>
      {copied ? "Link kopiert" : "Teilen"}
    </button>
  );
}
