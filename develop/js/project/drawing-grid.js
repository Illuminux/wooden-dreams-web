/**
 * @file drawing-grid.js
 * @brief Rendering fuer Zeichnungs-Grid inklusive PDF-Links.
 * @copyright Copyright (C) 2026 Knut's Wooden Dreams
 * @license GPL-3.0-only
 */

/**
 * @function renderDrawingGrid
 * @brief Rendert Vorschaubilder und PDF-Links fuer eine Zeichnungssektion.
 * @param {string} containerId ID des Zielcontainers.
 * @param {string} fileName Dateibasis fuer Bild- und PDF-Pfade.
 * @param {Array<number|string>} pages Seitennummern der Zeichnungen.
 * @param {string} sectionTitle Titel der Sektion fuer Alt- und ARIA-Texte.
 * @returns {void}
 */
function renderDrawingGrid(containerId, fileName, pages, sectionTitle) {
  /** @type {HTMLElement|null} */
  const grid = document.getElementById(containerId);
  if (!grid || !pages || pages.length === 0 || !sectionTitle) return;

  // Idempotent rendern: bei erneutem Aufruf bestehende Einträge entfernen.
  grid.replaceChildren();

  /** @type {string} */
  const basePath = fileName ? `./${fileName}/` : '';

  /** @type {Array<string>} */
  const imagePaths = pages.map((p) => {
    if (p && typeof p === 'object' && p.src) {
      return p.src;
    }
    const num = String(p).padStart(2, '0');
    return `${basePath}${num}_${fileName}.png`;
  });

  pages.forEach((page, idx) => {
    /** @type {string} */
    let imageSrc;
    /** @type {string} */
    let caption = '';
    /** @type {string} */
    let pdfPath;

    if (page && typeof page === 'object' && page.src) {
      imageSrc = page.src;
      caption = page.caption || `Seite ${idx + 1}`;
      pdfPath = page.pdf || '';
    } else {
      const num = String(page).padStart(2, '0');
      imageSrc = imagePaths[idx];
      caption = String(page);
      pdfPath = `${basePath}${num}_${fileName}.pdf`;
    }

    /** @type {HTMLDivElement} */
    const wrapper = document.createElement('div');
    wrapper.className = 'drawing-thumb';

    /** @type {HTMLImageElement} */
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = `${sectionTitle} ${caption}`;
    img.loading = 'lazy';
    img.onclick = () => window.openLightbox(imagePaths, pages, idx, sectionTitle);
    img.onkeydown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.openLightbox(imagePaths, pages, idx, sectionTitle);
      }
    };
    img.setAttribute('role', 'button');
    img.setAttribute('tabindex', '0');
    img.setAttribute('aria-label', `${sectionTitle} ${caption} in Lightbox öffnen`);

    wrapper.appendChild(img);

    if (pdfPath) {
      /** @type {HTMLAnchorElement} */
      const pdf = document.createElement('a');
      pdf.href = pdfPath;
      pdf.className = 'pdf-download';
      pdf.textContent = 'PDF';
      pdf.target = '_blank';
      pdf.rel = 'noopener noreferrer';
      pdf.setAttribute('aria-label', `${sectionTitle} ${caption} als PDF in neuem Tab öffnen`);
      wrapper.appendChild(pdf);
    }

    grid.appendChild(wrapper);
  });
}

window.renderDrawingGrid = renderDrawingGrid;
