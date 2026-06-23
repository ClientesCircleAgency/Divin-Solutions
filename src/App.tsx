import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, FormEvent, KeyboardEvent, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Boxes,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  Factory,
  FileCheck2,
  FileWarning,
  HardHat,
  Leaf,
  Mail,
  Menu,
  Phone,
  Route,
  Send,
  ShieldCheck,
  Truck,
  UsersRound,
  Wrench,
  X,
} from "lucide-react";
import {
  advantageItems,
  asset,
  capabilities,
  chapters,
  constructionServices,
  processSteps,
} from "./data";

const systemVisuals = [asset("scroll-frames/00-blueprint-start.jpg"), ...capabilities.map((item) => item.visual)];
const brandLogo = asset("logo/edited/divin-logo-cyan-transparent.webp");

const homeHero = {
  desktop: asset("rebrand-light/home/home-hero-desktop.webp"),
  mobile: asset("rebrand-light/home/home-hero-mobile.webp"),
  heroVideo: asset("rebrand-light/home/home-hero-scroll-desktop.mp4"),
  heroPoster: asset("rebrand-light/home/home-hero-scroll-poster.webp"),
};

const supplyHero = {
  desktop: asset("rebrand-light/supply/supply-hero-scroll-poster.webp"),
  mobile: asset("rebrand-light/home/home-hero-mobile.webp"),
  heroVideo: asset("rebrand-light/supply/supply-hero-scroll-desktop.mp4"),
  heroPoster: asset("rebrand-light/supply/supply-hero-scroll-poster.webp"),
};

const accommodationsHero = {
  desktop: asset("rebrand-light/accommodations/accommodations-hero-scroll-poster.webp"),
  mobile: asset("rebrand-light/home/home-hero-mobile.webp"),
  heroVideo: asset("rebrand-light/accommodations/accommodations-hero-scroll-desktop.mp4"),
  heroPoster: asset("rebrand-light/accommodations/accommodations-hero-scroll-poster.webp"),
};

const civilAssets = {
  heroDesktop: asset("rebrand-light/civil/civil-hero-desktop.webp"),
  heroMobile: asset("rebrand-light/civil/civil-hero-mobile.webp"),
  heroVideo: asset("rebrand-light/civil/civil-hero-scroll-desktop.mp4"),
  heroPoster: asset("rebrand-light/civil/civil-hero-scroll-poster.webp"),
  boq: asset("rebrand-light/civil/civil-boq-planning.webp"),
  caseStudy: asset("rebrand-light/civil/civil-project-terra.webp"),
};

const civilStageImages = [
  asset("rebrand-light/civil/civil-stage-01-site.webp"),
  asset("rebrand-light/civil/civil-stage-02-infrastructure.webp"),
  asset("rebrand-light/civil/civil-stage-03-supply.webp"),
  asset("rebrand-light/civil/civil-stage-04-operation.webp"),
];

const gatewayHeroStages = ["Fragmented", "Business units", "Coordination", "Control"];
const supplyHeroStages = ["Unsupplied", "Supply plan", "Arrival", "Complete"];
const accommodationsHeroStages = ["Gap", "Secured", "Turnkey", "Managed"];

const riskItems = [
  ["01", "Missing materials", "Critical resources fail to arrive before crews are ready.", AlertTriangle],
  ["02", "Equipment downtime", "Machinery gaps turn scheduled work fronts into idle time.", Wrench],
  ["03", "Logistics bottlenecks", "Transport and supplier handoffs slow the whole chain.", Route],
  ["04", "Documentation friction", "Certificates, HSE records and approvals block movement.", FileWarning],
  ["05", "Workforce gaps", "Missing profiles leave capacity exposed between phases.", UsersRound],
] as const;

const procurementRiskMatrix = [
  ["Missing materials", "High", "High", 3, 3, "Split vendors and late purchasing create direct work-front stoppages."],
  ["Equipment downtime", "Medium", "High", 2, 3, "No replacement path means machinery gaps quickly become idle crews."],
  ["Documentation friction", "High", "Medium", 3, 2, "Approvals, HSE records and certificates can block entry even when resources exist."],
  ["Logistics bottlenecks", "Medium", "Medium", 2, 2, "Transport, unloading and crane-truck planning affect delivery reliability."],
  ["Workforce gaps", "Low", "High", 1, 3, "Critical profiles missing at the wrong phase expose schedule continuity."],
] as const;

const civilProcess = [
  ["01", "Scope Review", "Review drawings, project constraints, BOQ structure and delivery responsibilities."],
  ["02", "Technical Planning", "Define quantities, interfaces, methodology, provisional items and compliance requirements."],
  ["03", "Site Mobilization", "Deploy facilities, access control, machinery, teams, documentation and HSE systems."],
  ["04", "Civil Works", "Execute groundworks, foundations, slabs, drainage and buried utility infrastructure."],
  ["05", "Systems Coordination", "Align water, fire, electrical, telecom and fuel networks across shared work fronts."],
  ["06", "Testing & Handover", "Complete inspections, CCTV testing, records, close-out documentation and final handover."],
];

const civilTimelineSignals = [
  ["01", "Mobilize", "Site setup, access, HSE, equipment and document control"],
  ["02", "Build", "Earthworks, foundations, slabs and equipment bases"],
  ["03", "Connect", "Drainage, water, fire, telecom, electrical and fuel networks"],
  ["04", "Validate", "CCTV inspection, watertightness checks, records and handover"],
] as const;

const civilAdvantages = [
  ["Single Point of Contact", "An integrated partner for earthworks, foundations, infrastructure packages and technical coordination.", BadgeCheck],
  ["Certified & Compliant", "C40 concrete standards, CE documentation, HSE requirements and project compliance kept visible from planning to handover.", ShieldCheck],
  ["Proven Track Record", "Experience in large industrial scopes, including Project Terra and high-value earthworks packages.", BarChart3],
  ["Transparent Pricing", "Detailed BOQ-based budgeting with quantities, unit prices and provisional items identified before execution.", ClipboardCheck],
  ["End-to-End Service", "From initial excavation to watertightness checks, CCTV inspections, records and final technical handover.", Truck],
  ["Material Coordination", "Efficient management of client-supplied and free-issue materials across concrete, reinforcement, pipework and site systems.", Factory],
  ["ESG & Sustainability", "Environmental compliance, waste tracking, e-GAR documentation and more responsible construction practices integrated into delivery.", Leaf],
] as const;

const solutionLinks = [
  {
    label: "Construction Supply",
    href: "/construction-supply",
    eyebrow: "Supply continuity",
    copy: "Keep active work fronts supplied with the resources and operational support required before momentum breaks.",
    scope: ["Materials & machinery", "Logistics, HSE & documents", "Fuel, waste & workforce"],
    outcome: "Fewer supplier handoffs and lower schedule exposure.",
    icon: Boxes,
  },
  {
    label: "Civil Construction",
    href: "/civil-construction",
    eyebrow: "Civil infrastructure",
    copy: "Execute the physical infrastructure of industrial projects, from site preparation through technical handover.",
    scope: ["Groundworks & foundations", "Drainage & utility networks", "Testing & handover"],
    outcome: "One coordinated civil scope with clearer technical control.",
    icon: HardHat,
  },
  {
    label: "Accommodations & Industrial Support",
    href: "/accommodations-industrial-support",
    eyebrow: "Operational spaces",
    copy: "Mobilize the people and operational spaces around large projects without transferring the property workload to internal teams.",
    scope: ["Corporate accommodation", "Relocation & property management", "Offices, warehouses & yards"],
    outcome: "Settled teams, protected operations and less HR burden.",
    icon: Factory,
  },
] as const;

const supplyPortfolioPillars = [
  {
    index: "01",
    title: "Life Base Infrastructure",
    subtitle: "Welfare & Site Setup Rental",
    statement: "Ready-to-use temporary infrastructure adapted to any location, from small projects to mega-projects.",
    groups: [
      ["Temporary Modules", ["Office containers", "Meeting rooms", "Industrial canteens", "Changing rooms", "Sanitary facilities"]],
      ["100% Autonomous Eco-Welfare Solutions", ["Off-grid self-sustaining life bases", "Hybrid solar energy"]],
      ["Water & Sanitation Management", ["Water tanks", "Booster pump groups", "Septic tanks", "Maintenance services"]],
      ["Security & Demarcation", ["Mobile fences", "Blind panels", "New Jersey barriers", "Gatehouse modules"]],
    ],
  },
  {
    index: "02",
    title: "Equipment & Industrial Machinery",
    subtitle: "Plant, Tools & Equipment Hire",
    statement: "Immediate access to a vast certified fleet, managed by Divin Solutions and invoiced in one place.",
    groups: [
      ["Temporary Power & Climate Control", ["Generators from 15kVA to mega-power", "Site distribution boards", "Lighting towers: diesel, hybrid and solar"]],
      ["Lifting & Material Handling", ["Elevated work platforms: scissor and articulated", "Telescopic handlers / telehandlers"]],
      ["Heavy & Light Machinery", ["Rotary excavators", "Mini-excavators", "Dumpers", "Compaction rollers"]],
      ["Equipment Support Equipment", ["Air compressors", "Submersible pumps", "Heat generators"]],
    ],
  },
  {
    index: "03",
    title: "B2B Procurement & Consumables",
    subtitle: "Your purchasing centre",
    statement: "If the project needs it, Divin Solutions finds it, buys it and delivers it just-in-time, reducing unnecessary on-site storage and tied-up stock.",
    groups: [
      ["Civil Construction Materials", ["Ready-mix concrete", "Cement", "Aggregates", "Sand", "Stone", "Structural timber", "Steel reinforcement"]],
      ["Metallic Materials", ["Rebar", "Metal mesh", "Reinforcement mesh", "Metal plates and sheets", "Site metalwork formats"]],
      ["MEP Specialties", ["Industrial piping", "Valves", "Electrical wiring", "Metallic cable trays", "Insulation", "Pipe systems"]],
      ["Electrical Materials", ["Cables", "Electrical panels and boards", "Sockets and outlets", "Site electrical systems support"]],
      ["Tools & Consumables", ["Professional power tools", "Cutting discs", "Welding consumables"]],
      ["Personal Protective Equipment", ["Certified high-quality PPE", "Mandatory safety signage"]],
    ],
  },
  {
    index: "04",
    title: "Logistics, Document Management & HSE",
    subtitle: "Compliance & Support Services",
    statement: "No equipment enters a multinational construction site without paperwork. Divin Solutions handles the bureaucracy.",
    groups: [
      ["Logistics & Special Transport", ["Oversized cargo transport scheduling", "Unloading operation planning", "Crane-truck mobilisation"]],
      ["Technical Documentation", ["User manuals", "CE certificates", "Lift plans", "Electrical load schedules"]],
      ["HSE Support & Platform Submission", ["Document processing on management platforms", "Obralia and e-coordina submissions", "Equipment entry approval support"]],
      ["Occupational Health", ["Occupational fitness medical exam scheduling", "Coordination of mandatory training"]],
    ],
  },
  {
    index: "05",
    title: "Fuel & Waste Management",
    subtitle: "Clean and compliant site flows",
    statement: "From on-site refuelling to certified waste management.",
    groups: [
      ["On-Site Refuelling", ["Agricultural/road diesel supply", "Green diesel / HVO", "Direct refuelling into generators and machinery tanks"]],
      ["Waste Containers", ["Skip-container rental", "Timber waste separation", "Plastic waste separation", "Scrap-metal separation"]],
      ["Environmental Certification", ["Certified waste collection", "Regular e-GAR issuance", "Waste tracking manifests"]],
    ],
  },
  {
    index: "06",
    title: "Technical Support & Sustainability",
    subtitle: "Maintenance & ESG",
    statement: "Peace of mind through service guarantees and green alignment.",
    groups: [
      ["24/7 Technical Support", ["Service Level Agreements (SLAs)", "24/7 on-call team", "Rapid replacement of damaged equipment", "Technical and mechanical assistance", "Specialised support to keep the site operational"]],
      ["Sustainable Solutions (ESG)", ["Low-carbon electric machinery", "Efficient LED solar lighting", "Sustainable hybrid generators", "Carbon footprint estimates", "Alignment with project ESG targets"]],
    ],
  },
  {
    index: "07",
    title: "On-Demand Workforce Solutions",
    subtitle: "Support staff and specialised technical profiles",
    statement: "Avoid schedule delays caused by unexpected shortage of human resources.",
    groups: [
      ["Support Workforce", ["Labourers and construction assistants", "Certified machine operators", "Signalmen / banksmen for lifting operations", "Post-construction cleaning teams"]],
      ["Specialised Technical Profiles", ["Certified welders", "Industrial pipefitters", "Specialised electricians", "Maintenance technicians"]],
    ],
  },
] as const;

const residencePillars = [
  {
    index: "01",
    title: "Corporate & Workforce Accommodation",
    subtitle: "Scalable housing for technical and operational teams",
    groups: [
      ["Volume Sourcing & Leasing", ["Apartments", "Houses", "Residential blocks", "Strategically located near the project site"]],
      ["Capacity Optimization", ["Shared accommodation layouts", "Habitability standards", "Privacy standards", "Comfort standards"]],
      ["Shift & Roster Management", ["Bed-space logistics", "Workforce shift rotations", "Project scheduling alignment"]],
    ],
  },
  {
    index: "02",
    title: "Executive Relocation & Management Housing",
    subtitle: "Premium relocation for senior leadership and families",
    groups: [
      ["Premium Residences", ["High-end real estate", "Privacy", "Security", "Comfort worthy of critical project leadership"]],
      ["Family Integration", ["Homes near international schools", "Urban amenities", "Major commuting routes", "Seamless settlement from day one"]],
      ["Soft Landing", ["Airport arrival support", "Key handover", "Personalised hands-on support"]],
    ],
  },
  {
    index: "03",
    title: "Turnkey Setup & Furnishing",
    subtitle: "Move-in-ready homes with zero downtime",
    groups: [
      ["Furniture & Appliances", ["Complete furniture packages", "White goods", "TVs", "HVAC systems", "Delivery and installation before arrival"]],
      ["Comfort Packs", ["Bedding", "Fresh linens", "Fully equipped kitchenware", "Immediate occupation readiness"]],
      ["Utility Activation", ["Water", "Electricity", "Gas", "High-speed broadband", "Administrative connections handled before arrival"]],
    ],
  },
  {
    index: "04",
    title: "Property Management & Maintenance",
    subtitle: "Day-to-day operations handled by one partner",
    groups: [
      ["Cleaning Services", ["Weekly and bi-weekly housekeeping", "Laundering and replacement of bed linens", "Hospitality-grade standards"]],
      ["Rapid-Response Maintenance", ["Dedicated 24/7 tenant helpline", "Electrical and plumbing intervention", "On-call team dispatched within hours"]],
      ["Inspections & Handover", ["Check-in and check-out inspections", "Deposit protection documentation", "Property standards upheld at every transition"]],
    ],
  },
  {
    index: "05",
    title: "Legal Compliance & Contract Administration",
    subtitle: "Protection from local rental-market risk",
    groups: [
      ["Corporate Leases", ["Flexible lease agreements", "Short, mid and long-term structures", "Project-timeline calibration", "Protection of company interests"]],
      ["Landlord Mediation", ["Representation to local property owners", "Negotiation management", "Professional relationship management", "Landlord trust building"]],
      ["Tax & Registration Compliance", ["Contracts registered with Portuguese Tax Authority", "Correct receipt issuance", "Full legal adherence", "Reduced company exposure"]],
    ],
  },
  {
    index: "06",
    title: "Commercial Spaces & Logistics Land",
    subtitle: "Every square metre the project needs",
    groups: [
      ["Laydown & Storage Yards", ["Secure fenced land plots", "Heavy machinery parking", "Container storage", "Full-scale logistical laydown operations"]],
      ["Corporate Offices", ["Open-plan office spaces", "Project management teams", "Engineering crews", "Administrative functions near site"]],
      ["Industrial Warehouses", ["Large-format warehouse facilities", "Equipment storage", "Materials staging", "Operational logistics near construction/infrastructure sites"]],
    ],
  },
] as const;

const residenceAdvantages = [
  ["Dedicated Account Manager", "One call resolves everything from securing a new home for a newly arrived engineer to fixing air conditioning in a team house."],
  ["Consolidated Invoicing", "One transparent monthly invoice replaces dozens of rent receipts, utility bills and service charges, broken down by cost center."],
  ["Risk Mitigation & Reputation", "Security deposits, preventative maintenance and dignified living conditions protect operational continuity, talent retention and corporate reputation."],
] as const;

const residenceMatrix = [
  ["Workforce Accommodation", "High volume", "Roster-based", "Shared housing", "Operational continuity"],
  ["Executive Relocation", "Selective", "Family-ready", "Premium residences", "Leadership stability"],
  ["Turnkey Setup", "Before arrival", "Move-in-ready", "Furniture + utilities", "Zero downtime"],
  ["Property Management", "Ongoing", "24/7 support", "Cleaning + maintenance", "Lower HR load"],
  ["Legal & Contract Administration", "Portfolio-wide", "Lease lifecycle", "Contracts + tax records", "Lower rental-market risk"],
  ["Logistics Land", "Project-based", "Near site", "Yards + warehouses", "Material proximity"],
] as const;

const projectTerraScope = [
  ["Integrated Management", "Infrastructure, drainage, water and MEP ducting coordinated within one contract."],
  ["Material Logistics", "Successful coordination with TSL for client-supplied / free-issue materials."],
  ["Technical Compliance", "C40 concrete, precast installations and rigorous CCTV testing."],
  ["Complexity", "Dense multi-utility corridors and hydrocarbon-separation systems."],
] as const;

const projectTerraCosts = [
  ["Preliminary Works & Site Setup", "EUR 285,850"],
  ["Substructures & Foundations", "EUR 334,492"],
  ["Structural Slabs & Bases", "EUR 82,479"],
  ["Drainage & Stormwater", "EUR 260,582"],
  ["Water & Fire Networks", "EUR 114,872"],
  ["Electrical & Telecom Ducting", "EUR 281,864"],
  ["Fuel System Infrastructure", "EUR 61,552"],
  ["Kerbs & External Finishes", "EUR 32,713"],
] as const;

const homeCoverageColumns = ["Resources", "Execution", "Compliance", "People", "Space"] as const;

const homeCoverageMatrix = [
  ["Construction Supply", "Materials, equipment, logistics and support", [3, 1, 3, 2, 1]],
  ["Civil Construction", "Groundworks, infrastructure and technical handover", [2, 3, 3, 1, 1]],
  ["Industrial Support", "Accommodation, offices, warehouses and yards", [1, 1, 2, 3, 3]],
] as const;

const controlLanes = [
  ["Materials", "Concrete, steel, MEP, consumables", 88],
  ["Equipment", "Power, machinery, lighting, pumps", 76],
  ["Logistics", "Transport, offload, documents, HSE", 92],
  ["Environment", "Fuel, waste, e-GAR, ESG records", 68],
  ["Workforce", "Operators, trades, cleaning, support", 74],
] as const;

const boqSegments = [
  ["Preliminaries", "19.65%", 19.65],
  ["Substructures", "22.99%", 22.99],
  ["Drainage", "17.92%", 17.92],
  ["Ducting", "19.38%", 19.38],
  ["Other scopes", "20.06%", 20.06],
] as const;

function Mark({ children }: { children: ReactNode }) {
  return <span className="copy-mark">{children}</span>;
}

function moveTabFocus<T>(
  event: KeyboardEvent<HTMLButtonElement>,
  items: readonly T[],
  currentIndex: number,
  onSelect: (item: T) => void,
) {
  const keyOffsets: Record<string, number> = {
    ArrowRight: 1,
    ArrowDown: 1,
    ArrowLeft: -1,
    ArrowUp: -1,
  };
  let nextIndex = currentIndex;

  if (event.key === "Home") nextIndex = 0;
  else if (event.key === "End") nextIndex = items.length - 1;
  else if (event.key in keyOffsets) nextIndex = (currentIndex + keyOffsets[event.key] + items.length) % items.length;
  else return;

  event.preventDefault();
  onSelect(items[nextIndex]);
  const tabs = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
  requestAnimationFrame(() => tabs?.[nextIndex]?.focus());
}

function SectionIntro({ eyebrow, title, copy }: { eyebrow: string; title: ReactNode; copy: ReactNode }) {
  return (
    <div className="section-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{copy}</p>
    </div>
  );
}

function Nav({ page }: { page: "home" | "supply" | "civil" | "accommodations" }) {
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const activeSolution = page === "supply" ? "Construction Supply" : page === "civil" ? "Civil Construction" : page === "accommodations" ? "Accommodations & Industrial Support" : "";

  return (
    <header className="nav-shell">
      <a href="/" className="brand-mark" aria-label="Divin Solutions home">
        <span className="brand-symbol"><img src={brandLogo} alt="" decoding="async" /></span>
        <span>Divin<strong>Solutions</strong></span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <div className="solutions-menu" onMouseLeave={() => setSolutionsOpen(false)}>
          <button type="button" className={activeSolution ? "solutions-trigger active" : "solutions-trigger"} onClick={() => setSolutionsOpen((value) => !value)} onMouseEnter={() => setSolutionsOpen(true)} aria-expanded={solutionsOpen} aria-controls="solutions-dropdown">
            Solutions <ChevronDown size={16} />
          </button>
          <AnimatePresence>
            {solutionsOpen && (
              <motion.div id="solutions-dropdown" className="solutions-dropdown" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>
                {solutionLinks.map((solution) => {
                  const Icon = solution.icon;
                  const active = activeSolution === solution.label;
                  return <a key={solution.href} href={solution.href} className={active ? "solution-link active" : "solution-link"}><Icon size={18} /><span><strong>{solution.label}</strong><small>{solution.copy}</small></span></a>;
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <a href="/#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
      <a className="nav-cta" href="#contact">Request Consultation</a>
      <button className="icon-button mobile-menu-button" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} aria-controls="mobile-navigation">
        <Menu size={20} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-navigation" className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="icon-button mobile-close" onClick={() => setOpen(false)} aria-label="Close menu"><X size={20} /></button>
            <span className="mobile-menu-label">Solutions</span>
            {solutionLinks.map((solution) => <a key={solution.href} href={solution.href} className={activeSolution === solution.label ? "service-switch" : ""} onClick={() => setOpen(false)}>{solution.label}</a>)}
            <a href="/#about" onClick={() => setOpen(false)}>About</a>
            <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
            <a className="mobile-cta" href="#contact" onClick={() => setOpen(false)}>Request Consultation</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function PictureHero({ desktop, mobile, className = "" }: { desktop: string; mobile: string; className?: string }) {
  return (
    <picture className={`static-hero-media ${className}`} aria-hidden="true">
      <source media="(max-width: 760px)" srcSet={mobile} />
      <img src={desktop} alt="" fetchPriority="high" decoding="async" />
    </picture>
  );
}

function LinearScrollHero({
  className,
  video,
  poster,
  mobileFallback,
  stages,
  children,
}: {
  className: string;
  video: string;
  poster: string;
  mobileFallback: string;
  stages: string[];
  children: ReactNode;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeStepRef = useRef(0);
  const animateToStepRef = useRef<(step: number) => void>(() => undefined);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const videoEl = videoRef.current;
    if (!section || !videoEl) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 761px)");
    let animationFrame = 0;

    const getProgress = () => {
      const bounds = section.getBoundingClientRect();
      const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
      const animationScrollable = Math.max(scrollable - window.innerHeight * 0.42, 1);
      return Math.min(1, Math.max(0, -bounds.top / animationScrollable));
    };

    const syncVideoToScroll = () => {
      animationFrame = 0;
      if (!desktop.matches || reducedMotion.matches || !Number.isFinite(videoEl.duration)) return;
      const progress = getProgress();
      const nextTime = progress * Math.max(videoEl.duration - 0.04, 0);
      if (Math.abs(videoEl.currentTime - nextTime) > 0.035) videoEl.currentTime = nextTime;
      const nextStep = Math.min(stages.length - 1, Math.floor(progress * stages.length));
      if (activeStepRef.current !== nextStep) {
        activeStepRef.current = nextStep;
        setActiveStep(nextStep);
      }
      section.style.setProperty("--hero-progress", progress.toString());
    };

    const requestSync = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(syncVideoToScroll);
    };

    const scrollToStep = (requestedStep: number) => {
      const nextStep = Math.min(stages.length - 1, Math.max(0, requestedStep));
      const targetProgress = nextStep / Math.max(stages.length - 1, 1);
      const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
      const animationScrollable = Math.max(scrollable - window.innerHeight * 0.42, 1);
      const targetY = section.offsetTop + targetProgress * animationScrollable;
      window.scrollTo({ top: targetY, behavior: reducedMotion.matches ? "auto" : "smooth" });
    };

    animateToStepRef.current = scrollToStep;

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (!desktop.matches || reducedMotion.matches || !["ArrowDown", "ArrowUp"].includes(event.key)) return;
      const bounds = section.getBoundingClientRect();
      if (bounds.top > 4 || bounds.bottom < window.innerHeight - 4) return;
      const direction = event.key === "ArrowDown" ? 1 : -1;
      const nextStep = Math.min(stages.length - 1, Math.max(0, activeStepRef.current + direction));
      event.preventDefault();
      scrollToStep(nextStep);
    };

    const initialize = () => {
      videoEl.pause();
      videoEl.currentTime = 0;
      activeStepRef.current = 0;
      setActiveStep(0);
      section.style.setProperty("--hero-progress", "0");
      requestSync();
    };

    videoEl.pause();
    videoEl.addEventListener("loadedmetadata", initialize);
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);
    window.addEventListener("keydown", handleKeyDown);
    if (videoEl.readyState >= 1) initialize();

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      videoEl.removeEventListener("loadedmetadata", initialize);
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
      window.removeEventListener("keydown", handleKeyDown);
      animateToStepRef.current = () => undefined;
    };
  }, [stages]);

  return (
    <section id="top" ref={sectionRef} className={`scroll-video-hero ${className}`}>
      <div className="scroll-video-stage">
        <video ref={videoRef} className="scroll-hero-video" poster={poster} preload="auto" muted playsInline aria-hidden="true">
          <source src={video} type="video/mp4" />
        </video>
        <PictureHero desktop={poster} mobile={mobileFallback} className="scroll-hero-fallback" />
        <div className="hero-overlay" />
        {children}
        <div className="hero-stage-control" aria-label="Hero transformation stages">
          <button type="button" className={activeStep === 0 ? "ghost-stage-button" : ""} onClick={() => animateToStepRef.current(activeStep - 1)} disabled={activeStep === 0} aria-label="Previous hero stage"><ChevronUp size={18} /></button>
          <div className="hero-stage-status" aria-live="polite">
            <span>0{activeStep + 1} / 0{stages.length}</span>
            <strong>{stages[activeStep]}</strong>
          </div>
          <div className="scroll-video-progress" aria-hidden="true"><span /></div>
          <button type="button" className={activeStep === stages.length - 1 ? "ghost-stage-button" : ""} onClick={() => animateToStepRef.current(activeStep + 1)} disabled={activeStep === stages.length - 1} aria-label="Next hero stage"><ChevronDown size={18} /></button>
        </div>
      </div>
    </section>
  );
}

function HomeHero() {
  return (
    <LinearScrollHero className="home-hero supply-scroll-hero" video={supplyHero.heroVideo} poster={supplyHero.heroPoster} mobileFallback={supplyHero.mobile} stages={supplyHeroStages}>
      <div className="hero-content page-grid">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="eyebrow">Construction Supply & Site Support</p>
          <h1>Construction supply that keeps <Mark>sites moving.</Mark></h1>
          <p className="hero-lede">Divin Solutions coordinates materials, machinery, site infrastructure, logistics, documentation and operational support through one partner.</p>
        </motion.div>
        <div className="hero-status" aria-label="Supply system coverage">
          {['Materials', 'Equipment', 'Logistics', 'Support'].map((item, index) => (
            <div key={item} className="status-row"><span>0{index + 1}</span><strong>{item}</strong></div>
          ))}
        </div>
      </div>
    </LinearScrollHero>
  );
}

function Problem() {
  return (
    <section id="problem" className="section problem-section">
      <div className="page-grid two-col">
        <SectionIntro eyebrow="Procurement Risk" title={<>Most delays start before the <Mark>work front.</Mark></>} copy={<>Materials, machinery, documents and support often move through disconnected vendors. When one element fails, the entire schedule absorbs the delay.</>} />
        <div className="risk-grid">
          {riskItems.map(([index, title, copy, Icon], itemIndex) => (
            <motion.article className="risk-card" key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: itemIndex * 0.05 }}>
              <Icon className="risk-icon" strokeWidth={1.2} /><span>{index}</span><strong>{title}</strong><p>{copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcurementRiskHeatmap() {
  return (
    <section className="section risk-heatmap-section">
      <div className="page-grid heatmap-grid">
        <SectionIntro eyebrow="Risk Heatmap" title={<>Where fragmented procurement creates <Mark>schedule exposure.</Mark></>} copy="The chart translates common site supply problems into likelihood and impact. Divin Solutions reduces risk by centralizing sourcing, logistics, documentation and replacement paths." />
        <div className="risk-matrix-card" aria-label="Procurement risk priority matrix">
          <div className="risk-matrix-head">
            <span>Risk signal</span>
            <span>Likelihood</span>
            <span>Impact</span>
            <span>Priority</span>
          </div>
          <div className="risk-matrix-rows">
            {procurementRiskMatrix.map(([title, likelihood, impact, , , copy], index) => {
              const likelihoodScore = likelihood === "High" ? 3 : likelihood === "Medium" ? 2 : 1;
              const impactScore = impact === "High" ? 3 : impact === "Medium" ? 2 : 1;
              const priority = likelihoodScore * impactScore;
              const priorityLabel = priority >= 9 ? "Critical" : priority >= 6 ? "High" : "Watch";
              return (
                <motion.article
                  className={`risk-matrix-row priority-${priorityLabel.toLowerCase()}`}
                  key={title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ delay: index * 0.06, duration: 0.28 }}
                >
                  <div className="risk-signal">
                    <span>0{index + 1}</span>
                    <div><strong>{title}</strong><p>{copy}</p></div>
                  </div>
                  <div className="risk-score" aria-label={`${likelihood} likelihood`}>
                    <small>{likelihood}</small>
                    <i style={{ "--score-width": `${(likelihoodScore / 3) * 100}%` } as CSSProperties} />
                  </div>
                  <div className="risk-score" aria-label={`${impact} impact`}>
                    <small>{impact}</small>
                    <i style={{ "--score-width": `${(impactScore / 3) * 100}%` } as CSSProperties} />
                  </div>
                  <div className="risk-priority"><strong>{priorityLabel}</strong><span>{priority}/9</span></div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  const [selected, setSelected] = useState(capabilities[0]);
  const [openSpec, setOpenSpec] = useState(selected.specs[0]?.title ?? "");
  useEffect(() => setOpenSpec(selected.specs[0]?.title ?? ""), [selected]);

  return (
    <section id="solutions" className="section capabilities-section">
      <div className="page-grid">
        <SectionIntro eyebrow="Supply Capabilities" title={<>Specific resources for <Mark>active construction sites.</Mark></>} copy={<>Eight coordinated supply areas, each broken down into practical product, equipment and support categories.</>} />
        <div className="capability-workbench">
          <div className="capability-tabs" role="tablist" aria-label="Supply capabilities">
            {capabilities.map((capability, capabilityIndex) => {
              const Icon = capability.icon;
              return <button id={`capability-tab-${capability.id}`} className={selected.id === capability.id ? "capability-tab active" : "capability-tab"} key={capability.id} onClick={() => setSelected(capability)} onKeyDown={(event) => moveTabFocus(event, capabilities, capabilityIndex, setSelected)} type="button" role="tab" tabIndex={selected.id === capability.id ? 0 : -1} aria-selected={selected.id === capability.id} aria-controls={`capability-panel-${capability.id}`}><span>{capability.index}</span><Icon size={18} /><strong>{capability.title}</strong></button>;
            })}
          </div>
          <AnimatePresence mode="wait">
            <motion.article id={`capability-panel-${selected.id}`} className="capability-detail" key={selected.id} role="tabpanel" aria-labelledby={`capability-tab-${selected.id}`} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }}>
              <div className="capability-image"><img src={selected.detailVisual} alt={`${selected.title} supply capability`} loading="lazy" decoding="async" /></div>
              <div className="capability-copy">
                <p className="eyebrow">{selected.eyebrow}</p><h3>{selected.title}</h3><p>{selected.copy}</p>
                <div className="pain-outcome"><div><span>Problem</span><p>{selected.pain}</p></div><div><span>Outcome</span><p>{selected.outcome}</p></div></div>
                <div className="spec-accordion">
                  {selected.specs.map((group) => {
                    const isOpen = openSpec === group.title;
                    return <div className="spec-item" key={group.title}><button type="button" onClick={() => setOpenSpec(isOpen ? "" : group.title)} aria-expanded={isOpen}><span>{group.title}</span><ChevronDown className={isOpen ? "open" : ""} size={18} /></button><AnimatePresence initial={false}>{isOpen && <motion.div className="spec-panel" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}><p>{group.description}</p><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></motion.div>}</AnimatePresence></div>;
                  })}
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function FullSupplyPortfolio() {
  return (
    <section id="full-supply-portfolio" className="section full-portfolio-section">
      <div className="page-grid">
        <SectionIntro eyebrow="Complete Supply Portfolio" title={<>Every resource category behind the <Mark>supply chain.</Mark></>} copy="The portfolio is structured for procurement teams that need the exact scope visible, not hidden behind broad service labels." />
        <div className="portfolio-pillar-grid">
          {supplyPortfolioPillars.map((pillar) => (
            <article className="portfolio-pillar" key={pillar.index}>
              <div className="portfolio-pillar-head">
                <span>{pillar.index}</span>
                <div>
                  <p className="eyebrow">{pillar.subtitle}</p>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.statement}</p>
                  <small>{pillar.groups.length} scope groups / {pillar.groups.reduce((total, [, items]) => total + items.length, 0)} listed resources</small>
                </div>
              </div>
              <div className="portfolio-group-grid">
                {pillar.groups.map(([title, items]) => (
                  <div className="portfolio-group" key={title}>
                    <h4>{title}</h4>
                    <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function OperatingLayerVisual() {
  return (
    <section className="section signature-section">
      <div className="page-grid signature-grid">
        <div>
          <p className="eyebrow">Operational Coverage Matrix</p>
          <h2>One company covering the pressure points behind <Mark>site continuity.</Mark></h2>
          <p>The Home page should explain coverage, not process. This matrix shows how each Divin Solutions business unit maps against the operational needs that normally fragment large construction projects.</p>
        </div>
        <div className="coverage-matrix-card" aria-label="Operational coverage matrix by business unit">
          <div className="coverage-summary">
            <span><strong>3</strong> business units</span>
            <span><strong>5</strong> pressure points</span>
            <span><strong>1</strong> control layer</span>
          </div>
          <div className="coverage-matrix-head">
            <span>Business Unit</span>
            {homeCoverageColumns.map((column) => <span key={column}>{column}</span>)}
          </div>
          <div className="coverage-matrix-body">
            {homeCoverageMatrix.map(([title, description, values], rowIndex) => (
              <motion.div className="coverage-row" key={title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.45 }} transition={{ delay: rowIndex * 0.08, duration: 0.28 }}>
                <div className="coverage-label">
                  <strong>{title}</strong>
                  <span>{description}</span>
                  <em>{values.reduce((sum, value) => sum + value, 0)}/15 coverage weight</em>
                </div>
                {values.map((value, index) => (
                  <div className={`coverage-cell coverage-level-${value}`} key={`${title}-${homeCoverageColumns[index]}`}>
                    <span>{value === 3 ? "Core" : value === 2 ? "Support" : "Adjacent"}</span>
                    <i><b style={{ "--coverage": `${(value / 3) * 100}%` } as CSSProperties} /></i>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
          <div className="coverage-legend">
            <span><i className="coverage-level-3" /> Core coverage</span>
            <span><i className="coverage-level-2" /> Support coverage</span>
            <span><i className="coverage-level-1" /> Adjacent coverage</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function SupplyControlRoom() {
  const readinessAverage = Math.round(controlLanes.reduce((sum, [, , value]) => sum + value, 0) / controlLanes.length);
  return (
    <section className="section control-room-section">
      <div className="page-grid control-room-grid">
        <SectionIntro eyebrow="Supply Intelligence" title={<>A live-feeling view of <Mark>resource pressure.</Mark></>} copy="Inspired by the operational diagrams in the client material, this section turns supply into an executive dashboard: categories, bottlenecks and readiness signals in one visual frame." />
        <div className="control-room-panel" aria-label="Supply readiness dashboard">
          <div className="control-panel-head">
            <span>Divin Supply OS</span>
            <strong>Readiness Index</strong>
          </div>
          <div className="control-dashboard">
            <div className="readiness-dial" style={{ "--dial": `${readinessAverage}%` } as CSSProperties}>
              <div><strong>{readinessAverage}%</strong><span>Aggregate readiness</span></div>
            </div>
            <div className="control-lanes">
              {controlLanes.map(([title, detail, value], index) => (
                <motion.div className="control-lane" key={title} initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.45 }} transition={{ delay: index * 0.08 }}>
                  <div><strong>{title}</strong><span>{detail}</span></div>
                  <div className="lane-track"><motion.span initial={{ width: 0 }} whileInView={{ width: `${value}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.12 + index * 0.08 }} /></div>
                  <em>{value}%</em>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="control-metrics">
            {["One contact", "One invoice", "One accountable flow"].map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function useSteppedChapter() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const update = () => {
      const top = section.getBoundingClientRect().top + window.scrollY;
      setActive(Math.max(0, Math.min(chapters.length - 1, Math.round((window.scrollY - top) / window.innerHeight))));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return { active, sectionRef };
}

function ScrollSystem() {
  const { active, sectionRef } = useSteppedChapter();
  const chapter = chapters[active];
  return (
    <section id="system" className="scroll-system" ref={sectionRef}>
      <div className="scroll-sticky">
        <AnimatePresence mode="wait"><motion.img key={chapter.index} className="scroll-image" src={systemVisuals[active]} alt="" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} /></AnimatePresence>
        <div className="scroll-gradient" />
        <div className="chapter-panel"><div className="chapter-index"><span>PILLAR</span><strong>{chapter.index}</strong></div><AnimatePresence mode="wait"><motion.div key={chapter.index} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><h2>{chapter.title}</h2><p>{chapter.copy}</p><ul>{chapter.bullets.map((item) => <li key={item}>{item}</li>)}</ul></motion.div></AnimatePresence></div>
        <div className="progress-rail"><span style={{ height: `${((active + 1) / chapters.length) * 100}%` }} /></div>
      </div>
    </section>
  );
}

function HomeProcess() {
  return <section id="process" className="section process-section"><div className="page-grid"><SectionIntro eyebrow="Project Flow" title={<>From requirement to delivery with <Mark>fewer moving parts.</Mark></>} copy="One coordination layer connects sourcing, logistics, documentation and operational support." /><div className="process-line">{processSteps.map(([index, title, copy]) => <article className="process-step" key={index}><span>{index}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>;
}

function Advantage() {
  return <section id="advantage" className="section advantage-section"><div className="page-grid two-col"><SectionIntro eyebrow="Commercial Advantage" title={<>Fewer handoffs. Stronger <Mark>operational control.</Mark></>} copy="Project teams gain one point of coordination across the resources required to keep the site active." /><div className="advantage-grid">{advantageItems.map(([title, copy, Icon]) => <article className="advantage-card" key={title as string}><Icon size={22} /><h3>{title as string}</h3><p>{copy as string}</p></article>)}</div></div></section>;
}

function Contact({ mode = "supply" }: { mode?: "supply" | "civil" | "accommodations" | "general" }) {
  const [sent, setSent] = useState(false);
  const services = useMemo(() => {
    if (mode === "civil") return constructionServices.map((item) => item.title);
    if (mode === "accommodations") return residencePillars.map((item) => item.title);
    if (mode === "general") return solutionLinks.map((solution) => solution.label);
    return capabilities.map((item) => item.title);
  }, [mode]);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };
  const contactCopy = {
    supply: {
      eyebrow: "Supply Consultation",
      title: <>Tell us what your project <Mark>needs next.</Mark></>,
      copy: "Share the resources, timing and site constraints you need to solve. We will help define the right supply path.",
      label: "Required supply area",
      placeholder: "Tell us about materials, equipment, timing and site constraints.",
    },
    civil: {
      eyebrow: "Civil Construction Consultation",
      title: <>Define the right <Mark>civil works package.</Mark></>,
      copy: "Share the project location, work packages, timing and available BOQ or drawings. We will review the scope and define the next technical step.",
      label: "Required work package",
      placeholder: "Tell us about scope, timeline, BOQ availability and project constraints.",
    },
    accommodations: {
      eyebrow: "Accommodation & Operational Space Consultation",
      title: <>Mobilize the right homes and spaces for <Mark>your project.</Mark></>,
      copy: "Share your workforce, relocation, property-management or industrial-space requirements. We will define the sourcing, setup and operating path.",
      label: "Required accommodation or space service",
      placeholder: "Tell us about staff numbers, arrival dates, location, accommodation standards, utilities, offices, warehouses or yard requirements.",
    },
    general: {
      eyebrow: "Divin Solutions Consultation",
      title: <>Map the right solution for <Mark>your operation.</Mark></>,
      copy: "Share the project challenge, timing and operational priorities. We will route the request to the right Divin Solutions team.",
      label: "Solution area",
      placeholder: "Tell us about the project, location, timing and what needs to be coordinated.",
    },
  }[mode];
  return (
    <section id="contact" className="section contact-section"><div className="page-grid contact-grid"><div><div className="contact-brand"><img src={brandLogo} alt="" loading="lazy" decoding="async" /></div><p className="eyebrow">{contactCopy.eyebrow}</p><h2>{contactCopy.title}</h2><p>{contactCopy.copy}</p><div className="contact-methods"><span><Mail size={18} />commercial@divinesolutions.pt</span><span><Phone size={18} />WhatsApp / phone to confirm</span></div></div><form className="contact-form" onSubmit={submit}><label>Name<input name="name" autoComplete="name" required /></label><label>Company<input name="company" autoComplete="organization" required /></label><label>Email<input name="email" type="email" autoComplete="email" required /></label><label>{contactCopy.label}<select name="service" defaultValue="" required><option value="" disabled>Select an option</option>{services.map((service) => <option key={service}>{service}</option>)}</select></label>{mode !== "supply" && <label className="full-field">Project location<input name="location" autoComplete="address-level2" /></label>}<label className="full-field">Message<textarea name="message" placeholder={contactCopy.placeholder} /></label><button className="button primary full-field" type="submit" aria-live="polite">{sent ? "Request noted" : "Request Consultation"}<Send size={18} /></button></form></div></section>
  );
}

function CivilHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeStepRef = useRef(0);
  const animateToStepRef = useRef<(step: number) => void>(() => undefined);
  const [activeStep, setActiveStep] = useState(0);
  const heroStages = ["Site", "Infrastructure", "Supply", "Operation"];

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 761px)");
    let animationFrame = 0;

    const getProgress = () => {
      const bounds = section.getBoundingClientRect();
      const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
      const animationScrollable = Math.max(scrollable - window.innerHeight * 0.42, 1);
      return Math.min(1, Math.max(0, -bounds.top / animationScrollable));
    };

    const syncVideoToScroll = () => {
      animationFrame = 0;
      if (!desktop.matches || reducedMotion.matches || !Number.isFinite(video.duration)) return;
      const progress = getProgress();
      const nextTime = progress * Math.max(video.duration - 0.04, 0);
      if (Math.abs(video.currentTime - nextTime) > 0.035) video.currentTime = nextTime;
      const nextStep = Math.min(3, Math.floor(progress * 4));
      if (activeStepRef.current !== nextStep) {
        activeStepRef.current = nextStep;
        setActiveStep(nextStep);
      }
      section.style.setProperty("--hero-progress", progress.toString());
    };

    const requestSync = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(syncVideoToScroll);
    };

    const scrollToStep = (requestedStep: number) => {
      const nextStep = Math.min(3, Math.max(0, requestedStep));
      const targetProgress = nextStep / 3;
      const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
      const animationScrollable = Math.max(scrollable - window.innerHeight * 0.42, 1);
      const targetY = section.offsetTop + targetProgress * animationScrollable;
      window.scrollTo({ top: targetY, behavior: reducedMotion.matches ? "auto" : "smooth" });
    };

    animateToStepRef.current = scrollToStep;

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (!desktop.matches || reducedMotion.matches || !["ArrowDown", "ArrowUp"].includes(event.key)) return;
      const bounds = section.getBoundingClientRect();
      if (bounds.top > 4 || bounds.bottom < window.innerHeight - 4) return;
      const direction = event.key === "ArrowDown" ? 1 : -1;
      const nextStep = Math.min(3, Math.max(0, activeStepRef.current + direction));
      event.preventDefault();
      scrollToStep(nextStep);
    };

    const initialize = () => {
      video.pause();
      video.currentTime = 0;
      activeStepRef.current = 0;
      setActiveStep(0);
      section.style.setProperty("--hero-progress", "0");
      requestSync();
    };

    video.pause();
    video.addEventListener("loadedmetadata", initialize);
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);
    window.addEventListener("keydown", handleKeyDown);
    if (video.readyState >= 1) initialize();

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      video.removeEventListener("loadedmetadata", initialize);
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
      window.removeEventListener("keydown", handleKeyDown);
      animateToStepRef.current = () => undefined;
    };
  }, []);

  return (
    <section id="top" ref={sectionRef} className="scroll-video-hero civil-hero">
      <div className="scroll-video-stage">
        <video ref={videoRef} className="civil-hero-video" poster={civilAssets.heroPoster} preload="auto" muted playsInline aria-hidden="true">
          <source src={civilAssets.heroVideo} type="video/mp4" />
        </video>
        <div className="civil-stage-stills" aria-hidden="true">
          {civilStageImages.map((image, index) => <img key={image} src={image} alt="" className={index === activeStep ? "active" : ""} decoding="async" />)}
        </div>
        <PictureHero desktop={civilAssets.heroPoster} mobile={civilAssets.heroMobile} className="civil-hero-fallback" />
        <div className="hero-overlay" />
        <div className="hero-content page-grid">
          <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <p className="eyebrow">Civil Construction Services</p>
            <h1>Groundworks and infrastructure built around <Mark>project continuity.</Mark></h1>
            <p className="hero-lede">Divin Solutions delivers coordinated civil works for industrial and logistics projects, from site mobilization and foundations to drainage, utility networks and technical handover.</p>
          </motion.div>
          <div className="hero-metrics"><span><small>Reference scope</small>EUR 1.45M+</span><span><small>BOQ lines</small>297+</span><span><small>Work areas</small>9</span></div>
        </div>
        <div className="hero-stage-control" aria-label="Civil construction transformation stages">
          <button type="button" className={activeStep === 0 ? "ghost-stage-button" : ""} onClick={() => animateToStepRef.current(activeStep - 1)} disabled={activeStep === 0} aria-label="Previous construction stage"><ChevronUp size={18} /></button>
          <div className="hero-stage-status" aria-live="polite">
            <span>0{activeStep + 1} / 04</span>
            <strong>{heroStages[activeStep]}</strong>
          </div>
          <div className="scroll-video-progress" aria-hidden="true"><span /></div>
          <button type="button" className={activeStep === 3 ? "ghost-stage-button" : ""} onClick={() => animateToStepRef.current(activeStep + 1)} disabled={activeStep === 3} aria-label="Next construction stage"><ChevronDown size={18} /></button>
        </div>
      </div>
    </section>
  );
}

function CivilOverview() {
  const layers = [['01','Site Preparation','Mobilization, temporary facilities, access and safe site operations.',HardHat],['02','Structural Works','Excavation, foundations, concrete slabs and equipment bases.',Wrench],['03','Utility Infrastructure','Drainage, water, fire, telecom and electrical networks.',Route],['04','Testing & Records','Inspection, CCTV testing, documentation and handover control.',FileCheck2]] as const;
  return <section id="overview" className="section civil-overview"><div className="page-grid"><SectionIntro eyebrow="Integrated Civil Infrastructure" title={<>One delivery layer from <Mark>groundworks to handover.</Mark></>} copy="The service connects construction execution, materials, HSE, documentation and technical coordination instead of treating each package as an isolated contract." /><div className="civil-infra-map radial" aria-label="Civil infrastructure delivery layers">{layers.map(([index, title, copy, Icon], itemIndex) => { const Component = Icon as typeof HardHat; return <motion.article key={title} initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ delay: itemIndex * 0.07, duration: 0.28 }}><span>{index}</span><Component size={28} strokeWidth={1.5} /><div><h3>{title}</h3><p>{copy}</p></div></motion.article>; })}<div className="civil-infra-core"><strong>Divin Solutions</strong><span>Single coordination layer</span></div></div></div></section>;
}

function CivilServices() {
  const [selected, setSelected] = useState(constructionServices[0]);
  useEffect(() => {
    const tablist = document.querySelector<HTMLElement>(".civil-service-tabs");
    const tabs = Array.from(tablist?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? []);
    tabs.forEach((tab) => { tab.tabIndex = tab.getAttribute("aria-selected") === "true" ? 0 : -1; });

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      const currentIndex = tabs.indexOf(event.target as HTMLButtonElement);
      if (currentIndex < 0) return;
      const offsets: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
      let nextIndex = currentIndex;
      if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = tabs.length - 1;
      else if (event.key in offsets) nextIndex = (currentIndex + offsets[event.key] + tabs.length) % tabs.length;
      else return;
      event.preventDefault();
      tabs[nextIndex]?.focus();
      tabs[nextIndex]?.click();
    };

    tablist?.addEventListener("keydown", handleKeyDown);
    return () => tablist?.removeEventListener("keydown", handleKeyDown);
  }, [selected]);
  return <section id="services" className="section civil-services"><div className="page-grid"><SectionIntro eyebrow="Work Packages" title={<>Eight packages covering the project’s <Mark>civil infrastructure.</Mark></>} copy="Select a package to review its typical scope, technical quantities and execution focus." /><div className="civil-service-layout"><div className="civil-service-tabs" role="tablist" aria-label="Civil construction work packages">{constructionServices.map((service) => { const Icon = service.icon; return <button key={service.index} type="button" role="tab" aria-selected={selected.index === service.index} aria-controls={`civil-panel-${service.index}`} className={selected.index === service.index ? 'civil-service-tab active' : 'civil-service-tab'} onClick={() => setSelected(service)}><span>{service.index}</span><Icon size={20} /><strong>{service.title}</strong></button>; })}</div><AnimatePresence mode="wait"><motion.article id={`civil-panel-${selected.index}`} className="civil-service-detail" key={selected.index} role="tabpanel" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }}><div className="civil-service-image"><img src={selected.visual} alt={selected.title} loading="lazy" decoding="async" /></div><div className="civil-service-copy"><p className="eyebrow">{selected.subtitle}</p><h3>{selected.title}</h3><p>{selected.summary}</p><div className="civil-package-metrics"><span><small>Reference package</small>{selected.value}</span><span><small>Project allocation</small>{selected.share}</span></div><div className="civil-detail-columns"><div><h4>Typical scope</h4><ul>{selected.scope.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h4>Execution focus</h4><ul>{selected.metrics.map((item) => <li key={item}>{item}</li>)}</ul></div></div></div></motion.article></AnimatePresence></div></div></section>;
}

function CivilProcess() {
  return <section id="civil-process" className="section civil-process"><div className="page-grid"><SectionIntro eyebrow="Delivery Process" title={<>A controlled route from <Mark>scope to handover.</Mark></>} copy="The process keeps commercial definition, technical planning, execution and project records connected." /><div className="civil-timeline-chart" aria-label="Civil delivery timeline">{civilTimelineSignals.map(([index, title, copy], itemIndex) => <motion.article key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.45 }} transition={{ delay: itemIndex * 0.08, duration: 0.3 }}><span>{index}</span><h3>{title}</h3><p>{copy}</p></motion.article>)}</div><div className="civil-process-grid">{civilProcess.map(([index, title, copy]) => <article key={index}><span>{index}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>;
}

function TechnicalCoordination() {
  return <section className="section technical-section"><div className="page-grid technical-grid"><div className="technical-image"><img src={civilAssets.boq} alt="Civil engineering BOQ and technical planning" loading="lazy" decoding="async" /></div><div><p className="eyebrow">Technical Coordination Layer</p><h2>More than execution: <Mark>scope control.</Mark></h2><p>Complex civil works depend on accurate quantities, clear interfaces and disciplined documentation. Divin Solutions coordinates the commercial and technical layer around execution.</p><ul className="check-list">{['BOQ review and package mapping','Material and free-issue coordination','Civil and MEP interface planning','HSE and compliance documentation','Inspection, testing and close-out records'].map((item) => <li key={item}><BadgeCheck size={18} />{item}</li>)}</ul></div></div></section>;
}

function CaseStudy() {
  return <section id="case-study" className="section case-study-section"><div className="page-grid"><div className="case-study-head"><div><p className="eyebrow">Project Reference</p><h2>Project Terra: infrastructure across <Mark>nine work areas.</Mark></h2></div><p>A large-scale industrial infrastructure reference showing integrated delivery across groundworks, drainage, water, structural concrete, utility corridors and technical systems.</p></div><div className="case-study-visual"><img src={civilAssets.caseStudy} alt="Large-scale industrial civil infrastructure project" loading="lazy" decoding="async" /><div className="case-study-stats"><span><small>Indicative project value</small>EUR 1,454,403.38</span><span><small>BOQ structure</small>297+ lines</span><span><small>Work packages</small>9 areas</span></div></div><div className="boq-dashboard"><div><p className="eyebrow">BOQ Distribution</p><h3>Cost concentration by civil workstream</h3><p>Substructures, drainage and ducting carry the largest technical and financial weight, which is why coordination and quantity control become executive-level risk management.</p></div><div className="boq-chart-suite"><div className="boq-donut" aria-label="BOQ composition donut chart"><div className="boq-donut-center"><strong>100%</strong><span>Total BOQ</span></div></div><div className="boq-bars">{boqSegments.map(([title, value, width], index) => <motion.article key={title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}><div><strong>{title}</strong><span>{value}</span></div><div className="boq-track"><motion.span initial={{ width: 0 }} whileInView={{ width: `${width * 3.4}%` }} viewport={{ once: true }} transition={{ duration: 0.75, delay: 0.1 + index * 0.08 }} /></div></motion.article>)}</div></div></div><div className="terra-detail-grid"><div><h3>Scope delivered</h3>{projectTerraScope.map(([title, copy]) => <article key={title}><BadgeCheck size={18} /><div><strong>{title}</strong><p>{copy}</p></div></article>)}</div><div><h3>Package values</h3>{projectTerraCosts.map(([title, value]) => <article key={title}><span>{title}</span><strong>{value}</strong></article>)}</div></div><div className="case-study-note"><strong>Reference context</strong><p>Based on an indicative civil infrastructure BOQ issued in April 2026. Substructures and drainage/water networks represent almost 50% of the total infrastructure investment. Executive cost centres: drainage and water EUR 375,454; substructures EUR 334,492; ducting and services EUR 281,864; other packages including preliminaries EUR 462,593.</p></div></div></section>;
}

function CivilAdvantages() {
  return <section className="section civil-advantages"><div className="page-grid"><SectionIntro eyebrow="Why Divin Solutions" title={<>Technical depth with a <Mark>single commercial interface.</Mark></>} copy="The value is not only in executing each package, but in coordinating them as one coherent infrastructure scope." /><div className="civil-value-table" aria-label="Civil construction value table">{civilAdvantages.map(([title, copy, Icon], index) => <motion.article key={title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ delay: index * 0.05, duration: 0.26 }}><span>0{index + 1}</span><Icon size={22} /><div><h3>{title}</h3><p>{copy}</p></div><strong>{index < 2 ? "Control" : index < 5 ? "Execution" : "Continuity"}</strong></motion.article>)}</div></div></section>;
}

function GatewayHero() {
  return (
    <LinearScrollHero className="gateway-hero" video={homeHero.heroVideo} poster={homeHero.heroPoster} mobileFallback={homeHero.mobile} stages={gatewayHeroStages}>
      <div className="hero-content page-grid">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="eyebrow">Construction, Supply & Operational Support</p>
          <h1>One coordination layer for projects that cannot afford <Mark>fragmentation.</Mark></h1>
          <p className="hero-lede">Divin Solutions connects construction supply, civil infrastructure and operational support spaces for teams managing complex site requirements.</p>
        </motion.div>
        <div className="hero-status" aria-label="Divin Solutions areas">
          {solutionLinks.map((solution, index) => <div key={solution.label} className="status-row"><span>0{index + 1}</span><strong>{solution.label}</strong></div>)}
        </div>
      </div>
    </LinearScrollHero>
  );
}

function GatewaySolutions() {
  return (
    <section id="solutions" className="section gateway-solutions">
      <div className="page-grid">
        <SectionIntro eyebrow="Solutions" title={<>Build the infrastructure. Supply the site. Support the <Mark>people around it.</Mark></>} copy="Three distinct business units, each solving a different operational layer around large construction and industrial projects." />
        <div className="solution-card-grid">
          {solutionLinks.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <a className="solution-card" href={solution.href} key={solution.href}>
                <span>0{index + 1}</span>
                <Icon size={28} />
                <p className="eyebrow">{solution.eyebrow}</p>
                <h3>{solution.label}</h3>
                <p className="solution-role">{solution.copy}</p>
                <div className="solution-scope">
                  <small>Scope</small>
                  {solution.scope.map((item) => <span key={item}>{item}</span>)}
                </div>
                <div className="solution-outcome"><small>Business outcome</small><p>{solution.outcome}</p></div>
                <strong>Open solution <ArrowRight size={17} /></strong>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="section about-section">
      <div className="page-grid two-col">
        <SectionIntro eyebrow="About Divin Solutions" title={<>Built for the operational reality of <Mark>large construction projects.</Mark></>} copy="Divin Solutions evolved from construction and real-estate execution into a broader operational partner for companies that need resources, infrastructure and support spaces coordinated with commercial clarity." />
        <div className="about-proof-grid">
          {[
            ["One accountable contact", "A single commercial interface for fragmented site requirements."],
            ["Construction-native context", "A team familiar with the pace, constraints and risk points of active works."],
            ["Multi-solution coordination", "Supply, civil works and operational spaces structured as connected services."],
          ].map(([title, copy]) => <article key={title}><BadgeCheck size={22} /><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </div>
    </section>
  );
}

function AccommodationsHero() {
  return (
    <LinearScrollHero className="accommodations-hero" video={accommodationsHero.heroVideo} poster={accommodationsHero.heroPoster} mobileFallback={accommodationsHero.mobile} stages={accommodationsHeroStages}>
      <div className="hero-content page-grid">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <p className="eyebrow">Accommodations & Industrial Support Spaces</p>
          <h1>Operational spaces that keep people, equipment and logistics <Mark>close to site.</Mark></h1>
          <p className="hero-lede">Divin Solutions supports construction and industrial operations with staff accommodation, site offices, warehouses, yards and storage solutions.</p>
        </motion.div>
      </div>
    </LinearScrollHero>
  );
}

function AccommodationsServices() {
  return (
    <section id="services" className="section accommodations-services">
      <div className="page-grid">
        <SectionIntro eyebrow="Divin Residence Portfolio" title={<>Spaces, housing and operations for <Mark>workforce continuity.</Mark></>} copy="This is not consumer real estate. It is corporate accommodation, relocation, property operation and industrial space support for large engineering and construction projects." />
        <div className="residence-operating-model" aria-label="Divin Residence operating model">
          <div className="residence-model-core"><strong>Divin Residence</strong><span>One accountable housing operation</span></div>
          {[
            ["01", "Source & Secure", "Identify properties, negotiate leases and align capacity with workforce location and project timing.", Route],
            ["02", "Furnish & Activate", "Deliver furniture, appliances, comfort packs and active utilities before the team arrives.", Factory],
            ["03", "Manage & Maintain", "Coordinate cleaning, maintenance, inspections, contracts and ongoing tenant support.", Wrench],
          ].map(([index, title, copy, Icon], itemIndex) => { const Component = Icon as typeof Route; return <motion.article key={title as string} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.45 }} transition={{ delay: itemIndex * 0.08, duration: 0.28 }}><span>{index as string}</span><Component size={28} strokeWidth={1.5} /><div><h3>{title as string}</h3><p>{copy as string}</p></div></motion.article>; })}
        </div>
        <div className="portfolio-pillar-grid">
          {residencePillars.map((pillar) => (
            <article className="portfolio-pillar" key={pillar.index}>
              <div className="portfolio-pillar-head">
                <span>{pillar.index}</span>
                <div>
                  <p className="eyebrow">{pillar.subtitle}</p>
                  <h3>{pillar.title}</h3>
                </div>
              </div>
              <div className="portfolio-group-grid">
                {pillar.groups.map(([title, items]) => <div className="portfolio-group" key={title}><h4>{title}</h4><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}
              </div>
            </article>
          ))}
        </div>
        <div className="residence-advantage">
          <SectionIntro eyebrow="Commercial Advantage" title={<>One partner. One invoice. <Mark>Zero housing distractions.</Mark></>} copy="Divin Residence centralizes the operational load that normally falls on HR, procurement and project management teams." />
          <div className="residence-matrix" aria-label="Accommodation and industrial support portfolio matrix">
            <div className="matrix-row matrix-head"><span>Service</span><span>Scale</span><span>Cadence</span><span>Asset Type</span><span>Business Outcome</span></div>
            {residenceMatrix.map((row, index) => <motion.div className="matrix-row" key={row[0]} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>{row.map((cell) => <span key={cell}>{cell}</span>)}</motion.div>)}
          </div>
          <div className="residence-value-list">
            {residenceAdvantages.map(([title, copy], index) => <motion.article key={title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}><span>0{index + 1}</span><BadgeCheck size={22} /><div><h3>{title}</h3><p>{copy}</p></div><strong>{index === 0 ? "Accountability" : index === 1 ? "Efficiency" : "Protection"}</strong></motion.article>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ label = "Construction, supply & operational support" }: { label?: string }) {
  return <footer className="site-footer"><span className="footer-brand"><img src={brandLogo} alt="" loading="lazy" decoding="async" />Divin Solutions</span><span>{label}</span></footer>;
}

function HomePage() {
  return <><Nav page="home" /><main><GatewayHero /><GatewaySolutions /><OperatingLayerVisual /><AboutSection /><Contact mode="general" /></main><Footer /></>;
}

function SupplyPage() {
  return <><Nav page="supply" /><main><HomeHero /><Problem /><ProcurementRiskHeatmap /><Capabilities /><SupplyControlRoom /><FullSupplyPortfolio /><ScrollSystem /><HomeProcess /><Advantage /><Contact mode="supply" /></main><Footer label="Construction Supply & Site Support" /></>;
}

function CivilConstructionPage() {
  return <><Nav page="civil" /><main><CivilHero /><CivilOverview /><CivilServices /><CivilProcess /><TechnicalCoordination /><CaseStudy /><CivilAdvantages /><Contact mode="civil" /></main><Footer label="Civil Construction & Infrastructure" /></>;
}

function AccommodationsPage() {
  return <><Nav page="accommodations" /><main><AccommodationsHero /><AccommodationsServices /><AboutSection /><Contact mode="accommodations" /></main><Footer label="Accommodations & Industrial Support Spaces" /></>;
}

export default function App() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";

  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "Divin Solutions | Construction, Supply & Operational Support",
      "/construction-supply": "Construction Supply | Divin Solutions",
      "/civil-construction": "Civil Construction | Divin Solutions",
      "/accommodations-industrial-support": "Accommodations & Industrial Support | Divin Solutions",
    };
    document.title = titles[path] ?? titles["/"];
  }, [path]);

  if (path === "/construction-supply") return <SupplyPage />;
  if (path === "/civil-construction") return <CivilConstructionPage />;
  if (path === "/accommodations-industrial-support") return <AccommodationsPage />;
  return <HomePage />;
}
