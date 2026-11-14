// VA site structured data (PLAN.md §7): ProfessionalService + its founder.
// Only facts already shown on the site. No ratings, reviews, prices, address or client claims.
// The founder is the same Person the dev site defines (site.personId, an absolute
// hansobena.triqova.com URL), so search engines see one person behind both sites. This page
// repeats only shared facts for that node; the personal email stays on the dev site.

import { site, socialLinks } from "@/content/site";
import { vaMeta, vaProfile } from "./profile";
import { services } from "./services";

const { url, brand, contact, socials, about, toolGroups, experience } = vaProfile;
const serviceId = `${url}/#service`;

export const vaStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": site.personId,
      name: site.owner,
      jobTitle: "General Virtual Assistant",
      description: "Virtual assistant with advanced technical skills.",
      url: site.devUrl,
      image: `${url}/brand/hans-photo.png`,
      worksFor: { "@id": serviceId },
      alumniOf: experience.education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.org })),
      knowsAbout: toolGroups.flatMap((g) => g.tools),
      // Personal profiles only (same as the dev site); the QovaOps pages belong to the service.
      sameAs: [socialLinks.linkedin.href, socialLinks.github.href],
    },
    {
      "@type": "ProfessionalService",
      "@id": serviceId,
      name: `${brand.name} ${brand.endorsement}`,
      alternateName: brand.name,
      description: vaMeta.description,
      slogan: `${about.tagline.line1} ${about.tagline.line2}`,
      url,
      email: contact.email,
      logo: `${url}/icons/icon-512.png`,
      image: `${url}/opengraph-image`,
      founder: { "@id": site.personId },
      sameAs: socials.map((s) => s.href),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title, description: s.line },
        })),
      },
    },
  ],
};
