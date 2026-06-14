import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  ChevronDown,
  ClipboardCheck,
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
};

const civilAssets = {
  heroDesktop: asset("rebrand-light/civil/civil-hero-desktop.webp"),
  heroMobile: asset("rebrand-light/civil/civil-hero-mobile.webp"),
  boq: asset("rebrand-light/civil/civil-boq-planning.webp"),
  caseStudy: asset("rebrand-light/civil/civil-project-terra.webp"),
};

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
  ["05", "Systems Coordination", "Align water, fire, electrical, telecom and fuel networks across shared work fronts."],
  ["06", "Testing & Handover", "Complete inspections, CCTV testing, records, close-out documentation and final handover."],
];

const civilAdvantages = [
  ["Single Point of Contact", "One accountable coordination layer across civil works, infrastructure and materials.", BadgeCheck],
  ["BOQ-Based Control", "Transparent scope mapping with quantities, provisional items and package-level visibility.", BarChart3],
  ["Certified & Compliant", "Execution aligned with technical specifications, HSE requirements and project standards.", ShieldCheck],
  ["End-to-End Delivery", "Support from mobilization and excavation through testing, records and handover.", ClipboardCheck],
  ["Material Coordination", "Civil execution remains connected to concrete, reinforcement, pipework and equipment supply.", Truck],
  ["ESG Awareness", "Waste, environmental records and lower-impact options are integrated into project coordination.", Leaf],
] as const;

function Mark({ children }: { children: ReactNode }) {
  return <span className="copy-mark">{children}</span>;
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

function Nav({ page }: { page: "home" | "civil" }) {
  const [open, setOpen] = useState(false);
  const items = page === "home"
    ? [
        ["Supply", "#solutions"],
        ["Supply System", "#system"],
        ["Process", "#process"],
        ["Advantage", "#advantage"],
        ["Civil Construction", "/civil-construction", "service-switch"],
      ]
    : [
        ["Overview", "#overview"],
        ["Work Packages", "#services"],
        ["Process", "#civil-process"],
        ["Project Terra", "#case-study"],
        ["Supply", "/", "service-switch"],
      ];

  return (
    <header className="nav-shell">
      <a href="/" className="brand-mark" aria-label="Divin Solutions home">
        <span className="brand-symbol"><img src={brandLogo} alt="" /></span>
        <span>Divin<strong>Solutions</strong></span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {items.map(([label, href, className]) => <a key={label} href={href} className={className}>{label}</a>)}
      </nav>
      <a className="nav-cta" href="#contact">Request Consultation</a>
      <button className="icon-button mobile-menu-button" onClick={() => setOpen(true)} aria-label="Open menu">
        <Menu size={20} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="icon-button mobile-close" onClick={() => setOpen(false)} aria-label="Close menu"><X size={20} /></button>
            {items.map(([label, href, className]) => <a key={label} href={href} className={className} onClick={() => setOpen(false)}>{label}</a>)}
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

function HomeHero() {
  return (
    <section id="top" className="static-hero home-hero">
      <PictureHero {...homeHero} />
      <div className="hero-overlay" />
      <div className="hero-content page-grid">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="eyebrow">Construction Supply & Site Support</p>
          <h1>Construction supply that keeps <Mark>sites moving.</Mark></h1>
          <p className="hero-lede">Divin Solutions coordinates materials, machinery, site infrastructure, logistics, documentation and operational support through one partner.</p>
          <div className="hero-actions">
            <a href="#contact" className="button primary">Request Supply Consultation <ArrowRight size={18} /></a>
          </div>
        </motion.div>
        <div className="hero-status" aria-label="Supply system coverage">
          {['Materials', 'Equipment', 'Logistics', 'Support'].map((item, index) => (
            <div key={item} className="status-row"><span>0{index + 1}</span><strong>{item}</strong></div>
          ))}
        </div>
      </div>
      <a className="scroll-cue" href="#problem" aria-label="Scroll to procurement risks"><ChevronDown size={22} /></a>
    </section>
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
            {capabilities.map((capability) => {
              const Icon = capability.icon;
              return <button className={selected.id === capability.id ? "capability-tab active" : "capability-tab"} key={capability.id} onClick={() => setSelected(capability)} type="button"><span>{capability.index}</span><Icon size={18} /><strong>{capability.title}</strong></button>;
            })}
          </div>
          <AnimatePresence mode="wait">
            <motion.article className="capability-detail" key={selected.id} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }}>
              <div className="capability-image"><img src={selected.detailVisual} alt={`${selected.title} supply capability`} decoding="async" /></div>
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

function Contact({ civil = false }: { civil?: boolean }) {
  const [sent, setSent] = useState(false);
  const services = useMemo(() => (civil ? constructionServices.map((item) => item.title) : capabilities.map((item) => item.title)), [civil]);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };
  return (
    <section id="contact" className="section contact-section"><div className="page-grid contact-grid"><div><div className="contact-brand"><img src={brandLogo} alt="" /></div><p className="eyebrow">{civil ? "Civil Construction Consultation" : "Supply Consultation"}</p><h2>{civil ? <>Define the right <Mark>civil works package.</Mark></> : <>Tell us what your project <Mark>needs next.</Mark></>}</h2><p>{civil ? "Share the project location, work packages, timing and available BOQ or drawings. We will review the scope and define the next technical step." : "Share the resources, timing and site constraints you need to solve. We will help define the right supply path."}</p><div className="contact-methods"><span><Mail size={18} />commercial@divinesolutions.pt</span><span><Phone size={18} />WhatsApp / phone to confirm</span></div></div><form className="contact-form" onSubmit={submit}><label>Name<input name="name" required /></label><label>Company<input name="company" required /></label><label>Email<input name="email" type="email" required /></label><label>{civil ? "Required work package" : "Required supply area"}<select name="service" defaultValue="" required><option value="" disabled>Select an option</option>{services.map((service) => <option key={service}>{service}</option>)}</select></label>{civil && <label className="full-field">Project location<input name="location" /></label>}<label className="full-field">Message<textarea name="message" placeholder={civil ? "Tell us about scope, timeline, BOQ availability and project constraints." : "Tell us about materials, equipment, timing and site constraints."} /></label><button className="button primary full-field" type="submit">{sent ? "Request noted" : "Request Consultation"}<Send size={18} /></button></form></div></section>
  );
}

function CivilHero() {
  return <section id="top" className="static-hero civil-hero"><PictureHero desktop={civilAssets.heroDesktop} mobile={civilAssets.heroMobile} /><div className="hero-overlay" /><div className="hero-content page-grid"><motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}><p className="eyebrow">Civil Construction Services</p><h1>Groundworks and infrastructure built around <Mark>project continuity.</Mark></h1><p className="hero-lede">Divin Solutions delivers coordinated civil works for industrial and logistics projects, from site mobilization and foundations to drainage, utility networks and technical handover.</p><div className="hero-actions"><a href="#contact" className="button primary">Request Civil Construction Consultation <ArrowRight size={18} /></a><a href="#services" className="button secondary">Explore Work Packages</a></div></motion.div><div className="hero-metrics"><span><small>Reference scope</small>EUR 1.45M+</span><span><small>BOQ lines</small>297+</span><span><small>Work areas</small>9</span></div></div></section>;
}

function CivilOverview() {
  return <section id="overview" className="section civil-overview"><div className="page-grid"><SectionIntro eyebrow="Integrated Civil Infrastructure" title={<>One delivery layer from <Mark>groundworks to handover.</Mark></>} copy="The service connects construction execution, materials, HSE, documentation and technical coordination instead of treating each package as an isolated contract." /><div className="overview-grid">{[['Site Preparation','Mobilization, temporary facilities, access and safe site operations.',HardHat],['Structural Works','Excavation, foundations, concrete slabs and equipment bases.',Wrench],['Utility Infrastructure','Drainage, water, fire, telecom and electrical networks.',Route],['Testing & Records','Inspection, CCTV testing, documentation and handover control.',FileCheck2]].map(([title, copy, Icon]) => { const Component = Icon as typeof HardHat; return <article key={title as string}><Component size={26} /><h3>{title as string}</h3><p>{copy as string}</p></article>; })}</div></div></section>;
}

function CivilServices() {
  const [selected, setSelected] = useState(constructionServices[0]);
  return <section id="services" className="section civil-services"><div className="page-grid"><SectionIntro eyebrow="Work Packages" title={<>Eight packages covering the project’s <Mark>civil infrastructure.</Mark></>} copy="Select a package to review its typical scope, technical quantities and execution focus." /><div className="civil-service-layout"><div className="civil-service-tabs">{constructionServices.map((service) => { const Icon = service.icon; return <button key={service.index} className={selected.index === service.index ? 'civil-service-tab active' : 'civil-service-tab'} onClick={() => setSelected(service)}><span>{service.index}</span><Icon size={20} /><strong>{service.title}</strong></button>; })}</div><AnimatePresence mode="wait"><motion.article className="civil-service-detail" key={selected.index} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }}><div className="civil-service-image"><img src={selected.visual} alt={selected.title} /></div><div className="civil-service-copy"><p className="eyebrow">{selected.subtitle}</p><h3>{selected.title}</h3><p>{selected.summary}</p><div className="civil-package-metrics"><span><small>Reference package</small>{selected.value}</span><span><small>Project allocation</small>{selected.share}</span></div><div className="civil-detail-columns"><div><h4>Typical scope</h4><ul>{selected.scope.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h4>Execution focus</h4><ul>{selected.metrics.map((item) => <li key={item}>{item}</li>)}</ul></div></div></div></motion.article></AnimatePresence></div></div></section>;
}

function CivilProcess() {
  return <section id="civil-process" className="section civil-process"><div className="page-grid"><SectionIntro eyebrow="Delivery Process" title={<>A controlled route from <Mark>scope to handover.</Mark></>} copy="The process keeps commercial definition, technical planning, execution and project records connected." /><div className="civil-process-grid">{civilProcess.map(([index, title, copy]) => <article key={index}><span>{index}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>;
}

function TechnicalCoordination() {
  return <section className="section technical-section"><div className="page-grid technical-grid"><div className="technical-image"><img src={civilAssets.boq} alt="Civil engineering BOQ and technical planning" loading="lazy" /></div><div><p className="eyebrow">Technical Coordination Layer</p><h2>More than execution: <Mark>scope control.</Mark></h2><p>Complex civil works depend on accurate quantities, clear interfaces and disciplined documentation. Divin Solutions coordinates the commercial and technical layer around execution.</p><ul className="check-list">{['BOQ review and package mapping','Material and free-issue coordination','Civil and MEP interface planning','HSE and compliance documentation','Inspection, testing and close-out records'].map((item) => <li key={item}><BadgeCheck size={18} />{item}</li>)}</ul></div></div></section>;
}

function CaseStudy() {
  return <section id="case-study" className="section case-study-section"><div className="page-grid"><div className="case-study-head"><div><p className="eyebrow">Project Reference</p><h2>Project Terra: infrastructure across <Mark>nine work areas.</Mark></h2></div><p>A reference scope demonstrating integrated coordination across groundworks, drainage, water, structural concrete, utility corridors and technical services.</p></div><div className="case-study-visual"><img src={civilAssets.caseStudy} alt="Large-scale industrial civil infrastructure project" loading="lazy" /><div className="case-study-stats"><span><small>Indicative project value</small>EUR 1.454M</span><span><small>BOQ structure</small>297+ lines</span><span><small>Work packages</small>9 areas</span></div></div><div className="case-study-note"><strong>Reference context</strong><p>Based on an indicative civil infrastructure BOQ. Package values shown on this page illustrate project scale and are not public fixed prices.</p></div></div></section>;
}

function CivilAdvantages() {
  return <section className="section civil-advantages"><div className="page-grid"><SectionIntro eyebrow="Why Divin Solutions" title={<>Technical depth with a <Mark>single commercial interface.</Mark></>} copy="The value is not only in executing each package, but in coordinating them as one coherent infrastructure scope." /><div className="civil-advantage-grid">{civilAdvantages.map(([title, copy, Icon]) => <article key={title}><Icon size={24} /><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>;
}

function Footer({ civil = false }: { civil?: boolean }) {
  return <footer className="site-footer"><span className="footer-brand"><img src={brandLogo} alt="" />Divin Solutions</span><span>{civil ? 'Civil Construction & Infrastructure' : 'Construction Supply & Site Support'}</span></footer>;
}

function HomePage() {
  return <><Nav page="home" /><main><HomeHero /><Problem /><Capabilities /><ScrollSystem /><HomeProcess /><Advantage /><Contact /></main><Footer /></>;
}

function CivilConstructionPage() {
  return <><Nav page="civil" /><main><CivilHero /><CivilOverview /><CivilServices /><CivilProcess /><TechnicalCoordination /><CaseStudy /><CivilAdvantages /><Contact civil /></main><Footer civil /></>;
}

export default function App() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";

  useEffect(() => {
    document.title = path === "/civil-construction"
      ? "Civil Construction | Divin Solutions"
      : "Divin Solutions | Construction Supply & Site Support";
  }, [path]);

  return path === "/civil-construction" ? <CivilConstructionPage /> : <HomePage />;
}
