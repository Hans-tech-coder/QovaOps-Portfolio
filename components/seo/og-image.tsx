import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cacheLife } from "next/cache";
import { ImageResponse } from "next/og";
import { vaProfile } from "@/content/va/profile";

// VA card (app/va/opengraph-image.tsx, twitter-image.tsx). Phase C adds the dev card.
const { brand, about: { tagline } } = vaProfile;

// Shared Open Graph / Twitter card (app/va/opengraph-image.tsx, app/va/twitter-image.tsx).
// Brand sheet look: #101010 + faint grid, Q mark, two-tone headline, divider with lime tip.
export const ogSize = { width: 1200, height: 630 };
export const ogAlt = `${brand.name} ${brand.endorsement}: ${tagline.line1} ${tagline.line2} Hans Obena, virtual assistant with advanced technical skills.`;

const C = { bg: "#101010", grid: "#1A1D21", white: "#FFFFFF", lime: "#C6FF00", gray: "#6B7280", body: "#B4B9C0" };

// Articulat CF is an Adobe Fonts web kit (not licensed as a file), so the card uses Inter,
// the site's fallback. Fetched once and cached ("use cache", so the image prerenders at
// build); if the fetch fails, next/og's default font is used.
async function inter(weight: 500 | 700): Promise<ArrayBuffer | null> {
  "use cache";
  cacheLife("max");
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Inter:wght@${weight}`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

async function qMark(): Promise<string> {
  "use cache";
  cacheLife("max");
  return readFile(join(process.cwd(), "public/brand/qovaops-mark.svg"), "base64");
}

export async function renderOgImage() {
  const [mark, medium, bold] = await Promise.all([qMark(), inter(500), inter(700)]);
  const fonts = [
    ...(medium ? [{ name: "Inter", data: medium, weight: 500 as const, style: "normal" as const }] : []),
    ...(bold ? [{ name: "Inter", data: bold, weight: 700 as const, style: "normal" as const }] : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: C.bg,
          backgroundImage: `linear-gradient(${C.grid} 1px, transparent 1px), linear-gradient(90deg, ${C.grid} 1px, transparent 1px)`,
          backgroundSize: "96px 96px",
          fontFamily: "Inter",
          color: C.white,
        }}
      >
        {/* Logo lockup */}
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/svg+xml;base64,${mark}`} width={84} height={84} alt="" />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <div style={{ fontSize: 46, fontWeight: 700, letterSpacing: -1, lineHeight: 1 }}>{brand.name}</div>
            <div style={{ fontSize: 20, fontWeight: 500, color: C.gray, marginTop: 4 }}>{brand.endorsement}</div>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>{tagline.line1}</div>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05, color: C.lime }}>
            {tagline.line2}
          </div>
          <div style={{ fontSize: 30, fontWeight: 500, color: C.body, marginTop: 26 }}>
            Virtual assistant with advanced technical skills
          </div>
        </div>

        {/* Divider with lime tip + footer strip */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", height: 2, backgroundColor: "#2A2F36" }}>
            <div style={{ width: "10%", height: 2, backgroundColor: C.lime }} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 18,
              fontWeight: 500,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              color: C.gray,
            }}
          >
            <div>{brand.secondaryLine}</div>
            <div style={{ color: C.white }}>qovaops.triqova.com</div>
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: fonts.length ? fonts : undefined },
  );
}
