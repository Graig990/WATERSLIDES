import Image from 'next/image'
import Link from 'next/link'
import { productImageAlt, savingsOf } from '@/data/products'
import type { ProductCardData } from '@/data/types'
import { cn, formatPrice } from '@/lib/utils'
import { BestValueBadge, NewBurst, SaveBadge, StockPill } from '@/components/ui/Badges'
import { AddToCartButton } from './AddToCartButton'
import { NotifyMeForm } from './NotifyMeForm'

export function ProductCard({
  product,
  priority = false,
  /** Sizes hint — the grid is 4-up on desktop, 2-up tablet, 1-up mobile. */
  sizes = '(min-width: 1280px) 300px, (min-width: 768px) 45vw, 92vw',
}: {
  product: ProductCardData
  priority?: boolean
  sizes?: string
}) {
  const savings = savingsOf(product)
  const isOutOfStock = product.stock === 'out-of-stock'
  const href = `/shop/${product.slug}`

  return (
    <article className="card-tilt group relative flex h-full flex-col overflow-hidden rounded-3xl border-2 border-sky-tint bg-white shadow-card">
      {product.isNew ? (
        <NewBurst className="absolute top-3 right-3 z-10" />
      ) : null}

      <Link href={href} className="relative block aspect-[4/3] overflow-hidden bg-sky-tint">
        <Image
          src={product.image}
          alt={productImageAlt(product)}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <StockPill status={product.stock} />
          {product.bestValue ? <BestValueBadge /> : null}
        </div>

        <h3 className="text-base leading-snug font-bold">
          <Link href={href} className="hover:text-splash-blue-ink">
            {product.name}
          </Link>
        </h3>

        <p className="text-sm leading-relaxed text-ink/70">{product.tagline}</p>

        <div className="mt-auto space-y-3 pt-2">
          {isOutOfStock ? (
            <p className="text-lg font-extrabold text-ink/70">Call for Availability</p>
          ) : (
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              {product.msrp !== null ? (
                <span className="text-sm text-ink/50 line-through">{formatPrice(product.msrp)}</span>
              ) : null}
              {product.price !== null ? (
                <span className="text-2xl font-extrabold text-hot-coral">
                  {formatPrice(product.price)}
                </span>
              ) : null}
              {savings ? <SaveBadge amount={savings} /> : null}
            </div>
          )}

          {isOutOfStock ? (
            <NotifyMeForm productSlug={product.slug} productName={product.name} compact />
          ) : (
            <AddToCartButton product={product} className="w-full" />
          )}

          <Link
            href={href}
            className={cn(
              'block text-center text-sm font-bold text-splash-blue-ink underline-offset-2 hover:underline',
            )}
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  )
}
