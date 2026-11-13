import { education } from "@/content/experience";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { toolGroups } from "@/content/tools";

// Structured data (PLAN.md §7): Person + ProfessionalService.
// Only facts already shown on the site. No ratings, reviews, prices, address or client claims.
const personId = `${site.url}/#person`;
const serviceId = `${site.url}/#service`;

const data = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: site.owner,
      jobTitle: "General Virtual Assistant",
      description: "Virtual assistant with advanced technical skills.",
      url: site.url,
      email: `mailto:${site.contact.email}`,
      image: `${site.url}/brand/hans-photo.png`,
      worksFor: { "@id": serviceId },
      alumniOf: education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.org })),
      knowsAbout: toolGroups.flatMap((g) => g.tools),
      sameAs: site.socials.map((s) => s.href),
    },
    {
      "@type": "ProfessionalService",
      "@id": serviceId,
      name: `${site.name} ${site.endorsement}`,
      alternateName: site.name,
      description: site.description,
      slogan: `${site.tagline.line1} ${site.tagline.line2}`,
      url: site.url,
      email: site.contact.email,
      logo: `${site.url}/icons/icon-512.png`,
      image: `${site.url}/opengraph-image`,
      founder: { "@id": personId },
      sameAs: site.socials.map((s) => s.href),
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

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so the JSON can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
