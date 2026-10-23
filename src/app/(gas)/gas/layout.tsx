import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./gas.css";

/* Gas is its own root layout (route group "(gas)"), apart from the
   Osmotic Ventures site's root in "(site)": none of the site's fonts,
   palette, metadata, or analytics reach it. */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gas",
  description: "The cheapest fill on the way to where you're going.",
  robots: { index: false, follow: false },
  manifest: "/gas/manifest.webmanifest",
  icons: { apple: [{ url: "/gas/touch-icon", sizes: "180x180", type: "image/png" }] },
  appleWebApp: { capable: true, title: "Gas", statusBarStyle: "default" },
  other: { "apple-mobile-web-app-capable": "yes" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F7F6F1",
};

export default function GasLayout({ children }: { children: React.ReactNode }) {
  /* The fixed, self-scrolling wrapper paints the whole viewport, overscroll
     included, and keeps the page from rubber-banding inside the iPhone shell. */
  return (
    <html lang="en" className={`${fraunces.variable} ${hanken.variable} h-full`}>
      <body className="min-h-full">
        <div className="fixed inset-0 overflow-y-auto overscroll-contain bg-[#F7F6F1] text-[#14201B]">{children}</div>
      </body>
    </html>
  );
}
