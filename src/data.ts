import {
  BadgeCheck,
  Boxes,
  Cable,
  Factory,
  FileCheck2,
  HardHat,
  Leaf,
  Route,
  ShieldCheck,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SpecGroup = {
  title: string;
  description: string;
  items: string[];
};

export type Capability = {
  id: string;
  index: string;
  title: string;
  eyebrow: string;
  pain: string;
  outcome: string;
  copy: string;
  bullets: string[];
  specs: SpecGroup[];
  visual: string;
  detailVisual: string;
  icon: LucideIcon;
};

export type ConstructionService = {
  index: string;
  title: string;
  subtitle: string;
  value?: string;
  share?: string;
  summary: string;
  scope: string[];
  metrics: string[];
  visual: string;
  icon: LucideIcon;
};

export type Chapter = {
  index: string;
  title: string;
  copy: string;
  bullets: string[];
};

export const asset = (path: string) => `/assets/${path}`;

export const capabilities: Capability[] = [
  {
    id: "materials",
    index: "01",
    title: "Construction Materials & Consumables",
    eyebrow: "Structural, MEP and daily site essentials",
    pain:
      "Multiple small vendors create slow quoting, split deliveries and missing items on site.",
    outcome: "Fewer supplier touchpoints and better resource continuity.",
    copy:
      "Source core materials and daily consumables without scattering procurement across multiple vendors.",
    bullets: [
      "Concrete, cement, aggregates and reinforcement",
      "Steel, timber, pipes, valves, insulation and cables",
      "Tools, fixings, PPE, signage and consumables",
    ],
    specs: [
      {
        title: "Structural materials",
        description: "Core resources for foundations, slabs and heavy-duty civil works.",
        items: ["Concrete C40 and cement", "Aggregates and structural fill", "Rebar, mesh and anchor systems"],
      },
      {
        title: "MEP and network materials",
        description: "Technical materials for drainage, water, electrical and telecom infrastructure.",
        items: ["Pipes from 32mm to 500mm", "Valves, ducts and chambers", "Cables, conduits and inspection boxes"],
      },
      {
        title: "Daily site consumables",
        description: "Operational items that prevent small procurement gaps from slowing the site.",
        items: ["Fixings, tools and blades", "PPE, signage and barriers", "Timber, insulation and protection materials"],
      },
    ],
    visual: asset("pillar-01-materials.webp"),
    detailVisual: asset("capability-detail/materials-detail.webp"),
    icon: Boxes,
  },
  {
    id: "equipment",
    index: "02",
    title: "Equipment & Industrial Machinery",
    eyebrow: "Machinery, temporary power and handling support",
    pain:
      "Equipment gaps or downtime interrupt crews and delay planned work fronts.",
    outcome: "Faster mobilization and less downtime exposure.",
    copy:
      "Mobilize machinery, power and handling equipment without restarting procurement every time scope changes.",
    bullets: [
      "Rotary excavators, mini-excavators, dumpers and rollers",
      "Generators from 15kVA to mega-power and site boards",
      "Lighting towers, platforms, telehandlers, pumps and compressors",
    ],
    specs: [
      {
        title: "Earthworks and lifting",
        description: "Machinery required for excavation, handling and heavy site movement.",
        items: ["Rotary excavators", "Mini-excavators", "Dumpers", "Compaction rollers"],
      },
      {
        title: "Power and site energy",
        description: "Temporary energy infrastructure for active work fronts and site operations.",
        items: ["Generators from 15kVA to mega-power", "Site distribution boards", "Hybrid, electric and solar lighting towers"],
      },
      {
        title: "Pumping and support equipment",
        description: "Equipment that keeps site conditions stable across changing phases.",
        items: ["Elevated work platforms", "Telehandlers", "Air compressors", "Submersible pumps", "Heat generators"],
      },
    ],
    visual: asset("pillar-02-equipment.webp"),
    detailVisual: asset("capability-detail/equipment-detail.webp"),
    icon: Zap,
  },
  {
    id: "infrastructure",
    index: "03",
    title: "Site Infrastructure & Welfare",
    eyebrow: "Temporary infrastructure for daily operation",
    pain:
      "Sites lose operational quality when welfare, access and temporary infrastructure are treated as afterthoughts.",
    outcome: "Faster site setup and better daily working conditions.",
    copy:
      "Set up the temporary infrastructure that keeps teams, workflows and access points organized from day one.",
    bullets: [
      "Office, meeting, canteen, changing and sanitary modules",
      "Water tanks, booster pumps, septic tanks and maintenance",
      "Fencing, blind panels, New Jersey barriers and gatehouses",
    ],
    specs: [
      {
        title: "Temporary facilities",
        description: "Functional site infrastructure for project teams and daily coordination.",
        items: ["Office containers", "Meeting rooms", "Industrial canteens", "Changing rooms", "Sanitary facilities"],
      },
      {
        title: "Access and perimeter",
        description: "Controlled movement and safer daily operation across the construction site.",
        items: ["Mobile fences", "Blind panels", "New Jersey barriers", "Gatehouse modules"],
      },
      {
        title: "Water and sanitation",
        description: "Temporary services that keep site welfare compliant and usable.",
        items: ["Water tanks", "Booster pump groups", "Septic tanks", "Maintenance services"],
      },
    ],
    visual: asset("pillar-03-site-infrastructure.webp"),
    detailVisual: asset("capability-detail/site-infrastructure-detail.webp"),
    icon: Factory,
  },
  {
    id: "logistics",
    index: "04",
    title: "Logistics, Documentation & HSE",
    eyebrow: "Transport, certificates and compliance support",
    pain:
      "A delivery can be physically ready and still be blocked by missing documents, certificates or compliance steps.",
    outcome:
      "Cleaner handoffs between procurement, site, transport and compliance teams.",
    copy:
      "Coordinate the logistics and documentation layer that often decides whether resources can actually move.",
    bullets: [
      "Oversized cargo, unloading planning and crane-truck mobilisation",
      "Manuals, CE certificates, lift plans and load schedules",
      "Obralia, e-coordina, approvals, medical exams and training",
    ],
    specs: [
      {
        title: "Transport and delivery",
        description: "Planning around timing, access constraints and supplier handoffs.",
        items: ["Oversized cargo transport scheduling", "Unloading operation planning", "Crane-truck mobilisation"],
      },
      {
        title: "Documentation control",
        description: "Technical evidence that helps resources move without administrative friction.",
        items: ["User manuals", "CE certificates", "Lift plans", "Electrical load schedules"],
      },
      {
        title: "HSE support",
        description: "Operational support around safety records, permits and site requirements.",
        items: ["Obralia submissions", "e-coordina submissions", "Equipment entry approvals", "Occupational fitness exams", "Mandatory training coordination"],
      },
    ],
    visual: asset("pillar-04-logistics-hse.webp"),
    detailVisual: asset("capability-detail/logistics-hse-detail.webp"),
    icon: FileCheck2,
  },
  {
    id: "waste-environment",
    index: "05",
    title: "Waste & Environmental Management",
    eyebrow: "Controlled site flows and environmental records",
    pain:
      "Unmanaged waste and missing environmental records create stoppages and compliance risk.",
    outcome:
      "Cleaner site operations with environmental responsibilities tracked.",
    copy:
      "Keep waste flows and environmental records organized so the site stays operational and accountable.",
    bullets: [
      "Skip containers and separation for timber, plastics and scrap metal",
      "Certified collection, e-GARs and waste tracking manifests",
    ],
    specs: [
      {
        title: "Waste management",
        description: "Separation and certified removal to keep the site clean and auditable.",
        items: ["Skip-container rental", "Timber waste separation", "Plastic waste separation", "Scrap-metal separation"],
      },
      {
        title: "Environmental records",
        description: "Documentation layer for environmental responsibility and project reporting.",
        items: ["Certified waste collection", "Regular e-GAR issuance", "Waste tracking manifests"],
      },
    ],
    visual: asset("pillar-05-waste-environment.webp"),
    detailVisual: asset("capability-detail/waste-environment-detail.webp"),
    icon: Leaf,
  },
  {
    id: "technical",
    index: "06",
    title: "Technical Support & Sustainability",
    eyebrow: "Maintenance, replacement and future-ready options",
    pain:
      "Sites need backup options when equipment fails, requirements change or sustainability expectations increase.",
    outcome:
      "More resilient operations and better alignment with modern procurement expectations.",
    copy:
      "Add a support layer around your resources so the project can adapt when equipment, timelines or ESG requirements change.",
    bullets: [
      "SLAs, 24/7 on-call support and rapid replacement",
      "Technical, mechanical and specialised assistance",
      "Electric machinery, solar LED lighting and hybrid generators",
    ],
    specs: [
      {
        title: "Maintenance continuity",
        description: "Support when installed resources or rented equipment need intervention.",
        items: ["Service Level Agreements", "24/7 on-call team", "Rapid replacement of damaged equipment", "Technical and mechanical assistance"],
      },
      {
        title: "Sustainable options",
        description: "Alternatives that help reduce site impact without weakening productivity.",
        items: ["Low-carbon electric machinery", "Efficient LED solar lighting", "Sustainable hybrid generators", "Carbon footprint estimates"],
      },
      {
        title: "Technical coordination",
        description: "Practical support between site teams, suppliers and technical documentation.",
        items: ["Specialised support", "Resource substitutions", "Operational risk notes", "Alignment with project ESG targets"],
      },
    ],
    visual: asset("pillar-06-technical-sustainability.webp"),
    detailVisual: asset("capability-detail/technical-sustainability-detail.webp"),
    icon: Wrench,
  },
  {
    id: "workforce",
    index: "07",
    title: "Workforce & Technical Profiles",
    eyebrow: "Operational profiles for changing site capacity",
    pain:
      "Workforce needs fluctuate by phase, and missing profiles can block planned execution.",
    outcome: "Better capacity matching across changing project stages.",
    copy:
      "Support changing site capacity with operational profiles that can be mobilized around project needs.",
    bullets: [
      "Labourers, assistants and support teams",
      "Operators, signallers and certified profiles",
      "Welders, pipefitters, electricians and maintenance teams",
    ],
    specs: [
      {
        title: "General site support",
        description: "Profiles that absorb fluctuations in daily site capacity.",
        items: ["Labourers", "Construction assistants", "Post-construction cleaning teams", "Logistics support crews"],
      },
      {
        title: "Certified operators",
        description: "Operational profiles for machinery, lifting and controlled movement.",
        items: ["Certified machine operators", "Signalmen / banksmen", "Forklift support", "Telehandler support"],
      },
      {
        title: "Specialist trades",
        description: "Technical profiles for MEP, metalwork and infrastructure phases.",
        items: ["Certified welders", "Industrial pipefitters", "Specialised electricians", "Maintenance technicians"],
      },
    ],
    visual: asset("pillar-07-workforce.webp"),
    detailVisual: asset("capability-detail/workforce-detail.webp"),
    icon: HardHat,
  },
  {
    id: "system",
    index: "08",
    title: "Complete Supply System",
    eyebrow: "One coordinated layer around project resources",
    pain:
      "Fragmented resource planning makes project continuity dependent on too many disconnected handoffs.",
    outcome: "One operational view across materials, equipment, logistics and support.",
    copy:
      "Connect the resources, logistics and support your project needs into one calmer supply layer.",
    bullets: [
      "Materials, equipment and site infrastructure",
      "Documentation, waste and sustainability",
      "Workforce support and continuity planning",
    ],
    specs: [
      {
        title: "Integrated planning",
        description: "A single operational view across procurement, logistics and site support.",
        items: ["Supply mapping", "Priority work fronts", "Critical-resource planning"],
      },
      {
        title: "Execution layer",
        description: "Coordination that connects suppliers, delivery timing and site availability.",
        items: ["Vendor coordination", "Delivery sequencing", "Documentation follow-up"],
      },
      {
        title: "Continuity support",
        description: "Backup paths when site requirements, schedules or resource availability change.",
        items: ["Replacement resources", "Alternative specifications", "Risk reduction planning"],
      },
    ],
    visual: asset("pillar-08-complete-system.webp"),
    detailVisual: asset("capability-detail/complete-system-detail.webp"),
    icon: Cable,
  },
];

export const constructionServices: ConstructionService[] = [
  {
    index: "01",
    title: "Preliminary Works & Site Setup",
    subtitle: "Mobilization and temporary project infrastructure",
    value: "Reference package",
    share: "19.65%",
    summary: "Initial site preparation, temporary facilities, technical resources, documentation and HSE coordination.",
    scope: ["Full site mobilization", "Initial terrain preparation", "Offices, perimeter fencing and welfare areas", "HSE management", "Machinery, technical equipment and qualified labour", "Document control, logistical planning and stakeholder coordination"],
    metrics: ["Immediate start after award", "Integrated logistics coordination", "Focus on efficiency and safety"],
    visual: asset("rebrand-light/civil/civil-01-site-setup.webp"),
    icon: HardHat,
  },
  {
    index: "02",
    title: "Substructures & Foundations",
    subtitle: "Excavation, structural concrete and technical bases",
    value: "Reference package",
    share: "22.99%",
    summary: "Footings, mass foundations, plinths, equipment pedestals, precast retaining walls and C40 concrete works.",
    scope: ["1,142 m3 mass excavation for footings and mass concrete", "244 m3 structural C40 concrete foundations", "12t reinforcement supply and assembly", "40 anchor bolts installed", "Substation and gatehouse slabs", "214m precast retaining walls", "101m MEP patio boundary walls", "Levelling grout on base plates", "Pedestals and plinths for equipment", "Removal and management of surplus material"],
    metrics: ["Major reference package", "Excavation and foundations", "Concrete C40", "Steel reinforcement", "Precast walls", "BOQ-led control"],
    visual: asset("rebrand-light/civil/civil-02-foundations.webp"),
    icon: Factory,
  },
  {
    index: "03",
    title: "Structural Concrete Slabs",
    subtitle: "Bases for tanks, generators and heavy equipment",
    value: "Reference package",
    share: "5.67%",
    summary: "Technical equipment bases with structural fill, formwork, reinforcement and high-resistance brushed finishes.",
    scope: ["Sprinkler tank and water-reservoir bases", "Foundations for chillers and isolated generator bases", "Soil preparation with 6F2 structural fill", "High-resistance brushed surface finish", "150.60 m3 of C40 concrete", "15.06t of reinforcement", "398.60 m2 brushed finish", "116.64 m2 formwork"],
    metrics: ["Concrete C40", "Steel rebar", "Technical precision", "Structural standards"],
    visual: asset("rebrand-light/civil/civil-03-structural-slabs.webp"),
    icon: Boxes,
  },
  {
    index: "04",
    title: "Drainage Systems",
    subtitle: "Stormwater, wastewater and environmental separation",
    value: "Reference package",
    share: "17.92%",
    summary: "Buried networks, inspection chambers, ACO channels, environmental treatment units and CCTV inspection for controlled site drainage.",
    scope: ["Wastewater pipework from 160mm to 250mm up to 3m depth", "Process wastewater network from 110mm to 160mm", "38 floor drains and channels FD-1 to FD-4", "15 inspection chambers and 11 precast manholes", "Stormwater pipework from 160mm to 500mm at multiple depths", "96.45m longitudinal gravel drains", "142.66m concrete pipe encasement", "15 gullies and 28 stormwater chambers/manholes", "ACO MULTILINE channels S150, S300 and 200", "Environmental treatment and separation units", "CCTV inspection"],
    metrics: ["Stormwater pipework", "Environmental separation units", "Environmental protection", "CCTV testing ready"],
    visual: asset("rebrand-light/civil/civil-04-drainage.webp"),
    icon: Route,
  },
  {
    index: "05",
    title: "Potable Water & Fire Networks",
    subtitle: "Hydrants, public connections and technical water supply",
    value: "Reference package",
    share: "7.90%",
    summary: "Fire and potable water networks designed to support industrial operations and critical site safety.",
    scope: ["Fire network installation", "458m of 200mm pipework", "Depths from 2.0m to 4.0m", "6 hydrants and anchorage blocks", "Potable water network", "32mm and 63mm pipework", "Water-meter chambers", "6 pop-up connections", "Public connections and technical water infrastructure"],
    metrics: ["Fire network extension", "Potable water extension", "Anchorage blocks", "Testing and records"],
    visual: asset("rebrand-light/civil/civil-05-water-fire.webp"),
    icon: ShieldCheck,
  },
  {
    index: "06",
    title: "Ducting & Electrical Services",
    subtitle: "Telecommunications, power, lighting and protection",
    value: "Reference package",
    share: "19.38%",
    summary: "Critical telecom, low/medium-voltage, lighting, CCTV, earthing and lightning-protection infrastructure.",
    scope: ["Telecommunications conduits from 50mm to 200mm", "800m+ telecommunications installed", "SV and TV inspection chambers", "Concrete encasement", "Low-voltage conduits BT 110mm/160mm", "Medium-voltage ducts MT 160mm", "10 medium-voltage chambers", "Structured duct banks", "35 lighting bases", "43 HL visit boxes", "15 CCTV pole bases", "EV charger bases", "Lightning-protection system", "536m earthing trenches", "20 earth electrodes", "45m concrete cable troughs"],
    metrics: ["Low-voltage infrastructure", "Telecommunications", "Earthing protection", "Boxes and chambers", "Security and mobility bases"],
    visual: asset("rebrand-light/civil/civil-06-electrical-ducting.webp"),
    icon: Zap,
  },
  {
    index: "07",
    title: "Technical Utility Infrastructure",
    subtitle: "Tanks, industrial pipework and containment",
    value: "Reference package",
    share: "4.23%",
    summary: "Industrial utility corridors, chambers and reinforced equipment-support structures delivered with clear technical control.",
    scope: ["Industrial utility infrastructure", "Anti-flotation measures for structural stability", "Industrial pipework and chambers", "Bravo B600 access chambers", "Reinforced structural slabs for equipment support"],
    metrics: ["Industrial pipework", "Access chambers", "Containment and protection", "Equipment-support slabs"],
    visual: asset("rebrand-light/civil/civil-07-technical-utility.webp"),
    icon: Cable,
  },
  {
    index: "08",
    title: "Kerbs & Tactile Paving",
    subtitle: "Accessible, precise urban infrastructure",
    value: "Reference package",
    share: "2.25%",
    summary: "Precast kerbs, dropped crossings and tactile paving installed for durability, accessibility and compliance.",
    scope: ["Installation of 838.59m precast concrete kerbs with rigorous alignment and structural durability", "Standard kerbs", "Dropped kerbs for pedestrian crossings", "Tactile paving for guidance of visually impaired users", "Accessible external finishes", "Safe circulation-area infrastructure"],
    metrics: ["Kerbs and edge works", "Dropped kerbs", "Tactile paving", "Accessibility compliance"],
    visual: asset("rebrand-light/civil/civil-08-kerbs-tactile.webp"),
    icon: BadgeCheck,
  },
];

export const chapters: Chapter[] = [
  {
    index: "00",
    title: "Most delays start before the work front",
    copy:
      "Every work front depends on materials, machinery, documents and site resources arriving before momentum breaks.",
    bullets: ["Fragmented vendors", "Missing documentation", "Resource gaps"],
  },
  {
    index: "01",
    title: "Materials that arrive before momentum breaks",
    copy:
      "Concrete, steel, timber, MEP supplies, tools, PPE and site consumables sourced through one partner.",
    bullets: ["Structural and MEP materials", "PPE, tools and signage", "Planned and urgent sourcing"],
  },
  {
    index: "02",
    title: "Equipment capacity when the site needs it",
    copy:
      "Heavy machinery, compact equipment, temporary power, lighting, pumps, compressors and handling support.",
    bullets: ["Power, lighting and machinery", "Handling, pumping and climate support", "Replacement resources"],
  },
  {
    index: "03",
    title: "Site infrastructure built for daily operation",
    copy:
      "Modular offices, welfare units, sanitation, water, barriers, fencing and access support for daily site operation.",
    bullets: ["Offices and welfare modules", "Water, sanitation and access", "Fencing and demarcation"],
  },
  {
    index: "04",
    title: "Logistics and documentation under control",
    copy: "Delivery planning, transport coordination, certificates, manuals, permits and HSE support.",
    bullets: ["Delivery coordination", "Certificates and manuals", "HSE and permit support"],
  },
  {
    index: "05",
    title: "Waste and environmental flows managed",
    copy: "Waste separation, certified collection and environmental records handled as part of site continuity.",
    bullets: ["Waste separation and collection", "Environmental tracking", "e-GAR documentation"],
  },
  {
    index: "06",
    title: "Support that keeps resources usable",
    copy:
      "Maintenance coordination, replacement equipment, low-carbon options, LED lighting and ESG-aligned choices.",
    bullets: ["Maintenance coordination", "Replacement resources", "Lower-carbon options"],
  },
  {
    index: "07",
    title: "Workforce support when capacity changes",
    copy:
      "Labour support, operators, signallers, welders, pipefitters, electricians, cleaning and maintenance teams.",
    bullets: ["Labour and site support", "Operators and certified profiles", "Specialist trades and maintenance"],
  },
  {
    index: "08",
    title: "One partner. One supply layer.",
    copy:
      "One coordinated layer around the resources, logistics and support your project needs to keep moving.",
    bullets: ["Materials", "Equipment", "Logistics, support and continuity"],
  },
];

export const processSteps = [
  ["01", "Assess", "Map project requirements, delivery constraints and operational priorities."],
  ["02", "Source", "Identify materials, machinery, infrastructure, documentation and support resources."],
  ["03", "Coordinate", "Align suppliers, logistics, certificates, HSE and site timing through one contact layer."],
  ["04", "Deliver", "Move resources to site with clearer handoffs and fewer disconnected updates."],
  ["05", "Support", "Adapt resources, replacements and documentation as project needs change."],
];

export const advantageItems = [
  ["Dedicated account manager", "One accountable contact receives and coordinates requests across every supply category.", BadgeCheck],
  ["One-vendor system", "Materials, equipment, infrastructure, logistics and workforce support are managed through one commercial relationship.", Truck],
  ["Consolidated invoicing", "One transparent, itemised monthly invoice replaces fragmented billing across dozens of suppliers.", FileCheck2],
  ["Risk mitigation", "Quality, deadlines, insurance, documentation and HSE compliance are controlled within the same supply flow.", ShieldCheck],
  ["Continuity and ESG options", "Replacement support, low-carbon machinery, solar LED lighting, waste controls and footprint estimates protect long-term project performance.", Leaf],
];
