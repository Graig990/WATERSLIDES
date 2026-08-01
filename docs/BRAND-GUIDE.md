# WaterSlides4Kids — Brand Assets

**Domain:** waterslides4kids.com
**Tagline:** Commercial-Grade Inflatable Water Slides
**Short tagline:** Splash Into Summer

---

## Files

| File | Format | Use |
|---|---|---|
| `logo-primary.svg` | SVG, ~807×220 | Main horizontal lockup — site header, invoices, email signature |
| `logo-primary@2x.png` | PNG 1600px, transparent | Anywhere SVG isn't accepted (marketplaces, print shops) |
| `logo-stacked.svg` | SVG | Vertical lockup — footer, mobile menu, packaging, print |
| `logo-white.svg` | SVG | Knockout — for coral, deep-blue, or photo backgrounds |
| `logo-icon.svg` | SVG 512×512 | Icon mark alone — social avatars, app icon, loading states |
| `logo-icon-512.png` / `logo-icon-192.png` | PNG | PWA manifest icons |
| `apple-touch-icon.png` | PNG 180×180 | iOS home screen |
| `favicon.svg` / `favicon-32.png` | SVG / PNG | Browser tab — simplified mark, stays legible at 16px |
| `og-image.png` | PNG 1200×630 | Default social share card (`og:image`, `twitter:image`) |
| `og-image.svg` | SVG | Editable source for the share card |

All wordmark text is **converted to outlines**, so the logos render identically everywhere with no font files to load or license.

---

## Colors

| Token | Hex | Use |
|---|---|---|
| Splash Blue | `#00B4E6` | Primary — water, links, icon backgrounds |
| Deep Blue | `#0057B8` | Wordmark, headings, nav, pool waves |
| Sunny Yellow | `#FFD400` | The slide flume, primary CTAs, the "4" |
| Hot Coral | `#FF4E64` | "KIDS", sale badges, ladder, urgency |
| Lime Pop | `#7ED321` | In-stock ticks, trust markers |
| Grape | `#8B4EFF` | Blog tags, secondary accents |
| Sky Tint | `#E8F8FF` | Section backgrounds |
| Ink | `#1A2340` | Body text (never pure black) |

Icon gradient: `#00D4FA` → `#0072C6`, top to bottom.

---

## Typography

- **Display / headings:** Fredoka SemiBold (600). Free, OFL-licensed, on Google Fonts.
- **Body:** Inter, 400/500/600.
- Self-host both with `next/font` — don't hotlink Google Fonts, it costs you ~200ms of LCP.

---

## Usage rules

**Do**
- Keep clear space around the logo equal to the height of the icon badge.
- Use `logo-white.svg` on coral, deep blue, or any photograph.
- Render the header logo at 40–60px tall.
- Link the header logo to `/` with alt text: *WaterSlides4Kids — inflatable water slides for sale*.

**Don't**
- Recolor, stretch, skew, rotate, or add drop shadows or outlines.
- Place the full-color logo on a busy background.
- Render the primary lockup below 40px tall — switch to the icon mark instead.
- Retype the wordmark in a different font.

---

## Design language

The icon mark is the seed for the whole site: the **wave shape** becomes the SVG dividers between page sections, the **droplet** becomes list bullets, and the **yellow flume curve** becomes the underline accent beneath section headings. Reusing these three shapes is what makes the site look designed rather than assembled.
