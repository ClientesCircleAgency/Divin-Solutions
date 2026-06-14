import {
  BadgeCheck,
  Boxes,
  Cable,
  Factory,
  FileCheck2,
  Fuel,
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
      "Heavy machinery and compact site equipment",
      "Generators, lighting towers and temporary power",
      "Pumps, compressors, climate and handling support",
    ],
    specs: [
      {
        title: "Earthworks and lifting",
        description: "Machinery required for excavation, handling and heavy site movement.",
        items: ["Excavators and loaders", "Forklifts and telehandlers", "Compaction and ground preparation equipment"],
      },
      {
        title: "Power and site energy",
        description: "Temporary energy infrastructure for active work fronts and site operations.",
        items: ["Generators", "Lighting towers", "Temporary distribution and cabling support"],
      },
      {
        title: "Pumping and support equipment",
        description: "Equipment that keeps site conditions stable across changing phases.",
        items: ["Pumps and compressors", "Climate and ventilation units", "Replacement equipment coordination"],
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
      "Site offices, changing rooms and welfare modules",
      "Water, sanitation and access support",
      "Barriers, fencing, demarcation and access control",
    ],
    specs: [
      {
        title: "Temporary facilities",
        description: "Functional site infrastructure for project teams and daily coordination.",
        items: ["Site offices and meeting units", "Changing rooms and welfare modules", "Storage and support containers"],
      },
      {
        title: "Access and perimeter",
        description: "Controlled movement and safer daily operation across the construction site.",
        items: ["Fencing and barriers", "Access control points", "Demarcation and traffic separation"],
      },
      {
        title: "Water and sanitation",
        description: "Temporary services that keep site welfare compliant and usable.",
        items: ["Sanitation modules", "Water supply points", "Wastewater and cleaning support"],
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
      "Delivery planning and transport coordination",
      "Manuals, certificates and technical documentation",
      "HSE platform, permit and operational support",
    ],
    specs: [
      {
        title: "Transport and delivery",
        description: "Planning around timing, access constraints and supplier handoffs.",
        items: ["Delivery windows", "Transport coordination", "Crane/offload planning support"],
      },
      {
        title: "Documentation control",
        description: "Technical evidence that helps resources move without administrative friction.",
        items: ["Material certificates", "Manuals and datasheets", "Delivery records and traceability"],
      },
      {
        title: "HSE support",
        description: "Operational support around safety records, permits and site requirements.",
        items: ["HSE documentation", "Permit support", "Compliance checklists"],
      },
    ],
    visual: asset("pillar-04-logistics-hse.webp"),
    detailVisual: asset("capability-detail/logistics-hse-detail.webp"),
    icon: FileCheck2,
  },
  {
    id: "fuel-waste",
    index: "05",
    title: "Fuel, Waste & Environmental Management",
    eyebrow: "Controlled site flows and environmental records",
    pain:
      "Fuel shortages, unmanaged waste and missing environmental records create stoppages and compliance risk.",
    outcome:
      "Cleaner site operations with environmental responsibilities tracked.",
    copy:
      "Keep fuel, waste and environmental flows organized so the site stays operational and accountable.",
    bullets: [
      "On-site refuelling and fuel logistics",
      "Waste containers, separation and certified collection",
      "Environmental documentation and tracking support",
    ],
    specs: [
      {
        title: "Fuel systems",
        description: "Fuel supply and controlled refuelling for machinery and temporary power.",
        items: ["On-site refuelling", "Fuel storage coordination", "Consumption and delivery records"],
      },
      {
        title: "Waste management",
        description: "Separation and certified removal to keep the site clean and auditable.",
        items: ["Waste containers", "Material separation", "Certified collection partners"],
      },
      {
        title: "Environmental records",
        description: "Documentation layer for environmental responsibility and project reporting.",
        items: ["Waste transfer notes", "Environmental logs", "ESG-aligned reporting support"],
      },
    ],
    visual: asset("pillar-05-fuel-waste.webp"),
    detailVisual: asset("capability-detail/fuel-waste-detail.webp"),
    icon: Fuel,
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
      "Maintenance and troubleshooting coordination",
      "Replacement equipment and resource continuity",
      "Low-carbon, LED and ESG-aligned options",
    ],
    specs: [
      {
        title: "Maintenance continuity",
        description: "Support when installed resources or rented equipment need intervention.",
        items: ["Troubleshooting coordination", "Replacement planning", "Maintenance supplier routing"],
      },
      {
        title: "Sustainable options",
        description: "Alternatives that help reduce site impact without weakening productivity.",
        items: ["LED site lighting", "Hybrid or low-carbon equipment", "Reusable temporary infrastructure"],
      },
      {
        title: "Technical coordination",
        description: "Practical support between site teams, suppliers and technical documentation.",
        items: ["Specification checks", "Resource substitutions", "Operational risk notes"],
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
        items: ["Labourers and assistants", "Cleaning and maintenance teams", "Logistics support crews"],
      },
      {
        title: "Certified operators",
        description: "Operational profiles for machinery, lifting and controlled movement.",
        items: ["Machine operators", "Signallers", "Forklift and telehandler support"],
      },
      {
        title: "Specialist trades",
        description: "Technical profiles for MEP, metalwork and infrastructure phases.",
        items: ["Welders and pipefitters", "Electricians", "Mechanical maintenance teams"],
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
      "Documentation, fuel, waste and sustainability",
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
        description: "Coordination that connects suppliers, delivery timing and site readiness.",
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
    value: "EUR 285,850",
    share: "19.65%",
    summary: "Initial site preparation, temporary facilities, technical resources, documentation and HSE coordination.",
    scope: ["Full site mobilization", "Offices, fencing and welfare areas", "Machinery, workforce and document control"],
    metrics: ["Fast project start", "Integrated logistics", "Safety-led site operations"],
    visual: asset("rebrand-light/civil/civil-01-site-setup.webp"),
    icon: HardHat,
  },
  {
    index: "02",
    title: "Substructures & Foundations",
    subtitle: "Excavation, structural concrete and technical bases",
    value: "EUR 334,492",
    share: "22.99%",
    summary: "Footings, mass foundations, plinths, equipment pedestals, precast retaining walls and C40 concrete works.",
    scope: ["1,142 m3 of excavation", "244 m3 of C40 concrete", "12t of reinforcement and 40 anchor bolts"],
    metrics: ["Precast retaining walls", "Base-plate levelling grout", "Surplus material management"],
    visual: asset("rebrand-light/civil/civil-02-foundations.webp"),
    icon: Factory,
  },
  {
    index: "03",
    title: "Structural Concrete Slabs",
    subtitle: "Bases for tanks, generators and heavy equipment",
    value: "EUR 82,479",
    share: "5.67%",
    summary: "Technical equipment bases with structural fill, formwork, reinforcement and high-resistance brushed finishes.",
    scope: ["150.60 m3 of C40 concrete", "15.06t of reinforcement", "398.60 m2 of brushed finish"],
    metrics: ["Sprinkler and water-tank bases", "Chiller and generator bases", "Eurocode-aligned execution"],
    visual: asset("rebrand-light/civil/civil-03-structural-slabs.webp"),
    icon: Boxes,
  },
  {
    index: "04",
    title: "Drainage Systems",
    subtitle: "Stormwater, wastewater and hydrocarbon separation",
    value: "EUR 260,582",
    share: "17.92%",
    summary: "Buried networks, inspection chambers, ACO channels, oil separators and CCTV inspection for controlled site drainage.",
    scope: ["160mm to 500mm pipework", "Drains, gullies and manholes", "ACO Oleopator NS200 separators"],
    metrics: ["CCTV inspection", "Linear drainage", "Environmental protection"],
    visual: asset("rebrand-light/civil/civil-04-drainage.webp"),
    icon: Route,
  },
  {
    index: "05",
    title: "Potable Water & Fire Networks",
    subtitle: "Hydrants, public connections and technical water supply",
    value: "EUR 114,872",
    share: "7.90%",
    summary: "Fire and potable water networks designed to support industrial operations and critical site safety.",
    scope: ["458m of 200mm fire network", "32mm and 63mm potable-water lines", "6 hydrants and thrust blocks"],
    metrics: ["Water-meter chambers", "Pop-up connections", "Installation depths up to 4m"],
    visual: asset("rebrand-light/civil/civil-05-water-fire.webp"),
    icon: ShieldCheck,
  },
  {
    index: "06",
    title: "Ducting & Electrical Services",
    subtitle: "Telecommunications, power, lighting and protection",
    value: "EUR 281,864",
    share: "19.38%",
    summary: "Critical telecom, low/medium-voltage, lighting, CCTV, earthing and lightning-protection infrastructure.",
    scope: ["800m+ of telecom ducting", "900m of low-voltage ducting", "536m of earthing trenches"],
    metrics: ["35 lighting bases", "15 CCTV pole bases", "67+ boxes and chambers"],
    visual: asset("rebrand-light/civil/civil-06-electrical-ducting.webp"),
    icon: Zap,
  },
  {
    index: "07",
    title: "Mechanical Fuel Storage",
    subtitle: "Tanks, industrial pipework and containment",
    value: "EUR 61,552",
    share: "4.23%",
    summary: "Industrial fuel infrastructure with tanks, pipework, containment and reinforced equipment-support structures.",
    scope: ["3 fuel-storage tanks", "510m+ of DN30 to DN100 pipework", "Bravo B600 chambers and reinforced slabs"],
    metrics: ["Anti-flotation measures", "Containment and protection", "Safe fuel transfer"],
    visual: asset("rebrand-light/civil/civil-07-fuel-storage.webp"),
    icon: Fuel,
  },
  {
    index: "08",
    title: "Kerbs & Tactile Paving",
    subtitle: "Accessible, precise urban infrastructure",
    value: "EUR 32,713",
    share: "2.25%",
    summary: "Precast kerbs, dropped crossings and tactile paving installed for durability, accessibility and compliance.",
    scope: ["838m+ of total kerbs", "Standard and dropped kerbs", "Tactile paving for guidance and safety"],
    metrics: ["Accessibility compliance", "Safe pedestrian movement", "Precise external finishes"],
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
    title: "Fuel, waste and environmental flows managed",
    copy: "On-site refuelling, fuel logistics, waste separation, certified collection and environmental records.",
    bullets: ["On-site refuelling", "Waste separation and collection", "Environmental tracking"],
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
  ["Single point of contact", "A calmer commercial interface for teams managing multiple resource categories.", BadgeCheck],
  ["Reduced downtime risk", "Replacement and support options help protect site momentum.", ShieldCheck],
  ["Faster mobilization", "Materials, machinery and temporary infrastructure can be coordinated together.", Truck],
  ["Cleaner compliance control", "Documentation, HSE and environmental records stay connected to the supply flow.", FileCheck2],
  ["Future-ready operations", "Low-carbon, LED, waste and ESG-aligned options are built into the supply conversation.", Leaf],
];
