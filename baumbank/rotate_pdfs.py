import fitz  # PyMuPDF
import os

for pdf in os.listdir("."):
    if pdf.endswith(".pdf"):
        doc = fitz.open(pdf)
        for page in doc:
            page.set_rotation(-90)  # Rotate 90 degrees counterclockwise
        temp_name = pdf + ".tmp"
        doc.save(temp_name)
        doc.close()
        os.replace(temp_name, pdf)
        print(f"Rotated {pdf} in place")