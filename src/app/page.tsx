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
              Brand and Marketing for Biotech Startups
            </h1>
            <p
              style={{ "--d": "120ms" } as React.CSSProperties}
              className="rise mt-6 text-[17px] leading-[1.55] xl:text-lg"
            >
              USC pharmacologist. Investor-ready brands.
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

const USC = {
  company: "USC Center for Personalized Brain Health",
  role: "Marketing and Social Strategy, 1 year 1 month",
  stats: [
    { n: 3, suffix: "x", label: "Total audience in 8 months" },
    { n: 93000, suffix: "", label: "Newsletter subscribers" },
    { n: 1000, suffix: "+", label: "Patients and caregivers" },
  ],
  body: [
    "An Alzheimer's lab and prevention clinic. I turned its research into plain language for patients and caregivers, across YouTube, LinkedIn, Instagram, email, and a docu-series, every piece reviewed before it posted.",
  ],
  video: "/video/cpbh.mp4",
  poster: "/img/poster-cpbh.jpg",
  aria: "Project video, USC Center for Personalized Brain Health",
};

const CASES = [
  {
    company: "Metaba Health",
    role: "Founding Go-To-Market Operator, 1 year 2 months",
    n: 50,
    suffix: "+",
    label: "Clinic leads engaged, from zero brand",
    body: "I built the investor deck and investor website for a 0-to-1 diagnostics startup, then closed its first paying clients.",
    video: "/video/metaba.mp4",
    poster: "/img/poster-metaba.jpg",
    aria: "Project video, Metaba",
  },
  {
    company: "Biotech Connection LA",
    role: "Business Developer, 1 year 8 months",
    n: 100,
    suffix: "",
    label: "Attendees per event, filled from cold outreach",
    body: "I owned 200+ biotech and pharma accounts and brought Amgen and USC Keck on as event sponsors.",
    video: "/video/bcla.mp4",
    poster: "/img/poster-bcla.jpg",
    aria: "Project video, Biotech Connection LA",
  },
];

const LOGOS = [
  { src: "/img/logos/usc-brain.png", alt: "USC Center for Personalized Brain Health", w: 1421, h: 212, o: 0.85 },
  { src: "/img/logos/metaba.svg", alt: "Metaba", w: 330, h: 64, o: 0.55 },
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

        <Reveal className="mt-12">
          <article className="grid gap-6 rounded-2xl border border-canvas/15 bg-bone p-5 md:p-7 lg:grid-cols-12 lg:gap-10 lg:p-10">
            <div className="lg:col-span-6">
              <VideoTile src={USC.video} poster={USC.poster} aria={USC.aria} aspect="aspect-[4/3]" />
            </div>
            <div className="min-w-0 lg:col-span-6">
              <h3 className="font-display font-semibold text-[clamp(1.5rem,2.4vw,2rem)] leading-tight text-canvas">
                {USC.company}
              </h3>
              <p className="mt-1 text-[15px] text-canvas/70">{USC.role}</p>
              <dl className="mt-6 grid grid-cols-3 gap-4 border-y border-canvas/15 py-5">
                {USC.stats.map((st) => (
                  <div key={st.label}>
                    <dd className="font-display font-bold text-[clamp(1.75rem,3.2vw,2.75rem)] leading-none text-canvas tabular-nums tracking-[-0.02em]">
                      <CountUp to={st.n} />
                      {st.suffix && <span>{st.suffix}</span>}
                    </dd>
                    <dt className="mt-2 text-[14px] leading-snug text-canvas/70">{st.label}</dt>
                  </div>
                ))}
              </dl>
              {USC.body.map((b) => (
                <p key={b.slice(0, 20)} className="mt-5 text-base leading-[1.6] text-canvas">
                  {b}
                </p>
              ))}
            </div>
          </article>
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:gap-8">
          {CASES.map((c, i) => (
            <Reveal key={c.company} delay={i * 60}>
              <article className="flex h-full flex-col rounded-2xl border border-canvas/15 bg-bone p-5 md:p-6 lg:p-7 xl:p-8">
                <VideoTile src={c.video} poster={c.poster} aria={c.aria} aspect="aspect-[16/9]" />
                <h3 className="mt-5 font-display font-semibold text-[22px] leading-tight text-canvas">{c.company}</h3>
                <p className="mt-1 text-[15px] text-canvas/70">{c.role}</p>
                <p className="mt-5 font-display font-bold text-[clamp(2.25rem,4vw,3.5rem)] leading-none text-canvas tabular-nums tracking-[-0.02em]">
                  <CountUp to={c.n} />
                  {c.suffix && <span>{c.suffix}</span>}
                </p>
                <p className="mt-1 text-[15px] text-canvas/70">{c.label}</p>
                <p className="mt-4 text-base leading-[1.55] text-canvas">{c.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-12">
            <figure className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
              <Image
                src="/img/phil-sell-metaba.png"
                alt="Philip Sell"
                width={224}
                height={224}
                className="h-48 w-48 shrink-0 rounded-full object-cover sm:h-56 sm:w-56"
              />
              <div>
                <blockquote className="max-w-[52ch] font-display font-medium text-[clamp(1.375rem,2.4vw,1.625rem)] leading-[1.35] text-canvas">
                  &ldquo;What really sets Juan apart is that once he understands the high-level goals and objectives, he
                  immediately breaks them down into a concrete list of tasks and action items to begin moving the
                  project forward. He&apos;s great at bridging the gap between idea and execution.&rdquo;
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
    icon: "megaphone",
    title: "Founder Voice on LinkedIn",
    desc: "Posts in your founders' voice, from results you can publish.",
    span: "lg:col-span-4",
  },
  {
    icon: "doc",
    title: "Investor Materials",
    desc: "Deck, one-pager, and investor site, ready before the raise.",
    span: "lg:col-span-4",
  },
  {
    icon: "clapper",
    title: "Film and Video",
    desc: "A hero film and short clips with your scientists.",
    span: "lg:col-span-4",
  },
  {
    icon: "users",
    title: "Patient Community",
    desc: "Social and sign-ups for patients, reviewed before every post.",
    span: "lg:col-span-6",
  },
  {
    icon: "search",
    title: "Search and AI Search",
    desc: "Show up on Google, LinkedIn, and AI answers.",
    span: "lg:col-span-6",
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
              <article className="flex h-full flex-col rounded-2xl bg-surface p-6 md:p-7 lg:p-8">
                <span className="text-bone/70">
                  <Icon kind={c.icon} />
                </span>
                <h3 className="mt-5 font-display font-semibold text-[22px] leading-tight text-bone">{c.title}</h3>
                <p className="mt-2 text-base leading-[1.55] text-bone/70">{c.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ---------- 4. One client ---------- */

const ONE_CLIENT = [
  { title: "All of My Time", text: "You are the only company I work for." },
  { title: "Done by Me", text: "The plan, the content, and the outreach are my own work." },
  { title: "A Straight Answer", text: "If I am booked, I will tell you when I am free." },
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
            <SectionTitle id="one-client-title" title="One Client at a Time" onPaper />
          </Reveal>
          <ul className="lg:col-span-6 lg:col-start-7">
            {ONE_CLIENT.map((o, i) => (
              <Reveal key={o.title} delay={i * 70}>
                <li className="border-t border-canvas/15 py-6 last:border-b">
                  <h3 className="font-display font-semibold text-xl text-canvas">{o.title}</h3>
                  <p className="mt-1 text-[17px] leading-[1.55] text-canvas/70">{o.text}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- 5. Team and connections ---------- */

const TEAM: { icon: IconKind; title: string }[] = [
  { icon: "clapper", title: "Video Production" },
  { icon: "handshake", title: "Investor Introductions" },
  { icon: "search", title: "SEO and GEO" },
  { icon: "megaphone", title: "Meta Ads" },
  { icon: "play", title: "TikTok Ads" },
  { icon: "users", title: "UGC Creators" },
  { icon: "chip", title: "AI and ML Development" },
];

function Team() {
  return (
    <section
      id="team"
      aria-labelledby="team-title"
      className="bg-canvas py-16 md:py-24 lg:py-32 xl:py-36"
    >
      <div className={CONTAINER}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <SectionTitle id="team-title" title="Team and Connections" />
            <p className="mt-6 text-[17px] leading-[1.55] xl:text-lg">One point of contact: me.</p>
          </Reveal>
          <ul className="grid sm:grid-cols-2 sm:gap-x-8 lg:col-span-6 lg:col-start-7">
            {TEAM.map((t, i) => (
              <Reveal key={t.title} delay={i * 40}>
                <li className="flex items-center gap-4 border-t border-surface py-5">
                  <span className="text-bone/60">
                    <Icon kind={t.icon} />
                  </span>
                  <span className="font-display font-semibold text-lg text-bone">{t.title}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- 6. Request a call ---------- */

type Errors = Partial<Record<"name" | "email" | "message", string>>;

function validate(f: HTMLFormElement): Errors {
  const v = (n: string) => (f.elements.namedItem(n) as HTMLInputElement | HTMLTextAreaElement | null)?.value.trim() ?? "";
  const e: Errors = {};
  if (!v("name")) e.name = "Add your name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) e.email = "Use a valid email address";
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

  // Errors appear only after a submit attempt, and each one clears as soon as its field is fixed.
  const onInput = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const f = formRef.current;
    const k = e.currentTarget.name as keyof Errors;
    if (!f || !errors[k]) return;
    setErrors((prev) => ({ ...prev, [k]: validate(f)[k] }));
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
      "w-full rounded-xl bg-canvas px-4 py-3 text-base text-bone h-14",
      "border",
      err ? "border-sage" : "border-bone/15",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone",
    ].join(" ");
    return (
      <div>
        <div className="mb-2 flex items-baseline justify-between gap-4">
          <label htmlFor={`f-${name}`} className="text-sm font-medium text-bone">
            {label}
          </label>
          {err && (
            <span id={`f-${name}-error`} className="text-sm text-sage">
              {err}
            </span>
          )}
        </div>
        {name === "message" ? (
          <textarea
            id={`f-${name}`}
            name={name}
            rows={4}
            maxLength={1000}
            required
            onInput={onInput}
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
            onInput={onInput}
            onFocus={onFocus}
            aria-invalid={!!err}
            aria-describedby={err ? `f-${name}-error` : undefined}
            className={cls}
            {...extra}
          />
        )}
      </div>
    );
  };

  if (state === "sent") {
    return (
      <div className="rounded-2xl bg-surface p-7 xl:p-10" aria-live="polite">
        <h3 ref={headingRef} tabIndex={-1} className="font-display font-semibold text-[26px] text-bone outline-none">
          Received.
        </h3>
        <p className="mt-4 text-base leading-[1.55] text-bone">I will reply to {sentTo} within 24 hours.</p>
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
      className="rounded-2xl bg-surface p-6 md:p-8 xl:p-10"
    >
      <div className="flex flex-col gap-6">
        {field("name", "Name", { type: "text", autoComplete: "name", maxLength: "120" })}
        {field("email", "Email", { type: "email", inputMode: "email", autoComplete: "email" })}
        {field("message", "What You Need")}
      </div>
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="f-website">Website</label>
        <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <button
        type="submit"
        disabled={state === "sending"}
        className={[
          "mt-8 h-14 w-full rounded-xl bg-sage text-base font-semibold text-canvas",
          "transition-[background-color,transform] duration-150 ease-out hover:bg-sage-hover active:scale-[0.97] disabled:pointer-events-none",
        ].join(" ")}
      >
        {state === "sending" ? "Sending" : "Request a Call"}
      </button>
      {state === "failed" && (
        <p className="mt-4 text-[15px] text-bone" aria-live="polite">
          That did not send. Email me at{" "}
          <a href={mailto} className="underline underline-offset-4">
            {EMAIL}
          </a>
          .
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
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <SectionTitle id="request-a-call-title" title="Request a Call" />
            <p className="mt-6 text-[17px] leading-[1.55] xl:text-lg">I reply within 24 hours.</p>
            <p className="mt-8 text-[15px] leading-[1.6] text-bone/70">
              Or email{" "}
              <a href={`mailto:${EMAIL}`} className="underline underline-offset-4 hover:text-bone">
                {EMAIL}
              </a>
            </p>
          </Reveal>
          <Reveal delay={60} className="lg:col-span-6 lg:col-start-7">
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
          <p>&copy; {new Date().getFullYear()} Osmotic Ventures LLC, Los Angeles. Juan Arenas Martin, Owner.</p>
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
