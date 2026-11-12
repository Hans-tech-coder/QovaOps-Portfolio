import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { ScrollSpyProvider } from "@/components/layout/ScrollSpy";
import { SectionCard } from "@/components/layout/SectionCard";
import { Sidebar } from "@/components/layout/Sidebar";
import { navItems, sections } from "@/content/sections";

// Phase 2 layout shell. Section bodies are placeholders; real content is Phase 3.
export default function Home() {
  return (
    <ScrollSpyProvider items={navItems}>
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
            {sections.map((section) => (
              <SectionCard key={section.id} section={section}>
                {/* TODO(Phase 3): real section content */}
                <div className="flex min-h-[40vh] items-center justify-center rounded-card border border-dashed border-line p-6">
                  <p className="qo-label text-muted">{`// TODO: ${section.label} content (Phase 3)`}</p>
                </div>
              </SectionCard>
            ))}
          </main>
        </div>

        <Footer />
      </div>
    </ScrollSpyProvider>
  );
}
