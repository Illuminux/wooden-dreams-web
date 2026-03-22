# CSS Selector Map
Alle Selektoren aus `styles.css` mit ihrem neuen Speicherort in den CSS-Modulen.

---

## reset.css

| Selektor | Typ |
|---|---|
| `*, *::before, *::after` | Universal |
| `html` | Tag |
| `body` | Tag |
| `body::before` | Pseudo-Element (Textur-Overlay, nur `@media min-width: 768px`) |
| `@media (prefers-reduced-motion: reduce)` | Media Query |

---

## animations.css

| Selektor | Typ |
|---|---|
| `@keyframes fadeDown` | Animation |
| `@keyframes fadeUp` | Animation |

---

## variables.css

| Selektor | Typ |
|---|---|
| `:root` | Pseudo-Klasse |
| `--clr-bark` … `--clr-muted` | Primitive Tokens |
| `--page-bg`, `--card-bg`, `--text-main`, `--text-muted`, `--accent`, `--accent-hover`, `--border-color`, `--shadow-color` | Semantic Tokens |
| `--bark`, `--walnut`, `--oak`, `--honey`, `--sand`, `--linen`, `--warm-white`, `--muted`, `--rule`, `--shadow` | Legacy-Aliases |
| `--space-xs` … `--space-xl`, `--radius-md` | Spacing Tokens |

---

## layout.css

| Selektor | Typ |
|---|---|
| `.container` | Klasse |
| `header` | Tag |
| `header::after` | Pseudo-Element |
| `.header-rings` | Klasse |
| `.header-rings circle` | Verschachtelt (Tag) |
| `.header-inner` | Klasse |
| `.header-eyebrow` | Klasse |
| `.site-logo` | Klasse |
| `.site-logo svg` | Verschachtelt (Tag) |
| `.site-title` | Klasse |
| `.site-title span` | Verschachtelt (Tag) |
| `.site-tagline` | Klasse |
| `header nav` | Verschachtelt (Tag) |
| `header nav a` | Verschachtelt (Tag) |
| `header nav a:last-child` | Pseudo-Klasse |
| `header nav a:hover` | Pseudo-Klasse |
| `header nav a:focus` | Pseudo-Klasse |
| `.section-label` | Klasse |
| `.section-label:first-child` | Pseudo-Klasse |
| `.section-label::before`, `.section-label::after` | Pseudo-Elemente |
| `.section-label h2` | Verschachtelt (Tag) |
| `.about-band` | Klasse |
| `.about-avatar` | Klasse |
| `.about-avatar svg` | Verschachtelt (Tag) |
| `.about-text h3` | Verschachtelt (Tag) |
| `.about-text p` | Verschachtelt (Tag) |
| `footer` | Tag |
| `.footer-logo-img` | Klasse |
| `.footer-logo-img svg`, `.footer-logo-img img` | Verschachtelt (Tags) |
| `.footer-sub` | Klasse |
| `footer nav.footer-links` | Verschachtelt (Tag + Klasse) |
| `.footer-links a` | Verschachtelt (Tag) |
| `.footer-links a:hover` | Pseudo-Klasse |
| `.footer-copy` | Klasse |
| `.breadcrumb` | Klasse |
| `.breadcrumb a` | Verschachtelt (Tag) |
| `.breadcrumb a:hover` | Pseudo-Klasse |
| `.breadcrumb span` | Verschachtelt (Tag) |
| `.site-footer` | BEM-Block (Klasse) |
| `.site-footer__inner` | BEM-Element |
| `.site-footer__logo` | BEM-Element |
| `.site-footer__links` | BEM-Element |
| `.site-footer__link` | BEM-Element |
| `.site-footer__link:hover` | Pseudo-Klasse |
| `.site-footer__copy` | BEM-Element |
| `.sidebar` | Klasse (Layout-Ebene, `gap: var(--space-xl)`) |
| `.sidebar__widget` | BEM-Element |
| `.sidebar__title` | BEM-Element |
| `.sidebar__list` | BEM-Element |
| `.sidebar__link` | BEM-Element |
| `.sidebar__link:hover` | Pseudo-Klasse |

---

## components.css

| Selektor | Typ |
|---|---|
| `.skip-link` | Klasse |
| `.skip-link:focus` | Pseudo-Klasse |
| `a:focus`, `button:focus`, `input:focus`, `textarea:focus`, `select:focus`, `details summary:focus` | Fokus-States |
| `.post-card`, `.tool-card`, `.drawing-thumb` | Performance `will-change` |
| `.btn-read` | Klasse |
| `.btn-read:hover` | Pseudo-Klasse |
| `.back-link` | Klasse |
| `.back-link:hover` | Pseudo-Klasse |
| `.featured` | Klasse |
| `.featured-visual` | Klasse |
| `.featured-visual::after` | Pseudo-Element |
| `.wood-art` | Klasse |
| `.featured-content` | Klasse |
| `.post-tag` | Klasse |
| `.featured-title` | Klasse |
| `.featured-excerpt` | Klasse |
| `.featured-meta` | Klasse |
| `.posts-grid` | Klasse |
| `.post-card` | Klasse |
| `.post-card:nth-child(2–6)` | Pseudo-Klassen (animation-delay) |
| `.post-card:hover` | Pseudo-Klasse |
| `.post-card:hover .card-thumb-inner` | Verschachtelt |
| `.post-card.card-3d .card-thumb` | Modifier + Verschachtelt |
| `.post-card.card-3d .card-thumb iframe` | Verschachtelt |
| `.card-thumb` | Klasse |
| `.card-thumb-inner` | Klasse |
| `.t1` … `.t6` | Klassen (Thumbnail-Themes) |
| `.thumb-icon` | Klasse |
| `.card-body` | Klasse |
| `.card-tag` | Klasse |
| `.card-title` | Klasse |
| `.card-excerpt` | Klasse (WCAG-Override: `color: #4a3a2a`) |
| `.card-footer` | Klasse |
| `.read-more` | Klasse |
| `.read-more:hover` | Pseudo-Klasse |
| `.card-3d-badge` | Klasse |
| `.newsletter` | Klasse (Legacy-Block) |
| `.newsletter::before` | Pseudo-Element |
| `.newsletter h3` | Verschachtelt (Tag) |
| `.newsletter p` | Verschachtelt (Tag) |
| `.nl-form` | Klasse |
| `.nl-form input` | Verschachtelt (Tag) |
| `.nl-form input::placeholder` | Pseudo-Element |
| `.nl-form button` | Verschachtelt (Tag) |
| `.nl-form button:hover` | Pseudo-Klasse |
| `.newsletter__title` | BEM-Element |
| `.newsletter__text` | BEM-Element |
| `.newsletter__form` | BEM-Element |
| `.newsletter__input` | BEM-Element |
| `.newsletter__input:focus` | Pseudo-Klasse |
| `.newsletter__button` | BEM-Element |
| `.newsletter__button:hover` | Pseudo-Klasse |
| `.lightbox` | Klasse |
| `.lightbox.open` | Modifier |
| `.lightbox-content` | Klasse |
| `#lbImg` | ID |
| `.lb-prev`, `.lb-next` | Klassen |
| `.lb-prev:hover`, `.lb-next:hover` | Pseudo-Klassen |
| `.close-lightbox` | Klasse |
| `.close-lightbox:hover` | Pseudo-Klasse |
| `#lbCaption` | ID |
| `.featured-excerpt`, `.project-subtitle` | WCAG-Override (zusammen mit `.card-excerpt`) |
| `@keyframes fadeIn` | Animation |

---

## tools.css

| Selektor | Typ |
|---|---|
| `.tools-grid` | Klasse |
| `.tool-card` | Klasse |
| `.tool-card:nth-child(2–6)` | Pseudo-Klassen (animation-delay) |
| `.tool-card:hover .tool-thumb img` | Verschachtelt |
| `.tool-thumb` | Klasse |
| `.tool-thumb img` | Verschachtelt (Tag) |
| `.tool-thumb-placeholder` | Klasse |
| `.tool-thumb-placeholder svg` | Verschachtelt (Tag) |
| `.tool-thumb-placeholder span` | Verschachtelt (Tag) |
| `.tool-category-badge` | Klasse |
| `.tool-body` | Klasse |
| `.tool-maker` | Klasse |
| `.tool-name` | Klasse |
| `.tool-desc` | Klasse |
| `.tool-footer` | Klasse |
| `.tool-buy-btn` | Klasse |
| `.tool-buy-btn:hover` | Pseudo-Klasse |
| `.rating-reason` | Klasse |
| `.category-section` | Klasse |
| `.category-header` | Klasse |
| `.category-header h2` | Verschachtelt (Tag) |
| `.category-count` | Klasse |
| `section.baugruppe` | Tag + Klasse |
| `.tool-grid` | BEM-Block (neue Struktur) |
| `.tool-card__icon` | BEM-Element |
| `.tool-card__name` | BEM-Element |

---

## projects.css

| Selektor | Typ |
|---|---|
| `.featured-3d` | Klasse |
| `.viewer-wrap` | Klasse |
| `.viewer-wrap iframe` | Verschachtelt (Tag) |
| `.viewer-badge` | Klasse |
| `.project-hero` | Klasse |
| `.project-category` | Klasse |
| `.project-title` | Klasse |
| `.project-subtitle` | Klasse (Basis: `color: var(--muted)`) |
| `.project-meta` | Klasse |
| `.project-meta-item strong` | Verschachtelt (Tag) |
| `.viewer-section` | Klasse |
| `.viewer-frame` | Klasse |
| `.viewer-frame iframe` | Verschachtelt (Tag) |
| `.viewer-hint` | Klasse |
| `.content-grid` | Klasse |
| `.container h1`, `.project-article h1` | Verschachtelt (Tag) |
| `.container h2`, `.project-article h2` | Verschachtelt (Tag) |
| `.container h3`, `.project-article h3` | Verschachtelt (Tag) |
| `.container h4`, `.project-article h4` | Verschachtelt (Tag) |
| `.project-article` | Klasse |
| `.project-article > h2`, `> h3`, `> p`, `> ul`, `> ol`, `> blockquote`, `> .pull-quote` | Child-Selektoren |
| `.project-article > .drawings-grid`, `> .info-box`, `> .viewer-section`, `> img`, `> figure` | Child-Selektoren |
| `.project-article h2` | Verschachtelt (Override) |
| `.project-article h2:first-child` | Pseudo-Klasse |
| `.project-article p` | Verschachtelt (Tag) |
| `.project-article ul` | Verschachtelt (Tag) |
| `.project-article ul li` | Verschachtelt (Tag) |
| `.project-article ul li:last-child` | Pseudo-Klasse |
| `.project-article ul li::before` | Pseudo-Element |
| `.pull-quote` | Klasse |
| `.steps` | Klasse |
| `.steps li` | Verschachtelt (Tag) |
| `.steps li:last-child` | Pseudo-Klasse |
| `.steps li::before` | Pseudo-Element |
| `.steps li div` | Verschachtelt (Tag) |
| `.steps li strong` | Verschachtelt (Tag) |
| `.sidebar` | Klasse (Projekt-Ebene, `gap: 1.5rem`) |
| `.info-box` | Klasse |
| `.info-box:hover` | Pseudo-Klasse |
| `.info-box p` | Verschachtelt (Tag) |
| `.info-box h4` | Verschachtelt (Tag) |
| `.tag-list` | Klasse |
| `.text-divider` | Klasse |
| `.note-box` | Klasse |
| `.note-box strong` | Verschachtelt (Tag) |
| `.note-box p` | Verschachtelt (Tag) |
| `.note-box summary` | Verschachtelt (Tag) |
| `.note-box p:last-child` | Pseudo-Klasse |
| `.note-box:has(strong:first-child)` | `:has()`-Selektor |
| `.step-card` | Klasse |
| `.step-card h4` | Verschachtelt (Tag) |
| `.step-card p` | Verschachtelt (Tag) |
| `.step-card p:last-child` | Pseudo-Klasse |
| `.image-slot` | Klasse |
| `h2 + .note-box` … `h3 + .stueckliste-inline` | Adjacent-Sibling-Selektoren |
| `.wood-table` | Klasse |
| `.wood-table table` | Verschachtelt (Tag) |
| `.wood-table thead th` | Verschachtelt (Tag) |
| `.wood-table tbody tr:nth-child(even)` | Pseudo-Klasse |
| `.wood-table tbody tr:hover` | Pseudo-Klasse |
| `.wood-table tbody tr:last-child td` | Pseudo-Klasse |
| `.wood-table td` | Verschachtelt (Tag) |
| `.wood-table td:first-child` | Pseudo-Klasse |
| `.wood-table a` | Verschachtelt (Tag) |
| `.wood-table a:hover` | Pseudo-Klasse |
| `.wood-table small` | Verschachtelt (Tag) |
| `.parts-list` | Klasse |
| `.parts-list summary` | Verschachtelt (Tag) |
| `.parts-list summary:first-child` | Pseudo-Klasse |
| `.parts-list summary::-webkit-details-marker` | Pseudo-Element |
| `.parts-list summary::before` | Pseudo-Element |
| `.parts-list[open] summary::before` | Attribut-Selektor |
| `.parts-list summary:hover` | Pseudo-Klasse |
| `.parts-list details` | Verschachtelt (Tag) |
| `.parts-table` | Klasse |
| `.parts-table thead th` | Verschachtelt (Tag) |
| `.parts-table tbody tr:nth-child(even)` | Pseudo-Klasse |
| `.parts-table tbody tr:hover` | Pseudo-Klasse |
| `.parts-table tbody tr:last-child td` | Pseudo-Klasse |
| `.parts-table td` | Verschachtelt (Tag) |
| `.parts-table td:first-child` | Pseudo-Klasse |
| `.parts-table a` | Verschachtelt (Tag) |
| `.parts-table a::after` | Pseudo-Element |
| `.parts-table a:hover` | Pseudo-Klasse |
| `.parts-table a:hover::after` | Pseudo-Element + Pseudo-Klasse |
| `.parts-table small` | Verschachtelt (Tag) |
| `.stueckliste-inline` | Klasse |
| `.stueckliste-inline h4` | Verschachtelt (Tag) |
| `.stueckliste-inline .parts-table` | Verschachtelt (Klasse) |
| `.stueckliste-inline .parts-table th` | Verschachtelt |
| `.stueckliste-inline .parts-table td` | Verschachtelt |
| `.stueckliste-inline details` | Verschachtelt (Tag) |
| `.stueckliste-inline p` | Verschachtelt (Tag) |
| `details` | Tag |
| `details:last-child` | Pseudo-Klasse |
| `details summary` | Verschachtelt (Tag) |
| `details summary::-webkit-details-marker` | Pseudo-Element |
| `details summary::after` | Pseudo-Element |
| `details[open] summary::after` | Attribut-Selektor |
| `details summary:hover` | Pseudo-Klasse |
| `.drawings-grid` | Klasse |
| `.drawing-thumb` | Klasse |
| `.drawing-thumb:hover` | Pseudo-Klasse |
| `.drawing-thumb img` | Verschachtelt (Tag) |
| `.drawing-thumb:hover img` | Verschachtelt |
| `.drawing-thumb .pdf-download` | Verschachtelt (Klasse) |
| `.drawing-thumb:hover .pdf-download` | Verschachtelt |
| `.drawing-hint` | Klasse |
| `.hero-image img` | Verschachtelt (Tag) |
| `.project-article__hero` | BEM-Element |
| `.project-article__drawings-grid`, `__info-box`, `__viewer-section`, `__full-image` | BEM-Elemente |
| `.drawings-grid__item` | BEM-Element |
| `.drawings-grid__item img` | Verschachtelt (Tag) |
| `.drawings-grid__item img:hover` | Pseudo-Klasse |
| `.info-box__stat-label` | BEM-Element |
| `.info-box__stat-value` | BEM-Element |

---

## Hinweise

- **`.sidebar`** ist bewusst zweimal definiert: `layout.css` (BEM-Struktur, `gap: var(--space-xl)`) und `projects.css` (Projekt-Ebene, `gap: 1.5rem`).
- **`.newsletter`** ist bewusst zweimal in `components.css`: Legacy-Block und BEM-Block für schrittweise Migration.
- **`.featured-excerpt`** und **`.project-subtitle`** erhalten in `components.css` den WCAG-Override `color: #4a3a2a` (zusammen mit `.card-excerpt`).
- **`#lbImg`** und **`#lbCaption`** sind die einzigen IDs im gesamten System.
- **`details`** und **`details summary`** sind in `projects.css` definiert (globale Styles für alle `<details>`-Elemente auf Projektseiten).
