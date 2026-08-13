import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
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
  MessageCircle,
  Menu,
  Phone,
  Route,
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

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const systemVisuals = [asset("scroll-frames/00-blueprint-start.jpg"), ...capabilities.map((item) => item.visual)];
const brandLogo = asset("logo/edited/divin-logo-green-transparent.webp");

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

const siteUrl = "https://www.divinsolutions.com";
const defaultSeoImage = `${siteUrl}${homeHero.heroPoster}`;

const seoPages: Record<string, { title: string; description: string; image?: string }> = {
  "/": {
    title: "Divin Solutions | Construction, Supply & Operational Support",
    description: "Divin Solutions coordinates construction supply, civil works and operational support spaces for industrial, logistics and large-scale construction projects.",
    image: defaultSeoImage,
  },
  "/about-us": {
    title: "About Us | Divin Solutions",
    description: "Learn how Divin Solutions coordinates supply, civil execution and operational spaces around complex construction and industrial projects.",
    image: defaultSeoImage,
  },
  "/construction-supply": {
    title: "Construction Supply | Divin Solutions",
    description: "Construction materials, machinery, site infrastructure, logistics, documentation, waste management and workforce support coordinated through one partner.",
    image: `${siteUrl}${supplyHero.heroPoster}`,
  },
  "/civil-construction": {
    title: "Civil Construction | Divin Solutions",
    description: "Civil construction and infrastructure delivery for industrial projects, from site preparation and foundations to drainage, utilities and technical handover.",
    image: `${siteUrl}${asset("rebrand-light/civil/civil-hero-scroll-poster.webp")}`,
  },
  "/accommodations-industrial-support": {
    title: "Accommodations & Industrial Support | Divin Solutions",
    description: "Corporate accommodation, relocation, property management, offices, warehouses, yards and support spaces for construction and industrial operations.",
    image: `${siteUrl}${accommodationsHero.heroPoster}`,
  },
  "/privacy-policy": {
    title: "Privacy Policy | Divin Solutions",
    description: "Privacy policy for Divin Solutions business enquiries, project information and commercial communication.",
  },
  "/terms-and-conditions": {
    title: "Terms & Conditions | Divin Solutions",
    description: "Terms and conditions for using the Divin Solutions website and reviewing service information.",
  },
  "/cookies-policy": {
    title: "Cookies Policy | Divin Solutions",
    description: "Cookies policy for the Divin Solutions website, including essential cookies, analytics and browser controls.",
  },
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

const civilProcess = [
  ["01", "Scope Review", "Review drawings, project constraints, BOQ structure and delivery responsibilities."],
  ["02", "Technical Planning", "Define quantities, interfaces, methodology, provisional items and compliance requirements."],
  ["03", "Site Mobilization", "Deploy facilities, access control, machinery, teams, documentation and HSE systems."],
  ["04", "Civil Works", "Execute groundworks, foundations, slabs, drainage and buried utility infrastructure."],
  ["05", "Systems Coordination", "Align water, fire, electrical and telecom networks across shared work fronts."],
  ["06", "Testing & Handover", "Complete inspections, CCTV testing, records, close-out documentation and final handover."],
];

const civilTimelineSignals = [
  ["01", "Mobilize", "Site setup, access, HSE, equipment and document control"],
  ["02", "Build", "Earthworks, foundations, slabs and equipment bases"],
  ["03", "Connect", "Drainage, water, fire, telecom and electrical networks"],
  ["04", "Validate", "CCTV inspection, watertightness checks, records and handover"],
] as const;

const civilAdvantages = [
  ["Single Point of Contact", "An integrated partner for earthworks, foundations, infrastructure packages and technical coordination.", BadgeCheck],
  ["Certified & Compliant", "C40 concrete standards, CE documentation, HSE requirements and project compliance kept visible from planning to handover.", ShieldCheck],
  ["Proven Track Record", "Experience in large industrial scopes, including Project Terra and complex infrastructure packages.", BarChart3],
  ["Transparent Scope Control", "Drawings, quantities, interfaces and provisional items identified before execution starts.", ClipboardCheck],
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
    scope: ["Materials & machinery", "Logistics, HSE & documents", "Waste & workforce support"],
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
      ["Temporary Power & Climate Control", ["Generators from 15kVA to mega-power", "Site distribution boards", "Hybrid, electric and solar lighting towers"]],
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
    title: "Waste & Environmental Management",
    subtitle: "Clean and compliant site flows",
    statement: "Certified waste flows and environmental records handled with clear site compliance.",
    groups: [
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
      ["Soft Landing", ["Airport arrival support", "Airport-to-home shuttle", "Key handover", "Personalised hands-on support"]],
    ],
  },
  {
    index: "03",
    title: "Turnkey Setup & Furnishing",
    subtitle: "Move-in-ready homes with zero downtime",
    groups: [
      ["Furniture & Appliances", ["Complete furniture packages", "White goods", "TVs", "HVAC systems", "Delivery and installation before arrival"]],
      ["Comfort Packs", ["Bedding", "Fresh linens", "Fully equipped kitchenware", "Immediate occupation setup"]],
      ["Utility Activation", ["Water", "Electricity", "High-speed broadband", "Administrative connections handled before arrival"]],
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

const residenceOutcomeMap = [
  ["Workforce Accommodation", "Rooms and houses for large teams near the project.", "Teams arrive housed, rested and closer to the site."],
  ["Executive Relocation", "Premium homes, family-ready locations and arrival support.", "Senior profiles settle faster with less HR involvement."],
  ["Turnkey Setup", "Furniture, appliances, bedding, utilities and internet before arrival.", "People can move in immediately instead of waiting for setup."],
  ["Property Management", "Cleaning, maintenance, tenant support, inspections and handovers.", "Daily housing issues stop distracting project managers."],
  ["Legal & Contract Administration", "Lease negotiation, landlord communication, tax registration and receipts.", "Rental risk and paperwork are controlled by one partner."],
  ["Industrial Spaces", "Offices, warehouses, laydown yards and secure logistics land.", "Operational space stays close to the work front and project schedule."],
] as const;

const projectTerraScope = [
  ["Integrated Management", "Infrastructure, drainage, water and MEP ducting coordinated within one contract."],
  ["Material Logistics", "Successful coordination with TSL for client-supplied / free-issue materials."],
  ["Technical Compliance", "C40 concrete, precast installations and rigorous CCTV testing."],
  ["Complexity", "Dense multi-utility corridors and environmental separation systems."],
] as const;

const projectTerraCosts = [
  ["Preliminary Works & Site Setup", "Mobilization scope"],
  ["Substructures & Foundations", "Major civil package"],
  ["Structural Slabs & Bases", "Technical concrete works"],
  ["Drainage & Stormwater", "Water-management scope"],
  ["Water & Fire Networks", "Safety and service networks"],
  ["Electrical & Telecom Ducting", "Buried utility corridors"],
  ["Kerbs & External Finishes", "External completion works"],
] as const;

const caseStudyFocus = [
  ["Substructures", "Very high attention", "Foundations and structural bases affect access, sequencing and later technical works.", "Control quantities, reinforcement, concrete sequencing and inspection records before the next trade moves in."],
  ["Utility corridors", "High attention", "Electrical, telecom, water and fire routes must be coordinated before surfaces are closed.", "Align chambers, ducts, routes and service interfaces with the civil programme."],
  ["Drainage", "High attention", "Water management can block external works when pipes, chambers and levels are not resolved early.", "Coordinate pipe runs, gradients, inspection points and close-out evidence."],
  ["Site setup", "High attention", "Mobilization, access, temporary works and working areas define how safely the project can move.", "Prepare the site conditions, access sequence and daily operating controls."],
  ["External completion", "Medium attention", "Kerbs, paving, crossings and finishes are where technical networks become usable site infrastructure.", "Close edges, finishes, circulation routes and handover details after the buried works are controlled."],
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
  const [compact, setCompact] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const activeSolution = page === "supply" ? "Construction Supply" : page === "civil" ? "Civil Construction" : page === "accommodations" ? "Accommodations & Industrial Support" : "";

  useEffect(() => {
    const update = () => setCompact(window.scrollY > window.innerHeight * 0.7);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const keepSolutionsOpen = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setSolutionsOpen(true);
  };

  const scheduleSolutionsClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setSolutionsOpen(false), 140);
  };

  return (
    <header className={compact ? "nav-shell nav-shell-compact" : "nav-shell"}>
      <a href="/" className="brand-symbol-link" aria-label="Divin Solutions home">
        <span className="brand-symbol"><img src={brandLogo} alt="" decoding="async" /></span>
      </a>
      <a href="/" className="brand-wordmark" aria-label="Divin Solutions home">Divin <strong>Solutions</strong></a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <a href="/">Home Page</a>
        <a href="/about-us">About Us</a>
        <div className="solutions-menu" onMouseEnter={keepSolutionsOpen} onMouseLeave={scheduleSolutionsClose} onFocus={keepSolutionsOpen}>
          <button type="button" className={activeSolution ? "solutions-trigger active" : "solutions-trigger"} onClick={() => setSolutionsOpen((value) => !value)} aria-expanded={solutionsOpen} aria-controls="solutions-dropdown">
            Solutions <ChevronDown size={16} />
          </button>
          <AnimatePresence>
            {solutionsOpen && (
              <motion.div id="solutions-dropdown" className="solutions-dropdown" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} onMouseEnter={keepSolutionsOpen} onMouseLeave={scheduleSolutionsClose}>
                {solutionLinks.map((solution) => {
                  const Icon = solution.icon;
                  const active = activeSolution === solution.label;
                  return <a key={solution.href} href={solution.href} className={active ? "solution-link active" : "solution-link"}><Icon size={18} /><span><strong>{solution.label}</strong><small>{solution.copy}</small></span></a>;
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
      <button className="icon-button mobile-menu-button" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} aria-controls="mobile-navigation">
        <Menu size={20} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-navigation" className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="icon-button mobile-close" onClick={() => setOpen(false)} aria-label="Close menu"><X size={20} /></button>
            <a href="/" onClick={() => setOpen(false)}>Home Page</a>
            <a href="/about-us" onClick={() => setOpen(false)}>About Us</a>
            <span className="mobile-menu-label">Solutions</span>
            {solutionLinks.map((solution) => <a key={solution.href} href={solution.href} className={activeSolution === solution.label ? "service-switch" : ""} onClick={() => setOpen(false)}>{solution.label}</a>)}
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
      if (!desktop.matches || reducedMotion.matches) return;
      if (!Number.isFinite(videoEl.duration) || videoEl.duration <= 0) {
        videoEl.load();
        return;
      }
      const progress = getProgress();
      const nextTime = progress * Math.max(videoEl.duration - 0.04, 0);
      if (Math.abs(videoEl.currentTime - nextTime) > 0.035) {
        try {
          if (typeof videoEl.fastSeek === "function" && Math.abs(videoEl.currentTime - nextTime) > 0.45) {
            videoEl.fastSeek(nextTime);
          } else {
            videoEl.currentTime = nextTime;
          }
        } catch {
          videoEl.currentTime = nextTime;
        }
      }
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
      requestSync();
    };

    videoEl.muted = true;
    videoEl.playsInline = true;
    videoEl.preload = "auto";
    videoEl.pause();
    videoEl.addEventListener("loadedmetadata", initialize);
    videoEl.addEventListener("loadeddata", initialize);
    videoEl.addEventListener("canplay", initialize);
    videoEl.addEventListener("durationchange", initialize);
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);
    window.addEventListener("keydown", handleKeyDown);
    videoEl.load();
    if (videoEl.readyState >= 1) initialize();

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      videoEl.removeEventListener("loadedmetadata", initialize);
      videoEl.removeEventListener("loadeddata", initialize);
      videoEl.removeEventListener("canplay", initialize);
      videoEl.removeEventListener("durationchange", initialize);
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
        <div className="hero-status" aria-label="Supply system areas">
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
        <SectionIntro eyebrow="Why Sites Stop" title={<>Small supply gaps become <Mark>site stoppages.</Mark></>} copy={<>A project rarely stops because of one dramatic problem. It stops when materials, machinery, documents or support arrive late, incomplete or through too many disconnected suppliers.</>} />
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
  const stopPrevention = [
    ["Missing materials", "Crews wait because concrete, steel, MEP items or consumables are not on site.", "Divin centralizes sourcing and delivery timing before the work front is exposed.", Boxes],
    ["Equipment downtime", "Machinery gaps leave operators and teams idle while replacements are searched for.", "Divin keeps replacement paths and equipment support available through one contact.", Wrench],
    ["Logistics bottlenecks", "Transport, unloading or crane-truck planning slows the sequence even when resources exist.", "Divin coordinates transport, access, unloading and handoff around the site schedule.", Route],
    ["Documentation friction", "Resources arrive but cannot enter because certificates, HSE records or approvals are missing.", "Divin prepares manuals, certificates, HSE files and platform submissions before arrival.", FileCheck2],
    ["Workforce gaps", "Critical operators, trades or support teams are missing at the wrong phase.", "Divin supports workforce sourcing and operational backup for exposed phases.", UsersRound],
  ] as const;

  return (
    <section className="section risk-heatmap-section">
      <div className="page-grid heatmap-grid">
        <SectionIntro eyebrow="Site Continuity" title={<>What usually stops a site, and how Divin <Mark>prevents it.</Mark></>} copy="Each row connects a common site blocker with the practical coordination Divin adds before that blocker becomes a stoppage." />
        <div className="stop-prevention-card" aria-label="Site stoppage prevention table">
          <div className="stop-prevention-head">
            <span>Site blocker</span>
            <span>What happens on site</span>
            <span>How Divin prevents it</span>
          </div>
          <div className="stop-prevention-rows">
            {stopPrevention.map(([title, problem, response, Icon], index) => {
              const BlockerIcon = Icon;
              return (
                <motion.article className="stop-prevention-row" key={title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ delay: index * 0.06, duration: 0.28 }}>
                  <div className="stop-blocker"><span>0{index + 1}</span><BlockerIcon size={26} /><strong>{title}</strong></div>
                  <p>{problem}</p>
                  <p>{response}</p>
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
  const capabilitySummary = [
    ["Choose an area", "Materials, equipment, logistics, waste, technical support or workforce capacity.", Boxes],
    ["Open the specs", "Each area breaks down into practical product and service groups.", ClipboardCheck],
    ["Request one flow", "Divin coordinates suppliers, documents, delivery timing and site handoff.", Truck],
  ] as const;

  return (
    <section id="solutions" className="section capabilities-section">
      <div className="page-grid">
        <SectionIntro eyebrow="Supply Capabilities" title={<>Specific resources for <Mark>active construction sites.</Mark></>} copy={<>Select a supply area to see exactly what Divin can coordinate, what site problem it removes and which product or service groups sit inside it.</>} />
        <div className="capability-summary-strip" aria-label="How to read supply capabilities">
          {capabilitySummary.map(([title, copy, Icon], index) => {
            const SummaryIcon = Icon;
            return <article key={title}><span>0{index + 1}</span><SummaryIcon size={24} /><strong>{title}</strong><p>{copy}</p></article>;
          })}
        </div>
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
                <div className="pain-outcome"><div><span>Site issue</span><p>{selected.pain}</p></div><div><span>Divin result</span><p>{selected.outcome}</p></div></div>
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
  const portfolioUseCases = [
    ["When the site needs resources", "Materials, equipment, welfare infrastructure, waste flows or technical profiles can be requested through one coordination layer.", Boxes],
    ["When access depends on paperwork", "Documentation, HSE files, certificates, lift plans and platform submissions are prepared before delivery pressure builds.", FileCheck2],
    ["When scope changes mid-project", "Replacement paths, technical support and alternative suppliers keep the supply chain responsive instead of reactive.", Route],
  ] as const;

  return (
    <section id="full-supply-portfolio" className="section full-portfolio-section">
      <div className="page-grid">
        <SectionIntro eyebrow="Complete Supply Portfolio" title={<>The detailed operating catalogue behind the <Mark>supply service.</Mark></>} copy="This section keeps the full detail visible while making the purpose clear: Divin coordinates the resources, approvals and backup paths that keep active work fronts moving." />
        <div className="portfolio-decision-strip" aria-label="How Divin supply portfolio supports construction sites">
          {portfolioUseCases.map(([title, copy, Icon], index) => {
            const UseIcon = Icon;
            return <article key={title}><span>0{index + 1}</span><UseIcon size={24} /><strong>{title}</strong><p>{copy}</p></article>;
          })}
        </div>
        <div className="portfolio-pillar-grid">
          {supplyPortfolioPillars.map((pillar) => (
            <article className="portfolio-pillar" key={pillar.index}>
              <div className="portfolio-pillar-head">
                <span>{pillar.index}</span>
                <div>
                  <p className="eyebrow">{pillar.subtitle}</p>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.statement}</p>
                  <small>What this solves on site</small>
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
  const operatingRoutes = [
    {
      title: "Construction Supply",
      pressure: "Materials, equipment and site support arrive from too many disconnected suppliers.",
      coordination: "Divin centralizes sourcing, documentation, delivery and replacement paths.",
      result: "Work fronts stay supplied before teams lose momentum.",
      Icon: Boxes,
    },
    {
      title: "Civil Construction",
      pressure: "Groundworks, foundations and utility networks can block one another when scopes are split.",
      coordination: "Divin aligns drawings, quantities, site preparation, civil works and technical handover.",
      result: "Physical infrastructure moves under one accountable execution plan.",
      Icon: HardHat,
    },
    {
      title: "Industrial Support",
      pressure: "Teams need housing, offices, warehouses and yards before project operations can stabilize.",
      coordination: "Divin secures, activates and manages the spaces that keep people and logistics close to site.",
      result: "The project gains operational capacity without overloading internal teams.",
      Icon: Factory,
    },
  ] as const;

  const operatingControls = [
    ["Resources", "Materials, machinery and consumables"],
    ["Execution", "Civil works and technical scopes"],
    ["Compliance", "Documents, HSE records and approvals"],
    ["People", "Accommodation, workforce support and daily stability"],
    ["Space", "Offices, warehouses, yards and logistics land"],
  ] as const;

  return (
    <section className="section signature-section">
      <div className="page-grid signature-grid">
        <div>
          <p className="eyebrow">Executive Coordination</p>
          <h2>Three business units. One <Mark>accountable project view.</Mark></h2>
          <p>Divin Solutions reduces the operational noise around large projects by connecting supply, civil works and industrial support under one partner. Each unit solves a specific project pressure and keeps responsibility clear for decision-makers.</p>
        </div>
        <div className="operating-flow-map" aria-label="Divin Solutions executive coordination infographic">
          <div className="operating-flow-head"><span>Project pressure</span><span>Divin coordinates</span><span>Operational result</span></div>
          <div className="operating-route-grid">
            {operatingRoutes.map(({ title, pressure, coordination, result, Icon }, index) => (
              <motion.article key={title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ delay: index * 0.08, duration: 0.3 }}>
                <div className="operating-route-title"><span>0{index + 1}</span><Icon size={30} /><h3>{title}</h3></div>
                <p>{pressure}</p>
                <p>{coordination}</p>
                <strong>{result}</strong>
              </motion.article>
            ))}
          </div>
          <div className="operating-control-strip" aria-label="Areas coordinated by Divin Solutions">
            <div><span>Divin coordinates</span><strong>Resources, execution, compliance, people and space.</strong></div>
            {operatingControls.map(([title, copy]) => <article key={title}><strong>{title}</strong><p>{copy}</p></article>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function SupplyControlRoom() {
  const supplyFlow = [
    ["01", "Need", "The site identifies what is missing before the work front stops.", AlertTriangle],
    ["02", "Source", "Divin finds the material, equipment, service or support profile through one channel.", Boxes],
    ["03", "Clear", "Documents, certificates, HSE records and access requirements are prepared before arrival.", ClipboardCheck],
    ["04", "Deliver", "Transport, unloading and handover are coordinated around the project schedule.", Truck],
    ["05", "Continue", "Replacement paths and support keep the site moving when requirements change.", Route],
  ] as const;

  const siteChanges = [
    ["Fewer calls", "One partner filters supplier noise before it reaches the project team."],
    ["Fewer blockers", "Paperwork and entry requirements are handled before resources arrive."],
    ["Fewer stoppages", "Materials, equipment and support move around the work front, not after it fails."],
  ] as const;

  return (
    <section className="section control-room-section">
      <div className="page-grid control-room-grid">
        <SectionIntro eyebrow="Request Flow" title={<>How Divin turns requests into <Mark>site-ready resources.</Mark></>} copy="The value is operational clarity: identify the need, source the right resource, clear the paperwork, deliver it to site and keep a replacement path ready." />
        <div className="supply-flow-panel" aria-label="Construction supply operating flow">
          <div className="control-panel-head">
            <span>Divin Supply OS</span>
            <strong>Request to site-ready</strong>
          </div>
          <div className="supply-flow-rail">
            {supplyFlow.map(([index, title, copy, Icon], itemIndex) => {
              const StepIcon = Icon;
              return (
                <motion.article className="supply-flow-step" key={title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ delay: itemIndex * 0.06, duration: 0.28 }}>
                  <span>{index}</span>
                  <StepIcon size={24} />
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </motion.article>
              );
            })}
          </div>
          <div className="site-change-grid">
            {siteChanges.map(([title, copy], index) => <motion.article key={title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.24 + index * 0.06 }}><strong>{title}</strong><p>{copy}</p></motion.article>)}
          </div>
          <div className="control-metrics">
            {["One contact", "One invoice", "One accountable flow"].map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function ScrollSystem() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = chapters[selectedIndex];
  const selectedCapability = capabilities[Math.max(0, selectedIndex - 1)] ?? capabilities[selectedIndex];
  const selectedVisual = systemVisuals[selectedIndex] ?? selectedCapability?.visual ?? selectedCapability?.detailVisual;
  return (
    <section id="system" className="section system-workbench-section">
      <div className="page-grid">
        <SectionIntro eyebrow="Supply System" title={<>One supply layer across <Mark>every site pillar.</Mark></>} copy="This view connects the individual supply categories into one practical operating system: select a pillar to see what changes on site and what Divin coordinates behind it." />
        <div className="system-workbench">
          <div className="system-tabs" role="tablist" aria-label="Supply system pillars">
            {chapters.map((chapter, index) => (
              <button id={`system-tab-${chapter.index}`} className={selectedIndex === index ? "system-tab active" : "system-tab"} key={chapter.index} onClick={() => setSelectedIndex(index)} type="button" role="tab" tabIndex={selectedIndex === index ? 0 : -1} aria-selected={selectedIndex === index} aria-controls={`system-panel-${chapter.index}`}>
                <span>{chapter.index}</span>
                <strong>{chapter.title}</strong>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.article id={`system-panel-${selected.index}`} className="capability-detail system-detail" key={selected.index} role="tabpanel" aria-labelledby={`system-tab-${selected.index}`} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }}>
              <div className="capability-image system-image"><img src={selectedVisual} alt={`${selected.title} supply system pillar`} loading="lazy" decoding="async" /></div>
              <div className="capability-copy system-copy">
                <p className="eyebrow">Pillar {selected.index}</p>
                <h3>{selected.title}</h3>
                <p>{selected.copy}</p>
                <div className="system-bullet-grid">
                  {selected.bullets.map((item) => <span key={item}>{item}</span>)}
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
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
  const contactCopy = {
    supply: {
      eyebrow: "Supply Consultation",
      title: <>Tell us what your project <Mark>needs next.</Mark></>,
      copy: "Share the resources, timing and site constraints you need to solve. We will help define the right supply path.",
    },
    civil: {
      eyebrow: "Civil Construction Consultation",
      title: <>Define the right <Mark>civil works package.</Mark></>,
      copy: "Share the project location, work packages, timing and available BOQ or drawings. We will review the scope and define the next technical step.",
    },
    accommodations: {
      eyebrow: "Accommodation & Operational Space Consultation",
      title: <>Mobilize the right homes and spaces for <Mark>your project.</Mark></>,
      copy: "Share your workforce, relocation, property-management or industrial-space requirements. We will define the sourcing, setup and operating path.",
    },
    general: {
      eyebrow: "Divin Solutions Consultation",
      title: <>Map the right solution for <Mark>your operation.</Mark></>,
      copy: "Share the project challenge, timing and operational priorities. We will route the request to the right Divin Solutions team.",
    },
  }[mode];
  const whatsappHref = "https://wa.me/351928261397";
  return (
    <section id="contact" className="section contact-section"><div className="page-grid contact-grid contact-grid-simple"><div><div className="contact-brand"><img src={brandLogo} alt="" loading="lazy" decoding="async" /></div><p className="eyebrow">{contactCopy.eyebrow}</p><h2>{contactCopy.title}</h2><p>{contactCopy.copy}</p><div className="contact-methods"><span><Mail size={18} />commercial@divinsolutions.pt</span><span><Phone size={18} />+351 928 261 397</span></div></div><article className="whatsapp-direct"><span><MessageCircle size={20} />Direct WhatsApp</span><h3>Prefer a direct message?</h3><p>Open a WhatsApp conversation with Divin Solutions and send your project request directly.</p><a className="button whatsapp-button" href={whatsappHref} target="_blank" rel="noreferrer">Start WhatsApp chat<MessageCircle size={18} /></a></article></div></section>
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
      if (!desktop.matches || reducedMotion.matches) return;
      if (!Number.isFinite(video.duration) || video.duration <= 0) {
        video.load();
        return;
      }
      const progress = getProgress();
      const nextTime = progress * Math.max(video.duration - 0.04, 0);
      if (Math.abs(video.currentTime - nextTime) > 0.035) {
        try {
          if (typeof video.fastSeek === "function" && Math.abs(video.currentTime - nextTime) > 0.45) {
            video.fastSeek(nextTime);
          } else {
            video.currentTime = nextTime;
          }
        } catch {
          video.currentTime = nextTime;
        }
      }
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
      requestSync();
    };

    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.pause();
    video.addEventListener("loadedmetadata", initialize);
    video.addEventListener("loadeddata", initialize);
    video.addEventListener("canplay", initialize);
    video.addEventListener("durationchange", initialize);
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);
    window.addEventListener("keydown", handleKeyDown);
    video.load();
    if (video.readyState >= 1) initialize();

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      video.removeEventListener("loadedmetadata", initialize);
      video.removeEventListener("loadeddata", initialize);
      video.removeEventListener("canplay", initialize);
      video.removeEventListener("durationchange", initialize);
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
          <div className="hero-metrics"><span><small>Reference scope</small>Large-scale civil works</span><span><small>Technical records</small>Detailed scope</span><span><small>Work areas</small>9</span></div>
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
  const layers = [
    ["01", "Site Preparation", "Mobilization, temporary facilities, access and safe site operations.", "The project starts with controlled access, welfare and working conditions.", HardHat],
    ["02", "Structural Works", "Excavation, foundations, concrete slabs and equipment bases.", "Core construction packages move with clear quantities and site interfaces.", Wrench],
    ["03", "Utility Infrastructure", "Drainage, water, fire, telecom and electrical networks.", "Buried networks are coordinated before they create rework between teams.", Route],
    ["04", "Testing & Records", "Inspection, CCTV testing, documentation and handover control.", "The project closes with proof, records and technical handover ready.", FileCheck2],
  ] as const;

  return <section id="overview" className="section civil-overview"><div className="page-grid"><SectionIntro eyebrow="Integrated Civil Infrastructure" title={<>One delivery layer from <Mark>groundworks to handover.</Mark></>} copy="The service connects construction execution, materials, HSE, documentation and technical coordination instead of treating each package as an isolated contract." /><div className="civil-delivery-map" aria-label="Civil infrastructure delivery responsibilities"><div className="civil-delivery-head"><span>Work area</span><span>What Divin executes</span><span>Site outcome</span></div>{layers.map(([index, title, scope, result, Icon], itemIndex) => { const Component = Icon as typeof HardHat; return <motion.article key={title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ delay: itemIndex * 0.07, duration: 0.28 }}><div className="civil-delivery-title"><span>{index}</span><Component size={28} strokeWidth={1.5} /><h3>{title}</h3></div><p>{scope}</p><strong>{result}</strong></motion.article>; })}<div className="civil-delivery-core"><span>Divin Solutions coordinates</span><strong>Execution, materials, HSE, documentation and handover.</strong></div></div></div></section>;
}

function CivilServices() {
  const [selected, setSelected] = useState(constructionServices[0]);
  const serviceGuidance = [
    ["Choose a package", "Each work package represents a civil construction responsibility, not a price list.", HardHat],
    ["Review the scope", "The detail panel shows what the package normally includes on an industrial site.", ClipboardCheck],
    ["Control the interface", "Divin coordinates execution, materials, HSE records and handover around the same plan.", Route],
  ] as const;
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
  return <section id="services" className="section civil-services"><div className="page-grid"><SectionIntro eyebrow="Work Packages" title={<>Civil packages explained as <Mark>site responsibilities.</Mark></>} copy="This section is not a pricing table. It shows the construction areas Divin can execute and coordinate, from preparation to handover." /><div className="civil-guidance-strip" aria-label="How to read civil work packages">{serviceGuidance.map(([title, copy, Icon], index) => { const GuidanceIcon = Icon; return <article key={title}><span>0{index + 1}</span><GuidanceIcon size={24} /><strong>{title}</strong><p>{copy}</p></article>; })}</div><div className="civil-service-layout"><div className="civil-service-tabs" role="tablist" aria-label="Civil construction work packages">{constructionServices.map((service) => { const Icon = service.icon; return <button key={service.index} type="button" role="tab" aria-selected={selected.index === service.index} aria-controls={`civil-panel-${service.index}`} className={selected.index === service.index ? 'civil-service-tab active' : 'civil-service-tab'} onClick={() => setSelected(service)}><span>{service.index}</span><Icon size={20} /><strong>{service.title}</strong></button>; })}</div><AnimatePresence mode="wait"><motion.article id={`civil-panel-${selected.index}`} className="civil-service-detail" key={selected.index} role="tabpanel" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }}><div className="civil-service-image"><img src={selected.visual} alt={selected.title} loading="lazy" decoding="async" /></div><div className="civil-service-copy"><p className="eyebrow">{selected.subtitle}</p><h3>{selected.title}</h3><p>{selected.summary}</p><div className="civil-package-metrics"><span><small>Package role</small>{selected.value}</span><span><small>Coordination focus</small>Scope, interfaces and handover</span></div><div className="civil-detail-columns"><div><h4>Typical scope</h4><ul>{selected.scope.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h4>Execution focus</h4><ul>{selected.metrics.map((item) => <li key={item}>{item}</li>)}</ul></div></div></div></motion.article></AnimatePresence></div></div></section>;
}

function CivilProcess() {
  return <section id="civil-process" className="section civil-process"><div className="page-grid"><SectionIntro eyebrow="Delivery Process" title={<>A controlled route from <Mark>scope to handover.</Mark></>} copy="The process keeps the work understandable: define what will be built, prepare the site, execute the civil packages, connect the networks and close the records." /><div className="civil-delivery-path" aria-label="Civil delivery path">{civilTimelineSignals.map(([index, title, copy], itemIndex) => <motion.article key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.45 }} transition={{ delay: itemIndex * 0.08, duration: 0.3 }}><span>{index}</span><h3>{title}</h3><p>{copy}</p></motion.article>)}</div><div className="civil-control-points" aria-label="Civil construction control points">{civilProcess.map(([index, title, copy]) => <article key={index}><span>{index}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div></section>;
}

function TechnicalCoordination() {
  return <section className="section technical-section"><div className="page-grid technical-grid"><div className="technical-image"><img src={civilAssets.boq} alt="Civil engineering drawings and technical planning" loading="lazy" decoding="async" /></div><div><p className="eyebrow">Technical Coordination Layer</p><h2>More than execution: <Mark>scope control.</Mark></h2><p>Complex civil works depend on clear quantities, interfaces, drawings, site conditions and records. Divin Solutions coordinates the technical layer around execution so each package is ready before it reaches site.</p><ul className="check-list">{['Drawing and scope review','Material and free-issue coordination','Civil and MEP interface planning','HSE and compliance documentation','Inspection, testing and close-out records'].map((item) => <li key={item}><BadgeCheck size={18} />{item}</li>)}</ul></div></div></section>;
}

function CaseStudy() {
  return <section id="case-study" className="section case-study-section"><div className="page-grid"><div className="case-study-head"><div><p className="eyebrow">Project Reference</p><h2>Project Terra: infrastructure across <Mark>nine work areas.</Mark></h2></div><p>A large-scale industrial infrastructure reference showing integrated delivery across groundworks, drainage, water, structural concrete, utility corridors and technical systems.</p></div><div className="case-study-visual"><img src={civilAssets.caseStudy} alt="Large-scale industrial civil infrastructure project" loading="lazy" decoding="async" /><div className="case-study-stats"><span><small>Reference scale</small>Large infrastructure scope</span><span><small>Technical records</small>Detailed work schedule</span><span><small>Work packages</small>9 areas</span></div></div><div className="boq-dashboard"><div><p className="eyebrow">Coordination Focus Map</p><h3>Where does coordination matter most?</h3><p>This map translates the reference scope into operational attention: which areas create the most interfaces, blockers and handover risk.</p></div><div className="coordination-focus-map" aria-label="Civil coordination focus by work area"><div className="coordination-focus-head"><span>Work area</span><span>Coordination focus</span><span>Why it matters</span><span>Divin action</span></div>{caseStudyFocus.map(([title, level, reason, action], index) => <motion.article key={title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ delay: index * 0.06, duration: 0.28 }}><div className="focus-area"><span>{String(index + 1).padStart(2, "0")}</span><strong>{title}</strong></div><span className="focus-level">{level}</span><p>{reason}</p><p>{action}</p></motion.article>)}</div></div><div className="terra-detail-grid"><div><h3>Scope delivered</h3>{projectTerraScope.map(([title, copy]) => <article key={title}><BadgeCheck size={18} /><div><strong>{title}</strong><p>{copy}</p></div></article>)}</div><div><h3>Work packages</h3>{projectTerraCosts.map(([title, value]) => <article key={title}><span>{title}</span><strong>{value}</strong></article>)}</div></div><div className="case-study-note"><strong>Reference context</strong><p>Based on an indicative civil infrastructure work schedule issued in April 2026. The reference highlights the operational importance of substructures, drainage, water networks, ducting, service corridors and external works without disclosing commercial values.</p></div></div></section>;
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
        <SectionIntro eyebrow="Accommodation & Industrial Support Portfolio" title={<>Spaces, housing and operations for <Mark>workforce continuity.</Mark></>} copy="This is not consumer real estate. It is corporate accommodation, relocation, property operation and industrial space support for large engineering and construction projects." />
        <div className="residence-operating-model" aria-label="Divin Solutions accommodation and industrial support process">
          <div className="residence-model-core"><strong>Divin Solutions</strong><span>One accountable accommodation operation</span></div>
          {[
            ["01", "Find the right space", "Identify housing, offices, warehouses or yards close enough to support the project schedule.", Route],
            ["02", "Prepare before arrival", "Set up leases, furniture, appliances, utilities, internet and handover details before teams move in.", Factory],
            ["03", "Operate day to day", "Coordinate cleaning, maintenance, inspections, contracts and ongoing tenant support.", Wrench],
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
          <SectionIntro eyebrow="Commercial Advantage" title={<>One partner. One invoice. <Mark>No housing distractions.</Mark></>} copy="Divin Solutions centralizes the operational load that normally falls on HR, procurement and project management teams." />
          <div className="residence-outcome-map" aria-label="Accommodation and industrial support operating outcomes">
            <div className="residence-outcome-head"><span>Service area</span><span>What Divin handles</span><span>Operational result</span></div>
            {residenceOutcomeMap.map(([service, handled, result], index) => <motion.article key={service} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ delay: index * 0.05, duration: 0.28 }}><span>0{index + 1}</span><h3>{service}</h3><p>{handled}</p><strong>{result}</strong></motion.article>)}
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
  const year = new Date().getFullYear();
  return <footer className="site-footer"><div className="footer-inner"><div className="footer-main"><div className="footer-brand-block"><a href="/" className="footer-brand" aria-label="Divin Solutions home"><img src={brandLogo} alt="" loading="lazy" decoding="async" /><span>Divin Solutions</span></a><p>{label}. One commercial partner for project teams that need supply, execution and operational support to move with clarity.</p><div className="footer-badges"><span>Construction supply</span><span>Civil infrastructure</span><span>Operational spaces</span></div></div><nav className="footer-column" aria-label="Footer solution links"><strong>Solutions</strong>{solutionLinks.map((solution) => <a key={solution.href} href={solution.href}>{solution.label}</a>)}</nav><div className="footer-column"><strong>Direct contact</strong><a href="mailto:commercial@divinsolutions.pt"><Mail size={16} />commercial@divinsolutions.pt</a><a href="tel:+351928261397"><Phone size={16} />+351 928 261 397</a><a className="footer-whatsapp" href="https://wa.me/351928261397" target="_blank" rel="noreferrer"><MessageCircle size={16} />WhatsApp</a></div><nav className="footer-column" aria-label="Legal links"><strong>Legal</strong><a href="/privacy-policy">Privacy Policy</a><a href="/terms-and-conditions">Terms & Conditions</a><a href="/cookies-policy">Cookies Policy</a></nav></div><div className="footer-bottom"><span>© {year} Divin Solutions. All rights reserved.</span><span>Built for construction, infrastructure and industrial operations.</span></div></div></footer>;
}

const legalPages: Record<string, { title: string; intro: string; sections: [string, string][] }> = {
  "/privacy-policy": {
    title: "Privacy Policy",
    intro: "Divin Solutions handles business enquiries, project information and commercial communication with care. This policy explains what information may be collected through the website or direct contact and how it is used.",
    sections: [
      ["Information we may collect", "We may collect business contact details, company information, project location, operational requirements and any files or notes voluntarily shared by email, phone, WhatsApp or direct commercial communication."],
      ["How information is used", "Information is used to reply to enquiries, understand project requirements, prepare commercial follow-up, coordinate internal review and support future communication about relevant Divin Solutions services."],
      ["Legal basis", "Where applicable, information is processed to respond to a requested commercial contact, prepare pre-contractual communication, fulfil legitimate business interests or comply with legal obligations."],
      ["Sharing and suppliers", "Project information may be reviewed internally and, when necessary, shared with trusted operational partners only to evaluate feasibility, availability, compliance or delivery requirements."],
      ["Data retention", "Commercial enquiry data is kept only for as long as needed for business communication, proposal follow-up, operational record keeping or legal obligations."],
      ["Your rights", "You may request access, correction or deletion of personal data by contacting Divin Solutions through the contact details available on this website."],
    ],
  },
  "/cookies-policy": {
    title: "Cookies Policy",
    intro: "This website is designed to remain lightweight, clear and respectful of visitor privacy. Cookies and similar technologies may be used only for essential operation, analytics or future performance measurement.",
    sections: [
      ["Essential cookies", "Essential cookies support basic website behaviour, security and reliable navigation. These are used only when required for the site to function correctly."],
      ["Analytics cookies", "If analytics are enabled, they are used to understand page performance, content engagement and technical behaviour so the website experience can be improved."],
      ["Third-party services", "The website may connect to services such as analytics, hosting, embedded media or communication links. These services may apply their own privacy and cookie practices."],
      ["Managing cookies", "Visitors can block, delete or manage cookies through their browser settings. Some site features may behave differently if cookies are disabled."],
      ["Updates", "This policy may be updated as the website evolves, especially if new measurement, media or marketing tools are added."],
    ],
  },
  "/terms-and-conditions": {
    title: "Terms and Conditions",
    intro: "The information on this website presents Divin Solutions services for commercial evaluation. Final scope, availability, responsibilities, timelines and commercial terms are confirmed by written agreement.",
    sections: [
      ["Website content", "Service descriptions are provided for general business information and may change as project requirements, supplier availability, technical conditions or compliance obligations evolve."],
      ["No automatic engagement", "Use of this website or direct contact with Divin Solutions does not create a service agreement. Any engagement depends on formal review, quotation and written confirmation."],
      ["Commercial proposals", "Any service engagement is subject to operational feasibility, supplier availability, agreed scope, contract terms and any required technical or compliance validation."],
      ["Technical information", "Website content should not replace project-specific engineering documentation, safety files, contractual records, legal advice or formal technical specifications."],
      ["External links", "The website may include links to external platforms, such as WhatsApp or social media. Divin Solutions is not responsible for third-party platform availability or policies."],
      ["Limitation", "Divin Solutions aims to keep information accurate and current, but cannot guarantee that every website detail will be complete, uninterrupted or suitable for every project context."],
    ],
  },
};

function LegalPage({ page }: { page: keyof typeof legalPages }) {
  const content = legalPages[page];
  return <><Nav page="home" /><main className="legal-page"><section className="section"><div className="page-grid legal-grid"><p className="eyebrow">Legal</p><h1>{content.title}</h1><p className="hero-lede">{content.intro}</p><div className="legal-card-grid">{content.sections.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section></main><Footer /></>;
}

function AboutUsPage() {
  const principles = [
    ["Construction-native coordination", "Divin Solutions understands that delays often begin before execution: missing resources, incomplete documentation, unclear handoffs and fragmented supplier ownership."],
    ["One accountable commercial layer", "The company connects supply, civil execution and operational spaces so project teams can reduce scattered communication and keep responsibility easier to track."],
    ["Built around active sites", "Services are structured around practical site needs: materials, machinery, welfare infrastructure, logistics, HSE records, workforce support, civil works and accommodation."],
    ["Operational clarity for decision-makers", "The goal is to make complex project support easier to understand, source, approve and manage across large construction and industrial environments."],
  ] as const;

  return (
    <><Nav page="home" /><main className="legal-page about-us-page">
      <section className="section">
        <div className="page-grid two-col">
          <div>
            <p className="eyebrow">About Us</p>
            <h1>Divin Solutions coordinates the operational layer around <Mark>complex construction projects.</Mark></h1>
            <p className="hero-lede">Divin Solutions evolved from construction and real-estate execution into a broader business partner for companies that need resources, infrastructure and operational spaces coordinated with commercial clarity.</p>
          </div>
          <div className="about-proof-grid">
            {principles.map(([title, copy]) => <article key={title}><BadgeCheck size={22} /><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="page-grid">
          <SectionIntro eyebrow="What We Coordinate" title={<>Three service areas. <Mark>One operating mindset.</Mark></>} copy="Each Divin Solutions business area addresses a different operational pressure, but the underlying goal is the same: fewer blockers, fewer handoffs and clearer accountability." />
          <div className="solution-card-grid">
            {solutionLinks.map((solution) => {
              const Icon = solution.icon;
              return <a className="solution-card" href={solution.href} key={solution.href}><div className="solution-card-icon"><Icon size={30} /></div><p className="eyebrow">{solution.eyebrow}</p><h3>{solution.label}</h3><p>{solution.copy}</p><strong>Explore solution <ArrowRight size={17} /></strong></a>;
            })}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="page-grid">
          <SectionIntro eyebrow="How We Work" title={<>A practical partner for project teams that need <Mark>momentum.</Mark></>} copy="Divin Solutions is positioned for construction companies, industrial operators, developers and project teams that need support services to arrive ready, documented and coordinated." />
          <div className="process-line">
            {[['01', 'Understand', 'Clarify the project context, location, work fronts, timing and operational constraints.'], ['02', 'Structure', 'Define which supply, civil or operational-space areas need coordination.'], ['03', 'Coordinate', 'Connect suppliers, documents, logistics, HSE requirements and handoff responsibilities.'], ['04', 'Mobilize', 'Move resources, teams or spaces into place with clearer ownership and timing.'], ['05', 'Support', 'Adapt the solution as project requirements, phases and risks change.']].map(([index, title, copy]) => <article className="process-step" key={index}><span>{index}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </div>
      </section>
      <Contact mode="general" />
    </main><Footer /></>
  );
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
    const seo = seoPages[path] ?? seoPages["/"];
    const canonical = `${siteUrl}${path === "/" ? "" : path}`;
    const image = seo.image ?? defaultSeoImage;

    const setMeta = (selector: string, attribute: "name" | "property", value: string, content: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    let canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }

    document.title = seo.title;
    canonicalLink.href = canonical;
    setMeta('meta[name="description"]', "name", "description", seo.description);
    setMeta('meta[property="og:title"]', "property", "og:title", seo.title);
    setMeta('meta[property="og:description"]', "property", "og:description", seo.description);
    setMeta('meta[property="og:type"]', "property", "og:type", "website");
    setMeta('meta[property="og:url"]', "property", "og:url", canonical);
    setMeta('meta[property="og:image"]', "property", "og:image", image);
    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", seo.title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", seo.description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", image);

    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${siteUrl}/#organization`,
          name: "Divin Solutions",
          url: siteUrl,
          logo: `${siteUrl}${brandLogo}`,
          contactPoint: [{
            "@type": "ContactPoint",
            telephone: "+351928261397",
            contactType: "commercial enquiries",
            areaServed: "PT",
            availableLanguage: ["en", "pt"],
          }],
        },
        {
          "@type": "WebSite",
          "@id": `${siteUrl}/#website`,
          name: "Divin Solutions",
          url: siteUrl,
          publisher: { "@id": `${siteUrl}/#organization` },
        },
        {
          "@type": "WebPage",
          "@id": `${canonical}#webpage`,
          url: canonical,
          name: seo.title,
          description: seo.description,
          isPartOf: { "@id": `${siteUrl}/#website` },
          about: { "@id": `${siteUrl}/#organization` },
        },
      ],
    };

    let schemaScript = document.head.querySelector<HTMLScriptElement>('script[data-schema="divin-solutions"]');
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.type = "application/ld+json";
      schemaScript.dataset.schema = "divin-solutions";
      document.head.appendChild(schemaScript);
    }
    schemaScript.text = JSON.stringify(schema);

    window.gtag?.("event", "page_view", {
      page_title: seo.title,
      page_location: canonical,
      page_path: path,
    });
  }, [path]);

  if (path === "/construction-supply") return <SupplyPage />;
  if (path === "/civil-construction") return <CivilConstructionPage />;
  if (path === "/accommodations-industrial-support") return <AccommodationsPage />;
  if (path === "/about-us") return <AboutUsPage />;
  if (path === "/privacy-policy" || path === "/cookies-policy" || path === "/terms-and-conditions") return <LegalPage page={path} />;
  return <HomePage />;
}
