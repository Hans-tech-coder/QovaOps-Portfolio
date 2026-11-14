import { manifestResponse } from "@/components/seo/manifest";
import { vaMeta, vaProfile } from "@/content/va/profile";

// Served at qovaops.triqova.com/manifest.webmanifest via the host rewrite (prerendered).
export function GET() {
  const { brand } = vaProfile;
  return manifestResponse({
    site: "va",
    name: `${brand.name} ${brand.endorsement}`,
    shortName: brand.name,
    description: vaMeta.description,
  });
}
