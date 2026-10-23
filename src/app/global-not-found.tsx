import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./(site)/globals.css";

/* The app has two root layouts, "(site)" and "(gas)", so an unmatched URL has
   no single layout to render inside. This keeps the 404 on the site's ground. */
const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "404: This page could not be found.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${hankenGrotesk.variable} h-full`}>
      <body className="min-h-full">
        <main className="flex min-h-screen items-center justify-center gap-5 px-5 text-center">
          <h1 className="border-r border-current/30 pr-5 text-2xl font-medium">404</h1>
          <p className="text-sm">This page could not be found.</p>
        </main>
      </body>
    </html>
  );
}
