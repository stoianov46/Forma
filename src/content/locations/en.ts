import type { Location } from '../../lib/types';

export const locationsEn: Omit<Location, 'translations'>[] = [
  {
    slug: 'koh-phangan',
    tier: 'primary',
    image: 'hero-villa',
    featuredServiceSlugs: ['villa-design', 'architecture', 'construction', 'turnkey-projects'],
  },
  {
    slug: 'koh-samui',
    tier: 'primary',
    image: 'pool-villa',
    featuredServiceSlugs: ['villa-design', 'turnkey-projects', 'project-management'],
  },
  {
    slug: 'koh-tao',
    tier: 'primary',
    image: 'design',
    featuredServiceSlugs: ['villa-design', 'renovation', 'construction-supervision'],
  },
  {
    slug: 'bali',
    tier: 'primary',
    image: 'interior',
    featuredServiceSlugs: ['villa-design', 'interior-design', 'eco-construction'],
  },
  {
    slug: 'thong-sala',
    tier: 'secondary',
    parentSlug: 'koh-phangan',
    image: 'construction',
    featuredServiceSlugs: ['renovation', 'project-management'],
  },
  {
    slug: 'sri-thanu',
    tier: 'secondary',
    parentSlug: 'koh-phangan',
    image: 'design',
    featuredServiceSlugs: ['villa-design', 'eco-construction'],
  },
  {
    slug: 'haad-rin',
    tier: 'secondary',
    parentSlug: 'koh-phangan',
    image: 'construction',
    featuredServiceSlugs: ['turnkey-projects', 'project-management'],
  },
  {
    slug: 'chaloklum',
    tier: 'secondary',
    parentSlug: 'koh-phangan',
    image: 'pool-villa',
    featuredServiceSlugs: ['villa-design', 'renovation'],
  },
  {
    slug: 'baan-tai',
    tier: 'secondary',
    parentSlug: 'koh-phangan',
    image: 'architecture',
    featuredServiceSlugs: ['villa-design', 'landscape-design'],
  },
  {
    slug: 'haad-yao',
    tier: 'secondary',
    parentSlug: 'koh-phangan',
    image: 'hero-villa',
    featuredServiceSlugs: ['villa-design', 'interior-design'],
  },
  {
    slug: 'haad-salad',
    tier: 'secondary',
    parentSlug: 'koh-phangan',
    image: 'pool-villa',
    featuredServiceSlugs: ['villa-design', 'landscape-design'],
  },
];

export const locationsEnContent: Record<string, Location['translations']['en']> = {
  'koh-phangan': {
    seo: {
      title: 'Architecture & Villa Design on Koh Phangan | FORMA',
      description:
        'FORMA is based on Koh Phangan, designing and building villas, interiors and full design-build projects across the island — from Thong Sala to Haad Rin.',
    },
    name: 'Koh Phangan',
    h1: 'Architecture & Design-Build, Rooted on Koh Phangan',
    directAnswer:
      'FORMA is based on Koh Phangan and designs, builds and supervises villas and interiors island-wide, working directly with the terrain, zoning and logistics specific to each district. Projects range from the quieter west coast to the developed south, and each is planned around its own slope, access and building conditions.',
    intro:
      'Koh Phangan rewards architecture that understands its terrain: steep interior hills, a coastline that shifts character from the busy south to the quiet, forested north-west, and a construction supply chain that runs through Surat Thani and Ko Samui before reaching site by boat or barge. We work across the island\'s districts, and this local presence shapes every recommendation we make, from realistic construction schedules around the monsoon to material choices that hold up to salt air and humidity without constant upkeep.',
    context:
      'The island is administratively part of Surat Thani province and has its own building and land-use considerations distinct from mainland Thailand. Plot characteristics vary enormously across a short distance — a flat beachfront lot in Thong Sala behaves nothing like a terraced hillside plot above Sri Thanu — so we treat each district\'s conditions as a distinct design input rather than applying one standard approach island-wide.',
    logistics:
      'Materials and equipment typically arrive via the mainland and are barged or ferried to the island, which means procurement lead times need realistic planning, particularly for imported finishes or heavy equipment. We sequence construction schedules around vessel availability and the wetter months of the monsoon season, building that logistics reality into the project programme from the outset rather than treating it as an unplanned delay.',
    faqs: [
      {
        q: 'Which parts of Koh Phangan do you work in?',
        a: 'We work island-wide, with particular depth of experience in Thong Sala, Sri Thanu, Haad Rin, Chaloklum, Baan Tai, Haad Yao and Haad Salad — see each area\'s page for local specifics.',
      },
      {
        q: 'How does construction logistics work on an island?',
        a: 'Materials and equipment are brought over via the mainland and barged or ferried to site; we plan procurement and scheduling around realistic transport lead times rather than mainland assumptions.',
      },
      {
        q: 'Are building regulations on Koh Phangan different from mainland Thailand?',
        a: 'Specific requirements depend on zoning and the relevant local authority for your plot; our Permits & Planning service manages this confirmation carefully for each site rather than assuming a single blanket rule.',
      },
      {
        q: 'Can you manage a project on Koh Phangan while I am overseas?',
        a: 'Yes, structured reporting and scheduled video reviews are standard for our overseas clients, most of whom cannot be on-site continuously through design and construction.',
      },
      {
        q: 'What terrain challenges are common on the island?',
        a: 'Steep interior slopes, variable soil conditions and monsoon drainage are common considerations; our architecture and construction teams design and build around these from the earliest site survey.',
      },
      {
        q: 'Do you also work on nearby islands?',
        a: 'Yes, we work on Koh Samui, Koh Tao and in Bali as well — see our Locations page for details on each.',
      },
    ],
    ctaHeading: 'Have land on Koh Phangan?',
    ctaBody: 'Tell us where it is and what you have in mind. We know this island\'s terrain well.',
  },
  'koh-samui': {
    seo: {
      title: 'Villa Architecture & Construction on Koh Samui | FORMA',
      description:
        'FORMA designs and builds villas and manages design-build projects on Koh Samui, extending our Koh Phangan practice to the island\'s residential and hospitality market.',
    },
    name: 'Koh Samui',
    h1: 'Villa Design & Construction on Koh Samui',
    directAnswer:
      'FORMA extends its Koh Phangan practice to Koh Samui, delivering villa architecture, interiors and design-build construction for the island\'s established residential and hospitality market. The same site-first design method is applied to Samui\'s terrain, road access and contractor networks, with each project planned around its own plot.',
    intro:
      'Koh Samui\'s more developed infrastructure — an international airport, deeper contractor and supply networks, and a mature hospitality sector — creates different opportunities and constraints than Koh Phangan. We bring the same disciplined, site-responsive design approach to Samui commissions, while working within its more established permitting and construction ecosystem.',
    context:
      'Samui\'s residential and hospitality development is more mature than Koh Phangan\'s, with established zones for villa and resort construction alongside protected areas. Hillside plots with sea views remain in high demand, and design here must balance ambitious massing with the practical realities of an increasingly regulated and competitive building environment.',
    logistics:
      'Samui\'s better-developed port and airport infrastructure generally shortens procurement lead times compared with Koh Phangan, though hillside access and steep private roads still require careful planning for delivery vehicles and construction equipment on many sites.',
    faqs: [
      {
        q: 'Do you have a permanent presence on Koh Samui?',
        a: 'Our base is on Koh Phangan; we run Samui projects with the same design and construction team, with site visit frequency scoped to each project\'s needs.',
      },
      {
        q: 'Is construction easier on Samui than Koh Phangan?',
        a: 'Logistics are generally more straightforward given Samui\'s infrastructure, though site-specific challenges like hillside access still require the same careful planning.',
      },
      {
        q: 'Can you design a villa for a hospitality operator on Samui?',
        a: 'Yes, hospitality-oriented villa and small resort design is a regular part of our Samui work, coordinated closely with our Project Management service.',
      },
      {
        q: 'What areas of Koh Samui do you work in?',
        a: 'We work island-wide based on project location and site conditions; contact us with your specific plot for a scoped discussion.',
      },
    ],
    ctaHeading: 'Planning a project on Koh Samui?',
    ctaBody: 'Tell us about your site and goals, and we will scope how our team can support it.',
  },
  'koh-tao': {
    seo: {
      title: 'Villa Design & Renovation on Koh Tao | FORMA',
      description:
        'FORMA designs, renovates and supervises villa construction on Koh Tao, working with the island\'s compact plots and dive-tourism-driven property market.',
    },
    name: 'Koh Tao',
    h1: 'Villa Design & Renovation on Koh Tao',
    directAnswer:
      'FORMA provides villa design, renovation and construction supervision on Koh Tao, working within the island\'s compact plot sizes and a property market shaped heavily by dive tourism and smaller-scale residential development. Projects are planned around steep terrain, limited access and the practical logistics of building on a small island.',
    intro:
      'Koh Tao is smaller and more compact than Koh Phangan or Samui, with plots that reward efficient, carefully considered design over sheer scale. Much of our work here involves renovation and upgrading of existing properties alongside select new villa design, reflecting the island\'s more built-out coastline.',
    context:
      'Property on Koh Tao is closely tied to its dive-tourism economy, with many buildings serving as guesthouses, dive-operator accommodation or small rental villas alongside private residences. Compact plots and steep terrain in places call for design solutions that make efficient use of limited footprint without feeling cramped.',
    logistics:
      'As one of the smaller islands in the group, Koh Tao\'s procurement and logistics require realistic lead-time planning similar to Koh Phangan, with materials arriving by boat; we plan schedules accordingly, particularly for larger deliveries.',
    faqs: [
      {
        q: 'Do you take on smaller renovation projects on Koh Tao?',
        a: 'Yes, renovation and upgrade work on existing, often compact properties is a significant part of our Koh Tao portfolio.',
      },
      {
        q: 'Can you design a small guesthouse or dive-operator accommodation?',
        a: 'Yes, we design for the island\'s tourism-driven property types as well as private villas, with attention to durability and guest-turnover practicality.',
      },
      {
        q: 'Is construction supervision available for Koh Tao if we cannot be on-site?',
        a: 'Yes, independent construction supervision is available for clients building or renovating remotely.',
      },
      {
        q: 'What terrain considerations are specific to Koh Tao?',
        a: 'Compact, sometimes steep plots and limited footprint are common; design solutions focus on spatial efficiency and considered access rather than scale.',
      },
    ],
    ctaHeading: 'Have a property on Koh Tao?',
    ctaBody: 'Tell us its condition, size and what you want it to become.',
  },
  bali: {
    seo: {
      title: 'Villa Design & Interior Architecture in Bali | FORMA',
      description:
        'FORMA extends its tropical design-build practice to Bali, delivering villa design, interiors and eco-conscious construction across the island.',
    },
    name: 'Bali',
    h1: 'Villa Design & Interiors in Bali',
    directAnswer:
      'FORMA applies its tropical, site-first design method to Bali, delivering villa architecture, interior design and eco-conscious construction for clients building in Indonesia\'s most established tropical villa market. Each project begins with a review of the plot, local building conditions and access before any design starts.',
    intro:
      'Bali\'s villa design culture is more mature and internationally visible than Koh Phangan\'s, with a sophisticated market for architecture that blends tropical modernism with local craft traditions. Our Bali commissions draw on the same climate-first design discipline we apply across Thailand, adapted to Bali\'s specific building culture, materials and regulatory environment.',
    context:
      'Villa development in Bali spans established hubs with dense, competitive design markets alongside quieter areas where larger plots and rice-field or coastal outlooks remain available. Local building traditions, joinery craft and material availability differ meaningfully from Thailand, and our Bali projects are scoped with that context specifically in mind.',
    logistics:
      'Bali\'s well-developed construction industry offers strong access to skilled joinery and stone craft locally; project logistics are planned around Indonesian import and building-permit processes, which differ from Thailand\'s and are confirmed project by project with local partners.',
    faqs: [
      {
        q: 'Do you have a permanent team based in Bali?',
        a: 'Bali projects are delivered by our core design team in coordination with vetted local construction and permitting partners familiar with Indonesian regulations.',
      },
      {
        q: 'How does working with FORMA in Bali differ from Thailand?',
        a: 'The design method is consistent, but construction delivery and permitting are coordinated through local Indonesian partners given the different regulatory environment.',
      },
      {
        q: 'Can you design in a specific regional Bali architectural style?',
        a: 'Yes, we work with clients who want a strong reference to Balinese craft and material traditions as well as those seeking a more restrained contemporary tropical aesthetic.',
      },
      {
        q: 'Do you handle interior design for Bali villas as well?',
        a: 'Yes, interior design is available for Bali projects, drawing on the island\'s strong local joinery and stone craft traditions.',
      },
    ],
    ctaHeading: 'Building in Bali?',
    ctaBody: 'Tell us about your site and vision, and we will confirm how our team and local partners can support it.',
  },
  'thong-sala': {
    seo: {
      title: 'Villa Design in Thong Sala, Koh Phangan | FORMA',
      description:
        'Architecture, renovation and project management for villas and properties in Thong Sala, Koh Phangan\'s main town and port area.',
    },
    name: 'Thong Sala',
    h1: 'Building in Thong Sala',
    directAnswer:
      'Thong Sala is Koh Phangan\'s main town and port, combining commercial density with residential development. FORMA designs and renovates villas and manages projects here with particular attention to access, drainage and the practical logistics of the island\'s primary arrival point, where materials, contractors and services are closest to hand.',
    intro:
      'As the island\'s administrative and commercial centre, Thong Sala offers strong infrastructure and access — the main pier, markets, schools and services — making it a practical base for both full-time residents and rental property owners. Design here often balances proximity to town amenities against the need for privacy and quiet within a busier district.',
    context: 'Thong Sala\'s flatter terrain and established road network simplify some aspects of construction access compared with hillside districts, while its proximity to the port makes it a natural staging point for materials heading elsewhere on the island.',
    logistics:
      'Being adjacent to the main pier, Thong Sala generally offers the most straightforward material logistics on the island, an advantage for larger renovation or construction projects.',
    faqs: [
      {
        q: 'Is Thong Sala a good area for a full-time residence?',
        a: 'Yes, its access to schools, healthcare, markets and the main pier make it popular with long-term residents who want convenience alongside island living.',
      },
      {
        q: 'Do you renovate existing properties in Thong Sala?',
        a: 'Yes, renovation of existing town and near-town properties is a regular part of our Thong Sala work.',
      },
      {
        q: 'Is construction logistics easier here than elsewhere on the island?',
        a: 'Generally yes, given proximity to the main pier and more developed road access, though specific plot conditions still determine the full logistics picture.',
      },
    ],
    ctaHeading: 'Have a property in Thong Sala?',
    ctaBody: 'Tell us what you are planning and we will scope the practicalities with you.',
  },
  'sri-thanu': {
    seo: {
      title: 'Villa Design in Sri Thanu, Koh Phangan | FORMA',
      description:
        'Custom villa design and eco-conscious construction in Sri Thanu, Koh Phangan\'s west-coast area known for sunset views and a quieter residential character.',
    },
    name: 'Sri Thanu',
    h1: 'Villa Design in Sri Thanu',
    directAnswer:
      'Sri Thanu\'s west-facing coastline and quieter, more residential character make it a popular area for custom villa design. FORMA designs here with particular attention to sunset orientation, privacy and the terraced hillside conditions common to the area, so each house sits comfortably on its slope and keeps its outlook.',
    intro:
      'Sri Thanu has developed a reputation as one of Koh Phangan\'s more design-conscious residential areas, drawing owners who want a quieter alternative to the island\'s southern hubs without sacrificing sea access and views. Hillside plots with unobstructed west-facing outlooks are especially sought after for their sunset orientation.',
    context:
      'Many Sri Thanu plots sit on sloped terrain requiring careful foundation and retaining strategy, and the area\'s popularity with design-focused owners has raised the general standard of architecture expected here.',
    logistics:
      'Hillside access roads in Sri Thanu can be narrow, requiring construction logistics planning specific to each plot, particularly for larger deliveries and equipment.',
    faqs: [
      {
        q: 'What makes Sri Thanu popular for villa design?',
        a: 'Its west-facing orientation for sunset views, quieter residential character and generally more sloped, characterful terrain than flatter parts of the island.',
      },
      {
        q: 'Are Sri Thanu plots typically sloped?',
        a: 'Many are, which we treat as a design opportunity for split-level planning and dramatic view capture rather than purely a constraint.',
      },
      {
        q: 'Do you handle eco-conscious design here specifically?',
        a: 'Yes, Sri Thanu\'s clientele frequently prioritises passive design and sustainable material choices, which we scope through our Eco Construction service.',
      },
    ],
    ctaHeading: 'Have a plot in Sri Thanu?',
    ctaBody: 'Tell us about its slope and orientation, and we will assess what it supports.',
  },
  'haad-rin': {
    seo: {
      title: 'Villa & Hospitality Design in Haad Rin, Koh Phangan | FORMA',
      description:
        'Villa and hospitality design-build in Haad Rin, Koh Phangan\'s busiest southern beach district, with project management suited to higher-density development.',
    },
    name: 'Haad Rin',
    h1: 'Design-Build in Haad Rin',
    directAnswer:
      'Haad Rin is Koh Phangan\'s busiest beach district, with a dense mix of hospitality and residential property. FORMA designs and manages villa and small hospitality projects here with attention to noise, density and commercial viability alongside architectural quality, so a building works for guests, neighbours and the operating budget alike.',
    intro:
      'As the island\'s best-known nightlife and beach hub, Haad Rin presents a distinct brief: properties here often serve rental or hospitality income alongside private use, and design decisions — soundproofing, guest privacy, durability under heavier turnover — reflect that dual purpose more than in quieter districts.',
    context:
      'Land here is more built-out and commercially oriented than much of the island, with development density that rewards efficient, well-managed project delivery over sprawling footprints.',
    logistics:
      'Construction logistics in Haad Rin benefit from established road access, though site congestion during peak tourist periods can affect delivery scheduling, which we plan around.',
    faqs: [
      {
        q: 'Do you design villas intended for rental income in Haad Rin?',
        a: 'Yes, rental and hospitality-oriented villa design is common here, with attention to durability and guest experience built into the brief from the outset.',
      },
      {
        q: 'Can you manage a hospitality development project in this area?',
        a: 'Yes, our Project Management and Turnkey services are well suited to hospitality-oriented developments in higher-density areas like Haad Rin.',
      },
      {
        q: 'Are noise and privacy design concerns addressed for this location?',
        a: 'Yes, acoustic and privacy considerations are treated as core brief requirements given the area\'s activity levels, not an afterthought.',
      },
    ],
    ctaHeading: 'Planning a project in Haad Rin?',
    ctaBody: 'Tell us whether it is for private use, rental or hospitality, and we will scope accordingly.',
  },
  chaloklum: {
    seo: {
      title: 'Villa Design in Chaloklum, Koh Phangan | FORMA',
      description:
        'Villa design and renovation in Chaloklum, Koh Phangan\'s north-coast fishing village area, known for a quieter pace and bay-facing outlooks.',
    },
    name: 'Chaloklum',
    h1: 'Villa Design in Chaloklum',
    directAnswer:
      'Chaloklum\'s north-coast fishing-village character and sheltered bay make it attractive for quieter, more private villa projects. FORMA designs here with attention to the area\'s working-harbour setting and bay-facing outlooks, keeping buildings modest in scale, well ventilated and respectful of the neighbouring village and its everyday activity.',
    intro:
      'Chaloklum retains much of its identity as a working fishing community, giving it a different character from the island\'s more tourism-oriented beaches. Villa projects here tend to favour a quieter, more understated design language that respects the surrounding village context while making the most of sheltered bay views.',
    context:
      'The area\'s more traditional village fabric and working harbour mean new development is generally more modest in scale, and we design with sensitivity to that surrounding context rather than imposing an oversized statement building.',
    logistics:
      'Chaloklum\'s coastal road access is generally serviceable for standard construction logistics, with the working harbour offering an additional, though informal, delivery option for some materials.',
    faqs: [
      {
        q: 'Is Chaloklum suitable for a quiet, private villa?',
        a: 'Yes, its village character and lower density make it well suited to owners seeking privacy and a slower pace over proximity to nightlife or commercial hubs.',
      },
      {
        q: 'Do you design in keeping with the local village character?',
        a: 'Yes, we design new villas to sit comfortably within Chaloklum\'s existing scale and fabric rather than dominating it.',
      },
      {
        q: 'Are renovation projects common in this area?',
        a: 'Yes, renovation of existing properties near the village and along the bay is a regular part of our work here.',
      },
    ],
    ctaHeading: 'Have a site near Chaloklum?',
    ctaBody: 'Tell us about the plot and the pace of life you want to design around.',
  },
  'baan-tai': {
    seo: {
      title: 'Villa Design in Baan Tai, Koh Phangan | FORMA',
      description:
        'Villa design and landscape-integrated architecture in Baan Tai, Koh Phangan\'s south-coast residential area between Thong Sala and Haad Rin.',
    },
    name: 'Baan Tai',
    h1: 'Villa Design in Baan Tai',
    directAnswer:
      'Baan Tai sits along the south coast between Thong Sala and Haad Rin, offering a more residential setting with reasonable access to both. FORMA designs villas here with a focus on landscape integration and a calmer setting close to established infrastructure, using the plot\'s shade, breeze and privacy as the starting point.',
    intro:
      'Baan Tai occupies a practical middle ground on the island — close enough to Thong Sala\'s services and Haad Rin\'s energy to stay convenient, while retaining a more residential, less commercial character of its own. Plots here often support generous garden and landscape integration alongside the villa itself.',
    context:
      'The area\'s mix of flatter and gently sloped terrain supports a range of villa configurations, and its proximity to established roads simplifies day-to-day access considerably compared with more remote parts of the island.',
    logistics:
      'Baan Tai benefits from its position along the island\'s main southern road corridor, generally straightforward for construction access and material delivery.',
    faqs: [
      {
        q: 'Is Baan Tai a good balance between convenience and quiet?',
        a: 'Yes, its position between Thong Sala and Haad Rin offers reasonable access to both without the density of either.',
      },
      {
        q: 'Do plots here typically support larger gardens?',
        a: 'Many do, and we frequently integrate substantial landscape design as part of villa projects in this area.',
      },
      {
        q: 'Is construction access generally straightforward here?',
        a: 'Yes, proximity to the main southern road corridor generally simplifies logistics compared with more remote hillside districts.',
      },
    ],
    ctaHeading: 'Considering a plot in Baan Tai?',
    ctaBody: 'Tell us about the site, and we will assess what it supports.',
  },
  'haad-yao': {
    seo: {
      title: 'Villa Design in Haad Yao, Koh Phangan | FORMA',
      description:
        'Villa and interior design in Haad Yao, Koh Phangan\'s west-coast beach area known for its long sandy shoreline and sunset outlook.',
    },
    name: 'Haad Yao',
    h1: 'Villa Design in Haad Yao',
    directAnswer:
      'Haad Yao\'s long, west-facing beach makes it a sought-after location for villas designed around sea access and sunset views. FORMA designs here with attention to beachfront setbacks and the coastal microclimate of this shoreline, including salt exposure, wind and afternoon sun, which shape the orientation, materials and detailing of each house.',
    intro:
      'Haad Yao\'s extended sandy beach and gentler west-coast character make it attractive to owners who want direct sea proximity in a setting less developed than the island\'s southern hubs. Villa design here typically centres on maximising the relationship to the beach while respecting the specific setback and environmental considerations of a beachfront site.',
    context:
      'Beachfront and near-beachfront plots carry specific environmental and setback considerations that are confirmed early in our site review, alongside the practical realities of building close to the shoreline\'s salt and moisture exposure.',
    logistics:
      'Coastal road access serves most of Haad Yao adequately for standard construction logistics, with beachfront sites requiring extra care around material staging given limited direct beach access for vehicles.',
    faqs: [
      {
        q: 'Are there specific rules for building near the beach in Haad Yao?',
        a: 'Beachfront and near-beachfront development is subject to setback and environmental considerations confirmed for the specific plot; our Permits & Planning service manages this review carefully.',
      },
      {
        q: 'Is Haad Yao good for sunset-oriented villa design?',
        a: 'Yes, its west-facing shoreline is a strong draw for villas designed around sunset outlook and beach access.',
      },
      {
        q: 'How is coastal exposure managed in material selection here?',
        a: 'Material specification accounts for the shoreline\'s higher salt and moisture exposure, favouring finishes proven to hold up under those conditions.',
      },
    ],
    ctaHeading: 'Have beachfront land in Haad Yao?',
    ctaBody: 'Tell us about the plot\'s setback and orientation, and we will assess the design possibilities.',
  },
  'haad-salad': {
    seo: {
      title: 'Villa Design in Haad Salad, Koh Phangan | FORMA',
      description:
        'Villa and landscape design in Haad Salad, a quieter north-west Koh Phangan beach area favoured for privacy and coral-reef-adjacent snorkelling access.',
    },
    name: 'Haad Salad',
    h1: 'Villa Design in Haad Salad',
    directAnswer:
      'Haad Salad\'s quieter, smaller beach and reef-adjacent waters attract owners seeking privacy and a more secluded villa setting. FORMA designs here with a focus on discreet massing, landscape integration and outlooks over the bay\'s calmer waters, so the house stays low-key, comfortable in the heat and in keeping with its surroundings.',
    intro:
      'Haad Salad remains one of the island\'s quieter north-west beaches, its smaller scale and reef-sheltered waters appealing to owners who prioritise seclusion and a slower pace over proximity to the island\'s busier hubs. Villa design here tends to favour understated massing that sits comfortably within the bay\'s low-key character.',
    context:
      'Development density is lower here than in the island\'s southern districts, and much of our work involves discreet, landscape-integrated villas designed to feel private even on modest plot sizes.',
    logistics:
      'Access roads to Haad Salad are more limited than the island\'s main corridors, requiring realistic planning for delivery vehicle size and scheduling on some plots.',
    faqs: [
      {
        q: 'Is Haad Salad a good choice for privacy-focused villa design?',
        a: 'Yes, its quieter, lower-density setting is well suited to villas designed around seclusion and a slower pace of life.',
      },
      {
        q: 'What access considerations apply to construction here?',
        a: 'Access roads are more limited than the island\'s main corridors, so we plan delivery logistics specifically around each plot\'s access constraints.',
      },
      {
        q: 'Are landscape design and privacy planting common requests here?',
        a: 'Yes, landscape-led privacy strategies are a frequent part of villa briefs in this area, coordinated through our Landscape Design service.',
      },
    ],
    ctaHeading: 'Have a quiet plot in Haad Salad?',
    ctaBody: 'Tell us about the site, and we will design around the privacy and pace you want.',
  },
};
