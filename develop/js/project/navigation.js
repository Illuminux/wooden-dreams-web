/**
 * @file navigation.js
 * @brief Navigation fuer Projektseiten: TOC und Jump-Links.
 * @copyright Copyright (C) 2026 Knut's Wooden Dreams
 * @license GPL-3.0-only
 */

/**
 * @typedef {Object} ProjectNavItem
 * @property {string} id Section-ID als Linkziel.
 * @property {string} label Sichtbarer Linktext.
 */

/**
 * @function getProjectNavItems
 * @brief Ermittelt gueltige Navigationspunkte aus Abschnitts-Elementen.
 * @param {string} rootSelector Selektor fuer den Suchbereich.
 * @param {string} sectionsSelector Selektor fuer relevante Sections.
 * @param {number} headingLevel Erlaubte Ueberschriftenebene (1-6).
 * @param {string} labelAttrName Attributname fuer bevorzugte Labelquelle.
 * @returns {ProjectNavItem[]} Navigationspunkte mit ID und Label.
 */
function getProjectNavItems(rootSelector, sectionsSelector, headingLevel, labelAttrName) {
  /** @type {Element|null} */
  const root = document.querySelector(rootSelector);
  if (!root || Number.isNaN(headingLevel) || headingLevel < 1 || headingLevel > 6) {
    return [];
  }

  /** @type {string} */
  const headingTag = `H${headingLevel}`;
  /** @type {Element[]} */
  const sections = Array.from(root.querySelectorAll(sectionsSelector));

  return sections
    .map((section) => {
      if (!section.id) return null;

      const directHeading = Array.from(section.children).find(
        (node) => node.tagName === headingTag
      );
      if (!directHeading) return null;

      /** @type {string} */
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

/**
 * @function initProjectToc
 * @brief Baut Inhaltsverzeichnisse in Elementen mit .project-toc auf.
 * @returns {void}
 */
function initProjectToc() {
  /** @type {NodeListOf<HTMLElement>} */
  const tocs = document.querySelectorAll('.project-toc');
  if (!tocs.length) return;

  tocs.forEach((toc) => {
    /** @type {HTMLElement|null} */
    const list = toc.querySelector('.project-toc__list');
    if (!list) return;

    /** @type {string} */
    const rootSelector = toc.getAttribute('data-toc-root') || 'main';
    /** @type {string} */
    const sectionsSelector = toc.getAttribute('data-toc-sections') || 'section[id]';
    /** @type {number} */
    const headingLevel = Number.parseInt(
      toc.getAttribute('data-toc-heading-level') || '2',
      10
    );
    /** @type {ProjectNavItem[]} */
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
 * @function initProjectJumpLinks
 * @brief Baut kompakte Sprunglink-Navigation in .project-jump-links auf.
 * @returns {void}
 */
function initProjectJumpLinks() {
  /** @type {NodeListOf<HTMLElement>} */
  const jumpNavs = document.querySelectorAll('.project-jump-links');
  if (!jumpNavs.length) return;

  jumpNavs.forEach((nav) => {
    /** @type {string} */
    const rootSelector = nav.getAttribute('data-toc-root') || '.project-article';
    /** @type {string} */
    const sectionsSelector = nav.getAttribute('data-toc-sections') || 'section[id]';
    /** @type {number} */
    const headingLevel = Number.parseInt(
      nav.getAttribute('data-toc-heading-level') || '2',
      10
    );
    /** @type {number} */
    const maxItems = Number.parseInt(nav.getAttribute('data-jump-max') || '5', 10);

    nav.innerHTML = '';

    /** @type {ProjectNavItem[]} */
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

window.getProjectNavItems = getProjectNavItems;
window.initProjectToc = initProjectToc;
window.initProjectJumpLinks = initProjectJumpLinks;
