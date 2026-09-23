"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { CountUp, Reveal } from "./motion";

const EMAIL = "juan@osmoticventures.com";
const LINKEDIN = "https://linkedin.com/in/juanarenasmartin";
const CONTAINER = "mx-auto w-full max-w-[1200px] px-5 md:px-8";

export default function Page() {
  return (
    <>
      <a
        href="#request-a-call"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-xl focus:bg-bone focus:px-4 focus:py-2 focus:text-canvas"
      >
        Skip to the form
      </a>
      <main className="bg-canvas text-bone font-body antialiased overflow-x-hidden">
        <Hero />
        <TrackRecord />
        <WhatIBuild />
        <OneClient />
        <Team />
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
  full = false,
  id,
  variant = "dark",
}: {
  href?: string;
  full?: boolean;
  id?: string;
  /** Section the button sits on: "dark" (canvas ground) gets the sage fill, "light" (paper ground) gets a canvas fill. */
  variant?: "dark" | "light";
}) {
  const onDark = variant === "dark";
  return (
    <a
      id={id}
      href={href}
      className={[
        "inline-flex h-14 items-center justify-center whitespace-nowrap rounded-xl px-6 font-semibold text-base",
        onDark ? "bg-sage text-canvas hover:bg-sage-hover" : "bg-canvas text-bone hover:bg-canvas-hover",
        "transition-[background-color,transform] duration-150 ease-out active:scale-[0.97]",
        full ? "w-full" : "w-full sm:w-auto",
      ].join(" ")}
    >
      Request a Call
    </a>
  );
}

/* Lockup measured off the wordmark's own font-size (Bricolage Grotesque
   regular, cap height 0.66em, line-height 1.15em):
   - block height (cap-top of OSMOTIC to baseline of VENTURES) = capHeight + lineHeight = 1.81em
   - O height = block height x 1.40 = 2.534em, centered on that block
   - gap (O's right edge to the wordmark's first glyph) = one cap height = 0.66em,
     reduced by the glyph's own left side bearing (0.062em) so the visual gap lands exact
   - py-2 -my-2 grows the tap target to 44px+ tall without adding visible space
     (padding grows the hit area, the matching negative margin cancels it in flow) */
function Logo({ size = "md", priority = false }: { size?: "md" | "sm"; priority?: boolean }) {
  const text = size === "md" ? "text-sm md:text-base" : "text-xs md:text-[13px]";
  return (
    <a href="#" aria-label="Osmotic Ventures" className="inline-flex items-center py-2 -my-2">
      <Image
        src="/ov-mark.png"
        alt=""
        width={153}
        height={564}
        aria-hidden
        priority={priority}
        className={`w-auto h-[2.534em] mr-[0.598em] ${text}`}
      />
      <span className={`ov-wordmark block font-display font-normal uppercase tracking-[0.2em] leading-[1.15] text-white ${text}`}>
        <span className="block">Osmotic</span>
        <span className="block">Ventures</span>
      </span>
    </a>
  );
}

function SectionTitle({ id, title, onPaper = false }: { id: string; title: string; onPaper?: boolean }) {
  return (
    <h2
      id={id}
      className={`font-display font-semibold text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.01em] max-w-[24ch] ${onPaper ? "text-canvas" : "text-bone"}`}
    >
      {title}
    </h2>
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

function useAutoplay(mount: boolean) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const kick = () => v.play().catch(() => {});
    kick();
    v.addEventListener("canplay", kick);
    return () => v.removeEventListener("canplay", kick);
  }, [mount]);
  return ref;
}

function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate z-20 flex min-h-[88svh] flex-col bg-canvas lg:min-h-[80svh]"
    >
      <header className={`${CONTAINER} flex h-16 items-center lg:h-[72px]`}>
        <Logo priority />
      </header>

      <div className={`${CONTAINER} flex flex-1 items-center pb-14 pt-10 md:pt-14`}>
        <div className="grid w-full gap-10 md:grid-cols-12 md:gap-6 lg:gap-8">
          <div className="md:col-span-7 flex flex-col justify-end">
            <h1
              id="hero-title"
              className="rise font-display font-bold text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.02em] max-w-[14ch]"
            >
              Go-to-Market for Scientific Companies
            </h1>
            <p
              style={{ "--d": "120ms" } as React.CSSProperties}
              className="rise mt-6 text-[17px] leading-[1.55] xl:text-lg"
            >
              Plan, materials, marketing, sales motion.
            </p>
            <div
              style={{ "--d": "200ms" } as React.CSSProperties}
              className="rise mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6"
            >
              <CtaButton id="hero-cta" />
              <a
                href="#track-record"
                className="text-base font-medium text-bone underline underline-offset-4 decoration-bone/50 hover:decoration-bone"
              >
                See the Work
              </a>
            </div>
          </div>

          <div className="md:col-span-4 md:col-start-9 flex items-center md:justify-end">
            <div style={{ "--d": "90ms" } as React.CSSProperties} className="rise w-full">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-surface bg-charcoal md:aspect-[4/5]">
                <Image
                  src="/img/juan-usc.png"
                  alt="Juan Arenas Martin"
                  fill
                  priority
                  sizes="(min-width: 768px) 32vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: "center 22%" }}
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
    label: "High-intent leads engaged",
    body: "A 0-to-1 longevity-metabolomics diagnostics startup. I built the investor deck, the investor website, and the full commercial plan, then cold-called dermatologists and clinic decision-makers across Los Angeles and closed the first paying clients on a pilot program.",
    video: "/video/metaba.mp4",
    aspect: "aspect-[16/9] lg:aspect-[4/3]",
    poster: "/img/poster-metaba.jpg",
    aria: "Project video, Metaba",
  },
  {
    company: "Biotech Connection LA",
    role: "Business Developer, 1 year 8 months",
    n: 200,
    suffix: "+",
    label: "Biotech and pharma accounts owned",
    body: "Cold contact to close, on a CRM I built, with 20+ KOLs. I brought Amgen and USC Keck onto the sponsor list, grew annual sponsor revenue 30%, and closed deals up to $20k for a non-profit.",
    video: "/video/bcla.mp4",
    aspect: "aspect-[3/4] lg:aspect-[4/3]",
    poster: "/img/poster-bcla.jpg",
    aria: "Project video, Biotech Connection LA",
  },
  {
    company: "USC Center for Personalized Brain Health",
    role: "Marketing and Social Strategy, 1 year 1 month",
    n: 93000,
    suffix: "",
    label: "Newsletter subscribers",
    body: "An Alzheimer's lab and prevention clinic. I ran YouTube, LinkedIn, Facebook, Instagram, email, and a long-form docu-series, all HIPAA-compliant, tripled the total audience in 8 months, and launched a Spanish-language newsletter that added 50% more recipients.",
    video: "/video/cpbh.mp4",
    aspect: "aspect-[4/3]",
    poster: "/img/poster-cpbh.jpg",
    aria: "Project video, USC Center for Personalized Brain Health",
  },
];

const LOGOS = [
  { src: "/img/logos/metaba.svg", alt: "Metaba", w: 330, h: 64, o: 0.55 },
  { src: "/img/logos/usc-brain.png", alt: "USC Center for Personalized Brain Health", w: 1421, h: 212, o: 0.85 },
  { src: "/img/logos/biotech-connection.png", alt: "Biotech Connection LA", w: 751, h: 156, o: 1, mh: 44 },
  { src: "/img/logos/superbiome.png", alt: "Superbiome", w: 1715, h: 386, o: 0.38 },
];

function VideoTile({ src, poster, aria, aspect }: { src: string; poster: string; aria: string; aspect: string }) {
  const mount = useSyncExternalStore(subscribeMotion, wantsVideo, () => false);
  const ref = useAutoplay(mount);
  return (
    <div className={`relative ${aspect} w-full overflow-hidden rounded-xl bg-charcoal`}>
      <Image src={poster} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
      {mount && (
        <video
          ref={ref}
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={aria}
        />
      )}
    </div>
  );
}

function TrackRecord() {
  return (
    <section
      id="track-record"
      aria-labelledby="track-record-title"
      className="relative z-10 bg-paper text-canvas py-16 md:py-24 lg:py-32 xl:py-36"
    >
      <div className={CONTAINER}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <Reveal className="shrink-0">
            <SectionTitle id="track-record-title" title="Track Record" onPaper />
          </Reveal>
          <Reveal delay={60}>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:flex sm:flex-wrap sm:gap-x-8">
              {LOGOS.map((l) => (
                <li key={l.alt} className="flex h-10 items-center justify-center md:h-11">
                  <Image
                    src={l.src}
                    alt={l.alt}
                    width={l.w}
                    height={l.h}
                    sizes="170px"
                    style={{ opacity: l.o, maxHeight: l.mh }}
                    className="max-h-8 w-auto max-w-[140px] object-contain grayscale contrast-75 md:max-h-9 md:max-w-[150px]"
                  />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3 xl:gap-8">
          {CASES.map((c, i) => (
            <Reveal key={c.company} delay={i * 60}>
              <article className="flex h-full flex-col rounded-2xl border border-canvas/15 bg-bone p-5 md:flex-row md:gap-7 md:p-6 lg:flex-col lg:gap-0 lg:p-7 xl:p-8">
                <div className="md:w-[44%] md:shrink-0 lg:w-full">
                  <VideoTile src={c.video} poster={c.poster} aria={c.aria} aspect={c.aspect} />
                </div>
                <div className="min-w-0">
                  <h3 className="mt-5 font-display font-semibold text-[22px] leading-tight text-canvas md:mt-0 lg:mt-5">{c.company}</h3>
                  <p className="mt-1 text-[15px] text-canvas/70">{c.role}</p>
                  <p className="mt-5 font-display font-bold text-[clamp(2.25rem,4vw,3.5rem)] leading-none text-canvas tabular-nums tracking-[-0.02em]">
                    <CountUp to={c.n} />
                    {c.suffix && <span>{c.suffix}</span>}
                  </p>
                  <p className="mt-1 text-[15px] text-canvas/70">{c.label}</p>
                  <p className="mt-4 text-base leading-[1.55] text-canvas">{c.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-9">
            <figure className="flex gap-4 sm:gap-6">
              <Image
                src="/img/phil-sell-metaba.png"
                alt="Philip Sell"
                width={56}
                height={56}
                className="h-12 w-12 shrink-0 rounded-full object-cover sm:h-14 sm:w-14"
              />
              <div>
                <blockquote className="max-w-[52ch] font-display font-medium text-[clamp(1.375rem,2.4vw,1.625rem)] leading-[1.35] text-canvas">
                  What really sets Juan apart is that once he understands the high-level goals and objectives, he
                  immediately breaks them down into a concrete list of tasks and action items to begin moving the
                  project forward. He&apos;s great at bridging the gap between idea and execution.
                </blockquote>
                <figcaption className="mt-4 text-[15px] text-canvas">
                  Philip Sell, CEO and Co-founder, Metaba.{" "}
                  <a
                    href="https://linkedin.com/in/philipjsell"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-canvas/70"
                  >
                    LinkedIn
                  </a>
                </figcaption>
              </div>
            </figure>
          </Reveal>
          <Reveal delay={60} className="lg:col-span-3 lg:justify-self-end">
            <CtaButton variant="light" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- 3. What I build ---------- */

type IconKind =
  | "map"
  | "doc"
  | "phone"
  | "arc"
  | "nodes"
  | "chip"
  | "search"
  | "megaphone"
  | "clapper"
  | "users"
  | "handshake"
  | "play";

function Icon({ kind }: { kind: IconKind }) {
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
    case "chip":
      return (
        <svg {...common}>
          <rect x="7" y="7" width="10" height="10" rx="1.5" />
          <path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="M15.5 15.5L21 21" />
        </svg>
      );
    case "megaphone":
      return (
        <svg {...common}>
          <path d="M3 10v4a1 1 0 0 0 1 1h3l8 4V5L7 9H4a1 1 0 0 0-1 1z" />
          <path d="M18 9.5a3.5 3.5 0 0 1 0 5M7 15l1.5 5H11" />
        </svg>
      );
    case "clapper":
      return (
        <svg {...common}>
          <rect x="3" y="8" width="18" height="12" rx="1.5" />
          <path d="M3 8l2-4h16l-2 4M8 4l2 4M13 4l2 4" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3.5" />
          <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4.5-6.2" />
        </svg>
      );
    case "play":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M10 8.5v7l5.5-3.5z" />
        </svg>
      );
    case "handshake":
      return (
        <svg {...common}>
          <path d="M2.5 9l4-3.5 5 1.5 4-1.5 6 4v7.5l-4 3-5-3.5-2 1.5-3-2.5" />
          <path d="M11.5 7l-3.5 3.5a1.5 1.5 0 0 0 2 2l3-2.5" />
        </svg>
      );
  }
}

const CAPS: { icon: IconKind; title: string; desc: string; span: string }[] = [
  {
    icon: "map",
    title: "Go-to-Market Plan",
    desc: "Who buys, why now, what it costs to reach them, and what I do first. Strip away the noise to the few channels that convert.",
    span: "lg:col-span-4",
  },
  {
    icon: "doc",
    title: "Investor Materials",
    desc: "The deck and the investor site, written from your data and your science, in plain language an investor reads to the end.",
    span: "lg:col-span-4",
  },
  {
    icon: "phone",
    title: "Sales Motion, Cold to Close",
    desc: "Cold outreach, route-planned visits, a CRM that fits the deal, and the first closes done by me, not handed off.",
    span: "lg:col-span-4",
  },
  {
    icon: "arc",
    title: "Marketing and Community, HIPAA-Compliant",
    desc: "Paid social, email, content, and a community, run compliant when the audience is patients or clinicians. Bilingual, English and Spanish, when the audience is.",
    span: "lg:col-span-7",
  },
  {
    icon: "nodes",
    title: "AI and Automation",
    desc: "Lead handling, follow-up, and admin built to run without you, with AI where it earns its place.",
    span: "lg:col-span-5",
  },
];

function WhatIBuild() {
  return (
    <section
      id="what-i-build"
      aria-labelledby="what-i-build-title"
      className="bg-canvas py-16 md:py-24 lg:py-32 xl:py-36"
    >
      <div className={CONTAINER}>
        <Reveal>
          <SectionTitle id="what-i-build-title" title="What I Build" />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-12 xl:gap-8">
          {CAPS.map((c, i) => (
            <Reveal key={c.title} delay={i * 70} className={c.span}>
              <article className="flex h-full flex-col rounded-2xl bg-surface p-5 md:p-6 lg:p-7 xl:p-8">
                <span className="text-bone/70">
                  <Icon kind={c.icon} />
                </span>
                <h3 className="mt-4 font-display font-semibold text-[22px] leading-tight text-bone">{c.title}</h3>
                <p className="mt-2 text-base leading-[1.55] text-bone/70">{c.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={60} className="mt-12">
          <CtaButton />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 4. One client ---------- */

const ONE_CLIENT = [
  {
    title: "All of My Time",
    text: "I take one client at a time, and whoever I work with gets all of it.",
  },
  {
    title: "Done by Me",
    text: "The plan, the materials, the outreach, and the first closes are my own work, not handed off.",
  },
  {
    title: "A Straight Answer on Room",
    text: "If I am mid-engagement when you write, I will say so and tell you when I have room.",
  },
];

function OneClient() {
  return (
    <section
      id="one-client"
      aria-labelledby="one-client-title"
      className="relative z-10 bg-paper text-canvas py-16 md:py-24 lg:py-32 xl:py-36"
    >
      <div className={CONTAINER}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <SectionTitle id="one-client-title" title="One Client, Full Focus" onPaper />
            <p className="mt-6 text-[17px] leading-[1.55] xl:text-lg">
              One company. Full commercial motion.
            </p>
            <div className="mt-8">
              <CtaButton variant="light" />
            </div>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <ul className="flex flex-col gap-4">
              {ONE_CLIENT.map((o, i) => (
                <Reveal key={o.title} delay={i * 70}>
                  <li className="rounded-2xl border border-canvas/15 bg-bone p-5 md:p-6">
                    <h3 className="font-display font-semibold text-xl text-canvas">{o.title}</h3>
                    <p className="mt-2 text-base leading-[1.55] text-canvas/70">{o.text}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 5. Team and connections ---------- */

const TEAM: { icon: IconKind; title: string; text: string }[] = [
  { icon: "chip", title: "AI and ML Development", text: "Model and software builds beyond what I write myself." },
  { icon: "search", title: "SEO and GEO", text: "Google and AI-search positioning." },
  { icon: "megaphone", title: "Meta Ads", text: "Paid acquisition on Facebook and Instagram, run by a specialist." },
  { icon: "play", title: "TikTok Ads", text: "Short-form paid reach." },
  { icon: "users", title: "Commission-Only UGC Creators", text: "Creators paid on results, not on a fixed fee." },
  { icon: "clapper", title: "Los Angeles Video Production", text: "A production and editing team for the films, ads, and series that need a crew." },
  { icon: "handshake", title: "Investor Introductions", text: "Angels, VCs, and investors in biotech and pharma." },
];

function Team() {
  return (
    <section
      id="team"
      aria-labelledby="team-title"
      className="bg-canvas py-16 md:py-24 lg:py-32 xl:py-36"
    >
      <div className={CONTAINER}>
        <Reveal className="max-w-[60ch]">
          <SectionTitle id="team-title" title="Team and Connections" />
          <p className="mt-6 text-[17px] leading-[1.55] xl:text-lg">I do the core work.</p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-5">
          {TEAM.map((t, i) => (
            <Reveal key={t.title} delay={i * 50}>
              <article className="flex h-full flex-col rounded-2xl border border-surface bg-charcoal p-5 md:p-6">
                <span className="text-bone/70">
                  <Icon kind={t.icon} />
                </span>
                <h3 className="mt-4 font-display font-semibold text-xl leading-tight text-bone">{t.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.55] text-bone/70">{t.text}</p>
              </article>
            </Reveal>
          ))}
          <Reveal delay={TEAM.length * 50} className="lg:col-span-2">
            <article className="flex h-full flex-col justify-center rounded-2xl bg-surface p-5 md:p-6">
              <h3 className="font-display font-semibold text-xl leading-tight text-bone">
                One Operator, One Point of Contact
              </h3>
              <p className="mt-2 text-[15px] leading-[1.55] text-bone/70">
                You brief me. I scope, staff, and run the work, and the result comes back through one person.
              </p>
            </article>
          </Reveal>
        </div>

        <Reveal delay={(TEAM.length + 1) * 50} className="mt-12">
          <CtaButton />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 6. Request a call ---------- */

const STEPS = [
  { label: "Request a Call", text: "Fill in the form. I read it myself and reply within 24 hours." },
  {
    label: "Scope Conversation",
    text: "A call on what you are building, what you need, and whether I am the right fit. Visible goals, written down.",
  },
  { label: "Written Agreement", text: "A consulting agreement under Osmotic Ventures LLC, with a mutual NDA when you want one." },
  {
    label: "The Work",
    text: "I join as your go-to-market operator, on your goals, for as long as the scope says.",
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
      "w-full rounded-xl bg-canvas px-3.5 py-3 text-base text-bone h-[52px] md:h-14",
      "border",
      err ? "border-2 border-bone" : "border-bone/25",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone",
    ].join(" ");
    return (
      <div>
        <label htmlFor={`f-${name}`} className="mb-2 block text-sm font-medium text-bone">
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
          <p id={`f-${name}-error`} className="mt-2 text-sm text-bone">
            {err}
          </p>
        )}
      </div>
    );
  };

  if (state === "sent") {
    return (
      <div className="rounded-2xl bg-surface p-7 xl:p-8 min-h-[520px]" aria-live="polite">
        <h3 ref={headingRef} tabIndex={-1} className="font-display font-semibold text-[26px] text-bone outline-none">
          Received.
        </h3>
        <p className="mt-4 text-base leading-[1.55] text-bone">
          I read every request myself and reply within 24 hours to {sentTo}. I take one client at a time, so I
          will tell you plainly whether I have room and whether I am the right fit.
        </p>
        <a
          href={LINKEDIN}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-base text-bone/70 underline underline-offset-4 hover:text-bone"
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
      className="rounded-2xl bg-surface p-6 md:p-7 xl:p-8"
    >
      <div className="flex flex-col gap-4">
        {field("name", "Name", { type: "text", autoComplete: "name", maxLength: "120" })}
        {field("email", "Work Email", { type: "email", inputMode: "email", autoComplete: "email" })}
        {field("company", "Company", { type: "text", autoComplete: "organization", maxLength: "160" })}
        {field("message", "What You Are Building or Need")}
      </div>
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="f-website">Website</label>
        <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <button
        type="submit"
        disabled={state === "sending"}
        className={[
          "mt-6 h-14 w-full rounded-xl bg-sage text-base font-semibold text-canvas",
          "transition-[background-color,transform] duration-150 ease-out hover:bg-sage-hover active:scale-[0.97] disabled:pointer-events-none",
        ].join(" ")}
      >
        {state === "sending" ? "Sending" : "Request a Call"}
      </button>
      <p className="mt-4 text-[15px] text-bone/70">
        Or email{" "}
        <a href={`mailto:${EMAIL}`} className="underline underline-offset-4 hover:text-bone">
          {EMAIL}
        </a>
        .
      </p>
      {state === "failed" && (
        <p className="mt-3 text-[15px] text-bone" aria-live="polite">
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
      className="bg-canvas py-16 md:py-24 lg:py-32 xl:py-36"
    >
      <div className={CONTAINER}>
        <Reveal className="md:max-w-[60ch]">
          <SectionTitle id="request-a-call-title" title="Request a Call" />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <ol className="flex flex-col gap-6">
              {STEPS.map((s, i) => (
                <Reveal key={s.label} delay={i * 60}>
                  <li className="flex gap-6">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface font-display font-semibold text-base text-bone">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-display font-semibold text-xl text-bone">{s.label}</h3>
                      <p className="mt-1 text-base leading-[1.55] text-bone/70">{s.text}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={240} className="mt-12 max-w-[44ch] text-[15px] leading-[1.6] text-bone/70">
              <p>
                Osmotic Ventures LLC is a California limited liability company, active with the California Secretary
                of State, based in Los Angeles. I sign NDAs, consulting agreements, and invoices as the LLC.
              </p>
              <p className="mt-3">
                Juan Arenas Martin, Owner. Pharmacologist, USC, Magna Cum Laude.
              </p>
              <p className="mt-3">
                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-bone hover:underline underline-offset-4"
                >
                  LinkedIn
                </a>{" "}
                /{" "}
                <a
                  href="https://juanarenas.bio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-bone hover:underline underline-offset-4"
                >
                  juanarenas.bio
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
    <footer className="border-t border-surface bg-charcoal pb-10 pt-12 text-sm text-bone/70 md:pb-12 md:pt-16">
      <div className={`${CONTAINER} flex flex-col gap-6 md:flex-row md:items-center md:justify-between`}>
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
          <Logo size="sm" />
          <p>&copy; {new Date().getFullYear()} Osmotic Ventures LLC. All rights reserved.</p>
        </div>
        <div className="flex gap-6">
          <a href={`mailto:${EMAIL}`} className="hover:text-bone hover:underline underline-offset-4">
            {EMAIL}
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-bone hover:underline underline-offset-4"
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
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-surface bg-canvas/95 px-5 pt-3 md:hidden transition-transform duration-200 ease-out ${show ? "translate-y-0" : "translate-y-full"}`}
      style={{ paddingBottom: "calc(12px + env(safe-area-inset-bottom))" }}
      aria-hidden={!show}
      inert={!show}
    >
      <CtaButton full />
    </div>
  );
}
