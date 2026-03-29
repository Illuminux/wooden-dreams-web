/**
 * @file script.js
 * @brief Legacy-Entrypoint fuer die Projekt-Skripte.
 * @copyright Copyright (C) 2026 Knut's Wooden Dreams
 * @license GPL-3.0-only
 * @details
 * Das fruehere Monolith-Skript wurde in thematische Dateien aufgeteilt:
 * - ./js/project/lightbox.js
 * - ./js/project/drawing-grid.js
 * - ./js/project/navigation.js
 * - ./js/project/init.js
 *
 * Diese Datei laedt die neuen Skripte in fester Reihenfolge,
 * damit bestehende HTML-Einbindungen von ./script.js weiter funktionieren.
 */


/**
 * @function loadProjectScripts
 * @brief Ermittelt den Basispfad und bindet die Projekt-Module in Reihenfolge ein.
 * @returns {void}
 */
(function loadProjectScripts() {
  /**
   * @var {HTMLScriptElement|undefined} script
   * @brief Aktuelles script-Element oder Fallback auf das script.js-Tag.
   */
  const script = document.currentScript ||
    Array.from(document.getElementsByTagName('script')).find((s) => {
      /** @var {string} src Quellpfad eines Script-Tags. */
      const src = s.getAttribute('src') || '';
      return /(?:^|\/)script\.js(?:\?.*)?$/.test(src);
    });

  /** @var {string} src Urspruenglicher src-Wert des gefundenen script-Elements. */
  const src = (script && script.getAttribute('src')) || './script.js';
  /** @var {string} basePath Basisverzeichnis ohne Dateiname script.js. */
  const basePath = src.replace(/script\.js(?:\?.*)?$/, '');
  /** @var {string[]} files Relative Pfade der nachzuladenden Moduldateien. */
  const files = [
    'js/project/lightbox.js',
    'js/project/drawing-grid.js',
    'js/project/navigation.js',
    'js/project/init.js'
  ];

  /**
   * @brief Schreibt script-Tags zur Laufzeit in das Dokument.
   * @param {string} file Relativer Modulpfad.
   * @returns {void}
   */
  files.forEach((file) => {
    document.write(`<script src="${basePath}${file}"></` + 'script>');
  });
})();
