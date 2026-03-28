/**
 * Legacy-Entrypoint.
 *
 * Das frühere Monolith-Skript wurde in thematische Dateien aufgeteilt:
 * - ./js/project/lightbox.js
 * - ./js/project/drawing-grid.js
 * - ./js/project/navigation.js
 * - ./js/project/init.js
 *
 * Dieses File lädt die neuen Skripte in fester Reihenfolge,
 * damit bestehende HTML-Einbindungen von ./script.js weiter funktionieren.
 */
(function loadProjectScripts() {
  const script = document.currentScript ||
    Array.from(document.getElementsByTagName('script')).find((s) => {
      const src = s.getAttribute('src') || '';
      return /(?:^|\/)script\.js(?:\?.*)?$/.test(src);
    });

  const src = (script && script.getAttribute('src')) || './script.js';
  const basePath = src.replace(/script\.js(?:\?.*)?$/, '');
  const files = [
    'js/project/lightbox.js',
    'js/project/drawing-grid.js',
    'js/project/navigation.js',
    'js/project/init.js'
  ];

  files.forEach((file) => {
    document.write(`<script src="${basePath}${file}"></` + 'script>');
  });
})();
