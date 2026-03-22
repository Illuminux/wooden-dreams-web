# =============================================================================
# svg_to_favicon.py
# -----------------------------------------------------------------------------
# Beschreibung : Konvertiert eine SVG-Datei in eine mehrstufige ICO-Datei
#                (16x16 bis 256x256) mithilfe von Inkscape.
# Verwendung   : python svg_to_favicon.py <input.svg> [output.ico]
# Abhängigkeiten: Pillow, Inkscape
# Autor        : Knut Welzel
# Erstellt     : 2026
# =============================================================================
import sys
import subprocess
import tempfile
from pathlib import Path
from PIL import Image

INKSCAPE = r"C:\Program Files\Inkscape\bin\inkscape.exe"


def svg_to_favicon(svg_path: str, output_path: str = None):
    svg_path = Path(svg_path)
    # Ausgabepfad: falls nicht angegeben, .svg durch .ico ersetzen
    output_path = Path(output_path) if output_path else svg_path.with_suffix(".ico")

    # Alle benötigten ICO-Größen
    sizes = [16, 32, 48, 64, 128, 256]
    images = []

    with tempfile.TemporaryDirectory() as tmp:
        for size in sizes:
            png_file = Path(tmp) / f"{size}.png"
            # Inkscape rendert die SVG in der gewünschten Größe als PNG
            subprocess.run([
                INKSCAPE, str(svg_path),
                f"--export-filename={png_file}",
                f"--export-width={size}",
                f"--export-height={size}"
            ], check=True, capture_output=True)
            img = Image.open(png_file).convert("RGBA")
            images.append(img)

    # Alle PNG-Größen in eine einzige ICO-Datei zusammenfassen
    images[0].save(
        output_path,
        format="ICO",
        sizes=[(s, s) for s in sizes],
        append_images=images[1:]
    )
    print(f"Favicon gespeichert: {output_path}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Verwendung: python svg_to_favicon.py <input.svg> [output.ico]")
        sys.exit(1)
    svg_to_favicon(*sys.argv[1:3])
