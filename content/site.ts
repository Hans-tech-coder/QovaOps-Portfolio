// Shared data for both sites (QovaOps VA site + developer portfolio, DEV_FIRST_PLAN.md).
// Site-specific copy lives in content/va/ (and content/dev/ from Phase C).
// Values come from brand/BRAND_GUIDE.md §1, §2 and §7. Do not invent numbers or claims.

export type SocialLabel = "Facebook" | "Instagram" | "YouTube" | "LinkedIn";
export type SocialLink = { label: SocialLabel; handle: string; href: string };

export const site = {
  owner: "Hans Obena",
  triqovaUrl: "https://triqova.com",
  bookingUrl: "https://bit.ly/3WlL3yg",
} as const;

/** Every social profile; each site picks and orders the ones it shows. */
export const socialLinks = {
  facebook: { label: "Facebook", handle: "@qovaops", href: "https://facebook.com/qovaops" },
  instagram: { label: "Instagram", handle: "@qovaops", href: "https://instagram.com/qovaops" },
  youtube: { label: "YouTube", handle: "@QovaOps", href: "https://youtube.com/@QovaOps" },
  linkedin: { label: "LinkedIn", handle: "in/hans-obena", href: "https://linkedin.com/in/hans-obena" },
} as const satisfies Record<string, SocialLink>;
