# =============================================================================
# PDF-Thumbnails.py
# -----------------------------------------------------------------------------
# Beschreibung : Fügt ausgewählten PDF-Dateien ein Wasserzeichen hinzu und
#                erstellt je ein PNG-Thumbnail der ersten Seite.
# Verwendung   : python PDF-Thumbnails.py
# Abhängigkeiten: PyMuPDF, Pillow, tkinter
# Autor        : Knut Welzel
# Erstellt     : 2026
# =============================================================================
import fitz  # PyMuPDF
from tkinter import Tk, filedialog
from pathlib import Path
from PIL import Image, ImageEnhance
import io
import math

# Mögliche Pfade zum Wasserzeichen-Logo (PNG bevorzugt, SVG als Fallback)
DEFAULT_WM_PATHS = [
    r"../Abbildungen/Wooden_Dreams_Logo.png",
    r"../Abbildungen/Wooden_Dreams_Logo.svg",
]

DEFAULT_OPACITY = 0.1   # Transparenz des Wasserzeichens (0=unsichtbar, 1=voll)
BASE_SCALE = 0.22       # Wasserzeichen-Breite relativ zur Inhaltsbreite
THUMB_WIDTH = 800       # Pixelbreite der erzeugten Thumbnails

# A4-Referenzfläche für automatische Skalierung
A4_WIDTH_PT = 595.28
A4_HEIGHT_PT = 841.89
A4_AREA = A4_WIDTH_PT * A4_HEIGHT_PT


def choose_pdfs():
    # Tkinter-Fenster unsichtbar im Vordergrund öffnen
    root = Tk()
    root.withdraw()
    root.attributes("-topmost", True)
    files = filedialog.askopenfilenames(
        title="PDF-Dateien auswählen",
        filetypes=[("PDF Dateien", "*.pdf"), ("Alle Dateien", "*.*")]
    )
    root.destroy()
    return list(files)


def load_watermark():
    # Ersten vorhandenen Wasserzeichen-Pfad zurückgeben
    for p in [Path(__file__).parent / path for path in DEFAULT_WM_PATHS]:
        if Path(p).is_file():
            return p
    return None


def svg_to_png(svg_path):
    # SVG über cairosvg in PNG-Bytes konvertieren
    import cairosvg
    return cairosvg.svg2png(url=svg_path)


def prepare_watermark(wm_path):
    # Bild laden (SVG → PNG-Bytes, sonst direkt öffnen)
    ext = Path(wm_path).suffix.lower()
    if ext == ".svg":
        png_bytes = svg_to_png(wm_path)
        img = Image.open(io.BytesIO(png_bytes)).convert("RGBA")
    else:
        img = Image.open(wm_path).convert("RGBA")

    # Alpha-Kanal auf gewünschte Deckkraft reduzieren
    alpha = img.split()[3]
    alpha = ImageEnhance.Brightness(alpha).enhance(DEFAULT_OPACITY)
    img.putalpha(alpha)

    ratio = img.height / img.width  # Seitenverhältnis für spätere Skalierung
    return img, ratio


def get_content_bbox(page):
    # Bounding-Box aus Vektorzeichnungen ermitteln
    bbox = None
    try:
        drawings = page.get_drawings()
    except Exception:
        drawings = []
    for d in drawings:
        r = fitz.Rect(d["rect"])
        bbox = r if bbox is None else bbox | r

    # Bounding-Box um Textblöcke erweitern
    try:
        blocks = page.get_text("blocks")
    except Exception:
        blocks = []
    for b in blocks:
        r = fitz.Rect(b[:4])
        bbox = r if bbox is None else bbox | r

    # Fallback: gesamte Seite verwenden
    return bbox if bbox is not None else page.rect


def apply_watermark(doc, wm_img, wm_ratio):
    for page in doc:
        content_rect = get_content_bbox(page)

        # Bei Querformat Wasserzeichen um 90° drehen
        is_landscape = page.rect.width > page.rect.height
        if is_landscape:
            wm_rot = wm_img.rotate(-90, expand=True)
            ratio = wm_rot.height / wm_rot.width
        else:
            wm_rot = wm_img
            ratio = wm_ratio

        # Wasserzeichen als PNG-Bytes für fitz vorbereiten
        out = io.BytesIO()
        wm_rot.save(out, format="PNG")
        wm_png = out.getvalue()

        # Größe proportional zur Seitenfläche skalieren (relativ zu A4)
        page_area = page.rect.width * page.rect.height
        scale_factor = math.sqrt(page_area / A4_AREA)
        scale_factor = max(0.8, min(scale_factor, 2.5))  # auf sinnvollen Bereich begrenzen
        scale = BASE_SCALE * scale_factor

        target_w = content_rect.width * scale
        target_h = target_w * ratio

        # Wasserzeichen in der optischen Mitte des Inhalts platzieren
        cx = content_rect.x0 + content_rect.width / 2
        cy = content_rect.y0 + content_rect.height / 2
        rect_target = fitz.Rect(
            cx - target_w / 2, cy - target_h / 2,
            cx + target_w / 2, cy + target_h / 2
        )
        # Bild hinter den Inhalt legen (overlay=False)
        page.insert_image(rect_target, stream=wm_png, keep_proportion=True, overlay=False)


def create_thumbnail(pdf_path):
    doc = fitz.open(pdf_path)
    page = doc.load_page(0)  # nur erste Seite

    # Skalierung auf THUMB_WIDTH berechnen
    pix = page.get_pixmap(matrix=fitz.Matrix(1, 1))
    scale = THUMB_WIDTH / pix.width
    pix = page.get_pixmap(matrix=fitz.Matrix(scale, scale))

    img = Image.open(io.BytesIO(pix.tobytes("png")))

    # Leerzeichen im Dateinamen durch Unterstriche ersetzen
    clean_name = pdf_path.stem.replace(" ", "_") + ".png"
    img.save(pdf_path.with_name(clean_name), "PNG")


def process_pdf(pdf_path, wm_path):
    pdf_path = Path(pdf_path)
    print(f"Verarbeite: {pdf_path.name}")

    # Leerzeichen im PDF-Dateinamen ersetzen
    clean_pdf_path = pdf_path.with_name(pdf_path.name.replace(" ", "_"))
    if clean_pdf_path != pdf_path:
        pdf_path.rename(clean_pdf_path)
        pdf_path = clean_pdf_path

    doc = fitz.open(pdf_path)
    wm_img, wm_ratio = prepare_watermark(wm_path)
    apply_watermark(doc, wm_img, wm_ratio)

    # In temporäre Datei speichern, dann original ersetzen
    temp_path = pdf_path.with_suffix(".tmp")
    doc.save(temp_path, incremental=False)
    doc.close()
    temp_path.replace(pdf_path)

    create_thumbnail(pdf_path)
    print(f"✔ Fertig: {pdf_path.name}")


def main():
    wm_path = load_watermark()
    if not wm_path:
        print("Kein Wasserzeichen gefunden.")
        return
    pdfs = choose_pdfs()
    if not pdfs:
        print("Keine PDFs ausgewählt.")
        return
    for pdf in pdfs:
        process_pdf(pdf, wm_path)


if __name__ == "__main__":
    main()
