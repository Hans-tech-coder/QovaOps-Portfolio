"""Render the resume PDFs in public/resume/ to page images for the resume modal.

Run after replacing a PDF:  python scripts/resume-pages.py
Needs: pip install pypdfium2 pillow
Writes 1400px-wide WebP pages (crisp on 2x screens at the modal's ~700px width):
  hans-obena-resume.pdf            -> page-1.webp, page-2.webp, ...     (VA site)
  hans-obena-developer-resume.pdf  -> dev-page-1.webp, dev-page-2.webp  (developer site)
Update the page imports in content/<site>/profile.ts if the page count changes.
"""
from pathlib import Path

import pypdfium2 as pdfium

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "resume"
WIDTH = 1400
PDFS = {
    "hans-obena-resume.pdf": "page",
    "hans-obena-developer-resume.pdf": "dev-page",
}

for name, prefix in PDFS.items():
    src = OUT / name
    if not src.exists():
        print(f"skip {src.relative_to(ROOT)} (missing)")
        continue
    pdf = pdfium.PdfDocument(str(src))
    for i, page in enumerate(pdf, start=1):
        scale = WIDTH / page.get_width()
        image = page.render(scale=scale).to_pil().convert("RGB")
        path = OUT / f"{prefix}-{i}.webp"
        image.save(path, "WEBP", quality=88, method=6)
        print(f"{path.relative_to(ROOT)}  {image.width}x{image.height}")
