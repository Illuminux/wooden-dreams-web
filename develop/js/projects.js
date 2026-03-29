/* ==========================================================
   projects.js
   Dynamisches Rendering der Projektkarten
   Quelle: ./data/projects.json
   Ziel: .posts-grid in knuts-wooden-dreams.html
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const DATA_URL = "./data/projects.json";
  const FEATURED_SELECTOR = ".featured-3d";
  const GRID_SELECTOR = ".posts-grid";

  function escapeHTML(str) {
    if (typeof str !== "string") return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderProjectCard(project = {}, sectionId = "") {
    const title = escapeHTML(project.title);
    const tag = escapeHTML(project.tag);
    const area = escapeHTML(project.area);
    const url = escapeHTML(project.url);
    const excerpt = escapeHTML(project.excerpt);

    const image = project.image || {};
    const imgSrc = escapeHTML(image.src || "");
    const imgAlt = escapeHTML(image.alt || project.title || "Projektbild");
    const imgWidth = Number(image.width) || 800;
    const imgHeight = Number(image.height) || 600;

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

  function renderFeaturedProject(project = {}) {
    const title = escapeHTML(project.title);
    const tag = escapeHTML(project.tag);
    const badge = escapeHTML(project.tag || "Projekt");
    const url = escapeHTML(project.url);
    const excerpt = escapeHTML(project.excerpt);
    const meta = escapeHTML(project.meta || `${project.area || ""} · ${project.tag || ""}`.replace(/^\s*·\s*|\s*·\s*$/g, ""));

    const image = project.image || {};
    const imgSrc = escapeHTML(image.src || "");
    const imgAlt = escapeHTML(image.alt || project.title || "Projektbild");
    const imgWidth = Number(image.width) || 800;
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

  fetch(DATA_URL)
    .then((res) => {
      if (!res.ok) throw new Error("projects.json konnte nicht geladen werden");
      return res.json();
    })
    .then((data) => {
      const featured = document.querySelector(FEATURED_SELECTOR);
      const grid = document.querySelector(GRID_SELECTOR);

      if (!Array.isArray(data.categories)) return;

      const allProjects = data.categories.flatMap((category) =>
        Array.isArray(category.projects) ? category.projects : []
      );

      const featuredSlug =
        typeof data.featuredProjectSlug === "string" ? data.featuredProjectSlug.trim() : "";

      const featuredProject =
        allProjects.find((project) => project && project.slug === featuredSlug) ||
        allProjects.find((project) => project && project.featured === true) ||
        allProjects[0];

      if (featured && featuredProject) {
        featured.innerHTML = renderFeaturedProject(featuredProject);
      }

      if (!grid) return;

      const html = [];

      data.categories.forEach((category) => {
        const projects = Array.isArray(category.projects) ? category.projects : [];
        let renderedIndex = 0;
        projects.forEach((project) => {
          if (featuredProject && project.slug === featuredProject.slug) {
            return;
          }
          const sectionId = renderedIndex === 0 ? category.id : "";
          html.push(renderProjectCard(project, sectionId));
          renderedIndex += 1;
        });
      });

      if (html.length > 0) {
        grid.innerHTML = html.join("\n");
      }
    })
    .catch((err) => {
      console.error("Fehler beim Laden der Projekte:", err);
      // Fallback: bestehende statische Inhalte im HTML bleiben erhalten.
    });
});
