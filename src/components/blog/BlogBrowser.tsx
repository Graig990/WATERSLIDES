'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'

export interface BlogCard {
  slug: string
  title: string
  excerpt: string
  category: string
  publishedAt: string
  readingMinutes: number
  image: string
  tags: string[]
}

const PER_PAGE = 6

export function BlogBrowser({
  posts,
  categories,
}: {
  posts: BlogCard[]
  categories: string[]
}) {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return posts.filter((post) => {
      if (category !== 'All' && post.category !== category) return false
      if (!needle) return true
      return `${post.title} ${post.excerpt} ${post.tags.join(' ')}`.toLowerCase().includes(needle)
    })
  }, [posts, category, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const visible = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)

  function changeCategory(next: string) {
    setCategory(next)
    setPage(1)
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <ul className="flex flex-wrap gap-2">
          {['All', ...categories].map((item) => (
            <li key={item}>
              <button
                type="button"
                onClick={() => changeCategory(item)}
                aria-pressed={category === item}
                className={cn(
                  'min-h-[44px] rounded-2xl border-2 px-4 text-sm font-bold transition',
                  category === item
                    ? 'border-grape bg-grape text-white'
                    : 'border-sky-tint bg-white text-deep-blue hover:border-grape',
                )}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>

        <div className="relative lg:w-72">
          <label htmlFor="blog-search" className="sr-only">
            Search guides
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-ink/40"
          />
          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setPage(1)
            }}
            placeholder="Search guides…"
            className="min-h-[44px] w-full rounded-2xl border-2 border-sky-tint bg-white pr-4 pl-11 text-base focus:border-splash-blue"
          />
        </div>
      </div>

      <p aria-live="polite" className="mb-6 text-sm font-semibold text-ink/70">
        {filtered.length} {filtered.length === 1 ? 'guide' : 'guides'}
        {category !== 'All' ? ` in ${category}` : ''}
      </p>

      {visible.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-grape/40 bg-sky-tint/40 p-10 text-center">
          <h2 className="text-xl">Nothing matches that</h2>
          <p className="mt-2 text-ink/70">Try a different term, or clear the category filter.</p>
          <button
            type="button"
            onClick={() => {
              setQuery('')
              changeCategory('All')
            }}
            className="mt-5 min-h-[44px] rounded-2xl bg-sunny-yellow px-6 font-extrabold text-ink"
          >
            Show all guides
          </button>
        </div>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="card-tilt group flex h-full flex-col overflow-hidden rounded-3xl border-2 border-sky-tint bg-white shadow-card"
              >
                <span className="relative block aspect-[16/9] overflow-hidden bg-sky-tint">
                  <Image
                    src={post.image}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 768px) 45vw, 92vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </span>
                <span className="flex flex-1 flex-col p-5">
                  <span className="mb-2 inline-flex w-fit rounded-full bg-grape/15 px-3 py-1 text-xs font-extrabold text-grape-ink uppercase">
                    {post.category}
                  </span>
                  <span className="block text-lg leading-snug font-bold text-deep-blue">
                    {post.title}
                  </span>
                  <span className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">
                    {post.excerpt}
                  </span>
                  <span className="mt-4 text-xs text-ink/55">
                    {formatDate(post.publishedAt)} · {post.readingMinutes} min read
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {totalPages > 1 ? (
        <nav aria-label="Blog pagination" className="mt-10 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={currentPage === 1}
            className="min-h-[44px] rounded-2xl border-2 border-sky-tint bg-white px-4 font-bold text-deep-blue disabled:opacity-40"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => setPage(pageNumber)}
              aria-current={pageNumber === currentPage ? 'page' : undefined}
              className={cn(
                'min-h-[44px] min-w-[44px] rounded-2xl border-2 font-bold',
                pageNumber === currentPage
                  ? 'border-deep-blue bg-deep-blue text-white'
                  : 'border-sky-tint bg-white text-deep-blue hover:border-splash-blue',
              )}
            >
              {pageNumber}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            disabled={currentPage === totalPages}
            className="min-h-[44px] rounded-2xl border-2 border-sky-tint bg-white px-4 font-bold text-deep-blue disabled:opacity-40"
          >
            Next
          </button>
        </nav>
      ) : null}
    </div>
  )
}
