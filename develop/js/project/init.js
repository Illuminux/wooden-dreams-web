/**
 * @file init.js
 * @brief Initialisierung gemeinsamer Projektseiten-Interaktionen.
 * @copyright Copyright (C) 2026 Knut's Wooden Dreams
 * @license GPL-3.0-only
 */

/**
 * @event DOMContentLoaded
 * @brief Initialisiert TOC, Jump-Links und Lightbox-Interaktionen.
 */
document.addEventListener('DOMContentLoaded', function () {
  if (window.initProjectToc) window.initProjectToc();
  if (window.initProjectJumpLinks) window.initProjectJumpLinks();

  window.addEventListener('click', function (event) {
    /** @type {HTMLElement|null} */
    const lb = document.getElementById('lightbox');
    if (event.target === lb && window.closeLightbox) {
      window.closeLightbox();
    }
  });

  document.addEventListener('focusin', function (event) {
    /** @type {HTMLElement|null} */
    const lightbox = document.getElementById('lightbox');
    if (!lightbox || !lightbox.classList.contains('open')) return;

    if (!lightbox.contains(event.target)) {
      event.preventDefault();
      /** @type {HTMLElement|null} */
      const closeBtn = lightbox.querySelector('[data-close]') ||
        lightbox.querySelector('button');
      if (closeBtn) closeBtn.focus();
    }
  });

  /** @type {HTMLElement|null} */
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.addEventListener('touchstart', function (event) {
      if (!lightbox.classList.contains('open') || !window.lightboxState) return;
      window.lightboxState.touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', function (event) {
      if (!lightbox.classList.contains('open') || !window.lightboxState) return;
      window.lightboxState.touchEndX = event.changedTouches[0].screenX;
      if (window.handleSwipe) window.handleSwipe();
    }, { passive: true });
  }

  document.addEventListener('keydown', function (e) {
    /** @type {HTMLElement|null} */
    const lb = document.getElementById('lightbox');
    if (!lb || !lb.classList.contains('open')) return;

    if (e.key === 'Escape' && window.closeLightbox) window.closeLightbox();
    if (e.key === 'ArrowLeft' && window.moveDrawing) window.moveDrawing(-1);
    if (e.key === 'ArrowRight' && window.moveDrawing) window.moveDrawing(1);
  });
});
