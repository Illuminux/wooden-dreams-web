# Datenstruktur und Zuständigkeiten

Diese Datei dokumentiert den Aufbau des Verzeichnisses `develop/data`.
Ziel ist eine stabile, nachvollziehbare Datenbasis für dynamisch gerenderte Inhalte.

## Verzeichnisinhalt

- `projects.json`: Datenquelle für Projektlisten und Featured-Projekt.
- `tools.json`: Datenquelle für Werkzeugkategorien und Werkzeugkarten.

## Verwendung im Frontend

- `develop/js/projects.js` lädt und rendert `projects.json`.
- `develop/js/tools.js` lädt und rendert `tools.json`.

## Schema: projects.json

Top-Level:

- `featuredProjectSlug` (optional, string): Slug des bevorzugten Featured-Projekts.
- `categories` (array): Liste von Projektkategorien.

Kategorieobjekt:

- `id` (optional, string): Anker-ID für die erste Karte der Kategorie.
- `projects` (array): Liste der Projekte.

Projektobjekt:

- `slug` (optional, string): Eindeutiger Projekt-Slug.
- `title` (optional, string): Projekttitel.
- `tag` (optional, string): Kurzlabel/Kategorie.
- `area` (optional, string): Themenbereich.
- `url` (optional, string): Zielseite des Projekts.
- `excerpt` (optional, string): Kurzbeschreibung.
- `meta` (optional, string): Zusatztext für Featured-Ansicht.
- `featured` (optional, boolean): Alternative Markierung für Featured-Auswahl.
- `image` (optional, object): Bilddaten.

Bildobjekt (`image`):

- `src` (optional, string)
- `alt` (optional, string)
- `width` (optional, number|string)
- `height` (optional, number|string)

Featured-Auswahl in `projects.js` (Reihenfolge):

1. Projekt mit passendem `featuredProjectSlug`
2. Erstes Projekt mit `featured: true`
3. Erstes Projekt insgesamt

## Schema: tools.json

Top-Level:

- `categories` (array): Liste von Werkzeugkategorien.

Kategorieobjekt:

- `id` (optional, string): HTML-ID der Kategorie-Sektion.
- `label` (optional, string): Sichtbarer Kategoriename.
- `icon` (optional, string): Symbolname aus `develop/symbols` (ohne `.svg`).
- `tools` (array): Liste der Werkzeuge.

Werkzeugobjekt:

- `maker` (optional, string): Herstellername.
- `name` (optional, string): Anzeigename.
- `type` (optional, string): Kategorie-Label/Badge.
- `description` (optional, string): Kurzbeschreibung.
- `rating` (optional, number): Bewertung 0-5 (wird im Rendering defensiv begrenzt).
- `ratingText` (optional, string): Begründung zur Bewertung.
- `asin` (optional, string): Amazon-ASIN für Bild und Link.

## Datenregeln

1. JSON muss valides UTF-8 ohne Kommentare sein.
2. IDs/Slugs sollten stabil bleiben, damit Hash-Links und Verweise nicht brechen.
3. Pro Datei nur die dort vorgesehenen Domänen pflegen:
   - Projekte nur in `projects.json`
   - Werkzeuge nur in `tools.json`
4. Texte kurz halten; längere Inhalte gehören in die jeweiligen HTML-Detailseiten.
5. Bei neuen Symbolen sicherstellen, dass die passende SVG in `develop/symbols` existiert.

## Kurz-Check vor Commit

1. JSON ist syntaktisch gültig.
2. URLs/Dateipfade (`url`, `image.src`, `icon`) stimmen.
3. Featured-Logik für Projekte ist weiterhin eindeutig.
4. Neue oder geänderte Einträge werden auf der Seite korrekt gerendert.
