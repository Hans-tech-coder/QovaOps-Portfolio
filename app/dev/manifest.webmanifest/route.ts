import { manifestResponse } from "@/components/seo/manifest";
import { devMeta, devProfile } from "@/content/dev/profile";

// Served at hansobena.triqova.com/manifest.webmanifest via the host rewrite (prerendered).
export function GET() {
  return manifestResponse({
    name: `${devProfile.brand.name} — ${devMeta.jobTitle}`,
    shortName: devProfile.brand.name,
    description: devMeta.description,
  });
}
