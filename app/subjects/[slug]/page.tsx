export default function SubjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug.replace(/-/g, " ");
  const title = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-4 text-zinc-700 dark:text-zinc-300">
        Coming soon: topics, past questions, and timed practice for {title}.
      </p>
    </main>
  );
}
