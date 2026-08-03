/**
 * ============================================================================
 * PAYMENT METHOD LOGOS
 * ============================================================================
 *
 * Two tiers, deliberately:
 *
 * 1. CRYPTO MARKS ARE DRAWN HERE. The Bitcoin, Ethereum and Tether marks are
 *    simple geometric shapes published for open use — Bitcoin's is public
 *    domain, Ethereum publishes its assets for free use, and Tether's is a
 *    plain letterform. These are faithful reproductions.
 *
 * 2. ZELLE, CHIME, CASH APP AND APPLE PAY ARE NOT DRAWN HERE — and must not
 *    be. Those are registered trademarks with detailed brand guidelines, and
 *    an approximation traced from memory would be a distorted fake that
 *    misrepresents someone else's brand. Instead each renders a
 *    brand-coloured wordmark chip, which is honestly our own styling, until
 *    you drop the official SVG into public/brand/payments/ and set
 *    `logoFile` in src/data/payments.ts.
 *
 *    See public/brand/payments/README.md for where to download each one and
 *    what the licence requires.
 * ============================================================================
 */

/* --------------------------------------------------------------------- */
/* Crypto — faithful, openly licensed marks                              */
/* --------------------------------------------------------------------- */

const SVG_BASE = {
  viewBox: '0 0 32 32',
  'aria-hidden': true as const,
  focusable: 'false' as const,
}

/** Bitcoin: the ₿ monogram on the orange roundel. Public domain. */
export function BitcoinMark({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg {...SVG_BASE} className={className}>
      <circle cx="16" cy="16" r="16" fill="#F7931A" />
      <path
        fill="#FFF"
        d="M23.2 14.2c.3-2-1.2-3.1-3.3-3.8l.7-2.7-1.7-.4-.7 2.6c-.4-.1-.9-.2-1.4-.3l.7-2.6-1.7-.4-.7 2.7-1.1-.3-2.3-.6-.4 1.8s1.2.3 1.2.3c.7.2.8.6.8 1l-.8 3.1v.1l-1.1 4.4c-.1.2-.3.5-.8.4 0 0-1.2-.3-1.2-.3l-.8 1.9 2.2.5 1.2.3-.7 2.8 1.7.4.7-2.7c.5.1.9.2 1.4.3l-.7 2.7 1.7.4.7-2.8c2.8.5 5 .3 5.9-2.2.7-2-.1-3.2-1.5-4 1.1-.2 1.9-.9 2.1-2.4Zm-3.7 5.3c-.5 2-4 .9-5.1.7l.9-3.7c1.1.3 4.8.8 4.2 3Zm.5-5.4c-.5 1.8-3.4.9-4.3.7l.8-3.3c1 .2 4 .7 3.5 2.6Z"
      />
    </svg>
  )
}

/** Ethereum: the octahedron. Ethereum publishes its assets for open use. */
export function EthereumMark({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg {...SVG_BASE} className={className}>
      <circle cx="16" cy="16" r="16" fill="#627EEA" />
      <path fill="#FFF" fillOpacity=".6" d="M16.5 4v8.9l7.5 3.3L16.5 4Z" />
      <path fill="#FFF" d="M16.5 4 9 16.2l7.5-3.3V4Z" />
      <path fill="#FFF" fillOpacity=".6" d="M16.5 21.9v6.1l7.5-10.4-7.5 4.3Z" />
      <path fill="#FFF" d="M16.5 28v-6.1L9 17.6 16.5 28Z" />
      <path fill="#FFF" fillOpacity=".2" d="m16.5 20.5 7.5-4.3-7.5-3.3v7.6Z" />
      <path fill="#FFF" fillOpacity=".6" d="M9 16.2l7.5 4.3v-7.6L9 16.2Z" />
    </svg>
  )
}

/** Tether: the ₮ letterform on the green roundel. */
export function TetherMark({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg {...SVG_BASE} className={className}>
      <circle cx="16" cy="16" r="16" fill="#26A17B" />
      <path
        fill="#FFF"
        d="M17.9 17.4v-2.1h4.8v-3.2H9.3v3.2h4.8v2.1c-3.9.2-6.8 1-6.8 1.9s2.9 1.7 6.8 1.9v6.7h3.8v-6.7c3.9-.2 6.8-1 6.8-1.9s-2.9-1.7-6.8-1.9Zm0 3.2c-.1 0-.7.1-1.9.1-1 0-1.7 0-1.9-.1-3.4-.1-5.9-.7-5.9-1.4s2.5-1.3 5.9-1.4v2.4c.2 0 .9.1 1.9.1 1.2 0 1.8-.1 1.9-.1v-2.4c3.4.1 5.9.7 5.9 1.4s-2.5 1.3-5.9 1.4Z"
      />
    </svg>
  )
}

export const CRYPTO_MARKS = {
  BTC: BitcoinMark,
  ETH: EthereumMark,
  USDT: TetherMark,
} as const

/* --------------------------------------------------------------------- */
/* Brand chips — honest placeholder until official artwork is supplied    */
/* --------------------------------------------------------------------- */

/**
 * A wordmark chip in the brand's own colour. Clearly our own typography
 * rather than an imitation of the real logo, so nothing here misrepresents
 * a trademark. Replaced automatically once `logoFile` is set.
 */
export function BrandChip({
  label,
  color,
  className = '',
}: {
  label: string
  color: string
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-extrabold tracking-tight text-white ${className}`}
      style={{ backgroundColor: color }}
    >
      {label}
    </span>
  )
}
