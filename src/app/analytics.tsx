"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

/* The project key is public by design; it can only send events. */
const KEY = "phc_pCfhPPK63i4WRURZ2gzBhBhFRT9cbKsvjpmhFssbMy4E";
const HOST = "https://us.i.posthog.com";

const SCROLL_MARKS = [25, 50, 75, 100];

export function Analytics() {
  useEffect(() => {
    if (!KEY) return;
    posthog.init(KEY, {
      api_host: HOST,
      person_profiles: "identified_only",
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: false,
      disable_session_recording: false,
      session_recording: { maskAllInputs: true, maskTextSelector: "[data-ph-no-capture]" },
    });

    const seen = new Set<string>();
    const once = (event: string, props?: Record<string, unknown>) => {
      const k = event + JSON.stringify(props ?? {});
      if (seen.has(k)) return;
      seen.add(k);
      posthog.capture(event, props);
    };

    // Section views, and the funnel steps built from them.
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const name = (e.target as HTMLElement).dataset.section!;
          once("section_view", { section: name });
          if (name === "business_partners") once("reached_business_partners");
        }
      },
      { threshold: 0.25 },
    );
    sections.forEach((s) => io.observe(s));

    // Scrolled past the hero.
    const hero = document.querySelector<HTMLElement>('[data-section="hero"]');
    const onScroll = () => {
      const doc = document.documentElement;
      const pct = Math.round(((window.scrollY + window.innerHeight) / doc.scrollHeight) * 100);
      for (const m of SCROLL_MARKS) if (pct >= m) once("scroll_depth", { percent: m });
      if (hero && hero.getBoundingClientRect().bottom < 0) once("scrolled_past_hero");
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Outbound logo clicks and CTA clicks.
    const onClick = (ev: MouseEvent) => {
      const el = (ev.target as HTMLElement).closest<HTMLElement>("[data-track]");
      if (!el) return;
      const event = el.dataset.track!;
      posthog.capture(event, { partner: el.dataset.partner, cta: el.dataset.cta, href: (el as HTMLAnchorElement).href });
    };
    document.addEventListener("click", onClick);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
