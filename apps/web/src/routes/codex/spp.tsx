import { getProgression } from '@blitz/data'
import { useTranslation } from 'react-i18next'

import { useDataLocale } from '@/i18n/use-data-locale'
import { PageHeading, SectionHeading, Table } from '@/ui'

const rollLabel = (roll: [number, number]): string =>
  roll[0] === roll[1] ? `${roll[0]}` : `${roll[0]}–${roll[1]}`

const numberCell = 'px-3 text-center tabular-nums text-ink/85'
const labelCell = 'px-3 font-headline font-semibold uppercase tracking-wide'

/** Star Player Points and advancement — how players earn SPP and spend them to improve. */
export function SppPage() {
  const { t } = useTranslation('codex')
  const locale = useDataLocale()
  const { sppActions, advancementCosts, characteristicGains, valueIncreases } =
    getProgression(locale)

  return (
    <div className="space-y-10">
      <PageHeading>{t('spp.heading')}</PageHeading>

      <section className="space-y-5">
        <SectionHeading>{t('spp.earning')}</SectionHeading>
        <Table className="min-w-[28rem]">
          <Table.Header>
            <Table.Row>
              <Table.Head className="px-3">{t('spp.action')}</Table.Head>
              <Table.Head className="px-3 text-center">SPP</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {sppActions.map((row) => (
              <Table.Row key={row.key}>
                <Table.Cell className="px-3 text-ink/85">
                  {row.action}
                </Table.Cell>
                <Table.Cell className="px-3 text-center font-display text-xl leading-none tabular-nums text-blood">
                  {row.spp}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </section>

      <section className="space-y-3">
        <SectionHeading hint="SPP">{t('spp.advancementCost')}</SectionHeading>
        <p className="max-w-2xl text-sm text-ink/70">
          {t('spp.advancementNote')}
        </p>
        <Table className="min-w-[44rem]">
          <Table.Header>
            <Table.Row>
              <Table.Head className="px-3">{t('spp.level')}</Table.Head>
              <Table.Head className="px-3 text-center">
                {t('spp.randomPrimary')}
              </Table.Head>
              <Table.Head className="px-3 text-center">
                {t('spp.chosenPrimary')}
              </Table.Head>
              <Table.Head className="px-3 text-center">
                {t('spp.randomSecondary')}
              </Table.Head>
              <Table.Head className="px-3 text-center">
                {t('spp.chosenSecondary')}
              </Table.Head>
              <Table.Head className="px-3 text-center">
                {t('spp.characteristic')}
              </Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {advancementCosts.map((row) => (
              <Table.Row key={row.key}>
                <Table.Cell className={labelCell}>{row.level}</Table.Cell>
                <Table.Cell className={numberCell}>
                  {row.randomPrimary}
                </Table.Cell>
                <Table.Cell className={numberCell}>
                  {row.chosenPrimary}
                </Table.Cell>
                <Table.Cell className={numberCell}>
                  {row.randomSecondary}
                </Table.Cell>
                <Table.Cell className={numberCell}>
                  {row.chosenSecondary}
                </Table.Cell>
                <Table.Cell className={numberCell}>
                  {row.characteristic}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </section>

      <section className="space-y-3">
        <SectionHeading hint="D8">
          {t('spp.characteristicTable')}
        </SectionHeading>
        <Table className="min-w-[28rem]">
          <Table.Header>
            <Table.Row>
              <Table.Head className="pr-3 text-center">
                {t('rollTable.roll')}
              </Table.Head>
              <Table.Head className="px-3">{t('spp.improvement')}</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {characteristicGains.map((row) => (
              <Table.Row key={row.key}>
                <Table.Cell className="whitespace-nowrap pr-3 text-center font-display text-xl leading-none tabular-nums text-blood">
                  {rollLabel(row.roll)}
                </Table.Cell>
                <Table.Cell className="px-3 text-ink/85">{row.gain}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <p className="max-w-2xl text-sm text-ink/70">
          {t('spp.characteristicNote')}
        </p>
      </section>

      <section className="space-y-5">
        <SectionHeading>{t('spp.valueIncrease')}</SectionHeading>
        <Table className="min-w-[28rem]">
          <Table.Header>
            <Table.Row>
              <Table.Head className="px-3">{t('spp.advancement')}</Table.Head>
              <Table.Head className="px-3 text-center">
                {t('spp.value')}
              </Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {valueIncreases.map((row) => (
              <Table.Row key={row.key}>
                <Table.Cell className={labelCell}>{row.advancement}</Table.Cell>
                <Table.Cell className={numberCell}>{row.value}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </section>
    </div>
  )
}
