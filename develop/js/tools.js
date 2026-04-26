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
    const safeRating = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));
    return "★★★★★☆☆☆☆☆".slice(5 - safeRating, 10 - safeRating);
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
   * @function replaceThumbWithPlaceholder
   * @brief Ersetzt ein fehlerhaftes Bild durch den vorhandenen Placeholder.
   * @param {HTMLImageElement} img Bild-Element im Thumbnail.
   * @returns {void}
   */
  function replaceThumbWithPlaceholder(img) {
    const thumb = img.closest(".tool-thumb");
    if (!thumb) return;
    thumb.innerHTML = '<div class="tool-thumb-placeholder"><span>Bild nicht verfügbar</span></div>';
  }

  /**
   * @function attachThumbFallbacks
   * @brief Ergaenzt robuste Fallbacks fuer Amazon-Bilder (Error + 1x1-Responses).
   * @param {ParentNode} root Wurzelknoten mit Tool-Thumbnails.
   * @returns {void}
   */
  function attachThumbFallbacks(root) {
    const images = root.querySelectorAll(".tool-thumb img");

    const validate = (img) => {
      // Einige Amazon-Endpunkte liefern ein 1x1-Bild statt Fehlerstatus.
      if (img.naturalWidth <= 1 || img.naturalHeight <= 1) {
        replaceThumbWithPlaceholder(img);
      }
    };

    images.forEach((img) => {
      img.addEventListener("error", () => replaceThumbWithPlaceholder(img), { once: true });
      img.addEventListener("load", () => validate(img), { once: true });

      if (img.complete) {
        validate(img);
      }
    });
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
  function slugify(str = "") {
    return "tool-" + str.toLowerCase()
      .replace(/[äÄ]/g, "ae").replace(/[öÖ]/g, "oe").replace(/[üÜ]/g, "ue").replace(/ß/g, "ss")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  /**
   * @function sanitizeHtmlId
   * @brief Normalisiert einen Wert zu einer gueltigen, stabilen HTML-ID.
   * @param {string} [value=""] Eingabewert fuer die ID.
   * @returns {string} Normalisierte ID oder leerer String.
   */
  function sanitizeHtmlId(value = "") {
    if (typeof value !== "string") return "";
    return value
      .toLowerCase()
      .replace(/[äÄ]/g, "ae").replace(/[öÖ]/g, "oe").replace(/[üÜ]/g, "ue").replace(/ß/g, "ss")
      .replace(/[^a-z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  /**
   * @function sanitizeSymbolName
   * @brief Erlaubt nur sichere Dateinamen fuer Symbol-Icons.
   * @param {string} [value=""] Symbolname aus den Daten.
   * @returns {string} Sicherer Symbolname oder "tools" als Fallback.
   */
  function sanitizeSymbolName(value = "") {
    if (typeof value !== "string") return "tools";
    const normalized = value.trim().toLowerCase();
    return /^[a-z0-9-]+$/.test(normalized) ? normalized : "tools";
  }

  /**
   * @function getHashTargetId
   * @brief Liest und normalisiert die aktuelle URL-Hash-ID.
   * @returns {string} Ziel-ID ohne fuehrendes # oder leerer String.
   */
  function getHashTargetId() {
    const rawHash = window.location.hash || "";
    if (!rawHash.startsWith("#")) return "";
    try {
      return decodeURIComponent(rawHash.slice(1));
    } catch {
      return rawHash.slice(1);
    }
  }

  /**
   * @function scrollToCurrentHash
   * @brief Scrollt nach dem Rendern zum Hash-Ziel. Mit Retries fuer dynamisch erzeugte Inhalte.
   * @param {number} [maxRetries=12] Anzahl Wiederholungen, falls Ziel noch nicht existiert.
   * @returns {boolean} true, wenn ein Ziel gefunden wurde, sonst false.
   */
  function scrollToCurrentHash(maxRetries = 12) {
    const targetId = getHashTargetId();
    if (!targetId) return false;

    let attempts = 0;
    let found = false;

    const findTarget = () => {
      const exact = document.getElementById(targetId);
      if (exact) return exact;

      const normalized = targetId.toLowerCase();
      const allWithId = document.querySelectorAll("[id]");
      for (const el of allWithId) {
        if ((el.id || "").toLowerCase() === normalized) {
          return el;
        }
      }
      return null;
    };

    const tryScroll = () => {
      const target = findTarget();
      if (target) {
        target.scrollIntoView({ behavior: "auto", block: "start" });
        found = true;
        return;
      }

      attempts += 1;
      if (attempts <= maxRetries) {
        window.setTimeout(tryScroll, 50);
      }
    };

    tryScroll();
    return found;
  }

  /**
   * @function stabilizeHashScroll
   * @brief Fuehrt den Hash-Sprung mehrfach aus, um spaete Layout-Verschiebungen abzufangen.
   * @returns {void}
   */
  function stabilizeHashScroll() {
    if (!getHashTargetId()) return;

    // Direkt nach dem Rendern
    scrollToCurrentHash(16);

    // Im naechsten Frame nach Layout-Berechnung
    window.requestAnimationFrame(() => {
      scrollToCurrentHash(4);
    });

    // Nach kompletter Seitenauslieferung (inkl. Bilder)
    window.addEventListener("load", () => {
      scrollToCurrentHash(6);
      window.setTimeout(() => scrollToCurrentHash(2), 250);
      window.setTimeout(() => scrollToCurrentHash(1), 900);
    }, { once: true });
  }

  function renderToolCard(tool = {}) {
    /** @type {string} */
    const maker = escapeHTML(tool.maker);
    /** @type {string} */
    const name = escapeHTML(tool.name);
    /** @type {string} */
    const type = escapeHTML(tool.type);
    /** @type {string} */
    const desc = escapeHTML(tool.description);
    /** @type {string} */
    const ratingText = escapeHTML(tool.ratingText);

    return `
<article class="tool-card" id="${slugify(tool.name)}">
  <div class="tool-thumb">
    ${
      tool.asin
        ? `<img src="${amazonImg(tool.asin)}"
               alt="${name}"
               loading="lazy">`
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
    const icon = sanitizeSymbolName(category.icon);
    /** @type {string} */
    const categoryId = sanitizeHtmlId(category.id || category.label || "");

    return `
<section class="category-section" id="${categoryId}">
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

      // Bild-Fallbacks nach dem Rendern registrieren.
      attachThumbFallbacks(container);

      // Initialen Hash robust anspringen (auch bei spaeteren Layout-Shifts).
      stabilizeHashScroll();

      // Auch spaetere Hash-Aenderungen auf derselben Seite behandeln.
      window.addEventListener("hashchange", () => {
        scrollToCurrentHash(2);
      });
    })
    .catch((err) => {
      console.error("Fehler beim Laden der Werkzeuge:", err);
    });
});

