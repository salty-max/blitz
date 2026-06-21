import { getPrayers } from '@blitz/data'
import { useTranslation } from 'react-i18next'

import { RollTable } from '@/components/roll-table'
import { useDataLocale } from '@/i18n/use-data-locale'
import { PageHeading } from '@/ui'

/** The Prayers to Nuffle table — D16 pre-match blessings the underdog may pray for. */
export function PrayersPage() {
  const { t } = useTranslation('codex')
  const locale = useDataLocale()
  return (
    <div>
      <PageHeading>{t('prayers.heading')}</PageHeading>

      <div className="mt-6">
        <RollTable
          rows={getPrayers(locale)}
          resultHeader={t('prayers.resultHeader')}
        />
      </div>
    </div>
  )
}
