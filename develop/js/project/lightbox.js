/**
 * @file lightbox.js
 * @brief Lightbox-Logik fuer Projektseiten.
 * @copyright Copyright (C) 2026 Knut's Wooden Dreams
 * @license GPL-3.0-only
 */

/**
 * @typedef {Object} LightboxState
 * @property {string[]} images Aktuelle Bildpfade in der Lightbox.
 * @property {Array<number|string|{caption?: string}>} pages Aktuelle Seitenbezeichnungen.
 * @property {number} index Aktueller Bildindex.
 * @property {string} title Titel der Zeichnungsserie.
 * @property {Element|null} lastFocusedElement Fokusziel vor dem Oeffnen.
 * @property {number} touchStartX Startposition fuer Swipe-Geste.
 * @property {number} touchEndX Endposition fuer Swipe-Geste.
 */

/** @type {LightboxState} */
const lightboxState = window.lightboxState || {
  images: [],
  pages: [],
  index: 0,
  title: '',
  lastFocusedElement: null,
  touchStartX: 0,
  touchEndX: 0
};

window.lightboxState = lightboxState;

/**
 * @function openLightbox
 * @brief Oeffnet die Lightbox mit einer Bildserie.
 * @param {string[]} imageArray Bildpfade der Serie.
 * @param {Array<number|string|{caption?: string}>} pageNumbers Zugehoerige Seitenbezeichnungen.
 * @param {number} index Startindex.
 * @param {string} title Titel fuer Caption und Alt-Text.
 * @returns {void}
 */
function openLightbox(imageArray, pageNumbers, index, title) {
  /** @type {HTMLElement|null} */
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  lightboxState.lastFocusedElement = document.activeElement;
  lightboxState.images = imageArray;
  lightboxState.pages = pageNumbers || [];
  lightboxState.index = index;
  lightboxState.title = title;

  updateLightbox();

  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');

  const closeBtn = lightbox.querySelector('[data-close]') ||
    lightbox.querySelector('button') ||
    lightbox;

  if (closeBtn.focus) closeBtn.focus();
}

/**
 * @function closeLightbox
 * @brief Schliesst die Lightbox und stellt Fokus/Status wieder her.
 * @returns {void}
 */
function closeLightbox() {
  /** @type {HTMLElement|null} */
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');

  if (lightboxState.lastFocusedElement) {
    lightboxState.lastFocusedElement.focus();
  }

  lightboxState.images = [];
  lightboxState.pages = [];
  lightboxState.index = 0;
  lightboxState.title = '';
  lightboxState.lastFocusedElement = null;
  lightboxState.touchStartX = 0;
  lightboxState.touchEndX = 0;
}

/**
 * @function moveDrawing
 * @brief Wechselt zyklisch zum naechsten oder vorherigen Bild.
 * @param {number} step Richtung und Schrittweite (-1 oder +1).
 * @returns {void}
 */
function moveDrawing(step) {
  /** @type {number} */
  const len = lightboxState.images.length;
  if (len === 0) return;

  lightboxState.index = (lightboxState.index + step + len) % len;
  updateLightbox();
}

/**
 * @function handleSwipe
 * @brief Interpretiert Touch-Geste als Vor/Zurueck-Navigation.
 * @returns {void}
 */
function handleSwipe() {
  /** @type {number} */
  const minSwipeDistance = 50;
  /** @type {number} */
  const distance = lightboxState.touchEndX - lightboxState.touchStartX;

  if (Math.abs(distance) < minSwipeDistance) return;

  if (distance > 0) {
    moveDrawing(-1);
  } else {
    moveDrawing(1);
  }
}

/**
 * @function getLightboxPageLabel
 * @brief Ermittelt die lesbare Seitenbezeichnung fuer Caption und Alt-Text.
 * @returns {string}
 */
function getLightboxPageLabel() {
  /** @type {number|string|{caption?: string}|undefined} */
  const currentPage = lightboxState.pages[lightboxState.index];

  if (currentPage && typeof currentPage === 'object') {
    return currentPage.caption || String(lightboxState.index + 1);
  }

  if (typeof currentPage === 'number' || typeof currentPage === 'string') {
    return String(currentPage);
  }

  return String(lightboxState.index + 1);
}

/**
 * @function updateLightbox
 * @brief Aktualisiert Bild, Alt-Text und Caption der Lightbox.
 * @returns {void}
 */
function updateLightbox() {
  /** @type {HTMLImageElement|null} */
  const img = document.getElementById('lbImg');
  /** @type {HTMLElement|null} */
  const cap = document.getElementById('lbCaption');

  if (!img || !cap) return;

  /** @type {string} */
  const currentPageLabel = getLightboxPageLabel();

  img.src = lightboxState.images[lightboxState.index];
  img.alt = `${lightboxState.title} – Zeichnung Seite ${currentPageLabel}`;
  cap.textContent = `${lightboxState.title} – Zeichnung Seite ${currentPageLabel}`;

  if (!cap.hasAttribute('aria-live')) {
    cap.setAttribute('aria-live', 'polite');
    cap.setAttribute('aria-atomic', 'true');
  }
}

window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.moveDrawing = moveDrawing;
window.handleSwipe = handleSwipe;
window.updateLightbox = updateLightbox;
