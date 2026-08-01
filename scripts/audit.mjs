/**
 * Crawls a running build and checks the things that are easy to break and
 * expensive to miss: dead internal links, duplicate or missing titles and
 * descriptions, H1 counts, canonicals, image alt text, and JSON-LD validity.
 *
 *   npm run build && npm run start &
 *   node scripts/audit.mjs http://localhost:3000
 */

const BASE = (process.argv[2] ?? 'http://localhost:3000').replace(/\/$/, '')

const visited = new Map()
const queue = ['/']
const linkSources = new Map()
const problems = []

function record(severity, url, message) {
  problems.push({ severity, url, message })
}

/** Lengths must be measured on rendered text, not on escaped HTML. */
function decodeEntities(value) {
  return value
    .replace(/&#x27;/gi, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/gi, '"')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&rsquo;/gi, '’')
}

function textBetween(html, open, close) {
  const start = html.indexOf(open)
  if (start === -1) return null
  const from = start + open.length
  const end = html.indexOf(close, from)
  return end === -1 ? null : html.slice(from, end)
}

function attr(tag, name) {
  const match = tag.match(new RegExp(`${name}=("([^"]*)"|'([^']*)')`, 'i'))
  return match ? (match[2] ?? match[3] ?? '') : null
}

async function crawl(path) {
  if (visited.has(path)) return
  visited.set(path, null)

  let response
  try {
    response = await fetch(`${BASE}${path}`, { redirect: 'manual' })
  } catch (error) {
    record('ERROR', path, `request failed: ${error.message}`)
    return
  }

  if (response.status >= 300 && response.status < 400) {
    visited.set(path, response.status)
    return
  }

  if (!response.ok) {
    const from = linkSources.get(path)
    record('ERROR', path, `HTTP ${response.status}${from ? ` (linked from ${from})` : ''}`)
    visited.set(path, response.status)
    return
  }

  visited.set(path, 200)

  const contentType = response.headers.get('content-type') ?? ''
  if (!contentType.includes('text/html')) return

  const html = await response.text()

  // --- head checks -------------------------------------------------------
  const rawTitle = textBetween(html, '<title>', '</title>')
  const title = rawTitle === null ? null : decodeEntities(rawTitle)
  if (!title) record('ERROR', path, 'missing <title>')
  else if (title.length > 60) record('WARN', path, `title ${title.length} chars (>60): "${title}"`)

  const descTag = html.match(/<meta[^>]+name="description"[^>]*>/i)
  const rawDescription = descTag ? attr(descTag[0], 'content') : null
  const description = rawDescription === null ? null : decodeEntities(rawDescription)
  if (!description) {
    record('ERROR', path, 'missing meta description')
  } else if (description.length < 120 || description.length > 165) {
    record('WARN', path, `meta description ${description.length} chars (target 150–160)`)
  }

  const canonicalTag = html.match(/<link[^>]+rel="canonical"[^>]*>/i)
  if (!canonicalTag) record('ERROR', path, 'missing canonical')

  const isNoindex = /<meta[^>]+name="robots"[^>]*content="[^"]*noindex/i.test(html)

  // --- body checks -------------------------------------------------------
  const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length
  if (h1Count === 0) record('ERROR', path, 'no <h1>')
  else if (h1Count > 1) record('ERROR', path, `${h1Count} <h1> elements (must be exactly 1)`)

  const imgTags = html.match(/<img\b[^>]*>/gi) ?? []
  const missingAlt = imgTags.filter((tag) => !/\balt=/i.test(tag)).length
  if (missingAlt > 0) record('ERROR', path, `${missingAlt} <img> without alt`)

  for (const block of html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) ?? []) {
    const json = block.replace(/^<script type="application\/ld\+json">/, '').replace(/<\/script>$/, '')
    try {
      JSON.parse(json.replace(/\\u003c/g, '<'))
    } catch (error) {
      record('ERROR', path, `invalid JSON-LD: ${error.message}`)
    }
  }

  visited.set(path, { status: 200, title, description, noindex: isNoindex })

  // --- follow internal links --------------------------------------------
  for (const tag of html.match(/<a\b[^>]*href=("[^"]*"|'[^']*')[^>]*>/gi) ?? []) {
    const href = attr(tag, 'href')
    if (!href) continue
    if (/^(https?:|mailto:|tel:|#)/i.test(href)) continue

    const clean = href.split('#')[0].split('?')[0]
    if (!clean.startsWith('/')) continue

    if (!visited.has(clean) && !queue.includes(clean)) {
      linkSources.set(clean, path)
      queue.push(clean)
    }
  }
}

console.log(`Crawling ${BASE} …\n`)

while (queue.length > 0) {
  await crawl(queue.shift())
}

// Duplicate titles / descriptions across indexable pages.
const titles = new Map()
const descriptions = new Map()
for (const [path, info] of visited) {
  if (!info || typeof info !== 'object' || info.noindex) continue
  if (info.title) titles.set(info.title, [...(titles.get(info.title) ?? []), path])
  if (info.description) {
    descriptions.set(info.description, [...(descriptions.get(info.description) ?? []), path])
  }
}
for (const [title, paths] of titles) {
  if (paths.length > 1) record('ERROR', paths.join(', '), `duplicate title: "${title}"`)
}
for (const [description, paths] of descriptions) {
  if (paths.length > 1) {
    record('ERROR', paths.join(', '), `duplicate meta description: "${description.slice(0, 60)}…"`)
  }
}

const errors = problems.filter((p) => p.severity === 'ERROR')
const warnings = problems.filter((p) => p.severity === 'WARN')

for (const problem of [...errors, ...warnings]) {
  console.log(`${problem.severity.padEnd(5)} ${problem.url}\n      ${problem.message}`)
}

console.log(`\n──────────────────────────────────`)
console.log(`Pages crawled : ${visited.size}`)
console.log(`Errors        : ${errors.length}`)
console.log(`Warnings      : ${warnings.length}`)

process.exit(errors.length > 0 ? 1 : 0)
