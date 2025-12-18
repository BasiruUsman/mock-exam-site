import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TsafeLabs | Mock Exam Platform",
  description:
    "TsafeLabs provides mock exams, practice quizzes, and analytics learning tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50`}
      >
        {/* Header */}
        <header className="border-b border-zinc-200 bg-white dark:border-white/10 dark:bg-black">
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-4">
            <Image
              src="/tsafelabs-logo.png"
              alt="TsafeLabs Logo"
              width={40}
              height={40}
              priority
            />
            <span className="text-lg font-semibold tracking-tight">
              TsafeLabs
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="min-h-[calc(100vh-128px)]">{children}</main>

        {/* Footer */}
        <footer className="border-t border-zinc-200 bg-white dark:border-white/10 dark:bg-black">
          <div className="mx-auto max-w-7xl px-6 py-6 text-sm text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} TsafeLabs · Innovate · Learn · Grow
          </div>
        </footer>
      </body>
    </html>
  );
}

