import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-12">
        <div className="space-y-6">
          <span className="inline-flex w-fit items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-700 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-300">
            NCSU • Mock Exam Website
          </span>

          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            About TsafeLabs
          </h1>

          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            TsafeLabs is an online learning and exam-practice platform designed
            to help students and professionals build confidence through
            structured practice, realistic assessments, and targeted knowledge
            reinforcement.
          </p>

          <div className="space-y-4 text-zinc-700 dark:text-zinc-300 leading-7">
            <p>
              Our goal is simple: make exam preparation smarter, more effective,
              and accessible. TsafeLabs provides high-quality practice exams,
              timed quizzes, and topic-focused question banks that mirror real
              testing conditions.
            </p>

            <p>
              By combining repetition, feedback, and progress tracking, we help
              learners identify gaps, strengthen weak areas, and improve over
              time.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/"
              className="rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Back to Home
            </Link>

            <Link
              href="/exams"
              className="rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-800"
            >
              Browse exams
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
