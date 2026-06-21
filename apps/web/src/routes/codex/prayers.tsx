import { prayers } from '@blitz/data'
import { useTranslation } from 'react-i18next'

import { RollTable } from '@/components/roll-table'
import { PageHeading } from '@/ui'

/** The Prayers to Nuffle table — D16 pre-match blessings the underdog may pray for. */
export function PrayersPage() {
  const { t } = useTranslation('codex')
  return (
    <div>
      <PageHeading>{t('prayers.heading')}</PageHeading>

      <div className="mt-6">
        <RollTable rows={prayers} resultHeader={t('prayers.resultHeader')} />
      </div>
    </div>
  )
}
