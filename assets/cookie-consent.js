(function () {
  var GA_ID = 'G-1RQLRQ90TM';
  var FB_PIXEL_ID = '5870071909776590';
  var STORAGE_KEY = 'ln_cookie_consent';

  function loadAnalytics() {
    var s1 = document.createElement('script');
    s1.async = true;
    s1.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s1);
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);

    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', FB_PIXEL_ID);
    fbq('track', 'PageView');
  }

  var consent = localStorage.getItem(STORAGE_KEY);
  if (consent === 'accepted') { loadAnalytics(); return; }
  if (consent === 'rejected') { return; }

  function showBanner() {
    var banner = document.createElement('div');
    banner.id = 'ln-cookie-banner';
    banner.innerHTML =
      '<div class="ln-cookie-inner">' +
      '<p>Usamos cookies propias y de terceros (Google Analytics, Meta) para analizar el uso de la web. Puedes aceptarlas o rechazarlas. <a href="/politica-de-cookies/">Más información</a></p>' +
      '<div class="ln-cookie-btns">' +
      '<button id="ln-cookie-reject" type="button">Rechazar</button>' +
      '<button id="ln-cookie-accept" type="button">Aceptar</button>' +
      '</div></div>';
    document.body.appendChild(banner);

    document.getElementById('ln-cookie-accept').addEventListener('click', function () {
      localStorage.setItem(STORAGE_KEY, 'accepted');
      banner.remove();
      loadAnalytics();
    });
    document.getElementById('ln-cookie-reject').addEventListener('click', function () {
      localStorage.setItem(STORAGE_KEY, 'rejected');
      banner.remove();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showBanner);
  } else {
    showBanner();
  }
})();
