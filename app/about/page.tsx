import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-16 sm:px-12">
        <div className="space-y-4">
          <span className="inline-flex w-fit items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-700 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-300">
            NCSU • Mock Exam Website
          </span>

          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Mock Exam Platform
          </h1>

          <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Practice exams, timed quizzes, and analytics problem sets. Track your
            progress and build confidence.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/exams"
              className="rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Browse exams
            </Link>

            <Link
              href="/about"
              className="rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-950 dark:text-white dark:hover:bg-white/10"
            >
              About
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
