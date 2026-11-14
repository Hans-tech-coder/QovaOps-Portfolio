import { renderOgImage } from "@/components/seo/og-image";

// Dev card ("Hans Obena / Full-Stack Web Developer"), prerendered at build.
// A route handler, not the opengraph-image.tsx file convention: that one makes Next write
// og:image as /dev/opengraph-image, which leaks the internal path. This is served at
// hansobena.triqova.com/opengraph-image via the host rewrite; metadata.ts links it.
export function GET() {
  return renderOgImage("dev");
}
