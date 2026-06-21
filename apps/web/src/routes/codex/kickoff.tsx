import { getKickoffEvents, getWeather } from '@blitz/data'
import { useTranslation } from 'react-i18next'

import { RollTable } from '@/components/roll-table'
import { useDataLocale } from '@/i18n/use-data-locale'
import { PageHeading, SectionHeading } from '@/ui'

/** The kick-off sequence — the 2D6 Kick-off Event table and the 2D6 Weather table. */
export function KickoffPage() {
  const { t } = useTranslation('codex')
  const locale = useDataLocale()

  return (
    <div className="space-y-10">
      <PageHeading>{t('kickoff.heading')}</PageHeading>

      <section className="space-y-5">
        <SectionHeading hint="2D6">{t('kickoff.events')}</SectionHeading>
        <RollTable rows={getKickoffEvents(locale)} />
      </section>

      <section className="space-y-5">
        <SectionHeading hint="2D6">{t('kickoff.weather')}</SectionHeading>
        <RollTable rows={getWeather(locale)} />
      </section>
    </div>
  )
}
