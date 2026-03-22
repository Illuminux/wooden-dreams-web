/**
 * Header-Injection Script
 * Injiziert den gemeinsamen Header in Seiten mit #header-placeholder
 * Das HTML ist direkt eingebettet, damit es auch mit file:// funktioniert
 * 
 * (c) 2026 by Knut's Wooden Dreams, All rights reserved.
 * Warning: This code is protected by copyright and may not be reproduced,
 * distributed, or used without permission from the author. For inquiries,
 * please contact Knut at admin@welzels.de.
 */

/**
 * Injiziert den Header-HTML-Code in das Placeholder-Element
 */
function injectHeader() {
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
    <a href="knuts-wooden-dreams.html">
        <img src="images/WoodenDreamsLogo.svg" alt="Wooden Dreams Logo" class="site-logo">
    </a>
    <nav aria-label="Hauptnavigation">
        <a href="knuts-wooden-dreams.html">Projekte</a>
        <a href="#">Techniken</a>
        <a href="werkzeuge.html">Werkzeuge</a>
        <a href="#">Holzarten</a>
        <a href="about.html">Über mich</a>
    </nav>
</div>
</header>
`;

    markActiveLink();
}

/**
 * Markiert den aktiven Navigationslink basierend auf der aktuellen Seite
 */
function markActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('#header-placeholder nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

/**
 * Initialisierung: Führt injectHeader() aus, sobald das DOM bereit ist
 */
document.addEventListener('DOMContentLoaded', function() {
    injectHeader();
});
