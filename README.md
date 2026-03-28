# Web-Projekt: Struktur & Arbeitsweise

Dieses Dokument beschreibt die aktuelle Struktur des Web-Projekts, die Rollen der einzelnen Ordner sowie empfohlene Arbeitsweisen.
Die bestehende Struktur bleibt vollständig erhalten.

---

## Projektübersicht

Das Projekt besteht aus mehreren klar getrennten Bereichen:

1. `develop` – aktiver Entwicklungsbereich
2. `deploy` – Ausgabe für veröffentlichte Versionen
3. `Python-Tools` – Hilfsprogramme und Skripte
4. `Abbildungen` – Rohmaterial und Originalbilder
5. Projektordner wie `standardtisch` oder `baumbank`

---

## Ordnerstruktur

```
web
│
├── Abbildungen\
│   └── standardtisch\
│
├── deploy\
│
├── develop\
│   ├── baumbank\
│   ├── icons\
│   ├── images\
│   │   └── projekte\
│   ├── standardtisch\
│   ├── knuts-wooden-dreams.html
│   └── (weitere HTML-Dateien)
│
└── Python-Tools\
```

---

## Rollen der Ordner

### `develop/` – Arbeitsbereich
Hier findet die eigentliche Webentwicklung statt. Enthält:
- HTML-Seiten
- Projektordner (z. B. `standardtisch`)
- Bilder & Icons
- Python-Umgebung (`.venv`)
- globale Assets

### `deploy/` – Veröffentlichte Version
Ziel für optimierte Bilder, minifizierte CSS/JS und finale HTML-Versionen.
Nur Output, keine Entwicklungsdateien.

### `Abbildungen/` – Rohmaterial
Archiv für unbearbeitete oder hochauflösende Bilder.

### `Python-Tools/` – Hilfsprogramme
Skripte für PDF-Extraktion, Icon-Extraktion, Bildverarbeitung und interne Automatisierungen.

### Projektordner (z. B. `develop/standardtisch/`)
Enthält `index.html`, Bilder, Zeichnungen, Stücklisten und Skripte.
Projekte bleiben autark und sauber strukturiert.

---

## Arbeitsweise

**Entwicklung:**
- HTML-Seiten und Inhalte in `develop/` bearbeiten
- Projektordner enthalten alle projektspezifischen Dateien
- Globale Assets (Icons, CSS, JS) zentral in `develop/`

**Deployment:**
- Fertige Versionen nach `deploy/` exportieren
- Keine Tools oder Rohdaten in `deploy/`

**Tools:**
- Python-Skripte bleiben in `Python-Tools/`
- `.venv` bleibt in `develop/`

**Zeichencodierung (wichtig):**
- Alle Textdateien (`.html`, `.css`, `.js`, `.md`, `.json`, `.xml`) in **UTF-8** speichern.
- Keine ANSI/Windows-1252-Konvertierung verwenden, um Mojibake (z. B. `Ã¤`, `â€”`) zu vermeiden.
- Projektweite Standardwerte sind in `.editorconfig` definiert.

---

## Vorteile dieser Struktur

- Klare Trennung zwischen Entwicklung, Deployment und Tools
- Saubere Projektkapselung (z. B. `standardtisch`)
- Keine Vermischung von Rohmaterial und Web-Assets
- Skalierbar für weitere Projekte
- Leicht versionierbar

---

## Projekt-Template

```
projektname/
├── index.html
├── bilder/
├── zeichnungen/
├── stuecklisten/
└── scripts/
```
