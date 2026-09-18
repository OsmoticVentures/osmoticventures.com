"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { CountUp, Reveal, ScrollProgress } from "./motion";

const EMAIL = "juan@osmoticventures.com";
const LINKEDIN = "https://linkedin.com/in/juanarenasmartin";
const CONTAINER = "mx-auto w-full max-w-[1200px] px-5 md:px-8";

export default function Page() {
  return (
    <>
      <a
        href="#request-a-call"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-cream focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to the form
      </a>
      <ScrollProgress />
      <main className="bg-ink text-cream font-body antialiased overflow-x-hidden">
        <Hero />
        <TrackRecord />
        <WhatIBuild />
        <RequestACall />
      </main>
      <SiteFooter />
      <MobileBar />
    </>
  );
}

/* ---------- shared ---------- */

function CtaButton({
  href = "#request-a-call",
  onPaper = false,
  breathe = false,
  full = false,
  id,
}: {
  href?: string;
  onPaper?: boolean;
  breathe?: boolean;
  full?: boolean;
  id?: string;
}) {
  return (
    <a
      id={id}
      href={href}
      className={[
        "inline-flex h-14 items-center justify-center rounded-lg bg-gold px-6 font-medium text-ink text-base",
        "transition-colors duration-150 hover:bg-[#D8B45C] active:translate-y-px",
        "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-gold",
        onPaper ? "outline outline-1 outline-forest" : "",
        breathe ? "cta-breathe" : "",
        full ? "w-full" : "w-full sm:w-auto",
      ].join(" ")}
    >
      Request a call
    </a>
  );
}

function SectionTitle({
  id,
  title,
  sub,
  onPaper = false,
  className = "",
}: {
  id: string;
  title: string;
  sub: string;
  onPaper?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2
        id={id}
        className={`font-display font-semibold text-[clamp(2rem,4vw,3rem)] leading-[1.1] max-w-[24ch] ${onPaper ? "text-ink" : "text-cream"}`}
      >
        {title}
      </h2>
      <p className={`mt-4 text-base ${onPaper ? "text-forest" : "text-sage"}`}>{sub}</p>
    </div>
  );
}

/* ---------- 1. Hero ---------- */

function subscribeMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function wantsVideo() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  return !reduced && !nav.connection?.saveData;
}

function HeroVideo() {
  const mount = useSyncExternalStore(subscribeMotion, wantsVideo, () => false);
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const kick = () => v.play().catch(() => {});
    kick();
    v.addEventListener("canplay", kick);
    return () => v.removeEventListener("canplay", kick);
  }, [mount]);
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <Image
        src="/img/hero-poster.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "center 30%" }}
      />
      {mount && (
        <video
          ref={ref}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 30%" }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/img/hero-poster.jpg"
        >
          <source src="/video/portfolio-hero.webm" type="video/webm" />
          <source src="/video/portfolio-hero.mp4" type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(19,32,26,.94)_0%,rgba(19,32,26,.92)_38%,rgba(19,32,26,.62)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,rgba(19,32,26,0),rgba(19,32,26,.9))]" />
    </div>
  );
}

function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate z-20 flex min-h-[88svh] flex-col lg:min-h-[100svh]"
    >
      <HeroVideo />

      <header className={`${CONTAINER} flex h-16 items-center justify-between lg:h-[72px]`}>
        <a href="#" className="font-display text-xl text-cream">
          Osmotic Ventures
        </a>
        <a href="#request-a-call" className="text-[15px] text-cream/90 hover:text-cream hover:underline underline-offset-4">
          Request a call
        </a>
      </header>

      <div className={`${CONTAINER} flex flex-1 items-end pb-11 pt-10 md:pt-14`}>
        <div className="grid w-full gap-10 md:grid-cols-12 md:gap-6 lg:gap-8">
          <div className="md:col-span-7 flex flex-col justify-end">
            <p className="rise text-[15px] text-sage">Juan Arenas, owner and operator, Los Angeles</p>
            <h1
              id="hero-title"
              style={{ "--d": "60ms" } as React.CSSProperties}
              className="rise mt-3 font-display font-semibold text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.015em] max-w-[14ch]"
            >
              Go-to-market for scientific companies
            </h1>
            <p style={{ "--d": "120ms" } as React.CSSProperties} className="rise mt-4 text-lg text-sage">
              One client at a time.
            </p>
            <p
              style={{ "--d": "180ms" } as React.CSSProperties}
              className="rise mt-6 max-w-[44ch] text-[17px] leading-[1.55] xl:text-lg"
            >
              I build the commercial plan, the investor materials, the marketing, and the sales motion for
              biotech, pharma, diagnostics, and science-first brands. Then I run it with you until the first
              customers are closed.
            </p>
            <div
              style={{ "--d": "240ms" } as React.CSSProperties}
              className="rise mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6"
            >
              <CtaButton id="hero-cta" breathe />
              <a
                href="#track-record"
                className="text-base text-cream underline underline-offset-4 decoration-cream/50 hover:decoration-cream"
              >
                See the work
              </a>
            </div>
            <p style={{ "--d": "300ms" } as React.CSSProperties} className="rise mt-3 max-w-[44ch] text-base text-sage">
              I reply within 24 hours. If I am mid-engagement, I will say so.
            </p>
            <p
              style={{ "--d": "360ms" } as React.CSSProperties}
              className="rise mt-12 max-w-[52ch] text-[17px] leading-[1.55] text-cream/90"
            >
              At Metaba Health, a 0-to-1 diagnostics startup, I cold-called Los Angeles clinics with zero brand
              recognition and closed the first paying clients on a pilot.
            </p>
          </div>

          <div className="md:col-span-4 md:col-start-9 flex items-center md:justify-end">
            <div style={{ "--d": "90ms" } as React.CSSProperties} className="rise w-[64%] md:w-full">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-forest bg-deep">
                <Image
                  src="/img/juan-usc.png"
                  alt="Juan Arenas"
                  fill
                  priority
                  sizes="(min-width: 768px) 32vw, 64vw"
                  className="object-cover"
                  style={{ objectPosition: "center 28%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 2. Track record (paper) ---------- */

const CASES = [
  {
    company: "Metaba Health",
    role: "Founding Go-To-Market Operator, 1 year 2 months",
    n: 50,
    suffix: "+",
    label: "high-intent leads engaged",
    body: "A 0-to-1 longevity-metabolomics diagnostics startup. I built the investor deck, the investor website, and the full commercial plan, then cold-called dermatologists and clinic decision-makers across Los Angeles and closed the first paying clients on a pilot program.",
    video: "/video/metaba.mp4",
    poster: "/img/poster-metaba.jpg",
    aria: "Project video, Metaba",
  },
  {
    company: "Biotech Connection LA",
    role: "Business Developer, 1 year 8 months",
    n: 200,
    suffix: "+",
    label: "biotech and pharma accounts owned",
    body: "Cold contact to close, on a CRM I built, with 20+ KOLs. I brought Amgen and USC Keck onto the sponsor list, grew annual sponsor revenue 30%, and closed deals up to $20k for a non-profit.",
    video: "/video/bcla.mp4",
    poster: "/img/poster-bcla.jpg",
    aria: "Project video, Biotech Connection LA",
  },
  {
    company: "USC Center for Personalized Brain Health",
    role: "Marketing and Social Strategy, 1 year 1 month",
    n: 93000,
    suffix: "",
    label: "newsletter subscribers",
    body: "An Alzheimer's lab and prevention clinic. I ran YouTube, LinkedIn, Facebook, Instagram, email, and a long-form docu-series, all HIPAA-compliant, tripled the total audience in 8 months, and launched a Spanish-language newsletter that added 50% more recipients.",
    video: "/video/cpbh.mp4",
    poster: "/img/poster-cpbh.jpg",
    aria: "Project video, USC Center for Personalized Brain Health",
  },
];

const LOGOS = [
  { src: "/img/logos/metaba-mark.png", alt: "Metaba", w: 149, h: 30 },
  { src: "/img/logos/usc-brain.png", alt: "USC Center for Personalized Brain Health", w: 150, h: 40 },
  { src: "/img/logos/biotech-connection.png", alt: "Biotech Connection LA", w: 150, h: 40 },
  { src: "/img/logos/superbiome.png", alt: "Superbiome", w: 130, h: 40 },
];

function VideoTile({ src, poster, aria }: { src: string; poster: string; aria: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-deep">
      {on ? (
        <video className="h-full w-full object-cover" src={src} poster={poster} controls autoPlay playsInline preload="none" aria-label={aria} />
      ) : (
        <button
          type="button"
          onClick={() => setOn(true)}
          aria-label={aria}
          className="group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-cream"
        >
          <Image src={poster} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
          <span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-cream/85 transition-colors duration-150 group-hover:bg-cream">
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path d="M3 1.5v11l9-5.5z" fill="#13201A" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}

function TrackRecord() {
  return (
    <section
      id="track-record"
      aria-labelledby="track-record-title"
      className="relative z-10 bg-paper text-ink py-16 md:py-24 lg:py-32 xl:py-36"
    >
      <div className={CONTAINER}>
        <div className="grid gap-8 md:grid-cols-12 md:items-center">
          <Reveal className="md:col-span-4">
            <SectionTitle id="track-record-title" title="Track record" sub="Four companies, numbers on record" onPaper />
          </Reveal>
          <Reveal delay={60} className="md:col-span-8">
            <ul className="grid grid-cols-2 items-center gap-6 md:flex md:flex-nowrap md:justify-end md:gap-8 xl:gap-10">
              {LOGOS.map((l) => (
                <li key={l.alt} className="flex items-center">
                  <Image
                    src={l.src}
                    alt={l.alt}
                    width={l.w}
                    height={l.h}
                    className="h-8 w-auto opacity-75 grayscale mix-blend-multiply xl:h-9"
                  />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3 xl:gap-8">
          {CASES.map((c, i) => (
            <Reveal key={c.company} delay={i * 60}>
              <article className="flex h-full flex-col rounded-lg border border-ink/10 p-5 md:p-6 lg:p-7 xl:p-8">
                <VideoTile src={c.video} poster={c.poster} aria={c.aria} />
                <h3 className="mt-4 font-display font-semibold text-[22px] leading-tight text-ink">{c.company}</h3>
                <p className="mt-1 text-[15px] text-forest">{c.role}</p>
                <p className="mt-5 font-display font-semibold text-[clamp(2.25rem,4vw,3.5rem)] leading-none text-gold tabular-nums">
                  <CountUp to={c.n} />
                  {c.suffix && <span>{c.suffix}</span>}
                </p>
                <p className="mt-1 text-[15px] text-forest">{c.label}</p>
                <p className="mt-4 text-base leading-[1.55] text-ink">{c.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-9">
            <figure className="flex gap-4 sm:gap-6">
              <Image
                src="/img/phil-sell-metaba.png"
                alt="Philip Sell"
                width={56}
                height={56}
                className="h-12 w-12 shrink-0 rounded-full object-cover sm:h-14 sm:w-14"
              />
              <div>
                <span aria-hidden="true" className="block h-6 font-display text-5xl leading-none text-forest">
                  &ldquo;
                </span>
                <blockquote className="mt-2 max-w-[52ch] font-display text-[clamp(1.375rem,2.4vw,1.625rem)] leading-[1.35] text-ink">
                  What really sets Juan apart is that once he understands the high-level goals and objectives, he
                  immediately breaks them down into a concrete list of tasks and action items to begin moving the
                  project forward. He&apos;s great at bridging the gap between idea and execution.
                </blockquote>
                <figcaption className="mt-4 text-[15px] text-ink">
                  Philip Sell, CEO and Co-founder, Metaba.{" "}
                  <a
                    href="https://linkedin.com/in/philipjsell"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-forest"
                  >
                    LinkedIn
                  </a>
                </figcaption>
              </div>
            </figure>
          </Reveal>
          <Reveal delay={60} className="md:col-span-3 md:justify-self-end">
            <CtaButton onPaper />
            <p className="mt-3 text-[15px] text-forest">I reply within 24 hours.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- 3. What I build ---------- */

function CapIcon({ kind }: { kind: "map" | "doc" | "phone" | "arc" | "nodes" }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (kind) {
    case "map":
      return (
        <svg {...common}>
          <path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" />
          <path d="M9 4v14M15 6v14" />
        </svg>
      );
    case "doc":
      return (
        <svg {...common}>
          <path d="M7 3h7l5 5v13H7z" />
          <path d="M14 3v5h5M10 13h6M10 17h6" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
        </svg>
      );
    case "arc":
      return (
        <svg {...common}>
          <circle cx="12" cy="13" r="2" />
          <path d="M8.5 9.5a5 5 0 0 0 0 7M15.5 9.5a5 5 0 0 1 0 7M6 7a9 9 0 0 0 0 12M18 7a9 9 0 0 1 0 12" />
        </svg>
      );
    case "nodes":
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="2.5" />
          <circle cx="18" cy="8" r="2.5" />
          <circle cx="12" cy="18" r="2.5" />
          <path d="M8.3 7l7.4 0.8M7.2 8.2l3.6 7.6M16.6 10.2l-3.4 5.8" />
        </svg>
      );
  }
}

const CAPS: { icon: "map" | "doc" | "phone" | "arc" | "nodes"; title: string; desc: string; proof: string; span: string }[] = [
  {
    icon: "map",
    title: "Go-to-market plan",
    desc: "Who buys, why now, what it costs to reach them, and what I do first. Strip away the noise to the few channels that convert.",
    proof: "Metaba: AI-driven Meta Ads leads, custom conversion software, route-planned clinic visits.",
    span: "lg:col-span-4",
  },
  {
    icon: "doc",
    title: "Investor materials",
    desc: "The deck and the investor site, written from your data and your science, in plain language an investor reads to the end.",
    proof: "Metaba: new investor deck and investor website, metabahealth.us.",
    span: "lg:col-span-4",
  },
  {
    icon: "phone",
    title: "Sales motion, cold to close",
    desc: "Cold outreach, route-planned visits, a CRM that fits the deal, and the first closes done by me, not handed off.",
    proof: "Biotech Connection LA: Amgen and USC Keck onto the sponsor list, deals up to $20k, 100-attendee events filled from cold outreach.",
    span: "lg:col-span-4",
  },
  {
    icon: "arc",
    title: "Marketing and community, HIPAA-compliant",
    desc: "Paid social, email, content, and a community, run compliant when the audience is patients or clinicians. Bilingual, English and Spanish, when the audience is.",
    proof: "USC Center for Personalized Brain Health: five channels and a docu-series, a 1,000+ patient and caregiver community with zero HIPAA gaps, a Spanish-language newsletter that added 50% more recipients.",
    span: "lg:col-span-7",
  },
  {
    icon: "nodes",
    title: "AI and automation",
    desc: "Lead handling, follow-up, and admin built to run without you, with AI where it earns its place.",
    proof: "Superbiome: 40,000+ creator accounts reviewed to engage 5,000+, built with n8n, Supabase, and Claude Code, 10+ hours a week of admin gone, 100% follow-up coverage.",
    span: "lg:col-span-5",
  },
];

function WhatIBuild() {
  return (
    <section
      id="what-i-build"
      aria-labelledby="what-i-build-title"
      className="bg-ink py-16 md:py-24 lg:py-32 xl:py-36"
    >
      <div className={CONTAINER}>
        <Reveal>
          <SectionTitle id="what-i-build-title" title="What I build" sub="Strategy through to closed deals" />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-12 xl:gap-8">
          {CAPS.map((c, i) => (
            <Reveal key={c.title} delay={i * 70} className={c.span}>
              <article className="group flex h-full flex-col rounded-xl bg-forest p-5 md:p-6 lg:p-7 xl:p-8">
                <span className="text-sage transition-colors duration-150 group-hover:text-cream">
                  <CapIcon kind={c.icon} />
                </span>
                <h3 className="mt-4 font-display font-semibold text-[22px] leading-tight text-cream">{c.title}</h3>
                <p className="mt-2 text-base leading-[1.55] text-sage">{c.desc}</p>
                <p className="mt-3 text-[15px] leading-[1.5] text-cream/85">{c.proof}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <p className="max-w-[80ch] border-y border-forest py-4 text-base leading-[1.6] text-sage">
            For work outside my own hands I bring in specialists per engagement: AI and ML development, SEO and GEO
            (Google and AI-search positioning), Meta ads, TikTok ads, commission-only UGC creators, a Los Angeles
            video production and editing team, and investor, angel, and VC introductions in biotech and pharma.
          </p>
        </Reveal>

        <Reveal delay={60} className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <CtaButton />
          <p className="text-[15px] text-sage">I reply within 24 hours.</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 4. Request a call ---------- */

const STEPS = [
  { label: "Request a call", text: "Fill in the form. I read it myself and reply within 24 hours." },
  {
    label: "Scope conversation",
    text: "A call on what you are building, what you need, and whether I am the right fit. Visible goals, written down.",
  },
  { label: "Written agreement", text: "A consulting agreement under Osmotic Ventures LLC, with a mutual NDA when you want one." },
  {
    label: "The work",
    text: "I join as your go-to-market operator, on your goals, for as long as the scope says. One client, my full focus.",
  },
];

type Errors = Partial<Record<"name" | "email" | "company" | "message", string>>;

function validate(f: HTMLFormElement): Errors {
  const v = (n: string) => (f.elements.namedItem(n) as HTMLInputElement | HTMLTextAreaElement | null)?.value.trim() ?? "";
  const e: Errors = {};
  if (!v("name")) e.name = "Add your name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) e.email = "Use a valid email address";
  if (!v("company")) e.company = "Add your company";
  if (!v("message")) e.message = "A sentence or two is enough";
  return e;
}

function CallForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [t] = useState(() => Date.now());
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [sentTo, setSentTo] = useState("");
  const [mailto, setMailto] = useState(`mailto:${EMAIL}`);

  useEffect(() => {
    if (state === "sent") headingRef.current?.focus();
  }, [state]);

  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const f = formRef.current;
    if (!f) return;
    const all = validate(f);
    const k = e.target.name as keyof Errors;
    setErrors((prev) => ({ ...prev, [k]: all[k] }));
  };

  const onFocus = (e: React.FocusEvent<HTMLElement>) => {
    if (window.innerWidth < 768) e.target.scrollIntoView({ block: "center", behavior: "smooth" });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const errs = validate(f);
    setErrors(errs);
    const first = (Object.keys(errs) as (keyof Errors)[])[0];
    if (first) {
      (f.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    const data = Object.fromEntries(new FormData(f).entries()) as Record<string, string>;
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, t }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; mailto?: string };
      if (res.ok && json.ok) {
        setSentTo(data.email);
        setState("sent");
      } else {
        if (json.mailto) setMailto(json.mailto);
        setState("failed");
      }
    } catch {
      setState("failed");
    }
  };

  const field = (name: keyof Errors, label: string, extra: Record<string, string> = {}) => {
    const err = errors[name];
    const cls = [
      "w-full rounded-xl bg-ink px-3.5 py-3 text-base text-cream h-[52px] md:h-14",
      "border",
      err ? "border-2 border-cream" : "border-sage/40",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream",
    ].join(" ");
    return (
      <div>
        <label htmlFor={`f-${name}`} className="mb-2 block text-sm text-cream">
          {label}
        </label>
        {name === "message" ? (
          <textarea
            id={`f-${name}`}
            name={name}
            rows={4}
            maxLength={1000}
            required
            onBlur={onBlur}
            onFocus={onFocus}
            aria-invalid={!!err}
            aria-describedby={err ? `f-${name}-error` : undefined}
            className={`${cls} h-auto resize-y`}
          />
        ) : (
          <input
            id={`f-${name}`}
            name={name}
            required
            onBlur={onBlur}
            onFocus={onFocus}
            aria-invalid={!!err}
            aria-describedby={err ? `f-${name}-error` : undefined}
            className={cls}
            {...extra}
          />
        )}
        {err && (
          <p id={`f-${name}-error`} className="mt-2 text-sm text-cream">
            {err}
          </p>
        )}
      </div>
    );
  };

  if (state === "sent") {
    return (
      <div className="rounded-xl bg-forest p-7 xl:p-8 min-h-[520px]" aria-live="polite">
        <h3 ref={headingRef} tabIndex={-1} className="font-display text-[26px] text-cream outline-none">
          Received.
        </h3>
        <p className="mt-4 text-base leading-[1.55] text-cream">
          I read every request myself and reply within 24 hours to {sentTo}. I take one client at a time, so I
          will tell you plainly whether I have room and whether I am the right fit.
        </p>
        <a
          href={LINKEDIN}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-base text-sage underline underline-offset-4 hover:text-cream"
        >
          LinkedIn
        </a>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      id="call-form"
      noValidate
      onSubmit={onSubmit}
      aria-busy={state === "sending"}
      className="rounded-xl bg-forest p-6 md:p-7 xl:p-8"
    >
      <div className="flex flex-col gap-4">
        {field("name", "Name", { type: "text", autoComplete: "name", maxLength: "120" })}
        {field("email", "Work email", { type: "email", inputMode: "email", autoComplete: "email" })}
        {field("company", "Company", { type: "text", autoComplete: "organization", maxLength: "160" })}
        {field("message", "What you are building or need")}
      </div>
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="f-website">Website</label>
        <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <button
        type="submit"
        disabled={state === "sending"}
        className={[
          "mt-6 h-14 w-full rounded-lg bg-gold text-base font-medium text-ink",
          "transition-colors duration-150 hover:bg-[#D8B45C] active:translate-y-px disabled:pointer-events-none",
          "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-gold",
          state === "sending" ? "" : "cta-breathe",
        ].join(" ")}
      >
        {state === "sending" ? "Sending" : "Request a call"}
      </button>
      <p className="mt-4 text-[15px] text-sage">
        I reply within 24 hours. Or email{" "}
        <a href={`mailto:${EMAIL}`} className="underline underline-offset-4 hover:text-cream">
          {EMAIL}
        </a>
        .
      </p>
      {state === "failed" && (
        <p className="mt-3 text-[15px] text-cream" aria-live="polite">
          That did not send. Email me at{" "}
          <a href={mailto} className="underline underline-offset-4">
            {EMAIL}
          </a>{" "}
          and I will reply within 24 hours.
        </p>
      )}
    </form>
  );
}

function RequestACall() {
  return (
    <section
      id="request-a-call"
      aria-labelledby="request-a-call-title"
      className="bg-ink py-16 md:py-24 lg:py-32 xl:py-36"
    >
      <div className={CONTAINER}>
        <Reveal className="md:max-w-[60ch]">
          <SectionTitle id="request-a-call-title" title="Request a call" sub="Reply within 24 hours" />
          <p className="mt-6 text-[17px] leading-[1.55] xl:text-lg">
            I take one client at a time, and whoever I work with gets all of it. The first step is a call to see
            whether the fit is right on both sides.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <ol className="flex flex-col gap-6">
              {STEPS.map((s, i) => (
                <Reveal key={s.label} delay={i * 60}>
                  <li className="flex gap-6">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest font-display font-semibold text-base text-cream">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-display font-semibold text-xl text-cream">{s.label}</h3>
                      <p className="mt-1 text-base leading-[1.55] text-sage">{s.text}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={240} className="mt-12 max-w-[44ch] text-[15px] leading-[1.6] text-sage">
              <p>
                Osmotic Ventures LLC is a California limited liability company, active with the California Secretary
                of State, based in Los Angeles. I sign NDAs, consulting agreements, and invoices as the LLC. Business
                banking and invoicing are in place.
              </p>
              <p className="mt-3">
                Juan Arenas Martin, owner and operator. B.S. Pharmacology and Drug Development, USC Alfred E. Mann
                School of Pharmaceutical Sciences, magna cum laude. Bilingual, English and Spanish. Founder twice:
                Your Aura Fragrance and Osmotic Ventures.
              </p>
              <p className="mt-3">
                <a href={`mailto:${EMAIL}`} className="hover:text-cream hover:underline underline-offset-4">
                  {EMAIL}
                </a>{" "}
                /{" "}
                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cream hover:underline underline-offset-4"
                >
                  LinkedIn
                </a>
              </p>
            </Reveal>
          </div>
          <Reveal delay={60} className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
            <CallForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-forest bg-deep pb-10 pt-16 text-sm text-sage md:pb-12 md:pt-24">
      <div className={`${CONTAINER} grid gap-6 md:grid-cols-2`}>
        <div className="flex flex-col gap-1">
          <p>Osmotic Ventures LLC, a California limited liability company. Los Angeles.</p>
          <p>Owned and run by me, Juan Arenas Martin.</p>
        </div>
        <div className="flex flex-col gap-1 md:items-end">
          <a href={`mailto:${EMAIL}`} className="hover:text-cream hover:underline underline-offset-4">
            {EMAIL}
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cream hover:underline underline-offset-4"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ---------- sticky mobile bar ---------- */

function MobileBar() {
  const [heroGone, setHeroGone] = useState(false);
  const [formNear, setFormNear] = useState(false);
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    const cta = document.getElementById("hero-cta");
    const form = document.getElementById("request-a-call");
    if (!cta || !form) return;
    const a = new IntersectionObserver(([e]) => setHeroGone(!e.isIntersecting && e.boundingClientRect.top < 0));
    const b = new IntersectionObserver(([e]) => setFormNear(e.isIntersecting), { threshold: 0.05 });
    a.observe(cta);
    b.observe(form);
    const onIn = (e: FocusEvent) => setTyping(form.contains(e.target as Node));
    const onOut = () => setTyping(false);
    document.addEventListener("focusin", onIn);
    document.addEventListener("focusout", onOut);
    return () => {
      a.disconnect();
      b.disconnect();
      document.removeEventListener("focusin", onIn);
      document.removeEventListener("focusout", onOut);
    };
  }, []);
  const show = heroGone && !formNear && !typing;
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-sage bg-ink/95 px-5 pt-3 md:hidden transition-transform duration-300 ${show ? "translate-y-0" : "translate-y-full"}`}
      style={{ paddingBottom: "calc(12px + env(safe-area-inset-bottom))" }}
      aria-hidden={!show}
    >
      <CtaButton full />
    </div>
  );
}
