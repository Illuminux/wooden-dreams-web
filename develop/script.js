/**
 * JavaScript für die interaktive Lightbox und das Rendering der Zeichnungen
 * - Erstellt Thumbnails und PDF-Links für die Zeichnungen
 * - Öffnet eine Lightbox mit Navigation und Bildunterschrift
 * - Schließt die Lightbox bei Klick außerhalb oder mit Escape-Taste
 * - Alle Funktionen sind modular und verwenden einen globalen Status für
 *   die Lightbox, um die Bilder, den aktuellen Index und den Titel zu
 *   speichern
 * - Die Thumbnails werden mit Lazy Loading versehen, um die Ladezeit zu
 *   optimieren
 * - Die PDF-Links werden neben den Thumbnails angezeigt, damit sie schnell
 *   zugänglich sind
 * - Die Navigation in der Lightbox ermöglicht es, durch die Bilder zu
 *   blättern, ohne sie zu verlassen
 * - Die Bildunterschrift zeigt den Titel der Sektion und die aktuelle Seite
 *   an, um die Orientierung zu erleichtern
 * - Alle Funktionen sind so gestaltet, dass sie leicht erweiterbar sind,
 *   falls in Zukunft weitere Sektionen oder Funktionen hinzugefügt werden
 *   sollen
 * - Die Funktionen sind so implementiert, dass sie auch ohne externe
 *   Bibliotheken funktionieren, um die Abhängigkeiten gering zu halten und
 *   die Performance zu verbessern
 * - Die Funktionen sind so gestaltet, dass sie auch auf mobilen Geräten gut
 *   funktionieren, indem sie auf Touch-Events und responsive Design achten
 * 
 * Hinweis: Alle Funktionen sind in diesem Skript definiert, und es wird
 * davon ausgegangen, dass die entsprechenden HTML-Elemente (z.B. Container
 * für die Zeichnungen, Lightbox-Elemente) bereits im HTML-Dokument vorhanden
 * sind.
 * 
 * © 2026 by Knut's Wooden Dreams, All rights reserved.
 * Warning: This code is protected by copyright and may not be reproduced,
 * distributed, or used without permission from the author. For inquiries,
 * please contact Knut at admin@welzels.de.
 */


/**
 * Globaler Status für die Lightbox, um die Bilder, den aktuellen Index
 * und den Titel zu speichern
 */
const lightboxState = {
    images: [],
    pages: [],
    index: 0,
    title: "",
    lastFocusedElement: null,
    touchStartX: 0,
    touchEndX: 0
};

/**
 * Erstellt Thumbnails und PDF-Links in einem Grid
 * 
 * @param {string} containerId - Die ID des Container-Elements, in dem die
 *                                Thumbnails und PDF-Links erstellt werden
 *                                sollen
 * @param {string} fileName - Der Basisname der Dateien (z.B.
 *                            "standardtisch"), um die Pfade zu den Bildern
 *                            und PDFs zu generieren
 * @param {number[]} pages - Ein Array von Seitennummern, für die Thumbnails
 *                           und PDF-Links erstellt werden sollen
 * @param {string} sectionTitle - Der Titel der Sektion (z.B.
 *                                "Standardtisch", "Seitenteile" etc.), der
 *                                in der Bildunterschrift der Lightbox
 *                                angezeigt wird
 */
function renderDrawingGrid(containerId, fileName, pages, sectionTitle) {

    // Container-Element für die Zeichnungen holen
    const grid = document.getElementById(containerId);

    // Sicherheitshalber prüfen, ob das Element existiert und Parameter
    // valide sind
    if (!grid || !pages || pages.length === 0 || !fileName || !sectionTitle) return;

    // Vor erneutem Rendern vorhandene Einträge entfernen, damit der Aufbau
    // idempotent bleibt.
    grid.replaceChildren();

    // Basis-Pfad zu den Bildern und PDFs
    const basePath = `./${fileName}/`;

    // Alle Bildpfade für die angegebenen Seiten generieren
    const imagePaths = pages.map(p => `${basePath}${String(p).padStart(2, '0')}_${fileName}.png`);

    // Für jede Seite ein Thumbnail und einen PDF-Link erstellen
    pages.forEach((page, idx) => {
        // PDF-Pfad generieren (gleiche Nummer wie das Bild, aber mit .pdf)
        const num = String(page).padStart(2, '0');
        const pdfPath = `${basePath}${num}_${fileName}.pdf`;

        // Wrapper für Thumbnail und PDF-Link
        const wrapper = document.createElement('div');
        wrapper.className = 'drawing-thumb';
    
        // Thumbnail Image
        const img = document.createElement('img');
        img.src = imagePaths[idx];
        img.alt = `${sectionTitle} Seite ${page}`;
        img.loading = 'lazy';
        img.onclick = () => openLightbox(imagePaths, pages, idx, sectionTitle);
        img.onkeydown = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(imagePaths, pages, idx, sectionTitle);
            }
        };
        img.setAttribute('role', 'button');
        img.setAttribute('tabindex', '0');
        img.setAttribute('aria-label', `${sectionTitle} Seite ${page} in Lightbox öffnen`);

        // PDF-Link
        const pdf = document.createElement('a');
        pdf.href = pdfPath;
        pdf.className = 'pdf-download';
        pdf.textContent = 'PDF';
        pdf.target = '_blank';
        pdf.rel = 'noopener noreferrer';
        pdf.setAttribute('aria-label', `${sectionTitle} Seite ${page} als PDF in neuem Tab öffnen`);

        // Thumbnail zuerst, damit die Seite schneller lädt
        wrapper.appendChild(img);
        // PDF-Link danach, damit er neben dem Thumbnail erscheint
        wrapper.appendChild(pdf);
        // Wrapper zum Grid hinzufügen
        grid.appendChild(wrapper);
    });
}

/**
 * Baut ein dynamisches Inhaltsverzeichnis für Projektseiten.
 *
 * Verwendung im HTML:
 * <nav class="project-toc" data-toc-root=".project-article"
 *      data-toc-sections="section[id]" data-toc-heading-level="2">
 *   <ul class="project-toc__list"></ul>
 * </nav>
 */
function getProjectNavItems(rootSelector, sectionsSelector, headingLevel, labelAttrName) {
    const root = document.querySelector(rootSelector);
    if (!root || Number.isNaN(headingLevel) || headingLevel < 1 || headingLevel > 6) {
        return [];
    }

    const headingTag = `H${headingLevel}`;
    const sections = Array.from(root.querySelectorAll(sectionsSelector));

    return sections
        .map((section) => {
            if (!section.id) return null;

            const directHeading = Array.from(section.children).find(
                (node) => node.tagName === headingTag
            );
            if (!directHeading) return null;

            const label = (
                section.getAttribute(labelAttrName) ||
                section.getAttribute('data-toc-label') ||
                directHeading.textContent ||
                ''
            )
                .replace(/\s+/g, ' ')
                .trim();

            if (!label) return null;
            return { id: section.id, label };
        })
        .filter(Boolean);
}

function initProjectToc() {
    const tocs = document.querySelectorAll('.project-toc');
    if (!tocs.length) return;

    tocs.forEach((toc) => {
        const list = toc.querySelector('.project-toc__list');
        if (!list) return;

        const rootSelector = toc.getAttribute('data-toc-root') || 'main';
        const sectionsSelector = toc.getAttribute('data-toc-sections') || 'section[id]';
        const headingLevel = Number.parseInt(
            toc.getAttribute('data-toc-heading-level') || '2',
            10
        );
        const items = getProjectNavItems(rootSelector, sectionsSelector, headingLevel, 'data-toc-label');

        list.innerHTML = '';

        if (!items.length) {
            toc.hidden = true;
            return;
        }

        items.forEach((item) => {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${item.id}`;
            link.textContent = item.label;
            li.appendChild(link);
            list.appendChild(li);
        });

        toc.hidden = false;
    });
}

/**
 * Baut optionale Abschnitts-Sprunglinks unter Hero/Viewer
 * aus derselben Quelle wie das TOC, damit Labels konsistent bleiben.
 */
function initProjectJumpLinks() {
    const jumpNavs = document.querySelectorAll('.project-jump-links');
    if (!jumpNavs.length) return;

    jumpNavs.forEach((nav) => {
        const rootSelector = nav.getAttribute('data-toc-root') || '.project-article';
        const sectionsSelector = nav.getAttribute('data-toc-sections') || 'section[id]';
        const headingLevel = Number.parseInt(
            nav.getAttribute('data-toc-heading-level') || '2',
            10
        );
        const maxItems = Number.parseInt(nav.getAttribute('data-jump-max') || '5', 10);

        nav.innerHTML = '';
        const items = getProjectNavItems(rootSelector, sectionsSelector, headingLevel, 'data-jump-label');
        if (!items.length) {
            nav.hidden = true;
            return;
        }

        items.slice(0, Number.isNaN(maxItems) ? 5 : maxItems).forEach((item) => {
            const link = document.createElement('a');
            link.href = `#${item.id}`;
            link.textContent = item.label;
            nav.appendChild(link);
        });

        nav.hidden = false;
    });
}

/**
 * Öffnet die Lightbox mit einem Array von Bildern, dem Startindex und
 * einem Titel
 * 
 * @param {string[]} imageArray - Array der Bildpfade für die Lightbox
 * @param {number[]} pageNumbers - Array der echten Zeichnungsseiten
 * @param {number} index - Startindex des angeklickten Bildes
 * @param {string} title - Titel für die Bildunterschrift (z.B.
 *                         "Standardtisch", "Seitenteile" etc.)
 */
function openLightbox(imageArray, pageNumbers, index, title) {

    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    // Aktuell fokussiertes Element speichern für späteren Fokus-Restore
    lightboxState.lastFocusedElement = document.activeElement;

    lightboxState.images = imageArray;      // Alle Bilder der aktuellen Sektion
    lightboxState.pages = pageNumbers || []; // Echte Zeichnungsseiten merken
    lightboxState.index = index;            // Startindex setzen
    lightboxState.title = title;            // Titel für Bildunterschrift setzen

    // Lightbox mit dem aktuellen Bild und Titel aktualisieren
    updateLightbox();
    // Lightbox anzeigen und ARIA-Attribute setzen
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');

    // Fokus in die Lightbox setzen
    const closeBtn = lightbox.querySelector('[data-close]') ||
                     lightbox.querySelector('button') || lightbox;
    if (closeBtn.focus) closeBtn.focus();
}

/**
 * Schließt die Lightbox und setzt den Status zurück
 */
function closeLightbox() {

    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    // Lightbox ausblenden und ARIA-Attribute setzen
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');

    // Fokus zum ursprünglichen Element zurücksetzen
    if (lightboxState.lastFocusedElement) {
        lightboxState.lastFocusedElement.focus();
    }

    // Status zurücksetzen
    lightboxState.images = [];
    lightboxState.pages = [];
    lightboxState.index = 0;
    lightboxState.title = "";
    lightboxState.lastFocusedElement = null;
    lightboxState.touchStartX = 0;
    lightboxState.touchEndX = 0;
}

/**
 * Initialisiert Event Listener nach dem DOM-Laden
 */
document.addEventListener('DOMContentLoaded', function() {

    // Dynamische Schnellnavigation für Projektseiten erzeugen
    initProjectToc();
    initProjectJumpLinks();

    /**
     * Schließt die Lightbox, wenn außerhalb des Bildes geklickt wird
     */
    window.addEventListener('click', function(event) {
        const lb = document.getElementById('lightbox');
        if (event.target === lb) {
            closeLightbox();
        }
    });

    /**
     * Focus Trap: Verhindert, dass der Fokus die Lightbox verlässt
     */
    document.addEventListener('focusin', function(event) {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox || !lightbox.classList.contains('open')) return;

        if (!lightbox.contains(event.target)) {
            event.preventDefault();
            const closeBtn = lightbox.querySelector('[data-close]') ||
                             lightbox.querySelector('button');
            if (closeBtn) closeBtn.focus();
        }
    });

    /**
     * Touch-Events für Swipe-Navigation auf mobilen Geräten
     */
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('touchstart', function(event) {
            if (!lightbox.classList.contains('open')) return;
            lightboxState.touchStartX = event.changedTouches[0].screenX;
        }, { passive: true });

        lightbox.addEventListener('touchend', function(event) {
            if (!lightbox.classList.contains('open')) return;
            lightboxState.touchEndX = event.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    /**
     * Tastatur-Event-Listener für die Lightbox-Steuerung
     */
    document.addEventListener('keydown', (e) => {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox || !lightbox.classList.contains('open')) return;

        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") moveDrawing(-1);
        if (e.key === "ArrowRight") moveDrawing(1);
    });
});

/**
 * Bewegt das aktuelle Bild in der Lightbox
 * 
 * @param {number} step - Die Anzahl der Schritte, um die sich das Bild
 *                        verschieben soll
 */
function moveDrawing(step) {

    // Anzahl der Bilder in der aktuellen Sektion holen
    const len = lightboxState.images.length;
    
    // Wenn es keine Bilder gibt, nicht verschieben
    if (len === 0) return;

    // Index um den Schritt verschieben, mit Wrap-Around
    lightboxState.index = (lightboxState.index + step + len) % len;

    // Lightbox mit dem neuen Bild aktualisieren
    updateLightbox();
}

/**
 * Verarbeitet Swipe-Gesten für die Navigation
 */
function handleSwipe() {
    const minSwipeDistance = 50;
    const distance = lightboxState.touchEndX - lightboxState.touchStartX;

    if (Math.abs(distance) < minSwipeDistance) return;

    if (distance > 0) {
        // Swipe nach rechts = vorheriges Bild
        moveDrawing(-1);
    } else {
        // Swipe nach links = nächstes Bild
        moveDrawing(1);
    }
}

/**
 * Aktualisiert das Bild und die Bildunterschrift in der Lightbox basierend
 * auf dem aktuellen Status
 */
function updateLightbox() {

    // Bild- und Caption-Elemente in der Lightbox holen
    const img = document.getElementById('lbImg');
    const cap = document.getElementById('lbCaption');

    // Wenn beide Elemente existieren, aktualisieren
    if (img && cap) {
        const currentPage = lightboxState.pages[lightboxState.index] || lightboxState.index + 1;
        img.src = lightboxState.images[lightboxState.index];
        img.alt = `${lightboxState.title} – Zeichnung Seite ${currentPage}`;
        cap.textContent = `${lightboxState.title} – Zeichnung Seite ${currentPage}`;
        
        // Live-Region für Screenreader (falls noch nicht gesetzt)
        if (!cap.hasAttribute('aria-live')) {
            cap.setAttribute('aria-live', 'polite');
            cap.setAttribute('aria-atomic', 'true');
        }
    }
}
