import { notFound } from "next/navigation";

const subjects = [
  {
    name: "Mathematics",
    slug: "mathematics",
    moodleQuizUrl:
      "https://tsafelabs.moodlecloud.com/mod/quiz/view.php?id=38",
  },
  {
    name: "English",
    slug: "english",
    moodleQuizUrl:
      "https://YOUR-SITE.moodlecloud.com/mod/quiz/view.php?id=124",
  },
  {
    name: "Chemistry",
    slug: "chemistry",
    moodleQuizUrl:
      "https://YOUR-SITE.moodlecloud.com/mod/quiz/view.php?id=125",
  },
  {
    name: "Biology",
    slug: "biology",
    moodleQuizUrl:
      "https://YOUR-SITE.moodlecloud.com/mod/quiz/view.php?id=126",
  },
  {
    name: "Physics",
    slug: "physics",
    moodleQuizUrl:
      "https://YOUR-SITE.moodlecloud.com/mod/quiz/view.php?id=127",
  },
];

export default function SubjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const subject = subjects.find((s) => s.slug === params.slug);

  if (!subject) return notFound();

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        {subject.name}
      </h1>

      <p className="mt-4 text-zinc-700 dark:text-zinc-300 leading-7">
        You are about to start the <strong>{subject.name}</strong> mock exam.
        This quiz is hosted on our Moodle platform and is designed to reflect
        real SSCE exam conditions.
      </p>

      <p className="mt-3 text-zinc-700 dark:text-zinc-300 leading-7">
        You may be asked to log in or enroll before attempting the quiz.
        Make sure you have a stable internet connection before starting.
      </p>

      <a
        href={subject.moodleQuizUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-zinc-900 px-8 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      >
        Start {subject.name} Quiz
      </a>
    </main>
  );
}
