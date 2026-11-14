import { renderOgImage } from "@/components/seo/og-image";

// VA card, prerendered at build. A route handler, not the opengraph-image.tsx file
// convention, so og:image is /opengraph-image (no internal /va path). Served at
// qovaops.triqova.com/opengraph-image via the host rewrite; metadata.ts links it.
export function GET() {
  return renderOgImage("va");
}
