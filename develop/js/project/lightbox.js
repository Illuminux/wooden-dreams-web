/**
 * Lightbox-Logik für Projektseiten
 */
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

function openLightbox(imageArray, pageNumbers, index, title) {
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

function closeLightbox() {
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

function moveDrawing(step) {
  const len = lightboxState.images.length;
  if (len === 0) return;

  lightboxState.index = (lightboxState.index + step + len) % len;
  updateLightbox();
}

function handleSwipe() {
  const minSwipeDistance = 50;
  const distance = lightboxState.touchEndX - lightboxState.touchStartX;

  if (Math.abs(distance) < minSwipeDistance) return;

  if (distance > 0) {
    moveDrawing(-1);
  } else {
    moveDrawing(1);
  }
}

function updateLightbox() {
  const img = document.getElementById('lbImg');
  const cap = document.getElementById('lbCaption');

  if (!img || !cap) return;

  const currentPage = lightboxState.pages[lightboxState.index] || lightboxState.index + 1;

  img.src = lightboxState.images[lightboxState.index];
  img.alt = `${lightboxState.title} – Zeichnung Seite ${currentPage}`;
  cap.textContent = `${lightboxState.title} – Zeichnung Seite ${currentPage}`;

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
