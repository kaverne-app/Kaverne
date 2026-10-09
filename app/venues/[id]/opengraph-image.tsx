import { getVenue } from "@/lib/venues";
import { renderShareImage, shareImageSize, shareImageType } from "@/lib/share-image";

export const alt = "Kaverne";
export const size = shareImageSize;
export const contentType = shareImageType;

export default async function Image({ params }: { params: { id: string } }) {
  const venue = await getVenue(params.id);
  if (!venue) return renderShareImage("Kaverne");
  return renderShareImage(venue.name, venue.stadt);
}
