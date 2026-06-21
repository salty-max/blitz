import { glossary } from '@blitz/data'
import { useTranslation } from 'react-i18next'

import { RefText } from '@/reference/ref-text'
import { DescriptionList, PageHeading } from '@/ui'

const TERMS = [...glossary].sort((a, b) => a.term.localeCompare(b.term))

/** The rules glossary — core game keywords and their definitions, cross-linked. */
export function GlossaryPage() {
  const { t } = useTranslation('codex')

  return (
    <div>
      <PageHeading>{t('glossary.heading')}</PageHeading>

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
