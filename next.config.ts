import type { NextConfig } from "next";

// Field Sales OS is its own Vercel project (OsmoticVentures/field-sales-os,
// basePath /nb). This site owns the domain and proxies /nb to it, the
// Next.js Multi-Zones pattern. Its assets live under /nb/_next, so the
// wildcard covers them too.
const FIELD_SALES_OS = process.env.FIELD_SALES_OS_ORIGIN ?? "https://field-sales-os.vercel.app";

const nextConfig: NextConfig = {
  deploymentId: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 32),
  async rewrites() {
    return [
      { source: "/nb", destination: `${FIELD_SALES_OS}/nb` },
      { source: "/nb/:path*", destination: `${FIELD_SALES_OS}/nb/:path*` },
    ];
  },
};

export default nextConfig;
