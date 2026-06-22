import { getProgression } from '@blitz/data'
import { useTranslation } from 'react-i18next'

import { useDataLocale } from '@/i18n/use-data-locale'
import {
  cn,
  PageHeading,
  SectionHeading,
  Table,
  Text,
  textVariants,
} from '@/ui'

const rollLabel = (roll: [number, number]): string =>
  roll[0] === roll[1] ? `${roll[0]}` : `${roll[0]}–${roll[1]}`

const numberCell = cn(
  textVariants({ tone: 'default', tabular: true }),
  'px-3 text-center'
)
const labelCell = cn(textVariants({ variant: 'labelLg' }), 'px-3')

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
                <Table.Cell
                  className={cn(textVariants({ tone: 'default' }), 'px-3')}
                >
                  {row.action}
                </Table.Cell>
                <Table.Cell
                  className={cn(
                    textVariants({ variant: 'stat', tone: 'blood' }),
                    'px-3 text-center'
                  )}
                >
                  {row.spp}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </section>

      <section className="space-y-3">
        <SectionHeading hint="SPP">{t('spp.advancementCost')}</SectionHeading>
        <Text tone="secondary" className="max-w-2xl">
          {t('spp.advancementNote')}
        </Text>
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
                <Table.Cell
                  className={cn(
                    textVariants({ variant: 'stat', tone: 'blood' }),
                    'whitespace-nowrap pr-3 text-center'
                  )}
                >
                  {rollLabel(row.roll)}
                </Table.Cell>
                <Table.Cell
                  className={cn(textVariants({ tone: 'default' }), 'px-3')}
                >
                  {row.gain}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Text tone="secondary" className="max-w-2xl">
          {t('spp.characteristicNote')}
        </Text>
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
