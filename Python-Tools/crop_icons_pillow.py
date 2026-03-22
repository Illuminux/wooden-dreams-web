# =============================================================================
# crop_icons_pillow.py
# -----------------------------------------------------------------------------
# Beschreibung : Extrahiert einzelne Piktogramme aus einem Sprite-Sheet.
#                Erkennt Konturen per Alpha-Kanal oder Schwellwert, schneidet
#                jedes Icon aus und speichert es als 64x64 PNG.
# Verwendung   : python crop_icons_pillow.py <bilddatei>
# Abhängigkeiten: opencv-python, numpy, Pillow
# Autor        : Knut Welzel
# Erstellt     : 2026
# =============================================================================
import cv2
import numpy as np
import os
import sys


def split_pictograms(image_path, output_folder, min_size=80):
    img = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)
    if img is None:
        print(f"Fehler: '{image_path}' nicht gefunden.")
        return

    # Maske aus Alpha-Kanal (RGBA) oder Helligkeitsschwellwert (RGB) erzeugen
    if img.shape[2] == 4:
        mask = img[:, :, 3]
    else:
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        _, mask = cv2.threshold(gray, 250, 255, cv2.THRESH_BINARY_INV)

    # Äußere Konturen aller sichtbaren Bereiche finden
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Bounding-Boxes filtern: nur Objekte >= min_size berücksichtigen
    boxes = []
    for c in contours:
        x, y, w, h = cv2.boundingRect(c)
        if w >= min_size and h >= min_size:
            boxes.append((x, y, w, h))

    # Sortieren: zeilenweise von oben-links nach unten-rechts
    boxes.sort(key=lambda b: (b[1] // min_size, b[0]))

    os.makedirs(output_folder, exist_ok=True)
    print(f"Gefunden: {len(boxes)} Piktogramme")

    # Original mit PIL öffnen für verlustfreies Zuschneiden
    from PIL import Image
    pil_img = Image.open(image_path)

    for i, (x, y, w, h) in enumerate(boxes, 1):
        # Innerhalb der Bounding-Box nur den obersten Bereich (Icon, nicht Text) nehmen
        roi_mask = mask[y:y+h, x:x+w]
        inner_contours, _ = cv2.findContours(roi_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        if not inner_contours:
            continue

        # Konturen mit Mindesthöhe 20px filtern und nach y sortieren
        inner_boxes = [cv2.boundingRect(c) for c in inner_contours if cv2.boundingRect(c)[3] >= 20]
        inner_boxes.sort(key=lambda b: b[1])
        ix, iy, iw, ih = inner_boxes[0]  # oberstes Element = Icon

        tile = pil_img.crop((x + ix, y + iy, x + ix + iw, y + iy + ih))

        if w > 168 or h > 168:
            print(f"  Warnung: Piktogramm {i:02d} ({w}x{h}) ist größer als 168x168 und wird abgeschnitten!")

        # Icon auf 168x168 Canvas zentrieren, dann auf 64x64 skalieren
        canvas = Image.new("RGBA", (168, 168), (0, 0, 0, 0))
        offset_x = (168 - w) // 2
        offset_y = (168 - h) // 2
        canvas.paste(tile, (offset_x, offset_y))
        canvas = canvas.resize((64, 64), Image.LANCZOS)
        canvas.save(os.path.join(output_folder, f"piktogramm_{i:02d}.png"))
        print(f"  {i:02d}: {w}x{h} Pixel")

    print(f"Fertig! {len(boxes)} Bilder in '{output_folder}' gespeichert.")
    print(f"Max Breite: {max(w for x,y,w,h in boxes)}, Max Höhe: {max(h for x,y,w,h in boxes)}")


# Kommandozeilenargument prüfen
if len(sys.argv) < 2:
    print("Verwendung: python crop_icons_pillow.py <bilddatei>")
    sys.exit(1)

split_pictograms(sys.argv[1], "ausgabe_piktogramme")
