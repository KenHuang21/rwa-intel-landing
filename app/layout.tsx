import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RWA Intel | The Bloomberg for Tokenisation",
  description: "Global intelligence platform for regulated tokenisation (RWA) and stablecoins. Verified data from HKMA, SFC, MAS, and more.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-slate-100`}>
        <nav className="sticky top-0 z-30 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-3 text-lg font-semibold text-white hover:text-cyan-300 transition-colors"
            >
              <div className="h-8 w-8 rounded-2xl bg-cyan-400/20 ring-1 ring-cyan-300/30 grid place-content-center">🌐</div>
              <span>RWA Intel</span>
            </Link>

            <div className="hidden md:flex items-center gap-6 text-sm text-slate-300">
              <Link href="/projects" className="hover:text-white transition-colors">
                Projects
              </Link>
              <Link href="/regulation" className="hover:text-white transition-colors">
                Regulation
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a href="/#waitlist" className="inline-flex items-center gap-2 rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-cyan-400 transition-colors">
              Join Early Access
            </a>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}
