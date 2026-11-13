import {
  ChartColumn,
  Code,
  Gauge,
  Inbox,
  Route,
  ShieldCheck,
  ShoppingCart,
  SquareKanban,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { SectionCard } from "@/components/layout/SectionCard";
import { Reveal } from "@/components/motion/Reveal";
import type { SectionConfig } from "@/content/sections";
import { services, type ServiceIcon } from "@/content/services";

const ICONS: Record<ServiceIcon, LucideIcon> = {
  inbox: Inbox,
  cart: ShoppingCart,
  code: Code,
  gauge: Gauge,
  workflow: Workflow,
  kanban: SquareKanban,
  chart: ChartColumn,
  shield: ShieldCheck,
  route: Route,
};

/** Numbered rows 01–09: outlined number, icon + title, one line; accent left bar on hover. */
export function Services({ section }: { section: SectionConfig }) {
  return (
    <SectionCard section={section}>
      <Reveal className="border-t border-dashed border-line">
        <ol>
          {services.map(({ title, line, icon }, i) => {
            const Icon = ICONS[icon];
            return (
              <li
                key={title}
                data-reveal
                className="group relative grid grid-cols-[3.25rem_minmax(0,1fr)] gap-x-4 gap-y-2 border-b border-dashed border-line py-5 pl-4 sm:grid-cols-[4.5rem_minmax(0,1fr)] md:grid-cols-[4.5rem_minmax(0,1.1fr)_minmax(0,1fr)] md:items-center md:gap-x-6"
              >
                {/* Brand-sheet left bar: lime on dark, #101010 on light (never a thin lime line on light) */}
                <span
                  aria-hidden="true"
                  className="absolute top-3 bottom-3 left-0 w-[3px] origin-center scale-y-0 rounded-full bg-accent-text transition-transform duration-(--duration-fast) ease-(--ease-smooth-out) group-hover:scale-y-100"
                />
                <span
                  aria-hidden="true"
                  className="text-outline row-span-2 text-4xl leading-none font-bold tracking-tight sm:text-5xl md:row-span-1"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="flex items-start gap-3 text-lg leading-snug font-bold text-fg transition-transform duration-(--duration-fast) ease-(--ease-smooth-out) group-hover:translate-x-1 sm:text-xl">
                  <Icon aria-hidden="true" className="mt-1 size-5 shrink-0 text-accent-text" />
                  <span>
                    <span className="sr-only">{`${String(i + 1).padStart(2, "0")}. `}</span>
                    {title}
                  </span>
                </h3>
                <p className="text-sm text-muted sm:text-base md:col-start-3">{line}</p>
              </li>
            );
          })}
        </ol>
      </Reveal>
    </SectionCard>
  );
}
