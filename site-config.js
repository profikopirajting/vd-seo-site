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
