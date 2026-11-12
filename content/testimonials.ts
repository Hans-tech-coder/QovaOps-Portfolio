// Testimonials (PLAN.md §5 #7). Only real quotes with the person's permission.
// Empty = the section and its nav item stay hidden. Never invent quotes.

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  linkedin?: string;
};

// TODO(Hans): add real testimonials (quote, name, role, permission to publish)
export const testimonials: Testimonial[] = [];
