/**
 * @file contact-form.js
 * @brief Validierung und Versandvorbereitung fuer das Kontaktformular.
 * @copyright Copyright (C) 2026 Knut's Wooden Dreams
 * @license GPL-3.0-only
 */

/**
 * @function initContactForm
 * @brief Initialisiert Formularvalidierung, Zeichenzahler und Mailto-Versand.
 * @returns {void}
 */
(() => {
  /** @type {HTMLFormElement|null} Formularcontainer. */
  const form = document.querySelector('.contact-form');
  /** @type {HTMLInputElement|null} Eingabefeld fuer Namen. */
  const nameInput = document.getElementById('name');
  /** @type {HTMLInputElement|null} Eingabefeld fuer E-Mail. */
  const emailInput = document.getElementById('email');
  /** @type {HTMLInputElement|null} Auswahlfeld fuer Thema. */
  const topicInput = document.getElementById('topic');
  /** @type {HTMLTextAreaElement|null} Nachrichtenfeld. */
  const messageInput = document.getElementById('message');
  /** @type {HTMLInputElement|null} Checkbox fuer Einwilligung. */
  const consentInput = document.getElementById('consent');
  /** @type {HTMLInputElement|null} Honeypot-Feld zur Bot-Erkennung. */
  const honeypot = document.getElementById('website');
  /** @type {HTMLElement|null} Zeichenzaehler der Nachricht. */
  const counter = document.getElementById('message-counter');
  /** @type {HTMLElement|null} Rueckmeldebereich fuer Statusmeldungen. */
  const feedback = document.getElementById('contact-feedback');
  /** @type {HTMLButtonElement|null} Senden-Button des Formulars. */
  const button = form ? form.querySelector('.contact-form__button') : null;

  if (!form || !nameInput || !emailInput || !topicInput || !messageInput || !consentInput || !feedback || !button) {
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

  /**
   * @function validate
   * @brief Prueft alle Formularfelder inkl. Honeypot.
   * @returns {boolean} True bei gueltiger Eingabe, sonst false.
   */
  function validate() {
    if (!nameInput.checkValidity()) {
      setFeedback('Bitte gib einen Namen mit mindestens 2 Zeichen ein.', 'is-error');
      nameInput.focus();
      return false;
    }

    if (!emailInput.checkValidity()) {
      setFeedback('Bitte gib eine gueltige E-Mail-Adresse ein.', 'is-error');
      emailInput.focus();
      return false;
    }

    if (!topicInput.checkValidity()) {
      setFeedback('Bitte waehle ein Thema aus.', 'is-error');
      topicInput.focus();
      return false;
    }

    if (!messageInput.checkValidity()) {
      setFeedback('Bitte schreibe eine Nachricht mit mindestens 20 Zeichen.', 'is-error');
      messageInput.focus();
      return false;
    }

    if (!consentInput.checked) {
      setFeedback('Bitte bestaetige die Einwilligung zur Verarbeitung deiner Angaben.', 'is-error');
      consentInput.focus();
      return false;
    }

    if (honeypot && honeypot.value.trim() !== '') {
      setFeedback('Senden konnte nicht abgeschlossen werden. Bitte versuche es erneut.', 'is-error');
      return false;
    }

    return true;
  }

  /**
   * @function updateCounter
   * @brief Aktualisiert den Zeichenzahler auf Basis der Nachrichtenlaenge.
   * @returns {void}
   */
  function updateCounter() {
    if (!counter) {
      return;
    }

    counter.textContent = String(messageInput.value.length);
  }

  messageInput.addEventListener('input', updateCounter);
  updateCounter();

  form.addEventListener('submit', (event) => {
    /** @type {SubmitEvent} */
    event.preventDefault();

    if (!validate()) {
      return;
    }

    /** @type {string} */
    const name = nameInput.value.trim();
    /** @type {string} */
    const email = emailInput.value.trim();
    /** @type {string} */
    const topic = topicInput.value.trim();
    /** @type {string} */
    const message = messageInput.value.trim();

    /** @type {string} */
    const subject = encodeURIComponent('Kontaktanfrage | Knut\'s Wooden Dreams');
    /** @type {string} */
    const body = encodeURIComponent(
      [
        'Hallo Knut,',
        '',
        `Name: ${name}`,
        `E-Mail: ${email}`,
        `Thema: ${topic}`,
        '',
        'Nachricht:',
        message,
        '',
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
      updateCounter();
    } catch (error) {
      /** @type {unknown} */
      void error;
      setFeedback('Konnte das Mailprogramm nicht oeffnen. Bitte schreibe an admin@welzels.de.', 'is-error');
    } finally {
      window.setTimeout(() => {
        button.disabled = false;
        button.textContent = 'Nachricht senden';
      }, 700);
    }
  });
})();
