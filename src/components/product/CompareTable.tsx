import Link from 'next/link'
import { Check } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/data/types'

const POOL_LABEL = {
  attached: 'Attached',
  detachable: 'Detachable',
  none: 'None',
} as const

/** "Compare similar slides" — the current product against its siblings. */
export function CompareTable({ current, others }: { current: Product; others: Product[] }) {
  const rows = [current, ...others]

  return (
    <div className="table-scroll rounded-3xl border-2 border-sky-tint">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <caption className="sr-only">
          {current.shortName} compared with similar inflatable water slides
        </caption>
        <thead>
          <tr className="bg-deep-blue text-white">
            <th scope="col" className="p-3 text-left">
              Slide
            </th>
            <th scope="col" className="p-3 text-left">
              Height
            </th>
            <th scope="col" className="p-3 text-left">
              Lanes
            </th>
            <th scope="col" className="p-3 text-left">
              Pool
            </th>
            <th scope="col" className="p-3 text-left">
              Price
            </th>
            <th scope="col" className="p-3 text-left">
              Stock
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((product) => {
            const isCurrent = product.slug === current.slug
            return (
              <tr
                key={product.slug}
                className={isCurrent ? 'bg-sunny-yellow/20 font-semibold' : 'bg-white'}
              >
                <th scope="row" className="border-b border-sky-tint p-3 text-left font-bold">
                  {isCurrent ? (
                    <span className="flex items-center gap-1.5 text-deep-blue">
                      <Check aria-hidden="true" className="h-4 w-4 text-lime-ink" />
                      {product.shortName}
                      <span className="sr-only">(the slide you are viewing)</span>
                    </span>
                  ) : (
                    <Link
                      href={`/shop/${product.slug}`}
                      className="text-splash-blue-ink underline-offset-2 hover:underline"
                    >
                      {product.shortName}
                    </Link>
                  )}
                </th>
                <td className="border-b border-sky-tint p-3">
                  {product.heightFt ? `${product.heightFt} ft` : '—'}
                </td>
                <td className="border-b border-sky-tint p-3">
                  {product.lanes === 2 ? 'Dual' : 'Single'}
                </td>
                <td className="border-b border-sky-tint p-3">{POOL_LABEL[product.poolType]}</td>
                <td className="border-b border-sky-tint p-3">
                  {product.price === null ? 'Call for availability' : formatPrice(product.price)}
                </td>
                <td className="border-b border-sky-tint p-3">
                  {product.stock === 'in-stock'
                    ? 'In stock'
                    : product.stock === 'pre-order'
                      ? 'Pre-order'
                      : 'Out of stock'}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
