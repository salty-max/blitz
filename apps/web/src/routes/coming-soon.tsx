import { EmptyState, PageHeading } from '@/ui'

/** Placeholder for a section that isn't built yet. */
export function ComingSoon({ title }: { title: string }) {
  return (
    <section>
      <PageHeading>{title}</PageHeading>
      <EmptyState className="mt-3 max-w-xl font-semibold text-ink/50">
        Coming soon.
      </EmptyState>
    </section>
  )
}
