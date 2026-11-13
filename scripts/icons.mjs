// Builds the site icons from the real Q mark (public/brand/qovaops-mark.svg).
// Run after changing the mark:  node scripts/icons.mjs
//
// Writes:
//   app/icon.svg                     rounded dark square + lime Q (modern browsers)
//   app/favicon.ico                  16/32/48 PNGs packed in one .ico (legacy + /favicon.ico requests)
//   app/apple-icon.png               180×180, full-bleed #101010 (iOS rounds the corners itself)
//   public/icons/icon-192.png        manifest, rounded square
//   public/icons/icon-512.png        manifest, rounded square
//   public/icons/icon-maskable-512.png  manifest maskable, full bleed, Q inside the 80% safe zone
import { readFile, writeFile, mkdir } from "node:fs/promises";
import sharp from "sharp";

const root = new URL("..", import.meta.url);
const markSvg = await readFile(new URL("public/brand/qovaops-mark.svg", root), "utf8");

// The four Q paths, reused for the full-bleed variants.
const paths = [...markSvg.matchAll(/<path d="[^"]+"\/>/g)].map((m) => m[0]).join("\n    ");
if (!paths) throw new Error("No <path> found in qovaops-mark.svg");

// Same artwork as the mark, without the XML prolog/comment/aria (it's an icon file).
const iconSvg = markSvg
  .replace(/<\?xml[^>]*>\s*/, "")
  .replace(/<!--[\s\S]*?-->\s*/, "")
  .replace(/ role="img" aria-label="QovaOps"/, "");

/** Full-bleed square, Q scaled by `scale` around the center. */
const fullBleed = (scale) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" fill="#101010"/>
  <g fill="#C6FF00" transform="translate(100 100) scale(${scale}) translate(-100 -102)">
    ${paths}
  </g>
</svg>`;

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

await mkdir(new URL("public/icons/", root), { recursive: true });

await writeFile(new URL("app/icon.svg", root), iconSvg);

const icoSizes = [16, 32, 48];
const icoImages = await Promise.all(icoSizes.map(async (size) => ({ size, data: await png(iconSvg, size) })));
await writeFile(new URL("app/favicon.ico", root), ico(icoImages));

await writeFile(new URL("app/apple-icon.png", root), await png(fullBleed(0.72), 180));
await writeFile(new URL("public/icons/icon-192.png", root), await png(iconSvg, 192));
await writeFile(new URL("public/icons/icon-512.png", root), await png(iconSvg, 512));
// Maskable: launchers crop to a circle/squircle, so keep the Q well inside the center 80%.
await writeFile(new URL("public/icons/icon-maskable-512.png", root), await png(fullBleed(0.6), 512));

console.log("Icons written: app/icon.svg, app/favicon.ico, app/apple-icon.png, public/icons/*");
