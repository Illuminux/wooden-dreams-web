# =============================================================================
# PDF-rotate.py
# -----------------------------------------------------------------------------
# Beschreibung : Dreht ausgewählte PDF-Dateien um 90° gegen den Uhrzeigersinn
#                und speichert sie direkt (in-place) über einen Dateidialog.
# Verwendung   : python PDF-rotate.py
# Abhängigkeiten: PyMuPDF, tkinter
# Autor        : Knut Welzel
# Erstellt     : 2026
# =============================================================================
import fitz  # PyMuPDF
from tkinter import Tk, filedialog
from pathlib import Path


def choose_pdf_files():
    # Tkinter-Fenster unsichtbar im Vordergrund öffnen
    root = Tk()
    root.withdraw()
    root.update_idletasks()
    root.attributes('-topmost', True)
    root.update()
    file_paths = filedialog.askopenfilenames(
        title="PDF-Dateien auswählen",
        filetypes=[("PDF Dateien", "*.pdf"), ("Alle Dateien", "*.*")]
    )
    root.attributes('-topmost', False)
    root.destroy()
    return list(file_paths)


def rotate_pdf_in_place(pdf_path, rotation=-90):
    pdf_path = Path(pdf_path)
    print(f"Rotating {pdf_path.name} ...")
    doc = fitz.open(pdf_path)

    # Alle Seiten drehen
    for page in doc:
        page.set_rotation(rotation)

    # In temporäre Datei speichern, dann original ersetzen
    temp_path = pdf_path.with_suffix(".tmp")
    doc.save(temp_path)
    doc.close()
    temp_path.replace(pdf_path)
    print(f"✔ Rotated {pdf_path.name} in place")


def main():
    pdfs = choose_pdf_files()
    if not pdfs:
        print("Keine Dateien ausgewählt.")
        return
    for pdf in pdfs:
        rotate_pdf_in_place(pdf)


if __name__ == "__main__":
    main()
