import Image from "next/image";
import Link from "next/link";

/* =========================
   Moodle configuration
========================= */
const MOODLE_BASE_URL = "https://tsafelabs.moodlecloud.com";
const SSCE_COURSE_ID = "9";

// Auth links
const MOODLE_LOGIN_URL = `${MOODLE_BASE_URL}/login/index.php`;
const MOODLE_COURSE_URL = `${MOODLE_BASE_URL}/course/view.php?id=${SSCE_COURSE_ID}`;

/* =========================
   Subjects (LIVE EXAMS)
========================= */
const subjects = [
  {
    name: "Mathematics",
    slug: "mathematics",
    moodleQuizUrl: "https://tsafelabs.moodlecloud.com/mod/quiz/view.php?id=40",
  },
  {
    name: "Physics",
    slug: "physics",
    moodleQuizUrl: "https://tsafelabs.moodlecloud.com/mod/quiz/view.php?id=41",
  },
  {
    name: "Chemistry",
    slug: "chemistry",
    moodleQuizUrl: "https://tsafelabs.moodlecloud.com/mod/quiz/view.php?id=43",
  },
  {
    name: "English",
    slug: "english",
    moodleQuizUrl: "https://tsafelabs.moodlecloud.com/mod/quiz/view.php?id=44",
  },
  {
    name: "Biology",
    slug: "biology",
    moodleQuizUrl: "https://tsafelabs.moodlecloud.com/mod/quiz/view.php?id=45",
  },
];

/* =========================
   Demo leaderboard data
   (Replace later with real Moodle data if/when you integrate)
========================= */
const leaderboard = [
  { name: "Student A", subject: "Mathematics", score: 92, time: "18:40" },
  { name: "Student B", subject: "English", score: 88, time: "21:10" },
  { name: "Student C", subject: "Physics", score: 85, time: "24:05" },
  { name: "Student D", subject: "Chemistry", score: 83, time: "22:50" },
  { name: "Student E", subject: "Biology", score: 80, time: "25:30" },
];

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

            {/* Subject links */}
            <div className="mt-4 flex flex-wrap gap-2">
              {subjects.map((s) => (
                <a
                  key={s.slug}
                  href={s.moodleQuizUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-white/5"
                >
                  📘 {s.name}
                </a>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/about"
                className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 bg-white px-6 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-950 dark:hover:bg-white/5"
              >
                About TsafeLabs
              </Link>

              <a
                href={MOODLE_COURSE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                Join TsafeLabs →
              </a>
            </div>

            <div className="pt-1">
              <a
                href={MOODLE_LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-600 hover:underline dark:text-zinc-400"
              >
                Already have an account? Log in
              </a>
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {[
            ["Timed practice", "Build speed and accuracy with realistic exam timing."],
            ["Instant feedback", "Learn faster by reviewing correct answers and mistakes."],
            ["Topic-by-topic", "Focus on weak areas and track improvement over time."],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-zinc-950"
            >
              <h2 className="text-base font-semibold">{title}</h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {desc}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-zinc-500 dark:text-zinc-500">
          Tip: Review your <strong>completed exams</strong> to identify your
          strengths and weaknesses.
        </p>

        {/* =========================
           RESULTS / LEADERBOARD
        ========================= */}
        <div className="mt-12 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-zinc-950">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-base font-semibold">Results & Leaderboard</h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                See top scores and stay motivated. (Demo data for now — will be
                linked to Moodle results when integration is enabled.)
              </p>
            </div>

            <a
              href={MOODLE_COURSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-full border border-zinc-200 bg-white px-4 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-950 dark:hover:bg-white/5"
            >
              View your results in Moodle →
            </a>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[520px] border-separate border-spacing-0">
              <thead>
                <tr className="text-left">
                  <th className="border-b border-zinc-200 pb-2 text-xs font-semibold text-zinc-500 dark:border-white/10 dark:text-zinc-400">
                    Rank
                  </th>
                  <th className="border-b border-zinc-200 pb-2 text-xs font-semibold text-zinc-500 dark:border-white/10 dark:text-zinc-400">
                    Name
                  </th>
                  <th className="border-b border-zinc-200 pb-2 text-xs font-semibold text-zinc-500 dark:border-white/10 dark:text-zinc-400">
                    Subject
                  </th>
                  <th className="border-b border-zinc-200 pb-2 text-xs font-semibold text-zinc-500 dark:border-white/10 dark:text-zinc-400">
                    Score
                  </th>
                  <th className="border-b border-zinc-200 pb-2 text-xs font-semibold text-zinc-500 dark:border-white/10 dark:text-zinc-400">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((row, idx) => (
                  <tr key={`${row.name}-${idx}`} className="text-sm">
                    <td className="border-b border-zinc-100 py-3 pr-2 text-zinc-600 dark:border-white/5 dark:text-zinc-300">
                      #{idx + 1}
                    </td>
                    <td className="border-b border-zinc-100 py-3 pr-2 font-medium dark:border-white/5">
                      {row.name}
                    </td>
                    <td className="border-b border-zinc-100 py-3 pr-2 text-zinc-700 dark:border-white/5 dark:text-zinc-200">
                      {row.subject}
                    </td>
                    <td className="border-b border-zinc-100 py-3 pr-2 text-zinc-700 dark:border-white/5 dark:text-zinc-200">
                      {row.score}%
                    </td>
                    <td className="border-b border-zinc-100 py-3 text-zinc-700 dark:border-white/5 dark:text-zinc-200">
                      {row.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-500">
            Note: This leaderboard is currently sample data. When Moodle
            integration is enabled, it can automatically pull real scores and
            ranks.
          </p>
        </div>

        {/* =========================
           CONTACT US
        ========================= */}
        <div className="mt-12 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-zinc-950">
          <h2 className="text-base font-semibold">Contact Us</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Have questions, feedback, or need support? Reach us at:
          </p>
          <a
            href="mailto:tsafetechlabs@gmail.com"
            className="mt-3 inline-block text-sm font-medium underline underline-offset-4"
          >
            tsafetechlabs@gmail.com
          </a>
        </div>
      </main>
    </div>
  );
}
