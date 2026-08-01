/**
 * ============================================================================
 * CUSTOMER REVIEWS — INTENTIONALLY EMPTY
 * ============================================================================
 *
 * This file ships empty on purpose. Do not seed it with sample, illustrative,
 * or "placeholder" reviews, even temporarily.
 *
 * Fabricated reviews are an FTC problem before they are an SEO problem, and
 * fabricated `AggregateRating` markup is a well-known trigger for a Google
 * manual action that removes rich results across the whole domain.
 *
 * HOW TO ADD REAL REVIEWS
 *   1. Collect them from real, verifiable customers who bought the product.
 *   2. Add one entry per review below. `productSlug` must match a slug in
 *      products.ts, or the review is dropped.
 *   3. That is it. The homepage reviews section, the PDP review block, and
 *      the AggregateRating JSON-LD all switch themselves on automatically
 *      once `reviews` is non-empty — and the schema only emits for products
 *      that have at least MIN_REVIEWS_FOR_SCHEMA real reviews.
 * ============================================================================
 */

export interface Review {
  id: string
  productSlug: string
  authorName: string
  /** ISO date, e.g. '2026-07-04'. */
  datePublished: string
  /** 1–5. */
  rating: number
  title: string
  body: string
  /** Only set true where you can evidence the purchase. */
  verifiedPurchase: boolean
}

export const reviews: Review[] = []

/**
 * Below this threshold an average is noise, not a signal, so no
 * AggregateRating is emitted for the product.
 */
export const MIN_REVIEWS_FOR_SCHEMA = 3

export function hasReviews(): boolean {
  return reviews.length > 0
}

export function getProductReviews(slug: string): Review[] {
  return reviews.filter((r) => r.productSlug === slug)
}

export interface AggregateRating {
  ratingValue: number
  reviewCount: number
}

/** Returns null unless there are enough genuine reviews to average. */
export function getAggregateRating(slug: string): AggregateRating | null {
  const productReviews = getProductReviews(slug)
  if (productReviews.length < MIN_REVIEWS_FOR_SCHEMA) return null

  const total = productReviews.reduce((sum, r) => sum + r.rating, 0)
  return {
    ratingValue: Number((total / productReviews.length).toFixed(1)),
    reviewCount: productReviews.length,
  }
}

/** Highest-rated real reviews, for the homepage strip. */
export function getFeaturedReviews(limit = 3): Review[] {
  return [...reviews]
    .sort((a, b) => b.rating - a.rating || b.datePublished.localeCompare(a.datePublished))
    .slice(0, limit)
}
