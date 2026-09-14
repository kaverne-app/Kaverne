import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/posts";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const reference = post.venue
    ? { label: "Laden", href: `/venues/${post.venue.id}`, text: post.venue.name }
    : post.person
      ? { label: "Person", href: null, text: post.person.name }
      : post.reihe
        ? { label: "Reihe", href: null, text: post.reihe.name }
        : null;

  return (
    <>
      <main className="venue-detail">
        <Link href="/magazin" className="back-link">
          ← Zum Magazin
        </Link>
        <h1>{post.titel}</h1>
        {post.datum && <p className="venue-subtitle">{formatDate(post.datum)}</p>}
        {reference && (
          <p className="venue-subtitle">
            {reference.label}:{" "}
            {reference.href ? (
              <Link href={reference.href}>{reference.text}</Link>
            ) : (
              reference.text
            )}
          </p>
        )}
        {post.text && <div className="post-text">{post.text}</div>}
      </main>
      <Footer />
    </>
  );
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(new Date(iso));
}
