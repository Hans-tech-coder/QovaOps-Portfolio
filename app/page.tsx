import type { ComponentType } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { ScrollSpyProvider } from "@/components/layout/ScrollSpy";
import { Sidebar } from "@/components/layout/Sidebar";
import { HeroIntro } from "@/components/motion/HeroIntro";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { HowIWork } from "@/components/sections/HowIWork";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { Tools } from "@/components/sections/Tools";
import { Work } from "@/components/sections/Work";
import { navItems, sections, type SectionConfig } from "@/content/sections";

// Section id (content/sections.ts) → component. Only published sections are in `sections`,
// so the page and the nav (sidebar + mobile menu) always match.
const SECTION_COMPONENTS: Record<string, ComponentType<{ section: SectionConfig }>> = {
  about: About,
  services: Services,
  "how-i-work": HowIWork,
  tools: Tools,
  work: Work,
  experience: Experience,
  testimonials: Testimonials,
  contact: Contact,
};

export default function Home() {
  return (
    <ScrollSpyProvider items={navItems}>
      {/* First, so the hero timeline is set up before the scroll reveals (see HeroIntro) */}
      <HeroIntro />
      <a
        href="#main"
        className="qo-label sr-only z-50 rounded-full bg-accent px-4 py-2 text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      <MobileNav />

      <div id="top" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Header />

        <div className="grid gap-6 lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[16.5rem_minmax(0,1fr)]">
          <Sidebar />

          <main id="main" tabIndex={-1} className="flex min-w-0 flex-col gap-6 outline-none">
            {sections.map((section) => {
              const Section = SECTION_COMPONENTS[section.id];
              return Section ? <Section key={section.id} section={section} /> : null;
            })}
          </main>
        </div>

        <Footer />
      </div>
    </ScrollSpyProvider>
  );
}
