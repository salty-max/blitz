import { glossary } from '@blitz/data'

import { RefText } from '@/components/ref-text'
import { DescriptionList, PageHeading } from '@/components/ui'

const TERMS = [...glossary].sort((a, b) => a.term.localeCompare(b.term))

/** The rules glossary — core game keywords and their definitions, cross-linked. */
export function GlossaryPage() {
  return (
    <div>
      <PageHeading>Glossary</PageHeading>

      <DescriptionList className="mt-6">
        {TERMS.map((entry) => (
          <DescriptionList.Row key={entry.key} term={entry.term}>
            <RefText>{entry.definition}</RefText>
          </DescriptionList.Row>
        ))}
      </DescriptionList>
    </div>
  )
}
