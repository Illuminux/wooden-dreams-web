# =============================================================================
# Icons-names.py
# -----------------------------------------------------------------------------
# Beschreibung : Liest die Icon-Dateinamen aus der ersten Tabelle einer
#                Word-Datei (.docx) und gibt sie in der Konsole aus.
# Verwendung   : python Icons-names.py
# Abhängigkeiten: pywin32
# Autor        : Knut Welzel
# Erstellt     : 2026
# =============================================================================
import os
import win32com.client as win32

DOCX = r"C:\Users\knutw\OneDrive\Dokumente\WoodenDreams\wooden-dreams-web\icons\Icons.docx"


def cell_text(cell_range):
    # Word-Zellen enden mit \r\x07 – diese Steuerzeichen entfernen
    txt = cell_range.Text
    return txt.replace("\r", "").replace("\x07", "").strip()


def find_col_index_by_header(table, header_name="Icon"):
    # Spaltenindex (1-basiert) anhand des Header-Textes suchen
    for c in range(1, table.Columns.Count + 1):
        t = cell_text(table.Cell(1, c).Range)
        if t.lower() == header_name.lower():
            return c
    return None


def resolve_path(doc_path, p):
    # Relative Pfade (./...) relativ zum Dokumentordner auflösen
    if p.startswith("./"):
        base = os.path.dirname(doc_path)
        return os.path.normpath(os.path.join(base, p[2:]))
    return p


def replace_icon_paths_with_images(doc_path, icon_width_cm=1.0):
    # Word unsichtbar starten und Dokument öffnen
    word = win32.Dispatch("Word.Application")
    word.Visible = False
    doc = word.Documents.Open(doc_path)

    try:
        for tbl in doc.Tables:
            # Spalte mit Header "Icon" suchen
            icon_col = find_col_index_by_header(tbl, "Icon")
            if not icon_col:
                continue

            # Ab Zeile 2 (ohne Header) alle Zellen verarbeiten
            for r in range(2, tbl.Rows.Count + 1):
                rng = tbl.Cell(r, icon_col).Range
                p = cell_text(rng)
                if not p:
                    continue

                # Pfad auflösen und Existenz prüfen
                img_path = resolve_path(doc_path, p)
                print(f"Row {r}: raw='{p}' -> resolved='{img_path}' exists={os.path.exists(img_path)}")
                if not os.path.exists(img_path):
                    continue

                # Zelltext leeren und Bild inline einfügen
                rng.Text = ""
                ils = rng.InlineShapes.AddPicture(
                    FileName=img_path,
                    LinkToFile=False,
                    SaveWithDocument=True
                )
                # Breite setzen (cm → Points: 1 cm = 28.35 pt)
                ils.LockAspectRatio = True
                ils.Width = icon_width_cm * 28.35

        doc.Save()
    finally:
        doc.Close()
        word.Quit()


if __name__ == "__main__":
    replace_icon_paths_with_images(DOCX, icon_width_cm=1.0)
