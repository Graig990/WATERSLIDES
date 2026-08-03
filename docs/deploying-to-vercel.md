# Deploying to Vercel

## Why not GitHub Pages

GitHub Pages serves **static files only**. It cannot run a Node server, so it cannot run this app. When Pages was enabled on the repo it found no `index.html`, fell back to Jekyll, and published `README.md` as the homepage — which is exactly what appeared at waterslides4kids.com.

Specifically, Pages cannot run:

- the five API routes (`/api/checkout`, `/api/reviews`, `/api/contact`, `/api/newsletter`, `/api/notify`)
- `next/image` optimisation (AVIF/WebP conversion and resizing)
- the redirects and security headers in `next.config.ts`

Vercel is built by the Next.js team and runs all of it with no code changes.

---

## Step 1 — Turn off GitHub Pages

Do this first, so the domain stops serving the README.

1. Go to **github.com/Graig990/WATERSLIDES → Settings → Pages**
2. Under **Build and deployment → Source**, select **None**  *(or, if there is a "Custom domain" box, clear it first)*
3. Save

The `CNAME` file in the repo root is a GitHub Pages artefact. It is inert on Vercel, so it can stay — but delete it if you want the repo tidy.

## Step 2 — Import the repo into Vercel

1. Go to **vercel.com** → sign up / log in **with your GitHub account** (simplest — it wires up permissions automatically)
2. **Add New… → Project**
3. Find **Graig990/WATERSLIDES** and click **Import**
   - If the repo is not listed, click *Adjust GitHub App Permissions* and grant access to it
4. On the configure screen, **change nothing**:
   - Framework Preset: **Next.js** (auto-detected)
   - Build Command / Output Directory / Install Command: leave as-is
   - Root Directory: leave as `./`
5. Click **Deploy**

First build takes roughly 2–4 minutes. You will get a URL like `waterslides-xxxx.vercel.app` — **open it and confirm the site looks like the preview** before touching DNS.

## Step 3 — Environment variables (optional)

The site builds and runs with none set. Add them under **Settings → Environment Variables** when you want them:

| Variable | Value | Why |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://waterslides4kids.com` | Only needed if the canonical domain changes — the built-in default is already this. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | from Search Console | Renders the verification meta tag |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | from Bing Webmaster | Same, for Bing |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | `G-XXXXXXX` | Loads GA4. No analytics script loads while unset. |

Redeploy after adding any of them — env vars are baked in at build time.

## Step 4 — Point the domain at Vercel

1. In the Vercel project: **Settings → Domains → Add**
2. Enter `waterslides4kids.com`, then add `www.waterslides4kids.com` too and set one to redirect to the other
3. Vercel shows you **the exact DNS records to create**. Use the values it shows you — do not copy them from any guide, including this one, because they change.

   As of writing they are typically an **A record** on the apex pointing at Vercel's anycast IP, and a **CNAME** on `www` pointing at `cname.vercel-dns.com`. Vercel's dashboard is the authority.

4. Go to wherever you bought waterslides4kids.com and **replace the existing GitHub Pages DNS records** with Vercel's. Leaving the old GitHub A records in place will cause the domain to load intermittently from the wrong place.
5. Wait for propagation — usually minutes, occasionally a few hours. Vercel issues the SSL certificate automatically once DNS resolves.

## Step 5 — Verify

Once the domain resolves:

```bash
npm run audit -- https://waterslides4kids.com
```

Expect **0 errors**. It crawls every internal link and checks titles, descriptions, H1 counts, canonicals, image alt text and JSON-LD.

Then spot-check by hand:

- [ ] Homepage looks like the local preview
- [ ] Add to cart → `/cart` → `/checkout` → order confirmation completes
- [ ] A product page loads with reviews section and payment badges in the footer
- [ ] `https://waterslides4kids.com/sitemap.xml` and `/robots.txt` load
- [ ] A deliberately wrong URL shows the branded 404, not a Vercel error
- [ ] Run PageSpeed Insights on the homepage and one product page and record the baseline

## After this

Every push to `main` deploys automatically. Pull requests get their own preview URL.

Then work through [`seo-launch-checklist.md`](seo-launch-checklist.md) — Search Console, GA4, indexing requests. And do not forget the launch blockers in the [README](../README.md): placeholder contact details, empty payment accounts, hotlinked supplier imagery, unconfirmed specs, and template legal pages.
