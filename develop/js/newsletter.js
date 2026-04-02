/**
 * @file newsletter.js
 * @brief Validierung und Versandvorbereitung fuer das Newsletter-Formular.
 * @copyright Copyright (C) 2026 Knut's Wooden Dreams
 * @license GPL-3.0-only
 */

/**
 * @function initNewsletterForm
 * @brief Initialisiert Formularvalidierung und Mailto-Versand fuer Newsletter-Anmeldung.
 * @returns {void}
 */
(() => {
  /** @type {HTMLFormElement|null} Newsletter-Formular. */
  const form = document.querySelector('.newsletter__form');
  /** @type {HTMLInputElement|null} E-Mail-Eingabefeld. */
  const input = document.getElementById('newsletter-email');
  /** @type {HTMLElement|null} Bereich fuer Rueckmeldungen. */
  const feedback = document.getElementById('newsletter-feedback');
  /** @type {HTMLButtonElement|null} Absende-Button. */
  const button = form ? form.querySelector('.newsletter__button') : null;

  if (!form || !input || !feedback || !button) {
    return;
  }

  /**
   * @function setFeedback
   * @brief Setzt Rueckmeldungstext und Statusklasse.
   * @param {string} message Auszugebende Meldung.
   * @param {string} [kind] Optionale CSS-Klasse, z. B. is-success oder is-error.
   * @returns {void}
   */
  function setFeedback(message, kind) {
    feedback.textContent = message;
    feedback.classList.remove('is-success', 'is-error');
    if (kind) {
      feedback.classList.add(kind);
    }
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!input.checkValidity()) {
      setFeedback('Bitte gib eine gueltige E-Mail-Adresse ein.', 'is-error');
      input.focus();
      return;
    }

    /** @type {string} */
    const email = input.value.trim();
    /** @type {string} */
    const subject = encodeURIComponent("Newsletter-Anmeldung | Knut's Wooden Dreams");
    /** @type {string} */
    const body = encodeURIComponent(
      [
        'Hallo Knut,',
        '',
        'bitte nimm mich in den Newsletter auf.',
        '',
        `E-Mail: ${email}`,
        `Seite: ${window.location.pathname}`,
        `Zeitpunkt: ${new Date().toISOString()}`,
      ].join('\n')
    );

    button.disabled = true;
    button.textContent = 'Wird vorbereitet...';

    try {
      window.location.href = `mailto:admin@welzels.de?subject=${subject}&body=${body}`;
      setFeedback('Danke! Dein Mailprogramm wurde geoeffnet.', 'is-success');
      form.reset();
    } catch (error) {
      /** @type {unknown} */
      void error;
      setFeedback('Konnte das Mailprogramm nicht oeffnen. Bitte schreibe an admin@welzels.de.', 'is-error');
    } finally {
      window.setTimeout(() => {
        button.disabled = false;
        button.textContent = 'Abonnieren';
      }, 700);
    }
  });
})();
