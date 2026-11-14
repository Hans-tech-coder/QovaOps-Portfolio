// VA site structured data (PLAN.md §7): Person + ProfessionalService.
// Only facts already shown on the site. No ratings, reviews, prices, address or client claims.

import { site } from "@/content/site";
import { vaMeta, vaProfile } from "./profile";
import { services } from "./services";

const { url, brand, contact, socials, about, toolGroups, experience } = vaProfile;
const personId = `${url}/#person`;
const serviceId = `${url}/#service`;

export const vaStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: site.owner,
      jobTitle: "General Virtual Assistant",
      description: "Virtual assistant with advanced technical skills.",
      url,
      email: `mailto:${contact.email}`,
      image: `${url}/brand/hans-photo.png`,
      worksFor: { "@id": serviceId },
      alumniOf: experience.education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.org })),
      knowsAbout: toolGroups.flatMap((g) => g.tools),
      sameAs: socials.map((s) => s.href),
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
      founder: { "@id": personId },
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
