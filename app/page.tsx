import Image from "next/image";
import Link from "next/link";

const subjects = [
  {
    name: "Mathematics",
    slug: "mathematics",
    moodleQuizUrl: "https://tsafelabs.moodlecloud.com/mod/quiz/view.php?id=38",
  },
  {
    name: "English",
    slug: "english",
    moodleQuizUrl: "https://YOUR-SITE.moodlecloud.com/mod/quiz/view.php?id=124",
  },
  {
    name: "Chemistry",
    slug: "chemistry",
    moodleQuizUrl: "https://YOUR-SITE.moodlecloud.com/mod/quiz/view.php?id=125",
  },
  {
    name: "Biology",
    slug: "biology",
    moodleQuizUrl: "https://YOUR-SITE.moodlecloud.com/mod/quiz/view.php?id=126",
  },
  {
    name: "Physics",
    slug: "physics",
    moodleQuizUrl: "https://YOUR-SITE.moodlecloud.com/mod/quiz/view.php?id=127",
  },
];

function isPlaceholderUrl(url: string) {
  return url.includes("YOUR-SITE.moodlecloud.com");
}

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-12">
        {/* Header */}
        <div className="flex items-start gap-4">
          <Image
            src="/tsafelabs-logo.png"
            alt="TsafeLabs Logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />

          <div className="space-y-3">
            <span className="inline-flex w-fit items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-700 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-300">
              TsafeLabs • SSCE Mock Exam Practice
            </span>

            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Practice SSCE the smart way
            </h1>

            <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Timed quizzes, exam-style questions, and instant feedback to help
              you build confidence and improve faster.
            </p>

            {/* Primary CTA: Subjects */}
            <div className="mt-4 flex flex-wrap gap-2">
              {subjects.map((s) => {
                const placeholder = isPlaceholderUrl(s.moodleQuizUrl);

                const baseClass =
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm transition-colors";
                const activeClass =
                  "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-white/5";
                const disabledClass =
                  "border-zinc-200 bg-white text-zinc-700 opacity-60 cursor-not-allowed dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-200";

                if (placeholder) {
                  return (
                    <span
                      key={s.slug}
                      className={`${baseClass} ${disabledClass}`}
                      title="Coming soon"
                      aria-disabled="true"
                    >
                      <span aria-hidden className="text-base">📘</span>
                      {s.name}
                    </span>
                  );
                }

                return (
                  <a
                    key={s.slug}
                    href={s.moodleQuizUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${baseClass} ${activeClass}`}
                  >
                    <span aria-hidden className="text-base">📘</span>
                    {s.name}
                  </a>
                );
              })}
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-500">
              Subjects marked “coming soon” will be enabled as soon as their
              Moodle quizzes are added.
            </p>

            {/* Secondary actions (keep only what exists) */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/about"
                className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 bg-white px-6 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-white/5"
              >
                About TsafeLabs
              </Link>

              <a
                href="https://tsafelabs.moodlecloud.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                Open Moodle →
              </a>
            </div>
          </div>
        </div>

        {/* Feature cards (minimal, no repetition) */}
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-zinc-950">
            <h2 className="text-base font-semibold">Timed practice</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Build speed and accuracy with realistic exam timing.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-zinc-950">
            <h2 className="text-base font-semibold">Instant feedback</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Learn faster by reviewing correct answers and mistakes.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-zinc-950">
            <h2 className="text-base font-semibold">Topic-by-topic</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Focus on weak areas and track improvement over time.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-10 text-sm text-zinc-500 dark:text-zinc-500">
          Tip: Replace <span className="font-mono">YOUR-SITE.moodlecloud.com</span>{" "}
          with your real MoodleCloud quiz links to enable all subjects.
        </p>
      </main>
    </div>
  );
}
