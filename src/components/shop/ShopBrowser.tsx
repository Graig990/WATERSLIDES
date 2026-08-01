'use client'

import { useEffect, useMemo, useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import { cn } from '@/lib/utils'
import type { ProductCardData } from '@/data/types'

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'height-desc' | 'name-asc'

const SORTS: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'height-desc', label: 'Tallest First' },
  { value: 'name-asc', label: 'Name: A–Z' },
]

const TYPE_FILTERS = [
  { value: 'all', label: 'All slides' },
  { value: 'water-slides', label: 'Water slides' },
  { value: 'dual-lane-water-slides', label: 'Dual lane' },
  { value: 'water-slide-bounce-house-combos', label: 'Combos' },
  { value: 'backyard-water-slides', label: 'Backyard' },
] as const

const HEIGHT_FILTERS = [
  { value: 'all', label: 'Any height' },
  { value: 'small', label: '12–13 ft' },
  { value: 'mid', label: '15–16 ft' },
  { value: 'tall', label: '17–18 ft' },
  { value: 'giant', label: '19 ft +' },
] as const

const POOL_FILTERS = [
  { value: 'all', label: 'Any pool' },
  { value: 'attached', label: 'Attached pool' },
  { value: 'detachable', label: 'Detachable pool' },
] as const

type TypeValue = (typeof TYPE_FILTERS)[number]['value']
type HeightValue = (typeof HEIGHT_FILTERS)[number]['value']
type PoolValue = (typeof POOL_FILTERS)[number]['value']

function matchesHeight(product: ProductCardData, bracket: HeightValue): boolean {
  if (bracket === 'all') return true
  const height = product.heightFt
  if (height === null) return false
  if (bracket === 'small') return height <= 13
  if (bracket === 'mid') return height >= 14 && height <= 16
  if (bracket === 'tall') return height >= 17 && height <= 18
  return height >= 19
}

/**
 * Client-side filtering only.
 *
 * Every product is rendered into the server HTML on the clean /shop URL, so
 * crawlers see the full catalog and there is exactly one indexable version of
 * this page. Filters never change the URL, which means no `?lanes=2&pool=x`
 * permutations competing with /shop in the index.
 */
export function ShopBrowser({ products }: { products: ProductCardData[] }) {
  // The search term is read from the URL after mount rather than via
  // useSearchParams. useSearchParams would opt this subtree out of static
  // prerendering, leaving a Suspense fallback — not the catalog — in the HTML
  // Googlebot receives. This way the prerendered HTML always contains all 26
  // products and the query is applied as a client-side enhancement.
  const [query, setQuery] = useState('')

  useEffect(() => {
    const readQuery = () =>
      setQuery((new URLSearchParams(window.location.search).get('q') ?? '').trim().toLowerCase())

    readQuery()
    window.addEventListener('popstate', readQuery)
    return () => window.removeEventListener('popstate', readQuery)
  }, [])

  const [type, setType] = useState<TypeValue>('all')
  const [height, setHeight] = useState<HeightValue>('all')
  const [pool, setPool] = useState<PoolValue>('all')
  const [lanes, setLanes] = useState<'all' | '1' | '2'>('all')
  const [inStockOnly, setInStockOnly] = useState(false)
  const [sort, setSort] = useState<SortKey>('featured')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = useMemo(() => {
    const result = products.filter((product) => {
      if (type !== 'all' && !product.collections.includes(type)) return false
      if (!matchesHeight(product, height)) return false
      if (pool !== 'all' && product.poolType !== pool) return false
      if (lanes !== 'all' && String(product.lanes) !== lanes) return false
      if (inStockOnly && product.stock !== 'in-stock') return false
      if (query) {
        const haystack = `${product.name} ${product.tagline}`.toLowerCase()
        if (!haystack.includes(query)) return false
      }
      return true
    })

    const priceOf = (product: ProductCardData) => product.price ?? Number.POSITIVE_INFINITY

    switch (sort) {
      case 'price-asc':
        return [...result].sort((a, b) => priceOf(a) - priceOf(b))
      case 'price-desc':
        return [...result].sort((a, b) => (b.price ?? -1) - (a.price ?? -1))
      case 'height-desc':
        return [...result].sort((a, b) => (b.heightFt ?? -1) - (a.heightFt ?? -1))
      case 'name-asc':
        return [...result].sort((a, b) => a.name.localeCompare(b.name))
      default:
        return result
    }
  }, [products, type, height, pool, lanes, inStockOnly, query, sort])

  const activeCount =
    (type !== 'all' ? 1 : 0) +
    (height !== 'all' ? 1 : 0) +
    (pool !== 'all' ? 1 : 0) +
    (lanes !== 'all' ? 1 : 0) +
    (inStockOnly ? 1 : 0)

  function resetFilters() {
    setType('all')
    setHeight('all')
    setPool('all')
    setLanes('all')
    setInStockOnly(false)
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setFiltersOpen((open) => !open)}
            aria-expanded={filtersOpen}
            aria-controls="shop-filters"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-2xl border-2 border-deep-blue bg-white px-4 font-bold text-deep-blue hover:bg-sky-tint lg:hidden"
          >
            <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
            Filters
            {activeCount > 0 ? (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-hot-coral px-1 text-xs text-white">
                {activeCount}
              </span>
            ) : null}
          </button>

          <p aria-live="polite" className="text-sm font-semibold text-ink/70">
            Showing {filtered.length} of {products.length} slides
            {query ? (
              <>
                {' '}
                for “<span className="text-ink">{query}</span>”
              </>
            ) : null}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="shop-sort" className="text-sm font-bold text-ink/70">
            Sort
          </label>
          <select
            id="shop-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            className="min-h-[44px] rounded-2xl border-2 border-sky-tint bg-white px-3 font-semibold text-ink"
          >
            {SORTS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div
        id="shop-filters"
        className={cn(
          'mb-8 space-y-4 rounded-3xl border-2 border-sky-tint bg-sky-tint/40 p-4 lg:block',
          filtersOpen ? 'block' : 'hidden',
        )}
      >
        <FilterRow label="Type" options={TYPE_FILTERS} value={type} onChange={setType} />
        <FilterRow label="Height" options={HEIGHT_FILTERS} value={height} onChange={setHeight} />
        <FilterRow label="Pool" options={POOL_FILTERS} value={pool} onChange={setPool} />
        <FilterRow
          label="Lanes"
          options={[
            { value: 'all', label: 'Any' },
            { value: '1', label: 'Single lane' },
            { value: '2', label: 'Dual lane' },
          ]}
          value={lanes}
          onChange={setLanes}
        />

        <div className="flex flex-wrap items-center gap-4 pt-1">
          <label className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 font-semibold">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(event) => setInStockOnly(event.target.checked)}
              className="h-5 w-5 accent-[#0057B8]"
            />
            In stock only
          </label>

          {activeCount > 0 ? (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex min-h-[44px] items-center gap-1.5 font-bold text-hot-coral underline-offset-2 hover:underline"
            >
              <X aria-hidden="true" className="h-4 w-4" />
              Clear filters
            </button>
          ) : null}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-splash-blue/40 bg-sky-tint/50 p-10 text-center">
          <h2 className="text-xl">No slides match that combination</h2>
          <p className="mx-auto mt-2 max-w-md text-ink/70">
            Try widening the height range or clearing a filter — we carry {products.length} slides
            in total.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-5 inline-flex min-h-[44px] items-center rounded-2xl bg-sunny-yellow px-6 font-extrabold text-ink"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product, index) => (
            <li key={product.slug}>
              <ProductCard product={product} priority={index < 4} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function FilterRow<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: readonly { value: T; label: string }[]
  value: T
  onChange: (next: T) => void
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-extrabold tracking-[0.15em] text-splash-blue-ink uppercase">
        {label}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={value === option.value}
            className={cn(
              'min-h-[44px] rounded-2xl border-2 px-4 text-sm font-bold transition',
              value === option.value
                ? 'border-deep-blue bg-deep-blue text-white'
                : 'border-white bg-white text-deep-blue hover:border-splash-blue',
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  )
}
