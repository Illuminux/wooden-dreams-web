/**
 * Navigation für Projektseiten: TOC und Jump-Links
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

window.getProjectNavItems = getProjectNavItems;
window.initProjectToc = initProjectToc;
window.initProjectJumpLinks = initProjectJumpLinks;
