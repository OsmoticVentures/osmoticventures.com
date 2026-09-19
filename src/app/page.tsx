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
  breathe = false,
  full = false,
  id,
}: {
  href?: string;
  breathe?: boolean;
  full?: boolean;
  id?: string;
}) {
  return (
    <a
      id={id}
      href={href}
      className={[
        "inline-flex h-14 items-center justify-center rounded-lg bg-magenta px-6 font-semibold text-white text-base",
        "transition-colors duration-150 hover:bg-[#d23a8c] active:translate-y-px",
        "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-magenta",
        breathe ? "cta-breathe" : "",
        full ? "w-full" : "w-full sm:w-auto",
      ].join(" ")}
    >
      Request a call
    </a>
  );
}

function SectionTitle({ id, title, onPaper = false }: { id: string; title: string; onPaper?: boolean }) {
  return (
    <h2
      id={id}
      className={`font-display font-semibold text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.01em] max-w-[24ch] ${onPaper ? "text-ink" : "text-cream"}`}
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

function HeroVideo() {
  const mount = useSyncExternalStore(subscribeMotion, wantsVideo, () => false);
  const ref = useAutoplay(mount);
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
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(35,8,27,.94)_0%,rgba(35,8,27,.88)_38%,rgba(35,8,27,.45)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,rgba(35,8,27,0),rgba(35,8,27,.92))]" />
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

      <header className={`${CONTAINER} flex h-16 items-center lg:h-[72px]`}>
        <a href="#" className="font-display text-xl font-semibold text-cream">
          Osmotic Ventures
        </a>
      </header>

      <div className={`${CONTAINER} flex flex-1 items-end pb-14 pt-10 md:pt-14`}>
        <div className="grid w-full gap-10 md:grid-cols-12 md:gap-6 lg:gap-8">
          <div className="md:col-span-7 flex flex-col justify-end">
            <h1
              id="hero-title"
              className="rise font-display font-bold text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.02em] max-w-[14ch]"
            >
              Go-to-market for scientific companies
            </h1>
            <p
              style={{ "--d": "120ms" } as React.CSSProperties}
              className="rise mt-6 max-w-[44ch] text-[17px] leading-[1.55] xl:text-lg"
            >
              I build the commercial plan, the investor materials, the marketing, and the sales motion for
              biotech, pharma, diagnostics, and science-first brands. Then I run it with you until the first
              customers are closed.
            </p>
            <div
              style={{ "--d": "200ms" } as React.CSSProperties}
              className="rise mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6"
            >
              <CtaButton id="hero-cta" breathe />
              <a
                href="#track-record"
                className="text-base font-medium text-cream underline underline-offset-4 decoration-cream/50 hover:decoration-cream"
              >
                See the work
              </a>
            </div>
          </div>

          <div className="md:col-span-4 md:col-start-9 flex items-center md:justify-end">
            <div style={{ "--d": "90ms" } as React.CSSProperties} className="rise w-[64%] md:w-full">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-plum bg-deep">
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
  { src: "/img/logos/metaba.svg", alt: "Metaba", w: 330, h: 64 },
  { src: "/img/logos/usc-brain.png", alt: "USC Center for Personalized Brain Health", w: 1421, h: 212 },
  { src: "/img/logos/biotech-connection.png", alt: "Biotech Connection LA", w: 751, h: 156 },
  { src: "/img/logos/superbiome.png", alt: "Superbiome", w: 1715, h: 386 },
];

function VideoTile({ src, poster, aria }: { src: string; poster: string; aria: string }) {
  const mount = useSyncExternalStore(subscribeMotion, wantsVideo, () => false);
  const ref = useAutoplay(mount);
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-deep">
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
      className="relative z-10 bg-paper text-ink py-16 md:py-24 lg:py-32 xl:py-36"
    >
      <div className={CONTAINER}>
        <div className="grid gap-8 md:grid-cols-12 md:items-center">
          <Reveal className="md:col-span-4">
            <SectionTitle id="track-record-title" title="Track record" onPaper />
          </Reveal>
          <Reveal delay={60} className="md:col-span-8">
            <ul className="grid grid-cols-2 gap-3 md:flex md:flex-nowrap md:justify-end md:gap-4">
              {LOGOS.map((l) => (
                <li
                  key={l.alt}
                  className="flex h-16 items-center justify-center rounded-xl border border-ink/10 bg-cream px-5 md:h-[72px] md:px-6"
                >
                  <Image src={l.src} alt={l.alt} width={l.w} height={l.h} sizes="170px" className="max-h-8 w-auto max-w-[150px] object-contain md:max-h-9 md:max-w-[170px]" />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3 xl:gap-8">
          {CASES.map((c, i) => (
            <Reveal key={c.company} delay={i * 60}>
              <article className="flex h-full flex-col rounded-2xl border border-ink/10 bg-cream p-5 md:p-6 lg:p-7 xl:p-8">
                <VideoTile src={c.video} poster={c.poster} aria={c.aria} />
                <h3 className="mt-5 font-display font-semibold text-[22px] leading-tight text-ink">{c.company}</h3>
                <p className="mt-1 text-[15px] text-plum">{c.role}</p>
                <p className="mt-5 font-display font-bold text-[clamp(2.25rem,4vw,3.5rem)] leading-none text-magenta tabular-nums tracking-[-0.02em]">
                  <CountUp to={c.n} />
                  {c.suffix && <span>{c.suffix}</span>}
                </p>
                <p className="mt-1 text-[15px] text-plum">{c.label}</p>
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
                <blockquote className="max-w-[52ch] font-display font-medium text-[clamp(1.375rem,2.4vw,1.625rem)] leading-[1.35] text-ink">
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
                    className="underline underline-offset-4 hover:text-magenta"
                  >
                    LinkedIn
                  </a>
                </figcaption>
              </div>
            </figure>
          </Reveal>
          <Reveal delay={60} className="md:col-span-3 md:justify-self-end">
            <CtaButton />
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
    title: "Go-to-market plan",
    desc: "Who buys, why now, what it costs to reach them, and what I do first. Strip away the noise to the few channels that convert.",
    span: "lg:col-span-4",
  },
  {
    icon: "doc",
    title: "Investor materials",
    desc: "The deck and the investor site, written from your data and your science, in plain language an investor reads to the end.",
    span: "lg:col-span-4",
  },
  {
    icon: "phone",
    title: "Sales motion, cold to close",
    desc: "Cold outreach, route-planned visits, a CRM that fits the deal, and the first closes done by me, not handed off.",
    span: "lg:col-span-4",
  },
  {
    icon: "arc",
    title: "Marketing and community, HIPAA-compliant",
    desc: "Paid social, email, content, and a community, run compliant when the audience is patients or clinicians. Bilingual, English and Spanish, when the audience is.",
    span: "lg:col-span-7",
  },
  {
    icon: "nodes",
    title: "AI and automation",
    desc: "Lead handling, follow-up, and admin built to run without you, with AI where it earns its place.",
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
          <SectionTitle id="what-i-build-title" title="What I build" />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-12 xl:gap-8">
          {CAPS.map((c, i) => (
            <Reveal key={c.title} delay={i * 70} className={c.span}>
              <article className="group flex h-full flex-col rounded-2xl bg-plum p-5 md:p-6 lg:p-7 xl:p-8">
                <span className="text-mauve transition-colors duration-150 group-hover:text-cream">
                  <Icon kind={c.icon} />
                </span>
                <h3 className="mt-4 font-display font-semibold text-[22px] leading-tight text-cream">{c.title}</h3>
                <p className="mt-2 text-base leading-[1.55] text-mauve">{c.desc}</p>
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
    title: "All of my time",
    text: "I take one client at a time, and whoever I work with gets all of it.",
  },
  {
    title: "Done by me",
    text: "The plan, the materials, the outreach, and the first closes are my own work, not handed off.",
  },
  {
    title: "A straight answer on room",
    text: "If I am mid-engagement when you write, I will say so and tell you when I have room.",
  },
];

function OneClient() {
  return (
    <section
      id="one-client"
      aria-labelledby="one-client-title"
      className="relative z-10 bg-paper text-ink py-16 md:py-24 lg:py-32 xl:py-36"
    >
      <div className={CONTAINER}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <SectionTitle id="one-client-title" title="One client, full focus" onPaper />
            <p className="mt-6 max-w-[44ch] text-[17px] leading-[1.55] xl:text-lg">
              I join as your go-to-market operator, on your goals, for as long as the scope says. Not a retainer
              spread across a roster. One company, and I run its commercial motion with you until the first
              customers are closed.
            </p>
            <div className="mt-8">
              <CtaButton />
            </div>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <ul className="flex flex-col gap-4">
              {ONE_CLIENT.map((o, i) => (
                <Reveal key={o.title} delay={i * 70}>
                  <li className="rounded-2xl border border-ink/10 bg-cream p-5 md:p-6">
                    <h3 className="font-display font-semibold text-xl text-ink">{o.title}</h3>
                    <p className="mt-2 text-base leading-[1.55] text-ink/80">{o.text}</p>
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
  { icon: "chip", title: "AI and ML development", text: "Model and software builds beyond what I write myself." },
  { icon: "search", title: "SEO and GEO", text: "Google and AI-search positioning." },
  { icon: "megaphone", title: "Meta ads", text: "Paid acquisition on Facebook and Instagram, run by a specialist." },
  { icon: "play", title: "TikTok ads", text: "Short-form paid reach." },
  { icon: "users", title: "Commission-only UGC creators", text: "Creators paid on results, not on a fixed fee." },
  { icon: "clapper", title: "Los Angeles video production", text: "A production and editing team for the films, ads, and series that need a crew." },
  { icon: "handshake", title: "Investor introductions", text: "Angels, VCs, and investors in biotech and pharma." },
];

function Team() {
  return (
    <section
      id="team"
      aria-labelledby="team-title"
      className="bg-ink py-16 md:py-24 lg:py-32 xl:py-36"
    >
      <div className={CONTAINER}>
        <Reveal className="max-w-[60ch]">
          <SectionTitle id="team-title" title="Team and connections" />
          <p className="mt-6 text-[17px] leading-[1.55] xl:text-lg">
            I do the core work myself. For everything outside my own hands I bring specialists onto the
            engagement and run them, so you focus on your goals and I take care of fulfillment.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-5">
          {TEAM.map((t, i) => (
            <Reveal key={t.title} delay={i * 50}>
              <article className="group flex h-full flex-col rounded-2xl border border-plum bg-deep p-5 md:p-6">
                <span className="text-mauve transition-colors duration-150 group-hover:text-cream">
                  <Icon kind={t.icon} />
                </span>
                <h3 className="mt-4 font-display font-semibold text-xl leading-tight text-cream">{t.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.55] text-mauve">{t.text}</p>
              </article>
            </Reveal>
          ))}
          <Reveal delay={TEAM.length * 50}>
            <article className="flex h-full flex-col justify-between rounded-2xl bg-magenta p-5 md:p-6">
              <h3 className="font-display font-semibold text-xl leading-tight text-white">
                One operator, one point of contact
              </h3>
              <p className="mt-2 text-[15px] leading-[1.55] text-white/85">
                You brief me. I scope, staff, and run the work, and the result comes back through one person.
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- 6. Request a call ---------- */

const STEPS = [
  { label: "Request a call", text: "Fill in the form. I read it myself and reply within 24 hours." },
  {
    label: "Scope conversation",
    text: "A call on what you are building, what you need, and whether I am the right fit. Visible goals, written down.",
  },
  { label: "Written agreement", text: "A consulting agreement under Osmotic Ventures LLC, with a mutual NDA when you want one." },
  {
    label: "The work",
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
      "w-full rounded-xl bg-ink px-3.5 py-3 text-base text-cream h-[52px] md:h-14",
      "border",
      err ? "border-2 border-cream" : "border-mauve/40",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream",
    ].join(" ");
    return (
      <div>
        <label htmlFor={`f-${name}`} className="mb-2 block text-sm font-medium text-cream">
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
      <div className="rounded-2xl bg-plum p-7 xl:p-8 min-h-[520px]" aria-live="polite">
        <h3 ref={headingRef} tabIndex={-1} className="font-display font-semibold text-[26px] text-cream outline-none">
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
          className="mt-6 inline-block text-base text-mauve underline underline-offset-4 hover:text-cream"
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
      className="rounded-2xl bg-plum p-6 md:p-7 xl:p-8"
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
          "mt-6 h-14 w-full rounded-lg bg-magenta text-base font-semibold text-white",
          "transition-colors duration-150 hover:bg-[#d23a8c] active:translate-y-px disabled:pointer-events-none",
          "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-magenta",
          state === "sending" ? "" : "cta-breathe",
        ].join(" ")}
      >
        {state === "sending" ? "Sending" : "Request a call"}
      </button>
      <p className="mt-4 text-[15px] text-mauve">
        Or email{" "}
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
          <SectionTitle id="request-a-call-title" title="Request a call" />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <ol className="flex flex-col gap-6">
              {STEPS.map((s, i) => (
                <Reveal key={s.label} delay={i * 60}>
                  <li className="flex gap-6">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-plum font-display font-semibold text-base text-cream">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-display font-semibold text-xl text-cream">{s.label}</h3>
                      <p className="mt-1 text-base leading-[1.55] text-mauve">{s.text}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={240} className="mt-12 max-w-[44ch] text-[15px] leading-[1.6] text-mauve">
              <p>
                Osmotic Ventures LLC is a California limited liability company, active with the California Secretary
                of State, based in Los Angeles. I sign NDAs, consulting agreements, and invoices as the LLC. Business
                banking and invoicing are in place.
              </p>
              <p className="mt-3">
                Juan Arenas Martin, owner. Pharmacologist, USC, magna cum laude.
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
    <footer className="border-t border-plum bg-deep pb-10 pt-12 text-sm text-mauve md:pb-12 md:pt-16">
      <div className={`${CONTAINER} flex flex-col gap-4 md:flex-row md:items-center md:justify-between`}>
        <p>&copy; {new Date().getFullYear()} Osmotic Ventures LLC. All rights reserved.</p>
        <div className="flex gap-6">
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
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-plum bg-ink/95 px-5 pt-3 md:hidden transition-transform duration-300 ${show ? "translate-y-0" : "translate-y-full"}`}
      style={{ paddingBottom: "calc(12px + env(safe-area-inset-bottom))" }}
      aria-hidden={!show}
    >
      <CtaButton full />
    </div>
  );
}
