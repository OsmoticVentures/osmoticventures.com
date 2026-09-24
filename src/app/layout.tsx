import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#13201A",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://osmoticventures.com"),
  title: "Osmotic Ventures, Brand and Marketing for Biotech Startups",
  description:
    "Brand, marketing, and investor materials for biotech startups. Owned and run by Juan Arenas Martin, USC pharmacologist. One client at a time.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Osmotic Ventures, Brand and Marketing for Biotech Startups",
    description:
      "Brand, marketing, and investor materials for biotech startups. Owned and run by Juan Arenas Martin, USC pharmacologist. One client at a time.",
    url: "https://osmoticventures.com",
    siteName: "Osmotic Ventures",
    type: "website",
    images: [{ url: "/img/og-card.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Osmotic Ventures, Brand and Marketing for Biotech Startups",
    description:
      "Brand, marketing, and investor materials for biotech startups. Owned and run by Juan Arenas Martin, USC pharmacologist. One client at a time.",
    images: ["/img/og-card.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${hankenGrotesk.variable} ${bricolage.variable} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
