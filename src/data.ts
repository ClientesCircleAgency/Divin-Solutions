import {
  BadgeCheck,
  Boxes,
  Cable,
  Factory,
  FileCheck2,
  Fuel,
  HardHat,
  Leaf,
  ShieldCheck,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Capability = {
  id: string;
  index: string;
  title: string;
  eyebrow: string;
  pain: string;
  outcome: string;
  copy: string;
  bullets: string[];
  visual: string;
  detailVisual: string;
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
    visual: asset("pillar-01-materials.png"),
    detailVisual: asset("capability-detail/materials-detail.png"),
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
    visual: asset("pillar-02-equipment.png"),
    detailVisual: asset("capability-detail/equipment-detail.png"),
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
    visual: asset("pillar-03-site-infrastructure.png"),
    detailVisual: asset("capability-detail/site-infrastructure-detail.png"),
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
    visual: asset("pillar-04-logistics-hse.png"),
    detailVisual: asset("capability-detail/logistics-hse-detail.png"),
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
    visual: asset("pillar-05-fuel-waste.png"),
    detailVisual: asset("capability-detail/fuel-waste-detail.png"),
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
    visual: asset("pillar-06-technical-sustainability.png"),
    detailVisual: asset("capability-detail/technical-sustainability-detail.png"),
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
    visual: asset("pillar-07-workforce.png"),
    detailVisual: asset("capability-detail/workforce-detail.png"),
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
    visual: asset("pillar-08-complete-system.png"),
    detailVisual: asset("capability-detail/complete-system-detail.png"),
    icon: Cable,
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
