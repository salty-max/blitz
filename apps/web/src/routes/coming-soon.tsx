import { useTranslation } from 'react-i18next'

import { EmptyState, PageHeading } from '@/ui'

/** Placeholder for a section that isn't built yet. */
export function ComingSoon({
  titleKey,
}: {
  titleKey: 'teamManagement' | 'leagues'
}) {
  const { t } = useTranslation('comingSoon')
  return (
    <section>
      <PageHeading>{t(`title.${titleKey}`)}</PageHeading>
      <EmptyState className="mt-3 max-w-xl font-semibold text-ink/50">
        {t('body')}
      </EmptyState>
    </section>
  )
}
