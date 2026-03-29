(() => {
  const form = document.querySelector('.contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const topicInput = document.getElementById('topic');
  const messageInput = document.getElementById('message');
  const consentInput = document.getElementById('consent');
  const honeypot = document.getElementById('website');
  const counter = document.getElementById('message-counter');
  const feedback = document.getElementById('contact-feedback');
  const button = form ? form.querySelector('.contact-form__button') : null;

  if (!form || !nameInput || !emailInput || !topicInput || !messageInput || !consentInput || !feedback || !button) {
    return;
  }

  function setFeedback(message, kind) {
    feedback.textContent = message;
    feedback.classList.remove('is-success', 'is-error');
    if (kind) {
      feedback.classList.add(kind);
    }
  }

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

  function updateCounter() {
    if (!counter) {
      return;
    }

    counter.textContent = String(messageInput.value.length);
  }

  messageInput.addEventListener('input', updateCounter);
  updateCounter();

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const topic = topicInput.value.trim();
    const message = messageInput.value.trim();

    const subject = encodeURIComponent('Kontaktanfrage | Knut\'s Wooden Dreams');
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
      setFeedback('Konnte das Mailprogramm nicht oeffnen. Bitte schreibe an admin@welzels.de.', 'is-error');
    } finally {
      window.setTimeout(() => {
        button.disabled = false;
        button.textContent = 'Nachricht senden';
      }, 700);
    }
  });
})();
