import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'

/**
 * Global MDX component overrides for the blog.
 *
 * Internal links go through next/link so blog → PDP navigation is a client
 * transition (and prefetched), which is most of the internal-linking value.
 */
const components: MDXComponents = {
  a: ({ href, children, ...props }) => {
    const target = typeof href === 'string' ? href : ''
    const isInternal = target.startsWith('/')

    if (isInternal) {
      return (
        <Link href={target} {...props}>
          {children}
        </Link>
      )
    }

    return (
      <a href={target} rel="noopener noreferrer" target="_blank" {...props}>
        {children}
      </a>
    )
  },
  table: ({ children, ...props }) => (
    <div className="table-scroll">
      <table {...props}>{children}</table>
    </div>
  ),
}

export function useMDXComponents(): MDXComponents {
  return components
}
