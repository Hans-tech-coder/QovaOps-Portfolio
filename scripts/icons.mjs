// Builds each site's icons from its mark:
//   QovaOps (VA site, also localhost/previews): public/brand/qovaops-mark.svg (Q)
//   Hans Obena (dev site):                      public/brand/hans-obena-mark.svg (HO ligature)
// Run after changing a mark:  node scripts/icons.mjs
//
// Per site, in public/icons/ (prefix "qovaops" or "hans-obena"):
//   <prefix>-icon.svg            rounded dark square + lime mark (modern browsers)
//   <prefix>-favicon.ico         16/32/48 PNGs in one .ico; /favicon.ico is rewritten to it per host (next.config.ts)
//   <prefix>-apple-icon.png      180×180, full-bleed #101010 (iOS rounds the corners itself)
// Manifest icons (rounded square 192/512, maskable 512 with the mark inside the 80% safe zone):
//   VA keeps the original names icon-192.png, icon-512.png, icon-maskable-512.png
//   (the VA JSON-LD logo points at icon-512.png); dev uses hans-obena-192.png, -512.png, -maskable-512.png.
// Links: components/seo/icons.ts (metadata + manifest).
import { readFile, writeFile, mkdir } from "node:fs/promises";
import sharp from "sharp";

const root = new URL("..", import.meta.url);

const SITES = [
  {
    prefix: "qovaops",
    mark: "public/brand/qovaops-mark.svg",
    label: "QovaOps",
    center: [100, 102], // the Q's optical center in its 200 grid
    apple: 0.72,
    maskable: 0.6,
    manifest: { s192: "icon-192.png", s512: "icon-512.png", maskable: "icon-maskable-512.png" },
  },
  {
    prefix: "hans-obena",
    mark: "public/brand/hans-obena-mark.svg",
    label: "Hans Obena",
    center: [100, 100],
    apple: 0.85,
    maskable: 0.7,
    manifest: {
      s192: "hans-obena-192.png",
      s512: "hans-obena-512.png",
      maskable: "hans-obena-maskable-512.png",
    },
  },
];

const png = (svg, size) =>
  sharp(Buffer.from(svg), { density: Math.max(72, (72 * size) / 200) * 4 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer();

/** ICO with PNG-compressed entries (supported by every current browser). */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const dir = Buffer.alloc(16 * images.length);
  let offset = 6 + dir.length;
  images.forEach(({ size, data }, i) => {
    const o = i * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, o);
    dir.writeUInt8(size >= 256 ? 0 : size, o + 1);
    dir.writeUInt8(0, o + 2);
    dir.writeUInt8(0, o + 3);
    dir.writeUInt16LE(1, o + 4);
    dir.writeUInt16LE(32, o + 6);
    dir.writeUInt32LE(data.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += data.length;
  });
  return Buffer.concat([header, dir, ...images.map((i) => i.data)]);
}

const out = (name) => new URL(`public/icons/${name}`, root);
await mkdir(new URL("public/icons/", root), { recursive: true });

for (const s of SITES) {
  const markSvg = await readFile(new URL(s.mark, root), "utf8");

  // The mark's lime paths (raw, without the tile's own scale), reused for the full-bleed variants.
  const group = markSvg.match(/<g fill="#C6FF00"[^>]*>([\s\S]*?)<\/g>/);
  if (!group) throw new Error(`No lime <g> found in ${s.mark}`);
  const paths = group[1].trim();

  // Same artwork as the mark, without the XML prolog/comment/aria (it's an icon file).
  const iconSvg = markSvg
    .replace(/<\?xml[^>]*>\s*/, "")
    .replace(/<!--[\s\S]*?-->\s*/, "")
    .replace(` role="img" aria-label="${s.label}"`, "");

  /** Full-bleed square, mark scaled by `scale` around its center (moved to the middle). */
  const [cx, cy] = s.center;
  const fullBleed = (scale) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" fill="#101010"/>
  <g fill="#C6FF00" transform="translate(100 100) scale(${scale}) translate(${-cx} ${-cy})">
    ${paths}
  </g>
</svg>`;

  await writeFile(out(`${s.prefix}-icon.svg`), iconSvg);
  const icoImages = await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await png(iconSvg, size) })));
  await writeFile(out(`${s.prefix}-favicon.ico`), ico(icoImages));
  await writeFile(out(`${s.prefix}-apple-icon.png`), await png(fullBleed(s.apple), 180));
  await writeFile(out(s.manifest.s192), await png(iconSvg, 192));
  await writeFile(out(s.manifest.s512), await png(iconSvg, 512));
  // Maskable: launchers crop to a circle/squircle, so keep the mark well inside the center 80%.
  await writeFile(out(s.manifest.maskable), await png(fullBleed(s.maskable), 512));
  console.log(`Icons written for ${s.label}: public/icons/${s.prefix}-*, ${Object.values(s.manifest).join(", ")}`);
}
