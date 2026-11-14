// Developer site structured data (DEV_FIRST_PLAN.md §4 SEO): Person.
// Only facts already shown on the site. No ratings, reviews, address or client claims.

import { site } from "@/content/site";
import { devMeta, devProfile } from "./profile";

const { url, contact, socials, toolGroups, experience } = devProfile;

/** The VA site's ProfessionalService.founder points to this same @id (content/site.ts). */
export const devPersonId = site.personId;

export const devStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": devPersonId,
      name: site.owner,
      jobTitle: devMeta.jobTitle,
      description: devMeta.description,
      url,
      email: `mailto:${contact.email}`,
      image: `${url}/brand/hans-photo.png`,
      alumniOf: experience.education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.org })),
      knowsAbout: toolGroups.filter((g) => g.label !== "Tools").flatMap((g) => g.tools),
      sameAs: socials.map((s) => s.href),
    },
  ],
};
