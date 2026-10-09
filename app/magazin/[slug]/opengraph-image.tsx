import { getPostBySlug } from "@/lib/posts";
import { renderShareImage, shareImageSize, shareImageType } from "@/lib/share-image";

export const alt = "Kaverne Magazin";
export const size = shareImageSize;
export const contentType = shareImageType;

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return renderShareImage("Kaverne");
  // Für Beitragstitel gibt die Vorlage keine Zeilenzahl vor: höchstens drei.
  return renderShareImage(post.titel, "Magazin", 3);
}
