import type { JsonLd as JsonLdType } from '@/lib/schema'

/**
 * Renders JSON-LD. Server component, so the markup is in the initial HTML
 * where crawlers will actually see it.
 */
export function JsonLd({ data }: { data: JsonLdType | JsonLdType[] }) {
  const payload = Array.isArray(data) ? data : [data]

  return (
    <>
      {payload.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          // JSON.stringify output is escaped below; `<` is the only character
          // that could break out of the script element.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, '\\u003c'),
          }}
        />
      ))}
    </>
  )
}
