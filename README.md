# WaterSlides4Kids

Commercial-grade inflatable water slide e-commerce store. Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, exported as a fully static site and hosted on GitHub Pages. Push to `main` and the live site updates.

**Live routes:** 67 prerendered pages — 26 product pages, 8 collections, 10 long-form guides, plus shop, cart, checkout, support and legal pages.

---

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000. No env vars are required — the full cart → checkout → confirmation flow works out of the box.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run serve` | Serve the static export in `out/` on :3100 |
| `npm run lint` | ESLint (flat config, `next/core-web-vitals` + `next/typescript`) |
| `npm run typecheck` | `tsc --noEmit`, strict mode, zero `any` |
| `npm run audit -- http://localhost:3000` | Crawl a running build and check for dead links, duplicate/missing titles and descriptions, H1 counts, canonicals, missing image alt, and invalid JSON-LD |

The audit is the pre-deploy gate. Run it against the built output:

```bash
npm run build
npm run serve &
npm run audit -- http://127.0.0.1:3100
```

It exits non-zero on any error, so it drops straight into CI.

---

## Environment variables

Copy `.env.example` to `.env.local`. Every value is optional.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin. Drives canonical tags, OG URLs and `sitemap.xml`. Defaults to `https://waterslides4kids.com`. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Renders the Search Console `<meta>` tag when set. |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Renders the Bing Webmaster `<meta>` tag when set. |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | Loads GA4 (deferred). No analytics script loads at all when unset. |

There are no payment env vars — see below.

## Payments — manual settlement

The store accepts **Zelle, Chime, Cash App, Apple Pay and crypto (BTC, ETH, USDT)**. There is no card gateway, which shapes the whole flow:

1. Customer picks a payment method at checkout.
2. `/api/checkout` validates, resolves prices, and issues an order number. **Nothing is charged.**
3. The confirmation page shows payment instructions for that method — account handle or wallet address, the exact amount, and the order number to use as a reference.
4. You confirm the funds have cleared, then ship.

Orders are therefore *awaiting payment*, never *paid*, and the UI says so.

**Prices are resolved from `products.ts` by slug**, not read off the submitted form, so the UI cannot be fooled by editing a hidden field. Note this now runs in the browser — see the static-hosting caveats in [`docs/deploying-to-github-pages.md`](docs/deploying-to-github-pages.md).

### Configuring payment accounts

Everything lives in [`src/data/payments.ts`](src/data/payments.ts) — handles in `paymentMethods`, wallet addresses in `cryptoAssets`. They are in version control rather than env vars deliberately, because a wrong wallet address is a money-loss bug and it should be reviewable in a diff.

**Every field ships empty.** The UI checks `isMethodConfigured()` and, for anything unfilled, tells the customer you will email the details instead of displaying an account. No placeholder handle or example wallet address appears anywhere in this codebase — crypto sent to a wrong address is unrecoverable, so there is nothing here that could be mistaken for a real one.

Before launch: fill each field in, then **send yourself a small test payment on every method you enable.** Copy crypto addresses from your wallet; never retype them.

### Things to know about these rails

- **No chargeback or buyer/seller protection** on any of them. Confirm funds have actually cleared before shipping — Zelle and Cash App payments can still be reversed by a sending bank in fraud cases, and crypto cannot be reversed at all.
- **Zelle, Chime and Cash App are peer-to-peer consumer services.** Their terms generally restrict business use, and running commercial volume through a personal account risks it being frozen. Use a business account where the provider offers one and check their current terms.
- **Network matters for crypto.** `cryptoAssets` carries a `network` field that is displayed alongside every address, because funds sent on the wrong network are lost. USDT in particular exists on several chains.
- **Tax and reporting** are your responsibility on all of these; none of them withhold or report the way a card processor does.

---

## Project structure

```
src/
  app/                   Routes (App Router)
    collections/[slug]/  All 8 collections (topic + height)
    shop/[slug]/         26 product pages
    blog/[slug]/         10 guides, bodies pulled from src/content
    sitemap.ts robots.ts
  components/
    blog/ cart/ checkout/ home/ layout/ product/ shop/ ui/
  content/blog/          MDX article bodies
  data/                  site.ts, products.ts, collections.ts, blog.ts, reviews.ts,
                         payments.ts, forms.ts
  hooks/ lib/ store/
public/brand/            Logo lockups, favicons, PWA icons, OG card
scripts/audit.mjs        Link + SEO crawler
scripts/generate-redirects.mjs  Static redirect stubs (runs after build)
.github/workflows/       Auto-deploy to GitHub Pages on push to main
docs/                    Competitive analysis, launch checklist, brand guide
```

**`src/data/` is the content layer.** Everything else reads from it. To change what the site sells or says, edit those files — no component changes needed.

---

## Adding a product

Append an object to the `products` array in `src/data/products.ts`. TypeScript enforces the shape, so a missing field is a build error rather than a broken page.

```ts
{
  slug: 'my-new-slide',              // becomes /shop/my-new-slide
  name: "My New 16' Water Slide",
  shortName: "My New 16'",            // compare tables, cart lines, breadcrumbs
  image: 'https://…',                 // host must be in next.config.ts remotePatterns
  msrp: 2400, price: 1399,            // null for both = "Call for Availability"
  stock: 'in-stock',                  // 'in-stock' | 'pre-order' | 'out-of-stock'
  collections: ['water-slides'],
  sku: 'WS4K-…', mpn: '…',
  heightFt: 16,                       // null for combos — drives height collections
  lanes: 1, poolType: 'attached', wetDry: false,
  tagline: '…',
  intro: '…',                         // lead paragraph
  body: ['…', '…'],                   // 300–500 unique words total with intro
  highlights: ['…'], inTheBox: ['…'],
  specs: [{ label: '…', value: '…' }],
  faqs: [{ question: '…', answer: '…' }],
  relatedSlugs: ['…'], blogSlugs: ['…'],
}
```

It then appears automatically on `/shop`, in every collection it matches (including the height collections, derived from `heightFt`), in `sitemap.xml`, and with full `Product` + `Offer` JSON-LD.

Set `homepageFeatured: true` to put it in the homepage grid — the grid is meant to hold exactly ten, so unset another when you add one.

**New image host?** Add it to `images.remotePatterns` in `next.config.ts` or `next/image` will refuse to load it.

## Adding a blog post

1. Add metadata to `blogPosts` in `src/data/blog.ts` (title, meta title/description, category, dates, FAQs, `linkedProductSlugs`).
2. Create `src/content/blog/<slug>.mdx` with the body. Plain markdown; internal links automatically route through `next/link`.

The post gets `Article` + `FAQPage` JSON-LD, an author block, a featured image taken from `featureProductSlug`, and a sitemap entry.

## Reviews

Customers submit reviews from the block on any product page. Submissions POST to `/api/reviews`, which validates them and routes them **to moderation rather than straight to the page** — publishing unmoderated text on a childrens product site invites abuse, and the FTC rules on consumer reviews mean you need to be able to stand behind what appears on your own product pages.

To publish one: verify the reviewer actually bought the product, then add an entry to `src/data/reviews.ts`. The PDP review block, the homepage reviews section and `AggregateRating` schema all switch on automatically. A star average and `AggregateRating` only appear once a product has at least `MIN_REVIEWS_FOR_SCHEMA` (3) real reviews — below that an average is noise.

`reviews.ts` ships **empty on purpose**. Do not seed it with samples, even temporarily: fabricated reviews are an FTC problem before they are an SEO one, and fake `AggregateRating` markup is a well-known trigger for a manual action that strips rich results across the whole domain.

TODO in `/api/reviews`: wire the moderation destination (database, helpdesk, or an email to yourself).

---

## SEO implementation notes

Things that are load-bearing and easy to break:

- **One H1 per page.** The hero slider keeps all three slides mounted for layout stability, so only the *active* slide renders an `<h1>` — the others render the same text as a `<p>`. The audit script fails the build if any page has zero or more than one.
- **`/shop` filtering is client-side and never touches the URL.** No `?lanes=2&pool=attached` permutations compete with `/shop` in the index. The full 26-product grid is in the prerendered HTML.
- **Search deliberately uses a plain GET form** rather than `router.push`. `useSearchParams` would opt the shop grid out of static prerendering and leave a Suspense fallback — not the catalog — in the HTML Googlebot receives.
- **`/cart`, `/checkout` and `/order-confirmation` are `noindex`**, excluded from the sitemap, and disallowed in `robots.txt`.
- **Schema is emitted server-side** so it is in the initial HTML: `Organization` + `WebSite`/`SearchAction` sitewide, `Product`/`Offer`, `ItemList`, `BreadcrumbList`, `FAQPage`, `Article`, `VideoObject`.
- **`LocalBusiness` schema is suppressed** until a real address is set — see below.
- **The YouTube embed is a facade.** The iframe is only injected on click, keeping ~500KB of third-party JS out of the initial load.

---

## ⚠️ Before you go live

Four things in this repo are deliberately unfinished, and shipping them as-is would cause real problems.

### 1. Contact details are placeholders

Everything is read from `src/data/site.ts`. Change it in one place.

`(555) 010-2025` is a reserved fictional number and the email addresses do not resolve. While `businessAddress` is `null`, **no `LocalBusiness`/`PostalAddress` JSON-LD is emitted** — that is intentional. A fabricated NAP is worse than none, because Google cross-references it against other citations and inconsistency actively suppresses local visibility. Fill in a real, verifiable address and the schema switches itself on.

Same for `socialsClaimed` — the `sameAs` profiles stay out of schema until you confirm you control those handles.

### 2. Product images are hotlinked from suppliers

Every product photo is served from `herokiddo.com` or `www.xjump.com`. They are perfect for building and demoing and they are **someone else's copyrighted assets on someone else's CDN**. They can be changed or blocked at any time, and using them commercially is not yours to do.

Replace with your own supplier-provided or self-shot photography, self-host it under `public/`, and update `image` in `products.ts`.

### 3. Every specification is an example

Footprints, rider capacities, weight limits, age ranges, blower requirements, vinyl weights and warranty terms are representative placeholders for each class of slide — **not figures quoted from a supplier data sheet.** They are labelled as such on every product page and in `products.ts`.

Confirm all of them with your supplier before launch. Publishing a wrong weight limit or age range on a children's product is a liability problem long before it is an SEO problem.

`mpn` values are read off the public product-image filenames and also need confirming.

### 4. Payment accounts are empty

Every handle and wallet address in `src/data/payments.ts` is blank. Until they are filled in, checkout completes and tells customers you will email payment details. Fill them in and send yourself a test payment on each enabled method before trading.

### 5. The legal pages are templates

`/privacy-policy` and `/terms` describe how the site actually behaves, but they have not been reviewed by an attorney and both carry a visible banner saying so. Because you are selling children's recreational equipment, the liability, safe-use and indemnity sections deserve professional review. The governing-law clause needs your actual state.

### Also outstanding

- `/api/newsletter`, `/api/notify`, `/api/contact` and `/api/reviews` validate and accept but do not yet deliver anywhere — wire up your email platform. They deliberately do not log email addresses or message contents.
- `/financing` describes options honestly but no financing provider is integrated.
- No per-product setup videos yet; the PDP links to the homepage video as a stand-in.
- Orders are not persisted anywhere. The confirmation page reads a `sessionStorage` snapshot, so a customer who closes the tab loses their payment instructions. Wiring up order storage and a confirmation email is the first thing to do for real trading.

---

## Deploying

**Push to `main` and the site deploys itself.** `.github/workflows/deploy.yml` typechecks, lints, builds the static export and publishes it to GitHub Pages. Typecheck and lint run first, so a broken commit fails the workflow and the live site keeps serving the previous version.

One-time setup and the full trade-offs of static hosting are in [`docs/deploying-to-github-pages.md`](docs/deploying-to-github-pages.md). The short version of what static costs you:

- **No API routes.** Form submissions need a third-party backend — see `src/data/forms.ts`. **Until it is configured, forms do not send anything**; they say so and offer a prefilled `mailto:` rather than faking success.
- **Order totals are computed in the browser.** Acceptable only because payment is manual and you confirm the amount received before shipping. Do not add a card gateway without moving the calculation back to a server.
- **Images are not optimised.** `next/image` optimisation needs a server. Self-hosting resized images recovers most of the loss.
- **Redirects are meta-refresh, not 301**, generated by `scripts/generate-redirects.mjs`.

Then work through [`docs/seo-launch-checklist.md`](docs/seo-launch-checklist.md).

## Docs

- [`docs/seo-competitive-analysis.md`](docs/seo-competitive-analysis.md) — competitor findings, the keyword→page map, and the five strategies this build implements
- [`docs/seo-launch-checklist.md`](docs/seo-launch-checklist.md) — Search Console, GA4, indexing, and a backlink starter plan
- [`docs/BRAND-GUIDE.md`](docs/BRAND-GUIDE.md) — logo usage, colours, typography

## A note on ranking expectations

No build guarantees a #1 spot. Google weighs domain authority, backlinks and brand signals that a new site has not accumulated yet. What this codebase does is make the site technically strong on the factors you control — speed, schema coverage, content depth and information architecture — which is what makes long-tail keywords winnable in months and head terms winnable over a year or two of consistent content and link building.
