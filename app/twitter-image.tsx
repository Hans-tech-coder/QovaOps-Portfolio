import { ogAlt, ogSize, renderOgImage } from "@/components/seo/og-image";

// Same card as opengraph-image.tsx.
export const alt = ogAlt;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage();
}
