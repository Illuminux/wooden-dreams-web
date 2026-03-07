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
    <span class="site-logo"><?xml version="1.0" encoding="UTF-8" standalone="no"?> <!-- Created with Inkscape (http://www.inkscape.org/) --> <svg width="214.00722mm" height="262.47815mm" viewBox="0 0 214.00722 262.47815" version="1.1" id="svg1" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><defs id="defs1" /><g id="layer1" transform="translate(3.3687055,-15.26723)"><path  d="m 93.339608,277.61461 c -9.18217,-0.44241 -16.21415,-1.29901 -24.13091,-2.9395 -12.12124,-2.51174 -24.26641,-7.6148 -34.63364,-14.55211 -10.13409,-6.78129 -19.05945,-16.48194 -25.3190695,-27.51838 -6.98443,-12.31435 -11.10474,-26.86486 -12.35223,-43.62076 -0.36107,-4.8498 -0.36415,-71.59166 -0.004,-78.32756 0.97439,-18.204535 4.6208,-32.931802 11.5297,-46.566655 10.3661995,-20.4579 26.6291895,-34.775279 47.9978595,-42.255677 11.65434,-4.079763 22.79873,-5.856343 40.35754,-6.433582 31.869242,-1.047691 54.857752,4.058809 73.485852,16.323616 4.92072,3.239818 8.27074,6.010219 12.89455,10.663519 13.69644,13.783825 21.87847,30.548568 25.50619,52.261494 0.68907,4.12429 1.01434,6.958695 1.51816,13.229165 0.42923,5.34211 0.62849,67.09393 0.24375,75.53854 -0.62412,13.69869 -1.98251,22.35178 -4.96346,31.61771 -6.49929,20.20233 -19.40211,36.9021 -36.61318,47.38742 -14.0063,8.53292 -28.98079,13.14377 -48.00084,14.7801 -5.47658,0.47116 -21.359012,0.70935 -27.516662,0.41266 z" id="path1" /></g></svg>
  </span>
  </a>
  <nav>
    <a href="knuts-wooden-dreams.html">Projekte</a>
    <a href="#">Techniken</a>
    <a href="werkzeuge.html">Werkzeuge</a>
    <a href="#">Holzarten</a>
    <a href="#">Über mich</a>
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
