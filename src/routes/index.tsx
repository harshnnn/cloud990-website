import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView, useMotionValue, useSpring, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Brain,
  Cloud,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Globe,
  Layers,
  LineChart,
  Lock,
  Menu,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  TestTube2,
  Workflow,
  X,
  CheckCircle2,
  Hexagon,
  Zap,
  Users,
  HeartPulse,
  Landmark,
  ShoppingBag,
  GraduationCap,
  Factory,
  Truck,
  Building2,
  Terminal,
  Compass,
  PenTool,
  Wrench,
  Radar,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import heroBg from "@/assets/hero-bg.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        property: "og:image",
        content:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  }),
  component: HomePage,
});

/* ---------------- Primitives ---------------- */

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-accent-blue-soft backdrop-blur">
      <span className="size-1.5 rounded-full bg-accent-blue shadow-[0_0_12px_var(--accent-blue)]" />
      {children}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`flex flex-col gap-5 ${align === "center" ? "items-center text-center mx-auto max-w-3xl" : "max-w-3xl"}`}
    >
      {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function GradientBorderCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 transition-all duration-500 hover:border-accent-blue/40 hover:from-white/[0.06] ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -inset-x-10 -top-24 h-40 bg-gradient-to-b from-accent-blue/20 to-transparent blur-3xl" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

/* ---------------- Nav ---------------- */

const navLinks = [
  { href: "#capabilities", label: "Capabilities" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5">
      <div className="relative grid size-8 place-items-center rounded-lg bg-gradient-to-br from-accent-blue to-accent-blue-soft shadow-[0_0_20px_-4px_var(--accent-blue)]">
        <Hexagon className="size-4 text-white" strokeWidth={2.4} />
      </div>
      <span className="text-[15px] font-semibold tracking-tight text-foreground">
        Cloud<span className="text-accent-blue-soft">990</span>
      </span>
    </a>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-white/5 bg-background/70 backdrop-blur-xl" : ""
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <a
            href="#contact"
            className="group inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-navy-deep transition-all hover:bg-accent-blue-soft"
          >
            Start a project
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
        <button
          onClick={() => setOpen((s) => !s)}
          className="grid size-10 place-items-center rounded-md border border-white/10 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-white/5 bg-background/95 backdrop-blur-xl md:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-navy-deep"
            >
              Start a project <ArrowRight className="size-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={heroRef} className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      {/* backdrop */}
      <motion.div style={{ y, opacity }} className="pointer-events-none absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1200}
          className="size-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
          }}
        />
        <div className="absolute left-1/2 top-1/3 size-[520px] -translate-x-1/2 rounded-full bg-accent-blue/20 blur-[120px]" />
      </motion.div>

      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center"
        >
          <SectionEyebrow>AI-First Software Engineering</SectionEyebrow>

          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
            <span className="text-gradient">Engineering Intelligent Software</span>
            <br className="hidden sm:block" />
            <span className="text-foreground/90"> for the Future</span>
          </h1>

          <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Cloud990 partners with ambitious teams to design, build, and scale enterprise
            platforms, cloud-native systems, and applied AI — engineered for reliability,
            security, and long-term velocity.
          </p>

          <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-navy-deep transition-all hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.5)]"
            >
              Start a project
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#capabilities"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-white/[0.08]"
            >
              Explore capabilities
            </a>
          </div>

          <div className="mt-12 grid w-full grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] sm:grid-cols-4">
            {[
              { k: "12+", v: "Years engineering" },
              { k: "60+", v: "Products shipped" },
              { k: "99.98%", v: "Platform uptime" },
              { k: "24/7", v: "Global support" },
            ].map((s) => (
              <div key={s.v} className="bg-background/40 px-4 py-5 backdrop-blur">
                <div className="text-2xl font-semibold text-foreground sm:text-3xl">{s.k}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Client marquee */}
        <div className="mt-20">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Trusted by engineering teams at global companies
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-60">
            {["NORTHWIND", "MERIDIAN", "AXIOM", "HELIOS", "OCTANT", "VANTAGE", "PARALLAX"].map((b) => (
              <span key={b} className="text-sm font-semibold tracking-[0.3em] text-muted-foreground">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- About ---------------- */

function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="container-x grid gap-16 md:grid-cols-[1fr_1.2fr] md:gap-20">
        <Reveal>
          <SectionHeading
            eyebrow="About Cloud990"
            title={<>Software craftsmanship, engineered for the enterprise.</>}
            description="We're a team of senior engineers, cloud architects, and AI researchers building the systems that modern businesses run on — from mission-critical platforms to intelligent internal tools."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Compass,
                title: "Engineering-first",
                body: "Architecture, code quality, and long-term maintainability — not just delivery.",
              },
              {
                icon: Brain,
                title: "AI-native by default",
                body: "Every system we build considers intelligence, automation, and augmentation.",
              },
              {
                icon: ShieldCheck,
                title: "Secure by design",
                body: "Compliance, encryption, and threat modeling built in from day one.",
              },
              {
                icon: Users,
                title: "True partnership",
                body: "Embedded teams that scale with you — measured in outcomes, not hours.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <GradientBorderCard key={title}>
                <Icon className="size-5 text-accent-blue-soft" />
                <h3 className="mt-4 text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </GradientBorderCard>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Core Capabilities ---------------- */

const capabilities = [
  {
    icon: Layers,
    title: "Enterprise Software",
    desc: "Modular platforms, internal tools, and mission-critical systems engineered for scale, reliability, and maintainability.",
    points: ["Domain-driven design", "Event-driven systems", "Legacy modernization"],
  },
  {
    icon: Cloud,
    title: "Cloud Engineering",
    desc: "Cloud-native architectures on AWS, GCP, and Azure — infrastructure-as-code, observability, and cost engineering.",
    points: ["Kubernetes & serverless", "Multi-region deployment", "FinOps optimization"],
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    desc: "Intelligent automation that removes friction across operations, engineering, and revenue workflows.",
    points: ["Process orchestration", "Custom copilots", "Systems integration"],
  },
  {
    icon: Brain,
    title: "Applied AI",
    desc: "Production AI systems — from RAG pipelines and agents to fine-tuned models embedded in real products.",
    points: ["LLM applications", "Retrieval & agents", "MLOps & evaluations"],
  },
];

function Capabilities() {
  return (
    <section id="capabilities" className="relative border-y border-white/5 bg-gradient-to-b from-navy/40 to-background py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="Core Capabilities"
            title={<>What we engineer, end-to-end.</>}
            description="Four disciplines, one integrated team. Every engagement combines platform depth with pragmatic delivery."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <GradientBorderCard className="h-full">
                <div className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <c.icon className="size-5 text-accent-blue-soft" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                <ul className="mt-5 space-y-2 border-t border-white/5 pt-4">
                  {c.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-accent-blue" />
                      {p}
                    </li>
                  ))}
                </ul>
              </GradientBorderCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Why Cloud990 ---------------- */

const whyItems = [
  { icon: Rocket, title: "Velocity without shortcuts", body: "Senior teams, opinionated architecture, and battle-tested patterns compound speed over time." },
  { icon: ShieldCheck, title: "Enterprise-grade rigor", body: "Threat modeling, SOC-friendly practices, and audit-ready delivery are the baseline." },
  { icon: LineChart, title: "Outcomes, measured", body: "We instrument success metrics from day one and report against them, not effort." },
  { icon: Zap, title: "AI where it matters", body: "Applied intelligence in the workflows and features that move the business — not novelty." },
  { icon: Layers, title: "Built to be maintained", body: "Code you can grow with — documented, tested, and structured for the next five years." },
  { icon: Globe, title: "Distributed, senior teams", body: "Timezone-aligned pods across the Americas, EMEA, and APAC — one operating model." },
];

function Why() {
  return (
    <section id="why" className="relative py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="Why Cloud990"
            title={<>The partner enterprises call when it has to work.</>}
            description="We're chosen for the engagements where reliability, security, and long-term ownership actually matter."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {whyItems.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.05}>
              <div className="group relative flex h-full flex-col rounded-2xl border border-white/[0.08] p-6 transition-colors hover:border-white/20">
                <w.icon className="size-5 text-accent-blue-soft" />
                <h3 className="mt-4 text-base font-semibold">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Services (Bento) ---------------- */

function Services() {
  return (
    <section id="services" className="relative border-y border-white/5 bg-gradient-to-b from-background to-navy/30 py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title={<>A studio structured like a product organization.</>}
            description="Composable services across the entire lifecycle — engage us for a single sprint or an embedded multi-year program."
          />
        </Reveal>

        <div className="mt-14 grid auto-rows-[minmax(200px,auto)] grid-cols-1 gap-4 md:grid-cols-6">
          {/* Large - Custom Software */}
          <GradientBorderCard className="md:col-span-4 md:row-span-2">
            <div className="flex h-full flex-col">
              <Code2 className="size-6 text-accent-blue-soft" />
              <h3 className="mt-5 text-2xl font-semibold">Custom Software Development</h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                Web and mobile applications, internal tools, and platforms engineered from
                first principles. Typed end-to-end, tested, observable, and shipped continuously.
              </p>
              <div className="mt-8 grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3">
                {["Product engineering", "Platform APIs", "Design systems", "Mobile apps", "Data pipelines", "Realtime systems"].map((t) => (
                  <div key={t} className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2.5 text-xs text-muted-foreground">{t}</div>
                ))}
              </div>
            </div>
          </GradientBorderCard>

          <GradientBorderCard className="md:col-span-2">
            <Cloud className="size-6 text-accent-blue-soft" />
            <h3 className="mt-5 text-lg font-semibold">Cloud & DevOps</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              IaC, CI/CD, Kubernetes, observability, and platform engineering.
            </p>
          </GradientBorderCard>

          <GradientBorderCard className="md:col-span-2">
            <Brain className="size-6 text-accent-blue-soft" />
            <h3 className="mt-5 text-lg font-semibold">AI & ML Solutions</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              LLM applications, agents, RAG systems, and production MLOps.
            </p>
          </GradientBorderCard>

          <GradientBorderCard className="md:col-span-3">
            <Workflow className="size-6 text-accent-blue-soft" />
            <h3 className="mt-5 text-lg font-semibold">Workflow Automation</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              End-to-end orchestration across systems, teams, and intelligent copilots.
            </p>
          </GradientBorderCard>

          <GradientBorderCard className="md:col-span-3">
            <Sparkles className="size-6 text-accent-blue-soft" />
            <h3 className="mt-5 text-lg font-semibold">Digital Transformation</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Legacy modernization, cloud migration, and organization-wide platform strategy.
            </p>
          </GradientBorderCard>

          <GradientBorderCard className="md:col-span-2">
            <ShieldCheck className="size-6 text-accent-blue-soft" />
            <h3 className="mt-5 text-lg font-semibold">Security Engineering</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Threat modeling, SSDLC, audits, and hardening for regulated environments.
            </p>
          </GradientBorderCard>

          <GradientBorderCard className="md:col-span-2">
            <Wrench className="size-6 text-accent-blue-soft" />
            <h3 className="mt-5 text-lg font-semibold">Managed Support</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              24/7 SRE, incident response, and continuous improvement post-launch.
            </p>
          </GradientBorderCard>

          <GradientBorderCard className="md:col-span-2">
            <PenTool className="size-6 text-accent-blue-soft" />
            <h3 className="mt-5 text-lg font-semibold">Product & UX Design</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Research, systems thinking, and interface design paired with engineering.
            </p>
          </GradientBorderCard>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Tech Stack ---------------- */

const stack = {
  Languages: ["TypeScript", "Python", "Go", "Rust", "Java", "Kotlin", "Swift"],
  Frontend: ["React", "Next.js", "TanStack", "Vue", "Svelte", "React Native", "Tailwind"],
  Backend: ["Node.js", "NestJS", "FastAPI", "Django", "Spring Boot", "gRPC", "GraphQL"],
  Data: ["PostgreSQL", "MongoDB", "Redis", "ClickHouse", "Kafka", "Snowflake", "dbt"],
  Cloud: ["AWS", "GCP", "Azure", "Cloudflare", "Vercel", "Kubernetes", "Terraform"],
  AI: ["OpenAI", "Anthropic", "LangChain", "LlamaIndex", "Pinecone", "PyTorch", "Hugging Face"],
} as const;

function Stack() {
  const cats = Object.keys(stack) as (keyof typeof stack)[];
  const [active, setActive] = useState<keyof typeof stack>(cats[0]);

  return (
    <section id="stack" className="relative py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="Technology Stack"
            title={<>Modern tools, chosen with intent.</>}
            description="We're pragmatic about tooling — we pick the right technology for the problem, not the resume."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-2">
            <div className="flex flex-wrap gap-1 border-b border-white/5 p-2">
              {cats.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    active === c
                      ? "bg-white/[0.06] text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {active === c && (
                    <motion.div
                      layoutId="stack-tab"
                      className="absolute inset-0 rounded-lg bg-accent-blue/10 ring-1 ring-accent-blue/30"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative">{c}</span>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 p-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
              {stack[active].map((tech, i) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="group flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-3 text-sm transition-colors hover:border-accent-blue/40 hover:bg-white/[0.05]"
                >
                  <div className="size-1.5 rounded-full bg-accent-blue" />
                  <span className="truncate">{tech}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Industries ---------------- */

const industries = [
  { icon: HeartPulse, name: "Healthcare & Life Sciences" },
  { icon: Landmark, name: "Financial Services" },
  { icon: ShoppingBag, name: "Retail & E-commerce" },
  { icon: GraduationCap, name: "Education & EdTech" },
  { icon: Factory, name: "Manufacturing & IoT" },
  { icon: Truck, name: "Logistics & Supply Chain" },
  { icon: Building2, name: "Enterprise SaaS" },
  { icon: Radar, name: "Government & Public Sector" },
];

function Industries() {
  return (
    <section id="industries" className="relative border-y border-white/5 bg-navy-deep/40 py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="Industries Served"
            title={<>Deep context across regulated and complex industries.</>}
            description="We bring domain patterns, compliance awareness, and integration expertise wherever we work."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {industries.map((ind, i) => (
            <Reveal key={ind.name} delay={i * 0.04}>
              <div className="group flex h-full flex-col items-start gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all hover:-translate-y-0.5 hover:border-accent-blue/40">
                <div className="grid size-11 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent">
                  <ind.icon className="size-5 text-accent-blue-soft" />
                </div>
                <div className="text-sm font-medium leading-snug">{ind.name}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Process (Timeline) ---------------- */

const process = [
  { icon: Compass, title: "Discovery", desc: "Stakeholder alignment, technical audit, and outcome definition." },
  { icon: PenTool, title: "Design", desc: "Architecture, product design, and system contracts before code." },
  { icon: Code2, title: "Development", desc: "Iterative delivery in senior pods with continuous integration." },
  { icon: TestTube2, title: "Quality Assurance", desc: "Automated testing, security review, and performance validation." },
  { icon: Rocket, title: "Deployment", desc: "Zero-downtime releases with observability and rollout controls." },
  { icon: Wrench, title: "Maintenance", desc: "SRE, iteration, and roadmap partnership as your product evolves." },
];

function Process() {
  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="Development Process"
            title={<>From first conversation to long-term partnership.</>}
            description="A structured, transparent flow — engineered so that decisions, risks, and trade-offs are visible at every stage."
          />
        </Reveal>

        <div className="relative mt-16">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent md:left-1/2" />
          <ol className="space-y-10 md:space-y-16">
            {process.map((p, i) => {
              const right = i % 2 === 1;
              return (
                <li key={p.title} className="relative md:grid md:grid-cols-2 md:gap-16">
                  <Reveal delay={i * 0.05}>
                    <div className={`md:${right ? "col-start-2" : "col-start-1"} pl-12 md:pl-0 ${right ? "md:pl-16" : "md:pr-16 md:text-right"}`}>
                      <div className="text-xs font-mono uppercase tracking-widest text-accent-blue">
                        Step {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3 className="mt-2 text-xl font-semibold">{p.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                    </div>
                  </Reveal>
                  <div className={`absolute left-4 top-1 md:left-1/2 md:top-2 md:-translate-x-1/2`}>
                    <div className="relative grid size-8 place-items-center rounded-full border border-white/10 bg-background">
                      <p.icon className="size-3.5 text-accent-blue-soft" />
                      <div className="absolute inset-0 -z-10 rounded-full bg-accent-blue/30 blur-xl" />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Project Showcase ---------------- */

const projects = [
  {
    tag: "Financial Services",
    title: "Real-time risk platform for a global asset manager",
    desc: "Rebuilt a legacy risk engine into a distributed streaming platform processing 4B events/day with sub-second latency.",
    metrics: [
      { k: "38x", v: "throughput" },
      { k: "62%", v: "cost reduction" },
      { k: "99.99%", v: "availability" },
    ],
    stack: ["Rust", "Kafka", "ClickHouse", "K8s"],
  },
  {
    tag: "Healthcare AI",
    title: "Clinical copilot for a Fortune 500 provider network",
    desc: "AI-assisted documentation and decision support integrated with EHR — cutting clinician admin time in half.",
    metrics: [
      { k: "52%", v: "less admin time" },
      { k: "12,000+", v: "clinicians onboarded" },
      { k: "HIPAA", v: "compliant" },
    ],
    stack: ["Python", "LangChain", "AWS", "React"],
  },
  {
    tag: "Enterprise SaaS",
    title: "Multi-tenant platform re-architecture",
    desc: "Migrated a monolithic SaaS to an event-driven, multi-region architecture with a modern developer experience.",
    metrics: [
      { k: "9x", v: "deploy frequency" },
      { k: "70%", v: "MTTR improvement" },
      { k: "3", v: "regions live" },
    ],
    stack: ["TypeScript", "NestJS", "GCP", "Terraform"],
  },
];

function Work() {
  return (
    <section id="work" className="relative border-y border-white/5 bg-gradient-to-b from-navy/30 to-background py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="Selected Work"
            title={<>Systems trusted by teams that can't afford downtime.</>}
            description="A sample of recent engagements — each engineered for the long run."
          />
        </Reveal>

        <div className="mt-14 space-y-6">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <article className="group grid gap-6 rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all hover:border-accent-blue/40 md:grid-cols-[1.4fr_1fr] md:gap-10 md:p-10">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
                    {p.tag}
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {p.desc}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#contact"
                    className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent-blue-soft transition-colors hover:text-white"
                  >
                    Read case study <ArrowUpRight className="size-3.5" />
                  </a>
                </div>

                <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] md:grid-cols-1">
                  {p.metrics.map((m) => (
                    <div key={m.v} className="bg-background/40 p-5">
                      <div className="text-2xl font-semibold text-foreground sm:text-3xl">{m.k}</div>
                      <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{m.v}</div>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Engineering Excellence + Counters ---------------- */

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { damping: 40, stiffness: 100 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      setDisplay(Math.round(v).toLocaleString());
    });
    return () => unsub();
  }, [spring]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const excellence = [
  { icon: TestTube2, title: "Quality Engineering", desc: "Automated test suites, code review discipline, and continuous integration by default." },
  { icon: Lock, title: "Security & Compliance", desc: "Threat modeling, SAST/DAST, secrets hygiene, and audit-ready delivery." },
  { icon: Server, title: "Reliability & SRE", desc: "SLOs, observability, incident practice, and zero-downtime deployment strategies." },
  { icon: Terminal, title: "Developer Experience", desc: "Golden paths, typed APIs, and documentation that engineers actually read." },
];

function Excellence() {
  return (
    <section id="excellence" className="relative py-24 sm:py-32">
      <div className="container-x">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="Engineering Excellence"
              title={<>Standards you can audit, systems you can trust.</>}
              description="Every system we ship is designed to be secure, tested, observable, and continuously improved."
            />
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div>
                <div className="text-4xl font-semibold text-foreground sm:text-5xl">
                  <Counter to={99} suffix=".98%" />
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">Average uptime</div>
              </div>
              <div>
                <div className="text-4xl font-semibold text-foreground sm:text-5xl">
                  <Counter to={2500} suffix="+" />
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">Deploys per year</div>
              </div>
              <div>
                <div className="text-4xl font-semibold text-foreground sm:text-5xl">
                  <Counter to={94} suffix="%" />
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">Code coverage avg.</div>
              </div>
              <div>
                <div className="text-4xl font-semibold text-foreground sm:text-5xl">
                  <Counter to={12} />
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">Minutes MTTR</div>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {excellence.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.06}>
                <GradientBorderCard className="h-full">
                  <e.icon className="size-5 text-accent-blue-soft" />
                  <h3 className="mt-4 text-base font-semibold">{e.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.desc}</p>
                </GradientBorderCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Core Values ---------------- */

const values = [
  { title: "Craft", body: "Ship code you would want to inherit." },
  { title: "Clarity", body: "Simple systems, plainly explained." },
  { title: "Commitment", body: "Own the outcome, not just the task." },
  { title: "Curiosity", body: "The next problem is always different." },
  { title: "Care", body: "For users, teammates, and the systems we run." },
];

function Values() {
  return (
    <section id="values" className="relative border-y border-white/5 bg-navy-deep/40 py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <SectionHeading eyebrow="Core Values" title={<>How we work, everywhere.</>} />
        </Reveal>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-2 lg:grid-cols-5">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05}>
              <div className="h-full bg-background/40 p-8">
                <div className="text-xs font-mono uppercase tracking-widest text-accent-blue">
                  0{i + 1}
                </div>
                <h3 className="mt-4 text-xl font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Engagement Models ---------------- */

const models = [
  {
    icon: Rocket,
    title: "Project Delivery",
    desc: "Fixed-scope engagements with a defined outcome, timeline, and success metric.",
    features: ["Defined scope & timeline", "Milestone-based delivery", "Fixed or capped budget", "Handover & training"],
  },
  {
    icon: Users,
    title: "Dedicated Team",
    desc: "An embedded, senior pod operating as an extension of your engineering org.",
    features: ["Cross-functional pod", "Timezone-aligned", "Long-term partnership", "Shared roadmap"],
    highlight: true,
  },
  {
    icon: GitBranch,
    title: "Staff Augmentation",
    desc: "Senior individual contributors integrated directly into your existing teams.",
    features: ["Vetted senior talent", "Rapid ramp-up", "Flexible commitments", "Direct reporting"],
  },
];

function Models() {
  return (
    <section id="engagement" className="relative py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="Engagement Models"
            title={<>Structured for the way your team actually works.</>}
            description="Three ways to work together — designed to match the shape of your problem, not the shape of our contract."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {models.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.08}>
              <div
                className={`relative flex h-full flex-col overflow-hidden rounded-2xl border p-8 ${
                  m.highlight
                    ? "border-accent-blue/40 bg-gradient-to-b from-accent-blue/[0.08] to-transparent glow-ring"
                    : "border-white/[0.08] bg-white/[0.02]"
                }`}
              >
                {m.highlight && (
                  <div className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent-blue/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-accent-blue-soft">
                    Most popular
                  </div>
                )}
                <m.icon className="size-6 text-accent-blue-soft" />
                <h3 className="mt-5 text-xl font-semibold">{m.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
                <ul className="mt-6 space-y-3 border-t border-white/5 pt-6">
                  {m.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/90">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent-blue" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`mt-8 inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                    m.highlight
                      ? "bg-white text-navy-deep hover:bg-accent-blue-soft"
                      : "border border-white/15 text-foreground hover:bg-white/5"
                  }`}
                >
                  Discuss this model <ArrowRight className="size-3.5" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact CTA ---------------- */

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-blue/20 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          }}
        />
      </div>

      <div className="container-x">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-8 backdrop-blur sm:p-14">
          <Reveal>
            <div className="flex flex-col items-center gap-6 text-center">
              <SectionEyebrow>Let's build something</SectionEyebrow>
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
                Ready to engineer <span className="text-gradient">what's next</span>?
              </h2>
              <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                Tell us about your systems, your goals, and your constraints. We'll come back
                within one business day with a technical response — not a sales pitch.
              </p>
              <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
                <a
                  href="mailto:hello@cloud990.com"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-navy-deep transition-all hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.5)]"
                >
                  Talk to engineering
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-foreground backdrop-blur hover:bg-white/[0.08]"
                >
                  See our work
                </a>
              </div>

              <div className="mt-10 grid w-full gap-4 border-t border-white/5 pt-8 text-left sm:grid-cols-3">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-4 text-accent-blue-soft" />
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">Email</div>
                    <div className="mt-1 text-sm">hello@cloud990.com</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 size-4 text-accent-blue-soft" />
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">Call</div>
                    <div className="mt-1 text-sm">+1 (415) 555-0990</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 text-accent-blue-soft" />
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">HQ</div>
                    <div className="mt-1 text-sm">San Francisco · Remote-first</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Cloud990 Solutions engineers intelligent software for enterprises that can't afford
              to get it wrong.
            </p>
          </div>
          {[
            { h: "Company", items: ["About", "Careers", "Contact"] },
            { h: "Services", items: ["Enterprise Software", "Cloud", "Applied AI", "Automation"] },
            { h: "Resources", items: ["Case Studies", "Insights", "Security"] },
          ].map((col) => (
            <div key={col.h}>
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {col.h}
              </div>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((i) => (
                  <li key={i}>
                    <a href="#" className="text-sm text-foreground/80 hover:text-foreground">
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Cloud990 Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground">Privacy</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground">Terms</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Page ---------------- */

function HomePage() {
  return (
    <div className="min-h-dvh bg-background text-foreground antialiased">
      <Nav />
      <main>
        <Hero />
        <About />
        <Capabilities />
        <Why />
        <Services />
        <Stack />
        <Industries />
        <Process />
        <Work />
        <Excellence />
        <Values />
        <Models />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
