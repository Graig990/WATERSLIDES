import { cn } from '@/lib/utils'

/** Deterministic so server and client markup match exactly. */
const BUBBLES = [
  { cx: 8, cy: 74, r: 3.2, delay: '0s', opacity: 0.35 },
  { cx: 18, cy: 30, r: 2.1, delay: '1.4s', opacity: 0.28 },
  { cx: 31, cy: 82, r: 4.4, delay: '2.6s', opacity: 0.3 },
  { cx: 47, cy: 22, r: 2.8, delay: '0.7s', opacity: 0.25 },
  { cx: 63, cy: 66, r: 3.6, delay: '3.2s', opacity: 0.32 },
  { cx: 76, cy: 18, r: 2.4, delay: '1.9s', opacity: 0.26 },
  { cx: 88, cy: 58, r: 5, delay: '2.1s', opacity: 0.3 },
  { cx: 95, cy: 28, r: 2.6, delay: '0.4s', opacity: 0.24 },
]

/** Floating bubbles for hero and CTA backgrounds. Purely decorative. */
export function Bubbles({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
    >
      {BUBBLES.map((bubble, index) => (
        <circle
          key={index}
          cx={bubble.cx}
          cy={bubble.cy}
          r={bubble.r}
          fill="white"
          opacity={bubble.opacity}
          className="bubble-float"
          style={{ animationDelay: bubble.delay }}
        />
      ))}
    </svg>
  )
}
