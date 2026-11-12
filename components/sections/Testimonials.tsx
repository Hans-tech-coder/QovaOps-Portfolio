import { SectionCard } from "@/components/layout/SectionCard";
import { Reveal } from "@/components/motion/Reveal";
import type { SectionConfig } from "@/content/sections";
import { testimonials } from "@/content/testimonials";
import { TestimonialsCarousel } from "./TestimonialsCarousel";

/**
 * Only renders when content/testimonials.ts has real quotes (the section is
 * also unpublished in content/sections.ts until then). Never invent quotes.
 */
export function Testimonials({ section }: { section: SectionConfig }) {
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
