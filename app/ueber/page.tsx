import Footer from "@/components/Footer";
import BackLink from "@/components/BackLink";

export default function UeberPage() {
  return (
    <>
      <main className="venue-detail">
        <BackLink href="/">Zur Startseite</BackLink>
        <h1>Kaverne.</h1>

        <p>Clubs und Orte für elektronische Musik im Südwesten.</p>
      </main>
      <Footer />
    </>
  );
}
