# Deploying to GitHub Pages

The site is hosted on GitHub Pages and deploys itself. Push to `main` and the live site updates — no manual step, no separate dashboard.

## How it works

`.github/workflows/deploy.yml` runs on every push to `main`:

1. Installs dependencies with `npm ci`
2. Runs `npm run typecheck` and `npm run lint`
3. Runs `npm run build`, which produces a complete static site in `out/` and generates the redirect stubs
4. Publishes `out/` to GitHub Pages

**Typecheck and lint run before the build on purpose.** A type error or lint failure fails the workflow and the live site keeps serving the previous version, rather than deploying something broken.

## One-time setup

You only do this once.

1. Go to **github.com/Graig990/WATERSLIDES → Settings → Pages**
2. Under **Build and deployment → Source**, choose **GitHub Actions**

   *(Not "Deploy from a branch" — that mode serves the repo's raw files, which is what published the README the first time.)*
3. That is the whole configuration. There is nothing to pick, save, or point at a branch.

### Custom domain

`public/CNAME` contains `waterslides4kids.com` and is copied into `out/` on every build, so the domain survives each deploy. If you ever change domains, edit that file — not the GitHub UI, or the next deploy will overwrite it.

Your DNS should already point at GitHub Pages from the first attempt. If you need to redo it, GitHub's Pages settings page shows the exact records.

## Watching a deploy

The **Actions** tab shows every run. A push takes roughly 2–4 minutes to go live. If the workflow fails, the log tells you which step — usually typecheck or lint, both of which you can reproduce locally with `npm run typecheck` and `npm run lint`.

---

## What static hosting costs you

GitHub Pages serves files. It cannot run server code, so the app is built with `output: 'export'`. Four things work differently as a result, and it is worth knowing exactly what.

### 1. There are no API routes

The five API routes were removed. Their work moved into the browser:

- **Checkout** → `src/lib/placeOrder.ts`. Validates the order, resolves prices from the catalog by slug, and issues an order number — the same logic, running client-side.
- **Contact, newsletter, back-in-stock, reviews** → `src/lib/submitForm.ts`, which POSTs to a third-party form backend.

**⚠️ Forms do not send anything until you configure a backend.** See `src/data/forms.ts`. Until then each form says so and offers a prefilled `mailto:` — it never reports success for a message that went nowhere. Setting this up takes about five minutes with Formspree, Web3Forms, Formsubmit or Basin.

### 2. Order totals are computed in the browser

Prices are still looked up from the catalog rather than read off the form, so the UI cannot be fooled by editing a hidden field. But there is no server to enforce it, so a determined visitor could alter the total.

That is acceptable **only because payment is manual** — you see the order and the amount actually received before anything ships, so a mismatch surfaces during fulfilment. If you ever add an automatic card gateway, the amount must be calculated on a server you control. That means moving off static hosting.

### 3. Images are not optimised

`next/image` optimisation is a server feature, so `images.unoptimized` is on. Product images are served at full size from the supplier CDNs with no AVIF/WebP conversion and no resizing.

This is the single biggest performance cost of static hosting. Self-hosting properly-sized images under `public/` recovers most of it — and you need to replace that imagery anyway, since it currently belongs to other companies.

### 4. Redirects are meta-refresh, not 301

`redirects()` in `next.config` does nothing under static export. `scripts/generate-redirects.mjs` writes 38 HTML stubs after each build — one per legacy path — each with a canonical link, a meta refresh and a JS fallback.

Search engines follow these and honour the canonical, so old links do not dead-end. A real 301 is still stronger.

Security headers (`X-Frame-Options` and friends) are also gone; Pages does not let you set response headers.

---

## Verifying a deploy

```bash
npm run build
npm run serve      # serves out/ on http://localhost:3100
npm run audit -- http://127.0.0.1:3100
```

Expect **0 errors**. Then, once the live site updates:

```bash
npm run audit -- https://waterslides4kids.com
```

Spot-check by hand:

- [ ] Homepage renders with styling *(if it looks unstyled, `public/.nojekyll` is missing — Jekyll strips the `_next/` folder without it)*
- [ ] Add to cart → checkout → order confirmation completes
- [ ] A form shows the email fallback, or actually delivers once you have configured a backend
- [ ] `/sitemap.xml`, `/robots.txt` and a legacy path like `/products/<slug>/` all resolve
- [ ] A wrong URL shows the branded 404

## If you outgrow this

Static hosting is a genuine constraint, not a permanent one. If you later want real server-side price validation, working forms without a third party, image optimisation or true 301s, the app converts back by removing `output: 'export'` from `next.config.ts` and restoring the API routes from git history — then deploying somewhere that runs Node.
