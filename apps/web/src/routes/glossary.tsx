import { glossary } from '@blitz/data'
import { DescriptionList, DescriptionRow, PageHeading } from '@blitz/ui'

import { RefText } from '@/components/ref-text'

const TERMS = [...glossary].sort((a, b) => a.term.localeCompare(b.term))

/** The rules glossary — core game keywords and their definitions, cross-linked. */
export function GlossaryPage() {
  return (
    <div>
      <PageHeading>Glossary</PageHeading>

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
