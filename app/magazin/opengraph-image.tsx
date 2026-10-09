import { renderShareImage, shareImageSize, shareImageType } from "@/lib/share-image";

export const alt = "Magazin – Kaverne";
export const size = shareImageSize;
export const contentType = shareImageType;

export default function Image() {
  return renderShareImage("Magazin");
}
