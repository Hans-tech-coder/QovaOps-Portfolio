import { devOgAlt, ogSize, renderOgImage } from "@/components/seo/og-image";

// Dev card: "Hans Obena / Full-Stack Web Developer".
export const alt = devOgAlt;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("dev");
}
