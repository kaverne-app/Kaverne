import Link from "next/link";
import Footer from "@/components/Footer";

export default function UeberPage() {
  return (
    <>
      <main className="venue-detail">
        <Link href="/" className="back-link">
          ← Zur Startseite
        </Link>
        <h1>Kaverne. Der Ort für elektronische Musik im Südwesten.</h1>

        <p>
          Bei uns findet ihr Infos zu Clubs, Locations und allem, was es
          sonst zu wissen gibt, bevor ihr hingeht.
        </p>
        <p>
          Der Südwesten ist nicht Berlin und hat trotzdem eine Reihe von
          Läden, die unterschiedlicher nicht sein könnten – eine Halle im
          Gewerbegebiet, ein Keller unter einer Kneipe, ein Open Air, das es
          nur im Sommer gibt. Man muss sie eben nur kennen. Dafür haben wir
          Kaverne ins Leben gerufen. Dafür, und noch viel mehr.
        </p>
        <p>
          Wir sind erst am Anfang. Eine Kaverne hat mehr als einen Gang, und
          wir fangen gerade erst an zu graben.
        </p>
        <p style={{ marginTop: "48px" }}>Man sieht sich.</p>
      </main>
      <Footer />
    </>
  );
}
