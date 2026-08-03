/**
 * Generates static redirect pages into `out/`.
 *
 * A static host cannot issue a 301, so `redirects()` in next.config does
 * nothing under `output: 'export'`. The substitute is an HTML stub per legacy
 * path containing a canonical link, a meta refresh, and a JS fallback.
 *
 * Search engines do follow meta-refresh redirects and honour the canonical,
 * so link equity is preserved — but a real 301 is stronger. These exist so
 * old links do not dead-end, not as a preferred pattern.
 *
 * Runs automatically after `next build`.
 */
import { mkdirSync, writeFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const OUT = 'out'
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://waterslides4kids.com'

function redirectHtml(target) {
  const absolute = `${SITE.replace(/\/$/, '')}${target}`
  return `<!doctype html>
<html lang="en-US">
<head>
<meta charset="utf-8">
<title>Redirecting…</title>
<link rel="canonical" href="${absolute}">
<meta name="robots" content="noindex, follow">
<meta http-equiv="refresh" content="0; url=${target}">
<script>window.location.replace(${JSON.stringify(target)});</script>
</head>
<body>
<p>This page has moved. <a href="${target}">Continue to ${target}</a>.</p>
</body>
</html>
`
}

function write(fromPath, target) {
  const dir = join(OUT, fromPath)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), redirectHtml(target), 'utf8')
}

/**
 * Directory names under out/<base> are the generated slugs.
 *
 * The export also drops Next's own `__next.*` payload directories in here.
 * They are not routes, and generating stubs for them produced redirects to
 * pages that do not exist — hence the filter. Real slugs are always
 * lowercase-hyphenated with no dots.
 */
function slugsIn(base) {
  try {
    return readdirSync(join(OUT, base), { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .filter((name) => !name.startsWith('__next') && !name.includes('.'))
  } catch {
    return []
  }
}

let count = 0

// Fixed paths
for (const [from, to] of [
  ['collections', '/shop/'],
  ['water-slides', '/collections/water-slides/'],
]) {
  write(from, to)
  count++
}

// /products/<slug> → /shop/<slug>
for (const slug of slugsIn('shop')) {
  write(join('products', slug), `/shop/${slug}/`)
  count++
}

// /blogs/<slug> → /blog/<slug>
for (const slug of slugsIn('blog')) {
  write(join('blogs', slug), `/blog/${slug}/`)
  count++
}

console.log(`✓ generated ${count} static redirect stubs`)
