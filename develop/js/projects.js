/**
 * @file projects.js
 * @brief Dynamisches Rendering der Projektkarten.
 * @copyright Copyright (C) 2026 Knut's Wooden Dreams
 * @license GPL-3.0-only
 * @details
 * Quelle: ./data/projects.json
 * Ziel: .posts-grid in knuts-wooden-dreams.html
 */

/**
 * @typedef {Object} ProjectImage
 * @property {string} [src] Bildquelle.
 * @property {string} [alt] Alternativtext.
 * @property {number|string} [width] Bildbreite.
 * @property {number|string} [height] Bildhoehe.
 */

/**
 * @typedef {Object} Project
 * @property {string} [slug] Eindeutiger Slug des Projekts.
 * @property {string} [title] Titel des Projekts.
 * @property {string} [tag] Kategorie- oder Label-Text.
 * @property {string} [area] Bereich oder Themenfeld.
 * @property {string} [url] Link zur Projektdetailseite.
 * @property {string} [excerpt] Kurzbeschreibung.
 * @property {string} [meta] Optionaler Metatext fuer Featured-Ansicht.
 * @property {boolean} [featured] Markierung fuer bevorzugtes Projekt.
 * @property {ProjectImage} [image] Bilddaten.
 */

/**
 * @typedef {Object} ProjectCategory
 * @property {string} [id] Optionaler Anker fuer die erste Karte der Kategorie.
 * @property {Project[]} [projects] Liste der Projekte.
 */

/**
 * @typedef {Object} ProjectsData
 * @property {string} [featuredProjectSlug] Slug des bevorzugten Featured-Projekts.
 * @property {ProjectCategory[]} [categories] Kategorien mit Projekten.
 */

/**
 * @event DOMContentLoaded
 * @brief Initialisiert Datenabruf und Rendering der Projektbereiche.
 */
document.addEventListener("DOMContentLoaded", () => {
  /** @constant {string} DATA_URL Pfad zur JSON-Datenquelle. */
  const DATA_URL = "./data/projects.json";
  /** @constant {string} FEATURED_SELECTOR Container fuer das Featured-Projekt. */
  const FEATURED_SELECTOR = ".featured-3d";
  /** @constant {string} GRID_SELECTOR Container fuer die Projektkarten im Grid. */
  const GRID_SELECTOR = ".posts-grid";
  /** @constant {string} HASH_ALL Schluessel fuer die Ansicht mit allen Kategorien. */
  const HASH_ALL = "all";

  /**
  * @function escapeHTML
  * @brief Escaped kritische HTML-Zeichen fuer sichere Textausgabe.
  * @param {string} str Eingabetext.
  * @returns {string} HTML-escaped Text oder leerer String bei ungueltigem Typ.
  */
  function escapeHTML(str) {
    if (typeof str !== "string") return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /**
   * @function renderProjectCard
   * @brief Rendert eine Projektkarte fuer das Listen-Grid.
   * @param {Project} [project={}] Projektdaten.
   * @param {string} [sectionId=""] Optionale ID fuer die erste Karte je Kategorie.
   * @returns {string} HTML-Markup einer Projektkarte.
   */
  function renderProjectCard(project = {}, sectionId = "") {
    /** @type {string} */
    const title = escapeHTML(project.title);
    /** @type {string} */
    const tag = escapeHTML(project.tag);
    /** @type {string} */
    const area = escapeHTML(project.area);
    /** @type {string} */
    const url = escapeHTML(project.url);
    /** @type {string} */
    const excerpt = escapeHTML(project.excerpt);

    /** @type {ProjectImage} */
    const image = project.image || {};
    /** @type {string} */
    const imgSrc = escapeHTML(image.src || "");
    /** @type {string} */
    const imgAlt = escapeHTML(image.alt || project.title || "Projektbild");
    /** @type {number} */
    const imgWidth = Number(image.width) || 800;
    /** @type {number} */
    const imgHeight = Number(image.height) || 600;

    /** @type {string} */
    const idAttr = sectionId ? ` id="${escapeHTML(sectionId)}"` : "";

    return `
<article${idAttr} class="post-card">
  <a href="${url}"><div class="card-thumb">
    <img src="${imgSrc}" alt="${imgAlt}" width="${imgWidth}" height="${imgHeight}" loading="lazy" decoding="async" />
  </div></a>
  <div class="card-body">
    <p class="card-tag">${tag}</p>
    <h3 class="card-title">${title}</h3>
    <p class="card-excerpt">${excerpt}</p>
    <div class="card-footer"><span>${area}</span><a href="${url}" class="read-more">Ansehen →</a></div>
  </div>
</article>`;
  }

  /**
   * @function renderFeaturedProject
   * @brief Rendert das hervorgehobene Projekt fuer den Hero-Bereich.
   * @param {Project} [project={}] Projektdaten.
   * @returns {string} HTML-Markup fuer das Featured-Projekt.
   */
  function renderFeaturedProject(project = {}) {
    /** @type {string} */
    const title = escapeHTML(project.title);
    /** @type {string} */
    const tag = escapeHTML(project.tag);
    /** @type {string} */
    const badge = escapeHTML(project.tag || "Projekt");
    /** @type {string} */
    const url = escapeHTML(project.url);
    /** @type {string} */
    const excerpt = escapeHTML(project.excerpt);
    /** @type {string} */
    const meta = escapeHTML(project.meta || `${project.area || ""} · ${project.tag || ""}`.replace(/^\s*·\s*|\s*·\s*$/g, ""));

    /** @type {ProjectImage} */
    const image = project.image || {};
    /** @type {string} */
    const imgSrc = escapeHTML(image.src || "");
    /** @type {string} */
    const imgAlt = escapeHTML(image.alt || project.title || "Projektbild");
    /** @type {number} */
    const imgWidth = Number(image.width) || 800;
    /** @type {number} */
    const imgHeight = Number(image.height) || 600;

    return `
<div class="viewer-wrap">
  <img src="${imgSrc}" alt="${imgAlt}" width="${imgWidth}" height="${imgHeight}" loading="eager" fetchpriority="high" decoding="async" />
  <span class="viewer-badge">${badge}</span>
</div>
<div class="featured-content">
  <p class="post-tag">✦ &nbsp; ${tag}</p>
  <h2 class="featured-title">${title}</h2>
  <p class="featured-excerpt">${excerpt}</p>
  <p class="featured-meta">${meta}</p>
  <a href="${url}" class="btn-read">Zum Beitrag →</a>
</div>`;
  }

  /**
    * @function normalizeCategoryValue
    * @brief Normalisiert einen Kategorie-Wert aus URL-Parametern.
   * @param {string} value Rohwert aus der URL.
   * @returns {string} Normalisierter Kategoriename oder leerer String.
   */
  function normalizeCategoryValue(value) {
    if (typeof value !== "string") return "";
    const trimmed = value.trim();
    if (!trimmed) return "";
    try {
      return decodeURIComponent(trimmed).toLowerCase();
    } catch {
      return trimmed.toLowerCase();
    }
  }

  /**
   * @function getCurrentCategoryFilter
   * @brief Liest den aktiven Kategorie-Filter aus ?category=.
   * @returns {string} Aktiver Kategorie-Filter in Kleinbuchstaben.
   */
  function getCurrentCategoryFilter() {
    const params = new URLSearchParams(window.location.search || "");
    return normalizeCategoryValue(params.get("category") || "");
  }

  /**
   * @function getAvailableCategoryIds
   * @brief Ermittelt alle gueltigen Kategorie-IDs in Kleinbuchstaben.
   * @param {ProjectCategory[]} categories Alle verfuegbaren Kategorien.
   * @returns {string[]} Liste gueltiger Kategorie-IDs.
   */
  function getAvailableCategoryIds(categories) {
    return categories
      .map((category) => (typeof category.id === "string" ? category.id.toLowerCase() : ""))
      .filter(Boolean);
  }

  /**
   * @function getEffectiveCategoryFilter
   * @brief Bestimmt den wirksamen Filter und faellt bei ungueltigen Werten auf "all" zurueck.
   * @param {ProjectCategory[]} categories Alle verfuegbaren Kategorien.
   * @returns {string} Wirksamer Filterwert.
   */
  function getEffectiveCategoryFilter(categories) {
    const activeCategory = getCurrentCategoryFilter();
    if (!activeCategory || activeCategory === HASH_ALL) {
      return HASH_ALL;
    }

    const categoryIds = getAvailableCategoryIds(categories);
    return categoryIds.includes(activeCategory) ? activeCategory : HASH_ALL;
  }

  /**
   * @function syncCategoryNavigation
   * @brief Markiert den aktiven Kategorie-Link in der Kategorienavigation.
   * @param {string} activeCategory Wirksamer Kategorie-Filter.
   * @returns {void}
   */
  function syncCategoryNavigation(activeCategory) {
    const links = document.querySelectorAll('.project-jump-links a[href*="category="]');

    links.forEach((link) => {
      const href = link.getAttribute("href") || "";
      const valuePart = href.split("category=")[1] || "";
      const rawValue = valuePart.split("&")[0] || "";
      const linkCategory = normalizeCategoryValue(rawValue);

      if (linkCategory === activeCategory || (!linkCategory && activeCategory === HASH_ALL)) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  /**
   * @function getVisibleCategories
   * @brief Bestimmt die sichtbaren Kategorien basierend auf URL-Filterwerten.
   * @param {ProjectCategory[]} categories Alle verfuegbaren Kategorien.
   * @returns {ProjectCategory[]} Gefilterte Kategorie-Liste.
   */
  function getVisibleCategories(categories) {
    const activeCategory = getEffectiveCategoryFilter(categories);
    if (activeCategory === HASH_ALL) {
      return categories;
    }

    return categories.filter((category) => {
      const categoryId = typeof category.id === "string" ? category.id.toLowerCase() : "";
      return categoryId === activeCategory;
    });
  }

  /**
   * @brief Laedt Projektdaten und rendert Featured-Bereich sowie Grid.
   */
  fetch(DATA_URL)
    .then((res) => {
      if (!res.ok) throw new Error("projects.json konnte nicht geladen werden");
      return res.json();
    })
    .then((data) => {
      /** @type {HTMLElement|null} */
      const featured = document.querySelector(FEATURED_SELECTOR);
      /** @type {HTMLElement|null} */
      const grid = document.querySelector(GRID_SELECTOR);

      if (!Array.isArray(data.categories)) return;

      /** @type {Project[]} */
      const allProjects = data.categories.flatMap((category) =>
        Array.isArray(category.projects) ? category.projects : []
      );

      /** @type {string} */
      const featuredSlug =
        typeof data.featuredProjectSlug === "string" ? data.featuredProjectSlug.trim() : "";

      /** @type {Project|undefined} */
      const featuredProject =
        allProjects.find((project) => project && project.slug === featuredSlug) ||
        allProjects.find((project) => project && project.featured === true) ||
        allProjects[0];

      if (featured && featuredProject) {
        featured.innerHTML = renderFeaturedProject(featuredProject);
      }

      if (!grid) return;

      const renderGrid = () => {
        /** @type {string[]} */
        const html = [];
        const activeCategory = getEffectiveCategoryFilter(data.categories);
        const visibleCategories = getVisibleCategories(data.categories);

        syncCategoryNavigation(activeCategory);

        visibleCategories.forEach((category) => {
          const projects = Array.isArray(category.projects) ? category.projects : [];
          let renderedIndex = 0;
          projects.forEach((project) => {
            if (!project || typeof project !== "object") {
              return;
            }
            if (featuredProject && project.slug === featuredProject.slug) {
              return;
            }
            const sectionId = renderedIndex === 0 ? category.id : "";
            html.push(renderProjectCard(project, sectionId));
            renderedIndex += 1;
          });
        });

        grid.innerHTML = html.join("\n");
      };

      renderGrid();
      window.addEventListener("popstate", renderGrid);
    })
    .catch((err) => {
      console.error("Fehler beim Laden der Projekte:", err);
      // Fallback: bestehende statische Inhalte im HTML bleiben erhalten.
    });
});
