import { Star } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getAggregateRating, getProductReviews, MIN_REVIEWS_FOR_SCHEMA } from '@/data/reviews'
import { formatDate } from '@/lib/utils'
import { ReviewForm } from './ReviewForm'

function Stars({ rating, label }: { rating: number; label: string }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={label}>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          aria-hidden="true"
          className={
            value <= Math.round(rating)
              ? 'h-4 w-4 fill-sunny-yellow text-sunny-yellow'
              : 'h-4 w-4 text-ink/20'
          }
        />
      ))}
    </span>
  )
}

/**
 * Reviews for one product, plus the submission form.
 *
 * With no published reviews this renders an honest empty state and an
 * invitation rather than filler. `AggregateRating` schema is emitted from the
 * product page only once there are at least MIN_REVIEWS_FOR_SCHEMA genuine
 * reviews — see the header comment in data/reviews.ts.
 */
export function ProductReviews({
  productSlug,
  productName,
}: {
  productSlug: string
  productName: string
}) {
  const reviews = getProductReviews(productSlug)
  const aggregate = getAggregateRating(productSlug)

  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((review) => review.rating === star).length,
  }))

  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeading as="h2" align="left" eyebrow="From people who bought it">
          Customer Reviews
        </SectionHeading>

        {reviews.length > 0 ? (
          <>
            <div className="mb-8 flex flex-col gap-6 rounded-3xl border-2 border-sky-tint bg-sky-tint/40 p-6 sm:flex-row sm:items-center">
              <div className="text-center sm:w-40">
                <p className="text-5xl font-extrabold text-deep-blue">
                  {aggregate ? aggregate.ratingValue.toFixed(1) : '—'}
                </p>
                <div className="mt-1 flex justify-center">
                  <Stars
                    rating={aggregate?.ratingValue ?? 0}
                    label={`Average rating ${aggregate?.ratingValue ?? 0} out of 5`}
                  />
                </div>
                <p className="mt-1 text-sm text-ink/65">
                  {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                </p>
              </div>

              <ul className="flex-1 space-y-1.5">
                {distribution.map(({ star, count }) => {
                  const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0
                  return (
                    <li key={star} className="flex items-center gap-2 text-sm">
                      <span className="w-12 shrink-0 text-ink/70">{star} star</span>
                      <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-white">
                        <span
                          className="block h-full rounded-full bg-sunny-yellow"
                          style={{ width: `${pct}%` }}
                        />
                      </span>
                      <span className="w-8 shrink-0 text-right text-ink/60">{count}</span>
                    </li>
                  )
                })}
              </ul>
            </div>

            {!aggregate ? (
              <p className="mb-6 rounded-2xl bg-sky-tint/60 p-3 text-sm text-ink/70">
                We publish a star average once a product has at least {MIN_REVIEWS_FOR_SCHEMA}{' '}
                reviews — below that an average is noise rather than a signal.
              </p>
            ) : null}

            <ul className="mb-10 space-y-5">
              {reviews.map((review) => (
                <li
                  key={review.id}
                  className="rounded-3xl border-2 border-sky-tint bg-white p-5 shadow-card"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <Stars rating={review.rating} label={`${review.rating} out of 5 stars`} />
                    <h3 className="text-lg">{review.title}</h3>
                  </div>
                  <p className="mt-2 leading-relaxed text-ink/80">{review.body}</p>
                  <p className="mt-3 text-sm text-ink/60">
                    <span className="font-bold text-ink">{review.authorName}</span>
                    {review.verifiedPurchase ? (
                      <span className="ml-2 rounded-full bg-lime-pop/20 px-2 py-0.5 text-xs font-bold text-lime-ink">
                        Verified purchase
                      </span>
                    ) : null}
                    <span className="ml-2">{formatDate(review.datePublished)}</span>
                  </p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="mb-8 rounded-3xl border-2 border-dashed border-splash-blue/40 bg-sky-tint/40 p-6 text-ink/75">
            No published reviews for this slide yet. We would rather show you nothing than show you
            something we wrote ourselves — every review here is tied to a verified order, so this
            section fills up at the speed real customers write in.
          </p>
        )}

        <ReviewForm productSlug={productSlug} productName={productName} />
      </div>
    </section>
  )
}
