# Python Skripte – WoodenDreams

Entwicklungs-Tools für die WoodenDreams-Webseite. Die Skripte unterstützen
bei der Aufbereitung von Icons, PDFs und anderen Assets während der Entwicklung.

---

## Icon-Verwaltung

### Icons-names.py
Ersetzt Pfadtexte in der Icon-Spalte einer Word-Tabelle durch eingebettete Bilder.
Sucht in jeder Tabelle nach einer Spalte mit dem Header „Icon", löst die Pfade auf
und fügt die Bilder inline ein.

**Verwendung:** `python Icons-names.py`  
**Abhängigkeiten:** pywin32

---

### docx-to-md.py
Liest die Icon-Tabelle aus einer Word-Datei und exportiert sie als Markdown-Tabelle
mit Bildvorschau, Dateiname, Bezeichnung und Beschreibung.

**Verwendung:** `python docx-to-md.py`  
**Abhängigkeiten:** pywin32

---

### crop_icons_pillow.py
Extrahiert einzelne Piktogramme aus einem Sprite-Sheet. Erkennt Konturen per
Alpha-Kanal oder Helligkeitsschwellwert, schneidet jedes Icon aus, zentriert es
auf einem 168×168-Canvas und speichert es als 64×64 PNG.

**Verwendung:** `python crop_icons_pillow.py <bilddatei>`  
**Abhängigkeiten:** opencv-python, numpy, Pillow

---

## PDF-Verarbeitung

### PDF-rotate.py
Dreht ausgewählte PDF-Dateien über einen Dateidialog um 90° gegen den
Uhrzeigersinn und speichert sie direkt (in-place).

**Verwendung:** `python PDF-rotate.py`  
**Abhängigkeiten:** PyMuPDF, tkinter

---

### PDF-Thumbnails.py
Fügt ausgewählten PDF-Dateien ein Wasserzeichen (Logo) hinzu und erstellt
je ein PNG-Thumbnail der ersten Seite. Das Wasserzeichen wird automatisch
an Seitengröße und -format angepasst.

**Verwendung:** `python PDF-Thumbnails.py`  
**Abhängigkeiten:** PyMuPDF, Pillow, tkinter

---

### rotate_pdfs.py
Dreht alle PDF-Dateien im aktuellen Verzeichnis um 90° gegen den Uhrzeigersinn
und überschreibt sie direkt (kein Backup).

**Verwendung:** `python rotate_pdfs.py`  
**Abhängigkeiten:** PyMuPDF

---

### thumbnail.py
Erstellt für alle PDF-Dateien im aktuellen Verzeichnis ein PNG-Thumbnail
der ersten Seite (max. 300×300 Pixel).

**Verwendung:** `python thumbnail.py`  
**Abhängigkeiten:** PyMuPDF

---

## Sonstiges

### svg_to_favicon.py
Konvertiert eine SVG-Datei mithilfe von Inkscape in eine mehrstufige ICO-Datei
mit den Größen 16, 32, 48, 64, 128 und 256 Pixel.

**Verwendung:** `python svg_to_favicon.py <input.svg> [output.ico]`  
**Abhängigkeiten:** Pillow, Inkscape

---

## Diagnose

### inspect_cols.py
Gibt den Rohtext und bereinigten Text der ersten 5 Zeilen und 4 Spalten
der ersten Word-Tabelle aus, um die Spaltenstruktur und Steuerzeichen zu prüfen.

**Verwendung:** `python inspect_cols.py`  
**Abhängigkeiten:** pywin32

---

### inspect_doc.py
Gibt Anzahl, Dimensionen und Zellinhalte aller Tabellen einer Word-Datei
in der Konsole aus.

**Verwendung:** `python inspect_doc.py`  
**Abhängigkeiten:** pywin32

---

### inspect_missing.py
Vergleicht die Dateinamen aus der Word-Tabelle mit den tatsächlich vorhandenen
Dateien in den Icon-Unterordnern (`tools`, `components`, `connections`, `furniture`)
und listet fehlende Einträge auf.

**Verwendung:** `python inspect_missing.py`  
**Abhängigkeiten:** pywin32

---

*Autor: Knut Welzel – 2026*
