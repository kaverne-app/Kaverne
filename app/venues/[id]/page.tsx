import Link from "next/link";
import { notFound } from "next/navigation";
import { getVenue } from "@/lib/venues";
import { buildDetailBlocks, joinList } from "@/lib/venue-view";

export const dynamic = "force-dynamic";

export default async function VenuePage({
  params,
}: {
  params: { id: string };
}) {
  const venue = await getVenue(params.id);
  if (!venue) notFound();

  const blocks = buildDetailBlocks(venue);
  const subtitle = [venue.typ, venue.stadt, joinList(venue.genres)]
    .filter(Boolean)
    .join(" · ");

  return (
    <main className="venue-detail">
      <Link href="/" className="back-link">
        ← Zur Liste
      </Link>
      <h1>{venue.name}</h1>
      {subtitle && <p className="venue-subtitle">{subtitle}</p>}

      {blocks.map((block) => (
        <section key={block.title} className="detail-block">
          <h2>{block.title}</h2>
          <dl>
            {block.fields.map((f) => (
              <div className="detail-field" key={f.label}>
                <dt>{f.label}</dt>
                <dd>
                  {f.kind === "text" ? (
                    f.value
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
        </section>
      ))}
    </main>
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
