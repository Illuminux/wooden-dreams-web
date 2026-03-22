# =============================================================================
# inspect_missing.py
# -----------------------------------------------------------------------------
# Beschreibung : Prüft welche Icon-Dateien aus der Word-Tabelle in den
#                bekannten Unterordnern fehlen und gibt sie aus.
# Verwendung   : python inspect_missing.py
# Abhängigkeiten: pywin32
# Autor        : Knut Welzel
# Erstellt     : 2026
# =============================================================================
import os, sys
import win32com.client as win32

# UTF-8-Ausgabe sicherstellen (wichtig unter Windows)
sys.stdout.reconfigure(encoding="utf-8")

doc_path = r"C:\Users\knutw\OneDrive\Dokumente\WoodenDreams\wooden-dreams-web\icons\Icons.docx"
base = r"C:\Users\knutw\OneDrive\Dokumente\WoodenDreams\wooden-dreams-web\icons"

# Word unsichtbar starten und Dokument öffnen
word = win32.Dispatch("Word.Application")
word.Visible = False
doc = word.Documents.Open(doc_path)
tbl = doc.Tables(1)  # erste Tabelle

# Ab Zeile 2 (ohne Header) Dateinamen prüfen
for r in range(2, tbl.Rows.Count + 1):
    filename = tbl.Cell(r, 2).Range.Text.replace("\r", "").replace("\x07", "").strip()
    # Datei in einem der bekannten Unterordner suchen
    found = any(os.path.exists(os.path.join(base, sub, filename)) for sub in ("tools", "components", "connections", "furniture"))
    if not found:
        print(f"Row {r}: [{filename}]")

doc.Close()
word.Quit()
