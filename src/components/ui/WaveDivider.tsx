import { cn } from '@/lib/utils'

type WaveColor = 'white' | 'sky' | 'blue' | 'coral' | 'deep'

const FILL: Record<WaveColor, string> = {
  white: 'fill-foam-white',
  sky: 'fill-sky-tint',
  blue: 'fill-splash-blue',
  coral: 'fill-hot-coral',
  deep: 'fill-deep-blue',
}

/**
 * The pool-wave shape from the logo mark, reused as the section divider.
 * Decorative, so it is hidden from assistive tech.
 */
export function WaveDivider({
  color = 'white',
  flip = false,
  className,
}: {
  color?: WaveColor
  flip?: boolean
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none w-full overflow-hidden leading-[0]', className)}
    >
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className={cn('block h-[48px] w-full md:h-[72px]', flip && 'rotate-180')}
        focusable="false"
      >
        <path
          className={FILL[color]}
          d="M0 42 Q 180 4 360 42 T 720 42 T 1080 34 T 1440 46 L1440 90 L0 90 Z"
        />
      </svg>
    </div>
  )
}

/** A double wave for the heavier section breaks. */
export function WaveDividerStacked({
  color = 'white',
  className,
}: {
  color?: WaveColor
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none relative w-full overflow-hidden leading-[0]', className)}
    >
      <svg
        viewBox="0 0 1440 110"
        preserveAspectRatio="none"
        className="block h-[56px] w-full md:h-[84px]"
        focusable="false"
      >
        <path
          className={FILL[color]}
          opacity="0.4"
          d="M0 30 Q 200 0 400 30 T 800 30 T 1200 22 T 1440 36 L1440 110 L0 110 Z"
        />
        <path
          className={FILL[color]}
          d="M0 58 Q 180 26 360 58 T 720 58 T 1080 50 T 1440 62 L1440 110 L0 110 Z"
        />
      </svg>
    </div>
  )
}
