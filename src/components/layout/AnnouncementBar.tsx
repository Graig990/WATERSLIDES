import { Phone, Truck } from 'lucide-react'
import { siteConfig } from '@/data/site'

export function AnnouncementBar() {
  return (
    <div className="bg-deep-blue text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2 text-center text-xs font-semibold sm:text-sm">
        <span className="flex items-center gap-1.5">
          <Truck aria-hidden="true" className="h-4 w-4 text-sunny-yellow" />
          {siteConfig.announcement.freeShipping}
        </span>
        <span className="hidden items-center gap-1.5 sm:flex">
          <span aria-hidden="true">🇺🇸</span>
          {siteConfig.announcement.origin}
        </span>
        <a
          href={`tel:${siteConfig.phoneE164}`}
          className="flex items-center gap-1.5 underline-offset-2 hover:underline"
        >
          <Phone aria-hidden="true" className="h-4 w-4 text-sunny-yellow" />
          {siteConfig.phone}
        </a>
      </div>
    </div>
  )
}
