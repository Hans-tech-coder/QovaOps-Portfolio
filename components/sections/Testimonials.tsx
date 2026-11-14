import { SectionCard } from "@/components/layout/SectionCard";
import { Reveal } from "@/components/motion/Reveal";
import type { SectionProps } from "@/content/profile";
import { testimonials } from "@/content/va/testimonials";
import { TestimonialsCarousel } from "./TestimonialsCarousel";

/**
 * Only renders when content/va/testimonials.ts has real quotes (the section is
 * also unpublished in content/va/sections.ts until then). Never invent quotes.
 */
export function Testimonials({ section }: SectionProps) {
  if (testimonials.length === 0) return null;
  return (
    <SectionCard section={section}>
      <Reveal>
        <div data-reveal>
          <TestimonialsCarousel items={testimonials} />
        </div>
      </Reveal>
    </SectionCard>
  );
}
