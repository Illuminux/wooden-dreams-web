/**
 * @file header.js
 * @brief Injiziert den gemeinsamen Header in Seiten mit #header-placeholder.
 * @copyright Copyright (C) 2026 Knut's Wooden Dreams
 * @license GPL-3.0-only
 * @details
 * Das HTML ist direkt eingebettet, damit es auch mit file:// funktioniert.
 */

/**
 * @function injectHeader
 * @brief Injiziert den Header-HTML-Code in das Placeholder-Element.
 * @returns {void}
 */
function injectHeader() {
    /** @type {HTMLElement|null} Placeholder fuer den Header. */
    const placeholder = document.getElementById('header-placeholder');
    if (!placeholder) return;

    placeholder.innerHTML = `
<header>
<svg class="header-rings" viewBox="0 0 380 380" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="190" cy="190" r="20"/>
    <circle cx="190" cy="190" r="40"/>
    <circle cx="190" cy="190" r="62"/>
    <circle cx="190" cy="190" r="86"/>
    <circle cx="190" cy="190" r="112"/>
    <circle cx="190" cy="190" r="140"/>
    <circle cx="190" cy="190" r="170"/>
    <circle cx="190" cy="190" r="188"/>
</svg>
<div class="header-inner">
    <a href="./knuts-wooden-dreams.html?category=all">
        <img src="./images/WoodenDreamsLogo.svg" alt="Wooden Dreams Logo" class="site-logo">
    </a>
    <nav aria-label="Hauptnavigation">
        <a href="./knuts-wooden-dreams.html?category=all">Projekte</a>
        <span class="nav-coming-soon" aria-disabled="true" title="Kommt bald">Techniken</span>
        <a href="./werkzeuge.html">Werkzeuge</a>
        <span class="nav-coming-soon" aria-disabled="true" title="Kommt bald">Holzarten</span>
        <a href="./about.html">Über mich</a>
    </nav>
</div>
</header>
`;

    markActiveLink();
}

/**
 * @function markActiveLink
 * @brief Markiert den aktiven Navigationslink basierend auf der aktuellen Seite.
 * @returns {void}
 */
function markActiveLink() {
    /** @type {string} Aktuelle Zielseite mit projektspezifischem Startseiten-Fallback. */
    const path = window.location.pathname || '';
    const trimmedPath = path.endsWith('/') ? path.slice(0, -1) : path;
    const currentPage = trimmedPath.split('/').pop() || 'knuts-wooden-dreams.html';
    /** @type {NodeListOf<HTMLAnchorElement>} Navigationslinks im Header. */
    const navLinks = document.querySelectorAll('#header-placeholder nav a');

    navLinks.forEach((link) => {
        /** @type {string} Normalisierte Link-Zielseite ohne Query/Hash. */
        const href = (link.getAttribute('href') || '').replace(/^\.\//, '').split('?')[0].split('#')[0];
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * @event DOMContentLoaded
 * @brief Initialisiert den Header, sobald das DOM bereit ist.
 */
document.addEventListener('DOMContentLoaded', function () {
    injectHeader();
});
