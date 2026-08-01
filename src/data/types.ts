export type StockStatus = 'in-stock' | 'pre-order' | 'out-of-stock'

export type CollectionSlug =
  | 'water-slides'
  | 'dual-lane-water-slides'
  | 'water-slide-bounce-house-combos'
  | 'backyard-water-slides'

export type HeightCollectionSlug =
  | '13-ft-water-slides'
  | '15-ft-water-slides'
  | '17-ft-water-slides'
  | '19-ft-and-taller-water-slides'

export interface ProductSpec {
  label: string
  value: string
}

export interface FaqItem {
  question: string
  answer: string
}

/**
 * The subset of a product needed to render a card, filter a grid, or add a
 * line to the cart.
 *
 * Client components receive this rather than the full `Product` — shipping
 * 26 products' worth of 300-500 word descriptions through the RSC payload to
 * a grid that only displays names and prices is pure waste.
 */
export interface ProductCardData {
  slug: string
  name: string
  shortName: string
  image: string
  msrp: number | null
  price: number | null
  stock: StockStatus
  collections: CollectionSlug[]
  tagline: string
  isNew?: boolean
  bestValue?: boolean
  heightFt: number | null
  lanes: 1 | 2
  poolType: 'attached' | 'detachable' | 'none'
  wetDry: boolean
}

export interface Product extends ProductCardData {
  homepageFeatured?: boolean
  heroImage?: boolean

  /** Our own catalog identifier. */
  sku: string
  /**
   * Supplier part number as it appears on the manufacturer's listing.
   * TODO: confirm with supplier before launch — these are read off the
   * public product-image filenames, not from a price sheet.
   */
  mpn: string

  /** Lead paragraph of the PDP description. */
  intro: string
  /** Remaining PDP body paragraphs. Unique per product — never reused. */
  body: string[]
  highlights: string[]
  inTheBox: string[]
  specs: ProductSpec[]
  faqs: FaqItem[]

  /** Internal linking: sibling products and supporting blog posts. */
  relatedSlugs: string[]
  blogSlugs: string[]
}
