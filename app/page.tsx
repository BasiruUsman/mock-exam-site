import Image from "next/image";
import Link from "next/link";

/* =========================
   Moodle configuration
========================= */
const MOODLE_BASE_URL = "https://tsafelabs.moodlecloud.com";
const SSCE_COURSE_ID = "9"; // ✅ Your SSCE course ID

// Auth links (Signup may be blocked on MoodleCloud)
const MOODLE_SIGNUP_URL = `${MOODLE_BASE_URL}/login/signup.php`;
const MOODLE_LOGIN_URL = `${MOODLE_BASE_URL}/login/index.php`;

// ✅ Best entry point: Course page
const MOODLE_COURSE_URL = `${MOODLE_BASE_URL}/course/view.php?id=${SSCE_COURSE_ID}`;

/* =========================
   Subjects
========================= */
const subjects = [
  {
    name: "Mathematics",
    slug: "mathematics",
    moodleQuizUrl: `${MOODLE_BASE_URL}/mod/quiz/view.php?id=38`,
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
  const signupLikelyBlocked = true;

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
                      aria-disabled="true"
                    >
                      📘 {s.name}
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
                    📘 {s.name}
                  </a>
                );
              })}
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-500">
              Subjects marked “coming soon” will be enabled as soon as their
              Moodle quizzes are added.
            </p>

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

              {signupLikelyBlocked ? (
                <span className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 bg-white px-6 text-sm opacity-60 cursor-not-allowed dark:border-white/10 dark:bg-zinc-950">
                  Create account (Coming soon)
                </span>
              ) : (
                <a
                  href={MOODLE_SIGNUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 bg-white px-6 text-sm transition-colors hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-950 dark:hover:bg-white/5"
                >
                  Create account
                </a>
              )}
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
          Tip: Review your <strong>completed exams</strong> to identify your strengths and weaknesses.
        </p>

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
