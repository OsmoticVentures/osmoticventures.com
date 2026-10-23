import { ImageResponse } from "next/og";

/* A plain route, not the apple-icon file convention: inside a route group
   Next suffixes that route with a hash, and the manifest needs a fixed URL. */
export const dynamic = "force-static";

const size = { width: 180, height: 180 };

/* A blue drop on white (Juan's ask, 2026-09-14). Opaque on purpose: iOS
   renders a transparent touch icon black. */
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FFFFFF",
        }}
      >
        <svg width="120" height="140" viewBox="0 0 60 70">
          <path d="M30 2 C30 2 6 30 6 44 a24 24 0 0 0 48 0 C54 30 30 2 30 2 Z" fill="#1E6FE8" />
          <path d="M18 46 a12 12 0 0 0 9 12" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
        </svg>
      </div>
    ),
    size,
  );
}
