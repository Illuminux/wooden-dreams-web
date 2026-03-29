/**
 * Rendering für Zeichnungs-Grid inklusive PDF-Links
 */
function renderDrawingGrid(containerId, fileName, pages, sectionTitle) {
  const grid = document.getElementById(containerId);
  if (!grid || !pages || pages.length === 0 || !fileName || !sectionTitle) return;

  // Idempotent rendern: bei erneutem Aufruf bestehende Einträge entfernen.
  grid.replaceChildren();

  const basePath = `./${fileName}/`;
  const imagePaths = pages.map((p) => `${basePath}${String(p).padStart(2, '0')}_${fileName}.png`);

  pages.forEach((page, idx) => {
    const num = String(page).padStart(2, '0');
    const pdfPath = `${basePath}${num}_${fileName}.pdf`;

    const wrapper = document.createElement('div');
    wrapper.className = 'drawing-thumb';

    const img = document.createElement('img');
    img.src = imagePaths[idx];
    img.alt = `${sectionTitle} Seite ${page}`;
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
    img.setAttribute('aria-label', `${sectionTitle} Seite ${page} in Lightbox öffnen`);

    const pdf = document.createElement('a');
    pdf.href = pdfPath;
    pdf.className = 'pdf-download';
    pdf.textContent = 'PDF';
    pdf.target = '_blank';
    pdf.rel = 'noopener noreferrer';
    pdf.setAttribute('aria-label', `${sectionTitle} Seite ${page} als PDF in neuem Tab öffnen`);

    wrapper.appendChild(img);
    wrapper.appendChild(pdf);
    grid.appendChild(wrapper);
  });
}

window.renderDrawingGrid = renderDrawingGrid;
