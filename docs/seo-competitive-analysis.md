# SEO Competitive Analysis — US Inflatable Water Slide Market

> **Provenance note, read this first.** The competitor characterisations in the table below were supplied in the project brief. They have **not** been independently re-verified against the live sites as part of this build, and competitor sites change. Treat this as a strategy document grounded in the brief, not as a fresh audit. Before acting on any specific claim — especially "their PDP copy is thin" or "their pages are slow" — spend an afternoon confirming it with live crawls and PageSpeed runs. Instructions for doing that are at the end.
>
> Everything in the **"What we built"** column *is* verified: it describes code in this repository.

---

## 1. The competitive set

| Competitor | Strength | Weakness | Our move | What we built |
| --- | --- | --- | --- | --- |
| **herokiddo.com** | Strong bundle offers, clean Shopify UX, active blog, "buy → rent → profit" ROI angle | Generic Shopify theme, thin PDP copy, third-party-heavy pages | Match the ROI angle, out-build on PDP depth and speed | 300–500 unique words on all 26 PDPs + spec table + 4 FAQs + comparison table each. Static Next.js, YouTube facaded. |
| **magicjump.com** | Enormous catalog, manufacturer authority, ranks on domain strength | Dated UX, weak mobile, keyword-stuffed copy | Win on UX, mobile and genuinely helpful content | Mobile-first throughout, verified no horizontal overflow at 320/375/768/1024/1440. Copy written for humans. |
| **tentandtable.net** | Deep category copy, aggressive "for sale" targeting, blower/stake messaging | Cluttered navigation, products buried | Cleaner IA — 3 clicks max to any product | 4 topic collections + 4 height collections. Every product reachable from `/shop` in one click. |
| **junglejumps.com** | Manufacturer trust, wholesale positioning | Old-school design, thin blog | Own the buying-guide and rental-ROI content space | 10 guides, 1,380–1,751 words each, all decision-content. |
| **bouncewaveslidesales.com** | **Excellent height-based faceting**, explicit ASTM + warranty copy, product-count signals | Very large; hard to be authoritative on every SKU | **Copy the height faceting** | `/collections/13-ft-…`, `/15-ft-…`, `/17-ft-…`, `/19-ft-and-taller-…`, each with unique 560–580 word landing copy. |
| **jumporange.com** | Good seasonal/editorial content, rental-operator framing | Thin technical SEO | Beat on schema coverage + Core Web Vitals | 8 schema types emitted server-side; static prerender; facaded video. |
| **inflatableisland.co** | Financing CTA, custom-build offer, review quotes | Small catalog | Add a financing info page — high-intent, low-competition | `/financing` built, honest about what is and is not offered yet. |

### The one to actually study

**BounceWave's height faceting is the most transferable idea in the set**, because it maps directly onto how people search. Nobody types "medium inflatable water slide" — they type "15 ft water slide for sale". Height is the dominant modifier in this niche and almost nobody outside BounceWave builds landing pages for it.

That is why this build ships four height collections as first-class pages with unique copy, their own FAQs, `ItemList` and `BreadcrumbList` schema, nav placement in the mega-menu, and footer links — not as filtered URLs.

---

## 2. Keyword → page map

One primary keyword per page. No two pages target the same head term, which is what prevents cannibalisation.

| Page | Primary keyword | Secondary |
| --- | --- | --- |
| `/` | inflatable water slides for sale | buy water slide, water slides for sale |
| `/shop` | commercial inflatable water slides for sale | water slide inflatable for sale |
| `/collections/water-slides` | inflatable water slide | blow up water slide, water slide with pool |
| `/collections/dual-lane-water-slides` | dual lane water slide | double lane inflatable slide, racing water slide |
| `/collections/water-slide-bounce-house-combos` | bounce house with water slide | wet dry combo bounce house |
| `/collections/backyard-water-slides` | backyard inflatable water slide | residential water slide for sale |
| `/collections/13-ft-water-slides` | 13 ft water slide for sale | 12 ft water slide, small inflatable water slide |
| `/collections/15-ft-water-slides` | 15 ft water slide for sale | 16 ft water slide, 15 foot inflatable slide |
| `/collections/17-ft-water-slides` | 17 ft water slide for sale | 18 ft water slide, tall inflatable water slide |
| `/collections/19-ft-and-taller-water-slides` | 19 ft water slide for sale | 20 ft water slide for sale, giant inflatable water slide |
| PDPs (×26) | `{product name} for sale` | `{height}ft water slide with pool` |
| `/blog/best-inflatable-water-slide-buyers-guide` | best inflatable water slide | Commercial |
| `/blog/commercial-vs-residential-water-slides-pvc-vinyl` | commercial grade inflatable water slide | Commercial |
| `/blog/dual-lane-vs-single-lane-water-slides` | dual lane water slide | Commercial |
| `/blog/inflatable-water-slide-cost` | inflatable water slide cost | Commercial |
| `/blog/how-to-start-a-water-slide-rental-business` | water slide rental business | Informational / link-bait |
| `/blog/water-slide-blower-size` | water slide blower size | Informational |
| `/blog/inflatable-water-slide-safety-checklist` | inflatable water slide safety | Informational |
| `/blog/attached-vs-detachable-pool-water-slides` | water slide with detachable pool | Commercial |
| `/blog/how-to-clean-and-store-an-inflatable-water-slide` | how to clean inflatable water slide | Informational |
| `/blog/inflatable-water-slide-permit-guide` | inflatable water slide permit | Informational |
| `/financing` | water slide financing | lease to own inflatable |
| `/faq` | inflatable water slide FAQ | — |

**Note on cannibalisation:** `dual lane water slide` is the primary for the collection page *and* the primary target of the comparison post. That is deliberate — the collection targets transactional intent and the post targets research intent — but it is the one pair to watch in Search Console. If the post starts outranking the collection for commercial queries, add a stronger in-post link to the collection and trim the post's commercial framing.

### Long-tail targets woven through the copy

water slide for adults · giant inflatable water slide · water slide with pool · commercial grade water slide · water slide rental business · inflatable water slide with blower · 20 ft water slide for sale

---

## 3. The five strategies, and how each is implemented

### 1. Height-based landing pages
Four dedicated collections with unique copy (560–580 words each), FAQs, schema and nav placement. Height is derived from `heightFt` in `products.ts`, so products self-file into the right bracket. Combos and the obstacle course carry `heightFt: null` and are correctly excluded.

### 2. Buyer-intent content, not fluff
Ten guides, 1,380–1,751 words each. Zero "top 10 party ideas" filler. The set is deliberately bottom-funnel and decision-shaped: ROI math for rental operators, price breakdowns, blower sizing, vinyl grade comparison, yard-fit guidance, cleaning routines, permits.

The rental-business post is the intended link magnet — it contains a conservative first-year financial model with realistic booking counts rather than the inflated numbers typical of the genre.

### 3. Depth on every PDP
All 26 pages carry 300–500 words of genuinely unique copy (verified: range 310–436). Nothing is templated or spun — each one discusses that specific slide's height, lane count, pool type, theme and trade-offs. Plus an 11-row spec table, what's-in-the-box, shipping estimate, 4 unique FAQs, a comparison table against three siblings, and links to ≥2 guides and ≥1 sibling collection.

### 4. Speed as a differentiator
- Fully static: 67 prerendered pages, no client-side rendering of indexable content.
- Self-hosted fonts via `next/font` (no render-blocking Google Fonts request).
- YouTube facade — iframe injected only on click.
- Hero LCP image gets `priority` + `fetchPriority="high"`; CDN origins preconnected.
- Client components receive a slim `ProductCardData` projection, so 26 products' worth of long-form copy never crosses into the RSC payload for a grid that only shows names and prices.
- AVIF/WebP via `next/image`; every image has explicit dimensions, so CLS from images is structurally prevented.

### 5. Full schema coverage
`Organization`, `WebSite` + `SearchAction`, `Product` + `Offer` (with `shippingDetails` and `hasMerchantReturnPolicy`), `ItemList`, `BreadcrumbList`, `FAQPage`, `Article`, `VideoObject` — all emitted server-side into the initial HTML. Validated as parseable by `npm run audit`; validate rich-result eligibility with Google's tool post-deploy.

---

## 4. Where we deliberately do *not* compete

Several competitors do things that would help short-term rankings and are not worth doing:

- **No fabricated reviews or `AggregateRating`.** `reviews.ts` ships empty and the schema stays off until there are ≥3 real reviews per product. Fake review markup is a well-known manual-action trigger and an FTC problem before it is an SEO one.
- **No invented safety certifications.** No ASTM or compliance claims appear anywhere, because we hold no documentation for them. Competitors who display certification badges may well have the paperwork — we do not yet.
- **No invented author personas.** Posts are attributed to the brand rather than to a fictional "12-year industry veteran". Fabricated expertise is worth less than an honest organisational byline, and it is the same category of mistake as fake reviews.
- **No phantom inventory.** Out-of-stock items show "Call for Availability" with an honest note instead of an invented restock date. This costs some conversions and is the right call.

These are competitive disadvantages in the short run and the correct position for a business that intends to still be ranking in three years.

---

## 5. Internal linking architecture

Hub-and-spoke centred on `/collections/water-slides`:

- **Home** → all 4 topic collections, all 4 height collections, 10 featured products, 3 latest posts.
- **`/shop`** → all 26 products, all 8 collections, the buyer's guide.
- **Collections** → their products, all 7 sibling collections, 3 posts, the buyer's guide.
- **PDPs** → 3 related products (curated, not automatic), ≥2 guides, ≥1 sibling collection.
- **Posts** → ≥3 products with descriptive anchor text, plus 2–4 sibling posts.

Every `relatedSlugs` and `linkedProductSlugs` entry is validated against the catalog at build time, and `npm run audit` crawls every internal link. Current state: **0 broken links across 56 crawled pages.**

---

## 6. Re-verifying the competitor claims

Before acting on anything in section 1, confirm it:

1. **PDP depth** — open five competitor product pages, paste the description into a word counter. "Thin" means under ~150 words. Check whether they use identical boilerplate across SKUs; duplicate PDP copy is the single most common ranking problem in this niche and it is trivially visible.
2. **Speed** — run each competitor homepage and one PDP through PageSpeed Insights. Record mobile Performance and LCP. This is the claim most likely to have changed.
3. **Schema** — run their PDPs through Google's Rich Results Test. Note which types they emit and whether they carry `AggregateRating`.
4. **Height faceting** — check whether anyone besides BounceWave has added it since. If two or three have, the advantage narrows and content depth matters more.
5. **Keyword overlap** — put the map in section 2 into your rank tracker and note who currently holds each term.

Redo this quarterly. Sections 2 through 5 describe this repository and do not need re-verification; section 1 does.
