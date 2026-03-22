# =============================================================================
# docx-to-md.py
# -----------------------------------------------------------------------------
# Beschreibung : Liest eine Word-Tabelle (.docx) aus und exportiert die
#                Icon-Einträge (Dateiname, Bezeichnung, Beschreibung) als
#                Markdown-Tabelle mit Bildvorschau.
# Verwendung   : python docx-to-md.py
# Abhängigkeiten: pywin32
# Autor        : Knut Welzel
# Erstellt     : 2026
# =============================================================================
import win32com.client as win32

DOCX = r"C:\Users\knutw\OneDrive\Dokumente\WoodenDreams\wooden-dreams-web\icons\Icons.docx"
OUTPUT_MD = r"C:\Users\knutw\OneDrive\Dokumente\WoodenDreams\wooden-dreams-web\icons\Icons.md"


def cell_text(cell):
    # Steuerzeichen (\r, \x07) am Ende jeder Word-Zelle entfernen
    return cell.Range.Text.replace("\r", "").replace("\x07", "").strip()


def docx_to_md(doc_path, output_path):
    # Word unsichtbar starten und Dokument öffnen
    word = win32.Dispatch("Word.Application")
    word.Visible = False
    doc = word.Documents.Open(doc_path)

    rows = []
    try:
        tbl = doc.Tables(1)  # erste Tabelle
        # Ab Zeile 2 (ohne Header) Daten auslesen
        for r in range(2, tbl.Rows.Count + 1):
            filename    = cell_text(tbl.Cell(r, 2))
            label       = cell_text(tbl.Cell(r, 3))
            description = cell_text(tbl.Cell(r, 4))
            if not filename:
                continue
            rows.append((f"./{filename}", filename, label, description))
    finally:
        doc.Close()
        word.Quit()

    # Markdown-Tabelle aufbauen
    lines = [
        "# Icons\n",
        "| Icon | Dateiname | Bezeichnung | Beschreibung |",
        "|------|-----------|-------------|--------------|",
    ]
    for rel_path, filename, label, description in rows:
        img = f"![{label}]({rel_path})"
        lines.append(f"| {img} | `{filename}` | {label} | {description} |")

    # Markdown-Datei schreiben
    with open(output_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")

    print(f"Erstellt: {output_path} ({len(rows)} Icons)")


if __name__ == "__main__":
    docx_to_md(DOCX, OUTPUT_MD)
