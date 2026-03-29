/**
 * @file tools.js
 * @brief Dynamisches Rendering aller Werkzeug-Kategorien.
 * @copyright Copyright (C) 2026 Knut's Wooden Dreams
 * @license GPL-3.0-only
 * @details
 * Quelle: ./data/tools.json
 * Ziel: werkzeuge.html
 */

/**
 * @typedef {Object} Tool
 * @property {string} [maker] Herstellername.
 * @property {string} [name] Anzeigename des Werkzeugs.
 * @property {string} [type] Werkzeugkategorie fuer Badge und Filter.
 * @property {string} [description] Kurzbeschreibung des Werkzeugs.
 * @property {number} [rating] Bewertung im Bereich 0-5.
 * @property {string} [ratingText] Begruendung zur Bewertung.
 * @property {string} [asin] Amazon-ASIN fuer Bild und Kauf-Link.
 */

/**
 * @typedef {Object} ToolCategory
 * @property {string} [id] HTML-ID der Kategorie-Sektion.
 * @property {string} [label] Sichtbarer Kategoriename.
 * @property {string} [icon] Symbolname aus ./symbols.
 * @property {Tool[]} [tools] Liste der Werkzeuge.
 */

/**
 * @typedef {Object} ToolsData
 * @property {ToolCategory[]} [categories] Alle Werkzeug-Kategorien.
 */

/**
 * @event DOMContentLoaded
 * @brief Initialisiert Rendering und Datenabruf fuer Werkzeuge.
 */
document.addEventListener("DOMContentLoaded", () => {
  /** @constant {string} DATA_URL Pfad zur JSON-Datenquelle. */
  const DATA_URL = "./data/tools.json";
  /** @constant {string} CONTAINER_SELECTOR Zielcontainer fuer gerenderte Kategorien. */
  const CONTAINER_SELECTOR = "#tools-container";
  /** @constant {string} AMAZON_TAG Amazon Partner-Tag fuer Affiliate-Links. */
  const AMAZON_TAG = "welzels-21";

  /* ---------- Hilfsfunktionen ---------- */

  /**
   * @function stars
   * @brief Erzeugt eine Sternanzeige als Text mit gefuellten und leeren Sternen.
   * @param {number} [rating=0] Bewertung im Bereich 0-5.
   * @returns {string} Darstellung der Bewertung als Sternzeichen.
   */
  function stars(rating = 0) {
    return "★★★★★☆☆☆☆☆".slice(5 - rating, 10 - rating);
  }

  /**
   * @function amazonUrl
   * @brief Baut die Amazon-Produkt-URL inklusive Partner-Tag.
   * @param {string} [asin=""] Amazon-ASIN des Produkts.
   * @returns {string} Vollstaendige Amazon-URL oder "#" als Fallback.
   */
  function amazonUrl(asin = "") {
    return asin
      ? `https://www.amazon.de/dp/${asin}?tag=${AMAZON_TAG}`
      : "#";
  }

  /**
   * @function amazonImg
   * @brief Erzeugt die Amazon-Bild-URL fuer ein Produkt.
   * @param {string} [asin=""] Amazon-ASIN des Produkts.
   * @returns {string} Bild-URL oder leerer String als Fallback.
   */
  function amazonImg(asin = "") {
    return asin
      ? `https://m.media-amazon.com/images/P/${asin}.01._SCLZZZZZZZ_.jpg`
      : "";
  }

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
      .replace(/>/g, "&gt;");
  }

  /* ---------- Tool-Card ---------- */

  /**
   * @function renderToolCard
   * @brief Rendert die HTML-Karte fuer ein einzelnes Werkzeug.
   * @param {Tool} [tool={}] Werkzeugdaten.
   * @returns {string} HTML-Markup der Werkzeugkarte.
   */
  function renderToolCard(tool = {}) {
    /** @type {string} */
    const maker = escapeHTML(tool.maker);
    /** @type {string} */
    const name = escapeHTML(tool.name);
    /** @type {string} */
    const type = escapeHTML(tool.type);
    /** @type {string} */
    const desc = tool.description || "";
    /** @type {string} */
    const ratingText = tool.ratingText || "";

    return `
<article class="tool-card">
  <div class="tool-thumb">
    ${
      tool.asin
        ? `<img src="${amazonImg(tool.asin)}"
               alt="${name}"
               loading="lazy"
               onerror="this.parentElement.innerHTML='<div class=tool-thumb-placeholder><span>Bild nicht verfügbar</span></div>'">`
        : `<div class="tool-thumb-placeholder"><span>Bild nicht verfügbar</span></div>`
    }
    ${type ? `<span class="tool-category-badge">${type}</span>` : ""}
  </div>

  <div class="tool-body">
    ${maker ? `<p class="tool-maker">${maker}</p>` : ""}
    <h3 class="card-title">${name}</h3>

    <p class="card-excerpt">${desc}</p>

    <p class="tool-rating">${stars(tool.rating)}</p>
    ${ratingText ? `<p class="rating-reason">${ratingText}</p>` : ""}

    ${
      tool.asin
        ? `<div class="tool-footer">
             <a href="${amazonUrl(tool.asin)}"
                target="_blank"
                rel="noopener"
                class="tool-buy-btn">
               Bei Amazon →
             </a>
           </div>`
        : ""
    }
  </div>
</article>`;
  }

  /* ---------- Kategorie-Section ---------- */

  /**
   * @function renderCategory
   * @brief Rendert eine Kategoriensektion mit Header und Kartenraster.
   * @param {ToolCategory} [category={}] Kategorieobjekt.
   * @returns {string} HTML-Markup der Kategorie.
   */
  function renderCategory(category = {}) {
    /** @type {string} */
    const label = escapeHTML(category.label);
    /** @type {string} */
    const icon = category.icon || "tools";

    return `
<section class="category-section" id="${category.id || ""}">
  <div class="category-header">
    <h2>
      <img src="./symbols/${icon}.svg"
           alt=""
           style="height:32px;vertical-align:middle;margin-right:0.3em;">
      ${label}
    </h2>
    <span class="category-count">
      ${(category.tools || []).length} Werkzeuge
    </span>
  </div>

  <div class="tools-grid">
    ${(category.tools || []).map(renderToolCard).join("")}
  </div>
</section>`;
  }

  /* ---------- Initialisierung ---------- */

  /**
   * @brief Laedt Werkzeugdaten und rendert Zusammenfassung sowie Kategorien.
   */
  fetch(DATA_URL)
    .then((res) => {
      if (!res.ok) throw new Error("tools.json konnte nicht geladen werden");
      return res.json();
    })
    .then((data) => {
      /** @type {HTMLElement|null} */
      const container = document.querySelector(CONTAINER_SELECTOR);
      if (!container || !data.categories) return;

      // ---------- Werkzeuge & Kategorien zählen ----------
      /** @type {number} */
      const totalCategories = data.categories.length;

      /** @type {number} */
      const totalTools = data.categories.reduce((sum, category) => {
        return sum + (category.tools ? category.tools.length : 0);
      }, 0);

      /** @type {HTMLElement|null} */
      const summaryEl = document.querySelector("#tools-summary");
      if (summaryEl) {

        /** @type {string} */
        const toolLabel = totalTools === 1 ? "Werkzeug" : "Werkzeuge";
        /** @type {string} */
        const categoryLabel = totalCategories === 1 ? "Kategorie" : "Kategorien";

        summaryEl.innerHTML = `
          <h2>${totalTools} ${toolLabel} in ${totalCategories} ${categoryLabel}</h2>
        `;
      }

      data.categories.forEach((category) => {
        container.insertAdjacentHTML(
          "beforeend",
          renderCategory(category)
        );
      });
    })
    .catch((err) => {
      console.error("Fehler beim Laden der Werkzeuge:", err);
    });
});

