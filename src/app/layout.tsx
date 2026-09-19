import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#23081b",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://osmoticventures.com"),
  title: "Osmotic Ventures, go-to-market for scientific companies",
  description:
    "Go-to-market, marketing, and sales motion for biotech, pharma, diagnostics, and science-first brands. Owned and run by Juan Arenas. One client at a time. Reply within 24 hours.",
  openGraph: {
    title: "Osmotic Ventures, go-to-market for scientific companies",
    description:
      "Go-to-market, marketing, and sales motion for biotech, pharma, diagnostics, and science-first brands. Owned and run by Juan Arenas. One client at a time.",
    images: [{ url: "/img/og-image.jpg", width: 1200, height: 1600 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Osmotic Ventures, go-to-market for scientific companies",
    description:
      "Go-to-market, marketing, and sales motion for biotech, pharma, diagnostics, and science-first brands. Owned and run by Juan Arenas. One client at a time.",
    images: ["/img/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${interTight.variable} ${inter.variable} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
