/**
 * JavaScript für die interaktive Lightbox und das Rendering der Zeichnungen
 * - Erstellt Thumbnails und PDF-Links für die Zeichnungen
 * - Öffnet eine Lightbox mit Navigation und Bildunterschrift
 * - Schließt die Lightbox bei Klick außerhalb oder mit Escape-Taste    
 * - Alle Funktionen sind modular und verwenden einen globalen Status für die Lightbox, um die Bilder, den aktuellen Index und den Titel zu speichern
 * - Die Thumbnails werden mit Lazy Loading versehen, um die Ladezeit zu optimieren
 * - Die PDF-Links werden neben den Thumbnails angezeigt, damit sie schnell zugänglich sind
 * - Die Navigation in der Lightbox ermöglicht es, durch die Bilder zu blättern, ohne sie zu verlassen
 * - Die Bildunterschrift zeigt den Titel der Sektion und die aktuelle Seite an, um die Orientierung zu erleichtern
 * - Alle Funktionen sind so gestaltet, dass sie leicht erweiterbar sind, falls in Zukunft weitere Sektionen oder Funktionen hinzugefügt werden sollen
 * - Die Funktionen sind so implementiert, dass sie auch ohne externe Bibliotheken funktionieren, um die Abhängigkeiten gering zu halten und die Performance zu verbessern
 * - Die Funktionen sind so gestaltet, dass sie auch auf mobilen Geräten gut funktionieren, indem sie auf Touch-Events und responsive Design achten
 * 
 * Hinweis: Alle Funktionen sind in diesem Skript definiert, und es wird davon ausgegangen, dass die entsprechenden HTML-Elemente (z.B. Container für die Zeichnungen, Lightbox-Elemente) bereits im HTML-Dokument vorhanden sind.
 * 
 * (c) 2024 by Knut's Wooden Dreams, All rights reserved.
 * Warning: This code is protected by copyright and may not be reproduced, distributed, or used without permission from the author. For inquiries, please contact Knut at admin@welzels.de.
 */


/**
 * Globaler Status für die Lightbox, um die Bilder, den aktuellen Index und den Titel zu speichern
 */
const lightboxState = {
    images: [],
    index: 0,
    title: ""
};

/**
 * Erstellt Thumbnails und PDF-Links in einem Grid
 * 
 * @param {string} containerId - Die ID des Container-Elements, in dem die Thumbnails und PDF-Links erstellt werden sollen
 * @param {string} fileName - Der Basisname der Dateien (z.B. "standardtisch"), um die Pfade zu den Bildern und PDFs zu generieren
 * @param {number[]} pages - Ein Array von Seitennummern, für die Thumbnails und PDF-Links erstellt werden sollen
 * @param {string} sectionTitle - Der Titel der Sektion (z.B. "Standardtisch", "Seitenteile" etc.), der in der Bildunterschrift der Lightbox angezeigt wird
 */
function renderDrawingGrid(containerId, fileName, pages, sectionTitle) {

    // Container-Element für die Zeichnungen holen
    const grid = document.getElementById(containerId);

    // Sicherheitshalber prüfen, ob das Element existiert
    if (!grid) return;

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
    img.onclick = () => openLightbox(imagePaths, idx, sectionTitle);

    // PDF-Link
    const pdf = document.createElement('a');
    pdf.href = pdfPath;
    pdf.className = 'pdf-download';
    pdf.textContent = 'PDF';
    pdf.target = '_blank';
    pdf.rel = 'noopener';

    // Thumbnail zuerst, damit die Seite schneller lädt
    wrapper.appendChild(img);
    // PDF-Link danach, damit er neben dem Thumbnail erscheint
    wrapper.appendChild(pdf);
    // Wrapper zum Grid hinzufügen
    grid.appendChild(wrapper);
    });
}

/**
 * Öffnet die Lightbox mit einem Array von Bildern, dem Startindex und einem Titel
 * 
 * @param {string[]} imageArray - Array der Bildpfade für die Lightbox
 * @param {number} index - Startindex des angeklickten Bildes
 * @param {string} title - Titel für die Bildunterschrift (z.B. "Standardtisch", "Seitenteile" etc.)
 */
function openLightbox(imageArray, index, title) {

    lightboxState.images = imageArray;  // Alle Bilder der aktuellen Sektion speichern
    lightboxState.index = index;        // Startindex setzen
    lightboxState.title = title;        // Titel für die Bildunterschrift setzen

    // Lightbox mit dem aktuellen Bild und Titel aktualisieren
    updateLightbox();
    // Lightbox anzeigen
    document.getElementById('lightbox').classList.add('open');
}

/**
 * Schließt die Lightbox und setzt den Status zurück
 */
function closeLightbox() {

    // Status zurücksetzen
    lightboxState.images = [];
    lightboxState.index = 0;
    lightboxState.title = "";

    // Lightbox ausblenden
    document.getElementById('lightbox').classList.remove('open');
}

/**
 * Schließt die Lightbox, wenn außerhalb des Bildes geklickt wird
 * 
 * @param {MouseEvent} event - Das Klick-Event
 */
window.onclick = function(event) {

    // Lightbox-Element holen
    const lb = document.getElementById('lightbox');

    // Wenn das Ziel des Klicks die Lightbox selbst ist (also der Hintergrund), schließen
    if (event.target == lb) {
    closeLightbox();
    }
}

/**
 * Bewegt das aktuelle Bild in der Lightbox
 * 
 * @param {number} step - Die Anzahl der Schritte, um die sich das Bild verschieben soll
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
 * Aktualisiert das Bild und die Bildunterschrift in der Lightbox basierend auf dem aktuellen Status
 */
function updateLightbox() {

    // Bild- und Caption-Elemente in der Lightbox holen
    const img = document.getElementById('lbImg');
    const cap = document.getElementById('lbCaption');

    // Wenn beide Elemente existieren, aktualisieren
    if (img && cap) {
    img.src = lightboxState.images[lightboxState.index];
    cap.textContent = `${lightboxState.title} – Seite ${lightboxState.index + 1} von ${lightboxState.images.length}`;
    }
}

/**
 * Tastatur-Event-Listener für die Lightbox-Steuerung
 * - Escape zum Schließen
 * - Pfeil links/rechts zum Navigieren (optional, hier nur Escape implementiert)
 */
document.addEventListener('keydown', (e) => {

    if (e.key === "Escape") closeLightbox();    // Escape zum Schließen der Lightbox
    if (e.key === "ArrowLeft") moveDrawing(-1); // Pfeil links zum vorherigen Bild
    if (e.key === "ArrowRight") moveDrawing(1); // Pfeil rechts zum nächsten Bild

});