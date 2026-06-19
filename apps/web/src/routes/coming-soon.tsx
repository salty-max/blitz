/** Placeholder for a section that isn't built yet. */
export function ComingSoon({ title }: { title: string }) {
  return (
    <section>
      <h1 className="font-display text-5xl uppercase">{title}</h1>
      <p className="mt-3 max-w-xl font-headline text-lg font-semibold uppercase tracking-wide text-ink/50">
        Coming soon.
      </p>
    </section>
  )
}
