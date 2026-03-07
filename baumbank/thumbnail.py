import fitz  # PyMuPDF
import os

for pdf in os.listdir("."):
    if pdf.endswith(".pdf"):
        doc = fitz.open(pdf)
        page = doc.load_page(0)
        rect = page.rect
        scale = min(300 / rect.width, 300 / rect.height)
        matrix = fitz.Matrix(scale, scale)
        pix = page.get_pixmap(matrix=matrix)
        pix.save(pdf.replace(".pdf", ".png"))