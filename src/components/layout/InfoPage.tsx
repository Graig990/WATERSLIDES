import type { ReactNode } from 'react'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import type { Crumb } from '@/lib/schema'

/** Shared shell for the support, policy and company pages. */
export function InfoPage({
  title,
  intro,
  crumbs,
  updated,
  children,
}: {
  title: string
  intro?: string
  crumbs: Crumb[]
  updated?: string
  children: ReactNode
}) {
  return (
    <>
      <section className="bg-gradient-to-b from-sky-tint to-white pt-6 pb-10">
        <div className="mx-auto max-w-3xl px-4">
          <Breadcrumbs crumbs={crumbs} className="mb-6" />
          <h1 className="text-4xl leading-tight sm:text-5xl">{title}</h1>
          {intro ? <p className="mt-4 text-lg leading-relaxed text-ink/80">{intro}</p> : null}
          {updated ? (
            <p className="mt-4 text-sm font-semibold text-ink/55">Last updated: {updated}</p>
          ) : null}
        </div>
      </section>

      <section className="bg-white pb-16">
        <div className="prose-splash mx-auto max-w-3xl px-4">{children}</div>
      </section>
    </>
  )
}
