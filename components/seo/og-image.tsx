import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cacheLife } from "next/cache";
import { ImageResponse } from "next/og";
import { devMeta, devProfile } from "@/content/dev/profile";
import { vaProfile } from "@/content/va/profile";

// Open Graph / Twitter cards for both sites (app/<site>/opengraph-image.tsx, twitter-image.tsx).
// Brand sheet look: #101010 + faint grid, logo lockup, two-tone headline, divider with lime tip.
//   va:  QovaOps lockup (Q mark + "by triqova"), VA tagline
//   dev: "Hans Obena / Full-Stack Web Developer" (personal brand, no Q mark)
export type OgSite = "va" | "dev";

const { brand, about: { tagline } } = vaProfile;

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = `${brand.name} ${brand.endorsement}: ${tagline.line1} ${tagline.line2} Hans Obena, virtual assistant with advanced technical skills.`;
export const devOgAlt = `${devProfile.brand.name} / ${devMeta.jobTitle}. Next.js, React, TypeScript, WordPress, Shopify.`;

type Card = {
  lockup: "qovaops" | "name";
  line1: string;
  line2: string;
  sub: string;
  footerLeft: string;
  footerRight: string;
};

const CARDS: Record<OgSite, Card> = {
  va: {
    lockup: "qovaops",
    line1: tagline.line1,
    line2: tagline.line2,
    sub: "Virtual assistant with advanced technical skills",
    footerLeft: brand.secondaryLine,
    footerRight: "qovaops.triqova.com",
  },
  dev: {
    lockup: "name",
    line1: devProfile.brand.name,
    line2: devMeta.jobTitle,
    sub: "Next.js · React · TypeScript · WordPress · Shopify",
    footerLeft: "Open to remote roles",
    footerRight: "hansobena.triqova.com",
  },
};

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

export async function renderOgImage(siteId: OgSite = "va") {
  const card = CARDS[siteId];
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
        {card.lockup === "qovaops" ? (
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`data:image/svg+xml;base64,${mark}`} width={84} height={84} alt="" />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <div style={{ fontSize: 46, fontWeight: 700, letterSpacing: -1, lineHeight: 1 }}>{brand.name}</div>
              <div style={{ fontSize: 20, fontWeight: 500, color: C.gray, marginTop: 4 }}>{brand.endorsement}</div>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, fontWeight: 500, color: C.gray, letterSpacing: 1.5, textTransform: "uppercase" }}>
            <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: C.lime }} />
            {"// Developer portfolio"}
          </div>
        )}

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>{card.line1}</div>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05, color: C.lime }}>
            {card.line2}
          </div>
          <div style={{ fontSize: 30, fontWeight: 500, color: C.body, marginTop: 26 }}>{card.sub}</div>
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
            <div>{card.footerLeft}</div>
            <div style={{ color: C.white }}>{card.footerRight}</div>
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: fonts.length ? fonts : undefined },
  );
}
