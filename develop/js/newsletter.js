(() => {
  const form = document.querySelector('.newsletter__form');
  const input = document.getElementById('newsletter-email');
  const feedback = document.getElementById('newsletter-feedback');
  const button = form ? form.querySelector('.newsletter__button') : null;

  if (!form || !input || !feedback || !button) {
    return;
  }

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

    const email = input.value.trim();
    const subject = encodeURIComponent("Newsletter-Anmeldung | Knut's Wooden Dreams");
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
      setFeedback('Konnte das Mailprogramm nicht oeffnen. Bitte schreibe an admin@welzels.de.', 'is-error');
    } finally {
      window.setTimeout(() => {
        button.disabled = false;
        button.textContent = 'Abonnieren';
      }, 700);
    }
  });
})();
