import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    {/* Header */}
<div className="flex items-center gap-4">
    {/* Logo */}
    <Image
      src="/logo.png"
      alt="TsafeLabs Logo"
      width={40}
      height={40}
      className="h-10 w-10 object-contain"
      priority
    />
    {/* Header Text */}
    <div className="space-y-2">
        <span className="inline-flex w-fit items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-700 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-300">
          TsafeLabs • Mock Exam Website
        </span>

        <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
        Mock Exam Platform
        </h1>

        <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        Practice exams, timed quizzes, and analytics problem sets. Track your progress and build confidence before the real test.
        </p>
    </div>
</div>
        {/* Actions */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/exams"
            className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Browse Exams
          </Link>

          <Link
            href="/practice"
            className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 bg-white px-6 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-white/5"
          >
            Start Practice
          </Link>

          <Link
            href="/about"
            className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 bg-transparent px-6 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-white/10 dark:text-zinc-50 dark:hover:bg-white/5"
          >
            About
          </Link>
        </div>

        {/* Feature cards */}
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-zinc-950">
            <h2 className="text-base font-semibold">Timed Exams</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Simulate real test conditions with timers, sections, and scoring.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-zinc-950">
            <h2 className="text-base font-semibold">Question Banks</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Organize questions by topic: SQL, R, Python, regression, and more.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-zinc-950">
            <h2 className="text-base font-semibold">Progress Tracking</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              See accuracy by topic and review missed questions to improve.
            </p>
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-10 text-sm text-zinc-500 dark:text-zinc-500">
          Tip: next, create <span className="font-mono">app/exams/page.tsx</span>{" "}
          and <span className="font-mono">app/practice/page.tsx</span> to match the
          buttons above.
        </p>
      </main>
    </div>
  );
}
