import { renderShareImage, shareImageSize, shareImageType } from "@/lib/share-image";

export const alt = "Clubs – Kaverne";
export const size = shareImageSize;
export const contentType = shareImageType;

export default function Image() {
  return renderShareImage("Clubs");
}
