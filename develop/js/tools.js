/* ==========================================================
   tools.js
   Dynamisches Rendering aller Werkzeug-Kategorien
   Quelle: ./data/tools.json
   Ziel: werkzeuge.html
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const DATA_URL = "./data/tools.json";
  const CONTAINER_SELECTOR = "#tools-container";
  const AMAZON_TAG = "welzels-21";

  /* ---------- Hilfsfunktionen ---------- */

  function stars(rating = 0) {
    return "★★★★★☆☆☆☆☆".slice(5 - rating, 10 - rating);
  }

  function amazonUrl(asin = "") {
    return asin
      ? `https://www.amazon.de/dp/${asin}?tag=${AMAZON_TAG}`
      : "#";
  }

  function amazonImg(asin = "") {
    return asin
      ? `https://m.media-amazon.com/images/P/${asin}.01._SCLZZZZZZZ_.jpg`
      : "";
  }

  function escapeHTML(str) {
    if (typeof str !== "string") return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /* ---------- Tool-Card ---------- */

  function renderToolCard(tool = {}) {
    const maker = escapeHTML(tool.maker);
    const name = escapeHTML(tool.name);
    const type = escapeHTML(tool.type);
    const desc = tool.description || "";
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

  function renderCategory(category = {}) {
    const label = escapeHTML(category.label);
    const icon = category.icon || "tools";

    return `
<section class="category-section" id="${category.id || ""}">
  <div class="category-header">
    <h2>
      <img src="./icons/${icon}.png"
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

  fetch(DATA_URL)
    .then(res => {
      if (!res.ok) throw new Error("tools.json konnte nicht geladen werden");
      return res.json();
    })
    .then(data => {
      const container = document.querySelector(CONTAINER_SELECTOR);
      if (!container || !data.categories) return;

      // ---------- Werkzeuge & Kategorien zählen ----------
      const totalCategories = data.categories.length;

      const totalTools = data.categories.reduce((sum, category) => {
        return sum + (category.tools ? category.tools.length : 0);
      }, 0);

      const summaryEl = document.querySelector("#tools-summary");
      if (summaryEl) {

        const toolLabel = totalTools === 1 ? "Werkzeug" : "Werkzeuge";
        const categoryLabel = totalCategories === 1 ? "Kategorie" : "Kategorien";

        summaryEl.innerHTML = `
          <h2>${totalTools} ${toolLabel} in ${totalCategories} ${categoryLabel}</h2>
        `;
      }

      data.categories.forEach(category => {
        container.insertAdjacentHTML(
          "beforeend",
          renderCategory(category)
        );
      });
    })
    .catch(err => {
      console.error("Fehler beim Laden der Werkzeuge:", err);
    });
});
