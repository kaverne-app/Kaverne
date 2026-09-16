import { notFound } from "next/navigation";
import { getVenue } from "@/lib/venues";
import { buildDetailBlocks } from "@/lib/venue-view";
import ShareButton from "@/components/ShareButton";
import ReportButton from "@/components/ReportButton";
import VenueDetailMap from "@/components/VenueDetailMap";
import BackLink from "@/components/BackLink";

export const dynamic = "force-dynamic";

const PREISNIVEAU_STUFEN = 3;

export default async function VenuePage({
  params,
}: {
  params: { id: string };
}) {
  const venue = await getVenue(params.id);
  if (!venue) notFound();

  const blocks = buildDetailBlocks(venue);
  const subtitle = [venue.typ, venue.stadt].filter(Boolean).join(" · ");
  const hasCoordinates = venue.lat != null && venue.lon != null;
  const chips = [
    ...(venue.genres ?? []),
    ...(venue.status === "unregelmäßig" ? ["Unregelmäßig"] : []),
  ];

  return (
    <main className="venue-detail">
      <BackLink href="/clubs">Zur Liste</BackLink>

      <div className="venue-head">
        <div>
          <h1>{venue.name}</h1>
          {subtitle && <p className="venue-subtitle">{subtitle}</p>}
        </div>
        <ShareButton name={venue.name} />
      </div>

      {chips.length > 0 && (
        <div className="chip-row">
          {chips.map((chip) => (
            <span className="chip" key={chip}>
              {chip}
            </span>
          ))}
        </div>
      )}

      {venue.kurzbeschreibung && <p className="venue-lead">{venue.kurzbeschreibung}</p>}

      {blocks.map((block) => (
        <section key={block.title} className="detail-block">
          <h2>{block.title}</h2>
          <dl>
            {block.fields.map((f) => (
              <div className="detail-field" key={f.label}>
                <dt>{f.label}</dt>
                <dd>
                  {f.kind === "text" ? (
                    f.label === "Preisniveau" ? (
                      <Preisniveau wert={f.value} />
                    ) : (
                      f.value
                    )
                  ) : (
                    <span className="link-list">
                      {f.links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {linkLabel(link.typ)}
                        </a>
                      ))}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          {/* Koordinaten stammen aus der Adresse (siehe Import) — wo sie
              gesetzt sind, ist auch der Block "Wann & wo" vorhanden. */}
          {block.title === "Wann & wo" && hasCoordinates && (
            <div className="venue-map-excerpt">
              <VenueDetailMap name={venue.name} lat={venue.lat!} lon={venue.lon!} />
              <a
                className="map-link"
                href={`geo:${venue.lat},${venue.lon}?q=${venue.lat},${venue.lon}(${encodeURIComponent(venue.name)})`}
              >
                In Karten-App öffnen
              </a>
            </div>
          )}
        </section>
      ))}

      <ReportButton id={venue.id} name={venue.name} />
    </main>
  );
}

function Preisniveau({ wert }: { wert: string }) {
  const stufe = (wert.match(/€/g) ?? []).length;
  return (
    <span className="price-level">
      {Array.from({ length: PREISNIVEAU_STUFEN }).map((_, i) => (
        <span
          key={i}
          className={i < stufe ? "price-level-filled" : "price-level-empty"}
        >
          €
        </span>
      ))}
    </span>
  );
}

function linkLabel(typ: string): string {
  switch (typ) {
    case "website":
      return "Website";
    case "instagram":
      return "Instagram";
    case "facebook":
      return "Facebook";
    default:
      return typ;
  }
}
