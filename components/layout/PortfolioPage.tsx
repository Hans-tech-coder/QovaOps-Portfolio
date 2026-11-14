import type { ComponentType } from "react";
import { HeroIntro } from "@/components/motion/HeroIntro";
import { Loader } from "@/components/motion/Loader";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { HowIWork } from "@/components/sections/HowIWork";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { Tools } from "@/components/sections/Tools";
import { Work } from "@/components/sections/Work";
import { BackToTop } from "@/components/ui/BackToTop";
import type { SectionKind, SectionProps, SiteProfile } from "@/content/profile";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";
import { ScrollSpyProvider } from "./ScrollSpy";
import { Sidebar } from "./Sidebar";

// Section kind (SectionConfig.kind) → component. A profile only lists its published
// sections, so the page and the nav (sidebar + mobile menu) always match.
const SECTION_COMPONENTS: Record<SectionKind, ComponentType<SectionProps>> = {
  about: About,
  services: Services,
  "how-i-work": HowIWork,
  tools: Tools,
  work: Work,
  experience: Experience,
  testimonials: Testimonials,
  contact: Contact,
};

/**
 * The one-page portfolio shell shared by both sites (DEV_FIRST_PLAN.md §4):
 * loader, hero intro, skip link, mobile nav, header, sidebar, sections, footer,
 * back to top. Everything site-specific comes from `profile`.
 */
export function PortfolioPage({ profile }: { profile: SiteProfile }) {
  const { brand, contact, socials, resume, sections, navItems } = profile;
  return (
    <ScrollSpyProvider items={navItems}>
      {/* Intro loader (0–100%), then the hero timeline as it slides away */}
      <Loader />
      {/* First, so the hero timeline is set up before the scroll reveals (see HeroIntro) */}
      <HeroIntro />
      <a
        href="#main"
        className="qo-label sr-only z-50 rounded-full bg-accent px-4 py-2 text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      <MobileNav
        brand={brand}
        header={profile.header}
        socials={socials}
        resume={resume}
      />

      <div id="top" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Header profile={profile} />

        <div className="grid gap-6 lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[16.5rem_minmax(0,1fr)]">
          <Sidebar email={contact.email} resume={resume} />

          <main id="main" tabIndex={-1} className="flex min-w-0 flex-col gap-6 outline-none">
            {sections.map((section) => {
              const Section = SECTION_COMPONENTS[section.kind];
              return <Section key={section.id} section={section} profile={profile} />;
            })}
          </main>
        </div>

        <Footer brand={brand} />
      </div>

      <BackToTop />
    </ScrollSpyProvider>
  );
}
