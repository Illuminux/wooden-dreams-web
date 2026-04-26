# CSS-Struktur und Zuständigkeiten

Diese Datei beschreibt, welche Regeln in welches Stylesheet gehören.
Ziel ist eine klare Trennung ohne doppelte oder widersprüchliche Definitionen.

## Import-Reihenfolge

Die Reihenfolge wird zentral in `develop/main.css` gesteuert:

1. `variables.css`
2. `reset.css`
3. `animations.css`
4. `layout.css`
5. `components.css`
6. `tools.css`
7. `projects.css`

Spätere Dateien können frühere Regeln bewusst überschreiben.

## Datei-Zuständigkeiten

### variables.css

- Design-Tokens: Farben, Typografie, Spacing, Radius
- Keine konkreten Komponenten- oder Seitenregeln

### reset.css

- Browser-Reset und globale Basisregeln
- Grundverhalten wie `box-sizing`, `scroll-behavior`, reduced motion

### animations.css

- Nur Keyframes und zentrale Animation-Definitionen

### layout.css

- Seitenübergreifende Struktur und globale Inhaltsbasis
- Container, Header, Navigation, Footer, Section-Label
- Gemeinsame Typografie-Hierarchie (`h1` bis `h4`)
- Gemeinsamer Lesefluss für `.project-article`
- Gemeinsame `details/summary`-Basis im Inhaltskontext

### components.css

- Wiederverwendbare UI-Bausteine
- Buttons, Karten-Grundmuster, Newsletter, Kontaktformular, Lightbox
- Keine seiten-spezifischen Layoutentscheidungen

### tools.css

- Nur Werkzeugseiten und Tool-Katalog-Komponenten
- Tool-Grid, Tool-Card, Kategorie-Header der Werkzeugseite
- Keine projekt- oder artikel-spezifischen Inhaltsregeln

### projects.css

- Nur projekt-spezifische Erweiterungen
- Projekt-Hero, TOC, Jump-Links, Viewer, Drawings, Stücklisten
- Projekt-spezifische Sonderfälle in `.project-article` (z. B. Baugruppen)

## Entscheidungsregel für neue CSS-Regeln

Wenn eine Regel für mehrere Seitentypen gilt, gehört sie nach `layout.css` oder `components.css`.
Wenn sie nur für Werkzeugseiten gilt, gehört sie nach `tools.css`.
Wenn sie nur für Projektseiten gilt, gehört sie nach `projects.css`.

## Kurzer Review-Check bei CSS-Änderungen

1. Ist die Regel wirklich seiten-spezifisch?
2. Gibt es bereits eine globale Regel in `layout.css` oder Tokens in `variables.css`?
3. Entsteht durch die Änderung eine doppelte Definition in `tools.css` und `projects.css`?
4. Ist die Änderung mit der Import-Reihenfolge in `main.css` konsistent?
