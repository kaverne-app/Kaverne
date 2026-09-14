import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import { getPosts, hasAnyPost } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function MagazinPage() {
  const [posts, showMagazin] = await Promise.all([getPosts(), hasAnyPost()]);

  return (
    <>
      <main className="venue-list">
        {posts.length === 0 ? (
          <p className="empty-state">Noch keine Beiträge.</p>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <Link href={`/magazin/${post.slug}`} className="venue-row">
                  <span className="venue-name">{post.titel}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer hasBottomNav />
      <BottomNav active="magazin" showMagazin={showMagazin} />
    </>
  );
}
