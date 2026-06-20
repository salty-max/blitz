import { glossary } from '@blitz/data'
import { DescriptionList, DescriptionRow } from '@blitz/ui'

import { RefText } from '@/components/ref-text'

const TERMS = [...glossary].sort((a, b) => a.term.localeCompare(b.term))

/** The rules glossary — core game keywords and their definitions, cross-linked. */
export function GlossaryPage() {
  return (
    <div>
      <h1 className="font-display text-5xl uppercase">Glossary</h1>

      <DescriptionList className="mt-6">
        {TERMS.map((entry) => (
          <DescriptionRow key={entry.key} term={entry.term}>
            <RefText>{entry.definition}</RefText>
          </DescriptionRow>
        ))}
      </DescriptionList>
    </div>
  )
}
