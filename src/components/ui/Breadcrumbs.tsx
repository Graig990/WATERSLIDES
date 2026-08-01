import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { Crumb } from '@/lib/schema'
import { cn } from '@/lib/utils'

/**
 * Visual breadcrumbs. The matching BreadcrumbList JSON-LD is emitted by the
 * page itself so the two never drift apart.
 */
export function Breadcrumbs({ crumbs, className }: { crumbs: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn('text-sm', className)}>
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-1">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1
          return (
            <li key={crumb.href} className="flex items-center gap-1">
              {index > 0 ? (
                <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0 text-ink/40" />
              ) : null}
              {isLast ? (
                <span aria-current="page" className="font-semibold text-ink/70">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="font-semibold text-splash-blue-ink underline-offset-2 hover:underline"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
