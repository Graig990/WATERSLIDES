import { MessageSquareQuote, Star } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ButtonLink } from '@/components/ui/Button'
import { getFeaturedReviews, hasReviews } from '@/data/reviews'
import { productsBySlug } from '@/data/products'
import { formatDate } from '@/lib/utils'
import { siteConfig } from '@/data/site'

/**
 * Empty-state safe by design. With no reviews in reviews.ts this renders an
 * honest invitation rather than invented testimonials, and no AggregateRating
 * schema is emitted anywhere on the site.
 */
export function ReviewsSection() {
  const reviews = getFeaturedReviews(3)

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading eyebrow="Straight from customers">What Owners Say</SectionHeading>

        {hasReviews() ? (
          <ul className="grid gap-6 md:grid-cols-3">
            {reviews.map((review) => {
              const product = productsBySlug.get(review.productSlug)
              return (
                <li
                  key={review.id}
                  className="flex flex-col gap-3 rounded-3xl border-2 border-sky-tint bg-sky-tint/40 p-6"
                >
                  <div className="flex items-center gap-1" aria-label={`${review.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }, (_, starIndex) => (
                      <Star
                        key={starIndex}
                        aria-hidden="true"
                        className={
                          starIndex < review.rating
                            ? 'h-5 w-5 fill-sunny-yellow text-sunny-yellow'
                            : 'h-5 w-5 text-ink/20'
                        }
                      />
                    ))}
                  </div>
                  <h3 className="text-lg">{review.title}</h3>
                  <p className="flex-1 leading-relaxed text-ink/80">{review.body}</p>
                  <p className="text-sm text-ink/60">
                    <span className="font-bold text-ink">{review.authorName}</span>
                    {review.verifiedPurchase ? ' · Verified purchase' : ''}
                    {product ? ` · ${product.shortName}` : ''}
                    {' · '}
                    {formatDate(review.datePublished)}
                  </p>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="mx-auto max-w-2xl rounded-3xl border-2 border-dashed border-splash-blue/40 bg-sky-tint/50 p-8 text-center">
            <MessageSquareQuote
              aria-hidden="true"
              className="mx-auto mb-4 h-12 w-12 text-splash-blue"
            />
            <h3 className="text-xl">No reviews published yet</h3>
            <p className="mx-auto mt-3 max-w-lg leading-relaxed text-ink/75">
              We would rather show you nothing than show you something we made up. Reviews go up
              here as real customers send them in — every one tied to a real order. If you have
              bought from us, we would genuinely like to hear how the slide held up.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href="/contact" variant="secondary">
                Share your experience
              </ButtonLink>
              <a
                href={`tel:${siteConfig.phoneE164}`}
                className="font-bold text-splash-blue-ink underline-offset-2 hover:underline"
              >
                Or call {siteConfig.phone}
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
