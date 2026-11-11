import type { Service } from '../../lib/types';

/**
 * Canonical English service content — source of truth for RU/TH/HE translation.
 * Word counts follow the original brief §8 COPY guidance (service pages ~1000-2000 words).
 */
export const servicesEn: Omit<Service, 'translations'>[] = [
  {
    slug: 'architecture',
    priority: true,
    category: 'design',
    image: 'architecture',
    relatedSlugs: ['villa-design', 'permits-planning', 'turnkey-projects'],
  },
  {
    slug: 'villa-design',
    priority: true,
    category: 'design',
    image: 'hero-villa',
    relatedSlugs: ['architecture', 'interior-design', 'landscape-design'],
  },
  {
    slug: 'interior-design',
    priority: true,
    category: 'design',
    image: 'interior',
    relatedSlugs: ['villa-design', 'construction', 'landscape-design'],
  },
  {
    slug: 'construction',
    priority: true,
    category: 'build',
    image: 'construction',
    relatedSlugs: ['construction-supervision', 'project-management', 'concrete-construction'],
  },
  {
    slug: 'renovation',
    priority: true,
    category: 'build',
    image: 'design',
    relatedSlugs: ['construction', 'interior-design', 'technical-supervision'],
  },
  {
    slug: 'project-management',
    priority: true,
    category: 'management',
    image: 'construction',
    relatedSlugs: ['construction-supervision', 'turnkey-projects', 'construction'],
  },
  {
    slug: 'construction-supervision',
    priority: false,
    category: 'management',
    image: 'construction',
    relatedSlugs: ['technical-supervision', 'project-management', 'construction'],
  },
  {
    slug: 'technical-supervision',
    priority: false,
    category: 'management',
    image: 'design',
    relatedSlugs: ['construction-supervision', 'project-management', 'renovation'],
  },
  {
    slug: 'landscape-design',
    priority: true,
    category: 'design',
    image: 'pool-villa',
    relatedSlugs: ['villa-design', 'architecture', 'eco-construction'],
  },
  {
    slug: 'permits-planning',
    priority: false,
    category: 'management',
    image: 'architecture',
    relatedSlugs: ['architecture', 'construction', 'turnkey-projects'],
  },
  {
    slug: 'turnkey-projects',
    priority: true,
    category: 'management',
    image: 'hero-villa',
    relatedSlugs: ['architecture', 'construction', 'project-management'],
  },
  {
    slug: 'eco-construction',
    priority: false,
    category: 'specialist',
    image: 'pool-villa',
    relatedSlugs: ['landscape-design', 'construction', 'villa-design'],
  },
  {
    slug: 'concrete-construction',
    priority: false,
    category: 'specialist',
    image: 'construction',
    relatedSlugs: ['construction', 'construction-supervision', 'turnkey-projects'],
  },
];

export const servicesEnContent: Record<string, Service['translations']['en']> = {
  architecture: {
    seo: {
      title: 'Architecture & Villa Design in Koh Phangan | FORMA',
      description:
        'Architecture and villa design on Koh Phangan: site analysis, climate-led concepts and technical drawings ready for permits and construction, from FORMA.',
    },
    navLabel: 'Architecture',
    h1: 'Architecture & Villa Design in Koh Phangan',
    tagline: 'Concept design and technical architecture for Koh Phangan',
    directAnswer:
      'FORMA provides professional architecture and villa design in Koh Phangan, combining site analysis, tropical climate planning, architectural concepts and detailed technical documentation. The result is a property that is distinctive, practical and buildable, with every decision tested against slope, orientation, wind, privacy and island construction logistics.',
    introHeading: 'Design that starts with the site, not the mood board',
    intro:
      'Koh Phangan is not a flat, uniform building plot. Slopes fall steeply toward the sea, sun paths swing hard between monsoon seasons, and neighbouring plots can close off a view in a single build cycle. Our architecture practice begins every commission with the land itself: contour surveys, solar and wind studies, access routes and the practical realities of building on an island where materials arrive by boat and truck rather than by highway. Concept sketches follow only once those constraints are understood, so the forms we propose are buildable, not just beautiful on paper.',
    scope: [
      {
        title: 'Site and context analysis',
        body: 'Topographic reading, solar orientation, prevailing wind, drainage, access and neighbouring structures, translated into a design brief before a single wall is drawn.',
      },
      {
        title: 'Concept and schematic design',
        body: 'Massing studies, spatial planning and material direction, presented as drawings and 3D views so the logic of the design is clear before it is committed to detail.',
      },
      {
        title: 'Design development',
        body: 'Structural coordination, envelope detailing, opening and shading strategy, and refinement of every junction that determines how the building will actually perform in the tropics.',
      },
      {
        title: 'Technical documentation',
        body: 'Construction-ready drawings, specifications and coordination sets used for permitting, tendering and site execution.',
      },
    ],
    process: [
      { title: 'Discovery', body: 'Site visit, brief development and constraints review.' },
      { title: 'Concept', body: 'Massing, orientation and spatial strategy presented for discussion.' },
      { title: 'Design development', body: 'Structural, envelope and services coordination refine the concept.' },
      { title: 'Planning and permits', body: 'Drawing sets prepared and coordinated for the applicable approvals.' },
      { title: 'Construction documentation', body: 'Final technical set issued for tender or direct construction.' },
      { title: 'Construction support', body: 'Site queries, design clarifications and periodic reviews during the build.' },
    ],
    deliverables: [
      'Site and context analysis report',
      'Concept design package with 3D views',
      'Design development drawing set',
      'Construction documentation for permitting and build',
      'Coordination with structural and MEP consultants',
    ],
    materialsHeading: 'Materials and climate response',
    materials:
      'Tropical architecture on Koh Phangan succeeds or fails on its handling of heat, humidity and monsoon rain. We favour material palettes that age honestly in a marine climate — dense timber, natural stone, board-formed concrete and locally sourced clay products — combined with deep overhangs, cross-ventilation and shaded transitional spaces that reduce reliance on mechanical cooling without sacrificing comfort.',
    budgetHeading: 'What affects the cost of architectural design',
    budgetIntro:
      'Design fees on Koh Phangan vary with site complexity and project ambition rather than floor area alone. Rather than quote a fixed figure with no context, we walk every prospective client through the variables that genuinely move the number.',
    budgetFactors: [
      'Site slope, access and required earthworks or retaining structures',
      'Building footprint, number of levels and structural complexity',
      'Level of custom detailing versus standardised construction systems',
      'Coordination required with structural, landscape and MEP consultants',
      'Whether the commission is design-only or extends into construction supervision',
    ],
    pricingRows: [
      { item: 'Compact villa (studio-2BR), straightforward site', note: 'Flat or gently sloped site, standard construction systems' },
      { item: 'Mid-size villa (3-4BR) or a sloped/constrained site', note: 'More levels, structural complexity, or site-specific earthworks and retaining' },
      { item: 'Large or multi-structure project', note: 'Multiple pavilions, extensive custom detailing, or heavy consultant coordination' },
    ],
    faqs: [
      {
        q: 'Do you design for existing land we already own on Koh Phangan?',
        a: 'Yes. Most commissions start from a plot our clients already hold. We begin with a site visit and survey review to understand access, slope, orientation and any existing structures before any design work starts.',
      },
      {
        q: 'Can you work from an existing concept or sketch we already have?',
        a: 'Yes, we regularly develop client sketches, reference images or a previous architect\'s early concept into a fully resolved, buildable design, provided the underlying site logic holds up to technical review.',
      },
      {
        q: 'How long does concept design typically take?',
        a: 'Concept design for a single villa typically runs four to eight weeks from a completed site survey, depending on site complexity and the number of design iterations required.',
      },
      {
        q: 'Do you handle structural engineering as well?',
        a: 'Structural design is coordinated through specialist structural engineers we work with regularly on the island; our architectural team manages that coordination so the design and structure evolve together.',
      },
      {
        q: 'Can architecture be commissioned without moving into construction with FORMA?',
        a: 'Yes. Design-only engagements are common. We provide construction documentation suitable for tender to a contractor of your choice, and can support that process as much or as little as you need.',
      },
      {
        q: 'How do you handle privacy on tightly spaced plots?',
        a: 'Through massing, opening placement, level changes and planting rather than solid perimeter walls alone — the aim is privacy that still allows light, air and views to move through the site.',
      },
      {
        q: 'What building regulations apply on Koh Phangan?',
        a: 'Requirements depend on zoning, plot size and building type, and are confirmed with the relevant local authority for each specific site; our Permits & Planning coordination exists to manage this process carefully rather than assume a single blanket rule.',
      },
      {
        q: 'Do you design for hospitality or multi-unit projects as well as private villas?',
        a: 'Yes. The same site-first design method applies to boutique hospitality and multi-villa developments, coordinated closely with our Project Management and Turnkey services where a single point of accountability is needed.',
      },
    ],
    ctaHeading: 'Have a site and an idea?',
    ctaBody: 'Bring us your plot, your constraints and your ambitions. We will tell you honestly what the land supports.',
    ctaLabel: 'Start a Project',
    cardSummary: 'Concept-to-construction architecture shaped by site, climate and light.',
  },

  'villa-design': {
    seo: {
      title: 'Tropical Villa Design in Koh Phangan | FORMA',
      description:
        'Tropical villa design on Koh Phangan: concept and schematic design shaped by views, wind, privacy and the way you plan to live in the house.',
    },
    navLabel: 'Villa Design',
    h1: 'Tropical Villa Design in Koh Phangan',
    tagline: 'Custom villa design for Koh Phangan',
    directAnswer:
      'Villa design at FORMA is the concept and schematic stage of a private villa on Koh Phangan: how the house sits on the plot, frames the view, catches the breeze and separates living, sleeping and service areas. It produces a clear design the client can approve before technical documentation begins.',
    introHeading: 'A villa is a relationship between a site and a life',
    intro:
      'The best villas on this island are not defined by square footage but by how precisely they are tuned to one plot, one view and one household\'s daily rhythm. We design each villa around the specific way light crosses the site through the day, the direction the sea breeze arrives from, and the balance a client wants between openness and privacy from neighbouring plots. The result is a home that reads as inevitable on its site — because it was never intended to work anywhere else.',
    scope: [
      {
        title: 'View and orientation strategy',
        body: 'Sightline studies from every habitable level, balanced against solar exposure and the practical cost of glazing and shading at scale.',
      },
      {
        title: 'Indoor-outdoor spatial planning',
        body: 'Living spaces, pool decks, terraces and gardens designed as one continuous sequence rather than separate rooms with a door between them.',
      },
      {
        title: 'Natural ventilation design',
        body: 'Cross-ventilation paths, stack-effect voids and shading geometry that keep interiors comfortable with genuinely reduced mechanical cooling loads.',
      },
      {
        title: 'Landscape integration',
        body: 'Coordination with our landscape design service so pool, planting and hardscape are resolved with the architecture, not bolted on afterward.',
      },
    ],
    process: [
      { title: 'Discovery', body: 'Brief, lifestyle questions and site walk to understand how the household will actually use the home.' },
      { title: 'Concept', body: 'Massing and view studies presented as sketches and models for early feedback.' },
      { title: 'Design development', body: 'Room-by-room detail, materials and structural coordination.' },
      { title: 'Permits', body: 'Documentation prepared for the applicable local approvals.' },
      { title: 'Construction', body: 'Build delivered directly by FORMA or handed to a contractor of your choice with full documentation.' },
      { title: 'Supervision and handover', body: 'Quality checks, snagging and a structured handover with as-built information.' },
    ],
    deliverables: [
      'View, wind and shading analysis for the specific site',
      'Full villa floor plans, elevations and sections',
      '3D concept views for key spaces',
      'Interior and landscape coordination set',
      'Construction documentation ready for permitting and build',
    ],
    materialsHeading: 'Materials for tropical villa living',
    materials:
      'Villa material choices on Koh Phangan need to survive salt air, high humidity and intense UV without constant maintenance. We favour honed natural stone and dense timber for high-touch surfaces, board-formed or lightly textured concrete for structural elements left exposed, and openable timber or aluminium screening that ages gracefully rather than degrading. Every specification is checked against realistic maintenance expectations before it is finalised.',
    budgetHeading: 'What affects villa design and build cost',
    budgetIntro:
      'Villa costs on Koh Phangan are driven by far more than size. We discuss the real variables openly rather than quoting a number that ignores your specific site.',
    budgetFactors: [
      'Plot slope and the extent of earthworks or retaining walls required',
      'Number of pavilions or levels and the complexity of roof geometry',
      'Pool size, positioning and structural integration with the villa',
      'Specification level for stone, timber, joinery and glazing systems',
      'Site access for materials and machinery, particularly on steeper plots',
    ],
    pricingRows: [
      { item: 'Compact villa (studio-2BR)', note: 'Single pavilion, standard specification' },
      { item: 'Mid-size family villa (3-4BR)', note: 'Larger footprint, pool integration, higher finish specification' },
      { item: 'Large villa or hospitality-scale property', note: 'Multiple pavilions, extensive glazing, custom joinery throughout' },
    ],
    faqs: [
      {
        q: 'Can you design a villa for a sea-view plot with a steep slope?',
        a: 'Yes — sloped, sea-facing sites are common on Koh Phangan and are often where the most distinctive villas are possible. We work closely with structural engineers on retaining strategy and split-level planning from the earliest concept stage.',
      },
      {
        q: 'How many bedrooms can a typical FORMA villa include?',
        a: 'We have designed everything from compact two-bedroom retreats to larger family or hospitality villas with five or more suites; the brief and site dictate scale rather than a fixed template.',
      },
      {
        q: 'Do you design villas intended for rental or hospitality use?',
        a: 'Yes, and we plan for that use case explicitly — guest privacy, service access, staff areas and durability under higher turnover are addressed at the design stage rather than retrofitted later.',
      },
      {
        q: 'How private can an open-plan villa really be from neighbours?',
        a: 'Privacy is achieved through massing, level changes, planting and considered window placement, allowing wide openings toward the view while closing selectively toward neighbouring plots.',
      },
      {
        q: 'Do you handle the pool design as part of the villa?',
        a: 'Pool positioning and form are resolved with the architecture from concept stage; detailed pool engineering and landscape integration are coordinated through our Landscape Design service.',
      },
      {
        q: 'What is the typical timeline from concept to move-in?',
        a: 'A single villa typically runs several months for design and permitting, and a further extended period for construction depending on scale and specification; we provide a project-specific schedule once the brief and site are confirmed.',
      },
      {
        q: 'Can an existing villa be extended rather than replaced?',
        a: 'Often, yes. Where the existing structure and foundations are sound, extension and redesign can be more cost-effective than rebuilding; see our Renovation service for that scope.',
      },
      {
        q: 'Do you provide furniture and interior specification too?',
        a: 'Full interior concept, material palette and furniture direction are available through our Interior Design service, typically coordinated in parallel with villa design for a coherent result.',
      },
    ],
    ctaHeading: 'Have land and a vision for a villa?',
    ctaBody: 'Tell us about your site, your household and how you want to live in the tropics. We will shape the design around it.',
    ctaLabel: 'Start a Project',
    cardSummary: 'Custom villas planned around view, breeze and privacy.',
  },

  'interior-design': {
    seo: {
      title: 'Interior Design in Koh Phangan | Villas & Hospitality | FORMA',
      description:
        'Interior design for villas and hospitality projects on Koh Phangan: layouts, materials, joinery and lighting chosen to last in a humid, salt-laden climate.',
    },
    navLabel: 'Interior Design',
    h1: 'Interior Design for Villas & Hospitality in Koh Phangan',
    tagline: 'Interior design for villas and hospitality spaces',
    directAnswer:
      'FORMA provides interior design for villas and small hospitality projects on Koh Phangan, covering space planning, material and finish selection, joinery, lighting and furniture. Every specification is checked against heat, humidity and salt air, so interiors keep their quality long after handover without constant maintenance.',
    introHeading: 'Interiors planned with the building, not after it',
    intro:
      'An interior that feels resolved rarely happened by accident at the end of a project — it was considered from the moment ceiling heights, window placement and structural grids were first drawn. We develop interior concepts in parallel with architecture wherever possible, so joinery, lighting and material transitions align with the building\'s logic instead of fighting it. Where a client already has an existing shell, we work backward from that structure to find the most honest interior expression it can support.',
    scope: [
      {
        title: 'Concept and material palette',
        body: 'A coherent material and colour direction developed from the site\'s light, climate and the architecture\'s character.',
      },
      {
        title: 'Lighting design',
        body: 'Layered lighting strategy for ambient, task and accent needs, tuned for both daylight-heavy tropical living and evening atmosphere.',
      },
      {
        title: 'Joinery, kitchens and bathrooms',
        body: 'Custom cabinetry, kitchen and bathroom detailing specified for durability in a humid marine climate.',
      },
      {
        title: 'Furniture and styling direction',
        body: 'Furniture layout, sourcing guidance and styling that supports daily use as much as photography.',
      },
    ],
    process: [
      { title: 'Discovery', body: 'Lifestyle brief, existing architecture review and reference discussion.' },
      { title: 'Concept', body: 'Material palette and spatial mood presented through boards and key visuals.' },
      { title: 'Design development', body: 'Joinery drawings, lighting plans and finishes schedule finalised.' },
      { title: 'Coordination', body: 'Alignment with architectural and construction teams on services and detailing.' },
      { title: 'Procurement support', body: 'Sourcing guidance for furniture, fixtures and finishes.' },
      { title: 'Installation and styling', body: 'On-site placement, final styling and snagging before handover.' },
    ],
    deliverables: [
      'Material and finishes palette',
      'Lighting design and fixture schedule',
      'Joinery, kitchen and bathroom drawings',
      'Furniture layout and specification guidance',
      'Styling direction for handover-ready presentation',
    ],
    materialsHeading: 'Material and lighting approach',
    materials:
      'Interior materials on Koh Phangan need to resist humidity and salt air while still feeling warm underfoot and to the touch. We favour natural stone, dense hardwood, woven natural fibres and honest metal finishes that patina rather than corrode. Lighting is layered — recessed and cove lighting for ambient calm, directional fittings for task areas, and warm accent lighting that carries the interior gracefully into evening use around pools and terraces.',
    budgetHeading: 'What affects interior design and fit-out cost',
    budgetIntro:
      'Interior budgets swing widely with specification level and scope. We explain the real drivers so decisions can be made deliberately.',
    budgetFactors: [
      'Extent of custom joinery versus specified freestanding furniture',
      'Material specification level for stone, timber and surfaces',
      'Number and complexity of kitchens, bathrooms and wet areas',
      'Whether furniture is sourced locally, regionally or internationally',
      'Styling and installation scope required at handover',
    ],
    pricingRows: [
      { item: 'Single room or suite refresh', note: 'Specified finishes, minimal custom joinery' },
      { item: 'Full villa interior, standard joinery', note: 'All principal rooms, kitchens and bathrooms, moderate custom joinery' },
      { item: 'Full villa with extensive custom joinery', note: 'Custom cabinetry throughout, imported materials, full styling package' },
    ],
    faqs: [
      {
        q: 'Do you design interiors for villas you did not architect?',
        a: 'Yes, we regularly develop interiors for existing shells and villas designed by other architects, working from the building\'s existing logic and structural constraints.',
      },
      {
        q: 'Can interior design run in parallel with construction?',
        a: 'Ideally, yes. Coordinating interior joinery, services and finishes during construction avoids costly rework and produces a more integrated result than adding interiors after handover.',
      },
      {
        q: 'Do you source furniture internationally or only locally?',
        a: 'Both, depending on budget and timeline; Thailand and the broader region offer strong furniture and joinery craftsmanship that we use extensively, supplemented by imported pieces where a specific look requires it.',
      },
      {
        q: 'How do you handle humidity and material durability?',
        a: 'Material selection accounts for the marine tropical climate from the outset — moisture-resistant substrates, appropriate sealants and finishes, and ventilation strategy for cabinetry and wet areas.',
      },
      {
        q: 'Can you design interiors for a hospitality villa with guest turnover?',
        a: 'Yes, with attention to durability, ease of maintenance and cleaning, and finishes that hold up under higher use than a private residence.',
      },
      {
        q: 'Do you provide full styling for photography and launch?',
        a: 'Yes, final styling is part of our handover process for clients who want the space presentation-ready from day one.',
      },
      {
        q: 'What is the typical timeline for interior design?',
        a: 'Concept through to finished specification typically runs several weeks to a few months depending on scope and the number of custom joinery items involved.',
      },
      {
        q: 'Can we retain some existing furniture in a new interior scheme?',
        a: 'Absolutely — we frequently design around pieces clients want to keep, integrating them into a coherent new palette rather than requiring a full replacement.',
      },
    ],
    ctaHeading: 'Ready to shape how your villa feels, not just how it looks?',
    ctaBody: 'Share your architecture, your references and how you want each room to feel. We will develop the palette from there.',
    ctaLabel: 'Ask About Your Project',
    cardSummary: 'Material palette, lighting and joinery coordinated with the architecture.',
  },

  construction: {
    seo: {
      title: 'Villa Construction in Koh Phangan | Design-Build | FORMA',
      description:
        'Villa construction on Koh Phangan delivered by the team that designed it: structure, envelope, finishes and site management under one accountable team.',
    },
    navLabel: 'Construction',
    h1: 'Villa Construction & Design-Build in Koh Phangan',
    tagline: 'Villa and design-build construction on Koh Phangan',
    directAnswer:
      'FORMA builds private villas on Koh Phangan as a design-build contractor, so the team that drew the details also builds them. Construction covers earthworks, foundations, structure, envelope, services and finishes, coordinated around island logistics, monsoon weather and the limits of the plot.',
    introHeading: 'Design and build under one roof, one accountability',
    intro:
      'A design is only as good as its execution. Where architecture and construction sit with separate, uncoordinated teams, details drift, schedules slip and accountability becomes difficult to trace when something goes wrong. Our construction service closes that gap: the same studio that resolves the design also manages its build, coordinating trades, materials and inspections against the original technical intent rather than a simplified site interpretation of it.',
    scope: [
      {
        title: 'Pre-construction planning',
        body: 'Buildability review, procurement planning and scheduling before the first excavation begins.',
      },
      {
        title: 'Site management',
        body: 'Day-to-day coordination of trades, deliveries and site logistics, particularly important given island supply chains.',
      },
      {
        title: 'Quality control',
        body: 'Structured inspection points at each construction stage, checked against the technical drawings rather than general practice alone.',
      },
      {
        title: 'Schedule and reporting',
        body: 'Regular progress reporting so clients — including those managing the project remotely — have clear visibility of status.',
      },
    ],
    process: [
      { title: 'Pre-construction', body: 'Buildability review, procurement plan and detailed schedule established.' },
      { title: 'Mobilisation', body: 'Site setup, permits confirmation and initial earthworks or foundations.' },
      { title: 'Structure', body: 'Structural frame, envelope and roofing executed to the technical documentation.' },
      { title: 'Services and finishes', body: 'MEP installation, joinery, finishes and fixture installation.' },
      { title: 'Quality review', body: 'Snagging inspection against the design intent and technical specification.' },
      { title: 'Handover', body: 'Completion documentation, warranties and orientation for the client.' },
    ],
    deliverables: [
      'Pre-construction buildability and procurement plan',
      'Detailed construction schedule with milestone reporting',
      'Staged quality inspection records',
      'Coordinated trade and subcontractor management',
      'Completion documentation and handover pack',
    ],
    materialsHeading: 'Materials and site practice',
    materials:
      'Building on an island means every material decision also has a logistics decision behind it. We plan procurement around realistic lead times for imported items, favour regionally available stone, timber and concrete products where quality allows, and sequence deliveries carefully around weather windows and site access constraints specific to Koh Phangan.',
    budgetHeading: 'What affects construction cost and schedule',
    budgetIntro:
      'We do not quote fixed construction prices without a completed design and site survey. What we can explain upfront are the factors that most affect cost and timeline.',
    budgetFactors: [
      'Site access, slope and the extent of earthworks required',
      'Structural system chosen and overall building complexity',
      'Specification level for finishes, joinery and fixtures',
      'Import requirements for specific materials or equipment',
      'Weather-driven scheduling during the monsoon season',
    ],
    pricingRows: [
      { item: 'Compact villa build, standard systems', note: 'Conventional structure, standard finishes' },
      { item: 'Mid-size villa, moderate complexity', note: 'Pool integration, more structural complexity, higher-spec finishes' },
      { item: 'Large or multi-structure build', note: 'Multiple structures, complex structural systems, extensive imported materials' },
    ],
    faqs: [
      {
        q: 'Do you build from designs you did not create?',
        a: 'Yes, provided the technical documentation is complete enough for accurate pricing and buildability review; we will flag any gaps that need resolving before construction starts.',
      },
      {
        q: 'How do you manage construction while the client is overseas?',
        a: 'Structured progress reporting, photo and video updates, and scheduled video walkthroughs keep remote clients genuinely informed rather than guessing at status.',
      },
      {
        q: 'What happens if unexpected ground conditions are found?',
        a: 'We assess the condition with the structural engineer, present the practical options and cost implications clearly, and proceed only once the client has approved a course of action.',
      },
      {
        q: 'Do you subcontract the whole build or manage direct labour?',
        a: 'A combination — specialist trades are subcontracted to vetted partners while site management, quality control and scheduling remain directly with our team throughout.',
      },
      {
        q: 'How does the monsoon season affect construction timelines?',
        a: 'Certain works, particularly earthworks, roofing and exterior finishes, are sequenced around the wetter months where possible; the project schedule accounts for this rather than treating weather as an unplanned delay.',
      },
      {
        q: 'Can construction start before all design details are finalised?',
        a: 'Early works such as site clearance or foundations can sometimes begin once those specific packages are resolved, but we recommend a substantially complete technical set before full mobilisation to avoid costly rework.',
      },
      {
        q: 'Do you provide a warranty on completed construction?',
        a: 'Defects liability terms are set out in the construction agreement for each project; specifics depend on the scope and contract structure agreed with the client.',
      },
      {
        q: 'Can you take over a stalled construction project from another contractor?',
        a: 'This is assessed case by case, starting with an independent review of the existing work\'s condition and documentation before we commit to taking over the build.',
      },
    ],
    ctaHeading: 'Ready to move from drawings to a built villa?',
    ctaBody: 'Whether we designed it or another architect did, tell us about the project and where it stands.',
    ctaLabel: 'Discuss Your Site',
    cardSummary: 'Build delivery with in-house quality control and scheduling.',
  },

  renovation: {
    seo: {
      title: 'Villa Renovation in Koh Phangan | Remodeling | FORMA',
      description:
        'Villa renovation and remodeling on Koh Phangan: structural assessment, layout changes, services upgrades and finishes that respect what already works.',
    },
    navLabel: 'Renovation',
    h1: 'Villa Renovation & Remodeling in Koh Phangan',
    tagline: 'Renovation and remodeling for existing properties',
    directAnswer:
      'FORMA renovates and remodels existing villas on Koh Phangan, starting with an assessment of the structure, roof, drainage and services before any design is drawn. Work ranges from a cosmetic refresh to a full structural renovation, keeping what performs well and replacing only what does not.',
    introHeading: 'Every renovation starts with an honest assessment',
    intro:
      'Older properties on Koh Phangan often have real bones worth keeping — a strong structural frame, a good relationship to the site, mature landscaping — alongside genuine problems in layout, ventilation, waterproofing or finish quality. Our renovation process starts by separating the two: a structural and condition survey identifies what can be retained safely, what needs remediation, and what should be reimagined entirely, before any redesign work begins.',
    scope: [
      {
        title: 'Condition and structural assessment',
        body: 'Independent review of structure, waterproofing, services and finishes to establish a realistic scope and budget baseline.',
      },
      {
        title: 'Redesign',
        body: 'Layout, material and technical upgrades developed against the assessment findings and the client\'s revised brief.',
      },
      {
        title: 'Technical coordination',
        body: 'Structural remediation, MEP upgrades and waterproofing detailing coordinated with specialist consultants where required.',
      },
      {
        title: 'Phased execution',
        body: 'Works sequenced to suit occupied properties or hospitality operations that cannot fully close during construction.',
      },
    ],
    process: [
      { title: 'Assessment', body: 'Site survey and condition report covering structure, services and finishes.' },
      { title: 'Redesign brief', body: 'Scope agreed against assessment findings, budget and priorities.' },
      { title: 'Design development', body: 'Layout, material and technical drawings prepared for the revised scope.' },
      { title: 'Permits', body: 'Approvals coordinated where the works require them.' },
      { title: 'Phased construction', body: 'Works sequenced to minimise disruption where the property remains in use.' },
      { title: 'Handover', body: 'Snagging, completion documentation and aftercare guidance.' },
    ],
    deliverables: [
      'Structural and condition assessment report',
      'Redesign drawings and specification',
      'Phased works schedule',
      'Construction and quality management through completion',
      'Handover documentation and maintenance guidance',
    ],
    materialsHeading: 'Materials for renovation work',
    materials:
      'Renovation material choices must integrate convincingly with what remains, particularly where an extension meets an existing structure. We match or deliberately contrast existing stone, timber and concrete finishes with intent, and prioritise waterproofing and moisture management upgrades — frequently the root cause of tropical building deterioration — before any cosmetic finish is applied.',
    budgetHeading: 'What affects renovation cost',
    budgetIntro:
      'Renovation costs are harder to estimate from photographs alone than new-build costs, because so much depends on hidden condition. We are direct about that uncertainty and resolve it through assessment before committing to a number.',
    budgetFactors: [
      'Extent of structural or waterproofing remediation required',
      'Scope of layout change versus like-for-like refresh',
      'Whether the property must remain partially operational during works',
      'Age and condition of existing services (electrical, plumbing, drainage)',
      'Specification level for new finishes and fixtures',
    ],
    pricingRows: [
      { item: 'Cosmetic refresh', note: 'Finishes, fixtures and surface-level updates; structure untouched' },
      { item: 'Partial renovation with layout change', note: 'Reconfigured rooms, upgraded services, moderate structural work' },
      { item: 'Full structural renovation', note: 'Major structural remediation, full-layout change, complete systems overhaul' },
    ],
    faqs: [
      {
        q: 'Can you renovate a villa while we continue living in it?',
        a: 'Often yes, through careful phasing, though the extent of works and the layout of the property determine how much disruption is realistic to avoid.',
      },
      {
        q: 'Do you renovate hospitality properties without closing them fully?',
        a: 'Yes, phased renovation for operating villas and small hospitality properties is a regular part of our work, planned around occupancy and booking calendars where possible.',
      },
      {
        q: 'What if the structural survey finds serious problems?',
        a: 'We present the findings clearly, alongside realistic remediation options and cost implications, so the decision to proceed, adjust scope or reconsider stays fully informed and in your hands.',
      },
      {
        q: 'Can a renovation include a significant layout change?',
        a: 'Yes, provided the existing structure can support it or can be reasonably modified; this is assessed during the structural review before redesign begins.',
      },
      {
        q: 'How do you handle water damage and waterproofing failures?',
        a: 'These are treated as priority items — the underlying cause is diagnosed and resolved before new finishes are applied, rather than concealing a recurring problem cosmetically.',
      },
      {
        q: 'Do you handle permits for renovation work?',
        a: 'Where the scope of works requires approval, permit coordination is managed through our Permits & Planning service alongside the renovation project.',
      },
      {
        q: 'Can existing furniture and fittings be reused?',
        a: 'Frequently, yes — we assess what is worth retaining and design the new interior around it where it fits the revised scheme.',
      },
      {
        q: 'How long does a typical villa renovation take?',
        a: 'Timelines vary widely with scope, from a few weeks for a cosmetic refresh to several months for structural and full-layout renovations; a project-specific schedule follows the assessment.',
      },
    ],
    ctaHeading: 'Have an existing property that needs new life?',
    ctaBody: 'Tell us its condition and what is not working. We will assess it honestly before proposing a scope.',
    ctaLabel: 'Discuss Your Site',
    cardSummary: 'Assessment-led renovation for existing villas and hospitality properties.',
  },

  'project-management': {
    seo: {
      title: 'Construction Project Management in Koh Phangan | FORMA',
      description:
        'Construction project management on Koh Phangan: one coordinator for schedule, budget, procurement and contractors on a villa or small development.',
    },
    navLabel: 'Project Management',
    h1: 'Construction Project Management in Koh Phangan',
    tagline: 'Project management for villa and construction projects',
    directAnswer:
      'FORMA provides construction project management on Koh Phangan for owners who hire their own contractors. We coordinate schedule, budget, procurement, trades and reporting, so decisions are made on time and problems surface early instead of appearing on the invoice after the work is already built.',
    introHeading: 'Someone has to hold the whole picture',
    intro:
      'A villa project typically involves an architect, a structural engineer, an interior designer, a landscape contractor, a main builder and several specialist trades — and when no single party is responsible for how they fit together, gaps appear between them at the client\'s expense. Our project management service exists to hold that whole picture: tracking budget against actual spend, keeping the schedule realistic rather than aspirational, and giving clients one clear channel of communication instead of five conflicting ones.',
    scope: [
      {
        title: 'Budget coordination',
        body: 'Tracking committed and forecast costs against the approved budget, with early warning where variance appears.',
      },
      {
        title: 'Schedule management',
        body: 'A master programme coordinating design, procurement, permits and construction milestones realistically.',
      },
      {
        title: 'Procurement coordination',
        body: 'Managing tendering, purchase orders and delivery timing for materials and specialist items.',
      },
      {
        title: 'Contractor and consultant coordination',
        body: 'Running regular site and design meetings so every party works from the same current information.',
      },
    ],
    process: [
      { title: 'Onboarding', body: 'Review of existing design, contracts and project status.' },
      { title: 'Baseline', body: 'Budget and schedule baseline established against the confirmed scope.' },
      { title: 'Coordination', body: 'Ongoing management of contractors, consultants and procurement.' },
      { title: 'Reporting', body: 'Regular structured reports on cost, schedule and risk.' },
      { title: 'Issue resolution', body: 'Early identification and resolution of design or site conflicts.' },
      { title: 'Close-out', body: 'Final account reconciliation and handover documentation.' },
    ],
    deliverables: [
      'Project budget baseline and ongoing cost tracking',
      'Master project schedule with milestone reporting',
      'Procurement and tender coordination records',
      'Regular client progress reports',
      'Final account reconciliation at project close-out',
    ],
    materialsHeading: 'Coordinating specification decisions',
    materials:
      'Project management does not set the material palette, but it does keep specification decisions moving on schedule — chasing sample approvals, confirming lead times with suppliers, and flagging where a preferred material choice threatens the budget or programme before it becomes a costly late-stage change.',
    budgetHeading: 'What affects project management scope and cost',
    budgetIntro:
      'Project management fees typically scale with project value and complexity rather than a flat rate. We agree scope and fee structure clearly before work begins.',
    budgetFactors: [
      'Overall project value and number of separate contracts to coordinate',
      'Number of consultants and specialist trades involved',
      'Whether the project is managed remotely, on-site, or both',
      'Complexity of procurement, including imported items',
      'Reporting frequency and detail required by the client',
    ],
    pricingRows: [
      { item: 'Single-contractor project', note: 'One main contractor, straightforward procurement' },
      { item: 'Multi-trade project', note: 'Several specialist trades and consultants to coordinate directly' },
      { item: 'Multi-structure or hospitality development', note: 'Multiple buildings, larger team, more complex reporting needs' },
    ],
    faqs: [
      {
        q: 'Do you manage projects where FORMA is not also the architect or builder?',
        a: 'Yes, independent project management for projects designed and built by other parties is a core part of this service.',
      },
      {
        q: 'How is project management different from construction supervision?',
        a: 'Project management coordinates budget, schedule, procurement and all parties across the whole project; construction supervision focuses specifically on site quality control and compliance with the design during the build phase. The two are often used together.',
      },
      {
        q: 'Can you take over management of a project already underway?',
        a: 'Yes, following a review of existing documentation, contracts and site status to establish an accurate baseline before assuming coordination.',
      },
      {
        q: 'How often will we receive progress reports?',
        a: 'Reporting frequency is agreed at the outset, typically weekly or fortnightly, with more frequent updates during critical construction phases.',
      },
      {
        q: 'Do you manage procurement of imported materials and fixtures?',
        a: 'Yes, including tracking lead times, customs considerations and delivery scheduling for items sourced outside Thailand.',
      },
      {
        q: 'Can project management be provided remotely for overseas clients?',
        a: 'Yes, with regular reporting and scheduled video reviews; a periodic in-person presence is still recommended for critical milestones.',
      },
      {
        q: 'What happens if the project starts running over budget?',
        a: 'Variance is flagged as early as possible with clear options for the client — value engineering, scope adjustment or budget revision — rather than surfacing the issue only at project close-out.',
      },
      {
        q: 'Do you handle disputes between contractors and consultants?',
        a: 'Resolving coordination conflicts between parties is a central part of the role; project management aims to catch and resolve these before they affect schedule or cost.',
      },
    ],
    ctaHeading: 'Need one team holding the whole project together?',
    ctaBody: 'Tell us where the project stands today and what is not being coordinated well enough.',
    ctaLabel: 'Request a Consultation',
    cardSummary: 'Independent coordination of budget, schedule, procurement and contractors.',
  },

  'construction-supervision': {
    seo: {
      title: 'Construction Supervision in Koh Phangan | FORMA',
      description:
        'Independent construction supervision on Koh Phangan: regular site visits that check quality, drawings and progress against what the contractor agreed to build.',
    },
    navLabel: 'Construction Supervision',
    h1: 'Construction Supervision in Koh Phangan',
    tagline: 'Independent construction supervision',
    directAnswer:
      'Construction supervision by FORMA means an independent professional visits your Koh Phangan site on a fixed schedule, compares the work with the drawings and specification, and reports on quality, progress and defects. It protects owners who are overseas or cannot inspect the build themselves.',
    introHeading: 'Quality control is not the contractor\'s job to grade itself',
    intro:
      'When a client is building with a contractor we did not select and may not be able to visit regularly, an independent set of eyes on-site protects the project from drift — details that quietly diverge from the drawings, workmanship that falls short of specification, or progress that looks fine in photographs but is behind schedule underneath. Our construction supervision service exists specifically for that gap, reporting honestly to the client rather than to the builder.',
    scope: [
      {
        title: 'Site inspections',
        body: 'Scheduled visits at defined construction stages to check work against drawings and specification.',
      },
      {
        title: 'Quality and compliance checks',
        body: 'Verification that materials, workmanship and installed systems match the approved design intent.',
      },
      {
        title: 'Progress monitoring',
        body: 'Independent assessment of actual progress against the contractor\'s reported schedule.',
      },
      {
        title: 'Snagging and reporting',
        body: 'Defect identification, structured written reports and photographic records for the client\'s records.',
      },
    ],
    process: [
      { title: 'Onboarding', body: 'Review of contract documents, drawings and current site status.' },
      { title: 'Inspection schedule', body: 'Visit frequency agreed around key construction milestones.' },
      { title: 'Site visits', body: 'Structured inspections against drawings, specification and workmanship standards.' },
      { title: 'Reporting', body: 'Written reports with photographic evidence issued after each visit.' },
      { title: 'Issue tracking', body: 'Defects and non-compliance items tracked to resolution.' },
      { title: 'Final snagging', body: 'Comprehensive pre-handover inspection and defect list.' },
    ],
    deliverables: [
      'Inspection schedule aligned to construction milestones',
      'Written site reports with photographic evidence',
      'Defect and non-compliance tracking log',
      'Progress assessment against the contractor\'s schedule',
      'Final snagging report before handover',
    ],
    materialsHeading: 'What supervision checks for on site',
    materials:
      'Supervision inspections focus on the details most likely to cause long-term problems in a tropical climate: waterproofing detailing at roofs, terraces and wet areas, correct concrete cover and curing, structural connection quality, and the accuracy of installed dimensions against drawings — the items a client cannot easily assess from progress photographs alone.',
    budgetHeading: 'What affects supervision scope and cost',
    budgetIntro:
      'Supervision fees depend on visit frequency, project complexity and how far the site is from our base of operations. We agree an inspection schedule and fee before work begins.',
    budgetFactors: [
      'Frequency of site visits required through the build programme',
      'Overall project scale and number of trades to monitor',
      'Distance and access to the site',
      'Whether reporting needs to support remote or overseas clients',
      'Level of detail required in written reporting',
    ],
    pricingRows: [
      { item: 'Periodic visits (monthly)', note: 'Straightforward build, infrequent critical stages' },
      { item: 'Regular visits (biweekly)', note: 'More construction stages requiring verification, moderate complexity' },
      { item: 'Intensive visits (weekly or more)', note: 'Complex or fast-moving build requiring close, frequent oversight' },
    ],
    faqs: [
      {
        q: 'Can you supervise a project designed and built entirely by others?',
        a: 'Yes, this is the core use case for independent supervision — protecting a client\'s interests on a project we did not design or contract to build.',
      },
      {
        q: 'How often do you visit the site during supervision?',
        a: 'Visit frequency is agreed around the project\'s specific construction milestones, ranging from weekly during critical structural stages to less frequent visits during simpler finishing work.',
      },
      {
        q: 'What happens if you find non-compliant work?',
        a: 'Findings are documented in writing with photographic evidence and communicated to the client directly, along with the recommended remedy to raise with the contractor.',
      },
      {
        q: 'Do you report to the contractor or to the client?',
        a: 'Reporting lines run to the client. Any communication with the contractor about defects happens transparently and is documented, protecting the independence of the supervision role.',
      },
      {
        q: 'Can supervision start partway through an already ongoing build?',
        a: 'Yes, following an initial review of completed work and documentation to establish an accurate baseline before ongoing inspections begin.',
      },
      {
        q: 'Is construction supervision the same as project management?',
        a: 'No — supervision focuses specifically on site quality and design compliance; project management covers the broader coordination of budget, schedule and procurement. See our Project Management service for that scope.',
      },
      {
        q: 'Can supervision reports be shared with our bank or investor?',
        a: 'Yes, structured written reports are commonly shared with lenders or investors requiring independent progress verification.',
      },
      {
        q: 'Do you supervise renovation projects as well as new builds?',
        a: 'Yes, supervision applies equally to renovation works, with particular attention to structural remediation and waterproofing quality.',
      },
    ],
    ctaHeading: 'Building with another contractor and want independent oversight?',
    ctaBody: 'Tell us about the project, the contractor and how far along the build currently is.',
    ctaLabel: 'Request a Consultation',
    cardSummary: 'Independent site inspections, quality checks and reporting.',
  },

  'technical-supervision': {
    seo: {
      title: 'Technical Supervision for Villa Builds in Koh Phangan | FORMA',
      description:
        'Technical supervision for villa builds on Koh Phangan: engineering-level review of structure, MEP and waterproofing at the stages where mistakes are costly.',
    },
    navLabel: 'Technical Supervision',
    h1: 'Technical Supervision for Villa Builds in Koh Phangan',
    tagline: 'Specialist technical supervision',
    directAnswer:
      'Technical supervision is engineering-level review of a villa build on Koh Phangan, focused on the elements that are expensive to fix later: reinforcement, concrete, waterproofing, drainage and building services. FORMA checks these at defined hold points, before they are covered up by the next stage of work.',
    introHeading: 'Beyond finishes: the systems that make a building work',
    intro:
      'Some quality issues are visible on a walk-through; others are buried in a wall or a roof void and only reveal themselves years later as a leak, a crack or a failed system. Technical supervision goes beyond general site inspection to focus specifically on structural execution, building services installation and the technical junctions most prone to failure in a tropical marine environment, coordinating directly with the structural and MEP engineers where their input is required.',
    scope: [
      {
        title: 'Structural verification',
        body: 'Checking reinforcement, formwork, concrete quality and connection details against the structural engineer\'s drawings.',
      },
      {
        title: 'MEP compliance',
        body: 'Verifying electrical, plumbing, drainage and air-conditioning installations against the engineered design and applicable standards.',
      },
      {
        title: 'Building envelope detailing',
        body: 'Waterproofing, junction and shading detail checks at the points most exposed to tropical weathering.',
      },
      {
        title: 'Consultant coordination',
        body: 'Managing site queries between contractor and specialist engineers to resolve technical issues quickly.',
      },
    ],
    process: [
      { title: 'Documentation review', body: 'Structural and MEP drawings reviewed for coordination gaps before construction.' },
      { title: 'Structural stage inspections', body: 'Reinforcement and concrete works checked at each pour.' },
      { title: 'MEP rough-in inspection', body: 'Services installation verified before walls and ceilings close it from view.' },
      { title: 'Envelope inspection', body: 'Waterproofing and junction details checked before finishes are applied.' },
      { title: 'Testing and commissioning', body: 'Systems tested and commissioned against design performance criteria.' },
      { title: 'Technical handover', body: 'As-built technical documentation compiled for the client.' },
    ],
    deliverables: [
      'Structural inspection records at each critical stage',
      'MEP compliance verification report',
      'Building envelope and waterproofing inspection log',
      'Consultant coordination and query resolution log',
      'As-built technical documentation at handover',
    ],
    materialsHeading: 'Where technical failures actually originate',
    materials:
      'Most long-term technical failures in tropical construction trace back to a small set of causes: inadequate concrete cover leading to reinforcement corrosion, poorly detailed roof and terrace waterproofing, and MEP penetrations through the building envelope that are not properly sealed. Technical supervision targets exactly these points, at the stage when they are still correctable.',
    budgetHeading: 'What affects technical supervision scope and cost',
    budgetIntro:
      'Technical supervision is typically scoped alongside a project\'s structural and MEP complexity rather than its overall size alone.',
    budgetFactors: [
      'Structural system complexity and number of critical pour stages',
      'Scale and complexity of MEP systems, including air conditioning',
      'Number of specialist consultants requiring coordination',
      'Extent of waterproofing and envelope detailing involved',
      'Whether commissioning and systems testing are included in scope',
    ],
    pricingRows: [
      { item: 'Single structural system verification', note: 'Standard structural frame, straightforward MEP' },
      { item: 'Structural + MEP coordination', note: 'Multiple consultants to coordinate, more complex systems' },
      { item: 'Full technical programme (structural + MEP + envelope)', note: 'Comprehensive verification across all technical systems' },
    ],
    faqs: [
      {
        q: 'How is technical supervision different from general construction supervision?',
        a: 'Technical supervision focuses specifically on structural and building-systems compliance with engineered design; general construction supervision covers broader quality, workmanship and progress monitoring. Many projects use both together.',
      },
      {
        q: 'Do you supervise structural work poured by another contractor?',
        a: 'Yes, structural stage inspections for reinforcement and concrete quality are a core part of this service, regardless of who holds the construction contract.',
      },
      {
        q: 'Can you coordinate directly with our structural engineer?',
        a: 'Yes, direct coordination with the project\'s structural and MEP engineers is central to resolving technical site queries efficiently.',
      },
      {
        q: 'Do you check air conditioning and mechanical systems specifically?',
        a: 'Yes, MEP compliance checks include air conditioning sizing and installation as part of the broader mechanical and electrical review.',
      },
      {
        q: 'What happens if reinforcement or concrete work does not meet specification?',
        a: 'Non-compliant work is documented and flagged before the next stage proceeds, with remediation confirmed by re-inspection rather than accepted on assurance alone.',
      },
      {
        q: 'Is waterproofing inspection included in technical supervision?',
        a: 'Yes, envelope and waterproofing detailing at roofs, terraces and wet areas is one of the specific focus areas of this service.',
      },
      {
        q: 'Do you provide as-built technical drawings at the end of the project?',
        a: 'As-built technical documentation is compiled as part of the technical handover, valuable for future maintenance and any subsequent renovation work.',
      },
      {
        q: 'Can technical supervision be added partway through a build?',
        a: 'Yes, following an initial technical review of work already completed to establish what has and has not been verified to date.',
      },
    ],
    ctaHeading: 'Want the structural and technical detail checked properly?',
    ctaBody: 'Tell us about the project stage and which systems concern you most.',
    ctaLabel: 'Request a Consultation',
    cardSummary: 'Structural and MEP compliance verification during construction.',
  },

  'landscape-design': {
    seo: {
      title: 'Landscape & Pool Design in Koh Phangan | FORMA',
      description:
        'Landscape design for tropical gardens and pools on Koh Phangan: planting, drainage, retaining and outdoor living designed as part of the house.',
    },
    navLabel: 'Landscape Design',
    h1: 'Landscape Design for Tropical Gardens & Pools in Koh Phangan',
    tagline: 'Tropical landscape and outdoor living design',
    directAnswer:
      'FORMA designs tropical gardens, pool surrounds and outdoor living areas on Koh Phangan as an extension of the architecture. The design covers planting suited to the soil and climate, drainage, retaining walls, shade and lighting, so the landscape works through the monsoon and matures well over time.',
    introHeading: 'The garden is not what surrounds the house — it completes it',
    intro:
      'On a tropical island, the boundary between inside and outside is one of the most important design decisions a project makes. A pool positioned without regard to the living room\'s sightlines, planting that blocks the very breeze the architecture was designed to capture, or drainage left unresolved until construction — these are the failures we design against from the outset, treating landscape as a discipline coordinated with architecture rather than an afterthought applied once the building is finished.',
    scope: [
      {
        title: 'Pool and outdoor living design',
        body: 'Pool positioning, decking and shaded outdoor rooms designed as continuous space with the interior.',
      },
      {
        title: 'Planting strategy',
        body: 'Species selection for climate resilience, privacy, shade and low ongoing maintenance.',
      },
      {
        title: 'Pathways and hardscape',
        body: 'Circulation, steps and retaining details resolved for the site\'s actual slope and drainage pattern.',
      },
      {
        title: 'Drainage and water management',
        body: 'Surface water strategy that protects the building and prevents erosion on sloped sites during monsoon rainfall.',
      },
    ],
    process: [
      { title: 'Site analysis', body: 'Slope, drainage, existing vegetation and microclimate assessed.' },
      { title: 'Concept', body: 'Outdoor living zones and pool positioning developed with the architecture.' },
      { title: 'Planting design', body: 'Species palette selected for resilience, privacy and maintenance realism.' },
      { title: 'Technical documentation', body: 'Drainage, retaining and hardscape details prepared for construction.' },
      { title: 'Construction coordination', body: 'Landscape works sequenced with building construction where relevant.' },
      { title: 'Establishment', body: 'Planting establishment guidance for the first growing seasons.' },
    ],
    deliverables: [
      'Site and microclimate analysis',
      'Landscape concept plan integrated with architecture',
      'Planting palette and layout drawings',
      'Drainage and hardscape technical detailing',
      'Planting establishment and maintenance guidance',
    ],
    materialsHeading: 'Planting and materials for tropical gardens',
    materials:
      'We favour planting palettes that are genuinely resilient to Koh Phangan\'s conditions — drought-tolerant once established, tolerant of intense sun and heavy seasonal rain, and selected as much for structure and shade as for flowering display. Hardscape materials are chosen for slip resistance around pools and durability against constant UV and moisture exposure.',
    budgetHeading: 'What affects landscape design cost',
    budgetIntro:
      'Landscape budgets vary with site scale, slope complexity and the extent of hardscape versus planting in the design.',
    budgetFactors: [
      'Site area and slope requiring retaining or terracing',
      'Pool size and hardscape extent',
      'Planting density and maturity of specimens selected',
      'Drainage complexity, particularly on steeper plots',
      'Irrigation system requirements for establishment and long-term care',
    ],
    pricingRows: [
      { item: 'Compact garden or pool surrounds', note: 'Modest site area, standard planting and hardscape' },
      { item: 'Mid-size landscape with pool integration', note: 'Larger site, more extensive hardscape and planting density' },
      { item: 'Large estate landscape', note: 'Extensive site area, significant retaining/drainage work, mature specimen planting' },
    ],
    faqs: [
      {
        q: 'Can landscape design be added to an existing villa?',
        a: 'Yes, we regularly design landscape schemes for existing properties, working with the current architecture and site conditions.',
      },
      {
        q: 'How do you handle drainage on steeply sloped sites?',
        a: 'Through a combination of graded surfaces, retaining structures and managed drainage channels designed specifically for the site\'s contours and monsoon rainfall intensity.',
      },
      {
        q: 'What plants actually thrive on Koh Phangan?',
        a: 'A range of tropical species tolerant of intense sun, heavy seasonal rain and, near the coast, some salt exposure; we select species specific to each site\'s microclimate rather than a fixed generic list.',
      },
      {
        q: 'Do you design the pool itself or only the surrounding landscape?',
        a: 'Pool positioning and form are typically resolved with the architecture; detailed pool engineering is coordinated with specialist pool contractors alongside our landscape design.',
      },
      {
        q: 'How much maintenance will the garden need?',
        a: 'We design deliberately for realistic maintenance capacity, discussed with the client upfront, favouring resilient planting over high-maintenance formal schemes unless specifically requested.',
      },
      {
        q: 'Can landscape design help with privacy from neighbouring plots?',
        a: 'Yes, strategic planting is one of the most effective and attractive ways to manage privacy without resorting to solid walls that block breeze and views.',
      },
      {
        q: 'Do you handle irrigation system design?',
        a: 'Yes, irrigation is planned as part of the landscape technical documentation, sized appropriately for the planting palette and site conditions.',
      },
      {
        q: 'How long until a new garden looks established?',
        a: 'Tropical planting grows quickly with the right species selection; a garden typically reads as established within one to two growing seasons, depending on the specimen sizes planted initially.',
      },
    ],
    ctaHeading: 'Want the outdoors designed as carefully as the house?',
    ctaBody: 'Tell us about your site\'s slope, views and how you want to live outdoors.',
    ctaLabel: 'Ask About Your Project',
    cardSummary: 'Pools, planting and outdoor living integrated with the architecture.',
  },

  'permits-planning': {
    seo: {
      title: 'Building Permits & Planning in Koh Phangan | FORMA',
      description:
        'Building permit and planning support on Koh Phangan: documentation, consultant coordination and application preparation for a villa or small development.',
    },
    navLabel: 'Permits & Planning',
    h1: 'Building Permits & Planning Support in Koh Phangan',
    tagline: 'Building permit and planning coordination',
    directAnswer:
      'FORMA prepares the drawings and documents needed for a building permit on Koh Phangan and coordinates the engineers and consultants involved in the application. We explain the requirements for your plot in advance. Approval itself is decided by the authorities, so no outcome or timeline is guaranteed.',
    introHeading: 'A process that rewards preparation, not shortcuts',
    intro:
      'Permit and planning requirements on Koh Phangan depend on zoning, plot characteristics and the specific building type proposed, and are ultimately determined by the relevant local authority rather than by us. What we control is the quality and completeness of the documentation submitted, and clear, honest communication with clients about realistic timelines and requirements — never a promise of a specific approval outcome, which is not ours to give.',
    scope: [
      {
        title: 'Requirement review',
        body: 'Confirming which approvals apply to the specific site, zoning and building type before design finalisation.',
      },
      {
        title: 'Documentation preparation',
        body: 'Compiling drawings, reports and forms to the standard required for submission.',
      },
      {
        title: 'Submission coordination',
        body: 'Managing the submission process and responding to authority queries as they arise.',
      },
      {
        title: 'Liaison through decision',
        body: 'Ongoing communication with the client on status, without overstating certainty around timing or outcome.',
      },
    ],
    process: [
      { title: 'Requirement confirmation', body: 'Zoning and applicable approval pathway confirmed for the specific site.' },
      { title: 'Documentation preparation', body: 'Drawings and supporting reports compiled to the required standard.' },
      { title: 'Submission', body: 'Application submitted to the relevant authority.' },
      { title: 'Query response', body: 'Any authority queries addressed promptly with updated documentation.' },
      { title: 'Decision', body: 'Outcome communicated to the client as soon as it is received.' },
      { title: 'Conditions coordination', body: 'Any approval conditions coordinated into the construction documentation.' },
    ],
    deliverables: [
      'Confirmed requirement and approval pathway summary',
      'Complete permit submission documentation',
      'Submission and query-response tracking',
      'Approval conditions integrated into construction drawings where applicable',
    ],
    materialsHeading: 'Documentation standard',
    materials:
      'Submission quality materially affects how smoothly an application proceeds. We prepare technical drawings and supporting reports to a consistent, complete standard, cross-checked against the specific site\'s zoning classification before submission to reduce avoidable queries and delay.',
    budgetHeading: 'What affects permit and planning timelines',
    budgetIntro:
      'We are cautious about quoting fixed timelines, since approval processes depend on the relevant authority and site-specific factors outside our control. The variables below affect how straightforward a given application is likely to be.',
    budgetFactors: [
      'Zoning classification and any site-specific restrictions',
      'Building type, scale and any variance from typical requirements',
      'Completeness and quality of the submitted documentation',
      'Authority workload and processing times, which vary and are outside our control',
      'Whether the site has any existing compliance history to resolve first',
    ],
    pricingRows: [
      { item: 'Straightforward single-dwelling application', note: 'Standard zoning, no variances required' },
      { item: 'Standard application with variances', note: 'Site-specific conditions requiring additional documentation or review' },
      { item: 'Complex application (multi-unit or commercial)', note: 'Larger scope, more extensive supporting reports and coordination' },
    ],
    faqs: [
      {
        q: 'Can you guarantee my permit will be approved?',
        a: 'No. We do not hold government authority and cannot guarantee an approval outcome; our role is to prepare complete, accurate documentation and manage the submission process professionally.',
      },
      {
        q: 'How long does the permit process typically take?',
        a: 'Timelines depend on the relevant authority and the specific application, and are not something we can commit to in advance; we share realistic expectations based on current known processing patterns once your specific application is scoped.',
      },
      {
        q: 'Do you handle permits for renovation projects too?',
        a: 'Yes, where renovation works require approval, the same documentation and submission coordination process applies.',
      },
      {
        q: 'What happens if the authority requests changes to the design?',
        a: 'We review the request with the design team, prepare a compliant response and resubmit promptly, keeping the client informed throughout.',
      },
      {
        q: 'Can construction start before the permit is approved?',
        a: 'We advise against starting construction ahead of the required approvals; specific circumstances should be discussed directly, as the risk sits with the property owner.',
      },
      {
        q: 'Do you coordinate permits for land we have not yet purchased?',
        a: 'We can provide a preliminary review of likely zoning and approval requirements to inform a purchase decision, though a full application requires confirmed ownership or authorisation.',
      },
      {
        q: 'Are permit requirements different for foreign-owned property?',
        a: 'Ownership structure can affect the applicable process; we recommend discussing your specific situation directly, as this sits partly outside our scope and may require separate legal advice.',
      },
      {
        q: 'What documents do you need from us to start?',
        a: 'Typically land title documents, any existing survey information and confirmation of the intended building brief; we confirm the exact list once your project is scoped.',
      },
    ],
    ctaHeading: 'Need approvals coordinated properly from the start?',
    ctaBody: 'Share your site and building brief so we can confirm the applicable requirements.',
    ctaLabel: 'Ask About Your Project',
    cardSummary: 'Careful, complete permit documentation and submission coordination.',
  },

  'turnkey-projects': {
    seo: {
      title: 'Turnkey Villa Projects in Koh Phangan | Design-Build | FORMA',
      description:
        'Turnkey villa projects on Koh Phangan: design, permits, construction and handover managed by one team, from first sketch to finished, furnished keys.',
    },
    navLabel: 'Turnkey Projects',
    h1: 'Turnkey Villa Projects in Koh Phangan',
    tagline: 'Turnkey design-build for villas',
    directAnswer:
      'A turnkey villa project with FORMA covers everything from the first sketch to handover on Koh Phangan: design, permit documentation, construction, interiors and landscape under one contract and one point of responsibility. You decide at the main milestones, and the team manages the work between them.',
    introHeading: 'One brief, one team, one outcome',
    intro:
      'Coordinating separate architects, interior designers, builders and project managers can work well when every relationship is managed carefully — but it also multiplies the points where miscommunication and cost creep can occur. Our turnkey service removes that overhead for clients who want a single point of accountability: one studio responsible for the design intent, the technical execution and the finished result, from the first concept sketch to the day the keys are handed over.',
    scope: [
      {
        title: 'Integrated design',
        body: 'Architecture, interior and landscape design developed together from the outset, avoiding the misalignment that comes from separate, sequential appointments.',
      },
      {
        title: 'Permits and planning',
        body: 'Approval documentation prepared and coordinated as part of the single project timeline.',
      },
      {
        title: 'Construction delivery',
        body: 'Build executed directly by our construction team against the integrated design documentation.',
      },
      {
        title: 'Project management and handover',
        body: 'Budget, schedule and quality managed end to end, concluding with a structured handover.',
      },
    ],
    process: [
      { title: 'Discovery', body: 'Brief, budget parameters and site review.' },
      { title: 'Concept', body: 'Integrated architecture, interior and landscape concept presented together.' },
      { title: 'Design development', body: 'Full technical documentation developed across all disciplines.' },
      { title: 'Permits', body: 'Approvals coordinated within the overall project timeline.' },
      { title: 'Construction', body: 'Build delivered and managed directly by our team.' },
      { title: 'Handover', body: 'Snagging, completion documentation and orientation for the client.' },
    ],
    deliverables: [
      'Integrated architecture, interior and landscape concept and documentation',
      'Coordinated permit and planning submission',
      'Full construction delivery with in-house quality control',
      'Ongoing project management and reporting',
      'Complete handover pack with warranties and as-built documentation',
    ],
    materialsHeading: 'One coordinated material and technical strategy',
    materials:
      'Because architecture, interiors and construction sit within the same team, material decisions are made once and carried through consistently — a stone specified in the architectural drawings is the same stone detailed in the interior joinery and the same stone procured and installed on site, without the translation losses that occur across separate firms.',
    budgetHeading: 'What affects turnkey project cost',
    budgetIntro:
      'Turnkey budgets reflect the full scope of design and construction together. We build a realistic budget with each client early, rather than presenting a number before the site and brief are properly understood.',
    budgetFactors: [
      'Overall villa size, complexity and number of structures',
      'Specification level across architecture, interiors and landscape',
      'Site conditions, including slope, access and required earthworks',
      'Timeline requirements and any schedule compression requested',
      'Extent of custom joinery, imported materials and custom detailing',
    ],
    pricingRows: [
      { item: 'Compact villa turnkey', note: 'Single pavilion, standard specification throughout' },
      { item: 'Mid-size villa turnkey', note: 'Larger footprint, higher finish specification, more custom detailing' },
      { item: 'Large or multi-structure turnkey', note: 'Multiple structures, extensive custom joinery, imported materials' },
    ],
    faqs: [
      {
        q: 'What exactly is included in a turnkey project?',
        a: 'Architecture, interior design, landscape design, permits coordination, construction and project management, delivered as one continuous engagement through to a completed, furnished-ready home.',
      },
      {
        q: 'How is turnkey different from hiring FORMA for design and construction separately?',
        a: 'The scope can be similar, but turnkey is structured from day one as a single integrated engagement with one budget, one schedule and one point of accountability, rather than sequential separate contracts.',
      },
      {
        q: 'Can we still make design decisions along the way?',
        a: 'Yes — turnkey does not mean handing over blind control. Key decisions at each stage are presented for client approval; the integration is in coordination, not in removing your input.',
      },
      {
        q: 'Is turnkey more expensive than managing separate consultants ourselves?',
        a: 'Not necessarily — coordination overhead, rework from miscommunication and schedule slippage across separate parties often cost more than they appear to save; turnkey pricing reflects the full scope transparently.',
      },
      {
        q: 'Do you handle furniture and move-in styling as part of turnkey?',
        a: 'Yes, furniture specification and final styling are included as part of the interior design scope within a turnkey engagement.',
      },
      {
        q: 'Can turnkey projects include hospitality or multi-villa developments?',
        a: 'Yes, the same integrated approach applies to larger hospitality or multi-unit developments, coordinated closely with our Project Management service for the added complexity.',
      },
      {
        q: 'What is the typical timeline for a turnkey villa?',
        a: 'Timelines depend heavily on scale and specification; we provide a project-specific schedule once the brief and site survey are complete, typically covering design, permits and construction phases sequentially.',
      },
      {
        q: 'How involved do we need to be if we live overseas?',
        a: 'Turnkey is specifically well suited to overseas clients — structured reporting, scheduled video reviews and clearly defined decision points keep the project moving without requiring continuous on-site presence.',
      },
    ],
    ctaHeading: 'Want one team accountable from concept to keys?',
    ctaBody: 'Tell us about your site, budget parameters and timeline, and we will outline how a turnkey engagement would work.',
    ctaLabel: 'Start a Project',
    cardSummary: 'Architecture, interiors, construction and management as one integrated service.',
  },

  'eco-construction': {
    seo: {
      title: 'Eco Construction in Koh Phangan | Sustainable Building | FORMA',
      description:
        'Eco construction on Koh Phangan: passive cooling, shading, rainwater, solar readiness and durable materials that cut running costs without gimmicks.',
    },
    navLabel: 'Eco Construction',
    h1: 'Eco Construction & Sustainable Building in Koh Phangan',
    tagline: 'Sustainable, climate-responsive construction',
    directAnswer:
      'Eco construction at FORMA starts with passive design on Koh Phangan: orientation, shading, cross-ventilation and thermal mass that reduce cooling demand before any equipment is added. Renewable energy, water collection and durable local materials are then sized against that lower demand, keeping running costs and maintenance realistic.',
    introHeading: 'Sustainability as design discipline, not decoration',
    intro:
      'A building marketed as sustainable but reliant entirely on mechanical cooling and imported materials has not actually reduced its footprint — it has relabelled the problem. Our eco construction approach treats sustainability as a design discipline applied from the earliest concept stage: orientation and massing that reduce solar heat gain before it needs to be corrected, natural ventilation strategies that lower cooling load genuinely, and material choices weighed against their real embodied impact and local availability, not just their marketing.',
    scope: [
      {
        title: 'Passive design strategy',
        body: 'Orientation, shading, massing and ventilation designed to reduce heating and cooling demand structurally, before any equipment is specified.',
      },
      {
        title: 'Material selection',
        body: 'Weighing embodied carbon, durability and regional availability against performance, avoiding materials chosen for green marketing appeal alone.',
      },
      {
        title: 'Energy strategy',
        body: 'Coordination of efficient systems and, where appropriate, renewable generation, sized against genuine passive-design-reduced demand.',
      },
      {
        title: 'Water management',
        body: 'Rainwater harvesting, greywater consideration and landscape irrigation designed to reduce potable water demand.',
      },
    ],
    process: [
      { title: 'Climate and site analysis', body: 'Solar, wind and rainfall patterns analysed for the specific site.' },
      { title: 'Passive design concept', body: 'Orientation, massing and shading developed to reduce mechanical load before any system is added.' },
      { title: 'Material and systems strategy', body: 'Material and energy systems selected against performance and impact criteria.' },
      { title: 'Design development', body: 'Passive and active systems coordinated into the full technical documentation.' },
      { title: 'Construction', body: 'Build executed with attention to the performance details that make passive strategies actually work.' },
      { title: 'Performance handover', body: 'Guidance provided on operating the home to realise its designed efficiency.' },
    ],
    deliverables: [
      'Climate and site performance analysis',
      'Passive design strategy report',
      'Material selection rationale',
      'Energy and water systems coordination',
      'Operating guidance for designed performance at handover',
    ],
    materialsHeading: 'Material and systems approach',
    materials:
      'We favour materials with genuine local or regional availability, honest durability in humid tropical conditions, and a defensible impact rationale over imported products chosen mainly for a sustainability label. Where renewable energy or water-saving systems are specified, sizing is based on the demand actually remaining after passive design measures — not oversized as a substitute for good design.',
    budgetHeading: 'What affects eco construction cost',
    budgetIntro:
      'Some passive design measures cost little more than conventional construction when planned from the outset; others, such as renewable energy systems, involve upfront investment weighed against long-term operating savings. We present these trade-offs honestly rather than assuming every client wants the same balance.',
    budgetFactors: [
      'Extent of passive design integration required by site orientation constraints',
      'Whether renewable energy or advanced water systems are included',
      'Material specification and sourcing distance for selected products',
      'Level of building performance monitoring or certification pursued',
      'Complexity of integrating passive and active systems together',
    ],
    pricingRows: [
      { item: 'Passive design integration only', note: 'Orientation, shading and ventilation strategy, no added systems' },
      { item: 'Passive design + renewable energy', note: 'Solar or other renewable systems sized against passive-reduced demand' },
      { item: 'Full eco programme (passive + energy + water)', note: 'Comprehensive integration across passive design, energy and water systems' },
    ],
    faqs: [
      {
        q: 'Does eco construction cost significantly more than standard building?',
        a: 'Not necessarily — many passive design measures cost little extra when integrated from concept stage; the larger cost trade-offs typically relate to renewable energy systems, which we present with realistic payback expectations.',
      },
      {
        q: 'What does passive cooling actually mean in practice?',
        a: 'Orientation, shading, cross-ventilation paths and thermal mass choices that reduce indoor heat gain and allow natural airflow to do work that air conditioning would otherwise need to do.',
      },
      {
        q: 'Can eco construction principles apply to a renovation, not just new builds?',
        a: 'Yes, though the extent depends on what the existing structure and orientation allow; we assess this honestly during the renovation condition survey.',
      },
      {
        q: 'Do you pursue formal green building certification?',
        a: 'This can be scoped where a client specifically wants formal certification; we discuss the relevant standards and requirements case by case rather than assuming it is always the goal.',
      },
      {
        q: 'What water-saving measures do you typically include?',
        a: 'Rainwater harvesting for irrigation or non-potable use and careful landscape irrigation design are common; further measures depend on site conditions and client priorities.',
      },
      {
        q: 'Will an eco-designed villa still feel comfortable during the hottest months?',
        a: 'That is the specific aim of passive design — reducing reliance on air conditioning rather than eliminating comfort; mechanical cooling remains available as a backup rather than the primary strategy.',
      },
      {
        q: 'Do sustainable material choices limit the design aesthetic?',
        a: 'No — natural stone, timber and considered concrete detailing align naturally with both sustainable performance and the editorial tropical aesthetic we design toward.',
      },
      {
        q: 'Can solar power be integrated into a villa design?',
        a: 'Yes, solar systems are commonly coordinated as part of the energy strategy, sized against genuine demand after passive measures have reduced overall load.',
      },
    ],
    ctaHeading: 'Want a home designed to work with the climate?',
    ctaBody: 'Tell us about your site and priorities, and we will outline a passive-design-first approach.',
    ctaLabel: 'Ask About Your Project',
    cardSummary: 'Passive design, material integrity and energy/water strategy from concept.',
  },

  'concrete-construction': {
    seo: {
      title: 'Concrete Construction in Koh Phangan | FORMA',
      description:
        'Concrete construction for tropical villas on Koh Phangan: engineered frames, board-formed and exposed finishes, and mix, cover and waterproofing detailing.',
    },
    navLabel: 'Concrete Construction',
    h1: 'Concrete Construction for Tropical Villas in Koh Phangan',
    tagline: 'Reinforced concrete design-build, concept to handover',
    directAnswer:
      'FORMA builds reinforced concrete frames, slabs and exposed architectural concrete for villas on Koh Phangan. Salt air, humidity and monsoon rain make concrete quality decisive, so mix design, reinforcement cover, formwork, curing and waterproofing are specified and checked rather than left to site habit.',
    introHeading: 'Concrete rewards precision — and punishes shortcuts',
    intro:
      'Reinforced concrete is the structural backbone of most substantial builds on Koh Phangan, and it is unforgiving of poor execution: insufficient cover, inconsistent curing or careless formwork surface today onto decades of maintenance problems tomorrow. Our concrete construction service treats structural design and execution as a single continuous discipline, engineering for the specific demands of coastal humidity, monsoon rainfall and seismic-aware detailing, and holding site execution to the same standard as the drawings.',
    scope: [
      {
        title: 'Structural concept and engineering coordination',
        body: 'Structural system selection and coordination with engineers from the earliest design stage.',
      },
      {
        title: 'Formwork and finish strategy',
        body: 'Board-formed, smooth or textured concrete finish specified and detailed for the desired architectural expression.',
      },
      {
        title: 'Reinforcement and durability detailing',
        body: 'Cover, curing and protection strategy specified for long-term durability in a humid, salt-influenced environment.',
      },
      {
        title: 'Construction execution',
        body: 'Direct site management of formwork, reinforcement and pouring sequences against the engineered specification.',
      },
    ],
    process: [
      { title: 'Structural concept', body: 'Structural system and expression strategy developed with the architecture.' },
      { title: 'Engineering coordination', body: 'Detailed structural design finalised with the project engineer.' },
      { title: 'Formwork and finish planning', body: 'Formwork strategy and finish sample approval before major pours.' },
      { title: 'Construction', body: 'Reinforcement, formwork and pouring executed to the engineered detail.' },
      { title: 'Quality verification', body: 'Cover, curing and finish quality checked at each stage.' },
      { title: 'Handover', body: 'As-built structural documentation compiled for the client.' },
    ],
    deliverables: [
      'Structural concept and system selection rationale',
      'Coordinated structural engineering documentation',
      'Formwork and finish specification with sample approval',
      'Staged quality verification records',
      'As-built structural documentation at handover',
    ],
    materialsHeading: 'Concrete specification for coastal tropical conditions',
    materials:
      'Concrete durability in this environment depends on getting a small number of decisions right consistently: adequate reinforcement cover, appropriate concrete mix design for the exposure condition, disciplined curing regardless of schedule pressure, and careful detailing at every penetration and junction where water can find a path to the reinforcement. We hold these standards regardless of whether the finish is left exposed or covered.',
    budgetHeading: 'What affects concrete construction cost',
    budgetIntro:
      'Concrete costs are driven by structural complexity and finish ambition together. We discuss both openly once a structural concept exists.',
    budgetFactors: [
      'Structural system complexity and span requirements',
      'Whether concrete is left exposed as a finish or covered',
      'Site access for concrete delivery and pumping equipment',
      'Formwork complexity for curved, board-formed or textured finishes',
      'Exposure condition and durability specification required',
    ],
    pricingRows: [
      { item: 'Standard structural frame', note: 'Conventional spans, covered/finished concrete' },
      { item: 'Complex or exposed-finish structure', note: 'Board-formed or textured architectural finish, tighter tolerances' },
      { item: 'Large-span or multi-structure concrete works', note: 'Extended spans, complex geometry, or multiple structures' },
    ],
    faqs: [
      {
        q: 'Can you construct from structural drawings prepared by another engineer?',
        a: 'Yes, provided the documentation is complete enough for accurate buildability review; we coordinate directly with the originating engineer where needed.',
      },
      {
        q: 'Do you specialise in exposed architectural concrete finishes?',
        a: 'Yes, board-formed and other architectural concrete finishes are a particular strength, requiring close formwork and pour-sequence control that we manage directly on site.',
      },
      {
        q: 'How do you protect concrete from salt air and coastal exposure?',
        a: 'Through appropriate cover depth, mix design and, where relevant, protective coatings specified for the site\'s specific exposure condition, rather than a single generic specification applied everywhere.',
      },
      {
        q: 'Can concrete construction be combined with a turnkey villa project?',
        a: 'Yes, this service is frequently delivered as part of a broader turnkey engagement where the structural system is concrete-based.',
      },
      {
        q: 'Do you handle large-span or unusual concrete geometries?',
        a: 'Complex spans and geometries are assessed with the structural engineer for buildability and cost before being committed to the design; we are direct about where a form is impractical to build well.',
      },
      {
        q: 'How is curing managed given the tropical climate?',
        a: 'Curing protocols account for temperature and humidity conditions specific to the site and season, and are followed regardless of schedule pressure, since inadequate curing is a leading cause of long-term concrete deterioration.',
      },
      {
        q: 'Can you build multi-unit or hospitality structures in concrete?',
        a: 'Yes, larger concrete structures for hospitality or multi-villa developments are within scope, typically coordinated with our Project Management service given the added complexity.',
      },
      {
        q: 'What is the typical timeline for structural concrete works?',
        a: 'Timeline depends on structural scale and complexity; a project-specific pour and curing schedule is provided once the structural design is finalised.',
      },
    ],
    ctaHeading: 'Have a concrete structure that needs to be built right?',
    ctaBody: 'Share your structural drawings or concept, and we will assess buildability and approach.',
    ctaLabel: 'Discuss Your Site',
    cardSummary: 'Structural concrete design-build engineered for coastal tropical durability.',
  },
};
