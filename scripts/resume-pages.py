"""Render public/resume/hans-obena-resume.pdf to page images for the resume modal.

Run after replacing the PDF:  python scripts/resume-pages.py
Needs: pip install pypdfium2 pillow
Writes public/resume/page-1.webp, page-2.webp, ... (1400px wide, crisp on 2x screens
at the modal's ~700px width). Update RESUME_PAGES in components/ui/ResumeButtons.tsx
if the page count changes.
"""
from pathlib import Path

import pypdfium2 as pdfium

ROOT = Path(__file__).resolve().parent.parent
PDF = ROOT / "public" / "resume" / "hans-obena-resume.pdf"
OUT = PDF.parent
WIDTH = 1400

pdf = pdfium.PdfDocument(str(PDF))
for i, page in enumerate(pdf, start=1):
    scale = WIDTH / page.get_width()
    image = page.render(scale=scale).to_pil().convert("RGB")
    path = OUT / f"page-{i}.webp"
    image.save(path, "WEBP", quality=88, method=6)
    print(f"{path.relative_to(ROOT)}  {image.width}x{image.height}")
