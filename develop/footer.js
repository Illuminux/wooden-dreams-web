/**
 * Footer-Injection Script
 * Injiziert den gemeinsamen Footer in Seiten mit #footer-placeholder
 * Das HTML ist direkt eingebettet, damit es auch mit file:// funktioniert
 * 
 * (c) 2026 by Knut's Wooden Dreams, All rights reserved.
 * Warning: This code is protected by copyright and may not be reproduced,
 * distributed, or used without permission from the author. For inquiries,
 * please contact Knut at admin@welzels.de.
 */

/**
 * Injiziert den Footer-HTML-Code in das Placeholder-Element
 */
function injectFooter() {
    const placeholder = document.getElementById('footer-placeholder');
    if (!placeholder) return;

    placeholder.innerHTML = `
<footer>
    <img src="images/WoodenDreamsLogo.svg" alt="Wooden Dreams Logo" class="footer-logo-img" />
    <nav class="footer-links" aria-label="Footer-Navigation">
        <a href="impressum.html">Impressum</a>
        <a href="datenschutz.html">Datenschutz</a>
        <a href="kontakt.html">Kontakt</a>
        <a href="rss.xml">RSS</a>
    </nav>
    <p class="footer-sub">Crafted by Hand</p>
    <p class="footer-copy">© 2026 Knut's Wooden Dreams — Alle Rechte vorbehalten</p>
</footer>
`;
}

/**
 * Initialisierung: Führt injectFooter() aus, sobald das DOM bereit ist
 */
document.addEventListener('DOMContentLoaded', function() {
    injectFooter();
});
