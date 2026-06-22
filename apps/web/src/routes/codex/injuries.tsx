import { getCasualties, getInjuries, getLastingInjuries } from '@blitz/data'
import { useTranslation } from 'react-i18next'

import { RollTable } from '@/components/roll-table'
import { useDataLocale } from '@/i18n/use-data-locale'
import { RefText } from '@/reference/ref-text'
import { PageHeading, SectionHeading, Text } from '@/ui'

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
          <Text tone="secondary">
            <RefText>{t('injuries.stuntyNote')}</RefText>
          </Text>
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
        <Text tone="secondary">{t('injuries.lastingNote')}</Text>
        <RollTable rows={getLastingInjuries(locale)} />
      </section>
    </div>
  )
}
