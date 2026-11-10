import type { PriceId } from '../pricing';

export interface PriceDetail { included: string[]; excluded: string[] }

const VAT = 'VAT and government fees';
const details: Record<PriceId, PriceDetail> = {
  'architecture.compact': {
    included: [
      'Site and context analysis for a straightforward plot',
      'Concept design package with views of key spaces',
      'Design development drawing set',
      'Construction documentation for permitting and build',
      'Coordination with structural and MEP consultants',
    ],
    excluded: [
      'Construction cost',
      'Structural and MEP engineering fees, billed by the consultants',
      VAT,
      'Construction supervision, unless added to the scope',
    ],
  },
  'architecture.mid': {
    included: [
      'Site analysis including slope, access and earthworks implications',
      'Concept package for a building with more levels or structural complexity',
      'Design development set with more custom detailing',
      'Construction documentation for permitting and build',
      'Wider consultant coordination across structure, MEP and landscape',
    ],
    excluded: [
      'Construction cost and land',
      'Specialist consultant fees, billed separately',
      VAT,
      'Site visits during construction, unless agreed in the proposal',
    ],
  },
  'architecture.large': {
    included: [
      'Site and context analysis for a large or multi-structure project',
      'Concept design for multiple buildings with extensive custom detailing',
      'Full design development and construction documentation set',
      'Heavy consultant coordination across all disciplines',
    ],
    excluded: [
      'Construction cost, land and infrastructure',
      'All consultant fees, billed separately',
      VAT,
      'Furniture, fittings and equipment',
    ],
  },
  'villa-design.compact': {
    included: [
      'View, wind and shading analysis for the specific site',
      'Floor plans, elevations and sections for a single pavilion',
      'Concept views of key spaces',
      'Concept and schematic package as a fixed scope',
    ],
    excluded: [
      'Full construction documentation, unless added to the scope',
      'Construction cost and land',
      'Structural and MEP consultant fees',
      VAT,
    ],
  },
  'villa-design.mid': {
    included: [
      'Site analysis covering view, wind, shading and slope',
      'Plans, elevations and sections for a larger footprint',
      'Pool integration in the concept layout',
      'Concept views of key spaces',
      'Interior and landscape coordination at concept level',
    ],
    excluded: [
      'Full construction documentation, unless added to the scope',
      'Pool engineering and other consultant fees',
      'Construction cost and land',
      VAT,
    ],
  },
  'villa-design.large': {
    included: [
      'Site analysis for a large plot or several pavilions',
      'Plans, elevations and sections for every pavilion',
      'Concept views for key spaces, with extensive glazing and joinery concepts',
      'Interior and landscape coordination set',
      'Concept and schematic package as a fixed scope',
    ],
    excluded: [
      'Full construction documentation, unless added to the scope',
      'Specialist and engineering consultant fees',
      'Construction cost, land and island logistics',
      VAT,
    ],
  },
  'interior-design.room': {
    included: [
      'Material and finishes palette for the room or suite',
      'Lighting concept and fixture schedule',
      'Furniture layout and specification guidance',
      'Styling direction for the finished space',
    ],
    excluded: [
      'Furniture, fixtures and finishes themselves',
      'Installation and contractor costs',
      'Extensive custom joinery drawings, unless added',
      VAT,
    ],
  },
  'interior-design.villa': {
    included: [
      'Material and finishes palette for all principal rooms',
      'Lighting design and fixture schedule',
      'Joinery, kitchen and bathroom drawings at standard joinery level',
      'Furniture layout and specification guidance',
      'Styling direction for handover',
    ],
    excluded: [
      'Furniture, fittings and equipment purchase',
      'Fit-out construction and installation',
      'Shipping and island logistics for imported items',
      VAT,
    ],
  },
  'interior-design.villa-custom': {
    included: [
      'Material and finishes palette including imported materials',
      'Custom cabinetry and joinery drawings throughout',
      'Lighting design and fixture schedule',
      'Furniture specification and full styling package',
    ],
    excluded: [
      'Furniture, joinery fabrication and materials themselves',
      'Fit-out construction and installation',
      'Import duties, shipping and island logistics',
      VAT,
    ],
  },
  'construction.compact': {
    included: [
      'Pre-construction buildability and procurement plan',
      'Construction of the structure with standard finishes',
      'Construction schedule with milestone reporting',
      'Staged quality inspections and completion documentation',
    ],
    excluded: [
      'Architectural and engineering design fees',
      'Land and site purchase',
      'Furniture, fittings and equipment',
      VAT,
    ],
  },
  'construction.mid': {
    included: [
      'Buildability review and procurement plan with import lead times',
      'Construction including pool integration and higher-spec finishes',
      'Coordinated management of trades and subcontractors',
      'Staged quality inspection records',
      'Completion documentation and handover pack',
    ],
    excluded: [
      'Design fees',
      'Land and site purchase',
      'Furniture, fittings and equipment',
      VAT,
    ],
  },
  'construction.large': {
    included: [
      'Procurement plan for imported and specialist materials',
      'Construction of multiple structures or complex structural systems',
      'Detailed schedule with milestone reporting across buildings',
      'Staged quality inspections and handover documentation',
    ],
    excluded: [
      'Design and consultant fees',
      'Land, utilities connection and external infrastructure',
      'Furniture, fittings and equipment',
      VAT,
    ],
  },
  'renovation.refresh': {
    included: [
      'Condition review of the areas being updated',
      'Finishes, fixtures and surface-level updates',
      'Works schedule and quality checks',
      'Handover documentation and maintenance guidance',
    ],
    excluded: [
      'Structural work, as the structure is left untouched',
      'Furniture and decorative items',
      'Hidden defects found once surfaces are opened',
      VAT,
    ],
  },
  'renovation.partial': {
    included: [
      'Structural and condition assessment report',
      'Redesign drawings and specification for the new layout',
      'Reconfigured rooms and upgraded services',
      'Phased works schedule and quality management',
    ],
    excluded: [
      'Major structural remediation, unless found in assessment',
      'Furniture, fittings and equipment',
      'Temporary accommodation during works',
      VAT,
    ],
  },
  'renovation.structural': {
    included: [
      'Detailed structural and condition assessment',
      'Redesign drawings and specification for full layout change',
      'Major structural remediation and systems overhaul',
      'Phased schedule, quality management and handover documentation',
    ],
    excluded: [
      'Engineering consultant fees, billed separately',
      'Furniture, fittings and equipment',
      'Unforeseen conditions discovered during opening-up',
      VAT,
    ],
  },
  'project-management.single': {
    included: [
      'Project budget baseline and cost tracking',
      'Master schedule with milestone reporting',
      'Procurement and tender coordination for the main contractor',
      'Client progress reports and final account reconciliation',
    ],
    excluded: [
      'Construction cost itself, which the percentage is applied to',
      'Design and consultant fees',
      'Daily on-site supervision, unless agreed',
      VAT,
    ],
  },
  'project-management.multi-trade': {
    included: [
      'Budget baseline and cost tracking across several trades',
      'Master schedule coordinating specialist trades and consultants',
      'Tender and procurement coordination, including imported items',
      'Regular client progress reports and close-out reconciliation',
    ],
    excluded: [
      'Construction cost itself, which the percentage is applied to',
      'Fees of the consultants being coordinated',
      'Daily on-site supervision, unless agreed',
      VAT,
    ],
  },
  'project-management.multi-structure': {
    included: [
      'Budget baseline and cost tracking across multiple buildings',
      'Master schedule for a larger team and several contracts',
      'Complex procurement and tender coordination',
      'Detailed reporting suited to hospitality or multi-building schemes',
    ],
    excluded: [
      'Construction cost itself, which the percentage is applied to',
      'Design, consultant and operator fees',
      'Permanent on-site staff beyond the agreed scope',
      VAT,
    ],
  },
  'construction-supervision.monthly': {
    included: [
      'Site inspections at the monthly rhythm agreed in the proposal',
      'Written site reports with photographic evidence',
      'Defect and non-compliance tracking log',
      'Final snagging report before handover',
    ],
    excluded: [
      'Daily on-site presence',
      'Contractor and construction costs',
      'Structural and MEP engineering review, a separate service',
      VAT,
    ],
  },
  'construction-supervision.biweekly': {
    included: [
      'Site inspections every two weeks, aligned to construction stages',
      'Written reports with photographic evidence',
      'Defect log and progress assessment against the contractor schedule',
      'Final snagging report before handover',
    ],
    excluded: [
      'Daily on-site presence',
      'Contractor and construction costs',
      'Structural and MEP engineering review, a separate service',
      VAT,
    ],
  },
  'construction-supervision.weekly': {
    included: [
      'Frequent inspections, weekly or more, at critical stages',
      'Detailed written reports with photographic evidence',
      'Defect tracking and close monitoring of contractor progress',
      'Final snagging report before handover',
    ],
    excluded: [
      'Full-time resident site presence',
      'Contractor and construction costs',
      'Structural and MEP engineering review, a separate service',
      VAT,
    ],
  },
  'technical-supervision.structural': {
    included: [
      'Structural inspection records at each critical stage',
      'Review of the structural frame and reinforcement cover',
      'Consultant query resolution log',
      'As-built technical documentation at handover',
    ],
    excluded: [
      'Structural design, which the project engineer provides',
      'MEP and envelope review, unless in scope',
      'Laboratory and material testing fees',
      VAT,
    ],
  },
  'technical-supervision.structural-mep': {
    included: [
      'Structural inspection records at each critical stage',
      'MEP compliance verification report',
      'Coordination across structural and MEP consultants',
      'As-built technical documentation at handover',
    ],
    excluded: [
      'Structural and MEP design fees',
      'Envelope and waterproofing inspection, unless in scope',
      'Testing and commissioning costs charged by third parties',
      VAT,
    ],
  },
  'technical-supervision.full': {
    included: [
      'Structural, MEP and building envelope verification',
      'Waterproofing inspection log for roofs, terraces and wet areas',
      'Coordination log across all specialist consultants',
      'As-built technical documentation at handover',
    ],
    excluded: [
      'Design fees of any consultant',
      'Third-party testing and commissioning charges',
      'Remedial works the contractor must carry out',
      VAT,
    ],
  },
  'landscape-design.compact': {
    included: [
      'Site and microclimate analysis',
      'Landscape concept plan integrated with the architecture',
      'Planting palette and layout drawings',
      'Planting establishment and maintenance guidance',
    ],
    excluded: [
      'Plants, hardscape and installation',
      'Ongoing garden maintenance',
      'Pool engineering, billed separately',
      VAT,
    ],
  },
  'landscape-design.mid': {
    included: [
      'Site analysis covering slope, sun and drainage',
      'Concept plan with pool surrounds and extended hardscape',
      'Denser planting layout drawings',
      'Drainage and hardscape technical detailing',
      'Planting establishment guidance',
    ],
    excluded: [
      'Plants, hardscape and installation',
      'Irrigation equipment and ongoing maintenance',
      'Pool engineering, billed separately',
      VAT,
    ],
  },
  'landscape-design.estate': {
    included: [
      'Site analysis for an extensive site area',
      'Estate-scale concept plan integrated with the architecture',
      'Retaining, terracing and drainage technical detailing',
      'Planting layout including mature specimen selection',
      'Establishment and long-term care guidance',
    ],
    excluded: [
      'Plants, specimen trees, hardscape and installation',
      'Civil and geotechnical engineering fees',
      'Ongoing garden maintenance',
      VAT,
    ],
  },
  'permits-planning.standard': {
    included: [
      'Confirmed requirement and approval pathway summary',
      'Complete permit submission documentation',
      'Submission and query-response tracking',
      'Standard zoning with no variances required',
    ],
    excluded: [
      'Government and authority fees',
      'Architectural and engineering design, unless commissioned',
      'Any guarantee of approval or processing time',
    ],
  },
  'permits-planning.variances': {
    included: [
      'Approval pathway summary covering site-specific conditions',
      'Permit submission with additional supporting documentation',
      'Submission and query-response tracking',
      'Approval conditions carried into construction drawings where applicable',
    ],
    excluded: [
      'Government and authority fees',
      'Specialist reports from third-party consultants',
      'Any guarantee of approval or processing time',
    ],
  },
  'permits-planning.complex': {
    included: [
      'Approval pathway for a multi-unit or commercial scheme',
      'Extensive submission documentation and supporting reports coordination',
      'Ongoing authority liaison and query-response tracking',
      'Approval conditions carried into construction drawings',
    ],
    excluded: [
      'Government and authority fees',
      'Specialist report fees, such as environmental or traffic studies',
      'Any guarantee of approval or processing time',
    ],
  },
  'turnkey-projects.compact': {
    included: [
      'Integrated architecture, interior and landscape design',
      'Coordinated permit and planning submission',
      'Full construction with in-house quality control',
      'Project management, reporting and handover pack',
    ],
    excluded: [
      'Land purchase',
      'Government and permit authority fees',
      'Furniture and equipment beyond the agreed specification',
      VAT,
    ],
  },
  'turnkey-projects.mid': {
    included: [
      'Integrated design across architecture, interiors and landscape',
      'Coordinated permit and planning submission',
      'Construction of a larger footprint with higher-spec finishes',
      'Project management and handover pack with warranties and as-builts',
    ],
    excluded: [
      'Land purchase',
      'Government and permit authority fees',
      'Furniture and equipment beyond the agreed specification',
      VAT,
    ],
  },
  'turnkey-projects.large': {
    included: [
      'Integrated design for multiple structures',
      'Coordinated permit and planning submission',
      'Construction with extensive custom joinery and imported materials',
      'Project management, reporting and complete handover pack',
    ],
    excluded: [
      'Land, utilities connection and external infrastructure',
      'Government and permit authority fees',
      'Furniture and equipment beyond the agreed specification',
      VAT,
    ],
  },
  'eco-construction.passive': {
    included: [
      'Climate and site performance analysis',
      'Passive design strategy: orientation, shading and ventilation',
      'Material selection rationale',
      'Operating guidance for designed performance at handover',
    ],
    excluded: [
      'The standard construction cost this uplift is added to',
      'Added energy or water systems',
      'Certification fees',
      VAT,
    ],
  },
  'eco-construction.energy': {
    included: [
      'Passive design strategy and climate analysis',
      'Renewable energy systems sized against reduced demand',
      'Energy systems coordination with design and trades',
      'Operating guidance at handover',
    ],
    excluded: [
      'The standard construction cost this uplift is added to',
      'Water systems, unless in scope',
      'Certification and monitoring fees',
      VAT,
    ],
  },
  'eco-construction.full': {
    included: [
      'Passive design strategy and climate analysis',
      'Renewable energy and water systems coordination',
      'Material selection rationale with sourcing considerations',
      'Integration of passive and active systems',
      'Operating guidance at handover',
    ],
    excluded: [
      'The standard construction cost this uplift is added to',
      'Certification, monitoring and third-party audit fees',
      'Ongoing system servicing after handover',
      VAT,
    ],
  },
  'concrete-construction.standard': {
    included: [
      'Structural concept and system selection rationale',
      'Concrete frame with conventional spans, covered or finished',
      'Staged quality verification records',
      'As-built structural documentation at handover',
    ],
    excluded: [
      'Non-structural finishes, MEP and fit-out',
      'Structural engineering design fees',
      'Land and site preparation beyond the agreed scope',
      VAT,
    ],
  },
  'concrete-construction.exposed': {
    included: [
      'Structural concept and coordinated engineering documentation',
      'Formwork and finish specification with sample approval',
      'Exposed board-formed or textured architectural concrete',
      'Staged quality verification and as-built documentation',
    ],
    excluded: [
      'Non-structural finishes, MEP and fit-out',
      'Structural engineering design fees',
      'Sealers or coatings beyond the specified finish',
      VAT,
    ],
  },
  'concrete-construction.large-span': {
    included: [
      'Structural concept for extended spans or complex geometry',
      'Coordinated structural engineering documentation',
      'Complex formwork and finish specification with samples',
      'Staged quality verification and as-built documentation',
    ],
    excluded: [
      'Non-structural finishes, MEP and fit-out',
      'Structural engineering design fees',
      'Specialist pumping or lifting beyond the agreed scope',
      VAT,
    ],
  },
};

export default details;
