// Google Ads tag
window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function () {
  window.dataLayer.push(arguments);
};
window.gtag('consent', 'default', {
  ad_storage: 'denied',
  analytics_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});
window.gtag('js', new Date());
window.gtag('config', 'AW-18544055846');

const googleAdsScript = document.createElement('script');
googleAdsScript.async = true;
googleAdsScript.src = 'https://www.googletagmanager.com/gtag/js?id=AW-18544055846';
//document.head.appendChild(googleAdsScript);

// VD SEO contact phone, provided by the site owner.
const VD_SEO_PHONE_DISPLAY = "+380 66 907 63 04";
const VD_SEO_PHONE_DIAL = "+380669076304";

document.addEventListener("DOMContentLoaded", () => {
  const phone = document.getElementById("header-phone");
  if (phone && VD_SEO_PHONE_DISPLAY.trim() && /^\+[0-9]{8,15}$/.test(VD_SEO_PHONE_DIAL)) {
    phone.textContent = "☎ " + VD_SEO_PHONE_DISPLAY.trim();
    phone.href = "tel:" + VD_SEO_PHONE_DIAL;
    phone.hidden = false;
  }
  const selector = document.getElementById("selected-service");
  if (selector) {
    const service = new URLSearchParams(window.location.search).get("service");
    if (service) {
      // Retain the real base service as the selected option while showing chosen package.
      const opt = new Option(service, service, true, true);
      selector.add(opt);
      selector.value = service;
    }
  }
});

// Explicit copy action for desktop users who don't have a dialer configured.
document.addEventListener("DOMContentLoaded", () => {
  const copyButton = document.querySelector("[data-copy-phone]");
  const feedback = document.getElementById("phone-copy-feedback");
  if (!copyButton || !feedback) return;
  let feedbackTimer;
  copyButton.addEventListener("click", async () => {
    const uk = document.documentElement.lang === "uk";
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(VD_SEO_PHONE_DIAL);
      } else {
        const input = document.createElement("textarea");
        input.value = VD_SEO_PHONE_DIAL;
        input.setAttribute("readonly", "");
        input.style.position = "fixed";
        input.style.left = "-9999px";
        document.body.appendChild(input);
        input.select();
        const copied = document.execCommand("copy");
        input.remove();
        if (!copied) throw new Error("Copy unavailable");
      }
      feedback.textContent = uk ? "Номер скопійовано" : "Номер скопирован";
    } catch (_) {
      feedback.textContent = uk ? "Номер для копіювання: " + VD_SEO_PHONE_DIAL : "Номер для копирования: " + VD_SEO_PHONE_DIAL;
    }
    clearTimeout(feedbackTimer);
    feedbackTimer = setTimeout(() => { feedback.textContent = ""; }, 4500);
  });
});

// Contact form is handled by Formspree, compatible with static Cloudflare Workers assets.
// Direct form action is retained as a fallback if JavaScript is disabled.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;
  const status = form.querySelector("[data-form-status]");
  const submit = form.querySelector('[type="submit"]');
  const uk = document.documentElement.lang === "uk";
  form.addEventListener("submit", async (event) => {
    if (!form.reportValidity()) return;
    event.preventDefault();
    submit.disabled = true;
    status.hidden = false;
    status.className = "form-status";
    status.textContent = uk ? "Надсилаємо заявку…" : "Отправляем заявку…";
    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });
      if (!response.ok) throw new Error("Form submission rejected");
      if (window.vdSeoAdsConsent === true && typeof window.gtag === 'function') {
  window.gtag('event', 'conversion', {
    'send_to': 'AW-18544055846/Ube6CIWY5K4dEKasv4pF'
  });
}
      form.reset();
      status.className = "form-status form-status-ok";
      status.textContent = uk
        ? "Дякуємо! Заявку надіслано. Ми зв’яжемося з вами."
        : "Спасибо! Заявка отправлена. Мы свяжемся с вами.";
    } catch (error) {
      status.className = "form-status form-status-error";
      status.textContent = uk
        ? "Не вдалося надіслати заявку. Спробуйте пізніше або напишіть нам у Telegram."
        : "Не удалось отправить заявку. Попробуйте позже или напишите нам в Telegram.";
    } finally {
      submit.disabled = false;
    }
  });
});



```javascript
// VD SEO: cookie consent
(() => {
  const key = 'vd_seo_ads_consent';
  const uk = document.documentElement.lang === 'uk';

  function applyConsent(allowed) {
    window.vdSeoAdsConsent = allowed;
    window.gtag('consent', 'update', {
      ad_storage: allowed ? 'granted' : 'denied',
      analytics_storage: allowed ? 'granted' : 'denied',
      ad_user_data: allowed ? 'granted' : 'denied',
      ad_personalization: allowed ? 'granted' : 'denied'
    });
    if (allowed && !googleAdsScript.isConnected) {
      document.head.appendChild(googleAdsScript);
    }
  }

  function showBanner() {
    if (document.getElementById('vd-cookie-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'vd-cookie-banner';
    banner.style.cssText =
      'position:fixed;bottom:16px;left:16px;right:16px;' +
      'z-index:99999;background:#fff;color:#172033;' +
      'padding:20px;border-radius:12px;' +
      'box-shadow:0 4px 24px #0003;max-width:680px;' +
      'margin:auto;font:15px Arial,sans-serif;';

    const message = document.createElement('p');
    message.textContent = uk
      ? 'Ми використовуємо необов’язкові cookies Google Ads для оцінки ефективності реклами. Ви можете погодитися або відмовитися.'
      : 'Мы используем необязательные cookies Google Ads для оценки эффективности рекламы. Вы можете согласиться или отказаться.';

    banner.appendChild(message);

    function addButton(title, allowed) {
      const button = document.createElement('button');
      button.textContent = title;
      button.type = 'button';
      button.style.cssText =
        'padding:10px 18px;margin:6px;cursor:pointer;' +
        'border:1px solid #2563eb;border-radius:7px;';
      button.onclick = () => {
        const wasAllowed = window.vdSeoAdsConsent === true;
        localStorage.setItem(key, allowed ? 'yes' : 'no');
        applyConsent(allowed);
        banner.remove();
        if (wasAllowed && !allowed) location.reload();
      };
      banner.appendChild(button);
    }

    addButton(uk ? 'Відхилити' : 'Отклонить', false);
    addButton(uk ? 'Прийняти' : 'Принять', true);
    document.body.appendChild(banner);
  }

  document.addEventListener('DOMContentLoaded', () => {
    let saved = null;
    try {
      saved = localStorage.getItem(key);
    } catch (e) {}

    if (saved === 'yes') applyConsent(true);
    else if (saved === 'no') applyConsent(false);
    else showBanner();

    const settings = document.createElement('button');
    settings.type = 'button';
    settings.textContent = uk ? 'Налаштування cookies' : 'Настройки cookies';
    settings.style.cssText =
      'position:fixed;bottom:8px;left:8px;z-index:99998;' +
      'padding:6px 10px;font-size:12px;cursor:pointer;';
    settings.onclick = showBanner;
    document.body.appendChild(settings);
  });
})();
```
