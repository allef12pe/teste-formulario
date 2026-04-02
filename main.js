// main.js - Custom site scripts for performance and behavior

const RECAPTCHA_SITE_KEY = '6LcGrjsrAAAAANnaw3-0zqNGeg_hV8p8r1v1ndns';

function handleRecaptcha() {
  const responseField = document.getElementById('g-recaptcha-response');
  if (!responseField) {
    return;
  }

  if (typeof grecaptcha !== 'undefined' && grecaptcha.ready) {
    grecaptcha.ready(function () {
      grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit' }).then(function (token) {
        responseField.value = token;
      });
    });
  } else {
    // retry until grecaptcha is ready
    window.setTimeout(handleRecaptcha, 150);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handleRecaptcha);
} else {
  handleRecaptcha();
}
