export default function About() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        About TsafeLabs
      </h1>

      <div className="mt-6 space-y-5 text-zinc-700 dark:text-zinc-300 leading-7">
        <p>
          TsafeLabs is an online learning and exam-practice platform designed to
          help students and professionals build confidence through structured
          practice, realistic assessments, and targeted knowledge reinforcement.
        </p>

        <p>
          Our goal is simple: make exam preparation smarter, more effective, and
          accessible. TsafeLabs provides high-quality practice exams, timed
          quizzes, and topic-focused question banks that mirror real testing
          conditions. By combining repetition, feedback, and analytics, we help
          learners identify gaps, strengthen weak areas, and track progress over
          time.
        </p>

        <p>
          We focus on practical, skill-based knowledge across areas such as
          analytics, programming, quantitative methods, and business-related
          disciplines. Rather than passive reading, TsafeLabs emphasizes active
          learning—learning by doing, reviewing mistakes, and improving with each
          attempt.
        </p>

        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Who TsafeLabs Is For
          </h2>

          <ul className="mt-3 list-disc list-inside space-y-1">
            <li>Students preparing for academic exams</li>
            <li>Learners sharpening technical and analytical skills</li>
            <li>Professionals refreshing knowledge or preparing for certifications</li>
          </ul>
        </div>

        <p>
          As the platform evolves, TsafeLabs aims to expand its content,
          analytics, and personalization features to support deeper learning
          paths and long-term skill development.
        </p>

        <p className="font-medium text-zinc-900 dark:text-zinc-100">
          Practice with purpose. Learn with confidence. Grow with TsafeLabs.
        </p>
      </div>
    </main>
  );
}

