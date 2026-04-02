// main.js - Custom site scripts for performance and behavior

const RECAPTCHA_SITE_KEY = '6LcGrjsrAAAAANnaw3-0zqNGeg_hV8p8r1v1ndns';

// ======================
// reCAPTCHA Handler
// ======================
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

// ======================
// PandaVideo Lazy Loader
// ======================
// Prevent loading PandaPlayer until iframe is near viewport
// This avoids ~9MB of video payload downloading upfront
function initPandaVideoLazyLoad() {
  const pandaIframes = document.querySelectorAll('iframe[data-panda-player]');
  
  if (pandaIframes.length === 0) return;

  let pandaScriptLoaded = false;
  const observerOptions = {
    root: null,
    rootMargin: '500px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !pandaScriptLoaded) {
        // Load PandaPlayer API only when iframe is near viewport
        if (!document.querySelector('script[src*="player.pandavideo.com"]')) {
          const script = document.createElement('script');
          script.src = 'https://player.pandavideo.com.br/api.v2.js';
          script.async = true;
          document.head.appendChild(script);
          pandaScriptLoaded = true;
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe each iframe
  pandaIframes.forEach((iframe) => {
    observer.observe(iframe);
  });
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPandaVideoLazyLoad);
} else {
  initPandaVideoLazyLoad();
}

