import type { FaqItem } from './types'

/**
 * ============================================================================
 * BLOG INDEX
 * ============================================================================
 * Metadata lives here; the article bodies are MDX files in
 * src/content/blog/<slug>.mdx and are pulled in by the [slug] route.
 *
 * AUTHORSHIP / E-E-A-T
 * Posts are attributed to the brand rather than to invented individuals.
 * Naming a fictional "10-year industry veteran" to farm E-E-A-T signals is
 * fabricated expertise — it is the same category of mistake as fake reviews,
 * and it is worth less than an honest organizational byline.
 *
 * TODO: once you have real named staff who can stand behind this content,
 * add them to `authors` with genuine bios and credentials and switch the
 * posts over. Real named authors with real experience do outperform an
 * organizational byline — but only when they are real.
 * ============================================================================
 */

export interface Author {
  id: string
  name: string
  /** 'Organization' emits schema.org Organization; 'Person' emits Person. */
  type: 'Organization' | 'Person'
  bio: string
  url: string
}

export const authors: Record<string, Author> = {
  house: {
    id: 'house',
    name: 'The WaterSlides4Kids Team',
    type: 'Organization',
    bio: 'We sell commercial-grade inflatable water slides, which means we spend a lot of time answering the same questions about vinyl weight, blower sizing, yard measurements, and what actually breaks first. These guides are those answers, written down.',
    url: '/about',
  },
}

export type BlogCategory =
  | 'Buying Guides'
  | 'Business'
  | 'Setup & Safety'
  | 'Care & Maintenance'

export interface BlogPost {
  slug: string
  title: string
  /** H1 on the post page — may differ slightly from the card title. */
  h1: string
  /** ≤60 characters. */
  metaTitle: string
  /** 150–160 characters. */
  metaDescription: string
  excerpt: string
  primaryKeyword: string
  category: BlogCategory
  /** ISO date. */
  publishedAt: string
  updatedAt: string
  readingMinutes: number
  authorId: keyof typeof authors
  /** Product slug whose image is used as the featured image. */
  featureProductSlug: string
  /** Rendered as an FAQPage block at the foot of the post. */
  faqs: FaqItem[]
  /** Products this post links to in-body. Enforced by the content audit. */
  linkedProductSlugs: string[]
  tags: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'best-inflatable-water-slide-buyers-guide',
    title: 'How to Choose the Best Inflatable Water Slide for Your Backyard (2026 Buyer’s Guide)',
    h1: 'How to Choose the Best Inflatable Water Slide for Your Backyard',
    metaTitle: 'Best Inflatable Water Slide: 2026 Buyer’s Guide',
    metaDescription:
      'The four decisions that actually matter when buying an inflatable water slide — height, lanes, pool type and vinyl weight. A practical 2026 buyer’s guide.',
    excerpt:
      'Four decisions determine whether you buy the right slide: height, lane count, pool type, and vinyl weight. Everything else is decoration. Here is how to get each one right.',
    primaryKeyword: 'best inflatable water slide',
    category: 'Buying Guides',
    publishedAt: '2026-03-04',
    updatedAt: '2026-06-18',
    readingMinutes: 9,
    authorId: 'house',
    featureProductSlug: 'tropical-breeze-15-dual-lane-waterslide',
    faqs: [
      {
        question: 'What is the best size inflatable water slide for a backyard?',
        answer:
          'For most suburban yards, 13ft to 16ft. Match the height to your youngest regular rider rather than your oldest — the most common buying mistake is going taller than the household will actually use.',
      },
      {
        question: 'How much should I spend on a good inflatable water slide?',
        answer:
          'Commercial-grade units start around $700 and run to about $3,700 for the largest dual-lane flagships. The number that matters is vinyl weight: 15oz commercial PVC lasts years, 6–9oz consumer vinyl lasts a season or two.',
      },
      {
        question: 'Are inflatable water slides worth it?',
        answer:
          'For a household that will use it several weekends a season for a few years, a commercial-grade slide costs less per use than repeatedly renting one. A cheap consumer slide replaced every second summer is the worst of both.',
      },
    ],
    linkedProductSlugs: [
      'tropical-breeze-15-dual-lane-waterslide',
      'summer-breeze-13-water-slide-with-pool',
      'ocean-wave-16-water-slide-attached-pool',
      'rocket-rush-17-dual-lane-water-slide',
    ],
    tags: ['buying guide', 'sizing', 'backyard'],
  },

  {
    slug: 'commercial-vs-residential-water-slides-pvc-vinyl',
    title: 'Commercial vs. Residential Water Slides: What 15oz PVC Vinyl Actually Buys You',
    h1: 'Commercial vs. Residential Water Slides: What 15oz PVC Vinyl Actually Buys You',
    metaTitle: 'Commercial Grade Inflatable Water Slide: 15oz Vinyl',
    metaDescription:
      'Commercial 15oz PVC vinyl versus 6–9oz consumer vinyl: what the difference means for seams, lifespan and five-year cost. A straight comparison, with the math.',
    excerpt:
      'The single spec that determines whether your slide lasts one season or ten. What 15oz commercial PVC actually changes, and the five-year cost comparison nobody runs.',
    primaryKeyword: 'commercial grade inflatable water slide',
    category: 'Buying Guides',
    publishedAt: '2026-03-19',
    updatedAt: '2026-06-02',
    readingMinutes: 8,
    authorId: 'house',
    featureProductSlug: 'summer-breeze-13-water-slide-with-pool',
    faqs: [
      {
        question: 'What does 15oz PVC vinyl mean?',
        answer:
          'It is the weight of one square yard of the coated fabric. Higher weight means a thicker base cloth and a heavier PVC coating, which resists abrasion, punctures and UV far better than lighter material.',
      },
      {
        question: 'Is a commercial water slide worth it for home use?',
        answer:
          'Over five years, usually yes. A consumer slide replaced every second summer costs more in total than one commercial unit, and it tends to fail mid-party at a seam.',
      },
      {
        question: 'How long does a commercial inflatable water slide last?',
        answer:
          'With proper drying and storage, many years of regular seasonal use. Drying discipline matters more than the price you paid — vinyl stored damp fails early regardless of weight.',
      },
    ],
    linkedProductSlugs: [
      'summer-breeze-13-water-slide-with-pool',
      'dolphin-16-water-slide-detachable-pool',
      'block-party-16-water-slide-and-pool',
    ],
    tags: ['vinyl', 'durability', 'buying guide'],
  },

  {
    slug: 'dual-lane-vs-single-lane-water-slides',
    title: 'Dual Lane vs. Single Lane Water Slides: Which Should You Buy?',
    h1: 'Dual Lane vs. Single Lane Water Slides: Which Should You Buy?',
    metaTitle: 'Dual Lane Water Slide vs Single Lane: How to Choose',
    metaDescription:
      'Two lanes double throughput and change the whole social dynamic — but cost width and money. Where the crossover actually sits, and when single lane wins.',
    excerpt:
      'A second lane does more than double capacity — it turns a queue into a race. But single lane is wider, cheaper and more forgiving. Here is where the crossover sits.',
    primaryKeyword: 'dual lane water slide',
    category: 'Buying Guides',
    publishedAt: '2026-04-02',
    updatedAt: '2026-06-25',
    readingMinutes: 8,
    authorId: 'house',
    featureProductSlug: 'rocket-rush-17-dual-lane-water-slide',
    faqs: [
      {
        question: 'Is a dual lane water slide worth the extra money?',
        answer:
          'With two or more children close in age, or parties above roughly eight to ten kids, yes. For an only child or small gatherings, spend the difference on height instead.',
      },
      {
        question: 'Do dual lane water slides need more space?',
        answer:
          'More width, roughly the same length. Width is the dimension most backyards run out of first, so measure across before you decide.',
      },
      {
        question: 'Can two kids go down the same lane together?',
        answer:
          'No. Each rider needs the full runout to decelerate. Two riders in one lane removes that room, which is the point of having two lanes.',
      },
    ],
    linkedProductSlugs: [
      'rocket-rush-17-dual-lane-water-slide',
      'tropical-breeze-15-dual-lane-waterslide',
      'tropic-tide-double-racer-13-dual-lane',
      'ocean-wave-16-water-slide-attached-pool',
    ],
    tags: ['dual lane', 'buying guide', 'comparison'],
  },

  {
    slug: 'inflatable-water-slide-cost',
    title: 'How Much Does an Inflatable Water Slide Cost? Full 2026 Price Breakdown',
    h1: 'How Much Does an Inflatable Water Slide Cost?',
    metaTitle: 'Inflatable Water Slide Cost: 2026 Price Breakdown',
    metaDescription:
      'What inflatable water slides really cost in 2026 — by height, lane count and grade — plus the running costs of water, power and storage nobody mentions.',
    excerpt:
      'Prices by height and configuration, what drives them, and the ongoing costs — water, electricity, storage, repairs — that never appear on a product page.',
    primaryKeyword: 'inflatable water slide cost',
    category: 'Buying Guides',
    publishedAt: '2026-04-16',
    updatedAt: '2026-07-01',
    readingMinutes: 9,
    authorId: 'house',
    featureProductSlug: 'purplish-castle-wet-dry-combo-splash-pool',
    faqs: [
      {
        question: 'How much does a commercial inflatable water slide cost?',
        answer:
          'Roughly $700 for a compact 13ft commercial unit up to about $3,700 for a 19ft dual-lane flagship. Combos sit in between, from about $2,000.',
      },
      {
        question: 'Why are inflatable water slides so expensive?',
        answer:
          'Material and labour. A commercial slide is 15oz PVC with quadruple-stitched seams, and the sewing is done by hand. Bigger units use more of both, plus more blowers.',
      },
      {
        question: 'How much does it cost to run an inflatable water slide?',
        answer:
          'A 1.5 HP blower running four hours costs roughly a dollar or two in electricity in most of the US, plus your water. The real ongoing cost is replacing a slide you failed to dry properly.',
      },
    ],
    linkedProductSlugs: [
      'purplish-castle-wet-dry-combo-splash-pool',
      'summer-breeze-13-water-slide-with-pool',
      'block-party-19-dual-lane-water-slide-deep-pool',
    ],
    tags: ['pricing', 'buying guide', 'running costs'],
  },

  {
    slug: 'how-to-start-a-water-slide-rental-business',
    title: 'How to Start a Water Slide Rental Business (and Make Your Money Back in 2 Months)',
    h1: 'How to Start a Water Slide Rental Business',
    metaTitle: 'Water Slide Rental Business: Start-Up & ROI Guide',
    metaDescription:
      'The real numbers behind a water slide rental business — startup costs, per-booking margin, payback math, insurance, and which unit to buy first.',
    excerpt:
      'Startup costs, realistic booking rates, the payback calculation, and the operational details — insurance, transport, staffing — that decide whether this works.',
    primaryKeyword: 'water slide rental business',
    category: 'Business',
    publishedAt: '2026-04-30',
    updatedAt: '2026-07-09',
    readingMinutes: 12,
    authorId: 'house',
    featureProductSlug: 'rocket-rush-17-dual-lane-water-slide',
    faqs: [
      {
        question: 'Is a water slide rental business profitable?',
        answer:
          'It can be, and the margin per booking is high because the main cost is the unit itself. Profitability depends on booking volume in a short season, insurance costs, and whether you can transport and set up efficiently.',
      },
      {
        question: 'How much does it cost to start a water slide rental business?',
        answer:
          'The unit is the largest line item. Beyond that, budget for liability insurance, a vehicle that can carry 300–500 lb, anchoring and cleaning equipment, and a booking system.',
      },
      {
        question: 'What insurance do I need to rent out inflatable water slides?',
        answer:
          'General liability cover written for inflatable amusement rental is the standard requirement, and most venues will ask to be named as additional insured. Speak to a broker who knows this industry — do not rely on a generic small-business policy.',
      },
    ],
    linkedProductSlugs: [
      'rocket-rush-17-dual-lane-water-slide',
      'surf-beach-17-dual-lane-water-slide',
      'pop-splash-dual-lane-combo-slide-pool',
      'block-party-19-dual-lane-water-slide-deep-pool',
    ],
    tags: ['business', 'ROI', 'rental'],
  },

  {
    slug: 'water-slide-blower-size',
    title: 'What Size Blower Do I Need for My Inflatable Water Slide?',
    h1: 'What Size Blower Do I Need for My Inflatable Water Slide?',
    metaTitle: 'Water Slide Blower Size: CFM, HP and Circuits',
    metaDescription:
      'Why CFM matters more than horsepower, how to size a blower to your slide, and the circuit-sharing mistake that stops big inflatables standing up.',
    excerpt:
      'Horsepower is the number on the box; CFM is the number that matters. How to size a blower, and why two outlets on one circuit is the most common setup failure.',
    primaryKeyword: 'water slide blower size',
    category: 'Setup & Safety',
    publishedAt: '2026-05-14',
    updatedAt: '2026-06-30',
    readingMinutes: 7,
    authorId: 'house',
    featureProductSlug: 'block-party-19-dual-lane-water-slide-deep-pool',
    faqs: [
      {
        question: 'What size blower do I need for an inflatable water slide?',
        answer:
          'Match the CFM rating specified for your unit rather than the horsepower. Most 13–16ft slides run on a single 1–1.5 HP blower; 19ft units and large combos need two.',
      },
      {
        question: 'Can I run two blowers on one circuit?',
        answer:
          'No. Two blowers need two separate circuits. Sharing one is the single most common reason a large inflatable fails to stand up on delivery day.',
      },
      {
        question: 'Does the blower run the whole time?',
        answer:
          'Yes. These are constant-airflow inflatables — the blower stays on for the entire session. There is no inflate-and-unplug mode.',
      },
    ],
    linkedProductSlugs: [
      'block-party-19-dual-lane-water-slide-deep-pool',
      'tropical-ocean-wet-dry-combo-splash-pool',
      'summer-breeze-13-water-slide-with-pool',
    ],
    tags: ['blower', 'setup', 'power'],
  },

  {
    slug: 'inflatable-water-slide-safety-checklist',
    title: 'Inflatable Water Slide Safety: The Complete Setup & Supervision Checklist',
    h1: 'Inflatable Water Slide Safety: Setup & Supervision Checklist',
    metaTitle: 'Inflatable Water Slide Safety Checklist & Setup Guide',
    metaDescription:
      'A practical setup, anchoring, wind and supervision checklist for inflatable water slides — including the wind rule that decides when to shut down.',
    excerpt:
      'Site selection, anchoring, wind limits, rider rules and supervision ratios — the checklist to run before anyone climbs, and the conditions that mean shutting down.',
    primaryKeyword: 'inflatable water slide safety',
    category: 'Setup & Safety',
    publishedAt: '2026-05-28',
    updatedAt: '2026-07-15',
    readingMinutes: 10,
    authorId: 'house',
    featureProductSlug: 'ocean-shark-15-water-slide-detachable-pool',
    faqs: [
      {
        question: 'What wind speed is too high for an inflatable water slide?',
        answer:
          'Manufacturers commonly specify shutting down somewhere around 15–25 mph, and your unit’s own documentation governs. Deflate and secure before the gust arrives rather than after — wind is the leading cause of serious inflatable incidents.',
      },
      {
        question: 'How many adults should supervise an inflatable water slide?',
        answer:
          'At least one adult watching continuously, positioned where they can see both the platform and the pool. A combo with a separate bounce chamber needs two, because one person cannot properly watch both zones.',
      },
      {
        question: 'Do inflatable water slides need to be anchored?',
        answer:
          'Always. Stakes on grass, ballast or sandbags on hard surfaces, at every anchor point. An unanchored inflatable is a sail.',
      },
    ],
    linkedProductSlugs: [
      'ocean-shark-15-water-slide-detachable-pool',
      'block-party-12-dual-lane-backload-water-slide',
      'surf-beach-19-single-lane-water-slide',
    ],
    tags: ['safety', 'setup', 'supervision'],
  },

  {
    slug: 'attached-vs-detachable-pool-water-slides',
    title: 'Attached Pool vs. Detachable Pool Water Slides: Pros, Cons, and Cleanup',
    h1: 'Attached Pool vs. Detachable Pool Water Slides',
    metaTitle: 'Water Slide With Detachable Pool vs Attached Pool',
    metaDescription:
      'Detachable pools buy you a dry season; attached pools remove the seam that leaks first. A practical comparison covering setup, durability and cleanup.',
    excerpt:
      'One gives you two products from one purchase. The other removes the joint that fails first. How to choose, and what each means for setup and cleanup.',
    primaryKeyword: 'water slide with detachable pool',
    category: 'Buying Guides',
    publishedAt: '2026-06-11',
    updatedAt: '2026-07-20',
    readingMinutes: 8,
    authorId: 'house',
    featureProductSlug: 'dolphin-16-water-slide-detachable-pool',
    faqs: [
      {
        question: 'Is a detachable pool better than an attached pool?',
        answer:
          'Neither is better in the abstract. Detachable buys you dry-season use; attached removes the detach seam, which is the most common leak point, and sets up faster.',
      },
      {
        question: 'How long does it take to detach a water slide pool?',
        answer:
          'About 90 seconds for a shallow splash basin on a single lane. Budget five minutes and two people for a deep pool, and drain it fully before separating.',
      },
      {
        question: 'How do you drain an attached water slide pool?',
        answer:
          'Through the built-in drain plug. Site the slide so the plug corner faces downhill and the basin empties itself while you start drying the lane.',
      },
    ],
    linkedProductSlugs: [
      'dolphin-16-water-slide-detachable-pool',
      'ocean-wave-16-water-slide-attached-pool',
      't-rex-dinosaur-wet-dry-combo-deep-pool',
    ],
    tags: ['pools', 'comparison', 'cleanup'],
  },

  {
    slug: 'how-to-clean-and-store-an-inflatable-water-slide',
    title: 'How to Clean, Dry, and Store an Inflatable Water Slide So It Lasts 10 Years',
    h1: 'How to Clean, Dry, and Store an Inflatable Water Slide',
    metaTitle: 'How to Clean an Inflatable Water Slide & Store It',
    metaDescription:
      'The end-of-day routine that decides whether your slide lasts three seasons or ten — cleaning, the drying rule, mildew, patching and winter storage.',
    excerpt:
      'Twenty minutes of drying is the difference between three seasons and ten. The full end-of-day routine, plus mildew rescue and off-season storage.',
    primaryKeyword: 'how to clean inflatable water slide',
    category: 'Care & Maintenance',
    publishedAt: '2026-06-25',
    updatedAt: '2026-07-22',
    readingMinutes: 9,
    authorId: 'house',
    featureProductSlug: 'jungle-falls-17-dual-lane-water-slide',
    faqs: [
      {
        question: 'How do you clean an inflatable water slide?',
        answer:
          'Rinse it while it is still inflated, wash with mild soap and a soft brush, rinse again, then dry it completely before it goes in the bag. Avoid bleach and solvent cleaners — they degrade the PVC coating.',
      },
      {
        question: 'What happens if you store an inflatable water slide wet?',
        answer:
          'Mildew, which etches the coating, stains permanently, smells, and voids most warranties. It is the single most common cause of premature failure.',
      },
      {
        question: 'How do you get mildew off an inflatable slide?',
        answer:
          'Re-inflate, scrub affected areas with a mild vinyl-safe cleaner and a soft brush, rinse thoroughly and dry completely in sun and moving air. Deep staining may be permanent — prevention is the only real fix.',
      },
    ],
    linkedProductSlugs: [
      'jungle-falls-17-dual-lane-water-slide',
      'purple-tropical-16-water-slide-attached-pool',
      'unicorn-wet-dry-combo-deep-pool',
    ],
    tags: ['maintenance', 'storage', 'cleaning'],
  },

  {
    slug: 'inflatable-water-slide-permit-guide',
    title: 'Do You Need a Permit for an Inflatable Water Slide? US State-by-State Overview',
    h1: 'Do You Need a Permit for an Inflatable Water Slide?',
    metaTitle: 'Inflatable Water Slide Permit Rules: US Overview',
    metaDescription:
      'General guidance on where inflatable amusement permits and inspections typically apply in the US, what changes for commercial use, and how to check locally.',
    excerpt:
      'Where permits typically apply, how private backyard use usually differs from commercial operation, and how to check your own jurisdiction properly.',
    primaryKeyword: 'inflatable water slide permit',
    category: 'Setup & Safety',
    publishedAt: '2026-07-09',
    updatedAt: '2026-07-25',
    readingMinutes: 10,
    authorId: 'house',
    featureProductSlug: 'block-party-16-water-slide-and-pool',
    faqs: [
      {
        question: 'Do I need a permit for an inflatable water slide in my backyard?',
        answer:
          'Private, non-commercial use on your own property is generally treated differently from public or commercial operation, but rules vary by state and municipality and can be affected by HOA covenants. Check with your local building or permitting office.',
      },
      {
        question: 'Do commercial inflatable rentals need inspection?',
        answer:
          'Many states regulate inflatable amusement devices used commercially, and requirements can include registration, inspection and insurance. This is state-specific — verify with your state agency rather than relying on a general guide.',
      },
      {
        question: 'Who is responsible for getting a permit, the renter or the operator?',
        answer:
          'It varies by jurisdiction and by contract. For commercial bookings the operator usually carries the compliance burden, but confirm it in writing for each event.',
      },
    ],
    linkedProductSlugs: [
      'block-party-16-water-slide-and-pool',
      'pop-splash-dual-lane-combo-slide-pool',
      '45-tropical-wet-dry-obstacle-dual-lane-slide',
    ],
    tags: ['permits', 'regulations', 'business'],
  },
]

export const blogPostsBySlug = new Map(blogPosts.map((p) => [p.slug, p]))

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPostsBySlug.get(slug)
}

/** Newest first. */
export function getSortedPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export function getLatestPosts(limit = 3): BlogPost[] {
  return getSortedPosts().slice(0, limit)
}

export function getPostsByProduct(productSlug: string): BlogPost[] {
  return blogPosts.filter((p) => p.linkedProductSlugs.includes(productSlug))
}

export const blogCategories: BlogCategory[] = [
  'Buying Guides',
  'Business',
  'Setup & Safety',
  'Care & Maintenance',
]
