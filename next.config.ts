import type { NextConfig } from "next";

// Field Sales OS is its own Vercel project (OsmoticVentures/field-sales-os,
// basePath /nb). This site owns the domain and proxies /nb to it, the
// Next.js Multi-Zones pattern. Its assets live under /nb/_next, so the
// wildcard covers them too.
const FIELD_SALES_OS = process.env.FIELD_SALES_OS_ORIGIN ?? "https://field-sales-os.vercel.app";

// Stoke Club runs on Juan's own Mac (custom Node server, the click-sync
// WebSocket, and the band's audio, which never leaves that machine), reached
// at this Mac's fixed Tailscale Funnel address. That app can't sit behind a
// Vercel rewrite: WebSocket upgrades don't proxy through Vercel to an
// external origin, and its client already hardcodes absolute asset paths
// with no basePath. So this is a redirect, not a proxy, a friendly link on
// the domain that lands on the real address; the browser bar then shows the
// Mac's own address, and the link only works while the Mac is on and the
// app's start.sh is running.
const STOKE_CLUB_ORIGIN = process.env.STOKE_CLUB_ORIGIN ?? "https://juans-macbook-air.tailff30fa.ts.net:8443";

const nextConfig: NextConfig = {
  deploymentId: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 32),
  async redirects() {
    return [
      // Metri Bio client pages live at /metribio/{strategy,sow,why}; the bare path opens Strategy.
      { source: "/metribio", destination: "/metribio/strategy", permanent: false },
      { source: "/stokeclub", destination: STOKE_CLUB_ORIGIN, permanent: false },
      { source: "/stokeclub/:path*", destination: `${STOKE_CLUB_ORIGIN}/:path*`, permanent: false },
    ];
  },
  async rewrites() {
    return [
      { source: "/nb", destination: `${FIELD_SALES_OS}/nb` },
      { source: "/nb/:path*", destination: `${FIELD_SALES_OS}/nb/:path*` },
    ];
  },
};

export default nextConfig;
