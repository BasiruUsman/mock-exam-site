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

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-16 sm:px-12">
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

          <div className="space-y-2">
            <span className="inline-flex w-fit items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-700 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-300">
              TsafeLabs • SSCE Mock Exam Website
            </span>

            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Mock Exam Platform
            </h1>

            <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Prepare for SSCE with timed practice, past-question style drills,
              instant feedback, and topic-by-topic revision.
            </p>

            {/* Subject chips (DIRECT MOODLE LINKS) */}
            <div className="mt-4 flex flex-wrap gap-2">
              {subjects.map((s) => {
                const isPlaceholder = s.moodleQuizUrl.includes(
                  "YOUR-SITE.moodlecloud.com"
                );

                return (
                  <a
                    key={s.slug}
                    href={isPlaceholder ? undefined : s.moodleQuizUrl}
                    target={isPlaceholder ? undefined : "_blank"}
                    rel={isPlaceholder ? undefined : "noopener noreferrer"}
                    aria-disabled={isPlaceholder}
                    className={[
                      "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm transition-colors",
                      "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100",
                      "dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-white/5",
                      isPlaceholder ? "cursor-not-allowed opacity-60" : "",
                    ].join(" ")}
                    onClick={(e) => {
                      if (isPlaceholder) e.preventDefault();
                    }}
                  >
                    <span aria-hidden className="text-base">
                      📘
                    </span>
                    {s.name}
                  </a>
                );
              })}
            </div>

            {/* Optional: tiny note if some links are placeholders */}
            <p className="text-xs text-zinc-500 dark:text-zinc-500">
              Note: subjects marked as “coming soon” will be enabled once their Moodle quiz links are set.
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
              Simulate real SSCE conditions with timers, sections, and scoring.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-zinc-950">
            <h2 className="text-base font-semibold">Subjects</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Study Mathematics, English, Chemistry, Biology, and Physics with
              organized topics and exam-style questions.
            </p>

            {/* Subject pills (DIRECT MOODLE LINKS) */}
            <div className="mt-4 flex flex-wrap gap-2">
              {subjects.map((s) => {
                const isPlaceholder = s.moodleQuizUrl.includes(
                  "YOUR-SITE.moodlecloud.com"
                );

                return (
                  <a
                    key={s.slug}
                    href={isPlaceholder ? undefined : s.moodleQuizUrl}
                    target={isPlaceholder ? undefined : "_blank"}
                    rel={isPlaceholder ? undefined : "noopener noreferrer"}
                    aria-disabled={isPlaceholder}
                    className={[
                      "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                      "bg-zinc-100 text-zinc-800 hover:bg-zinc-200",
                      "dark:bg-white/10 dark:text-zinc-200 dark:hover:bg-white/15",
                      isPlaceholder ? "cursor-not-allowed opacity-60" : "",
                    ].join(" ")}
                    onClick={(e) => {
                      if (isPlaceholder) e.preventDefault();
                    }}
                  >
                    {s.name}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-zinc-950">
            <h2 className="text-base font-semibold">Progress Tracking</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Track scores by subject and topic, review mistakes, and improve
              faster.
            </p>
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-10 text-sm text-zinc-500 dark:text-zinc-500">
          Tip: add the remaining Moodle quiz links (replace{" "}
          <span className="font-mono">YOUR-SITE.moodlecloud.com</span>) to enable
          all subjects.
        </p>
      </main>
    </div>
  );
}
