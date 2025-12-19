import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "About TsafeLabs",
    description:
      "Learn about TsafeLabs—an online exam-practice and learning platform built to help students and professionals prepare with confidence.",
  };
}

export default function About() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-12">
        <div className="max-w-3xl">
          <span className="inline-flex w-fit items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-700 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-300">
            TsafeLabs About
          </span>

          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            About TsafeLabs
          </h1>

          <div className="mt-6 space-y-5 text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <p>
              TsafeLabs is an online learning and exam-practice platform designed
              to help students and professionals build confidence through
              structured practice, realistic assessments, and targeted knowledge
              reinforcement.
            </p>

            <p>
              Our goal is simple: make exam preparation smarter, more effective,
              and accessible. TsafeLabs provides high-quality practice exams,
              timed quizzes, and topic-focused question banks that mirror real
              testing conditions. By combining repetition, feedback, and
              analytics, we help learners identify gaps, strengthen weak areas,
              and track progress over time.
            </p>

            <p>
              We focus on practical, skill-based knowledge across areas such as
              analytics, programming, quantitative methods, and business-related
              disciplines. Rather than passive reading, TsafeLabs emphasizes
              active learning—learning by doing, reviewing mistakes, and
              improving with each attempt.
            </p>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-zinc-950">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Who TsafeLabs Is For
              </h2>

              <ul className="mt-3 list-disc list-inside space-y-1">
                <li>Students preparing for academic exams</li>
                <li>Learners sharpening technical and analytical skills</li>
                <li>
                  Professionals refreshing knowledge or preparing for
                  certifications
                </li>
              </ul>
            </div>

            <p>
              As the platform evolves, TsafeLabs aims to expand its content,
              analytics, and personalization features to support deeper learning
              paths and long-term skill development.
            </p>

            <p className="pt-4 border-t border-zinc-200 dark:border-white/10 font-medium text-zinc-900 dark:text-zinc-100">
              Practice with purpose. Learn with confidence. Grow with TsafeLabs.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
