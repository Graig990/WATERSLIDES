import { Plus } from 'lucide-react'
import type { FaqItem } from '@/data/types'

/**
 * Built on <details>/<summary>, so it is keyboard accessible, works without
 * JavaScript, and ships zero client bundle. The answers are in the initial
 * HTML, which is what makes the FAQPage schema match visible content.
 */
export function FaqAccordion({ faqs, className = '' }: { faqs: FaqItem[]; className?: string }) {
  return (
    <div className={`divide-y divide-sky-tint overflow-hidden rounded-2xl border-2 border-sky-tint bg-white ${className}`}>
      {faqs.map((faq) => (
        <details key={faq.question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 font-bold text-deep-blue hover:bg-sky-tint/60 sm:p-5">
            <span>{faq.question}</span>
            <Plus
              aria-hidden="true"
              className="h-5 w-5 shrink-0 text-splash-blue transition-transform duration-200 group-open:rotate-45"
            />
          </summary>
          <div className="px-4 pb-5 text-ink/85 sm:px-5">
            <p className="leading-relaxed">{faq.answer}</p>
          </div>
        </details>
      ))}
    </div>
  )
}
