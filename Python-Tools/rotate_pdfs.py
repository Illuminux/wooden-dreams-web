# =============================================================================
# rotate_pdfs.py
# -----------------------------------------------------------------------------
# Beschreibung : Dreht alle PDF-Dateien im aktuellen Verzeichnis um 90°
#                gegen den Uhrzeigersinn und speichert sie direkt (in-place).
# Verwendung   : python rotate_pdfs.py
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
        # Jede Seite um 90° gegen den Uhrzeigersinn drehen
        for page in doc:
            page.set_rotation(-90)
        # Zunächst in temporäre Datei speichern, dann ersetzen
        temp_name = pdf + ".tmp"
        doc.save(temp_name)
        doc.close()
        os.replace(temp_name, pdf)
        print(f"Rotated {pdf} in place")
