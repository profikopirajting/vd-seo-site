# VD SEO

Static website for https://vd-seo.com.ua (Ukrainian and Russian).

- Entry point: `index.html`
- Contact forms: Formspree on `uk/contact.html` and `ru/contact.html`
- Formspree form endpoint is publicly visible by design; no API credentials are embedded.
- Telegram floating links are regular public `t.me` links.
- This static website does not use PHP.

**Deployment note:** Uploading this repository to GitHub does NOT automatically update the existing Cloudflare Worker. Deployment requires connecting a build/deployment mechanism or using Cloudflare Pages with a separate custom-domain migration. Do not change DNS until the replacement deployment is verified.

After a live deployment, test the form and confirm Gmail receipt. Telegram notifications for form submissions are not configured; the floating Telegram contact link works independently.

Cloudflare Workers deployment connected to GitHub.
