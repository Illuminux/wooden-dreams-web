# =============================================================================
# inspect_doc.py
# -----------------------------------------------------------------------------
# Beschreibung : Gibt Struktur und Inhalt aller Tabellen einer Word-Datei
#                zur Diagnose in der Konsole aus.
# Verwendung   : python inspect_doc.py
# Abhängigkeiten: pywin32
# Autor        : Knut Welzel
# Erstellt     : 2026
# =============================================================================
import win32com.client as win32
import sys

# UTF-8-Ausgabe sicherstellen (wichtig unter Windows)
sys.stdout.reconfigure(encoding="utf-8")

doc_path = r"C:\Users\knutw\OneDrive\Dokumente\WoodenDreams\wooden-dreams-web\icons\Icons.docx"

# Word unsichtbar starten und Dokument öffnen
word = win32.Dispatch("Word.Application")
word.Visible = False
doc = word.Documents.Open(doc_path)

# Anzahl der Tabellen ausgeben
print("Tables:", doc.Tables.Count)

for i in range(1, doc.Tables.Count + 1):
    tbl = doc.Tables(i)
    print(f"Table {i}: {tbl.Rows.Count} rows x {tbl.Columns.Count} cols")

    # Spaltenüberschriften (Zeile 1) ausgeben
    for c in range(1, tbl.Columns.Count + 1):
        txt = tbl.Cell(1, c).Range.Text.replace("\r", "").replace("\x07", "").strip()
        print(f"  Col {c}: [{txt}]")

    # Erste 3 Datenzeilen ausgeben
    for r in range(2, min(5, tbl.Rows.Count + 1)):
        row_data = []
        for c in range(1, tbl.Columns.Count + 1):
            txt = tbl.Cell(r, c).Range.Text.replace("\r", "").replace("\x07", "").strip()
            row_data.append(txt)
        print(f"  Row {r}: {row_data}")

doc.Close()
word.Quit()
