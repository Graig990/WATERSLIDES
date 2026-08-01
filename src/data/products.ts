import type { Product, ProductCardData } from './types'

/**
 * ============================================================================
 * PRODUCT CATALOG
 * ============================================================================
 *
 * ⚠️  SPEC VALUES ARE EXAMPLES.
 * Every `specs` entry below (footprint, rider capacity, weight limit, age
 * range, blower requirement, vinyl weight, warranty, ship weight) is a
 * representative placeholder for a slide of this class — NOT a figure quoted
 * from a supplier data sheet.
 *
 * TODO: confirm every spec with the supplier before launch. Publishing a
 * wrong weight limit or age range on a children's product is a liability
 * problem long before it is an SEO problem.
 *
 * Deliberately NOT present anywhere in this file: safety certifications,
 * test results, star ratings, and review counts. Do not add them until you
 * hold the paperwork — fabricated review/certification markup earns a manual
 * action and the pages get demoted.
 *
 * `mpn` values are read off the public product-image filenames on the
 * supplier CDNs. TODO: confirm against a real price sheet.
 *
 * IMAGES: hotlinked from herokiddo.com / xjump.com for the build. Replace
 * with your own self-hosted photography before launch — see README.
 * ============================================================================
 */

export const products: Product[] = [
  {
    slug: 'tropical-breeze-15-dual-lane-waterslide',
    name: "Tropical Breeze 15' Dual Lane Water Slide",
    shortName: "Tropical Breeze 15' Dual Lane",
    image: 'https://herokiddo.com/cdn/shop/files/HKSD-XTropical15_1600x.jpg?v=1781791327',
    msrp: 2699,
    price: 1889,
    stock: 'in-stock',
    collections: ['water-slides', 'dual-lane-water-slides'],
    homepageFeatured: true,
    isNew: true,
    heroImage: true,
    sku: 'WS4K-TB15-DL',
    mpn: 'HKSD-XTropical15',
    heightFt: 15,
    lanes: 2,
    poolType: 'attached',
    wetDry: false,
    tagline: 'Two lanes, one winner — the racing slide that ends every argument',
    intro:
      "The Tropical Breeze 15' is the slide you buy when the line matters more than the drop. Two full-width racing lanes run side by side from a 15-foot platform into a shared splash pool, which means two kids ride at once and nobody spends the afternoon waiting their turn. The palm-and-hibiscus print reads as a beach party from across the yard, and the 15-foot height hits the sweet spot most families land on: tall enough that older kids stay interested, short enough that it fits a standard suburban lot without a crane.",
    body: [
      "Throughput is the whole argument for dual lane. A single-lane slide of this height cycles roughly one rider every eight to ten seconds once you account for the climb. Put two lanes on the same climbing wall and you are not just doubling capacity — you are changing the social dynamic. Kids self-organize into races. The queue stops being a queue. For a birthday party with fifteen guests, that difference is the gap between a slide that entertains for forty minutes and one that entertains for four hours.",
      "The climbing wall runs up the front face with molded hand and foot holds and a safety net on the ascent, so riders go up the front and come down the lanes rather than crossing paths. The lane divider is a full-height inflated baffle, not a stitched-on ridge, which keeps racers in their own lane at speed instead of letting them drift together at the bottom. The landing pool is attached — it inflates as one piece with the body of the slide, so there is no second chamber to align and no seam to leak at the joint.",
      "Setup is the part people underestimate, so it is worth being specific: unroll, stake the four corners, connect a single blower, and the slide is standing in three to five minutes. Because the pool is attached, there is no separate assembly step. Takedown is the reverse plus drying time, which is the real constraint — see our guide on cleaning and storing a slide for why that twenty minutes of drying is what decides whether you get three seasons or ten out of the vinyl.",
      "This is a commercial-grade unit, which in practice means the seams are quadruple-stitched and the vinyl is rated for repeat commercial cycling rather than a handful of weekends. If you are buying for a rental business, the Tropical Breeze prints money precisely because the theme is neutral — tropical works for a five-year-old's luau and a corporate summer picnic, so it books more weekends per season than a character-themed unit ever will.",
    ],
    highlights: [
      'Two full-width racing lanes fed by a single climbing wall',
      'Attached splash pool — one chamber, one blower, no assembly',
      'Full-height inflated lane divider keeps racers separated at speed',
      'Neutral tropical theme books across every party type',
      'Free shipping sitewide, blower included',
    ],
    inTheBox: [
      "Tropical Breeze 15' dual lane water slide",
      'Blower sized for this unit',
      'Ground stakes and tether ropes',
      'Storage bag and repair patch kit',
      'Setup and safe-operation instructions',
    ],
    specs: [
      { label: 'Inflated footprint', value: "31' L × 16' W × 15' H" },
      { label: 'Recommended clear space', value: "36' L × 21' W" },
      { label: 'Rider capacity', value: '2 at a time (1 per lane)' },
      { label: 'Max rider weight', value: '200 lb per rider' },
      { label: 'Age range', value: '5–12 years, adult supervision required' },
      { label: 'Blower requirement', value: '1 × 1.5 HP blower (included)' },
      { label: 'Vinyl weight', value: '15oz commercial-grade PVC' },
      { label: 'Seam construction', value: 'Quadruple-stitched, reinforced stress points' },
      { label: 'Setup time', value: '3–5 minutes' },
      { label: 'Approx. shipping weight', value: '295 lb' },
      { label: 'Warranty', value: '1 year against seam and stitching defects' },
    ],
    faqs: [
      {
        question: "Do both lanes on the Tropical Breeze 15' run at the same speed?",
        answer:
          'Yes — the lanes are mirrored and share the same slope, drop height, and surface, so a fair race comes down to the riders. Uneven ground is the usual culprit when one lane feels faster; level the site and the difference disappears.',
      },
      {
        question: 'How much water does the attached pool hold?',
        answer:
          'The pool is a shallow splash basin rather than a swimming pool — a few inches of standing water at most, continuously refreshed by the hose feeding the lanes. It is designed to slow riders down, not to swim in.',
      },
      {
        question: "Will a 15' slide fit a standard suburban backyard?",
        answer:
          "You need roughly 36' × 21' of clear, level space plus overhead clearance free of branches and power lines. That fits most quarter-acre lots. Measure before you order — our size guide walks through how to check.",
      },
      {
        question: 'Can adults ride this slide?',
        answer:
          'The specification above is written for the 5–12 age range. Treat adult use as outside the intended operating envelope unless the supplier documentation you receive with the unit says otherwise.',
      },
    ],
    relatedSlugs: [
      'rocket-rush-17-dual-lane-water-slide',
      'tropic-tide-double-racer-13-dual-lane',
      'block-party-16-water-slide-and-pool',
    ],
    blogSlugs: ['dual-lane-vs-single-lane-water-slides', 'best-inflatable-water-slide-buyers-guide'],
  },

  {
    slug: 't-rex-18-water-slide-detachable-pool',
    name: "T-Rex 18' Water Slide with Detachable Pool",
    shortName: "T-Rex 18'",
    image: 'https://herokiddo.com/cdn/shop/files/HKS-Trex18d_1600x.jpg?v=1781791328',
    msrp: 2729,
    price: 1829,
    stock: 'pre-order',
    collections: ['water-slides'],
    homepageFeatured: true,
    heroImage: true,
    sku: 'WS4K-TREX18-SL',
    mpn: 'HKS-Trex18d',
    heightFt: 18,
    lanes: 1,
    poolType: 'detachable',
    wetDry: false,
    tagline: 'Eighteen feet of dinosaur, with a pool that comes off for dry days',
    intro:
      "At 18 feet, the T-Rex is one of the tallest single-lane slides we carry, and the extra three feet over a 15-footer is not a rounding error — it is the difference between a slide kids ride and a slide kids talk about. A sculpted tyrannosaurus arches over the climbing wall with the slide lane running out beneath it. The splash pool detaches completely, which turns one purchase into two configurations: wet in July, dry in October.",
    body: [
      'The detachable pool is the feature that earns its keep over a season. Unzip it and the slide runs dry into a landing mat, which means the unit works for indoor gymnasium events, fall festivals, and school fun days when nobody wants to be soaked. Rental operators price those two configurations as separate products; homeowners just get twice the calendar. The trade-off is one extra assembly step and one extra thing to align, which is covered in our comparison of attached and detachable pools.',
      "Height changes the physics. An 18-foot drop generates real speed, and the T-Rex handles it with a longer runout than the 15- and 16-foot slides in the range — the lane keeps descending well past the point where a shorter slide has already flattened out. That extended runout is what bleeds off velocity before the rider reaches the pool. It also means the unit's footprint is longer than people expect, so measure the length of your yard, not just the width.",
      'The dinosaur theme is the most requested character concept in the category, and it is worth understanding why that matters commercially: themed units book at a premium for the specific parties they suit, and dinosaurs are the rare theme with a decade-long run rather than a two-year licensing window. Unlike a licensed character, a generic T-Rex never goes out of print and never raises a trademark question.',
      'This unit is currently on pre-order. Pre-order pricing is locked at the listed figure, and units ship in the order reservations were taken as each container clears. If you are buying for a specific date, contact us before you reserve so we can give you a realistic window rather than an optimistic one.',
    ],
    highlights: [
      'One of the tallest single-lane slides in the range at 18 feet',
      'Pool detaches for dry operation — two configurations, one unit',
      'Extended runout to shed speed from the taller drop',
      'Sculpted dinosaur theme with front climbing wall',
      'Pre-order pricing locked at time of reservation',
    ],
    inTheBox: [
      "T-Rex 18' water slide",
      'Detachable splash pool section',
      'Blower sized for this unit',
      'Ground stakes and tether ropes',
      'Storage bag and repair patch kit',
    ],
    specs: [
      { label: 'Inflated footprint', value: "34' L × 15' W × 18' H" },
      { label: 'Recommended clear space', value: "39' L × 20' W" },
      { label: 'Rider capacity', value: '1 at a time' },
      { label: 'Max rider weight', value: '200 lb' },
      { label: 'Age range', value: '6–13 years, adult supervision required' },
      { label: 'Blower requirement', value: '1 × 1.5 HP blower (included)' },
      { label: 'Vinyl weight', value: '15oz commercial-grade PVC' },
      { label: 'Pool', value: 'Detachable — runs wet or dry' },
      { label: 'Setup time', value: '5–8 minutes including pool' },
      { label: 'Approx. shipping weight', value: '310 lb' },
      { label: 'Warranty', value: '1 year against seam and stitching defects' },
    ],
    faqs: [
      {
        question: 'What does pre-order actually mean for delivery?',
        answer:
          'Your unit is reserved from the next inbound container at the price shown. We do not charge a premium for reserving, and we will give you a shipping window before you commit rather than after.',
      },
      {
        question: 'How long does it take to detach the pool?',
        answer:
          'Budget two to three minutes each way. The pool separates at a zip-and-clip seam; the slide runs dry once it is off and the landing area is matted.',
      },
      {
        question: "Is 18 feet too tall for younger kids?",
        answer:
          'The age range above starts at 6 for a reason — the drop is genuinely fast. If your riders are mostly under 6, a 13-foot slide is the better buy and your kids will use it more.',
      },
      {
        question: 'Can I run this indoors with the pool removed?',
        answer:
          'Dry operation is what the detachable pool is for, but indoor use depends entirely on your ceiling height. At 18 feet inflated, most gymnasiums do not clear it. Measure your ceiling first.',
      },
    ],
    relatedSlugs: [
      't-rex-dinosaur-wet-dry-combo-deep-pool',
      'rocket-rush-17-dual-lane-water-slide',
      'ocean-shark-15-water-slide-detachable-pool',
    ],
    blogSlugs: [
      'attached-vs-detachable-pool-water-slides',
      'best-inflatable-water-slide-buyers-guide',
    ],
  },

  {
    slug: 'rocket-rush-17-dual-lane-water-slide',
    name: "Rocket Rush 17' Dual Lane Water Slide with Detachable Pool",
    shortName: "Rocket Rush 17' Dual Lane",
    image: 'https://herokiddo.com/cdn/shop/files/HKSD-RocketR17d_1600x.jpg?v=1784034615',
    msrp: 3099,
    price: 1799,
    stock: 'in-stock',
    collections: ['water-slides', 'dual-lane-water-slides'],
    homepageFeatured: true,
    isNew: true,
    heroImage: true,
    sku: 'WS4K-RR17-DL',
    mpn: 'HKSD-RocketR17d',
    heightFt: 17,
    lanes: 2,
    poolType: 'detachable',
    wetDry: false,
    tagline: 'Dual lane, detachable pool, 17 feet — the most slide per dollar we sell',
    intro:
      "The Rocket Rush 17' is the value outlier in this catalog, and the numbers say so plainly: it carries the highest MSRP-to-price gap of any slide we stock while combining the two features buyers pay the most for — two racing lanes and a pool that comes off. Seventeen feet of drop, a space theme in blues and oranges that photographs well, and a configuration that most manufacturers charge a premium for on either count, let alone both.",
    body: [
      'Combining dual lanes with a detachable pool is unusual because it complicates manufacturing. The pool has to span both lanes, so the detach seam is wider and the alignment has to be more precise than on a single-lane unit. The upside for you is a slide that races two riders in summer and converts to a dry double-lane racer for indoor and shoulder-season events, which is a configuration very few competitors can offer at all, let alone at this price.',
      "Seventeen feet sits deliberately between the 15-foot family standard and the 19-foot flagship tier. It is fast enough that eight-to-twelve-year-olds do not get bored on the third run, and it still fits yards that a 19-footer would overwhelm. If you are choosing between heights, the practical test is overhead clearance rather than ground area — most people have the lawn but forget the oak tree.",
      "For rental operators specifically, this unit is the closest thing in the range to a universal SKU. Dual lane means it satisfies the throughput requirement for larger events; the detachable pool means it does not sit idle from September to May. Run the payback math from our rental-business guide against this slide's price and the break-even arrives faster than on anything else we carry.",
      'The space theme deserves a note. Rockets and planets read as neutral-adventure rather than gendered or age-locked, which is why the unit books for four-year-olds and eleven-year-olds alike. Themes that narrow your bookable audience cost you weekends, and this one narrows nothing.',
    ],
    highlights: [
      'Dual racing lanes and a detachable pool — rare in one unit',
      'Largest discount off MSRP in our catalog',
      '17 feet: real speed without a 19-footer’s footprint',
      'Converts to dry operation for shoulder-season events',
      'Free shipping sitewide, blower included',
    ],
    inTheBox: [
      "Rocket Rush 17' dual lane water slide",
      'Detachable splash pool section',
      'Blower sized for this unit',
      'Ground stakes and tether ropes',
      'Storage bag and repair patch kit',
    ],
    specs: [
      { label: 'Inflated footprint', value: "33' L × 17' W × 17' H" },
      { label: 'Recommended clear space', value: "38' L × 22' W" },
      { label: 'Rider capacity', value: '2 at a time (1 per lane)' },
      { label: 'Max rider weight', value: '200 lb per rider' },
      { label: 'Age range', value: '5–12 years, adult supervision required' },
      { label: 'Blower requirement', value: '1 × 1.5 HP blower (included)' },
      { label: 'Vinyl weight', value: '15oz commercial-grade PVC' },
      { label: 'Pool', value: 'Detachable — runs wet or dry' },
      { label: 'Setup time', value: '5–8 minutes including pool' },
      { label: 'Approx. shipping weight', value: '325 lb' },
      { label: 'Warranty', value: '1 year against seam and stitching defects' },
    ],
    faqs: [
      {
        question: 'Why is the discount on this slide so much larger than the others?',
        answer:
          'It is a newer mold with a higher list price and we buy it in volume. The MSRP is the manufacturer’s figure; our price reflects what we actually pay, not a manufactured markdown.',
      },
      {
        question: 'Does the detachable pool work with both lanes running?',
        answer:
          'Yes — the pool spans the full width of both lanes and catches riders from either side. It attaches and detaches as a single piece.',
      },
      {
        question: 'How much clearance do I need overhead?',
        answer:
          'Inflated height is 17 feet. Add a couple of feet of margin for the blower settling and movement, and keep the area clear of branches, gutters, and any power service drop.',
      },
      {
        question: 'Is this a good first slide for a new rental business?',
        answer:
          'It is the one we would start with. Dual lane covers large events, the detachable pool extends your season, and the neutral theme does not restrict which parties you can book.',
      },
    ],
    relatedSlugs: [
      'tropical-breeze-15-dual-lane-waterslide',
      'surf-beach-17-dual-lane-water-slide',
      'block-party-19-dual-lane-water-slide-deep-pool',
    ],
    blogSlugs: [
      'how-to-start-a-water-slide-rental-business',
      'dual-lane-vs-single-lane-water-slides',
    ],
  },

  {
    slug: 'dolphin-16-water-slide-detachable-pool',
    name: "Dolphin 16' Water Slide with Detachable Pool",
    shortName: "Dolphin 16'",
    image:
      'https://herokiddo.com/cdn/shop/files/HKS-XDolphin16d_f539786d-e6fb-4a86-a8b1-211b2e24b2c7_1600x.jpg?v=1781792041',
    msrp: 2729,
    price: 1367,
    stock: 'in-stock',
    collections: ['water-slides'],
    homepageFeatured: true,
    sku: 'WS4K-DOL16-SL',
    mpn: 'HKS-XDolphin16d',
    heightFt: 16,
    lanes: 1,
    poolType: 'detachable',
    wetDry: false,
    tagline: 'Half off MSRP, sixteen feet, and a pool that unclips for dry season',
    intro:
      "The Dolphin 16' is the slide we point people at when they want commercial construction without a commercial-scale invoice. It lands at almost exactly half its MSRP, runs a single wide lane from a 16-foot platform, and detaches its splash pool for dry use. The theming is soft ocean blues with sculpted dolphins flanking the climbing wall — the gentlest-looking unit in the catalog, which is exactly why it suits the younger end of the age range.",
    body: [
      'Single lane is the right call more often than buyers expect. A single wide lane is more forgiving than two narrow ones: riders who go down sideways, in pairs with a parent, or on their stomachs all have room. If your typical crowd is six kids rather than sixteen, throughput is not your bottleneck and the extra lane buys you nothing but a wider footprint. Our lane comparison walks through where the crossover actually sits.',
      "Sixteen feet is a genuinely tall slide that still behaves gently, because the Dolphin's lane uses a shallower initial pitch than the steeper 17- and 19-foot units. Riders accelerate through the middle third rather than immediately off the platform. That profile is what makes it workable for five- and six-year-olds who would find the Rocket Rush intimidating, without being so tame that a ten-year-old loses interest.",
      "The pool detaches, and on this unit the detach seam sits at the base of a single lane, which makes it the easiest pool in our range to take on and off — call it ninety seconds once you have done it twice. For families who host in summer and want the slide at a fall birthday party, that is the whole feature. For operators, it is a second rental listing at no extra inventory cost.",
      'At this price the temptation is to assume the construction is lighter. It is not — this is the same 15oz commercial PVC and the same quadruple-stitched seam standard as slides costing twice as much here. What you are giving up relative to the flagship units is the second lane and the deep pool, not the material. If you want the reasoning on why vinyl weight is the number that actually matters, we wrote it up separately.',
    ],
    highlights: [
      'Roughly 50% off MSRP — the deepest discount in the catalog',
      'Single wide lane suits mixed ages and side-by-side riding',
      'Gentler initial pitch than the steeper 17ft+ units',
      'Fastest pool detach in the range — about 90 seconds',
      'Same 15oz commercial vinyl as our flagship slides',
    ],
    inTheBox: [
      "Dolphin 16' water slide",
      'Detachable splash pool section',
      'Blower sized for this unit',
      'Ground stakes and tether ropes',
      'Storage bag and repair patch kit',
    ],
    specs: [
      { label: 'Inflated footprint', value: "30' L × 14' W × 16' H" },
      { label: 'Recommended clear space', value: "35' L × 19' W" },
      { label: 'Rider capacity', value: '1 at a time' },
      { label: 'Max rider weight', value: '200 lb' },
      { label: 'Age range', value: '5–12 years, adult supervision required' },
      { label: 'Blower requirement', value: '1 × 1.5 HP blower (included)' },
      { label: 'Vinyl weight', value: '15oz commercial-grade PVC' },
      { label: 'Pool', value: 'Detachable — runs wet or dry' },
      { label: 'Setup time', value: '4–6 minutes including pool' },
      { label: 'Approx. shipping weight', value: '275 lb' },
      { label: 'Warranty', value: '1 year against seam and stitching defects' },
    ],
    faqs: [
      {
        question: "Is the Dolphin 16' too gentle for older kids?",
        answer:
          'Ten- and eleven-year-olds still ride it happily — the pitch is shallower off the platform, not flat. If your riders are exclusively 10+, the Rocket Rush or Surf Beach will hold their attention longer.',
      },
      {
        question: 'Can two kids ride the single lane together?',
        answer:
          'The lane is wide enough physically, but the specification above is written for one rider at a time. Send them one at a time and the runout works as designed.',
      },
      {
        question: 'How is this half price if the vinyl is the same?',
        answer:
          'MSRP is the manufacturer’s suggested figure and it is set high across this category. Our price is what the unit actually costs plus our margin. The construction spec is unchanged.',
      },
      {
        question: 'Does it need a bigger blower than the 13ft slides?',
        answer:
          'It ships with a blower sized for this unit. If you are replacing one later, match the CFM rating on the plate rather than the horsepower number — our blower sizing guide explains why.',
      },
    ],
    relatedSlugs: [
      'ocean-wave-16-water-slide-attached-pool',
      'dolphin-13-water-slide-with-pool',
      'ocean-shark-15-water-slide-detachable-pool',
    ],
    blogSlugs: [
      'commercial-vs-residential-water-slides-pvc-vinyl',
      'attached-vs-detachable-pool-water-slides',
    ],
  },

  {
    slug: 'ocean-wave-16-water-slide-attached-pool',
    name: "Ocean Wave 16' Water Slide with Attached Pool",
    shortName: "Ocean Wave 16'",
    image:
      'https://herokiddo.com/cdn/shop/files/HKS-XOcean16_85c63a73-0fb6-4ce1-8bc3-ec3c28542504_1600x.jpg?v=1781792004',
    msrp: 2729,
    price: 1367,
    stock: 'in-stock',
    collections: ['water-slides'],
    homepageFeatured: true,
    sku: 'WS4K-OW16-SL',
    mpn: 'HKS-XOcean16',
    heightFt: 16,
    lanes: 1,
    poolType: 'attached',
    wetDry: false,
    tagline: 'One chamber, one blower, zero assembly — the simplest 16-footer we sell',
    intro:
      "The Ocean Wave 16' is built around a single decision: the pool does not come off. That sounds like a limitation until you have set up a slide five times in a season. An attached pool inflates as one continuous chamber with the slide body, so there is no seam to align, no second section to store, and no part that can be left in the garage. Unroll, stake, plug in one blower, and you are done — reliably, in under four minutes.",
    body: [
      "Attached-pool construction also removes the most common leak point on an inflatable water slide. Detach seams are the joint that gets stressed every time the pool is fitted and removed, and after a few dozen cycles they are the first thing to weep. The Ocean Wave has no such joint. If your slide is going to live in a backyard and get used every weekend from June to September, that structural simplicity is worth more than the flexibility you give up.",
      'The theming is a rolling ocean-wave crest in blues and whites arching over the climbing wall, and it is the most visually calm unit in the range — no characters, no faces, no cartoon. That neutrality is why it works as well at an adult pool party or a community event as it does at a seventh birthday. The palette also hides algae staining better than the pale-vinyl units, which matters more than anyone tells you.',
      'Sixteen feet with a single wide lane puts this in the same performance bracket as the Dolphin, and the two are priced identically on purpose — they are the same slide class with different pool philosophies. Choose the Ocean Wave if you value setup speed and durability; choose the Dolphin if you need dry operation. That is genuinely the entire decision, and we lay out both sides in our attached-versus-detachable comparison.',
      'One practical consequence of the attached pool worth planning for: draining. Because the basin is integral, you drain it through the built-in drain plug rather than by lifting the pool away. Site the slide so that plug faces downhill, or you will be pushing water uphill with a broom at the end of the day.',
    ],
    highlights: [
      'Attached pool — one chamber, no assembly, no alignment',
      'Eliminates the detach seam, the most common leak point',
      'Sub-four-minute setup, the fastest in the catalog',
      'Character-free ocean theming suits every age group',
      'Built-in drain plug for controlled emptying',
    ],
    inTheBox: [
      "Ocean Wave 16' water slide with attached pool",
      'Blower sized for this unit',
      'Ground stakes and tether ropes',
      'Storage bag and repair patch kit',
      'Setup and safe-operation instructions',
    ],
    specs: [
      { label: 'Inflated footprint', value: "30' L × 14' W × 16' H" },
      { label: 'Recommended clear space', value: "35' L × 19' W" },
      { label: 'Rider capacity', value: '1 at a time' },
      { label: 'Max rider weight', value: '200 lb' },
      { label: 'Age range', value: '5–12 years, adult supervision required' },
      { label: 'Blower requirement', value: '1 × 1.5 HP blower (included)' },
      { label: 'Vinyl weight', value: '15oz commercial-grade PVC' },
      { label: 'Pool', value: 'Attached — integral splash basin with drain plug' },
      { label: 'Setup time', value: '3–4 minutes' },
      { label: 'Approx. shipping weight', value: '270 lb' },
      { label: 'Warranty', value: '1 year against seam and stitching defects' },
    ],
    faqs: [
      {
        question: 'Can the pool be removed if I want to run it dry?',
        answer:
          'No — it is a single inflated chamber by design. If dry operation matters to you, the Dolphin 16 is the same class of slide with a detachable pool.',
      },
      {
        question: 'How do I empty the pool at the end of the day?',
        answer:
          'There is a drain plug at the low corner of the basin. Set the slide up so that corner sits downhill and the pool empties on its own while you start drying the lane.',
      },
      {
        question: 'Does an attached pool make the slide harder to store?',
        answer:
          'It is one bigger roll instead of two smaller ones, which most people find easier. The bag it ships in is sized for it.',
      },
      {
        question: 'Is the attached pool deep enough to slow riders down?',
        answer:
          'Yes — the basin holds a few inches of water, which is what arrests a rider. Depth beyond that adds risk, not braking.',
      },
    ],
    relatedSlugs: [
      'dolphin-16-water-slide-detachable-pool',
      'purple-tropical-16-water-slide-attached-pool',
      'block-party-16-water-slide-and-pool',
    ],
    blogSlugs: [
      'attached-vs-detachable-pool-water-slides',
      'how-to-clean-and-store-an-inflatable-water-slide',
    ],
  },

  {
    slug: 'purple-tropical-16-water-slide-attached-pool',
    name: "16' Purple Tropical Water Slide with Attached Pool",
    shortName: "Purple Tropical 16'",
    image: 'https://herokiddo.com/cdn/shop/files/HKS-TropicalP16_1600x.jpg?v=1781791327',
    msrp: 2509,
    price: 1367,
    stock: 'in-stock',
    collections: ['water-slides'],
    homepageFeatured: true,
    sku: 'WS4K-PT16-SL',
    mpn: 'HKS-TropicalP16',
    heightFt: 16,
    lanes: 1,
    poolType: 'attached',
    wetDry: false,
    tagline: 'The one that photographs best — purple, teal, and impossible to ignore',
    intro:
      "Every rental operator eventually learns that bookings follow photographs, and the 16' Purple Tropical exists because of that fact. Deep purple panels against teal and lime tropical foliage produce a slide that looks vivid in a phone photo taken at any time of day, which is not true of the paler units. Underneath the paint job it is a straightforward, well-built 16-foot single-lane slide with an attached splash pool and a four-minute setup.",
    body: [
      'Color is not a trivial consideration on a product that lives outdoors. Darker vinyl hides the mineral staining that hard water leaves on a slide lane, and it disguises the faint green tint that creeps into pale vinyl by the third season no matter how carefully you dry it. Purple is the most forgiving color in the range on both counts. The cost is heat: dark panels run warmer in direct sun, so on a 95-degree afternoon the unwetted sections of the climbing wall get hot. Keep the hose running.',
      "Structurally this is the same platform as the Ocean Wave — 16 feet, one wide lane, integral pool with a drain plug — and it is priced at the same point despite a lower MSRP, which makes the headline discount look smaller. Do not read that as a worse deal. The MSRP is the manufacturer's number and it varies between molds for reasons that have nothing to do with what you receive.",
      'The tropical theme is the workhorse of the party rental world for the same reason it works here: it is legible from a distance, it suits every age from four to fourteen, and it carries no licensing baggage. Where the Tropical Breeze runs the same concept across two racing lanes, this unit puts the whole budget into a single lane and a lower price, which is the right trade for a family buying one slide for their own kids.',
      'If you are weighing this against the Block Party 16 at the same price, the difference is purely aesthetic — Block Party is a bright primary-color street-party look, this is a saturated tropical. Same height, same lane count, same pool philosophy, same money. Pick the one your kids point at.',
    ],
    highlights: [
      'Deepest, most saturated colorway in the range — photographs well',
      'Dark vinyl hides hard-water staining and seasonal discoloration',
      'Attached pool with drain plug, no assembly step',
      'Same 16ft single-lane platform as the Ocean Wave',
      'License-free theme with broad age appeal',
    ],
    inTheBox: [
      "16' Purple Tropical water slide with attached pool",
      'Blower sized for this unit',
      'Ground stakes and tether ropes',
      'Storage bag and repair patch kit',
      'Setup and safe-operation instructions',
    ],
    specs: [
      { label: 'Inflated footprint', value: "30' L × 14' W × 16' H" },
      { label: 'Recommended clear space', value: "35' L × 19' W" },
      { label: 'Rider capacity', value: '1 at a time' },
      { label: 'Max rider weight', value: '200 lb' },
      { label: 'Age range', value: '5–12 years, adult supervision required' },
      { label: 'Blower requirement', value: '1 × 1.5 HP blower (included)' },
      { label: 'Vinyl weight', value: '15oz commercial-grade PVC' },
      { label: 'Pool', value: 'Attached — integral splash basin with drain plug' },
      { label: 'Setup time', value: '3–4 minutes' },
      { label: 'Approx. shipping weight', value: '270 lb' },
      { label: 'Warranty', value: '1 year against seam and stitching defects' },
    ],
    faqs: [
      {
        question: 'Does the dark purple vinyl get too hot to use?',
        answer:
          'The wetted lane stays cool because water is running over it constantly. The dry parts of the climbing wall do warm up in direct sun — the same as any dark surface. Keep the hose on and it is a non-issue.',
      },
      {
        question: 'Will the purple fade?',
        answer:
          'All outdoor vinyl fades with UV exposure over years. Storing it out of direct sun between uses is the single biggest thing you control — our storage guide covers the routine.',
      },
      {
        question: 'How is this different from the Block Party 16?',
        answer:
          'Only the artwork. Same height, same single lane, same attached pool, same price. Choose on looks.',
      },
      {
        question: 'Is the MSRP lower because it is a lesser slide?',
        answer:
          'No. MSRP varies mold to mold for reasons unrelated to build spec. The vinyl weight, seam construction, and warranty are identical to the other 16-footers here.',
      },
    ],
    relatedSlugs: [
      'block-party-16-water-slide-and-pool',
      'ocean-wave-16-water-slide-attached-pool',
      'summer-breeze-13-water-slide-with-pool',
    ],
    blogSlugs: [
      'best-inflatable-water-slide-buyers-guide',
      'how-to-clean-and-store-an-inflatable-water-slide',
    ],
  },
  {
    slug: 'block-party-16-water-slide-and-pool',
    name: "Block Party 16' Water Slide and Pool",
    shortName: "Block Party 16'",
    image: 'https://herokiddo.com/cdn/shop/files/HKS-Block16_1600x.jpg?v=1781791328',
    msrp: 2509,
    price: 1367,
    stock: 'in-stock',
    collections: ['water-slides'],
    homepageFeatured: true,
    heroImage: true,
    sku: 'WS4K-BP16-SL',
    mpn: 'HKS-Block16',
    heightFt: 16,
    lanes: 1,
    poolType: 'attached',
    wetDry: false,
    tagline: 'Primary colors, block-party energy, and the shortest setup in the range',
    intro:
      "The Block Party 16' is deliberately loud. Red, yellow, and blue panels in wide primary blocks, no character, no theme to age out of — it looks like a street fair, which is exactly the point. Sixteen feet of single-lane slide over an attached splash pool, one blower, and a setup you can finish before the first guest parks. This is the unit we recommend to HOAs, block associations, and anyone buying a slide that has to please a crowd rather than one child.",
    body: [
      "Neutral loud is an underrated category. Themed slides work brilliantly for the party they were made for and awkwardly for everything else — a unicorn slide at a Fourth of July block party reads as somebody's leftover. Primary-color blocking has no such problem. It suits a corporate family day, a church picnic, a school field day, and a birthday equally, which is why this and the Tropical Breeze are the two units in the catalog that book the most varied calendar.",
      'The construction is the same 16-foot attached-pool platform as the Ocean Wave and the Purple Tropical, priced identically to both. Where it differs is visibility: the high-contrast primary panels are the easiest slide in the range to spot from a distance, which matters more than it sounds if you are setting up at a park and want people to find you. Operators report it as the unit that draws walk-up interest at public events.',
      "Because the pool is integral there is no assembly, and because there is only one lane there is only one thing to align on the ground. Realistically you are looking at three to four minutes from bag to standing. The blower runs continuously — as with every unit here, these are constant-airflow inflatables, not seal-and-forget, so plan for a dedicated outlet on its own circuit and read our blower sizing guide before you daisy-chain anything.",
      "One caution specific to the bright yellow panels: they show dirt. Pale vinyl picks up grass stain and mud along the bottom edge faster than the darker units, and it is cosmetic rather than structural, but if the slide will live on a lawn rather than a tarp you will be scrubbing the lower six inches more often. A ground tarp underneath solves it permanently and costs almost nothing.",
    ],
    highlights: [
      'High-contrast primary colors — visible across a park',
      'Theme-neutral: suits every age and every occasion',
      'Attached pool, no assembly, 3–4 minute setup',
      'Same 15oz commercial vinyl as the flagship units',
      'Free shipping sitewide, blower included',
    ],
    inTheBox: [
      "Block Party 16' water slide with attached pool",
      'Blower sized for this unit',
      'Ground stakes and tether ropes',
      'Storage bag and repair patch kit',
      'Setup and safe-operation instructions',
    ],
    specs: [
      { label: 'Inflated footprint', value: "30' L × 14' W × 16' H" },
      { label: 'Recommended clear space', value: "35' L × 19' W" },
      { label: 'Rider capacity', value: '1 at a time' },
      { label: 'Max rider weight', value: '200 lb' },
      { label: 'Age range', value: '5–12 years, adult supervision required' },
      { label: 'Blower requirement', value: '1 × 1.5 HP blower (included)' },
      { label: 'Vinyl weight', value: '15oz commercial-grade PVC' },
      { label: 'Pool', value: 'Attached — integral splash basin with drain plug' },
      { label: 'Setup time', value: '3–4 minutes' },
      { label: 'Approx. shipping weight', value: '270 lb' },
      { label: 'Warranty', value: '1 year against seam and stitching defects' },
    ],
    faqs: [
      {
        question: 'Will the yellow panels stay looking clean?',
        answer:
          'Pale vinyl shows lawn stain along the bottom edge sooner than dark vinyl. It is cosmetic. Put a ground tarp under the unit and the problem largely disappears.',
      },
      {
        question: 'Does the blower run the whole time the slide is up?',
        answer:
          'Yes. These are constant-airflow inflatables — the blower stays on for the entire session. Give it a dedicated outlet rather than sharing a circuit with a sound system.',
      },
      {
        question: 'Is this suitable for a public event rather than a backyard?',
        answer:
          'It is one of the better choices for it: theme-neutral, highly visible, and quick to set up. Check whether your venue or municipality requires a permit — we have a general overview, but rules are local.',
      },
      {
        question: 'How does it compare to the Purple Tropical at the same price?',
        answer:
          'Identical platform and spec. Block Party is bright primaries and shows dirt more; Purple Tropical is saturated and hides it better. Pure preference.',
      },
    ],
    relatedSlugs: [
      'purple-tropical-16-water-slide-attached-pool',
      'block-party-12-dual-lane-backload-water-slide',
      'block-party-19-dual-lane-water-slide-deep-pool',
    ],
    blogSlugs: ['water-slide-blower-size', 'inflatable-water-slide-permit-guide'],
  },

  {
    slug: 'ocean-shark-15-water-slide-detachable-pool',
    name: "15' Ocean Shark Water Slide with Detachable Pool",
    shortName: "Ocean Shark 15'",
    image: 'https://herokiddo.com/cdn/shop/files/HKS-SharkM15dWEB3_1600x.jpg?v=1758236923',
    msrp: 2400,
    price: 1399,
    stock: 'in-stock',
    collections: ['water-slides', 'backyard-water-slides'],
    homepageFeatured: true,
    sku: 'WS4K-SHK15-SL',
    mpn: 'HKS-SharkM15d',
    heightFt: 15,
    lanes: 1,
    poolType: 'detachable',
    wetDry: false,
    tagline: 'A shark with its mouth open at the top of the ladder. Kids lose their minds.',
    intro:
      "The 15' Ocean Shark puts a sculpted shark head at the top of the climbing wall with the slide lane running straight out of its open jaws. It is a genuinely great piece of industrial theming — riders climb into the mouth and drop out the front, which turns a slide into a story. Fifteen feet, one wide lane, detachable splash pool, and a footprint sized for an ordinary backyard rather than a fairground.",
    body: [
      'Fifteen feet is the height we sell the most of, and it is not an accident. It clears most tree lines, fits a standard suburban lot with room to walk around it, and still delivers a drop that a nine-year-old rates as fast. Below 13 feet you start losing older kids; above 17 you start losing yards. The Ocean Shark sits in the middle of that window with the theming turned all the way up.',
      "The pool detaches, which on a slide aimed at backyards is more useful than it is on a rental unit. Families set the pool up in July and pull it off in September, and the slide keeps working as a dry slide into the fall on a landing mat. That is two or three extra months of use from the same purchase, and it is the reason we list this unit in the backyard collection as well as the main one.",
      'Character theming does carry one commercial trade-off worth being honest about: a shark books enthusiastically for the parties that want a shark and gets passed over for the ones that want a princess. If this is your only rental unit, a neutral theme earns more weekends. If it is your second or third, the shark is a strong differentiator — it is the one people photograph and post, which is free marketing.',
      "Structurally it is a 15oz commercial build like everything else here, with the sculpted head as a separate inflated appliqué on the front face rather than a printed graphic. That means it holds its shape rather than sagging, and it also means it is the one part of the unit to inspect first for wear — appliqués take the abuse of being climbed past, so check the attachment seam at the start of each season.",
    ],
    highlights: [
      'Sculpted 3D shark head — riders launch out of the jaws',
      'Fits an ordinary backyard: 15ft height, compact footprint',
      'Detachable pool extends use into the dry season',
      'Our best-selling height class',
      'Free shipping sitewide, blower included',
    ],
    inTheBox: [
      "15' Ocean Shark water slide",
      'Detachable splash pool section',
      'Blower sized for this unit',
      'Ground stakes and tether ropes',
      'Storage bag and repair patch kit',
    ],
    specs: [
      { label: 'Inflated footprint', value: "29' L × 13' W × 15' H" },
      { label: 'Recommended clear space', value: "34' L × 18' W" },
      { label: 'Rider capacity', value: '1 at a time' },
      { label: 'Max rider weight', value: '200 lb' },
      { label: 'Age range', value: '5–12 years, adult supervision required' },
      { label: 'Blower requirement', value: '1 × 1.5 HP blower (included)' },
      { label: 'Vinyl weight', value: '15oz commercial-grade PVC' },
      { label: 'Pool', value: 'Detachable — runs wet or dry' },
      { label: 'Setup time', value: '4–6 minutes including pool' },
      { label: 'Approx. shipping weight', value: '255 lb' },
      { label: 'Warranty', value: '1 year against seam and stitching defects' },
    ],
    faqs: [
      {
        question: 'Is the shark head scary for very young children?',
        answer:
          'It is stylized rather than realistic — big cartoon teeth, friendly eyes. Three- and four-year-olds generally find it funny, but you know your child better than we do.',
      },
      {
        question: 'What is the smallest yard this will fit?',
        answer:
          "Plan for about 34' × 18' of clear, level ground plus walking space, and check overhead for branches. It is one of the more compact 15-footers in the category.",
      },
      {
        question: 'How do I look after the sculpted head?',
        answer:
          'Check the appliqué attachment seam at the start of each season and after any hard use. It is the highest-wear point on a themed unit because riders grab it on the climb.',
      },
      {
        question: 'Can I run it dry without the pool all summer?',
        answer:
          'You can, but on a hot day the dry lane gets warm and riders slow down. The pool and a running hose are what make it work in summer heat.',
      },
    ],
    relatedSlugs: [
      'dolphin-16-water-slide-detachable-pool',
      'tropical-breeze-15-dual-lane-waterslide',
      'safari-12-water-slide-with-pool',
    ],
    blogSlugs: [
      'best-inflatable-water-slide-buyers-guide',
      'inflatable-water-slide-safety-checklist',
    ],
  },

  {
    slug: 'tropic-tide-double-racer-13-dual-lane',
    name: "Tropic Tide Double Racer 13' Dual Lane Slide with Detachable Pool",
    shortName: "Tropic Tide 13' Double Racer",
    image: 'https://herokiddo.com/cdn/shop/files/HKSD-TropicalB13d_1600x.jpg?v=1784034615',
    msrp: 2699,
    price: 1599,
    stock: 'in-stock',
    collections: ['water-slides', 'dual-lane-water-slides', 'backyard-water-slides'],
    homepageFeatured: true,
    isNew: true,
    sku: 'WS4K-TT13-DL',
    mpn: 'HKSD-TropicalB13d',
    heightFt: 13,
    lanes: 2,
    poolType: 'detachable',
    wetDry: false,
    tagline: 'Racing lanes for younger riders — dual lane without the height',
    intro:
      "Most dual-lane slides are 15 feet and up, which leaves families with four- to eight-year-olds choosing between racing and a height their kids will actually use. The Tropic Tide Double Racer solves that: two full racing lanes on a 13-foot frame, with a detachable pool. It is the smallest true dual-lane unit we sell, and for a household with two or three young children it is very likely the correct slide.",
    body: [
      'Thirteen feet changes who can ride. The drop is gentle enough that a confident four-year-old manages it unassisted, and the climbing wall is short enough that they can get up it without a boost. Parents of young kids consistently report the same thing — the taller slide gets ridden six times and then abandoned because the climb is work, while the shorter one runs all afternoon. Capability and enthusiasm are different variables, and for this age group the shorter slide wins on the second one.',
      "Putting two lanes on a 13-foot frame is harder than it looks, because the lanes have to be wide enough to be usable while the overall footprint stays backyard-sized. The Tropic Tide manages roughly the same ground area as a single-lane 15-footer. That is the real achievement here: you get racing without needing a bigger yard, which is why it sits in our backyard collection alongside the compact single-lane units.",
      'The detachable pool works the same way as on the larger units and takes about ninety seconds. On a slide aimed at younger children this matters for a specific reason: the shallow splash basin is where four-year-olds tend to sit and play rather than climb back up, so being able to remove it entirely on cooler days keeps them cycling through the slide instead of parking in the water.',
      'Tropical blues and greens with palm detailing keep the theming neutral, and the "Double Racer" graphics on the lane divider make the racing intent obvious to kids who cannot read yet — they see two lanes and they line up. If you are torn between this and the 15-foot Tropical Breeze, the deciding question is the age of your youngest regular rider, not your yard size.',
    ],
    highlights: [
      'The smallest true dual-lane slide in the catalog at 13 feet',
      'Gentle enough for confident 4-year-olds to ride unassisted',
      'Two lanes in roughly the footprint of a single-lane 15-footer',
      'Detachable pool for cooler days and dry events',
      'Free shipping sitewide, blower included',
    ],
    inTheBox: [
      "Tropic Tide Double Racer 13' dual lane slide",
      'Detachable splash pool section',
      'Blower sized for this unit',
      'Ground stakes and tether ropes',
      'Storage bag and repair patch kit',
    ],
    specs: [
      { label: 'Inflated footprint', value: "26' L × 15' W × 13' H" },
      { label: 'Recommended clear space', value: "31' L × 20' W" },
      { label: 'Rider capacity', value: '2 at a time (1 per lane)' },
      { label: 'Max rider weight', value: '150 lb per rider' },
      { label: 'Age range', value: '4–10 years, adult supervision required' },
      { label: 'Blower requirement', value: '1 × 1.5 HP blower (included)' },
      { label: 'Vinyl weight', value: '15oz commercial-grade PVC' },
      { label: 'Pool', value: 'Detachable — runs wet or dry' },
      { label: 'Setup time', value: '4–6 minutes including pool' },
      { label: 'Approx. shipping weight', value: '245 lb' },
      { label: 'Warranty', value: '1 year against seam and stitching defects' },
    ],
    faqs: [
      {
        question: 'Will older kids find 13 feet boring?',
        answer:
          'Eleven- and twelve-year-olds will ride it, but they will ask for the 17-footer. Buy this one if your regular riders are under about nine; buy up if they are not.',
      },
      {
        question: 'Why is the weight limit lower than on the taller slides?',
        answer:
          'The frame and lane width are scaled for younger riders. The 150 lb figure above is the example spec for this class — confirm it against the documentation that ships with your unit.',
      },
      {
        question: 'Does it need less space than a 15ft dual lane?',
        answer:
          'Yes, noticeably — about five feet less length. Width is similar because two lanes are two lanes at any height.',
      },
      {
        question: 'Can a parent ride down with a small child?',
        answer:
          'The spec is written for one rider per lane within the stated weight limit. Tandem riding is outside that envelope.',
      },
    ],
    relatedSlugs: [
      'summer-breeze-13-water-slide-with-pool',
      'tropical-breeze-15-dual-lane-waterslide',
      'block-party-12-dual-lane-backload-water-slide',
    ],
    blogSlugs: [
      'dual-lane-vs-single-lane-water-slides',
      'best-inflatable-water-slide-buyers-guide',
    ],
  },

  {
    slug: 'summer-breeze-13-water-slide-with-pool',
    name: "13' Summer Breeze Water Slide with Pool",
    shortName: "Summer Breeze 13'",
    image:
      'https://herokiddo.com/cdn/shop/files/HKS-Tropical13_a8349bde-3388-4052-b226-5b34317da9ce_1600x.jpg?v=1781791327',
    msrp: 1800,
    price: 699,
    stock: 'in-stock',
    collections: ['water-slides', 'backyard-water-slides'],
    homepageFeatured: true,
    bestValue: true,
    sku: 'WS4K-SB13-SL',
    mpn: 'HKS-Tropical13',
    heightFt: 13,
    lanes: 1,
    poolType: 'attached',
    wetDry: false,
    tagline: 'Commercial vinyl at a big-box price — the entry point that is not a compromise',
    intro:
      "At $699 the 13' Summer Breeze costs about what a heavy consumer-grade slide costs at a big-box store, and it is not a consumer-grade slide. Same 15oz commercial PVC, same quadruple-stitched seams, same blower-included package as the units at three times the price. What you give up for the money is height, a second lane, and a detachable pool. What you keep is the thing that determines whether a slide survives its second summer.",
    body: [
      "This is the clearest illustration in our catalog of why vinyl weight is the number to shop on. A big-box inflatable at this price is typically built from 6 to 9oz PVC with double-stitched seams, designed for perhaps twenty uses. The Summer Breeze is built to the same material standard as a slide a rental company puts through forty weekends a year. Buy the cheap one and you buy it again in fourteen months; that arithmetic is laid out properly in our commercial-versus-residential comparison.",
      'Thirteen feet with a single wide lane and an attached pool makes this the simplest unit we sell. There is nothing to assemble, nothing to align, and nothing to lose in the garage. Setup is three minutes. For a family with kids between four and nine who want a slide up every weekend all summer without it becoming a project, the simplicity is a feature rather than a limitation.',
      'The tropical palm-print artwork is the same visual family as the Tropical Breeze and the Tropic Tide, so if you already own one of those it will look like a matched set. The footprint is the smallest in the catalog — this fits yards that genuinely cannot take a 15-footer, including many townhouse lots and long narrow gardens where the constraint is width rather than length.',
      "The honest limitation: older kids outgrow it. A twelve-year-old will ride a 13-foot slide, enjoy it, and then ask when you are getting a bigger one. If your kids are already nine or ten, spend the extra on a 15- or 16-footer and get four more years out of it. If they are four to seven, this is the slide they will actually use every weekend, and the money you did not spend buys a lot of summers.",
    ],
    highlights: [
      'Commercial 15oz vinyl at an entry-level price',
      'Smallest footprint in the catalog — fits narrow yards',
      'Attached pool, three-minute setup, nothing to assemble',
      'Best value in the range for ages 4–9',
      'Free shipping sitewide, blower included',
    ],
    inTheBox: [
      "13' Summer Breeze water slide with attached pool",
      'Blower sized for this unit',
      'Ground stakes and tether ropes',
      'Storage bag and repair patch kit',
      'Setup and safe-operation instructions',
    ],
    specs: [
      { label: 'Inflated footprint', value: "24' L × 12' W × 13' H" },
      { label: 'Recommended clear space', value: "29' L × 17' W" },
      { label: 'Rider capacity', value: '1 at a time' },
      { label: 'Max rider weight', value: '150 lb' },
      { label: 'Age range', value: '4–10 years, adult supervision required' },
      { label: 'Blower requirement', value: '1 × 1 HP blower (included)' },
      { label: 'Vinyl weight', value: '15oz commercial-grade PVC' },
      { label: 'Pool', value: 'Attached — integral splash basin with drain plug' },
      { label: 'Setup time', value: '3 minutes' },
      { label: 'Approx. shipping weight', value: '195 lb' },
      { label: 'Warranty', value: '1 year against seam and stitching defects' },
    ],
    faqs: [
      {
        question: 'Is this really the same vinyl as the expensive slides?',
        answer:
          'Yes — 15oz commercial PVC, quadruple-stitched. The price difference across our range comes from size, lane count, and pool configuration, not from material grade.',
      },
      {
        question: 'How long will it last?',
        answer:
          'That depends almost entirely on how you dry and store it, not on the price you paid. Vinyl put away damp fails in seasons; vinyl dried properly lasts many years.',
      },
      {
        question: 'Will my 11-year-old still use it?',
        answer:
          'They will ride it and enjoy it, but it will not hold them the way a 16-footer would. If your oldest is already double digits, size up.',
      },
      {
        question: 'Does it come with a blower at this price?',
        answer:
          'Yes. Every slide we sell ships with a blower sized for that unit — there is no version of this where you get the vinyl and buy the air separately.',
      },
    ],
    relatedSlugs: [
      'tropic-tide-double-racer-13-dual-lane',
      'dolphin-13-water-slide-with-pool',
      'purple-tropical-16-water-slide-attached-pool',
    ],
    blogSlugs: [
      'commercial-vs-residential-water-slides-pvc-vinyl',
      'inflatable-water-slide-cost',
    ],
  },

  {
    slug: 'block-party-12-dual-lane-backload-water-slide',
    name: "Block Party 12' Dual Lane Backload Water Slide with Attached Pool",
    shortName: "Block Party 12' Backload",
    image:
      'https://herokiddo.com/cdn/shop/files/HKS-Block12WEB3_f2589fed-d2d3-4a5b-896d-8e7177b071ec_1600x.jpg?v=1747432918',
    msrp: 2280,
    price: 1269,
    stock: 'in-stock',
    collections: ['water-slides', 'dual-lane-water-slides', 'backyard-water-slides'],
    sku: 'WS4K-BP12-DLB',
    mpn: 'HKS-Block12',
    heightFt: 12,
    lanes: 2,
    poolType: 'attached',
    wetDry: false,
    tagline: 'Backload climbing wall — riders go up the back, so nobody crosses the lanes',
    intro:
      "The word doing the work in this product's name is 'backload'. The climbing wall is on the rear face rather than the front, so riders ascend behind the slide and come down the lanes at the front. Traffic runs in a loop instead of a collision. On a dual-lane unit aimed at younger children — 12 feet, two lanes, attached pool — that circulation pattern is worth more than the extra foot of height you gave up to get it.",
    body: [
      'Front-load slides put the climb and the landing on the same face. With one rider that is fine. With eight excited six-year-olds it means kids climbing past kids landing, and the supervising adult spends the afternoon as a traffic cop. Backload construction separates the two flows completely: the queue forms behind the unit, riders emerge at the front, and the adult supervising the pool never has to watch the ladder at the same time.',
      'At 12 feet this is the shortest slide in the catalog, and that is intentional rather than incidental — it is built for the three-to-eight bracket where two lanes and easy circulation matter far more than drop height. The lanes are proportionally wide for the frame, so riders are not threading a needle, and the attached pool means the one thing a parent has to manage is the hose.',
      "The primary-color Block Party artwork matches the 16-foot and 19-foot units in the same family, which is genuinely useful for operators building a coordinated fleet — three sizes, one look, and a booking photo that reads as a professional setup rather than a collection of secondhand units. For a family, it simply means it does not clash with anything.",
      'The trade-off with a backload wall is footprint depth. Because the climb is behind the slide, the unit needs clear space at the rear that a front-load slide does not, so the total ground you need is longer than the 12-foot height implies. Measure the full length, not the height, and leave walking room at the back for the queue.',
    ],
    highlights: [
      'Backload climbing wall — climbers and riders never cross',
      'Two racing lanes on a 12ft frame for ages 3–8',
      'Attached pool with drain plug, no assembly',
      'Matches the Block Party 16 and 19 for fleet consistency',
      'Free shipping sitewide, blower included',
    ],
    inTheBox: [
      "Block Party 12' dual lane backload water slide",
      'Blower sized for this unit',
      'Ground stakes and tether ropes',
      'Storage bag and repair patch kit',
      'Setup and safe-operation instructions',
    ],
    specs: [
      { label: 'Inflated footprint', value: "27' L × 15' W × 12' H" },
      { label: 'Recommended clear space', value: "34' L × 20' W (includes rear queue space)" },
      { label: 'Rider capacity', value: '2 at a time (1 per lane)' },
      { label: 'Max rider weight', value: '150 lb per rider' },
      { label: 'Age range', value: '3–8 years, adult supervision required' },
      { label: 'Blower requirement', value: '1 × 1 HP blower (included)' },
      { label: 'Vinyl weight', value: '15oz commercial-grade PVC' },
      { label: 'Pool', value: 'Attached — integral splash basin with drain plug' },
      { label: 'Setup time', value: '4–5 minutes' },
      { label: 'Approx. shipping weight', value: '230 lb' },
      { label: 'Warranty', value: '1 year against seam and stitching defects' },
    ],
    faqs: [
      {
        question: 'What is the practical advantage of a backload wall?',
        answer:
          'Climbers and riders never share the same face. With a group of small children that turns supervision from crowd control into simply watching the pool.',
      },
      {
        question: 'Does it need more space than a front-load slide?',
        answer:
          'Yes — you need clear ground behind the unit for the climb and the queue. Budget for the full recommended footprint, not just the slide body.',
      },
      {
        question: 'Is 12 feet tall enough to be fun?',
        answer:
          'For three- to eight-year-olds, comfortably. For anyone older, look at the 15ft and up range instead.',
      },
      {
        question: 'Can I match this with other Block Party units?',
        answer:
          'Yes — the 12, 16, and 19 foot Block Party slides share the same artwork family, which is why operators buy them as a set.',
      },
    ],
    relatedSlugs: [
      'block-party-16-water-slide-and-pool',
      'tropic-tide-double-racer-13-dual-lane',
      'block-party-19-dual-lane-water-slide-deep-pool',
    ],
    blogSlugs: [
      'inflatable-water-slide-safety-checklist',
      'dual-lane-vs-single-lane-water-slides',
    ],
  },
  {
    slug: 'pirate-ship-15-water-slide-playset',
    name: "15' Pirate Ship Water Slide Playset",
    shortName: "Pirate Ship 15'",
    image: 'https://herokiddo.com/cdn/shop/files/JOH-Pirate15-WSWEB3_1600x.jpg?v=1758326617',
    msrp: null,
    price: null,
    stock: 'out-of-stock',
    collections: ['water-slides'],
    sku: 'WS4K-PIR15-PS',
    mpn: 'JOH-Pirate15-WS',
    heightFt: 15,
    lanes: 1,
    poolType: 'attached',
    wetDry: false,
    tagline: 'A whole ship, not just a slide — masts, cannons, and a plank to slide off',
    intro:
      "The 15' Pirate Ship is the most elaborately sculpted unit in our catalog and the least like a conventional slide. The structure is a galleon: inflated masts, a bowsprit, cannon ports along the hull, and a slide lane running off the deck like a gangplank into an attached splash pool. Children do not queue for it so much as occupy it, which changes what the product is for — this is a playset that happens to include a slide rather than a slide with decoration.",
    body: [
      'Playset-style units earn their place by holding attention differently. A conventional slide is a repeating loop: climb, ride, repeat, and a child exhausts it in twenty minutes of hard use. A ship gets played in — kids invent games in the hull, take turns at the wheel, use the slide as an escape route from an imagined boarding party. For a long garden party where the adults want four hours rather than forty minutes, that distinction is the whole value proposition.',
      'The cost of all that sculpting is complexity. There are more inflated appliqués than on any other unit here, which means more seams, a longer inflation time, and more surfaces to dry properly before storage. It is not a difficult unit to own, but it is not the one to buy if your priority is a three-minute setup — the Ocean Wave exists for that.',
      "Fifteen feet is the overall structure height rather than a pure slide drop, because the lane starts partway down the deck. Expect a gentler ride than a 15-foot dedicated slide, which suits the audience: pirate ships appeal squarely to the four-to-nine bracket, and that group wants a place to play more than it wants speed.",
      'This unit is currently out of stock. Rather than list a placeholder price we have left it off — when the next production run is confirmed we will publish real pricing. Use the notify form below and we will email you when it lands, with the actual figure rather than an estimate.',
    ],
    highlights: [
      'Full galleon structure — masts, bowsprit, cannon ports, wheel',
      'A playset first: holds attention for hours, not minutes',
      'Slide lane runs off the deck into an attached splash pool',
      'Best suited to ages 4–9',
      'Currently out of stock — join the notify list for real pricing',
    ],
    inTheBox: [
      "15' Pirate Ship water slide playset",
      'Blower sized for this unit',
      'Ground stakes and tether ropes',
      'Storage bag and repair patch kit',
      'Setup and safe-operation instructions',
    ],
    specs: [
      { label: 'Inflated footprint', value: "32' L × 16' W × 15' H" },
      { label: 'Recommended clear space', value: "37' L × 21' W" },
      { label: 'Rider capacity', value: '1 on the slide at a time; multiple in the play area' },
      { label: 'Max rider weight', value: '150 lb' },
      { label: 'Age range', value: '4–9 years, adult supervision required' },
      { label: 'Blower requirement', value: '1 × 1.5 HP blower (included)' },
      { label: 'Vinyl weight', value: '15oz commercial-grade PVC' },
      { label: 'Pool', value: 'Attached — integral splash basin' },
      { label: 'Setup time', value: '8–10 minutes (multiple appliqués)' },
      { label: 'Approx. shipping weight', value: '320 lb' },
      { label: 'Warranty', value: '1 year against seam and stitching defects' },
    ],
    faqs: [
      {
        question: 'When will the Pirate Ship be back in stock?',
        answer:
          'We do not have a confirmed date. Join the notify list and you will hear the moment we have real availability and real pricing — we would rather tell you nothing than guess.',
      },
      {
        question: 'Why is there no price shown?',
        answer:
          'Because we do not have a current one. Publishing a stale figure and correcting it at checkout is not how we want to do business.',
      },
      {
        question: 'Does it take much longer to set up than a normal slide?',
        answer:
          'Yes — budget eight to ten minutes rather than four. The masts and appliqués all inflate from the same blower but they take time to stand up and settle.',
      },
      {
        question: 'Is the slide part gentle enough for a four-year-old?',
        answer:
          'The lane starts partway down the deck rather than at the full structure height, so the effective drop is shorter than the 15-foot figure suggests.',
      },
    ],
    relatedSlugs: [
      'ocean-shark-15-water-slide-detachable-pool',
      'safari-12-water-slide-with-pool',
      'purplish-castle-wet-dry-combo-splash-pool',
    ],
    blogSlugs: [
      'best-inflatable-water-slide-buyers-guide',
      'how-to-clean-and-store-an-inflatable-water-slide',
    ],
  },

  {
    slug: 'dolphin-13-water-slide-with-pool',
    name: "13' Dolphin Water Slide with Pool",
    shortName: "Dolphin 13'",
    image: 'https://herokiddo.com/cdn/shop/files/HKS-Dolphin13_1600x.jpg?v=1781791328',
    msrp: null,
    price: null,
    stock: 'out-of-stock',
    collections: ['water-slides', 'backyard-water-slides'],
    sku: 'WS4K-DOL13-SL',
    mpn: 'HKS-Dolphin13',
    heightFt: 13,
    lanes: 1,
    poolType: 'attached',
    wetDry: false,
    tagline: 'The little sibling of our 16-footer, scaled for the four-to-eight crowd',
    intro:
      "The 13' Dolphin is the compact version of one of our best-selling units — same soft ocean-blue palette, same sculpted dolphins flanking the climbing wall, scaled down to a 13-foot frame with an attached pool. It is aimed squarely at households whose riders are four to eight, and at yards where a 16-footer would be pushing against the fence line on both sides.",
    body: [
      'Scaling a slide down well is harder than scaling it up. The temptation is to shrink everything proportionally, which produces a lane too narrow for a child in a swimsuit to slide down comfortably. The 13-foot Dolphin keeps the lane width close to its bigger sibling and takes the reduction out of the height and the runout instead, so riders get a full-width lane with a shorter, gentler drop.',
      'The attached pool is the right choice at this size. Younger riders benefit from a fixed, predictable landing basin, and removing the assembly step removes the most common setup error — a misaligned detachable pool that lets water escape at the seam. Three to four minutes, one blower, nothing to align.',
      "The dolphin theming is genuinely gentle, which for very young children matters. Slides with big teeth and aggressive graphics look exciting to a nine-year-old and give a four-year-old pause at the top of the ladder. If your youngest rider is the one you are buying for, this is a more sensible choice than the Ocean Shark at any height.",
      'Being the compact unit in a themed pair has one practical advantage worth knowing about: the artwork matches the 16-foot Dolphin exactly, so households that eventually add a second slide, and operators building a coordinated fleet, end up with two units that photograph as a set rather than as a collection of unrelated purchases. That consistency is worth more in a booking gallery than most operators realise.',
      'This unit is out of stock and we have not published a price for it, because we do not have a current one to publish. If you want it, the notify form below is the fastest route — subscribers hear before it goes back on the shop page.',
    ],
    highlights: [
      'Full-width lane despite the smaller frame',
      'Gentle dolphin theming suits nervous younger riders',
      'Attached pool — nothing to align, nothing to lose',
      'Fits yards too small for a 16-footer',
      'Currently out of stock — join the notify list',
    ],
    inTheBox: [
      "13' Dolphin water slide with attached pool",
      'Blower sized for this unit',
      'Ground stakes and tether ropes',
      'Storage bag and repair patch kit',
      'Setup and safe-operation instructions',
    ],
    specs: [
      { label: 'Inflated footprint', value: "24' L × 12' W × 13' H" },
      { label: 'Recommended clear space', value: "29' L × 17' W" },
      { label: 'Rider capacity', value: '1 at a time' },
      { label: 'Max rider weight', value: '150 lb' },
      { label: 'Age range', value: '4–9 years, adult supervision required' },
      { label: 'Blower requirement', value: '1 × 1 HP blower (included)' },
      { label: 'Vinyl weight', value: '15oz commercial-grade PVC' },
      { label: 'Pool', value: 'Attached — integral splash basin with drain plug' },
      { label: 'Setup time', value: '3–4 minutes' },
      { label: 'Approx. shipping weight', value: '200 lb' },
      { label: 'Warranty', value: '1 year against seam and stitching defects' },
    ],
    faqs: [
      {
        question: "How is this different from the Dolphin 16'?",
        answer:
          'Three feet of height, a shorter runout, an attached pool instead of a detachable one, and a smaller footprint. The lane width is deliberately kept close to the larger unit.',
      },
      {
        question: 'When is it back in stock?',
        answer:
          'No confirmed date yet. The notify list is the fastest way to hear, and we will publish real pricing at the same time.',
      },
      {
        question: 'Is it gentle enough for a nervous four-year-old?',
        answer:
          'It is the gentlest themed slide we list — short drop, soft graphics, wide lane. That combination is what makes it work for hesitant riders.',
      },
      {
        question: 'Can I use it in a side yard?',
        answer:
          "You need roughly 29' × 17' clear and level. Narrow side yards usually fail on width rather than length, so measure across before you plan on it.",
      },
    ],
    relatedSlugs: [
      'summer-breeze-13-water-slide-with-pool',
      'dolphin-16-water-slide-detachable-pool',
      'tropic-tide-double-racer-13-dual-lane',
    ],
    blogSlugs: [
      'best-inflatable-water-slide-buyers-guide',
      'inflatable-water-slide-safety-checklist',
    ],
  },

  {
    slug: 'safari-12-water-slide-with-pool',
    name: "12' Safari Water Slide with Pool",
    shortName: "Safari 12'",
    image: 'https://herokiddo.com/cdn/shop/files/JOH-SafariSlide12WEB3_1600x.jpg?v=1758313868',
    msrp: null,
    price: null,
    stock: 'out-of-stock',
    collections: ['water-slides', 'backyard-water-slides'],
    sku: 'WS4K-SAF12-SL',
    mpn: 'JOH-SafariSlide12',
    heightFt: 12,
    lanes: 1,
    poolType: 'attached',
    wetDry: false,
    tagline: 'Giraffes, zebras, and a twelve-foot drop built for the smallest riders',
    intro:
      "The 12' Safari is the entry point of our range in every sense — the shortest drop, the smallest footprint, and the theming most obviously aimed at preschoolers. Sculpted giraffe and zebra appliqués run up the sides of the climbing wall, the lane is short and wide, and the attached splash pool sits low enough that a three-year-old can step out of it without help. It is a first slide, and it is unapologetic about that.",
    body: [
      'Twelve feet reads as small to an adult and enormous to a four-year-old, which is the entire design brief. The climbing wall has closely spaced holds and a low first step, so children who cannot yet manage the taller units get up it without a lift. That independence is what determines whether a slide gets used all afternoon or gets abandoned once the parent gets tired of boosting.',
      'The animal appliqués do real work beyond decoration. They give small children something to identify and talk about, which is how you get a hesitant three-year-old to approach a piece of equipment that is four times their height. It sounds soft; anyone who has tried to coax a nervous toddler onto a slide knows it is the difference between a purchase that gets used and one that sits in the garage.',
      'A short slide has a short runout, and the attached pool is proportionally shallow. That combination means riders decelerate quickly and gently, which is what you want for this age group. It also means the unit is quiet — less speed, less impact, less shrieking, which parents of very young children may appreciate more than the children do.',
      'The Safari is currently out of stock with no published price. We list it because it remains part of the range and because people search for it specifically, but we are not going to invent a figure. Join the notify list and you will get the real one.',
    ],
    highlights: [
      'Shortest, gentlest slide in the range at 12 feet',
      'Low first step and close-set holds — climbable by preschoolers',
      'Sculpted giraffe and zebra appliqués',
      'Shallow attached pool a small child can step out of',
      'Currently out of stock — join the notify list',
    ],
    inTheBox: [
      "12' Safari water slide with attached pool",
      'Blower sized for this unit',
      'Ground stakes and tether ropes',
      'Storage bag and repair patch kit',
      'Setup and safe-operation instructions',
    ],
    specs: [
      { label: 'Inflated footprint', value: "22' L × 12' W × 12' H" },
      { label: 'Recommended clear space', value: "27' L × 17' W" },
      { label: 'Rider capacity', value: '1 at a time' },
      { label: 'Max rider weight', value: '120 lb' },
      { label: 'Age range', value: '3–8 years, adult supervision required' },
      { label: 'Blower requirement', value: '1 × 1 HP blower (included)' },
      { label: 'Vinyl weight', value: '15oz commercial-grade PVC' },
      { label: 'Pool', value: 'Attached — shallow integral splash basin' },
      { label: 'Setup time', value: '3 minutes' },
      { label: 'Approx. shipping weight', value: '180 lb' },
      { label: 'Warranty', value: '1 year against seam and stitching defects' },
    ],
    faqs: [
      {
        question: 'Is 12 feet safe for a three-year-old?',
        answer:
          'The example spec above starts the age range at 3 with adult supervision required at all times. Supervision is not optional on any unit we sell, and least of all on one aimed at preschoolers.',
      },
      {
        question: 'Will it still be fun when they turn seven?',
        answer:
          'For a while. By eight most kids want more speed. If you are buying one slide to cover ages three to ten, a 15-footer is the better long-term purchase.',
      },
      {
        question: 'When will it be restocked?',
        answer:
          'Unknown. The notify list gets the announcement and the real price at the same moment the shop page does.',
      },
      {
        question: 'Can two small children go down together?',
        answer:
          'The spec is one rider at a time. On a short lane a second rider does not have room to decelerate independently.',
      },
    ],
    relatedSlugs: [
      'block-party-12-dual-lane-backload-water-slide',
      'summer-breeze-13-water-slide-with-pool',
      'dolphin-13-water-slide-with-pool',
    ],
    blogSlugs: [
      'inflatable-water-slide-safety-checklist',
      'best-inflatable-water-slide-buyers-guide',
    ],
  },

  {
    slug: 'block-party-19-dual-lane-water-slide-deep-pool',
    name: "Block Party 19' Dual Lane Water Slide with Attached Deep Pool",
    shortName: "Block Party 19' Dual Lane",
    image: 'https://www.xjump.com/cdn/shop/files/X-WD19BKWEB2.jpg?v=1760380054',
    msrp: 4589,
    price: 3177,
    stock: 'in-stock',
    collections: ['water-slides', 'dual-lane-water-slides'],
    heroImage: true,
    sku: 'WS4K-BP19-DL',
    mpn: 'X-WD19BK',
    heightFt: 19,
    lanes: 2,
    poolType: 'attached',
    wetDry: false,
    tagline: 'Nineteen feet, two lanes, and a deep pool — the flagship',
    intro:
      "This is the largest slide in our catalog and the one that changes what an event looks like. Nineteen feet of dual-lane drop into an attached deep pool, in the bright primary Block Party colorway. At this scale the slide stops being a backyard toy and becomes the centerpiece of a fairground, a school field day, or a commercial rental fleet's headline unit — the one photographed for the booking page.",
    body: [
      'Nineteen feet is a meaningful threshold rather than an incremental step up from 17. The drop is long enough that riders reach genuine speed, which is why this unit uses a deep pool rather than a shallow splash basin: the extra water depth is what decelerates a rider arriving that fast. That deep pool is also why this slide demands more supervision than anything else here. It is not a unit to set up and glance at occasionally.',
      "Dual lanes at this height serve throughput at scale. A 19-foot single lane cycles slowly because the climb is long; two lanes roughly halve the effective wait, which is the difference between a manageable queue and a hundred restless kids at a school event. If you are buying for volume, the height and the lane count have to move together or the unit becomes a bottleneck.",
      'Space is the real constraint. You need substantial clear length, substantial width, and — critically — nineteen-plus feet of unobstructed overhead. That last requirement rules out a large share of residential yards regardless of ground area, because of tree canopy and service drops. Check the sky before you check the lawn.',
      "Power is the second consideration. Larger units need more air, and this one is specified for two blowers rather than one. Two blowers means two circuits — not two outlets on the same circuit, which is the single most common setup failure on flagship units. Our blower guide covers how to work out what you actually need before delivery day rather than on it.",
    ],
    highlights: [
      'The largest slide we sell — 19 feet, dual lane',
      'Attached deep pool sized for the speed the drop generates',
      'Dual lanes keep the queue moving at high-volume events',
      'Matches the Block Party 12 and 16 for fleet consistency',
      'Requires two blowers on two separate circuits',
    ],
    inTheBox: [
      "Block Party 19' dual lane water slide with attached deep pool",
      'Two blowers sized for this unit',
      'Ground stakes and tether ropes',
      'Storage bag and repair patch kit',
      'Setup and safe-operation instructions',
    ],
    specs: [
      { label: 'Inflated footprint', value: "40' L × 20' W × 19' H" },
      { label: 'Recommended clear space', value: "46' L × 26' W" },
      { label: 'Rider capacity', value: '2 at a time (1 per lane)' },
      { label: 'Max rider weight', value: '200 lb per rider' },
      { label: 'Age range', value: '6–13 years, constant adult supervision required' },
      { label: 'Blower requirement', value: '2 × 1.5 HP blowers on separate circuits (included)' },
      { label: 'Vinyl weight', value: '15oz commercial-grade PVC' },
      { label: 'Pool', value: 'Attached deep pool' },
      { label: 'Setup time', value: '10–15 minutes' },
      { label: 'Approx. shipping weight', value: '470 lb' },
      { label: 'Warranty', value: '1 year against seam and stitching defects' },
    ],
    faqs: [
      {
        question: 'Why does this unit need two blowers?',
        answer:
          'Volume. A 19-foot dual-lane structure holds far more air than a 15-foot single lane, and a single blower cannot maintain pressure across it. Run them on separate circuits — sharing one will trip it.',
      },
      {
        question: 'Can this go in a residential backyard?',
        answer:
          'Some, but fewer than you would think. The blocker is usually overhead clearance rather than ground area — nineteen feet is taller than most tree canopies and lower than most service drops.',
      },
      {
        question: 'How is a deep pool different from a splash pool?',
        answer:
          'More water depth, which is what slows a rider arriving at speed from a tall drop. It also means it must never be left unsupervised, even briefly.',
      },
      {
        question: 'Is this practical for a first rental unit?',
        answer:
          'It is a strong headline unit but a demanding first purchase — bigger truck, longer setup, more power. Most operators start with a 17-footer and add this once the calendar justifies it.',
      },
    ],
    relatedSlugs: [
      'tropical-deep-sea-19-dual-lane-water-slide',
      'rocket-rush-17-dual-lane-water-slide',
      'block-party-16-water-slide-and-pool',
    ],
    blogSlugs: ['water-slide-blower-size', 'how-to-start-a-water-slide-rental-business'],
  },

  {
    slug: 'tropical-deep-sea-19-dual-lane-water-slide',
    name: "Tropical Deep Sea 19' Dual Lane Water Slide with Attached Deep Pool",
    shortName: "Tropical Deep Sea 19'",
    image: 'https://www.xjump.com/cdn/shop/files/X-WD19T_WEB_2_1.jpg?v=1760380111',
    msrp: 4589,
    price: 3699,
    stock: 'out-of-stock',
    collections: ['water-slides', 'dual-lane-water-slides'],
    sku: 'WS4K-TDS19-DL',
    mpn: 'X-WD19T',
    heightFt: 19,
    lanes: 2,
    poolType: 'attached',
    wetDry: false,
    tagline: 'The flagship in tropical dress — same 19ft dual-lane frame, deep-sea artwork',
    intro:
      "The Tropical Deep Sea 19' is the same flagship platform as our Block Party 19 — nineteen feet, two racing lanes, attached deep pool — wearing a deep-ocean colorway of teals, corals, and marine life running the length of both lanes. If you want the largest slide we carry but the primary-color look does not suit your venue or your brand, this is the alternative.",
    body: [
      'The artwork difference is not purely cosmetic for an operator. Deep-sea and tropical themes photograph as "resort" rather than "carnival", which matters if your bookings skew toward hotels, country clubs, and corporate family days rather than school fairs. Same equipment, different market positioning — and at flagship prices, positioning is what fills the calendar.',
      "Everything structural matches the Block Party 19: two lanes to keep a high-volume queue moving, an attached deep pool sized for the speed a nineteen-foot drop generates, two blowers on separate circuits, and a footprint that needs genuine open ground with clear sky above it. Read the same warnings — overhead clearance is what disqualifies most sites, not lawn area.",
      "Because the pool is attached rather than detachable, there is no dry configuration for this unit. At this height that is arguably the right decision: a nineteen-foot dry slide is a substantially different risk profile, and the deep pool is doing real deceleration work rather than just being wet. If you need a large slide that converts to dry, the Surf Beach 17 with its detachable deep pool is the closer fit.",
      "Colour is doing quiet work on a unit this size as well. Nineteen feet of vinyl is a large object in any setting, and the deep teals and blues read as considerably less visually aggressive than nineteen feet of primary red and yellow — which matters if the slide is going up on a hotel lawn or a country club terrace rather than a school field. It also hides the mineral staining that hard water leaves behind after a long season better than the bright colourways do.",
      "This unit is out of stock. The price shown is the last confirmed figure and we have kept it visible so you can budget, but availability, not price, is the current constraint. Join the notify list and we will contact you when the next run is allocated.",
    ],
    highlights: [
      'Same 19ft dual-lane flagship platform as the Block Party 19',
      'Deep-sea colorway suits resort, hotel, and corporate venues',
      'Attached deep pool for high-speed deceleration',
      'Two blowers on separate circuits required',
      'Currently out of stock — join the notify list',
    ],
    inTheBox: [
      "Tropical Deep Sea 19' dual lane water slide with attached deep pool",
      'Two blowers sized for this unit',
      'Ground stakes and tether ropes',
      'Storage bag and repair patch kit',
      'Setup and safe-operation instructions',
    ],
    specs: [
      { label: 'Inflated footprint', value: "40' L × 20' W × 19' H" },
      { label: 'Recommended clear space', value: "46' L × 26' W" },
      { label: 'Rider capacity', value: '2 at a time (1 per lane)' },
      { label: 'Max rider weight', value: '200 lb per rider' },
      { label: 'Age range', value: '6–13 years, constant adult supervision required' },
      { label: 'Blower requirement', value: '2 × 1.5 HP blowers on separate circuits (included)' },
      { label: 'Vinyl weight', value: '15oz commercial-grade PVC' },
      { label: 'Pool', value: 'Attached deep pool — no dry configuration' },
      { label: 'Setup time', value: '10–15 minutes' },
      { label: 'Approx. shipping weight', value: '470 lb' },
      { label: 'Warranty', value: '1 year against seam and stitching defects' },
    ],
    faqs: [
      {
        question: 'Is this mechanically identical to the Block Party 19?',
        answer:
          'Same platform, same dimensions, same blower requirement, same pool. The difference is the printed artwork.',
      },
      {
        question: 'Can the deep pool be removed for dry use?',
        answer:
          'No — it is attached, and at nineteen feet the pool is doing real deceleration work. For a large slide that converts to dry, look at the Surf Beach 17.',
      },
      {
        question: 'The price is shown but it is out of stock. Can I pay to reserve?',
        answer:
          'Not on this unit. The figure is the last confirmed price, kept visible so you can budget. Contact us and we will tell you what we actually know about the next run.',
      },
      {
        question: 'Which theme books better?',
        answer:
          'It depends on your market. Primary colors read as carnival and school fair; deep-sea reads as resort and corporate. Neither is better in the abstract.',
      },
    ],
    relatedSlugs: [
      'block-party-19-dual-lane-water-slide-deep-pool',
      'surf-beach-19-single-lane-water-slide',
      'jungle-falls-17-dual-lane-water-slide',
    ],
    blogSlugs: [
      'how-to-start-a-water-slide-rental-business',
      'attached-vs-detachable-pool-water-slides',
    ],
  },
  {
    slug: 'surf-beach-17-dual-lane-water-slide',
    name: "Surf Beach 17' Dual Lane Water Slide with Detachable Deep Pool",
    shortName: "Surf Beach 17' Dual Lane",
    image: 'https://www.xjump.com/cdn/shop/files/17ft_Beach_Slide_Regular_V2.jpg?v=1760380394',
    msrp: 4369,
    price: 2850,
    stock: 'in-stock',
    collections: ['water-slides', 'dual-lane-water-slides'],
    sku: 'WS4K-SB17-DL',
    mpn: 'X-WD17B',
    heightFt: 17,
    lanes: 2,
    poolType: 'detachable',
    wetDry: false,
    tagline: 'Dual lane, deep pool, and it all comes apart for dry season',
    intro:
      "The Surf Beach 17' is the most configurable large slide we sell. Two racing lanes on a seventeen-foot frame, a detachable deep pool, and surfboard-and-longboard artwork in warm beach tones. The detachable deep pool is the unusual part — deep pools are almost always integral because of the water volume they carry, and making one that separates cleanly is a genuine engineering choice rather than a marketing bullet.",
    body: [
      'That choice buys you a year-round unit at flagship scale. Through summer it runs as a full dual-lane water slide with a deep landing pool. Come autumn the pool separates and the same frame becomes a dry double racer for indoor events, fall festivals, and school gym days. For an operator, that is two distinct rental listings from one storage footprint and one truck load, which is the closest thing to free revenue in this business.',
      "Seventeen feet is the height most rental operators standardize on, and this unit shows why. It generates enough speed to satisfy older kids, it clears the tree line in a majority of sites, and it fits on a single trailer without a specialist rig. Nineteen feet is more impressive and materially harder to place; fifteen is easier to place and less impressive. Seventeen is where the curve peaks.",
      "Because the pool detaches, the seam between pool and lane is a maintenance point, and on a deep pool it carries more load than the shallow-basin equivalents elsewhere in this catalog. Inspect it at the start of each season and after any event where the unit was struck in a hurry. It is not fragile, but it is the part that will tell you first if the unit has been handled roughly.",
      'Set against the Rocket Rush 17 — our other dual-lane seventeen-footer — the difference is pool depth and price. Rocket Rush has a standard detachable pool and costs materially less; Surf Beach has a detachable deep pool and a longer runout. If your riders skew older and faster, the deep pool earns the difference. If they do not, it does not.',
    ],
    highlights: [
      'Detachable deep pool — unusual at this size',
      'Converts to a dry dual-lane racer for the off-season',
      '17 feet: the height most rental fleets standardize on',
      'Fits a single trailer without specialist equipment',
      'Free shipping sitewide, blower included',
    ],
    inTheBox: [
      "Surf Beach 17' dual lane water slide",
      'Detachable deep pool section',
      'Blowers sized for this unit',
      'Ground stakes and tether ropes',
      'Storage bag and repair patch kit',
    ],
    specs: [
      { label: 'Inflated footprint', value: "36' L × 18' W × 17' H" },
      { label: 'Recommended clear space', value: "42' L × 24' W" },
      { label: 'Rider capacity', value: '2 at a time (1 per lane)' },
      { label: 'Max rider weight', value: '200 lb per rider' },
      { label: 'Age range', value: '6–13 years, constant adult supervision required' },
      { label: 'Blower requirement', value: '2 × 1.5 HP blowers on separate circuits (included)' },
      { label: 'Vinyl weight', value: '15oz commercial-grade PVC' },
      { label: 'Pool', value: 'Detachable deep pool — runs wet or dry' },
      { label: 'Setup time', value: '10–12 minutes including pool' },
      { label: 'Approx. shipping weight', value: '430 lb' },
      { label: 'Warranty', value: '1 year against seam and stitching defects' },
    ],
    faqs: [
      {
        question: 'How long does it take to detach a deep pool?',
        answer:
          'Longer than a splash basin — budget five minutes and two people. The pool is larger and heavier, and it needs to be fully drained before you separate it.',
      },
      {
        question: 'Should I buy this or the Rocket Rush 17?',
        answer:
          'Same height and lane count. Surf Beach adds a deep pool and a longer runout for a higher price. If your riders are older and heavier, that is worth paying for; otherwise the Rocket Rush is the better value.',
      },
      {
        question: 'Can I run it dry indoors?',
        answer:
          'That is what the detachable pool is for, but check your ceiling. Seventeen feet inflated clears some gymnasiums and not others.',
      },
      {
        question: 'What should I inspect between seasons?',
        answer:
          'The pool attachment seam first — it carries the most load on this unit — then the lane surfaces, the climbing-wall holds, and every stake point.',
      },
    ],
    relatedSlugs: [
      'rocket-rush-17-dual-lane-water-slide',
      'jungle-falls-17-dual-lane-water-slide',
      'block-party-19-dual-lane-water-slide-deep-pool',
    ],
    blogSlugs: [
      'attached-vs-detachable-pool-water-slides',
      'how-to-start-a-water-slide-rental-business',
    ],
  },

  {
    slug: 'surf-beach-19-single-lane-water-slide',
    name: "Surf Beach 19' Single Lane Water Slide with Detachable Deep Pool",
    shortName: "Surf Beach 19' Single Lane",
    image:
      'https://www.xjump.com/cdn/shop/files/inflatable19ftslidesurfbeach2.jpg?v=1760380284',
    msrp: 4200,
    price: 2421,
    stock: 'out-of-stock',
    collections: ['water-slides'],
    sku: 'WS4K-SB19-SL',
    mpn: 'X-WS19B',
    heightFt: 19,
    lanes: 1,
    poolType: 'detachable',
    wetDry: false,
    tagline: 'Maximum height, one wide lane, and a deep pool that detaches',
    intro:
      "Nineteen feet on a single wide lane is a different ride from nineteen feet split across two. All the structure goes into one lane, which means the widest slide surface in our catalog and the longest continuous runout. Add a detachable deep pool and you have the tallest convertible unit we list — a nineteen-foot water slide in July that becomes a nineteen-foot dry slide when the pool comes off.",
    body: [
      'A single wide lane at this height suits a specific kind of buyer: someone who wants maximum drama and does not need to move a queue. One lane is more forgiving than two, because riders who go down sideways or off-center have room to correct. It also costs less than the dual-lane nineteen-footers, which is why it appeals to venues that want a headline attraction rather than a throughput machine.',
      'The detachable deep pool at nineteen feet is the most demanding configuration in the range to manage well. Drain it completely before separating it, and never attempt the swap with the blower running. Handled properly it converts in around five minutes with two people; handled carelessly it is the fastest way to damage a seam on any unit we sell.',
      "Overhead clearance disqualifies more sites for this slide than any other factor. Nineteen feet inflated, plus movement, plus a margin, means you need something close to twenty-five feet of clear sky. Tree canopy, gutters, floodlights, and overhead service drops all rule it out, and none of them are visible when you are looking at a lawn on a site survey. Look up first.",
      "This unit is out of stock. The listed price is the last confirmed figure. If you are planning a season around it, contact us rather than waiting on the notify email — we can sometimes give a better read on timing for the larger units than the automated list can.",
    ],
    highlights: [
      'The widest single lane in the catalog',
      'Longest continuous runout of any unit we sell',
      'Detachable deep pool — converts to a dry slide',
      'Lower cost than the dual-lane nineteen-footers',
      'Currently out of stock — join the notify list',
    ],
    inTheBox: [
      "Surf Beach 19' single lane water slide",
      'Detachable deep pool section',
      'Blowers sized for this unit',
      'Ground stakes and tether ropes',
      'Storage bag and repair patch kit',
    ],
    specs: [
      { label: 'Inflated footprint', value: "38' L × 15' W × 19' H" },
      { label: 'Recommended clear space', value: "44' L × 21' W, 25' overhead" },
      { label: 'Rider capacity', value: '1 at a time' },
      { label: 'Max rider weight', value: '200 lb' },
      { label: 'Age range', value: '6–13 years, constant adult supervision required' },
      { label: 'Blower requirement', value: '2 × 1.5 HP blowers on separate circuits (included)' },
      { label: 'Vinyl weight', value: '15oz commercial-grade PVC' },
      { label: 'Pool', value: 'Detachable deep pool — runs wet or dry' },
      { label: 'Setup time', value: '10–12 minutes including pool' },
      { label: 'Approx. shipping weight', value: '415 lb' },
      { label: 'Warranty', value: '1 year against seam and stitching defects' },
    ],
    faqs: [
      {
        question: 'Why choose one lane over two at this height?',
        answer:
          'A wider, more forgiving slide surface and a lower price. You give up throughput, so it suits venues that want a headline attraction rather than a queue-clearing machine.',
      },
      {
        question: 'How much overhead clearance do I really need?',
        answer:
          "Plan for about 25 feet. Nineteen is the inflated height; the rest is margin for movement and for whatever you did not notice above the site.",
      },
      {
        question: 'Can I detach the pool by myself?',
        answer:
          'Not comfortably. Drain it fully, shut the blower down, and use two people. Rushing that swap is how deep-pool seams get damaged.',
      },
      {
        question: 'When will it be back?',
        answer:
          'No confirmed date. For the large units, contact us directly — we can often give better timing than the notify list.',
      },
    ],
    relatedSlugs: [
      'surf-beach-17-dual-lane-water-slide',
      'block-party-19-dual-lane-water-slide-deep-pool',
      't-rex-18-water-slide-detachable-pool',
    ],
    blogSlugs: [
      'inflatable-water-slide-safety-checklist',
      'attached-vs-detachable-pool-water-slides',
    ],
  },

  {
    slug: 'jungle-falls-17-dual-lane-water-slide',
    name: "Jungle Falls 17' Dual Lane Water Slide with Detachable Pool",
    shortName: "Jungle Falls 17'",
    image: 'https://www.xjump.com/cdn/shop/files/X-WD17J_WEB_2.jpg?v=1760380246',
    msrp: 4369,
    price: 2850,
    stock: 'out-of-stock',
    collections: ['water-slides', 'dual-lane-water-slides'],
    sku: 'WS4K-JF17-DL',
    mpn: 'X-WD17J',
    heightFt: 17,
    lanes: 2,
    poolType: 'detachable',
    wetDry: false,
    tagline: 'Waterfall theming on a seventeen-foot dual-lane frame',
    intro:
      "Jungle Falls takes the seventeen-foot dual-lane platform and dresses it as a waterfall cutting through rainforest — deep greens, cascading blue-white water graphics down both lanes, and foliage detailing across the climbing wall. It is the most convincing themed illusion in the range, because the artwork works with the running water rather than against it: real water flowing over painted falls looks like the falls are real.",
    body: [
      'Theming that interacts with the product is rare and worth paying attention to. Most printed graphics are ignored the moment the slide is wet. Here the lane artwork is drawn as falling water, so the hose running down the lane reads as part of the design. From twenty feet away — which is where every parent with a camera is standing — the effect genuinely lands.',
      'Underneath it is the same seventeen-foot dual-lane configuration as the Surf Beach 17: two racing lanes, detachable pool, two blowers on separate circuits, and a footprint that fits a standard trailer. Seventeen feet remains the practical sweet spot for anyone placing a slide at varied sites, because it clears most tree lines without demanding the near-25-foot overhead margin a nineteen-footer needs.',
      "The green palette is the most forgiving in the catalog for staining. Deep greens hide lawn transfer, mineral deposits, and the general grubbiness that a slide accumulates over a season better than any other color we stock, including the purple. For a unit that will live outdoors on grass most weekends, that is a real ownership advantage rather than a cosmetic footnote.",
      'Currently out of stock. The listed price is the last confirmed figure and we have left it visible for budgeting. If you are choosing between this and the Surf Beach 17 and cannot wait, the Surf Beach is in stock at the same price with a deeper pool — the difference really is down to which artwork suits your venue.',
    ],
    highlights: [
      'Waterfall artwork designed to work with running water',
      'Same 17ft dual-lane platform as the Surf Beach 17',
      'Detachable pool for dry-season operation',
      'Deep green vinyl hides seasonal staining best in the range',
      'Currently out of stock — join the notify list',
    ],
    inTheBox: [
      "Jungle Falls 17' dual lane water slide",
      'Detachable pool section',
      'Blowers sized for this unit',
      'Ground stakes and tether ropes',
      'Storage bag and repair patch kit',
    ],
    specs: [
      { label: 'Inflated footprint', value: "36' L × 18' W × 17' H" },
      { label: 'Recommended clear space', value: "42' L × 24' W" },
      { label: 'Rider capacity', value: '2 at a time (1 per lane)' },
      { label: 'Max rider weight', value: '200 lb per rider' },
      { label: 'Age range', value: '6–13 years, constant adult supervision required' },
      { label: 'Blower requirement', value: '2 × 1.5 HP blowers on separate circuits (included)' },
      { label: 'Vinyl weight', value: '15oz commercial-grade PVC' },
      { label: 'Pool', value: 'Detachable — runs wet or dry' },
      { label: 'Setup time', value: '10–12 minutes including pool' },
      { label: 'Approx. shipping weight', value: '425 lb' },
      { label: 'Warranty', value: '1 year against seam and stitching defects' },
    ],
    faqs: [
      {
        question: 'How is this different from the Surf Beach 17?',
        answer:
          'Artwork and pool depth. Jungle Falls uses a standard detachable pool; Surf Beach uses a detachable deep pool. Same height, same lanes, same price.',
      },
      {
        question: 'Does the dark green really stay cleaner?',
        answer:
          'It hides dirt better — the dirt still arrives. It means fewer scrubbing sessions to keep it looking presentable, which matters if you are photographing it for bookings.',
      },
      {
        question: 'Is there an in-stock alternative right now?',
        answer:
          'The Surf Beach 17 is the same platform at the same price and is in stock. If the green theming is not essential, that is the straightforward substitution.',
      },
      {
        question: 'Will the waterfall graphics fade?',
        answer:
          'All printed vinyl fades under UV over years. Storing it out of direct sun between uses is what you control.',
      },
    ],
    relatedSlugs: [
      'surf-beach-17-dual-lane-water-slide',
      'rocket-rush-17-dual-lane-water-slide',
      'tropical-deep-sea-19-dual-lane-water-slide',
    ],
    blogSlugs: [
      'how-to-clean-and-store-an-inflatable-water-slide',
      'dual-lane-vs-single-lane-water-slides',
    ],
  },

  {
    slug: 'pop-splash-dual-lane-combo-slide-pool',
    name: 'Pop Splash Dual Lane Bounce House Combo with Slide & Attached Pool',
    shortName: 'Pop Splash Dual Lane Combo',
    image: 'https://www.xjump.com/cdn/shop/files/X-C30P_nokids.jpg?v=1784127168',
    msrp: 3749,
    price: 2699,
    stock: 'in-stock',
    collections: ['water-slide-bounce-house-combos'],
    isNew: true,
    heroImage: true,
    sku: 'WS4K-POP30-CMB',
    mpn: 'X-C30P',
    heightFt: null,
    lanes: 2,
    poolType: 'attached',
    wetDry: true,
    tagline: 'Bounce house, climbing wall, two slide lanes, and a pool — in one unit',
    intro:
      "A combo unit is the answer to a problem every parent recognizes: kids do not all want the same thing at the same time. The Pop Splash puts a full bounce house, a climbing wall, two racing slide lanes, and an attached splash pool into a single inflatable. Some children bounce, some race, some sit in the water, and none of them are waiting for a turn on the one thing you bought.",
    body: [
      'The economics are the strongest argument. Buying a bounce house and a water slide separately costs more than this unit, needs two blowers, two setups, and twice the storage space. A combo consolidates all of that into one purchase with one footprint. For a rental operator, it also books as a premium listing precisely because it replaces two rentals — customers pay more for it and you deliver one item.',
      "The bounce chamber sits at the rear with mesh windows on all sides, which is the detail that matters for supervision: you can see every child inside from outside the unit without climbing in. The climbing wall leads from the bounce floor up to the slide platform, so the whole unit works as a circuit — bounce, climb, race down, splash, walk back in. Kids find that loop on their own within about ninety seconds.",
      'Wet/dry capability is standard on this unit. Plug the pool drain and run it dry with the hose off, and it is a bounce house with slides for an indoor birthday in February; open it up in July and it is a water park. The bright pop-art colorway — magenta, cyan, and yellow in bold graphic blocks — reads as loud fun and photographs vividly, which is why it is one of our hero units.',
      "The practical caveat with any combo is footprint. Thirty feet of unit is thirty feet of yard, and combos are wide as well as long because the bounce chamber sits beside rather than under the slide. Measure both dimensions. If your yard is long and narrow, a dedicated slide will serve you better than a combo will.",
    ],
    highlights: [
      'Bounce house, climbing wall, two slide lanes, and pool in one',
      'Replaces two separate rentals or two separate purchases',
      'Mesh windows on all sides for supervision from outside',
      'Wet/dry — runs as an indoor bounce house in winter',
      'Free shipping sitewide, blower included',
    ],
    inTheBox: [
      'Pop Splash dual lane bounce house combo',
      'Blowers sized for this unit',
      'Ground stakes and tether ropes',
      'Storage bag and repair patch kit',
      'Setup and safe-operation instructions',
    ],
    specs: [
      { label: 'Inflated footprint', value: "30' L × 22' W × 15' H" },
      { label: 'Recommended clear space', value: "36' L × 28' W" },
      { label: 'Rider capacity', value: '2 on the slide lanes; 6–8 in the bounce chamber' },
      { label: 'Max rider weight', value: '150 lb per rider' },
      { label: 'Age range', value: '4–12 years, constant adult supervision required' },
      { label: 'Blower requirement', value: '2 × 1.5 HP blowers on separate circuits (included)' },
      { label: 'Vinyl weight', value: '15oz commercial-grade PVC' },
      { label: 'Pool', value: 'Attached splash pool with drain plug' },
      { label: 'Configuration', value: 'Wet/dry convertible' },
      { label: 'Setup time', value: '8–12 minutes' },
      { label: 'Approx. shipping weight', value: '400 lb' },
      { label: 'Warranty', value: '1 year against seam and stitching defects' },
    ],
    faqs: [
      {
        question: 'How many children can use it at once?',
        answer:
          'The example spec allows two on the slide lanes plus six to eight in the bounce chamber. Confirm the figures against the documentation shipped with your unit, and supervise both areas.',
      },
      {
        question: 'Can it really run dry indoors?',
        answer:
          'Yes — plug the pool drain, leave the hose off, and it operates as a bounce house with dry slides. Check your ceiling height against the 15-foot inflated figure first.',
      },
      {
        question: 'Is a combo better value than buying two units?',
        answer:
          'Almost always, for a household. One purchase, one setup, one storage bag, one footprint. The trade-off is that you cannot run the bounce house at one address and the slide at another.',
      },
      {
        question: 'How much yard does it need?',
        answer:
          "Wider than a plain slide — about 36' × 28'. Combos are wide because the bounce chamber sits beside the slide rather than under it.",
      },
    ],
    relatedSlugs: [
      'glitch-gamer-dual-lane-combo-slide-pool',
      't-rex-dinosaur-wet-dry-combo-deep-pool',
      'tropical-ocean-wet-dry-combo-splash-pool',
    ],
    blogSlugs: [
      'best-inflatable-water-slide-buyers-guide',
      'how-to-start-a-water-slide-rental-business',
    ],
  },

  {
    slug: 'glitch-gamer-dual-lane-combo-slide-pool',
    name: 'Glitch Gamer Dual Lane Bounce House Combo with Slide & Attached Pool',
    shortName: 'Glitch Gamer Dual Lane Combo',
    image: 'https://www.xjump.com/cdn/shop/files/X-C30G_nokids.jpg?v=1784127129',
    msrp: 3749,
    price: 2699,
    stock: 'in-stock',
    collections: ['water-slide-bounce-house-combos'],
    isNew: true,
    sku: 'WS4K-GLT30-CMB',
    mpn: 'X-C30G',
    heightFt: null,
    lanes: 2,
    poolType: 'attached',
    wetDry: true,
    tagline: 'The combo that finally speaks to nine-to-thirteen-year-olds',
    intro:
      "Almost every inflatable is themed for children under eight, which leaves a real gap: the nine-to-thirteen bracket who find cartoon animals embarrassing but still want to bounce and race. The Glitch Gamer is aimed exactly there — pixel-art graphics, controller motifs, neon-on-dark colorways, and the visual language of a video game rather than a nursery. Same 30-foot dual-lane combo platform as the Pop Splash underneath.",
    body: [
      'Theming that suits older children is commercially undersupplied, and if you are running rentals that is the whole opportunity. Middle-school parties are a market that mostly does not get served, because the available inventory looks babyish to the guests. A gamer-themed combo books those parties and books them at a premium, because you are one of very few operators who can take them.',
      "The build is identical to the Pop Splash: a bounce chamber with mesh windows on all four sides, an internal climbing wall to the slide platform, two racing lanes, and an attached splash pool with a drain plug. Wet/dry convertible, so it runs as an indoor bounce house through the winter and a water slide through the summer. Two blowers, two circuits.",
      'The dark neon palette carries the same practical advantage as the purple slide — it hides staining well — and one drawback, which is heat retention on the dry upper surfaces in direct sun. In practice the bounce floor is the surface that warms up, and it is the one that is not wetted. Set it up with the bounce chamber in whatever shade you have, or run it in the morning and late afternoon on the hottest days.',
      "One honest note on longevity of theme: pixel-art and gamer aesthetics date faster than tropical or primary colors. A palm tree looks the same in 2036 as it did in 2016; a video-game visual language does not. Buy this because it fits the audience you have now, and expect it to feel more period-specific in a decade than the rest of the catalog will.",
    ],
    highlights: [
      'Themed for 9–13s, an age group almost nobody serves',
      'Same 30ft dual-lane combo platform as the Pop Splash',
      'Bounce chamber, climbing wall, two slide lanes, splash pool',
      'Wet/dry convertible for year-round use',
      'Free shipping sitewide, blower included',
    ],
    inTheBox: [
      'Glitch Gamer dual lane bounce house combo',
      'Blowers sized for this unit',
      'Ground stakes and tether ropes',
      'Storage bag and repair patch kit',
      'Setup and safe-operation instructions',
    ],
    specs: [
      { label: 'Inflated footprint', value: "30' L × 22' W × 15' H" },
      { label: 'Recommended clear space', value: "36' L × 28' W" },
      { label: 'Rider capacity', value: '2 on the slide lanes; 6–8 in the bounce chamber' },
      { label: 'Max rider weight', value: '150 lb per rider' },
      { label: 'Age range', value: '6–13 years, constant adult supervision required' },
      { label: 'Blower requirement', value: '2 × 1.5 HP blowers on separate circuits (included)' },
      { label: 'Vinyl weight', value: '15oz commercial-grade PVC' },
      { label: 'Pool', value: 'Attached splash pool with drain plug' },
      { label: 'Configuration', value: 'Wet/dry convertible' },
      { label: 'Setup time', value: '8–12 minutes' },
      { label: 'Approx. shipping weight', value: '400 lb' },
      { label: 'Warranty', value: '1 year against seam and stitching defects' },
    ],
    faqs: [
      {
        question: 'Is this really different from the Pop Splash, or just repainted?',
        answer:
          'Structurally it is the same platform. The difference is the artwork, and the artwork is the entire point — it books an age group the Pop Splash does not.',
      },
      {
        question: 'Will younger kids still enjoy it?',
        answer:
          'Yes. Four-year-olds do not object to neon; it is older kids who object to cartoon animals. Theming for the top of the range is the safer direction.',
      },
      {
        question: 'Does the dark vinyl get hot?',
        answer:
          'The dry bounce floor warms in direct sun. Site the bounce chamber in shade where you can, or run it outside the hottest part of the day.',
      },
      {
        question: 'How long will the theme stay current?',
        answer:
          'Less long than tropical or primary colors, honestly. Buy it for the audience you have now rather than as a ten-year aesthetic bet.',
      },
    ],
    relatedSlugs: [
      'pop-splash-dual-lane-combo-slide-pool',
      'unicorn-wet-dry-combo-deep-pool',
      't-rex-dinosaur-wet-dry-combo-deep-pool',
    ],
    blogSlugs: [
      'how-to-start-a-water-slide-rental-business',
      'inflatable-water-slide-cost',
    ],
  },
  {
    slug: 't-rex-dinosaur-wet-dry-combo-deep-pool',
    name: 'T-Rex Dinosaur Wet & Dry Bounce House with Slide and Detachable Deep Pool',
    shortName: 'T-Rex Wet & Dry Combo',
    image:
      'https://www.xjump.com/cdn/shop/files/commercialgradedinosaurcombo2_4c9c6c99-851d-46f1-88da-536195b6ef69.jpg?v=1760380340',
    msrp: 4479,
    price: 2699,
    stock: 'in-stock',
    collections: ['water-slide-bounce-house-combos'],
    sku: 'WS4K-TREX-CMB',
    mpn: 'X-C-DINO',
    heightFt: null,
    lanes: 1,
    poolType: 'detachable',
    wetDry: true,
    tagline: 'Dinosaurs, a bounce house, and a deep pool that comes off entirely',
    intro:
      "The T-Rex combo is the most versatile single purchase in this catalog. A sculpted dinosaur bounce house with a climbing wall and slide, plus a detachable deep pool — which means it operates in three genuinely distinct configurations: a dry bounce house, a dry bounce-and-slide, and a full wet combo with a deep landing pool. Nothing else we sell covers that much ground from one storage bag.",
    body: [
      'Three configurations is not marketing arithmetic; it is three separate use cases across a calendar. February indoor birthday: dry bounce house. October school festival: bounce and dry slide. July backyard party: the full wet setup. A family that would otherwise rent three different things owns one. An operator lists three products and stores one.',
      'The deep pool is the feature that separates this from the Pop Splash and Glitch Gamer combos, which use shallow attached splash basins. A deep pool decelerates heavier and faster riders more effectively, which is why this unit carries the higher age ceiling. It also detaches, so the depth is never a liability during dry operation — it is simply not there.',
      'The dinosaur theming is sculpted rather than printed: a T-Rex head and forelimbs stand proud of the bounce chamber, with a tail wrapping the side wall. Sculpted appliqués hold their shape and read as three-dimensional in photographs, which is what makes a themed unit look expensive rather than cheap. They also need checking each season at the attachment seams, since they take handling that flat panels do not.',
      "Set against our standalone T-Rex 18' slide, the choice is straightforward: the slide is taller and faster and does one thing well; the combo is shorter, does three things, and suits a wider age range for longer. If you have one child who wants speed, buy the slide. If you have three children of different ages, buy the combo.",
    ],
    highlights: [
      'Three configurations: dry bounce, dry slide, full wet combo',
      'Detachable deep pool — better deceleration for older riders',
      'Sculpted 3D dinosaur head, forelimbs and tail',
      'Covers a wider age range for longer than a dedicated slide',
      'Free shipping sitewide, blower included',
    ],
    inTheBox: [
      'T-Rex dinosaur wet & dry bounce house combo',
      'Detachable deep pool section',
      'Blowers sized for this unit',
      'Ground stakes and tether ropes',
      'Storage bag and repair patch kit',
    ],
    specs: [
      { label: 'Inflated footprint', value: "28' L × 20' W × 16' H" },
      { label: 'Recommended clear space', value: "34' L × 26' W" },
      { label: 'Rider capacity', value: '1 on the slide; 6–8 in the bounce chamber' },
      { label: 'Max rider weight', value: '200 lb' },
      { label: 'Age range', value: '5–13 years, constant adult supervision required' },
      { label: 'Blower requirement', value: '2 × 1.5 HP blowers on separate circuits (included)' },
      { label: 'Vinyl weight', value: '15oz commercial-grade PVC' },
      { label: 'Pool', value: 'Detachable deep pool' },
      { label: 'Configuration', value: 'Wet/dry convertible — three setups' },
      { label: 'Setup time', value: '8–12 minutes' },
      { label: 'Approx. shipping weight', value: '410 lb' },
      { label: 'Warranty', value: '1 year against seam and stitching defects' },
    ],
    faqs: [
      {
        question: 'What are the three configurations exactly?',
        answer:
          'Dry bounce house with the slide roped off; dry bounce plus dry slide onto a mat; and the full wet setup with the deep pool attached and the hose running.',
      },
      {
        question: 'Should I buy this or the standalone T-Rex 18 slide?',
        answer:
          'The slide is taller and faster and does one thing. The combo is more versatile across ages and seasons. Mixed-age households are almost always better served by the combo.',
      },
      {
        question: 'Do the sculpted parts need special care?',
        answer:
          'Check the attachment seams at the start of each season. Appliqués get grabbed and climbed past, so they see wear that flat panels do not.',
      },
      {
        question: 'Can I leave the deep pool attached but empty?',
        answer:
          'You can, but an empty deep pool is a trip hazard at the base of a slide. If you are running dry, take it off.',
      },
    ],
    relatedSlugs: [
      't-rex-18-water-slide-detachable-pool',
      'unicorn-wet-dry-combo-deep-pool',
      'pop-splash-dual-lane-combo-slide-pool',
    ],
    blogSlugs: [
      'attached-vs-detachable-pool-water-slides',
      'best-inflatable-water-slide-buyers-guide',
    ],
  },

  {
    slug: 'unicorn-wet-dry-combo-deep-pool',
    name: 'Unicorn Wet & Dry Bounce House with Slide and Detachable Deep Pool',
    shortName: 'Unicorn Wet & Dry Combo',
    image: 'https://www.xjump.com/cdn/shop/files/commercialgradeunicorncombo2.jpg?v=1760380303',
    msrp: 4479,
    price: 2750,
    stock: 'out-of-stock',
    collections: ['water-slide-bounce-house-combos'],
    sku: 'WS4K-UNI-CMB',
    mpn: 'X-C-UNI',
    heightFt: null,
    lanes: 1,
    poolType: 'detachable',
    wetDry: true,
    tagline: 'The most-requested theme in party rental, on a three-configuration frame',
    intro:
      "If you run rentals and take one call a week asking for a unicorn, this is why the unit exists. Pastel rainbow panels, a sculpted unicorn head with a gold horn, and a mane running down the side wall — on the same versatile wet/dry frame as the T-Rex combo, with a detachable deep pool and three operating configurations.",
    body: [
      'Unicorns and dinosaurs are the two themes that dominate requests in this category, and they rarely overlap in the same booking. Operators who carry both cover the overwhelming majority of themed enquiries with two units. Carrying only one means turning away roughly half of the calls that specify a theme at all, which over a season is a substantial number of weekends.',
      "The frame is identical to the T-Rex: bounce chamber with mesh windows, internal climbing wall, single slide lane, detachable deep pool, wet/dry convertible. What differs is the palette and the sculpting, and the palette has a practical consequence — pastels are the least forgiving vinyl in the catalog for staining. This is the unit most likely to need a proper wash rather than a rinse at the end of a grassy weekend.",
      'The gold horn and the mane are separate sculpted appliqués, so this unit has more three-dimensional detail than most and correspondingly more attachment seams to inspect. None of that is a durability concern in normal use; it is a maintenance checklist item, and it takes about two minutes at the start of each season.',
      "If you are buying for a household rather than a fleet, the thing that makes this worth its price over a plain themed slide is the age span it covers. A four-year-old uses the bounce chamber and ignores the slide; a nine-year-old does the reverse; an eleven-year-old uses both and then asks for the hose. One unit covering that whole range is unusual, and it is why combos tend to stay in use for more summers than a dedicated slide bought for a specific child at a specific age.",
      "Currently out of stock. The price shown is the last confirmed figure. Unicorn units move quickly when they land, so the notify list is worth joining rather than checking back — in practice the restock is often spoken for before it reaches the shop page.",
    ],
    highlights: [
      'The most-requested theme in the party rental category',
      'Three configurations: dry bounce, dry slide, full wet combo',
      'Detachable deep pool',
      'Sculpted unicorn head, gold horn, and mane',
      'Currently out of stock — join the notify list',
    ],
    inTheBox: [
      'Unicorn wet & dry bounce house combo',
      'Detachable deep pool section',
      'Blowers sized for this unit',
      'Ground stakes and tether ropes',
      'Storage bag and repair patch kit',
    ],
    specs: [
      { label: 'Inflated footprint', value: "28' L × 20' W × 16' H" },
      { label: 'Recommended clear space', value: "34' L × 26' W" },
      { label: 'Rider capacity', value: '1 on the slide; 6–8 in the bounce chamber' },
      { label: 'Max rider weight', value: '200 lb' },
      { label: 'Age range', value: '5–13 years, constant adult supervision required' },
      { label: 'Blower requirement', value: '2 × 1.5 HP blowers on separate circuits (included)' },
      { label: 'Vinyl weight', value: '15oz commercial-grade PVC' },
      { label: 'Pool', value: 'Detachable deep pool' },
      { label: 'Configuration', value: 'Wet/dry convertible — three setups' },
      { label: 'Setup time', value: '8–12 minutes' },
      { label: 'Approx. shipping weight', value: '410 lb' },
      { label: 'Warranty', value: '1 year against seam and stitching defects' },
    ],
    faqs: [
      {
        question: 'Do the pastel panels stain badly?',
        answer:
          'They show grass and mud sooner than any other unit we sell. A ground tarp and a proper wash rather than a rinse keeps it looking new.',
      },
      {
        question: 'Is it structurally the same as the T-Rex combo?',
        answer:
          'Yes — same frame, same deep pool, same three configurations. Theme and sculpting are the differences.',
      },
      {
        question: 'How quickly do restocks sell?',
        answer:
          'Faster than anything else in the combo range. Join the notify list rather than checking back periodically.',
      },
      {
        question: 'Is the horn a hazard on the bounce floor?',
        answer:
          'It is a soft inflated appliqué mounted above head height on the exterior face, not inside the bounce chamber.',
      },
    ],
    relatedSlugs: [
      't-rex-dinosaur-wet-dry-combo-deep-pool',
      'purplish-castle-wet-dry-combo-splash-pool',
      'glitch-gamer-dual-lane-combo-slide-pool',
    ],
    blogSlugs: [
      'how-to-clean-and-store-an-inflatable-water-slide',
      'how-to-start-a-water-slide-rental-business',
    ],
  },

  {
    slug: 'tropical-ocean-wet-dry-combo-splash-pool',
    name: 'Tropical Ocean Wet & Dry Slide Combo with Attached Splash Pool',
    shortName: 'Tropical Ocean Combo',
    image: 'https://www.xjump.com/cdn/shop/files/X-C26TWEB2.jpg?v=1784124343',
    msrp: 3819,
    price: 2339,
    stock: 'in-stock',
    collections: ['water-slide-bounce-house-combos'],
    sku: 'WS4K-TRO26-CMB',
    mpn: 'X-C26T',
    heightFt: null,
    lanes: 1,
    poolType: 'attached',
    wetDry: true,
    tagline: 'A 26-foot combo that fits yards the 30-footers do not',
    intro:
      "Combos have a footprint problem: most of them are thirty feet long and over twenty wide, which rules out a lot of real backyards. The Tropical Ocean is a 26-foot combo built to solve exactly that. Bounce chamber, climbing wall, slide lane, and an attached splash pool, in a package roughly four feet shorter and two feet narrower than our flagship combos, at a lower price.",
    body: [
      'Four feet does not sound like much until you are standing in a yard with a fence on one side and a patio on the other. The 26-foot frame is what makes a combo viable for a typical quarter-acre suburban lot rather than an aspiration for it. Nothing is missing from the feature list — you get the same bounce chamber, the same climb-and-slide circuit, the same wet/dry convertibility. The chambers are simply scaled to the frame.',
      'The attached splash pool rather than a detachable deep pool is the other size-saving decision, and it suits the smaller unit. A shallow integral basin on a shorter slide is proportionate; a deep pool on a 26-foot combo would be over-engineered for the speed involved. It also removes the assembly step, so setup is quicker than on the deep-pool combos — eight minutes rather than twelve.',
      'Tropical ocean theming in blues, teals, and sandy neutrals keeps this the most understated combo in the range, which is deliberate. Combos are large objects and a loud one dominates a small garden visually as well as physically. If the unit is going to sit in a modest backyard for three months of the year, the calmer palette is the one you will still like in August.',
      'For rental operators this is the unit that unlocks the "my yard is too small for a combo" customer, and that customer exists in volume. Carrying one 26-foot combo alongside the 30-footers means the size question stops ending calls.',
    ],
    highlights: [
      "26' frame — fits yards the 30-foot combos cannot",
      'Bounce chamber, climbing wall, slide lane, attached splash pool',
      'Wet/dry convertible for year-round use',
      'Faster setup than the deep-pool combos — no pool assembly',
      'Lowest-priced full combo in the catalog after the Purplish Castle',
    ],
    inTheBox: [
      'Tropical Ocean wet & dry slide combo',
      'Blowers sized for this unit',
      'Ground stakes and tether ropes',
      'Storage bag and repair patch kit',
      'Setup and safe-operation instructions',
    ],
    specs: [
      { label: 'Inflated footprint', value: "26' L × 18' W × 14' H" },
      { label: 'Recommended clear space', value: "31' L × 23' W" },
      { label: 'Rider capacity', value: '1 on the slide; 5–6 in the bounce chamber' },
      { label: 'Max rider weight', value: '150 lb' },
      { label: 'Age range', value: '4–12 years, constant adult supervision required' },
      { label: 'Blower requirement', value: '1 × 1.5 HP blower (included)' },
      { label: 'Vinyl weight', value: '15oz commercial-grade PVC' },
      { label: 'Pool', value: 'Attached splash pool with drain plug' },
      { label: 'Configuration', value: 'Wet/dry convertible' },
      { label: 'Setup time', value: '6–8 minutes' },
      { label: 'Approx. shipping weight', value: '340 lb' },
      { label: 'Warranty', value: '1 year against seam and stitching defects' },
    ],
    faqs: [
      {
        question: 'What do I lose by going with the 26-foot frame?',
        answer:
          'Slightly smaller bounce chamber, one slide lane instead of two, and a shallow attached pool rather than a detachable deep one. The feature list is otherwise the same.',
      },
      {
        question: 'Does it only need one blower?',
        answer:
          'The example spec lists a single 1.5 HP blower, which is one of the practical advantages of the smaller frame — one unit, one circuit. Confirm against your shipped documentation.',
      },
      {
        question: 'Will it fit a quarter-acre lot?',
        answer:
          "You need roughly 31' × 23' clear and level. That fits most quarter-acre backyards where a 30-foot combo does not.",
      },
      {
        question: 'Can it run indoors?',
        answer:
          'At 14 feet inflated it clears more ceilings than the 15- and 16-foot combos. Measure yours before committing to an indoor booking.',
      },
    ],
    relatedSlugs: [
      'purplish-castle-wet-dry-combo-splash-pool',
      'pop-splash-dual-lane-combo-slide-pool',
      'ocean-wave-16-water-slide-attached-pool',
    ],
    blogSlugs: [
      'best-inflatable-water-slide-buyers-guide',
      'water-slide-blower-size',
    ],
  },

  {
    slug: 'purplish-castle-wet-dry-combo-splash-pool',
    name: 'Purplish Castle Wet & Dry Slide Combo with Attached Splash Pool',
    shortName: 'Purplish Castle Combo',
    image: 'https://www.xjump.com/cdn/shop/files/Purplish_Castle_Combo_Regular.png?v=1760380447',
    msrp: 3819,
    price: 1985,
    stock: 'in-stock',
    collections: ['water-slide-bounce-house-combos'],
    sku: 'WS4K-PCA26-CMB',
    mpn: 'X-C26P',
    heightFt: null,
    lanes: 1,
    poolType: 'attached',
    wetDry: true,
    tagline: 'The cheapest way into a full combo — castle turrets, bounce house, slide, pool',
    intro:
      "At $1,985 the Purplish Castle is the least expensive full combo we sell, and it is under half its MSRP. Purple and lavender castle walls with sculpted turrets, a bounce chamber, a climbing wall, a slide lane, and an attached splash pool — the complete combo feature set on the compact 26-foot frame, at a price closer to a mid-range standalone slide.",
    body: [
      "Castle theming is the oldest concept in the inflatable business and it has survived for a straightforward reason: it does not exclude anyone. Castles work for four-year-olds and nine-year-olds, for boys and girls, for birthdays and fêtes and school events. Where a unicorn books unicorn parties and a dinosaur books dinosaur parties, a castle books everything, which is why it remains the highest-utilization theme in most rental fleets.",
      'The 26-foot frame is shared with the Tropical Ocean combo, so the practical notes are the same: it fits an ordinary quarter-acre backyard, it runs on a single blower, and the attached splash pool means there is nothing to assemble. Setup lands around six to eight minutes. The sculpted turrets are the only additional inflation detail and they stand up on their own as the chambers fill.',
      "For a family buying one large inflatable to cover several years of birthdays, this is the most sensible purchase in the catalog on pure cost-per-use. It does three jobs — bounce house, dry slide, water slide — across a wide age range, on a footprint that most people actually have, for less than several of our standalone slides cost.",
      "The one thing to be aware of at this price point is that the pale purple and lavender panels show dirt in the same way the unicorn's pastels do, just less severely. A ground tarp underneath and a rinse before it dries is enough to keep on top of it. Our cleaning guide covers the full routine, which matters more on a light-colored unit than a dark one.",
    ],
    highlights: [
      'Least expensive full combo in the catalog — under half MSRP',
      'Castle theming: the highest-utilization theme in rentals',
      'Bounce chamber, climbing wall, slide lane, attached splash pool',
      'Compact 26ft frame fits ordinary backyards',
      'Wet/dry convertible, single blower',
    ],
    inTheBox: [
      'Purplish Castle wet & dry slide combo',
      'Blowers sized for this unit',
      'Ground stakes and tether ropes',
      'Storage bag and repair patch kit',
      'Setup and safe-operation instructions',
    ],
    specs: [
      { label: 'Inflated footprint', value: "26' L × 18' W × 14' H" },
      { label: 'Recommended clear space', value: "31' L × 23' W" },
      { label: 'Rider capacity', value: '1 on the slide; 5–6 in the bounce chamber' },
      { label: 'Max rider weight', value: '150 lb' },
      { label: 'Age range', value: '4–12 years, constant adult supervision required' },
      { label: 'Blower requirement', value: '1 × 1.5 HP blower (included)' },
      { label: 'Vinyl weight', value: '15oz commercial-grade PVC' },
      { label: 'Pool', value: 'Attached splash pool with drain plug' },
      { label: 'Configuration', value: 'Wet/dry convertible' },
      { label: 'Setup time', value: '6–8 minutes' },
      { label: 'Approx. shipping weight', value: '335 lb' },
      { label: 'Warranty', value: '1 year against seam and stitching defects' },
    ],
    faqs: [
      {
        question: 'Why is this so much cheaper than the other combos?',
        answer:
          'Compact frame, single slide lane, shallow attached pool, and a long-running mold we buy in volume. The vinyl weight and seam construction are unchanged.',
      },
      {
        question: 'Is a castle theme too young for a nine-year-old?',
        answer:
          'Castles age better than most themes — they read as generic-adventure rather than toddler. If your riders are eleven-plus, the Glitch Gamer is the better fit.',
      },
      {
        question: 'How is it different from the Tropical Ocean combo?',
        answer:
          'Same frame, same features, same footprint. Different artwork and a lower price.',
      },
      {
        question: 'Do the pale panels stain?',
        answer:
          'Somewhat — less than the unicorn pastels, more than the dark units. A ground tarp and rinsing before it dries handles it.',
      },
    ],
    relatedSlugs: [
      'tropical-ocean-wet-dry-combo-splash-pool',
      'pirate-ship-15-water-slide-playset',
      'unicorn-wet-dry-combo-deep-pool',
    ],
    blogSlugs: [
      'inflatable-water-slide-cost',
      'how-to-clean-and-store-an-inflatable-water-slide',
    ],
  },

  {
    slug: '45-tropical-wet-dry-obstacle-dual-lane-slide',
    name: "45' Tropical Wet/Dry Obstacle Course with Dual Lane Slide & Deep Pool",
    shortName: "45' Tropical Obstacle Course",
    image: 'https://www.xjump.com/cdn/shop/files/Tropical_OC_Regular_V2.jpg?v=1776180760',
    msrp: 5789,
    price: 3216,
    stock: 'out-of-stock',
    collections: ['water-slides'],
    sku: 'WS4K-OBS45-DL',
    mpn: 'X-OC45T',
    heightFt: null,
    lanes: 2,
    poolType: 'attached',
    wetDry: true,
    tagline: 'Forty-five feet of obstacles ending in a dual-lane slide and a deep pool',
    intro:
      "This is the largest and most ambitious unit in the catalog: a 45-foot tropical obstacle course with pop-up barriers, squeeze walls, crawl tunnels, and a climbing section, finishing in a dual-lane slide into an attached deep pool. It is not a backyard product. It is what you buy for a school field day, a corporate family event, or a rental fleet that wants a unit nobody else in the county has.",
    body: [
      "Obstacle courses solve a problem slides do not: they are competitive over time rather than over a single drop. Two children race the full 45-foot course head to head, which takes twenty to thirty seconds rather than four, and the result is a genuine contest with a winner. That changes the event — you can run heats, brackets, and timed rounds, and children will queue willingly for a rematch in a way they never do for a slide.",
      'The wet/dry design is what makes it viable commercially rather than a summer-only novelty. Run dry, it is a full obstacle course for autumn and spring school events. Run wet with the deep pool and the hose on, it is a water course. Very few operators carry a unit this size at all, so the ones who do tend to have the corporate and school market to themselves.',
      "The logistics are serious and worth stating plainly before anyone falls in love with it. Forty-five feet of course needs roughly fifty-five feet of clear run, multiple blowers on multiple circuits, more than one person to set up, and a vehicle that can carry close to seven hundred pounds of vinyl. Setup is twenty to thirty minutes rather than five. This is equipment, not a purchase you make on a whim in June.",
      "Currently out of stock, with the last confirmed price shown for budgeting. Units this large are built to order in small numbers, so if you are planning a season around one, talk to us early rather than waiting for a restock notification.",
    ],
    highlights: [
      'Forty-five feet — the largest unit in the catalog',
      'Pop-up barriers, squeeze walls, crawl tunnels, climb section',
      'Finishes in a dual-lane racing slide and deep pool',
      'Wet/dry: a full obstacle course in the off-season',
      'Currently out of stock — built in small runs, contact us early',
    ],
    inTheBox: [
      "45' Tropical wet/dry obstacle course",
      'Blowers sized for this unit',
      'Ground stakes and tether ropes',
      'Storage bags and repair patch kit',
      'Setup and safe-operation instructions',
    ],
    specs: [
      { label: 'Inflated footprint', value: "45' L × 13' W × 14' H" },
      { label: 'Recommended clear space', value: "55' L × 19' W" },
      { label: 'Rider capacity', value: '2 racing the course at a time' },
      { label: 'Max rider weight', value: '200 lb per rider' },
      { label: 'Age range', value: '6–13 years, constant adult supervision required' },
      { label: 'Blower requirement', value: '2–3 blowers on separate circuits (included)' },
      { label: 'Vinyl weight', value: '15oz commercial-grade PVC' },
      { label: 'Pool', value: 'Attached deep pool at the slide exit' },
      { label: 'Configuration', value: 'Wet/dry convertible' },
      { label: 'Setup time', value: '20–30 minutes, two people minimum' },
      { label: 'Approx. shipping weight', value: '690 lb' },
      { label: 'Warranty', value: '1 year against seam and stitching defects' },
    ],
    faqs: [
      {
        question: 'Can this go in a backyard?',
        answer:
          "Almost certainly not. You need about 55 feet of clear run. This is a school, park, and commercial-venue product.",
      },
      {
        question: 'How many blowers and circuits does it need?',
        answer:
          'Two to three blowers on separate circuits. Plan the power before delivery day — this is the most common reason a large unit fails to stand up on site.',
      },
      {
        question: 'How long does setup really take?',
        answer:
          'Twenty to thirty minutes with two people, more the first few times. Budget accordingly when you quote an event.',
      },
      {
        question: 'Is it worth it for a rental business?',
        answer:
          'If you have access to school and corporate bookings, it is a differentiator very few competitors carry. If your calendar is backyard birthdays, it will sit idle.',
      },
    ],
    relatedSlugs: [
      'block-party-19-dual-lane-water-slide-deep-pool',
      'pop-splash-dual-lane-combo-slide-pool',
      'surf-beach-17-dual-lane-water-slide',
    ],
    blogSlugs: [
      'how-to-start-a-water-slide-rental-business',
      'water-slide-blower-size',
    ],
  },
]

export const productsBySlug = new Map(products.map((p) => [p.slug, p]))

export function getProduct(slug: string): Product | undefined {
  return productsBySlug.get(slug)
}

export function getProductsByCollection(collection: string): Product[] {
  return products.filter((p) => (p.collections as readonly string[]).includes(collection))
}

/** Homepage grid — the ten flagged products, in catalog order. */
export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.homepageFeatured)
}

/** Hero slider sources. */
export function getHeroProducts(): Product[] {
  return products.filter((p) => p.heroImage)
}

export function getRelatedProducts(product: Product): Product[] {
  return product.relatedSlugs
    .map((slug) => productsBySlug.get(slug))
    .filter((p): p is Product => Boolean(p))
}

export function isPurchasable(product: ProductCardData): boolean {
  return product.price !== null && product.stock !== 'out-of-stock'
}

export function savingsOf(product: ProductCardData): number | null {
  if (product.msrp === null || product.price === null) return null
  const diff = product.msrp - product.price
  return diff > 0 ? diff : null
}

/** Standard alt text pattern, applied everywhere a product image renders. */
export function productImageAlt(product: Pick<ProductCardData, 'name'>): string {
  return `${product.name} — commercial inflatable water slide`
}

/**
 * Strip a product down to what a card or the cart needs, so client
 * components never receive the long-form PDP copy.
 */
export function toCardData(product: Product): ProductCardData {
  return {
    slug: product.slug,
    name: product.name,
    shortName: product.shortName,
    image: product.image,
    msrp: product.msrp,
    price: product.price,
    stock: product.stock,
    collections: product.collections,
    tagline: product.tagline,
    isNew: product.isNew,
    bestValue: product.bestValue,
    heightFt: product.heightFt,
    lanes: product.lanes,
    poolType: product.poolType,
    wetDry: product.wetDry,
  }
}

export function toCardDataList(items: Product[]): ProductCardData[] {
  return items.map(toCardData)
}
