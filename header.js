// This script injects the shared header markup into pages with a #header-placeholder.
// The HTML is embedded directly so it works even when opening files via file://

function injectHeader() {
  const placeholder = document.getElementById('header-placeholder');
  if (!placeholder) return;

  placeholder.innerHTML = `
<header>
<svg class="header-rings" viewBox="0 0 380 380" xmlns="http://www.w3.org/2000/svg">
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
    <img src="images/WoodenDreamsLogo.svg" alt="Knut's Wooden Dreams Logo" class="site-logo">
  </a>
  <nav>
    <a href="knuts-wooden-dreams.html">Projekte</a>
    <a href="#">Techniken</a>
    <a href="werkzeuge.html">Werkzeuge</a>
    <a href="#">Holzarten</a>
    <a href="about.html">Über mich</a>
  </nav>
</div>
</header>
`;

  // mark active link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#header-placeholder nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}

// run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectHeader);
} else {
  injectHeader();
}
