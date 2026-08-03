import Image from 'next/image'
import { CRYPTO_MARKS, BrandChip } from './PaymentLogos'
import type { PaymentMethod } from '@/data/payments'

/**
 * Renders a payment method's logo.
 *
 * Order of preference:
 *   1. The official SVG, once you have downloaded it into
 *      public/brand/payments/ and set `logoFile`.
 *   2. For crypto, the faithful openly-licensed mark drawn in PaymentLogos.
 *   3. Otherwise a brand-coloured wordmark chip — honestly our own styling
 *      rather than a traced imitation of a trademark.
 */
export function PaymentMethodLogo({
  method,
  className = 'h-6',
}: {
  method: PaymentMethod
  className?: string
}) {
  if (method.logoFile) {
    return (
      <Image
        src={`/brand/payments/${method.logoFile}`}
        alt={`${method.label} logo`}
        width={72}
        height={24}
        // SVG gains nothing from the raster optimiser.
        unoptimized
        className={`${className} w-auto`}
      />
    )
  }

  if (method.id === 'crypto') {
    return (
      <span className="flex items-center gap-1">
        {(Object.keys(CRYPTO_MARKS) as (keyof typeof CRYPTO_MARKS)[]).map((symbol) => {
          const Mark = CRYPTO_MARKS[symbol]
          return <Mark key={symbol} className={`${className} w-auto`} />
        })}
      </span>
    )
  }

  return <BrandChip label={method.label} color={method.brandColor} />
}

/** Single crypto asset logo, for the confirmation page. */
export function CryptoAssetLogo({
  symbol,
  className = 'h-6 w-6',
}: {
  symbol: string
  className?: string
}) {
  const Mark = CRYPTO_MARKS[symbol as keyof typeof CRYPTO_MARKS]
  return Mark ? <Mark className={className} /> : null
}
