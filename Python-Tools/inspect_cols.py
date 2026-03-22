# =============================================================================
# inspect_cols.py
# -----------------------------------------------------------------------------
# Beschreibung : Gibt den Rohinhalt der ersten 5 Zeilen und 4 Spalten der
#                ersten Tabelle einer Word-Datei zur Diagnose aus.
# Verwendung   : python inspect_cols.py
# Abhängigkeiten: pywin32
# Autor        : Knut Welzel
# Erstellt     : 2026
# =============================================================================
import sys
import win32com.client as win32

# UTF-8-Ausgabe sicherstellen (wichtig unter Windows)
sys.stdout.reconfigure(encoding="utf-8")

doc_path = r"C:\Users\knutw\OneDrive\Dokumente\WoodenDreams\wooden-dreams-web\icons\Icons.docx"

# Word unsichtbar starten und Dokument öffnen
word = win32.Dispatch("Word.Application")
word.Visible = False
doc = word.Documents.Open(doc_path)
tbl = doc.Tables(1)  # erste Tabelle

# Erste 5 Zeilen und 4 Spalten ausgeben (Rohtext + bereinigt)
for r in range(1, 6):
    for c in range(1, 5):
        raw = tbl.Cell(r, c).Range.Text
        clean = raw.replace("\r", "").replace("\x07", "").strip()
        print(f"  [{r},{c}] repr={repr(raw[:60])} clean=[{clean}]")

doc.Close()
word.Quit()
