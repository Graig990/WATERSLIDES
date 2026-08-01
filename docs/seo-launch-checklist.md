# SEO Launch Checklist

Work through this in order. Phase 0 is not optional — shipping without it creates problems that are expensive to unwind.

---

## Phase 0 — Blockers (do these before the site is public)

- [ ] **Replace placeholder contact details** in `src/data/site.ts`. `(555) 010-2025` is a reserved fictional number and the email addresses do not resolve.
- [ ] **Add a real business address** to `siteConfig.businessAddress`, or consciously decide to stay online-only. While it is `null` no `LocalBusiness` schema is emitted, which is the correct behaviour — a fabricated NAP is worse than none.
- [ ] **Replace all product photography.** Every image is currently hotlinked from `herokiddo.com` / `www.xjump.com`. They are other companies' copyrighted assets on their CDNs; they can be blocked at any time and using them commercially is not yours to do. Self-host under `public/`.
- [ ] **Confirm every specification with your supplier.** All specs are labelled example values. Weight limits and age ranges on a children's product are a liability matter.
- [ ] **Have an attorney review `/privacy-policy` and `/terms`.** Both carry a visible template banner. Set the governing-law state.
- [ ] **Set `NEXT_PUBLIC_SITE_URL`** to the production origin, or canonicals and the sitemap will point at the wrong domain.
- [ ] **Decide on Stripe.** Add keys for real payments, or launch in demo mode knowingly — demo mode takes no money.
- [ ] **Wire up the form endpoints.** `/api/contact`, `/api/newsletter` and `/api/notify` validate and accept but deliver nowhere. A contact form that silently discards messages is worse than no contact form.
- [ ] **Set `socialsClaimed: true`** only once you control those handles. Until then they stay out of `sameAs`.

---

## Phase 1 — Technical verification (launch day)

- [ ] `npm run build` — clean
- [ ] `npm run typecheck` — clean
- [ ] `npm run lint` — clean
- [ ] `npm run audit -- https://yourdomain.com` — **0 errors**. Checks dead links, duplicate/missing titles and descriptions, H1 counts, canonicals, image alt, JSON-LD validity.
- [ ] HTTPS enforced; `http://` and the non-canonical `www`/apex variant 301 to canonical
- [ ] `https://yourdomain.com/robots.txt` loads and references the sitemap
- [ ] `https://yourdomain.com/sitemap.xml` loads and contains only 200-status indexable URLs (no `/cart`, `/checkout`, `/order-confirmation`)
- [ ] Custom 404 renders and links back into the catalog
- [ ] Test the full cart → checkout → confirmation flow **on production**
- [ ] Spot-check `/shop`, one PDP and one guide with JavaScript disabled — content should still be there
- [ ] Run 3 PDPs, 2 collections, the homepage and 2 posts through the [Rich Results Test](https://search.google.com/test/rich-results). Expect zero errors. `AggregateRating` should be **absent** until you have real reviews.
- [ ] Validate the sitemap with an XML sitemap validator
- [ ] PageSpeed Insights (mobile) on homepage, `/shop`, one PDP, one post. Record the baselines.

> **On the Lighthouse ≥95 target:** the build is engineered for it — static prerender, self-hosted fonts, facaded video, explicit image dimensions, minimal client JS. It has **not been measured**, because Lighthouse needs a deployed URL on real network conditions. Measure on the deployed site and treat the numbers as the real result. The most likely drag is the supplier CDNs serving unoptimised product images; self-hosting them (Phase 0) is also the biggest available performance win.

---

## Phase 2 — Search Console & analytics (launch day)

### Google Search Console
1. Add the property (Domain property preferred — covers all subdomains and protocols).
2. Verify. Either the DNS TXT method, or set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and redeploy for the meta-tag method.
3. **Submit `sitemap.xml`.**
4. Use URL Inspection → Request Indexing on: `/`, `/shop`, all 8 collections, your 5 strongest PDPs, and the buyer's guide. Do not request all 67 — it is rate-limited and unnecessary.
5. Check Coverage after 48h for unexpected exclusions.
6. Confirm `/cart`, `/checkout` and `/order-confirmation` show as "Excluded by noindex tag" — that is correct, not an error.

### Bing Webmaster Tools
1. Add the site; verify via `NEXT_PUBLIC_BING_SITE_VERIFICATION` or DNS.
2. Import from Search Console (fastest path).
3. Submit the sitemap. Bing's IndexNow is worth enabling — it is genuinely fast.

### GA4
1. Create a property, set `NEXT_PUBLIC_GA4_MEASUREMENT_ID`, redeploy. No analytics script loads while it is unset.
2. Confirm the tag fires in Realtime.
3. Mark conversions: `purchase` (order confirmation), newsletter signup, contact submit, notify-me submit.
4. Link GA4 to Search Console.

### Google Business Profile
Only if you have a real, verifiable address. Fill it in completely and add your own photographs, not stock. This is the highest-leverage local action available and it is free.

---

## Phase 3 — First 30 days

- [ ] Watch Search Console Coverage for crawl anomalies
- [ ] Check the first impressions data — which keywords surface first tells you where the site is credible
- [ ] Fix any pages Google excludes as "Crawled — currently not indexed" (usually a thin-content or duplication signal)
- [ ] Verify rich results are appearing (price, availability, FAQ dropdowns) — these lift CTR, and CTR lifts rankings
- [ ] Set up rank tracking for the keyword map in `seo-competitive-analysis.md`
- [ ] Re-run PageSpeed after image self-hosting and compare against the baseline
- [ ] **Start collecting real reviews.** Email every customer 2–3 weeks post-delivery. This unlocks the review section and `AggregateRating` — it is the single biggest missing SEO asset on the site, and the only legitimate way to get it is to ask.

---

## Phase 4 — Backlink starter plan

Ordered by effort-to-value. Nothing here involves buying links.

### Tier 1 — Free, fast, legitimate
1. **Google Business Profile** — if you have an address.
2. **Supplier / manufacturer dealer directories.** Ask every supplier whether they list authorised dealers. These are topically perfect and usually just require asking.
3. **Bing Places, Apple Business Connect, Yelp, Better Business Bureau.**
4. **Chamber of Commerce** in your city — small fee, real local link.
5. **Your own social profiles** — claim them, fill them in, then set `socialsClaimed: true`.

### Tier 2 — Content-led
6. **Party rental industry forums and Facebook groups.** Be useful, not promotional. The rental-business and blower-sizing guides answer questions asked in these groups constantly. Link when it genuinely answers the question.
7. **Reddit** — r/smallbusiness, r/Entrepreneur, r/daddit, r/Mommit. Same rule. Reddit links are nofollow but the referral traffic converts and threads rank.
8. **HARO / Qwoted / Featured.** Monitor for queries on summer party planning, small business startup, seasonal businesses, backyard safety. You have genuine expertise on rental economics and inflatable safety — those pitches land.
9. **Guest posts** on parenting, event-planning and small-business blogs. Pitch the *rental ROI* angle; it is the most novel thing you can offer.

### Tier 3 — Relationship-led
10. **Local event venues, schools, churches, community centres.** Many maintain vendor pages.
11. **Party planners and event photographers** — reciprocal vendor listings.
12. **Local news.** A seasonal-business angle in early summer is an easy regional story.
13. **Sponsor a local youth sports team.** Usually includes a website link, and it is real community presence.

### What not to do
- Do not buy links, use PBNs, or mass-submit to link directories.
- Do not exchange links at scale.
- Do not spin content for guest posts.
- Do not fabricate reviews to attract links.

One editorially-earned link from a party rental trade site outweighs a hundred directory submissions.

---

## Phase 5 — Ongoing cadence

**Monthly**
- One new guide, targeting a keyword from the map that is not yet covered
- Refresh one existing post with current information and bump `updatedAt`
- Review Search Console queries for terms you rank on positions 5–15 — those are the cheapest wins
- Add any new real reviews

**Quarterly**
- Re-run `npm run audit` against production
- Re-run PageSpeed on the key templates
- Re-verify the competitor claims in `seo-competitive-analysis.md` §6
- Audit internal links after adding products
- Review the `dual lane water slide` cannibalisation pair flagged in the keyword map

**Annually**
- Full content refresh on the top 5 posts
- Re-shoot or refresh product photography
- Re-confirm specs with suppliers
- Legal review of policy pages

---

## Content backlog (next 10 posts)

Written from the keyword map's uncovered space:

1. How much water does an inflatable water slide use?
2. Inflatable water slide vs. above-ground pool: which is better for a backyard?
3. Best inflatable water slides for toddlers (ages 3–6)
4. How to level ground for an inflatable water slide
5. Water slide insurance for rental businesses: what you actually need
6. What to do when your inflatable water slide gets a hole
7. Wet/dry combo bounce houses: the complete guide
8. How to price water slide rentals in your market
9. Winterising an inflatable: the off-season storage checklist
10. 20 ft water slides: what changes above 19 feet

Each should follow the established pattern — 1,400+ words, a table or structured list, an FAQ block, ≥3 contextual product links, and a genuine answer to a real question.
