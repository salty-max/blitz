import { getGlossary } from '@blitz/data'
import { useTranslation } from 'react-i18next'

import { useDataLocale } from '@/i18n/use-data-locale'
import { RefText } from '@/reference/ref-text'
import { DescriptionList, PageHeading } from '@/ui'

/** The rules glossary — core game keywords and their definitions, cross-linked. */
export function GlossaryPage() {
  const { t } = useTranslation('codex')
  const locale = useDataLocale()
  const terms = [...getGlossary(locale)].sort((a, b) =>
    a.term.localeCompare(b.term, locale)
  )

  return (
    <div>
      <PageHeading>{t('glossary.heading')}</PageHeading>

      <DescriptionList className="mt-6">
        {terms.map((entry) => (
          <DescriptionList.Row key={entry.key} term={entry.term}>
            <RefText>{entry.definition}</RefText>
          </DescriptionList.Row>
        ))}
      </DescriptionList>
    </div>
  )
}
