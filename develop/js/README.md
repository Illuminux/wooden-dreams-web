# JS-Struktur und Zuständigkeiten

Diese Datei dokumentiert den Aufbau des Verzeichnisses `develop/js`.
Ziel ist eine klare Trennung zwischen globalen Seitenskripten und projektbezogenen Funktionen.

## Verzeichnisstruktur

- `contact-form.js`: Validierung, UX und Versandlogik für das Kontaktformular.
- `footer.js`: Footer-bezogene Interaktionen/Injection.
- `graphcomment.js`: Einbindung und Initialisierung von GraphComment.
- `header.js`: Header/Navigations-Initialisierung auf Seitenebene.
- `newsletter.js`: Newsletter-Formularlogik (Validierung, Feedback, Request-Handling).
- `projects.js`: Logik für Projektübersichten/Projektdaten auf Listenseiten.
- `tools.js`: Logik für Werkzeugdaten und Darstellung auf der Werkzeugseite.

Unterordner:

- `project/drawing-grid.js`: Interaktion für Zeichnungs-Grid/Thumbnails.
- `project/init.js`: Projektseiten-Bootstrap (Startpunkt für projektbezogene Features).
- `project/lightbox.js`: Lightbox-Verhalten für Bilder/Zeichnungen.
- `project/navigation.js`: Projektinterne Navigation (z. B. Sprunglinks/TOC-bezogen).

## Trennregel für neue Skripte

- Allgemeine oder seitenübergreifende Skripte kommen in `develop/js/`.
- Skripte, die nur innerhalb einzelner Projektseiten laufen, kommen in `develop/js/project/`.

## Kategorie-Filter auf der Projektübersicht

Die Projektübersicht in `knuts-wooden-dreams.html` wird in `projects.js` über den Query-Parameter `category` gefiltert.

- Kein Parameter oder `?category=all`: alle Kategorien sichtbar.
- `?category=werkstattausstattung`: nur Werkstattausstattung.
- `?category=gartenmoebel`: nur Gartenmöbel.
- `?category=inneneinrichtung`: nur Inneneinrichtung.

Wichtig:

- Kategorie-Links in Header, Breadcrumbs und Projektnavigation verwenden `?category=...` (nicht `#...`).
- Ungültige Werte fallen im Rendering auf die Ansicht `all` zurück.

## Kurz-Check vor neuen Änderungen

1. Ist die Funktion global oder nur projektseitig?
2. Gibt es bereits ein passendes Modul, das erweitert werden kann?
3. Werden Selektoren/IDs verwendet, die nur auf bestimmten Seiten existieren (Guard einbauen)?
4. Bleiben Initialisierung und Feature-Logik getrennt (Bootstrap vs. Modul)?