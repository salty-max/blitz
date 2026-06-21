import { getCasualties, getInjuries, getLastingInjuries } from '@blitz/data'
import { useTranslation } from 'react-i18next'

import { RollTable } from '@/components/roll-table'
import { useDataLocale } from '@/i18n/use-data-locale'
import { RefText } from '@/reference/ref-text'
import { PageHeading, SectionHeading } from '@/ui'

/** The injury sequence — the 2D6 Injury roll (and its Stunty variant) feeding the D16 Casualty table. */
export function InjuriesPage() {
  const { t } = useTranslation('codex')
  const locale = useDataLocale()
  const injuryResults = getInjuries(locale)
  const standard = injuryResults.filter((i) => i.variant === 'standard')
  const stunty = injuryResults.filter((i) => i.variant === 'stunty')

  return (
    <div className="space-y-10">
      <PageHeading>{t('injuries.heading')}</PageHeading>

      <section className="space-y-5">
        <SectionHeading hint="2D6">{t('injuries.injuryRoll')}</SectionHeading>
        <RollTable rows={standard} />
        <div className="space-y-3">
          <p className="text-sm text-ink/70">
            <RefText>{t('injuries.stuntyNote')}</RefText>
          </p>
          <RollTable rows={stunty} />
        </div>
      </section>

      <section className="space-y-5">
        <SectionHeading hint="D16">
          {t('injuries.casualtyTable')}
        </SectionHeading>
        <RollTable rows={getCasualties(locale)} />
      </section>

      <section className="space-y-5">
        <SectionHeading hint="D6">{t('injuries.lastingInjury')}</SectionHeading>
        <p className="text-sm text-ink/70">{t('injuries.lastingNote')}</p>
        <RollTable rows={getLastingInjuries(locale)} />
      </section>
    </div>
  )
}
