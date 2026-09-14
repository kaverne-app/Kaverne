import Link from "next/link";

export default function UeberPage() {
  return (
    <main className="venue-detail">
      <Link href="/" className="back-link">
        ← Zur Startseite
      </Link>
      <h1>Über</h1>
    </main>
  );
}
