import { glossary } from '@blitz/data'

import { RefText } from '@/components/ref-text'

const TERMS = [...glossary].sort((a, b) => a.term.localeCompare(b.term))

/** The rules glossary — core game keywords and their definitions, cross-linked. */
export function GlossaryPage() {
  return (
    <div>
      <h1 className="font-display text-5xl uppercase">Glossary</h1>

      <dl className="mt-6 divide-y divide-ink/10">
        {TERMS.map((entry) => (
          <div
            key={entry.key}
            className="grid gap-1 py-2.5 sm:grid-cols-[12rem_1fr] sm:gap-4"
          >
            <dt className="font-headline text-lg font-semibold uppercase tracking-wide">
              {entry.term}
            </dt>
            <dd className="text-ink/85">
              <RefText>{entry.definition}</RefText>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
