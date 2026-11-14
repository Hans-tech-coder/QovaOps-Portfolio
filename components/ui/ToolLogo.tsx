import { toolLogos } from "@/content/tool-logos";

/** Official brand mark for a tool (content/tool-logos.ts). Renders nothing if we have no logo. */
export function ToolLogo({ name, className = "h-4 w-4" }: { name: string; className?: string }) {
  const logo = toolLogos[name];
  if (!logo) return null;
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={logo.viewBox}
      preserveAspectRatio="xMidYMid meet"
      className={`shrink-0 ${className}`}
      // Static, build-time SVG markup generated from Iconify/simple-icons, no user input.
      dangerouslySetInnerHTML={{ __html: logo.body }}
    />
  );
}
