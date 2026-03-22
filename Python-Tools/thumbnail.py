# =============================================================================
# thumbnail.py
# -----------------------------------------------------------------------------
# Beschreibung : Erstellt für alle PDF-Dateien im aktuellen Verzeichnis ein
#                PNG-Thumbnail der ersten Seite (max. 300x300 Pixel).
# Verwendung   : python thumbnail.py
# Abhängigkeiten: PyMuPDF
# Autor        : Knut Welzel
# Erstellt     : 2026
# =============================================================================
import fitz  # PyMuPDF
import os

# Alle PDF-Dateien im aktuellen Verzeichnis verarbeiten
for pdf in os.listdir("."):
    if pdf.endswith(".pdf"):
        doc = fitz.open(pdf)
        page = doc.load_page(0)  # nur erste Seite
        rect = page.rect
        # Skalierung so berechnen, dass das Bild in 300x300 passt
        scale = min(300 / rect.width, 300 / rect.height)
        matrix = fitz.Matrix(scale, scale)
        pix = page.get_pixmap(matrix=matrix)
        pix.save(pdf.replace(".pdf", ".png"))
