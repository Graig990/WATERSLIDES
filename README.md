# WaterSlides4Kids

Commercial-grade inflatable water slide e-commerce store. Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, statically prerendered, Vercel-ready.

**Live routes:** 67 prerendered pages — 26 product pages, 8 collections, 10 long-form guides, plus shop, cart, checkout, support and legal pages.

---

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000. No env vars are required — with no Stripe keys configured the checkout runs in demo mode and the full cart → checkout → confirmation flow still completes.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (flat config, `next/core-web-vitals` + `next/typescript`) |
| `npm run typecheck` | `tsc --noEmit`, strict mode, zero `any` |
| `npm run audit -- http://localhost:3000` | Crawl a running build and check for dead links, duplicate/missing titles and descriptions, H1 counts, canonicals, missing image alt, and invalid JSON-LD |

The audit is the pre-deploy gate. Run it against a production build:

```bash
npm run build && npm run start &
npm run audit -- http://localhost:3000
```

It exits non-zero on any error, so it drops straight into CI.

---

## Environment variables

Copy `.env.example` to `.env.local`. Every value is optional.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin. Drives canonical tags, OG URLs and `sitemap.xml`. Defaults to `https://waterslides4kids.com`. |
| `STRIPE_SECRET_KEY` | Enables real Stripe Checkout. **Leave blank for demo mode.** |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Renders the Search Console `<meta>` tag when set. |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Renders the Bing Webmaster `<meta>` tag when set. |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | Loads GA4 (deferred). No analytics script loads at all when unset. |

### Demo vs. Stripe checkout

`/api/checkout` looks for `STRIPE_SECRET_KEY`:

- **Absent** → returns a generated order number and redirects to `/order-confirmation?order=…&demo=1`. The checkout page writes an order snapshot to `sessionStorage` and clears the cart. Nothing is charged.
- **Present** → creates a real Stripe Checkout Session and redirects to Stripe. The cart is deliberately *not* cleared until the customer returns to `/order-confirmation?session_id=…`, so an abandoned payment does not lose their basket.

Either way, **prices are resolved server-side from `products.ts` by slug.** The client only ever posts slugs and quantities — a price posted from the browser is never trusted.

---

## Project structure

```
src/
  app/                   Routes (App Router)
    api/                 checkout, contact, newsletter, notify
    collections/[slug]/  All 8 collections (topic + height)
    shop/[slug]/         26 product pages
    blog/[slug]/         10 guides, bodies pulled from src/content
    sitemap.ts robots.ts
  components/
    blog/ cart/ checkout/ home/ layout/ product/ shop/ ui/
  content/blog/          MDX article bodies
  data/                  site.ts, products.ts, collections.ts, blog.ts, reviews.ts
  hooks/ lib/ store/
public/brand/            Logo lockups, favicons, PWA icons, OG card
scripts/audit.mjs        Link + SEO crawler
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

## Adding real reviews

`src/data/reviews.ts` ships **empty on purpose** — see the comment at the top of the file. Add real entries and the homepage reviews section, the PDP review block and `AggregateRating` schema all switch on automatically. `AggregateRating` only emits for products with at least `MIN_REVIEWS_FOR_SCHEMA` (3) genuine reviews.

Do not seed it with samples, even temporarily.

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

### 4. The legal pages are templates

`/privacy-policy` and `/terms` describe how the site actually behaves, but they have not been reviewed by an attorney and both carry a visible banner saying so. Because you are selling children's recreational equipment, the liability, safe-use and indemnity sections deserve professional review. The governing-law clause needs your actual state.

### Also outstanding

- `/api/newsletter`, `/api/notify` and `/api/contact` validate and accept but do not yet deliver anywhere — wire up your email platform. They deliberately do not log email addresses or message contents.
- `/financing` describes options honestly but no financing provider is integrated.
- No per-product setup videos yet; the PDP links to the homepage video as a stand-in.

---

## Deploying

Vercel-ready as-is (`vercel.json` included). Import the repo, set env vars, deploy. Set `NEXT_PUBLIC_SITE_URL` to the production origin or canonicals and the sitemap will point at the default domain.

Then work through [`docs/seo-launch-checklist.md`](docs/seo-launch-checklist.md).

## Docs

- [`docs/seo-competitive-analysis.md`](docs/seo-competitive-analysis.md) — competitor findings, the keyword→page map, and the five strategies this build implements
- [`docs/seo-launch-checklist.md`](docs/seo-launch-checklist.md) — Search Console, GA4, indexing, and a backlink starter plan
- [`docs/BRAND-GUIDE.md`](docs/BRAND-GUIDE.md) — logo usage, colours, typography

## A note on ranking expectations

No build guarantees a #1 spot. Google weighs domain authority, backlinks and brand signals that a new site has not accumulated yet. What this codebase does is make the site technically strong on the factors you control — speed, schema coverage, content depth and information architecture — which is what makes long-tail keywords winnable in months and head terms winnable over a year or two of consistent content and link building.
