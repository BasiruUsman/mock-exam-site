import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";

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
   Leaderboard types (from /api/leaderboard)
========================= */
type LeaderboardRow = {
  rank: number;
  name: string;
  subject: string;
  score: number;
};

type LeaderboardResponse = {
  generatedAt: string;
  resultsByQuiz: { subject: string; quizid: number; top: LeaderboardRow[] }[];
};

export default async function Home() {
  // Fetch real leaderboard from your server route
  let leaderboardData: LeaderboardResponse | null = null;

  try {
    // Build an absolute URL that works on BOTH localhost and Vercel
    const h = await headers();

    // Prefer forwarded host when behind a proxy (Vercel), fall back to host
    const host = h.get("x-forwarded-host") ?? h.get("host");

    // Prefer forwarded proto, but default correctly for local dev
    const proto =
      h.get("x-forwarded-proto") ??
      (process.env.NODE_ENV === "development" ? "http" : "https");

    if (host) {
      const url = `${proto}://${host}/api/leaderboard`;

      const lb = await fetch(url, {
        // Revalidate every 10 minutes (adjust as needed)
        next: { revalidate: 600 },
      });

      if (lb.ok) leaderboardData = (await lb.json()) as LeaderboardResponse;
    }
  } catch {
    // If it fails, we show a friendly message in the UI.
  }

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
            [
              "Timed practice",
              "Build speed and accuracy with realistic exam timing.",
            ],
            [
              "Instant feedback",
              "Learn faster by reviewing correct answers and mistakes.",
            ],
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
           RESULTS / LEADERBOARD (REAL)
        ========================= */}
        <div className="mt-12 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-zinc-950">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-base font-semibold">Results & Leaderboard</h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Live top scores pulled from Moodle (names may be anonymized for
                privacy).
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

          {!leaderboardData ? (
            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
              Leaderboard is temporarily unavailable. Please try again later.
            </p>
          ) : (
            <div className="mt-6 space-y-8">
              {leaderboardData.resultsByQuiz.map((quiz) => (
                <div key={quiz.quizid}>
                  <h3 className="text-sm font-semibold">{quiz.subject}</h3>

                  {quiz.top.length === 0 ? (
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                      No scores yet.
                    </p>
                  ) : (
                    <div className="mt-3 overflow-x-auto">
                      <table className="w-full min-w-[420px] border-separate border-spacing-0">
                        <thead>
                          <tr className="text-left">
                            <th className="border-b border-zinc-200 pb-2 text-xs font-semibold text-zinc-500 dark:border-white/10 dark:text-zinc-400">
                              Rank
                            </th>
                            <th className="border-b border-zinc-200 pb-2 text-xs font-semibold text-zinc-500 dark:border-white/10 dark:text-zinc-400">
                              Name
                            </th>
                            <th className="border-b border-zinc-200 pb-2 text-xs font-semibold text-zinc-500 dark:border-white/10 dark:text-zinc-400">
                              Score
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {quiz.top.map((row) => (
                            <tr
                              key={`${quiz.quizid}-${row.rank}`}
                              className="text-sm"
                            >
                              <td className="border-b border-zinc-100 py-3 pr-2 text-zinc-600 dark:border-white/5 dark:text-zinc-300">
                                #{row.rank}
                              </td>
                              <td className="border-b border-zinc-100 py-3 pr-2 font-medium dark:border-white/5">
                                {row.name}
                              </td>
                              <td className="border-b border-zinc-100 py-3 text-zinc-700 dark:border-white/5 dark:text-zinc-200">
                                {row.score}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-500">
            Last updated:{" "}
            {leaderboardData?.generatedAt
              ? new Date(leaderboardData.generatedAt).toLocaleString()
              : "—"}
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
