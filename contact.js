(() => {
  const form = document.getElementById('contact-form');
  const phone = document.getElementById('phone');
  const sms = document.getElementById('sms-consent');
  const error = document.getElementById('form-error');
  const status = document.getElementById('form-status');
  const syncPhoneRequirement = () => {
    phone.required = sms.checked;
    phone.setCustomValidity('');
    phone.setAttribute('aria-required', String(sms.checked));
    error.hidden = true;
    status.hidden = true;
  };
  sms.addEventListener('change', syncPhoneRequirement);
  phone.addEventListener('input', () => phone.setCustomValidity(''));
  form.addEventListener('submit', event => {
    event.preventDefault();
    error.hidden = true;
    const number = phone.value.trim();
    if (sms.checked && !/^\+?[\d\s().-]+$/.test(number)) {
      phone.setCustomValidity('Enter a valid mobile phone number to request text messages.');
      phone.reportValidity();
      return;
    }
    if (sms.checked && (number.replace(/\D/g, '').length < 10 || number.replace(/\D/g, '').length > 15)) {
      phone.setCustomValidity('Enter a mobile phone number with 10 to 15 digits.');
      phone.reportValidity();
      return;
    }
    if (!form.reportValidity()) return;
    const body = [
      '3QInnova contact and messaging preferences',
      `Email: ${document.getElementById('email').value.trim()}`,
      `Mobile: ${number || 'Not provided'}`,
      `SMS customer-service and support consent: ${sms.checked ? 'YES, affirmatively selected' : 'NO, not selected'}`,
      'Terms of Service and Privacy Policy accepted: YES',
      `Request prepared at (UTC): ${new Date().toISOString()}`,
      'Form: https://3qinnova.com/Contact/',
      'Disclosure version: 2026-10-27',
      'Terms: https://3qinnova.com/Terms_And_Conditions/',
      'Privacy: https://3qinnova.com/Privacy_Policy/',
      '',
      'SMS disclosure presented:',
      document.querySelector('label[for="sms-consent"]').textContent.trim(),
      document.getElementById('consent-extra').textContent.trim(),
      '',
      'Message:',
      document.getElementById('message').value.trim() || '(No additional message)',
      '',
      'The prepared timestamp records form preparation only. This email must be sent and reviewed before any enrollment is confirmed.'
    ].join('\n');
    const mailto = `mailto:will@3qinnova.com?subject=${encodeURIComponent('3QInnova contact and messaging preferences')}&body=${encodeURIComponent(body)}`;
    status.textContent = 'Your email app should open with your request. Review and send the email to complete it. No text message has been sent and no automatic subscription has occurred. If your email app did not open, contact will@3qinnova.com directly.';
    status.hidden = false;
    window.location.href = mailto;
  });
  syncPhoneRequirement();
})();
