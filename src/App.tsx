import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  ChevronDown,
  FileWarning,
  Mail,
  Menu,
  Phone,
  Route,
  Send,
  UsersRound,
  X,
  Wrench,
} from "lucide-react";
import {
  advantageItems,
  asset,
  capabilities,
  chapters,
  processSteps,
} from "./data";

const scrubAsset = (path: string) => `${asset(path)}?v=20260602-performance`;
const systemVisuals = [asset("scroll-frames/00-blueprint-start.jpg"), ...capabilities.map((capability) => capability.visual)];
const riskItems = [
  {
    index: "01",
    title: "Missing materials",
    copy: "Critical resources fail to arrive before crews are ready.",
    icon: AlertTriangle,
  },
  {
    index: "02",
    title: "Equipment downtime",
    copy: "Machinery gaps turn scheduled work fronts into idle time.",
    icon: Wrench,
  },
  {
    index: "03",
    title: "Logistics bottlenecks",
    copy: "Transport and supplier handoffs slow the whole chain.",
    icon: Route,
  },
  {
    index: "04",
    title: "Documentation friction",
    copy: "Certificates, HSE records and approvals block movement.",
    icon: FileWarning,
  },
  {
    index: "05",
    title: "Workforce gaps",
    copy: "Missing profiles leave capacity exposed between phases.",
    icon: UsersRound,
  },
];

function seekVideo(video: HTMLVideoElement | null, progress: number) {
  if (!video || !Number.isFinite(video.duration) || video.duration <= 0) {
    video?.load();
    return;
  }

  const clamped = Math.min(0.995, Math.max(0, progress));
  const targetTime = Math.min(video.duration - 0.04, clamped * video.duration);
  if (Math.abs(video.currentTime - targetTime) < 0.025) {
    return;
  }

  try {
    video.pause();
    video.currentTime = targetTime;
  } catch {
    // Some browsers reject seeks before enough metadata is available.
  }
}

function Mark({ children }: { children: ReactNode }) {
  return <span className="copy-mark">{children}</span>;
}

function useSteppedChapter() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    let locked = false;

    const getSectionTop = () => section.getBoundingClientRect().top + window.scrollY;
    const getCurrentIndex = () => {
      const sectionTop = getSectionTop();
      const raw = Math.round((window.scrollY - sectionTop) / window.innerHeight);
      return Math.max(0, Math.min(chapters.length - 1, raw));
    };

    const handleScroll = () => {
      setActive(getCurrentIndex());
    };

    const handleWheel = (event: WheelEvent) => {
      const rect = section.getBoundingClientRect();
      const inside = rect.top <= 4 && rect.bottom >= window.innerHeight - 4;
      if (!inside || locked || Math.abs(event.deltaY) < 8) {
        return;
      }

      const current = getCurrentIndex();
      const direction = event.deltaY > 0 ? 1 : -1;
      const next = Math.max(0, Math.min(chapters.length - 1, current + direction));

      if (next === current) {
        return;
      }

      event.preventDefault();
      locked = true;
      setActive(next);
      window.scrollTo({
        top: getSectionTop() + next * window.innerHeight,
        behavior: "smooth",
      });

      window.setTimeout(() => {
        locked = false;
      }, 680);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    section.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      section.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return { active, sectionRef };
}

function useScrubbedHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const desktopVideoRef = useRef<HTMLVideoElement | null>(null);
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const syncVideos = () => {
    const progress = scrollYProgress.get();
    seekVideo(desktopVideoRef.current, progress);
    seekVideo(mobileVideoRef.current, progress);
  };

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      seekVideo(desktopVideoRef.current, progress);
      seekVideo(mobileVideoRef.current, progress);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  useEffect(() => {
    desktopVideoRef.current?.load();
    mobileVideoRef.current?.load();
    const frame = requestAnimationFrame(syncVideos);
    return () => cancelAnimationFrame(frame);
  }, []);

  return { sectionRef, desktopVideoRef, mobileVideoRef, syncVideos };
}

function Nav() {
  const [open, setOpen] = useState(false);
  const items = ["Solutions", "System", "Process", "Advantage", "Contact"];

  return (
    <header className="nav-shell">
      <a href="#top" className="brand-mark" aria-label="Divin Solutions home">
        <span className="brand-symbol">D</span>
        <span>
          Divin
          <strong>Solutions</strong>
        </span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {items.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`}>
            {item}
          </a>
        ))}
      </nav>
      <a className="nav-cta" href="#contact">
        Request Consultation
      </a>
      <button className="icon-button mobile-menu-button" onClick={() => setOpen(true)} aria-label="Open menu">
        <Menu size={20} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button className="icon-button mobile-close" onClick={() => setOpen(false)} aria-label="Close menu">
              <X size={20} />
            </button>
            {items.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)}>
                {item}
              </a>
            ))}
            <a className="mobile-cta" href="#contact" onClick={() => setOpen(false)}>
              Request Project Supply Consultation
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const { sectionRef, desktopVideoRef, mobileVideoRef, syncVideos } = useScrubbedHero();

  return (
    <section id="top" className="hero-section" ref={sectionRef}>
      <div className="hero-sticky">
        <picture className="hero-poster">
          <source media="(max-width: 760px)" srcSet={scrubAsset("hero-video-01-reversed-1080-poster.jpg")} />
          <img src={scrubAsset("hero-video-01-reversed-1080-poster.jpg")} alt="" />
        </picture>
        <video
          ref={desktopVideoRef}
          className="hero-video desktop-video"
          src={scrubAsset("hero-video-01-reversed-1080.mp4")}
          poster={scrubAsset("hero-video-01-reversed-1080-poster.jpg")}
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={syncVideos}
          onLoadedData={syncVideos}
          onCanPlay={syncVideos}
        />
        <video
          ref={mobileVideoRef}
          className="hero-video mobile-video"
          src={scrubAsset("hero-video-01-reversed-1080.mp4")}
          poster={scrubAsset("hero-video-01-reversed-1080-poster.jpg")}
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={syncVideos}
          onLoadedData={syncVideos}
          onCanPlay={syncVideos}
        />
        <div className="hero-overlay" />
        <div className="hero-content page-grid">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="eyebrow">Construction Supply & Site Support</p>
            <h1>
              Construction supply that keeps <Mark>sites moving</Mark>.
            </h1>
            <p className="hero-lede">
              Divin Solutions coordinates <Mark>materials</Mark>, <Mark>machinery</Mark>, site infrastructure,
              logistics, documentation and operational support through one partner.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="button primary">
                Request Project Supply Consultation
                <ArrowRight size={18} />
              </a>
            </div>
          </motion.div>
          <div className="hero-status" aria-label="Supply system coverage">
            {["Materials", "Equipment", "Logistics", "Support"].map((item, index) => (
              <div key={item} className="status-row">
                <span>0{index + 1}</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </div>
        <a className="scroll-cue" href="#problem" aria-label="Scroll to problem section">
          <ChevronDown size={22} />
        </a>
      </div>
    </section>
  );
}

function SectionIntro({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: ReactNode;
  copy: ReactNode;
}) {
  return (
    <div className="section-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{copy}</p>
    </div>
  );
}

function Problem() {
  return (
    <section id="problem" className="section problem-section">
      <div className="page-grid two-col">
        <SectionIntro
          eyebrow="Procurement Risk"
          title={
            <>
              Most delays start before the <Mark>work front</Mark>.
            </>
          }
          copy={
            <>
              Materials arrive from one supplier, machinery from another, documents from a third and site resources from
              someone else. When one piece fails, the entire <Mark>schedule absorbs the delay</Mark>.
            </>
          }
        />
        <div className="risk-grid">
          {riskItems.map((risk, index) => {
            const Icon = risk.icon;
            return (
              <motion.div
                className="risk-card"
                key={risk.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.05 }}
              >
                <Icon aria-hidden="true" className="risk-icon" strokeWidth={1.2} />
                <span>{risk.index}</span>
                <strong>{risk.title}</strong>
                <p>{risk.copy}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ScrollSystem() {
  const { active, sectionRef } = useSteppedChapter();
  const chapter = chapters[active];
  const progressHeight = `${((active + 1) / chapters.length) * 100}%`;

  return (
    <section id="system" className="scroll-system" ref={sectionRef}>
      <div className="scroll-sticky">
        <AnimatePresence mode="wait">
          <motion.img
            key={chapter.index}
            className="scroll-image"
            src={systemVisuals[active]}
            alt=""
            initial={{ opacity: 0, scale: 1.025 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.42, ease: "easeOut" }}
          />
        </AnimatePresence>
        <div className="scroll-gradient" />
        <div className="chapter-panel">
          <div className="chapter-index">
            <span>PILLAR</span>
            <strong>{chapter.index}</strong>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={chapter.index}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
            >
              <h2>{chapter.title}</h2>
              <p>{chapter.copy}</p>
              <ul>
                {chapter.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="progress-rail" aria-hidden="true">
          <span style={{ height: progressHeight }} />
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  const [selected, setSelected] = useState(capabilities[0]);

  return (
    <section id="solutions" className="section capabilities-section">
      <div className="page-grid">
        <SectionIntro
          eyebrow="Supply Capabilities"
          title={
            <>
              Built around the realities of <Mark>active construction sites</Mark>.
            </>
          }
          copy={
            <>
              Each capability is designed around a practical operational pressure: what needs to be sourced, moved,
              documented, replaced or supported before the project <Mark>loses time</Mark>.
            </>
          }
        />
        <div className="capability-workbench">
          <div className="capability-tabs" role="tablist" aria-label="Divin Solutions capabilities">
            {capabilities.map((capability) => {
              const Icon = capability.icon;
              return (
                <button
                  className={selected.id === capability.id ? "capability-tab active" : "capability-tab"}
                  key={capability.id}
                  onClick={() => setSelected(capability)}
                  type="button"
                >
                  <span>{capability.index}</span>
                  <Icon size={18} />
                  <strong>{capability.title}</strong>
                </button>
              );
            })}
          </div>
          <AnimatePresence mode="wait">
            <motion.article
              className="capability-detail"
              key={selected.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
            >
              <div className="capability-image">
                <img src={selected.detailVisual} alt="" decoding="async" fetchPriority="high" />
              </div>
              <div className="capability-copy">
                <p className="eyebrow">{selected.eyebrow}</p>
                <h3>{selected.title}</h3>
                <p>{selected.copy}</p>
                <div className="pain-outcome">
                  <div>
                    <span>Problem</span>
                    <p>{selected.pain}</p>
                  </div>
                  <div>
                    <span>Outcome</span>
                    <p>{selected.outcome}</p>
                  </div>
                </div>
                <ul>
                  {selected.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="section process-section">
      <div className="page-grid">
        <SectionIntro
          eyebrow="Project Flow"
          title={
            <>
              From requirement to site delivery, with <Mark>fewer moving parts</Mark>.
            </>
          }
          copy={
            <>
              The process gives project teams a <Mark>single coordination layer</Mark> across sourcing, logistics,
              documentation and support.
            </>
          }
        />
        <div className="process-line">
          {processSteps.map(([index, title, copy]) => (
            <div className="process-step" key={index}>
              <span>{index}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Advantage() {
  return (
    <section id="advantage" className="section advantage-section">
      <div className="page-grid two-col">
        <SectionIntro
          eyebrow="Commercial Advantage"
          title={
            <>
              Fewer moving parts. Stronger <Mark>operational control</Mark>.
            </>
          }
          copy={
            <>
              Instead of managing disconnected vendors, teams gain <Mark>one point of coordination</Mark> across the
              resources that keep the site active.
            </>
          }
        />
        <div className="advantage-grid">
          {advantageItems.map(([title, copy, Icon]) => (
            <article className="advantage-card" key={title as string}>
              <Icon size={22} />
              <h3>{title as string}</h3>
              <p>{copy as string}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Sustainability() {
  return (
    <section className="section sustainability-band">
      <div className="page-grid sustainability-inner">
        <div>
          <p className="eyebrow">Future-ready Site Support</p>
          <h2>
            Site support aligned with modern <Mark>environmental expectations</Mark>.
          </h2>
        </div>
        <div className="sustainability-points">
          {["LED site lighting", "Hybrid or low-carbon equipment", "Certified waste collection", "Environmental tracking"].map(
            (point) => (
              <span key={point}>{point}</span>
            )
          )}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const services = useMemo(() => capabilities.map((capability) => capability.title), []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" className="section contact-section">
      <div className="page-grid contact-grid">
        <div>
          <p className="eyebrow">Project Consultation</p>
          <h2>
            Tell us what your project <Mark>needs next</Mark>.
          </h2>
          <p>
            Share the resources, site requirements or operational constraints you need to solve. Divin Solutions will
            review the request and help define the right <Mark>supply path</Mark>.
          </p>
          <div className="contact-methods">
            <span>
              <Mail size={18} />
              commercial@divinesolutions.pt
            </span>
            <span>
              <Phone size={18} />
              WhatsApp / phone to confirm
            </span>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" placeholder="Your name" required />
          </label>
          <label>
            Company
            <input name="company" placeholder="Company / project" required />
          </label>
          <label>
            Email
            <input name="email" type="email" placeholder="name@company.com" required />
          </label>
          <label>
            Required service
            <select name="service" defaultValue="" required>
              <option value="" disabled>
                Select a supply area
              </option>
              {services.map((service) => (
                <option key={service}>{service}</option>
              ))}
              <option>Accommodation / Workforce Housing</option>
            </select>
          </label>
          <label className="full-field">
            Message
            <textarea name="message" placeholder="Tell us about timing, location, materials, equipment or site support needs." />
          </label>
          <button className="button primary full-field" type="submit">
            {sent ? "Request noted" : "Request Project Supply Consultation"}
            <Send size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <span>Divin Solutions</span>
      <span>Construction Supply & Site Support</span>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <ScrollSystem />
        <Capabilities />
        <Process />
        <Advantage />
        <Sustainability />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
