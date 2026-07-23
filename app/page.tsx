"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import Script from "next/script";
import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";

type Kernel = "build" | "run";
type InquiryType = "project" | "hire" | "consultation" | "partnership" | "other";

type Role = {
  years: string;
  company: string;
  title: string;
  build: string;
  run: string;
};

type Act = {
  numeral: string;
  years: string;
  name: string;
  signal: string;
  roles: Role[];
};

type Project = {
  id: string;
  index: string;
  name: string;
  category: string;
  metric: string;
  build: string;
  run: string;
  challenge: string;
  result: string;
  stack: string[];
  flagship?: boolean;
};

const acts: Act[] = [
  {
    numeral: "I",
    years: "2021—23",
    name: "Wires",
    signal: "Infrastructure taught me that trust is measured in uptime.",
    roles: [
      {
        years: "2021",
        company: "CarrierWing Technologies LLC, New York",
        title: "Product & Systems Engineering",
        build:
          "Configured softswitches, SIP trunks, IVR, dial plans, panels, and APIs across 15+ VoIP deployments.",
        run:
          "Turned customer calling requirements into deployment plans across 15+ live environments.",
      },
      {
        years: "2022—23",
        company: "ANONTEL",
        title: "Founder / VoIP Systems Operator",
        build:
          "Built SIP trunking, IVR, routing, softswitch administration, and CDR analysis for 600+ US and EU users at 99% continuity.",
        run:
          "Owned pricing, acquisition, onboarding, reseller operations, and the work of 3–5 freelancers.",
      },
    ],
  },
  {
    numeral: "II",
    years: "2023—25",
    name: "Automation",
    signal: "Then I started removing the work between the work.",
    roles: [
      {
        years: "2023—25",
        company: "CyberXcalls",
        title: "Systems Integration Associate",
        build:
          "Maintained 40+ live calling environments at 99%+ uptime through API testing, backend configuration, and call-flow validation.",
        run:
          "Owned 80+ activations and escalations, vendor coordination, and approximately 95% SLA adherence.",
      },
      {
        years: "2025",
        company: "METAVEO LABS / Accleratech",
        title: "Product Implementation, Full-Stack & AI Automation",
        build:
          "Shipped 10+ LMS and SaaS modules for 1,000+ learners, plus n8n and AI automations that captured 3,000+ leads and removed about 20 hours of weekly work.",
        run:
          "Translated 10+ client requirement cycles into scopes, proposals, delivery plans, and direct growth experiments.",
      },
    ],
  },
  {
    numeral: "III",
    years: "2026—",
    name: "Command",
    signal: "Now the system includes the team, the market, and the route to launch.",
    roles: [
      {
        years: "2026—",
        company: "BuildX Growth Technologies",
        title: "Founding Director",
        build:
          "Built a Next.js and AI-API MVP with 5+ creator-growth workflow modules.",
        run:
          "Leads product strategy plus GTM and pricing experiments across 2–3 live client workflows.",
      },
      {
        years: "2026—",
        company: "RSN One",
        title: "Technical Project Manager, Founding Team",
        build:
          "Architecting a Next.js, Node, and PostgreSQL commerce platform spanning storefront, vendor and admin consoles, payments, inventory, orders, and cross-border logistics.",
        run:
          "Leads a 12-member India–Nepal–China team, 40+ vendor pipeline, and 5,000+ SKU opening catalog toward a Q4 2026 launch and US$1M first-year GMV target.",
      },
    ],
  },
];

const projects: Project[] = [
  {
    id: "rsn-one",
    index: "01",
    name: "RSN One",
    category: "Cross-border luxury commerce",
    metric: "12 people · 3 countries · 8 weeks",
    build:
      "A multi-surface commerce architecture connecting a storefront, vendor and admin consoles, order and inventory services, local and international payment rails, and cross-border logistics.",
    run:
      "A founding-team operating system for a 12-member tri-country team, 40+ vendor pipeline, 5,000+ SKU opening catalog, and a Q4 2026 market launch.",
    challenge:
      "Move a luxury marketplace for Nepal’s high-net-worth consumers from concept into active development while aligning teams in India, Nepal, and China.",
    result:
      "Concept to active development in 8 weeks, with a US$1M first-year GMV target and the launch program underway.",
    stack: ["Next.js", "Node", "PostgreSQL", "eSewa", "Khalti"],
    flagship: true,
  },
  {
    id: "luxe-market",
    index: "02",
    name: "LuxeMarket",
    category: "Multi-vendor marketplace",
    metric: "Storefront → payouts",
    build:
      "A complete marketplace spine: product discovery, checkout, order lifecycle, vendor payouts, RBAC administration, AI product descriptions, and workflow automation.",
    run:
      "A clear operating surface for buyers, vendors, and administrators across the full order lifecycle.",
    challenge:
      "Unify the buyer, vendor, and administrator journeys without fragmenting inventory, checkout, or settlement logic.",
    result:
      "One coherent system spanning storefront, checkout, orders, vendor payouts, and role-based operations.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Stripe", "Docker"],
  },
  {
    id: "voip-ops",
    index: "03",
    name: "VoIP Ops Dashboard",
    category: "Infrastructure observability",
    metric: "Health · CDR · alerts",
    build:
      "A monitoring interface for trunk health, failed calls, CDR logs, and webhook alerts—the control surface I wanted during 15+ deployments.",
    run:
      "Turns live calling signals into an escalation-ready view for operators and vendors.",
    challenge:
      "Make VoIP failures legible before they compound into customer-facing incidents.",
    result:
      "A single operational view across trunk health, failed calls, CDR evidence, and webhook alerts.",
    stack: ["SIP", "CDR", "Webhooks", "Node", "PostgreSQL"],
  },
  {
    id: "client-ops",
    index: "04",
    name: "ClientOps CRM",
    category: "Delivery operations",
    metric: "Lead → delivery",
    build:
      "A CRM joining lead intake, cost estimation, handoff, and webhook automations in one pipeline.",
    run:
      "Makes ownership and delivery state visible from the first conversation through execution.",
    challenge:
      "Remove the broken handoffs between commercial qualification, estimating, and delivery.",
    result:
      "A connected lead-to-delivery workflow with embedded cost estimation and automated handoffs.",
    stack: ["Next.js", "Node", "SQL", "n8n", "Webhooks"],
  },
  {
    id: "metaveo-automation",
    index: "05",
    name: "METAVEO Automation",
    category: "AI growth operations",
    metric: "3,000+ leads · ~20 hrs/week",
    build:
      "n8n workflows connected to OpenAI and Gemini APIs for lead capture, enrichment, and operational automation.",
    run:
      "Automations deployed inside client workflows, shaped through 10+ requirement-to-delivery cycles.",
    challenge:
      "Scale lead operations without adding another layer of repetitive manual work.",
    result:
      "3,000+ leads captured and approximately 20 hours of weekly manual work automated away.",
    stack: ["n8n", "OpenAI API", "Gemini API", "Webhooks"],
  },
];

const metrics = [
  "5+ YEARS IN THE SYSTEM",
  "600+ VOIP USERS SERVED",
  "99%+ UPTIME",
  "3,000+ LEADS CAPTURED",
  "~20 HRS/WEEK AUTOMATED",
  "12 PEOPLE · 3 COUNTRIES",
  "5,000+ SKU OPENING CATALOG",
];

const buildSkills = [
  "JavaScript / TypeScript",
  "Python / SQL / C++",
  "React / Next.js",
  "Node / Express / FastAPI",
  "PostgreSQL / MongoDB / Prisma",
  "Docker / Linux / Git",
  "n8n / OpenAI / Gemini APIs",
  "VoIP / SIP / IVR / CDR",
];

const runSkills = [
  "Agile / Scrum",
  "Sprint planning",
  "Roadmaps / PRDs / scoping",
  "Vendor & stakeholder management",
  "Hiring / cross-border leadership",
  "GTM & pricing experiments",
  "Client onboarding",
  "SLA & escalation ownership",
];

const engagementPaths: Array<{
  id: Exclude<InquiryType, "partnership" | "other">;
  index: string;
  icon: string;
  title: string;
  audience: string;
  promise: string;
  examples: string[];
}> = [
  {
    id: "project",
    index: "01",
    icon: "🚀",
    title: "Start a Project",
    audience: "For founders, startups, and businesses that need a complete digital product delivered.",
    promise: "I assemble and lead the right team from product definition through architecture, build, launch, and iteration.",
    examples: ["Web & mobile applications", "SaaS, AI & automation", "MVPs & enterprise software"],
  },
  {
    id: "hire",
    index: "02",
    icon: "💼",
    title: "Hire Me",
    audience: "For companies looking for technology, product, or delivery leadership.",
    promise: "I step into the room where product direction, technical reality, and team execution need one accountable owner.",
    examples: ["Product & program leadership", "Engineering management", "Solution architecture & fractional CTO"],
  },
  {
    id: "consultation",
    index: "03",
    icon: "💡",
    title: "Book a Consultation",
    audience: "For businesses that need clarity before committing time, budget, or technical direction.",
    promise: "I turn ambiguous technology and product questions into decisions, plans, estimates, and executable next steps.",
    examples: ["Technology & product strategy", "Architecture & technical due diligence", "AI adoption & business automation"],
  },
];

const inquiryOptions: Array<{
  id: InquiryType;
  icon: string;
  label: string;
  signal: string;
  description: string;
  featured?: boolean;
}> = [
  {
    id: "project",
    icon: "🚀",
    label: "Start a Project",
    signal: "Ship a product",
    description: "Bring the idea or business problem. I bring the team and own the journey from scope to launch.",
    featured: true,
  },
  {
    id: "hire",
    icon: "💼",
    label: "Hire Me",
    signal: "Add a leader",
    description: "Bring me inside the organisation to lead product, technology, people, and delivery with clear ownership.",
    featured: true,
  },
  {
    id: "consultation",
    icon: "💡",
    label: "Book a Consultation",
    signal: "Make the right call",
    description: "Bring the difficult decision. Leave with expert clarity, trade-offs, and an executable next move.",
    featured: true,
  },
  { id: "partnership", icon: "🤝", label: "Partnership", signal: "Build together", description: "Explore a venture, delivery, or strategic alliance." },
  { id: "other", icon: "💬", label: "Other", signal: "Open a channel", description: "Start a conversation that does not fit a box." },
];

function ArrowMark() {
  return <span className="arrow-mark" aria-hidden="true" />;
}

function LensCopy({ build, run }: { build: string; run: string }) {
  return (
    <span className="lens-stack">
      <span className="lens lens-build">{build}</span>
      <span className="lens lens-run">{run}</span>
    </span>
  );
}

export default function Home() {
  const [kernel, setKernel] = useState<Kernel>("build");
  const [inquiryType, setInquiryType] = useState<InquiryType>("project");
  const [bootLine, setBootLine] = useState(0);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const transferTimers = useRef<number[]>([]);
  const viewTransition = useRef<any>(null);
  const projectDialogRef = useRef<HTMLDialogElement>(null);
  const commandDialogRef = useRef<HTMLDialogElement>(null);

  const clearTransferTimers = useCallback(() => {
    transferTimers.current.forEach((timer) => window.clearTimeout(timer));
    transferTimers.current = [];
  }, []);

  const changeKernel = useCallback(
    (target?: Kernel) => {
      const next = target ?? (kernel === "build" ? "run" : "build");
      if (next === kernel && !document.documentElement.hasAttribute("data-transferring")) return;

      clearTransferTimers();
      const root = document.documentElement;
      const commit = () => {
        setKernel(next);
        root.dataset.kernel = next;
        try {
          window.localStorage.setItem("am.kernel.v1", next);
        } catch {
          // Storage is an enhancement; the active document remains authoritative.
        }
        const theme = document.querySelector('meta[name="theme-color"]');
        theme?.setAttribute("content", next === "run" ? "#EDE6DA" : "#0B0D10");
      };
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        commit();
        return;
      }

      const documentWithTransition = document as any;
      if (typeof documentWithTransition.startViewTransition === "function") {
        viewTransition.current?.skipTransition?.();
        viewTransition.current = documentWithTransition.startViewTransition(commit);
        viewTransition.current.finished.finally(() => {
          viewTransition.current = null;
        });
        return;
      }

      root.dataset.transferDirection = next;
      root.dataset.transferring = "true";

      transferTimers.current.push(
        window.setTimeout(() => {
          commit();
        }, 360),
      );
      transferTimers.current.push(
        window.setTimeout(() => {
          delete root.dataset.transferring;
          delete root.dataset.transferDirection;
        }, 920),
      );
    },
    [clearTransferTimers, kernel],
  );

  const skipBoot = useCallback(() => {
    try {
      window.sessionStorage.setItem("am.boot.v1", "seen");
    } catch {
      // A private browsing policy must never trap the visitor in the intro.
    }
    document.documentElement.dataset.boot = "seen";
    setBootLine(4);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const kernelFrame = window.requestAnimationFrame(() => {
      setKernel(root.dataset.kernel === "run" ? "run" : "build");
    });

    if (root.dataset.boot === "pending") {
      const bootTimers = [
        window.setTimeout(() => setBootLine(1), 180),
        window.setTimeout(() => setBootLine(2), 520),
        window.setTimeout(() => setBootLine(3), 890),
        window.setTimeout(skipBoot, 1550),
      ];
      const keySkip = () => skipBoot();
      window.addEventListener("keydown", keySkip, { once: true });
      return () => {
        window.cancelAnimationFrame(kernelFrame);
        bootTimers.forEach((timer) => window.clearTimeout(timer));
        window.removeEventListener("keydown", keySkip);
      };
    }

    return () => window.cancelAnimationFrame(kernelFrame);
  }, [skipBoot]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.matches("input, textarea, select, [contenteditable='true']");
      if (event.repeat || event.isComposing || document.documentElement.dataset.boot === "pending") return;
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        commandDialogRef.current?.showModal();
        return;
      }
      if (!isTyping && !event.metaKey && !event.ctrlKey && !event.altKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        changeKernel();
      }
      if (event.key === "Escape") {
        if (activeProject) projectDialogRef.current?.close();
        if (commandDialogRef.current?.open) commandDialogRef.current.close();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeProject, changeKernel]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onScroll = () => {
      const progress = Math.min(window.scrollY / Math.max(window.innerHeight * 0.8, 1), 1);
      document.documentElement.style.setProperty("--hero-wdth", String(118 - progress * 36));
      document.documentElement.style.setProperty("--hero-wght", String(760 - progress * 240));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let attempts = 0;
    let animationFrame = 0;
    let lenis: any;
    let gsapContext: any;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const initialiseMotion = () => {
      const runtime = window as any;
      if (!runtime.gsap || !runtime.ScrollTrigger) {
        attempts += 1;
        if (attempts < 24) window.setTimeout(initialiseMotion, 250);
        return;
      }

      const { gsap, ScrollTrigger, Flip, DrawSVGPlugin, ScrambleTextPlugin, SplitText } = runtime;
      gsap.registerPlugin(...[ScrollTrigger, Flip, DrawSVGPlugin, ScrambleTextPlugin, SplitText].filter(Boolean));
      if (runtime.Lenis) {
        lenis = new runtime.Lenis({ duration: 1.05, smoothWheel: true });
        const raf = (time: number) => {
          lenis.raf(time);
          animationFrame = requestAnimationFrame(raf);
        };
        animationFrame = requestAnimationFrame(raf);
        lenis.on("scroll", ScrollTrigger.update);
      }

      gsapContext = gsap.context(() => {
        gsap.utils.toArray(".reveal").forEach((element: Element) => {
          gsap.fromTo(
            element,
            { y: 32, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 88%", once: true },
            },
          );
        });
        gsap.fromTo(
          ".route-progress",
          { strokeDasharray: 1000, strokeDashoffset: 1000 },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".career-stage",
              start: "top 70%",
              end: "bottom 55%",
              scrub: 0.9,
            },
          },
        );
      });
    };

    initialiseMotion();
    return () => {
      gsapContext?.revert?.();
      lenis?.destroy?.();
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    if (activeProject) {
      projectDialogRef.current?.showModal();
    }
  }, [activeProject]);

  const timeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }),
    [],
  );
  const [delhiTime, setDelhiTime] = useState("--:--:--");

  useEffect(() => {
    const update = () => setDelhiTime(timeFormatter.format(new Date()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [timeFormatter]);

  const copyText = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      window.location.href = `mailto:${value}`;
    }
  };

  const openProject = (project: Project, element: HTMLElement) => {
    const runtime = window as any;
    const flipState = runtime.Flip?.getState?.(element);
    setActiveProject(project);
    window.requestAnimationFrame(() => {
      const panel = projectDialogRef.current?.querySelector(".work-dialog-panel");
      if (flipState && panel) {
        try {
          runtime.Flip.from(flipState, {
            targets: panel,
            duration: 0.8,
            ease: "power3.inOut",
            absolute: true,
          });
        } catch {
          // The CSS transition remains the static fallback.
        }
      }
    });
  };

  const jumpTo = (id: string) => {
    commandDialogRef.current?.close();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const beginInquiry = (type: InquiryType) => {
    commandDialogRef.current?.close();
    setInquiryType(type);
    window.requestAnimationFrame(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const handleInquirySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const selected = inquiryOptions.find((option) => option.id === inquiryType)?.label ?? "Website inquiry";
    const fieldLabels: Record<string, string> = {
      name: "Name",
      email: "Email",
      company: "Company / organisation",
      phone: "Phone",
      projectType: "Product type",
      projectSummary: "Project summary",
      budget: "Budget range",
      timeline: "Target timeline",
      role: "Role / mandate",
      engagementModel: "Engagement model",
      leadershipNeed: "Leadership need",
      location: "Location / work mode",
      consultationArea: "Consultation area",
      challenge: "Current challenge",
      consultationTimeline: "Preferred timeframe",
      partnershipType: "Partnership type",
      partnershipProposal: "Partnership proposal",
      subject: "Subject",
      message: "Message",
    };
    const body = Array.from(formData.entries())
      .filter(([key, value]) => key !== "inquiryType" && String(value).trim())
      .map(([key, value]) => `${fieldLabels[key] ?? key}: ${String(value).trim()}`)
      .join("\n\n");
    const name = String(formData.get("name") ?? "Website visitor").trim();
    const subject = `${selected} — ${name}`;
    window.location.href = `mailto:ashutoshmittal.official@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Flip.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/DrawSVGPlugin.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrambleTextPlugin.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/lenis@1.3.17/dist/lenis.min.js" strategy="afterInteractive" />

      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <button className="boot" type="button" onClick={skipBoot} aria-label="Skip boot sequence">
        <span className="boot-terminal" aria-live="polite">
          <span className={bootLine >= 1 ? "visible" : ""}>init ashutosh.sys</span>
          <span className={bootLine >= 2 ? "visible" : ""}>loading kernel: BUILD</span>
          <span className={bootLine >= 3 ? "visible" : ""}>operator handshake: READY</span>
          <span className="boot-progress" aria-hidden="true"><i /></span>
        </span>
        <span className="boot-skip">ANY KEY TO SKIP</span>
      </button>

      <div className="power-transfer" aria-hidden="true">
        <span>POWER TRANSFER</span>
        <strong>{kernel === "build" ? "RUN" : "BUILD"}</strong>
      </div>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Ashutosh Mittal, home">
          AM<span>/26</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#contact" onClick={() => setInquiryType("project")}>Start a Project</a>
          <a href="#contact" onClick={() => setInquiryType("hire")}>Hire Me</a>
          <a href="#contact" onClick={() => setInquiryType("consultation")}>Book a Consultation</a>
          <button
            className="command-key"
            type="button"
            onClick={() => commandDialogRef.current?.showModal()}
            aria-label="Open command palette"
          >
            <span aria-hidden="true">⌘K</span>
          </button>
        </nav>
      </header>

      <div className="kernel-control">
        <span className="kernel-caption">OPERATING MODE</span>
        <button
          className="kernel-switch"
          type="button"
          role="switch"
          aria-checked={kernel === "run"}
          aria-label={`Switch to ${kernel === "build" ? "run" : "build"} kernel`}
          onClick={() => changeKernel()}
        >
          <span>BUILD</span>
          <i aria-hidden="true"><b /></i>
          <span>RUN</span>
        </button>
        <span className="kernel-hint">PRESS K</span>
      </div>

      <main id="main" tabIndex={-1}>
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-signal" aria-hidden="true">
            <span>NEW DELHI / REMOTE WORLDWIDE</span>
            <span>28.6139° N / 77.2090° E</span>
          </div>
          <p className="eyebrow reveal">Builder—operator / Founding team, RSN One</p>
          <h1 id="hero-title" className="hero-title" aria-label="Ashutosh Mittal">
            <span>ASHUTOSH</span>
            <span>MITTAL</span>
          </h1>
          <div className="hero-bottom reveal">
            <h2>
              <LensCopy build="I ship systems." run="I run the ship." />
            </h2>
            <p>
              I lead technology and product teams, deliver complete software with my team, and help
              businesses make high-consequence product and technology decisions.
            </p>
            <div className="hero-cta-group" aria-label="Ways to work with Ashutosh">
              <a className="magnetic-cta" href="#contact" onClick={() => setInquiryType("project")}>
                Start a Project <ArrowMark />
              </a>
              <a className="magnetic-cta" href="#contact" onClick={() => setInquiryType("hire")}>
                Hire Me <ArrowMark />
              </a>
              <a className="magnetic-cta" href="#contact" onClick={() => setInquiryType("consultation")}>
                Book a Consultation <ArrowMark />
              </a>
            </div>
          </div>
          <div className="scroll-cue" aria-hidden="true"><span>SCROLL TO TRACE</span><i /></div>
        </section>

        <section className="proof-rail" aria-label="Selected career metrics">
          <ul className="sr-only">
            {metrics.map((metric) => <li key={metric}>{metric}</li>)}
          </ul>
          <div className="proof-track" aria-hidden="true">
            {[...metrics, ...metrics].map((metric, index) => (
              <span key={`${metric}-${index}`}><i />{metric}</span>
            ))}
          </div>
        </section>

        <section className="thesis section-shell" aria-labelledby="thesis-title">
          <div className="section-index reveal">
            <span>01</span><span>THESIS</span>
          </div>
          <div className="thesis-grid">
            <div className="monogram-wrap reveal" aria-hidden="true">
              <svg className="monogram" viewBox="0 0 320 320" role="img" aria-label="AM monogram">
                <path className="mono-frame" d="M18 18H302V302H18Z" />
                <path className="mono-line" d="M57 251 114 70l46 127L207 70l56 181M89 176h142" />
                <circle cx="57" cy="251" r="6" /><circle cx="114" cy="70" r="6" />
                <circle cx="207" cy="70" r="6" /><circle cx="263" cy="251" r="6" />
              </svg>
              <span>ONE CAREER / TWO KERNELS</span>
            </div>
            <div className="manifesto reveal">
              <p id="thesis-title">I learned systems from the wire up.</p>
              <p>I write the code, map the dependencies, and stay when the plan meets reality.</p>
              <p>Now I build the product and run the room required to ship it.</p>
            </div>
          </div>
        </section>

        <section className="trajectory section-shell" id="trajectory" aria-labelledby="trajectory-title">
          <div className="section-index reveal">
            <span>02</span><span>TRAJECTORY / THREE ACTS</span>
          </div>
          <div className="career-stage">
            <div className="career-map reveal" aria-hidden="true">
              <p className="map-mode lens-build">CIRCUIT TRACE / SIGNAL PATH</p>
              <p className="map-mode lens-run">DELHI → KATHMANDU → GUANGZHOU</p>
              <svg viewBox="0 0 1000 310" preserveAspectRatio="none">
                <path className="route-base" d="M20 255 C135 255 120 80 255 80 S405 255 515 255 650 67 755 67 875 220 980 120" />
                <path className="route-progress" d="M20 255 C135 255 120 80 255 80 S405 255 515 255 650 67 755 67 875 220 980 120" />
              </svg>
              <div className="map-labels lens-build">
                <span style={{ left: "2%", top: "82%" }}>BOOT</span>
                <span style={{ left: "47%", top: "82%" }}>AUTOMATE</span>
                <span style={{ right: "1%", top: "35%" }}>ORCHESTRATE</span>
              </div>
              <div className="map-labels lens-run">
                <span style={{ left: "2%", top: "82%" }}>DELHI</span>
                <span style={{ left: "47%", top: "82%" }}>KATHMANDU</span>
                <span style={{ right: "1%", top: "35%" }}>GUANGZHOU</span>
              </div>
            </div>
            <div className="acts">
              {acts.map((act) => (
                <article className="act reveal" key={act.numeral}>
                  <header>
                    <span>ACT {act.numeral}</span>
                    <span>{act.years}</span>
                  </header>
                  <h2 id={act.numeral === "I" ? "trajectory-title" : undefined}>{act.name}</h2>
                  <p className="act-signal">{act.signal}</p>
                  <div className="role-list">
                    {act.roles.map((role) => (
                      <div className="role" key={role.company}>
                        <span>{role.years}</span>
                        <h3>{role.company}</h3>
                        <h4>{role.title}</h4>
                        <p><LensCopy build={role.build} run={role.run} /></p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="selected-work section-shell" id="work" aria-labelledby="work-title">
          <div className="section-index reveal">
            <span>03</span><span>SELECTED WORK</span>
          </div>
          <div className="work-heading reveal">
            <h2 id="work-title">Systems with<br />consequences.</h2>
            <p>Click any entry to open its build and operating record.</p>
          </div>
          <div className="work-grid">
            {projects.map((project) => (
              <button
                type="button"
                className={`work-card reveal${project.flagship ? " flagship" : ""}`}
                key={project.id}
                data-flip-id={`work-${project.id}`}
                onClick={(event) => openProject(project, event.currentTarget)}
                aria-label={`Open ${project.name} case study`}
              >
                <span className="work-no">{project.index}</span>
                <span className="work-category">{project.category}</span>
                <strong>{project.name}</strong>
                <span className="work-summary"><LensCopy build={project.build} run={project.run} /></span>
                <span className="work-metric">{project.metric}</span>
                <span className="work-open">OPEN RECORD <ArrowMark /></span>
              </button>
            ))}
          </div>
        </section>

        <section className="capabilities section-shell" id="work-with-me" aria-labelledby="capabilities-title">
          <div className="section-index reveal">
            <span>04</span><span>WAYS TO WORK TOGETHER</span>
          </div>
          <div className="cap-heading reveal">
            <h2 id="capabilities-title">Three paths.<br />One accountable lead.</h2>
            <p>Choose the shape of support you need. The BUILD and RUN capabilities remain connected in every engagement.</p>
          </div>
          <div className="engagement-grid reveal">
            {engagementPaths.map((path) => (
              <article className="engagement-card" key={path.id}>
                <header><span>{path.index} / ENGAGEMENT</span><i aria-hidden="true">{path.icon}</i></header>
                <h3>{path.title}</h3>
                <p className="engagement-audience">{path.audience}</p>
                <p>{path.promise}</p>
                <ul>{path.examples.map((example) => <li key={example}>{example}</li>)}</ul>
                <button type="button" onClick={() => beginInquiry(path.id)}>{path.title.toUpperCase()} <ArrowMark /></button>
              </article>
            ))}
          </div>
          <div className="cap-subheading reveal"><span>CAPABILITY MATRIX</span><p>Two operating modes. No handoff between strategy and execution.</p></div>
          <div className="cap-matrix reveal">
            <article className="cap-column build-column">
              <header><span>KERNEL / 01</span><strong>BUILD</strong></header>
              <p>Architecture, implementation, integration, reliability.</p>
              <ol>
                {buildSkills.map((skill, index) => <li key={skill}><span>{String(index + 1).padStart(2, "0")}</span>{skill}</li>)}
              </ol>
              <button type="button" onClick={() => changeKernel("build")}>IGNITE BUILD <ArrowMark /></button>
            </article>
            <div className="matrix-core" aria-hidden="true"><span>AM</span><i /></div>
            <article className="cap-column run-column">
              <header><span>KERNEL / 02</span><strong>RUN</strong></header>
              <p>Direction, sequencing, alignment, commercial consequence.</p>
              <ol>
                {runSkills.map((skill, index) => <li key={skill}><span>{String(index + 1).padStart(2, "0")}</span>{skill}</li>)}
              </ol>
              <button type="button" onClick={() => changeKernel("run")}>IGNITE RUN <ArrowMark /></button>
            </article>
          </div>
        </section>

        <section className="ventures" aria-labelledby="ventures-title">
          <div className="ventures-kicker reveal">
            <span id="ventures-title">THREE COMPANIES</span>
            <strong>BEFORE GRADUATION.</strong>
          </div>
          <div className="venture-names reveal">
            <span>ANONTEL <small>2022</small></span><i />
            <span>BUILDX <small>2026</small></span><i />
            <span>RSN ONE <small>2026</small></span>
          </div>
        </section>

        <section className="education section-shell" id="education" aria-labelledby="education-title">
          <div className="section-index reveal">
            <span>05</span><span>EDUCATION / CONCURRENT</span>
          </div>
          <div className="education-heading reveal">
            <h2 id="education-title">Two degrees.<br />Same clock.</h2>
            <p>Formal study running in parallel with company-building and delivery.</p>
          </div>
          <div className="parallel-track reveal">
            <div className="overlap-band"><span>CONCURRENT WINDOW / 2025—27</span></div>
            <article>
              <span>TRACK A / 2023—27</span>
              <h3>VIT Chennai</h3>
              <p>B.Tech · Computer Science & Engineering</p>
              <i><b style={{ width: "78%" }} /></i>
            </article>
            <article>
              <span>TRACK B / 2025—NOW</span>
              <h3>IIT Madras</h3>
              <p>BS · Data Science</p>
              <i><b style={{ width: "38%" }} /></i>
            </article>
          </div>
        </section>

        <section className="contact section-shell" id="contact" aria-labelledby="contact-title">
          <div className="section-index reveal">
            <span>06</span><span>OPEN A CHANNEL</span>
          </div>
          <div className="contact-heading reveal">
            <p>NEW DELHI / REMOTE WORLDWIDE</p>
            <h2 id="contact-title">How can<br />I help you?</h2>
          </div>
          <div className="contact-surface reveal">
            <div className="contact-terminal lens-build">
              <div className="terminal-bar"><span>ashutosh.sys — contact</span><i /></div>
              <p><span>$</span> contact --ashutosh</p>
              <p><small>EMAIL</small> ashutoshmittal.official@gmail.com</p>
              <p><small>PHONE</small> +91 87555 56611</p>
              <p><small>STATUS</small> channel open</p>
            </div>
            <div className="calling-card lens-run">
              <span>PRIVATE CALLING CARD / 2026</span>
              <strong>Ashutosh Mittal</strong>
              <em>Technical operator · New Delhi</em>
              <p>ashutoshmittal.official@gmail.com<br />+91 87555 56611</p>
            </div>
            <div className="contact-actions">
              <button type="button" onClick={() => copyText("email", "ashutoshmittal.official@gmail.com")}>
                {copied === "email" ? "EMAIL COPIED" : "COPY EMAIL"}<ArrowMark />
              </button>
              <a href="mailto:ashutoshmittal.official@gmail.com">WRITE AN EMAIL <ArrowMark /></a>
              <a href="/resume-tech.pdf" download>TECH RESUME <ArrowMark /></a>
              <a href="/resume-management.pdf" download>MANAGEMENT RESUME <ArrowMark /></a>
              <a href="https://www.linkedin.com/in/ashutosh-mittal-736445287" target="_blank" rel="noreferrer">LINKEDIN <ArrowMark /></a>
              <a href="https://github.com/MittalAshutosh" target="_blank" rel="noreferrer">GITHUB <ArrowMark /></a>
            </div>
            <form className="inquiry-form" onSubmit={handleInquirySubmit}>
              <div className="inquiry-form-heading">
                <span>CHOOSE THE OUTCOME / 01</span>
                <p>Not three versions of “contact me.” Choose what you need to be different after we work together.</p>
              </div>
              <div className="inquiry-options" role="group" aria-label="How can I help you?">
                {inquiryOptions.map((option) => (
                  <button
                    type="button"
                    key={option.id}
                    className={option.featured ? "featured" : "compact"}
                    aria-pressed={inquiryType === option.id}
                    onClick={() => setInquiryType(option.id)}
                  >
                    <span className="inquiry-option-icon" aria-hidden="true">{option.icon}</span>
                    <span className="inquiry-option-copy">
                      <strong>{option.signal}</strong>
                      <b>{option.label}</b>
                      <small>{option.description}</small>
                    </span>
                    <ArrowMark />
                  </button>
                ))}
              </div>
              <input type="hidden" name="inquiryType" value={inquiryType} />
              <div className="inquiry-fields" key={inquiryType}>
                <label><span>Your name *</span><input name="name" autoComplete="name" required /></label>
                <label><span>Work email *</span><input name="email" type="email" autoComplete="email" required /></label>
                <label><span>Company / organisation</span><input name="company" autoComplete="organization" /></label>
                <label><span>Phone / WhatsApp</span><input name="phone" type="tel" autoComplete="tel" /></label>

                {inquiryType === "project" && (
                  <>
                    <label><span>What are we building? *</span><select name="projectType" required defaultValue=""><option value="" disabled>Select product type</option><option>Web application</option><option>Mobile application</option><option>SaaS product</option><option>AI solution or automation</option><option>Enterprise or custom software</option><option>MVP / proof of concept</option><option>Other digital product</option></select></label>
                    <label><span>Target timeline</span><select name="timeline" defaultValue=""><option value="">Select timeline</option><option>As soon as possible</option><option>Within 1–2 months</option><option>Within 3–6 months</option><option>6+ months / exploring</option></select></label>
                    <label><span>Indicative budget</span><select name="budget" defaultValue=""><option value="">Select budget range</option><option>Under US$5,000</option><option>US$5,000–15,000</option><option>US$15,000–50,000</option><option>US$50,000+</option><option>Need help estimating</option></select></label>
                    <label className="field-wide"><span>Describe the product, users, and desired outcome *</span><textarea name="projectSummary" rows={6} required /></label>
                  </>
                )}

                {inquiryType === "hire" && (
                  <>
                    <label><span>Role or mandate *</span><input name="role" placeholder="e.g. Technical Project Manager" required /></label>
                    <label><span>Engagement model</span><select name="engagementModel" defaultValue=""><option value="">Select model</option><option>Full-time role</option><option>Contract leadership</option><option>Fractional CTO / advisor</option><option>Consulting engagement</option><option>Open to discussion</option></select></label>
                    <label><span>Location / work mode</span><input name="location" placeholder="Remote, hybrid, city or timezone" /></label>
                    <label className="field-wide"><span>What should I own, lead, or improve? *</span><textarea name="leadershipNeed" rows={6} required /></label>
                  </>
                )}

                {inquiryType === "consultation" && (
                  <>
                    <label><span>Consultation area *</span><select name="consultationArea" required defaultValue=""><option value="" disabled>Select focus area</option><option>Technology strategy</option><option>Software architecture</option><option>Product strategy or planning</option><option>AI adoption or automation</option><option>Digital transformation</option><option>Technical due diligence</option><option>Cost estimation or delivery planning</option><option>Other advisory need</option></select></label>
                    <label><span>Preferred timeframe</span><select name="consultationTimeline" defaultValue=""><option value="">Select timeframe</option><option>This week</option><option>Within 2 weeks</option><option>This month</option><option>Flexible</option></select></label>
                    <label className="field-wide"><span>What decision or challenge are you facing? *</span><textarea name="challenge" rows={6} required /></label>
                  </>
                )}

                {inquiryType === "partnership" && (
                  <>
                    <label><span>Partnership type *</span><input name="partnershipType" placeholder="Venture, delivery, channel, strategic..." required /></label>
                    <label className="field-wide"><span>What could we create or unlock together? *</span><textarea name="partnershipProposal" rows={6} required /></label>
                  </>
                )}

                {inquiryType === "other" && (
                  <>
                    <label><span>Subject *</span><input name="subject" required /></label>
                    <label className="field-wide"><span>Your message *</span><textarea name="message" rows={6} required /></label>
                  </>
                )}
              </div>
              <div className="inquiry-submit">
                <p>This prepares a structured email directly to me—no ticket queue.</p>
                <button type="submit">CONTINUE BY EMAIL <ArrowMark /></button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="status-bar">
        <span>NEW DELHI {delhiTime} IST</span>
        <span><i /> STATUS: OPEN TO CONVERSATIONS</span>
        <span>KERNEL/{kernel.toUpperCase()} · BUILD 2026.07</span>
      </footer>

      <dialog
        ref={projectDialogRef}
        className="work-dialog"
        onClose={() => setActiveProject(null)}
        aria-labelledby="work-dialog-title"
      >
        {activeProject && (
          <div className="work-dialog-panel" data-flip-id={`work-${activeProject.id}`}>
            <header>
              <span>PROJECT RECORD / {activeProject.index}</span>
              <button type="button" onClick={() => projectDialogRef.current?.close()} aria-label="Close case study">CLOSE</button>
            </header>
            <div className="dialog-title">
              <p>{activeProject.category}</p>
              <h2 id="work-dialog-title">{activeProject.name}</h2>
              <strong>{activeProject.metric}</strong>
            </div>
            <div className="dialog-grid">
              <article><span>01 / CHALLENGE</span><p>{activeProject.challenge}</p></article>
              <article><span>02 / ACTIVE LENS</span><p><LensCopy build={activeProject.build} run={activeProject.run} /></p></article>
              <article className="other-lens"><span>03 / OTHER LENS</span><p><LensCopy build={activeProject.run} run={activeProject.build} /></p></article>
              <article><span>04 / RESULT</span><p>{activeProject.result}</p></article>
            </div>
            <ul>{activeProject.stack.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        )}
      </dialog>

      <dialog ref={commandDialogRef} className="command-dialog" aria-labelledby="command-title">
        <div className="command-panel">
          <header>
            <span id="command-title">COMMAND PALETTE</span>
            <button type="button" onClick={() => commandDialogRef.current?.close()} aria-label="Close command palette">ESC</button>
          </header>
          <button type="button" onClick={() => jumpTo("trajectory")}><span>01</span>Trace the trajectory<kbd>G T</kbd></button>
          <button type="button" onClick={() => jumpTo("work")}><span>02</span>Open selected work<kbd>G W</kbd></button>
          <button type="button" onClick={() => { commandDialogRef.current?.close(); changeKernel(); }}><span>03</span>Transfer kernel<kbd>K</kbd></button>
          <button type="button" onClick={() => beginInquiry("project")}><span>04</span>Start a project<kbd>CTA</kbd></button>
          <button type="button" onClick={() => beginInquiry("hire")}><span>05</span>Hire me<kbd>CTA</kbd></button>
          <button type="button" onClick={() => beginInquiry("consultation")}><span>06</span>Book a consultation<kbd>CTA</kbd></button>
          <a href="/resume-tech.pdf" download><span>07</span>Download tech resume<kbd>PDF</kbd></a>
          <a href="/resume-management.pdf" download><span>08</span>Download management resume<kbd>PDF</kbd></a>
        </div>
      </dialog>
    </>
  );
}
