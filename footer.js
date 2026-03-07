// This script injects the shared footer markup into pages with a #footer-placeholder.
// The HTML is embedded directly so it works even when opening files via file://

function injectFooter() {
  const placeholder = document.getElementById('footer-placeholder');
  if (!placeholder) return;

  placeholder.innerHTML = `
<footer>
    <img src="images/WoodenDreamsLogo.svg" alt="Wooden Dreams Logo" class="footer-logo-img" />
    <div class="footer-links">
      <a href="#">Impressum</a>
      <a href="#">Datenschutz</a>
      <a href="#">Kontakt</a>
      <a href="#">RSS</a>
    </div>
    <p class="footer-sub">Crafted by Hand</p>
    <p class="footer-copy">© 2026 Knut's Wooden Dreams — Alle Rechte vorbehalten</p>
  </footer>
`;
}

// run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectFooter);
} else {
  injectFooter();
}