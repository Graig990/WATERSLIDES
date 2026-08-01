import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Section heading with the yellow flume curve as the underline accent —
 * the third of the three logo shapes reused across the site.
 */
export function SectionHeading({
  as: Tag = 'h2',
  eyebrow,
  children,
  align = 'center',
  tone = 'ink',
  className,
}: {
  as?: 'h1' | 'h2' | 'h3'
  eyebrow?: string
  children: ReactNode
  align?: 'center' | 'left'
  tone?: 'ink' | 'light'
  className?: string
}) {
  return (
    <div className={cn('mb-8', align === 'center' ? 'text-center' : 'text-left', className)}>
      {eyebrow ? (
        <p
          className={cn(
            'mb-2 text-sm font-bold tracking-[0.18em] uppercase',
            tone === 'light' ? 'text-sunny-yellow' : 'text-splash-blue-ink',
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Tag
        className={cn(
          'text-3xl leading-tight sm:text-4xl',
          tone === 'light' ? 'text-white' : 'text-deep-blue',
        )}
      >
        <span className="flume-underline">{children}</span>
      </Tag>
    </div>
  )
}
