import { products } from './products'
import type { FaqItem, Product } from './types'

export interface CopySection {
  heading: string
  paragraphs: string[]
  list?: string[]
}

export interface Collection {
  slug: string
  /** Full route, so height pages and topic collections can differ in shape. */
  href: string
  name: string
  h1: string
  /** ≤60 characters. */
  title: string
  /** 150–160 characters. */
  metaDescription: string
  primaryKeyword: string
  secondaryKeywords: string[]
  tagline: string
  intro: string
  /** 800+ words of supporting copy, rendered BELOW the product grid. */
  sections: CopySection[]
  faqs: FaqItem[]
  /** Product whose photo represents the collection on tiles. */
  tileProductSlug: string
  accent: 'splash-blue' | 'hot-coral' | 'grape' | 'lime-pop'
  match: (p: Product) => boolean
}

/* ------------------------------------------------------------------ */
/* Topic collections — the four in the main navigation                 */
/* ------------------------------------------------------------------ */

export const topicCollections: Collection[] = [
  {
    slug: 'water-slides',
    href: '/collections/water-slides',
    name: 'Water Slides',
    h1: 'Inflatable Water Slides',
    title: 'Inflatable Water Slide | 12–19ft | WaterSlides4Kids',
    metaDescription:
      'Shop commercial-grade inflatable water slides from 12ft to 19ft. 15oz PVC vinyl, blower included, free shipping sitewide. Find the right slide for your yard.',
    primaryKeyword: 'inflatable water slide',
    secondaryKeywords: ['blow up water slide', 'water slide with pool', 'giant inflatable water slide'],
    tagline: 'Every slide we carry, from a 12ft first slide to a 19ft flagship',
    intro:
      'This is the full range — single lane and dual lane, attached pools and detachable pools, twelve feet up to nineteen. Every unit is built from 15oz commercial PVC vinyl and ships with a blower and free shipping sitewide.',
    sections: [
      {
        heading: 'How to choose an inflatable water slide',
        paragraphs: [
          'There are only four decisions that actually matter when you buy an inflatable water slide, and everything else is decoration. Height determines who will use it and whether it fits your site. Lane count determines throughput. Pool type determines how many months a year the slide earns its keep. Vinyl weight determines whether you are buying it once or buying it again in two summers. Get those four right and the theme is a matter of taste.',
          'Height is the decision people get wrong most often, and they get it wrong in the same direction every time — they buy taller than their kids will use. A 19-foot slide is genuinely impressive and a genuinely long climb, and a six-year-old will do it four times and then go inside. A 13-foot slide gets ridden until dinner. Match the height to the youngest regular rider, not to the oldest, unless the oldest is the only one who matters.',
          'Site constraints come next, and the constraint that disqualifies most yards is not lawn area — it is what is above the lawn. Every slide here lists a recommended clear footprint, but you also need unobstructed sky: tree canopy, gutters, floodlights, and overhead service drops all matter. Walk out and look up before you measure anything on the ground.',
        ],
      },
      {
        heading: 'Single lane or dual lane?',
        paragraphs: [
          'A single lane is wider and more forgiving. Riders who go down sideways, off-centre, or on their stomachs have room, and the slide feels roomier to a hesitant child. If your typical crowd is a handful of kids, a single lane is not a bottleneck and the second lane buys you nothing except a wider footprint and a higher price.',
          'A dual lane changes the social dynamic rather than merely doubling capacity. Two lanes turn a queue into a race. Kids self-organise into head-to-head heats and the waiting stops feeling like waiting. The crossover point in practice is somewhere around eight to ten simultaneous riders — below that, single lane is the better buy; above it, dual lane is the difference between a slide that entertains for forty minutes and one that runs all afternoon.',
        ],
      },
      {
        heading: 'Attached pools versus detachable pools',
        paragraphs: [
          'An attached pool is a single inflated chamber continuous with the slide body. There is nothing to align, nothing to assemble, and — importantly — no detach seam, which is the joint that gets stressed every time a pool is fitted and removed and the first place a well-used slide starts to weep. Attached-pool units set up fastest, typically three to four minutes, and they are the more durable choice for a slide that will be used hard every weekend all summer.',
          'A detachable pool buys you a second product. Take the pool off and the slide runs dry into a landing mat, which means indoor events, fall festivals, and school days when nobody wants to be soaked. For families that is two or three extra months of use each year; for rental operators it is a second listing at no extra inventory cost. The cost is one more assembly step and one more part to store.',
        ],
      },
      {
        heading: 'Why vinyl weight is the only spec worth arguing about',
        paragraphs: [
          'Every slide on this page is built from 15oz commercial-grade PVC with quadruple-stitched seams. That is not a marketing line, it is the difference between a product with a decade in it and a product with a season. A big-box inflatable at a superficially similar price is typically 6 to 9oz PVC with double-stitched seams, engineered for roughly twenty uses before the seams start to go.',
          'The cost comparison only makes sense over time. A cheaper slide replaced every second summer costs more across five years than a commercial unit bought once, and it fails at the least convenient moment — usually mid-party, usually at a seam. Commercial vinyl is also thicker underfoot, which changes how the lane feels: it does not stretch and thin out under a heavy rider the way light vinyl does.',
          'The other half of longevity is not the vinyl at all, it is the drying routine. Vinyl put away damp grows mildew that etches the coating and voids most warranties. Twenty minutes of drying before the slide goes in the bag is what separates three seasons from ten, and it costs nothing.',
        ],
      },
      {
        heading: 'Blowers, power, and setup',
        paragraphs: [
          'These are constant-airflow inflatables. The blower runs continuously for the whole session — it is not a seal-and-forget product, and there is no configuration where you inflate it and unplug. Every slide here ships with a blower sized for that unit, so you are not buying air separately.',
          'The larger units — anything nineteen feet, and the bigger combos and obstacle courses — need two or more blowers, and those blowers need separate circuits. Two outlets on the same circuit is the single most common reason a large inflatable fails to stand up on delivery day, and it is entirely avoidable with five minutes of planning beforehand.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What size inflatable water slide do I need for a backyard?',
        answer:
          'Most suburban backyards comfortably take a 13ft to 16ft slide. Check the recommended clear footprint on each product page and, more importantly, check overhead clearance — tree branches and service drops disqualify more sites than lawn size does.',
      },
      {
        question: 'Do your inflatable water slides come with a blower?',
        answer:
          'Yes. Every slide ships with a blower sized for that unit, along with stakes, tether ropes, a storage bag, and a repair patch kit.',
      },
      {
        question: 'How long does an inflatable water slide take to set up?',
        answer:
          'Three to five minutes for a single-lane slide with an attached pool. Add a few minutes for a detachable pool, and budget ten to fifteen for the 19ft units and large combos.',
      },
      {
        question: 'Can inflatable water slides be used on concrete?',
        answer:
          'Grass is preferable because you can stake it. On a hard surface you need sandbags or ballast instead of stakes, and a protective tarp underneath. Never operate an unanchored inflatable.',
      },
    ],
    tileProductSlug: 'tropical-breeze-15-dual-lane-waterslide',
    accent: 'splash-blue',
    match: (p) => p.collections.includes('water-slides'),
  },

  {
    slug: 'dual-lane-water-slides',
    href: '/collections/dual-lane-water-slides',
    name: 'Dual Lane Water Slides',
    h1: 'Dual Lane Water Slides',
    title: 'Dual Lane Water Slide | Race Two Riders | WaterSlides4Kids',
    metaDescription:
      'Dual lane inflatable water slides from 12ft to 19ft. Two racing lanes double your throughput and end the queue. Commercial 15oz vinyl, blower included.',
    primaryKeyword: 'dual lane water slide',
    secondaryKeywords: ['double lane inflatable slide', 'racing water slide', 'two lane water slide'],
    tagline: 'Two lanes, half the waiting, and a race at the end of every climb',
    intro:
      'Every double-lane slide we carry, from a 12ft backload racer for preschoolers to the 19ft flagship. Two riders at a time, one climbing wall, and a queue that keeps moving.',
    sections: [
      {
        heading: 'What a second lane actually buys you',
        paragraphs: [
          'The obvious answer is throughput, and the obvious answer is incomplete. A single-lane slide cycles roughly one rider every eight to ten seconds once you account for the climb. Two lanes on the same climbing wall roughly halve the effective wait — but the more important effect is what it does to the children rather than to the numbers.',
          'Two lanes turn a queue into a contest. Riders pair up at the top and go together, and the entire social experience changes: instead of standing in line, kids are organising heats, calling rematches, and arguing about who cheated. At a birthday party with fifteen guests, that is the difference between a slide that is exhausted in forty minutes and one that runs until the parents call time.',
          'It also solves the sibling problem, which anyone with two children under ten will recognise. On a single lane, one child rides while the other waits, and the waiting is where the arguments happen. On a dual lane they go together, every time, and the argument never starts.',
        ],
      },
      {
        heading: 'When a single lane is the better buy',
        paragraphs: [
          'Dual lane is not automatically the upgrade. A single lane is wider for the same overall footprint, which makes it more forgiving for young or hesitant riders — there is room to go down sideways, off-centre, or clutching a parent’s hand at the top without threading a gap. Wide and gentle beats narrow and fast for a nervous five-year-old.',
          'A dual-lane unit is also physically wider, and width is the dimension most backyards run out of first. If your yard is long and narrow, a single-lane slide of the same height will fit where a racer will not. And at equivalent height and build quality, the single lane costs less — money that could buy you three more feet of height instead.',
        ],
      },
      {
        heading: 'Lane dividers, fairness, and why one lane can feel faster',
        paragraphs: [
          'The lane divider on a well-built racer is a full-height inflated baffle rather than a stitched-on ridge. That matters at speed: a low divider lets riders drift together toward the bottom, which is exactly where they are travelling fastest. Every dual-lane slide in this collection uses a full-height divider.',
          'Manufactured lanes are mirrored — same slope, same drop, same surface — so a fair race comes down to the riders. When one lane consistently feels faster, the cause is almost always ground that is not level. Level the site and the difference disappears. It is worth checking with a spirit level rather than by eye, because a slope you cannot see is a slope a nine-year-old will absolutely notice and complain about.',
        ],
      },
      {
        heading: 'Choosing a height in the dual lane range',
        paragraphs: [
          'Our dual-lane slides span 12 to 19 feet, and the height brackets map cleanly onto ages. The 12ft and 13ft racers suit three- to nine-year-olds and are the ones a small child will ride all afternoon without needing a boost up the climbing wall. The 15ft and 17ft racers are the family and rental standard — fast enough for older kids, still placeable in a normal yard.',
          'The 19ft dual-lane units are a different category of purchase. They generate real speed, they use deep pools rather than splash basins to decelerate riders, they need two blowers on separate circuits, and they need close to twenty-five feet of clear sky. They are outstanding at school field days and commercial events, and they are the wrong answer for a quarter-acre lot regardless of how much lawn you have.',
        ],
      },
      {
        heading: 'Dual lane for rental operators',
        paragraphs: [
          'If you are buying to rent, dual lane is usually where to start. Large events are where the money is, and large events need throughput — a single-lane unit at a school fun day produces a queue that becomes the organiser’s problem and, next year, someone else’s booking. A racer handles the crowd and gets rebooked.',
          'The units that combine dual lanes with a detachable pool are the most flexible inventory you can hold, because the same frame produces a summer water rental and a dry autumn and winter rental. One storage footprint, one truck load, two listings.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Are both lanes on a dual lane water slide the same speed?',
        answer:
          'Yes — the lanes are mirrored with identical slope, drop, and surface. If one feels faster, the ground is not level. Check with a spirit level rather than by eye.',
      },
      {
        question: 'Does a dual lane slide need more space than a single lane?',
        answer:
          'More width, roughly the same length. Width is the dimension most backyards run out of first, so measure across before you commit.',
      },
      {
        question: 'How many kids can use a dual lane slide at once?',
        answer:
          'One rider per lane, so two at a time. Sending two down the same lane together removes the room each rider needs to decelerate.',
      },
      {
        question: 'Is a dual lane slide worth the extra cost for a family?',
        answer:
          'If you have two or more children close in age, yes — it removes the waiting that causes most of the arguing. For an only child, spend the difference on height instead.',
      },
    ],
    tileProductSlug: 'rocket-rush-17-dual-lane-water-slide',
    accent: 'hot-coral',
    match: (p) => p.collections.includes('dual-lane-water-slides'),
  },

  {
    slug: 'water-slide-bounce-house-combos',
    href: '/collections/water-slide-bounce-house-combos',
    name: 'Bounce House Combos',
    h1: 'Bounce House with Water Slide Combos',
    title: 'Bounce House With Water Slide | Wet Dry Combo | WS4K',
    metaDescription:
      'Wet/dry bounce house and water slide combos. Bounce chamber, climbing wall, slide and splash pool in one unit. Commercial 15oz vinyl, blower included.',
    primaryKeyword: 'bounce house with water slide',
    secondaryKeywords: ['wet dry combo bounce house', 'inflatable combo with slide', 'bouncy castle with water slide'],
    tagline: 'Bounce house, climbing wall, slide and pool — one unit, one setup',
    intro:
      'Combo units put a bounce chamber, a climbing wall, one or two slide lanes and a splash pool into a single inflatable. Every combo here is wet/dry convertible, so it works indoors in February and in the backyard in July.',
    sections: [
      {
        heading: 'Why a combo instead of two separate inflatables',
        paragraphs: [
          'The case for a combo is that children do not all want the same thing at the same time. Put a bounce house and a water slide in a yard and you have two attractions and two queues; put a combo in the same yard and you have a circuit. Kids bounce, climb, slide, splash, and walk back in, and they find that loop by themselves within about ninety seconds of the blower starting.',
          'The economics are equally straightforward. A bounce house plus a water slide bought separately costs more than a combo, needs two blowers, two setups, and twice the storage. A combo consolidates all of it into one purchase with one footprint. For rental operators, a combo lists as a premium item precisely because it replaces two rentals — the customer pays more and you deliver one item to one address.',
          'The trade-off is that you cannot split it. Two separate units can be at two addresses on the same Saturday; a combo cannot. If you are building a rental fleet rather than buying for a household, that is worth thinking about before you standardise on combos.',
        ],
      },
      {
        heading: 'What wet/dry convertible actually means',
        paragraphs: [
          'Every combo in this collection runs in at least two configurations. Plug the pool drain, leave the hose off, and the unit is a bounce house with dry slides — which is what makes it viable for an indoor birthday in February, a school gym day, or an autumn festival. Open it up, attach the hose, and it is a water park.',
          'The units with detachable deep pools go one step further and offer three configurations: dry bounce house with the slide roped off, dry bounce plus dry slide onto a mat, and the full wet setup. That is genuinely three products from one storage bag, and it is why the deep-pool combos command a higher price than the fixed splash-basin models.',
          'The one thing to check before promising an indoor booking is ceiling height. Our combos inflate to between 14 and 16 feet. That clears some gymnasiums and no domestic ceilings, so measure rather than assume.',
        ],
      },
      {
        heading: 'Footprint: the thing people underestimate',
        paragraphs: [
          'Combos are wide as well as long, because the bounce chamber sits beside the slide rather than under it. A 30-foot combo typically needs something in the region of 36 by 28 feet of clear ground — noticeably more width than a dedicated slide of similar length. If your yard is long and narrow, a standalone slide will serve you better.',
          'The 26-foot combos exist specifically to solve this. They carry the same feature set — bounce chamber, climbing wall, slide lane, attached splash pool, wet/dry conversion — in a frame roughly four feet shorter and two feet narrower, which is what makes a combo viable on an ordinary quarter-acre lot rather than an aspiration for one. They also tend to run on a single blower rather than two.',
        ],
      },
      {
        heading: 'Supervision inside a combo',
        paragraphs: [
          'A combo has two areas that need watching rather than one, which is a genuine operational difference from a plain slide. The bounce chamber and the pool are separate zones and a single adult cannot properly watch both at a busy party. Plan for two supervising adults whenever the unit is in full use.',
          'Every combo we carry uses mesh windows on all sides of the bounce chamber, which is the detail that makes single-point supervision workable at quieter moments — you can see every child inside from outside the unit without climbing in. Combined with a backload or internal climbing wall, it keeps climbers and riders from crossing paths.',
        ],
      },
      {
        heading: 'Choosing a theme that keeps earning',
        paragraphs: [
          'Theme matters more on combos than on plain slides, because combos are the premium item in a rental fleet and they are the one customers request by name. Castles are the highest-utilisation theme in the business for a simple reason — they exclude nobody, and they book birthdays, fêtes, school events, and community days equally.',
          'Character themes book harder and narrower. Unicorns and dinosaurs are the two most requested concepts in the category and they rarely overlap in the same booking, so carrying both covers most themed enquiries. And there is a real gap at the top of the age range: nine- to thirteen-year-olds find cartoon animals embarrassing but still want to bounce, which is a market almost nobody serves.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can a bounce house water slide combo be used indoors?',
        answer:
          'Yes, in dry configuration — plug the pool drain and leave the hose off. The constraint is ceiling height: our combos inflate to 14–16 feet, which clears some gymnasiums and no domestic ceilings.',
      },
      {
        question: 'How much space does a bounce house with water slide need?',
        answer:
          "A 30ft combo needs roughly 36' × 28' of clear, level ground. The 26ft combos need about 31' × 23', which is what makes them workable on a typical quarter-acre lot.",
      },
      {
        question: 'Is a combo better value than a separate bounce house and slide?',
        answer:
          'For a household, almost always — one purchase, one setup, one storage bag. For a rental fleet it depends, because a combo cannot be at two addresses on the same day.',
      },
      {
        question: 'How many blowers does a combo need?',
        answer:
          'The 26ft combos generally run on one. The 30ft units need two, on separate circuits — not two outlets on the same circuit.',
      },
    ],
    tileProductSlug: 'pop-splash-dual-lane-combo-slide-pool',
    accent: 'grape',
    match: (p) => p.collections.includes('water-slide-bounce-house-combos'),
  },

  {
    slug: 'backyard-water-slides',
    href: '/collections/backyard-water-slides',
    name: 'Backyard Water Slides',
    h1: 'Backyard Inflatable Water Slides',
    title: 'Backyard Inflatable Water Slide | Fits Normal Yards',
    metaDescription:
      'Backyard inflatable water slides sized for real yards — 12ft to 15ft, compact footprints, commercial 15oz vinyl and a blower included. Free shipping sitewide.',
    primaryKeyword: 'backyard inflatable water slide',
    secondaryKeywords: ['residential water slide for sale', 'home water slide', 'water slide for backyard'],
    tagline: 'The slides that actually fit a normal yard',
    intro:
      'Every slide in this collection is sized for a residential lot: compact footprints, modest overhead clearance, single-blower power, and setup times measured in minutes. No trailer, no crew, no second circuit.',
    sections: [
      {
        heading: 'What makes a slide a backyard slide',
        paragraphs: [
          'It is not height alone. A backyard slide is one where all four practical constraints line up: it fits the ground you have, it clears whatever is above it, it runs off a single household circuit, and one adult can set it up alone in a few minutes. A slide that fails any one of those is a commercial unit that happens to be short.',
          'Overhead clearance is the constraint that disqualifies most residential sites, and it is the one nobody checks. Mature trees, gutters, floodlights, and the overhead service drop from the street all occupy the airspace a slide needs. Every unit in this collection tops out at fifteen feet or under, which clears the majority of suburban tree lines — a 19-foot flagship needs close to twenty-five feet of clear sky and simply will not go up on most lots.',
          'Power is the second quiet constraint. The larger slides in our catalogue need two blowers on two separate circuits, which in a typical house means running a cable to a different room. Everything here runs on one blower and one outlet.',
        ],
      },
      {
        heading: 'Measuring your yard properly',
        paragraphs: [
          'Take the recommended clear footprint from the product page and add walking room on all sides — you need to get around the unit to stake it, to supervise, and to reach the drain plug. Then check the ground is level. A slope you cannot see by eye will make one lane of a racer faster than the other and will pool water at one end of the landing basin.',
          'Then look up, and look up from where the slide will actually stand rather than from the patio. Branch spread looks very different from underneath. If a limb is within a couple of feet of the inflated height, either trim it or size down — a slide that rubs against a branch every time it shifts in the wind will wear through the vinyl long before the seams give out.',
          'Finally, work out where the water goes. Every landing pool drains, and a few hundred gallons has to end up somewhere that is not your neighbour’s lawn or your own foundation. Site the unit so the drain plug faces downhill toward a soakaway or a drain.',
        ],
      },
      {
        heading: 'Grass, concrete, and anchoring',
        paragraphs: [
          'Grass is the preferred surface because you can stake into it, and staking is not optional. Every unit here ships with stakes and tether ropes and they are the difference between an inflatable and a very large kite — a moderate gust under an unanchored slide will move it, with children inside.',
          'On a hard surface, stakes are replaced by sandbags or ballast at every anchor point, plus a protective tarp underneath to keep the vinyl off abrasive concrete. A tarp is worth putting down on grass too: it keeps the base clean, which matters more than it sounds on the pale-coloured units, and it makes drying and packing away considerably faster.',
        ],
      },
      {
        heading: 'Buying for the age you have, not the age you want',
        paragraphs: [
          'The most common mistake in this category is buying taller than the household will use. A 15-foot slide is more impressive than a 13-foot one and it is also a longer climb, and for a five- or six-year-old the climb is work. Parents consistently report the same pattern: the taller slide gets ridden a handful of times and abandoned, the shorter one runs all afternoon.',
          'Match the height to your youngest regular rider. If your children are four to eight, a 12ft or 13ft unit is very likely the right purchase and the money you did not spend buys several more summers of use. If they are already nine or ten, size up to 15ft — they will outgrow anything shorter within a season or two.',
          'The one genuine exception is a household with a wide age spread. In that case a dual-lane 13-footer, or a wet/dry combo, covers more of the range than any single-lane slide at any height, because there is more than one thing to do.',
        ],
      },
      {
        heading: 'Residential use, commercial build',
        paragraphs: [
          'Nothing in this collection is a lightweight consumer product. These are the same 15oz commercial PVC panels and quadruple-stitched seams as the units rental companies run forty weekends a year, in smaller frames. A big-box inflatable at a superficially similar price is typically 6 to 9oz vinyl designed for around twenty uses.',
          'That distinction is the whole argument for buying a commercial-grade slide for domestic use. A cheap slide replaced every second summer costs more over five years than a good one bought once, and it tends to fail at a seam, mid-party, with a garden full of children waiting. Buy once, dry it properly before it goes in the bag, and a backyard slide will outlast the children it was bought for.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What size water slide fits a typical backyard?',
        answer:
          'A 12ft to 15ft unit fits most suburban lots. Check the recommended clear footprint on the product page, add walking room on all sides, and confirm overhead clearance before you order.',
      },
      {
        question: 'Can I put an inflatable water slide on concrete or a driveway?',
        answer:
          'Yes, with sandbags or ballast at every anchor point instead of stakes, and a tarp underneath to protect the vinyl. Never operate an unanchored inflatable on any surface.',
      },
      {
        question: 'Will a backyard water slide ruin my lawn?',
        answer:
          'A slide left up for several days will yellow the grass underneath, and the constant water will saturate the ground. Move it between uses where you can, and put a tarp down.',
      },
      {
        question: 'Do I need a special electrical circuit?',
        answer:
          'Not for these units — every slide in this collection runs on a single blower from a standard household outlet. Give it its own outlet rather than sharing with a sound system.',
      },
    ],
    tileProductSlug: 'ocean-shark-15-water-slide-detachable-pool',
    accent: 'lime-pop',
    match: (p) => p.collections.includes('backyard-water-slides'),
  },
]

/* ------------------------------------------------------------------ */
/* Height collections — search demand here is dominated by size        */
/* modifiers ("15 ft water slide for sale"), and almost nobody builds  */
/* landing pages for them.                                             */
/* ------------------------------------------------------------------ */

export const heightCollections: Collection[] = [
  {
    slug: '13-ft-water-slides',
    href: '/collections/13-ft-water-slides',
    name: "12–13 ft Water Slides",
    h1: "13 ft Water Slides for Sale",
    title: '13 ft Water Slide for Sale | Ages 3–9 | WaterSlides4Kids',
    metaDescription:
      'Shop 12ft and 13ft inflatable water slides built for ages 3–9. Compact footprints, single-blower power, commercial 15oz vinyl. Free shipping sitewide.',
    primaryKeyword: '13 ft water slide for sale',
    secondaryKeywords: ['12 ft water slide', 'small inflatable water slide', 'toddler water slide'],
    tagline: 'The height small children actually use — all afternoon, without a boost',
    intro:
      'Twelve and thirteen foot slides are the right purchase for households whose riders are three to nine. Short enough to climb unassisted, small enough to fit a narrow yard, and gentle enough that a nervous four-year-old will go down a second time.',
    sections: [
      {
        heading: 'Why 13 feet is the right height for young riders',
        paragraphs: [
          'Height sells slides and shorter slides get used. That is not a contradiction — it is the single most consistent pattern in this category. A tall slide has a long climb, and for a five-year-old the climb is work rather than part of the fun. They will do it four or five times and then find something easier. A 13-foot slide is climbable in a few seconds and gets ridden until someone calls them in.',
          'The drop is gentler too, which matters for hesitant riders. Confidence compounds: a child who enjoys their first ride goes again immediately, while a child who finds the first one frightening may not go back at all that day. For the three-to-eight bracket the shorter slide is not a compromise, it is the correct specification.',
        ],
      },
      {
        heading: 'Footprint and yard fit',
        paragraphs: [
          'These are the smallest units we carry, and they fit sites that nothing else will. A 13-foot single-lane slide typically needs around 29 by 17 feet of clear ground, and the 12-foot Safari is smaller still — which brings townhouse lots, long narrow gardens, and side yards into play.',
          'Overhead clearance is rarely the blocker at this height. Thirteen feet clears almost every suburban tree line and every domestic service drop, which is exactly why this bracket is the easiest to place. Width is the dimension to check, particularly if you are considering the 13ft dual-lane racer.',
        ],
      },
      {
        heading: 'Racing at 13 feet',
        paragraphs: [
          'Most dual-lane slides start at 15 feet, which forces families with young children to choose between racing and a height their kids will use. The 13-foot Tropic Tide Double Racer and the 12-foot Block Party backload racer both solve that — two full lanes on a small frame, in roughly the ground area of a single-lane 15-footer.',
          'For a household with two or three children under nine, that is very likely the best purchase in our entire catalogue. Racing removes the waiting, and the waiting is where the arguing happens.',
        ],
      },
      {
        heading: 'The honest limitation',
        paragraphs: [
          'Older children outgrow this bracket. A twelve-year-old will ride a 13-foot slide, enjoy it, and ask when you are getting a bigger one. If your oldest child is already nine or ten, buy a 15-footer instead and get several more years out of it.',
          'The exception is a wide age spread, where a 13ft dual-lane racer often beats a 15ft single lane — the youngest can use it independently and the oldest still gets a race.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is a 13 ft water slide big enough to be fun?',
        answer:
          'For three- to nine-year-olds, comfortably. Thirteen feet reads as small to an adult and enormous to a five-year-old, and the short climb is what keeps them cycling through it.',
      },
      {
        question: 'How much space does a 13 ft water slide need?',
        answer:
          "Around 29' × 17' of clear, level ground for a single lane, plus walking room. The 12ft units need slightly less.",
      },
      {
        question: 'Can I get a dual lane slide at this height?',
        answer:
          'Yes — the 13ft Tropic Tide Double Racer and the 12ft Block Party backload racer both put two full lanes on a small frame.',
      },
    ],
    tileProductSlug: 'summer-breeze-13-water-slide-with-pool',
    accent: 'lime-pop',
    match: (p) => p.heightFt !== null && p.heightFt <= 13,
  },

  {
    slug: '15-ft-water-slides',
    href: '/collections/15-ft-water-slides',
    name: '15–16 ft Water Slides',
    h1: '15 ft Water Slides for Sale',
    title: '15 ft Water Slide for Sale | Best-Selling Height | WS4K',
    metaDescription:
      'Shop 15ft and 16ft inflatable water slides — our best-selling height. Fits most suburban yards, suits ages 5–12. Commercial 15oz vinyl, blower included.',
    primaryKeyword: '15 ft water slide for sale',
    secondaryKeywords: ['16 ft water slide', '15 foot inflatable slide', 'water slide with pool 15ft'],
    tagline: 'The height we sell most of, and the one most families should buy',
    intro:
      'Fifteen and sixteen foot slides are the centre of this market for good reason: tall enough to hold a ten-year-old’s attention, small enough to fit a standard suburban lot, and light enough on power to run from a single blower.',
    sections: [
      {
        heading: 'Why this bracket outsells everything else',
        paragraphs: [
          'Fifteen feet sits at the point where two curves cross. Below it you start losing older children, who find the drop tame by about nine or ten. Above it you start losing yards, because seventeen and nineteen foot units need clearance that a lot of suburban lots do not have. Fifteen to sixteen feet is where the largest number of households can have the largest amount of slide.',
          'It is also the bracket with the most choice. Single lane and dual lane, attached pools and detachable pools, character themes and neutral ones — whatever combination of features matters to you, it exists at this height, which is not true at 12 feet or at 19.',
        ],
      },
      {
        heading: 'Fifteen versus sixteen feet',
        paragraphs: [
          'One foot of height is not a meaningful performance difference and nobody should choose on that basis. What actually separates the units in this bracket is lane count, pool type, and the slope profile of the lane itself.',
          'Our 16-foot single-lane slides use a shallower initial pitch, so riders accelerate through the middle third rather than immediately off the platform — which is what makes them workable for five- and six-year-olds. The 15-foot dual-lane racers are steeper off the top and built for speed and competition. Pick on ride character and configuration, not on the twelve inches.',
        ],
      },
      {
        heading: 'Fitting a 15 ft slide in a suburban yard',
        paragraphs: [
          'Plan on roughly 34 to 36 feet of length and 18 to 22 feet of width depending on lane count, plus walking room to stake and supervise. That fits most quarter-acre lots comfortably.',
          'Overhead is where this bracket starts to need checking. Fifteen to sixteen feet clears most mature suburban tree lines but not all of them, and it is close enough to typical service-drop heights that it is worth looking rather than assuming. Stand where the slide will go and look straight up.',
        ],
      },
      {
        heading: 'The best all-round buy in the catalogue',
        paragraphs: [
          'If you are buying one slide for a household with children between five and twelve and you want to stop thinking about it, this bracket is the answer. It covers the widest age range, fits the most sites, runs on one blower, and sets up in three to five minutes.',
          'For rental operators it is the volume workhorse — light enough to handle solo, placeable at almost any residential booking, and cheap enough to own several. The 17-foot units are the ones you add when you start taking larger events.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is a 15 ft water slide too big for a backyard?',
        answer:
          "It fits most quarter-acre lots — plan for roughly 34' × 18' plus walking room. Check overhead clearance, which is what usually rules out a site rather than lawn area.",
      },
      {
        question: 'What age is a 15 ft water slide suitable for?',
        answer:
          'Broadly five to twelve. The 16ft single-lane units with a shallower initial pitch suit the younger end; the 15ft dual-lane racers suit the older end.',
      },
      {
        question: 'Does a 15 ft slide need two blowers?',
        answer:
          'No — everything in this bracket runs on a single blower from a standard household outlet. Two blowers become necessary at 19 feet and on the larger combos.',
      },
    ],
    tileProductSlug: 'ocean-wave-16-water-slide-attached-pool',
    accent: 'splash-blue',
    match: (p) => p.heightFt !== null && p.heightFt >= 14 && p.heightFt <= 16,
  },

  {
    slug: '17-ft-water-slides',
    href: '/collections/17-ft-water-slides',
    name: '17–18 ft Water Slides',
    h1: '17 ft Water Slides for Sale',
    title: '17 ft Water Slide for Sale | Rental Fleet Standard',
    metaDescription:
      'Shop 17ft and 18ft inflatable water slides — the height most rental fleets standardise on. Real speed, single-trailer transport, commercial 15oz vinyl.',
    primaryKeyword: '17 ft water slide for sale',
    secondaryKeywords: ['18 ft water slide', 'tall inflatable water slide', 'commercial water slide 17ft'],
    tagline: 'Where the curve peaks for rental operators — speed without a nineteen-footer’s problems',
    intro:
      'Seventeen and eighteen foot slides deliver genuine speed, clear most tree lines, and still fit on a single trailer without specialist equipment. It is the height most professional fleets standardise on.',
    sections: [
      {
        heading: 'Why operators standardise here',
        paragraphs: [
          'Seventeen feet is the practical peak of the size-versus-placeability curve. It generates enough speed to satisfy eight- to thirteen-year-olds, who are the hardest group to impress. It clears the tree line at the majority of sites. And it fits on a standard trailer and through a standard gate, which nineteen-foot units frequently do not.',
          'That last point is worth dwelling on if you are buying to rent. A unit you cannot get into a customer’s backyard is a refunded booking and a wasted Saturday. Seventeen feet is the largest size that reliably goes where you are asked to put it.',
        ],
      },
      {
        heading: 'What changes at this height',
        paragraphs: [
          'Speed changes the requirements. Slides in this bracket use longer runouts than the 15- and 16-foot units — the lane keeps descending well past the point where a shorter slide has flattened out, and that extended runout is what bleeds velocity before the rider reaches the pool. It also means the footprint is longer than people expect. Measure length, not just width.',
          'Power changes too. The dual-lane 17-footers need two blowers on separate circuits, which is a genuine planning item rather than a footnote — two outlets on the same circuit is the most common reason a large inflatable fails to stand up on site.',
        ],
      },
      {
        heading: 'Pool depth at seventeen feet',
        paragraphs: [
          'This bracket is where deep pools start to appear, and the reason is physics rather than marketing: a rider arriving from seventeen feet carries more energy than one arriving from thirteen, and more water depth is what absorbs it. A deep pool is worth paying for if your riders skew older and heavier.',
          'Deep pools also demand more supervision. There is no configuration in which a pool of any depth should be left unwatched, and that goes double at the heights where the pool is doing real deceleration work.',
        ],
      },
      {
        heading: 'Seventeen feet in a backyard',
        paragraphs: [
          'It is possible on larger residential lots, and it is worth being clear about what disqualifies the rest. You need roughly 42 feet of length, 24 feet of width for a dual lane, and — critically — genuinely unobstructed sky at seventeen feet plus a margin.',
          'If your yard fails on overhead rather than ground area, size down to the 15–16ft bracket rather than trimming a mature tree. A slide that rubs a branch every time it shifts in the wind will wear through the vinyl long before the seams give out.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is a 17 ft water slide too tall for a backyard?',
        answer:
          'It works on larger residential lots. You need about 42ft of length, 24ft of width for a dual lane, and unobstructed sky at 17ft plus margin — the overhead is what usually rules a site out.',
      },
      {
        question: 'Why do 17 ft slides need two blowers?',
        answer:
          'Air volume. A taller, wider structure holds more air than a single blower can keep pressurised. Run them on separate circuits, not two outlets on one circuit.',
      },
      {
        question: 'Do I need a deep pool at this height?',
        answer:
          'It helps if your riders are older and heavier — more depth absorbs more energy. Either way the pool must never be left unsupervised.',
      },
    ],
    tileProductSlug: 'surf-beach-17-dual-lane-water-slide',
    accent: 'grape',
    match: (p) => p.heightFt !== null && p.heightFt >= 17 && p.heightFt <= 18,
  },

  {
    slug: '19-ft-and-taller-water-slides',
    href: '/collections/19-ft-and-taller-water-slides',
    name: '19 ft & Taller Water Slides',
    h1: '19 ft and Taller Water Slides for Sale',
    title: '19 ft Water Slide for Sale | Giant Inflatable Slides',
    metaDescription:
      'Giant 19ft inflatable water slides with deep pools, dual lanes and two-blower power. Built for school events, festivals and commercial rental fleets.',
    primaryKeyword: '19 ft water slide for sale',
    secondaryKeywords: ['20 ft water slide for sale', 'giant inflatable water slide', 'commercial grade water slide'],
    tagline: 'Flagship units for events, not for backyards',
    intro:
      'Nineteen feet is where an inflatable stops being a backyard purchase and becomes equipment. Deep pools, dual lanes, multiple blowers on multiple circuits, and the footprint of a small building.',
    sections: [
      {
        heading: 'A different category of purchase',
        paragraphs: [
          'Nineteen feet is a threshold rather than an increment. The drop is long enough to generate real speed, which is why every unit in this bracket uses a deep pool rather than a shallow splash basin — the extra water depth is doing genuine deceleration work, not decoration.',
          'That speed also changes the supervision requirement. These are not units you set up and glance at occasionally. Constant, attentive adult supervision at both the platform and the pool is a condition of operating them safely, and if you cannot staff that, buy a smaller slide.',
        ],
      },
      {
        heading: 'What it takes to put one up',
        paragraphs: [
          'Plan for roughly 46 feet of length, 26 feet of width, and about 25 feet of unobstructed overhead once you allow margin for the structure shifting in the wind. Overhead clearance is what disqualifies the overwhelming majority of residential sites — tree canopy, gutters, floodlights, and service drops all sit in the airspace these units need.',
          'Power is the second gate. Two blowers minimum, on two separate circuits. Not two outlets on the same circuit. Sort this out before delivery day rather than on it, because it is the single most common reason a flagship unit fails to stand up on site.',
          'Then there is the physical logistics. Four hundred and seventy pounds of vinyl needs a vehicle that can carry it and more than one person to handle it. Setup is ten to fifteen minutes with a crew, not three minutes alone.',
        ],
      },
      {
        heading: 'Who these are actually for',
        paragraphs: [
          'School field days, municipal events, church festivals, corporate family days, and rental fleets that want the unit nobody else in the county has. At those events the height is the draw — it is the thing people photograph and the thing that appears on next year’s flyer.',
          'For a rental operator, a flagship is a marketing asset as much as a revenue line. It is also a demanding first purchase: bigger truck, longer setup, more power, more staff. Most operators start with a 17-footer and add a nineteen once the calendar justifies it.',
        ],
      },
      {
        heading: 'Single lane or dual lane at nineteen feet',
        paragraphs: [
          'Dual lane is the right answer for volume. A 19-foot single lane cycles slowly because the climb is long, and at a school event that produces a queue that becomes somebody’s problem. Two lanes roughly halve the wait.',
          'The single-lane nineteen-footer exists for venues that want maximum drama rather than maximum throughput. All the structure goes into one lane, producing the widest slide surface and the longest continuous runout we sell — and it costs less than the dual-lane flagships.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can a 19 ft water slide go in a backyard?',
        answer:
          'Rarely. The blocker is overhead clearance rather than lawn area — you need around 25 feet of unobstructed sky, which is taller than most tree canopies and lower than most service drops.',
      },
      {
        question: 'How many blowers does a 19 ft slide need?',
        answer:
          'Two minimum, on two separate circuits. Sharing a single circuit will trip it, and that is the most common cause of a failed setup on delivery day.',
      },
      {
        question: 'Do you sell a 20 ft water slide?',
        answer:
          'Nineteen feet is currently the tallest slide in our range. The 45ft wet/dry obstacle course is our largest unit overall by footprint.',
      },
    ],
    tileProductSlug: 'block-party-19-dual-lane-water-slide-deep-pool',
    accent: 'hot-coral',
    match: (p) => p.heightFt !== null && p.heightFt >= 19,
  },
]

export const allCollections: Collection[] = [...topicCollections, ...heightCollections]

export function getCollection(slug: string): Collection | undefined {
  return allCollections.find((c) => c.slug === slug)
}

export function getCollectionProducts(collection: Collection): Product[] {
  return products.filter(collection.match)
}

/** Word count of the below-grid copy — used by the content audit script. */
export function collectionWordCount(collection: Collection): number {
  const text = [
    collection.intro,
    ...collection.sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.list ?? [])]),
    ...collection.faqs.flatMap((f) => [f.question, f.answer]),
  ].join(' ')
  return text.split(/\s+/).filter(Boolean).length
}
