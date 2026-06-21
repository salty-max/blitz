import { teamBuildingRules } from '@blitz/data'
import { useTranslation } from 'react-i18next'

import { useDataLocale } from '@/i18n/use-data-locale'
import { RefText } from '@/reference/ref-text'
import { PageHeading, SectionHeading, Table } from '@/ui'

/** How a roster is drafted: budget, player limits, sideline staff and Team Value. */
export function DraftingPage() {
  const { t } = useTranslation('codex')
  const locale = useDataLocale()
  const r = teamBuildingRules
  const money = (n: number) =>
    t('drafting.money', {
      n: n.toLocaleString(locale === 'fr' ? 'fr-FR' : 'en-US'),
    })

  const assets = [
    {
      key: 'reroll',
      label: t('drafting.assets.reroll'),
      cost: t('drafting.perTeam'),
      limit: t('drafting.max', { n: r.rerollMax }),
    },
    {
      key: 'apothecary',
      label: t('drafting.assets.apothecary'),
      cost: money(r.apothecaryCost),
      limit: t('drafting.apothLimit'),
    },
    {
      key: 'coach',
      label: t('drafting.assets.coach'),
      cost: money(r.assistantCoaches.cost),
      limit: t('drafting.max', { n: r.assistantCoaches.max }),
    },
    {
      key: 'cheerleader',
      label: t('drafting.assets.cheerleader'),
      cost: money(r.cheerleaders.cost),
      limit: t('drafting.max', { n: r.cheerleaders.max }),
    },
    {
      key: 'fan',
      label: t('drafting.assets.fan'),
      cost: t('drafting.perPoint', { v: money(r.dedicatedFans.cost) }),
      limit: t('drafting.fanLimit', {
        start: r.dedicatedFans.start,
        max: r.dedicatedFans.max,
      }),
    },
  ]

  return (
    <div className="space-y-10">
      <PageHeading>{t('drafting.heading')}</PageHeading>

      <section className="space-y-3">
        <SectionHeading>{t('drafting.budgetRoster')}</SectionHeading>
        <p className="max-w-3xl leading-relaxed text-ink/85">
          <RefText>
            {t('drafting.draftNote', {
              budget: money(r.budget),
              min: r.minPlayers,
              max: r.maxPlayers,
            })}
          </RefText>
        </p>
      </section>

      <section className="space-y-3">
        <SectionHeading>{t('drafting.staff')}</SectionHeading>
        <Table className="min-w-[32rem]">
          <Table.Header>
            <Table.Row>
              <Table.Head className="px-3">
                {t('drafting.cols.asset')}
              </Table.Head>
              <Table.Head className="px-3">
                {t('drafting.cols.cost')}
              </Table.Head>
              <Table.Head className="px-3">
                {t('drafting.cols.limit')}
              </Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {assets.map((a) => (
              <Table.Row key={a.key}>
                <Table.Cell className="px-3 font-headline font-semibold uppercase tracking-wide">
                  {a.label}
                </Table.Cell>
                <Table.Cell className="px-3 tabular-nums text-ink/85">
                  {a.cost}
                </Table.Cell>
                <Table.Cell className="px-3 text-ink/85">{a.limit}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <p className="max-w-3xl text-sm text-ink/70">
          {t('drafting.rerollNote')}
        </p>
      </section>

      <section className="space-y-3">
        <SectionHeading>{t('drafting.tv')}</SectionHeading>
        <p className="max-w-3xl leading-relaxed text-ink/85">
          <RefText>{t('drafting.tvNote')}</RefText>
        </p>
      </section>

      <section className="space-y-3">
        <SectionHeading>{t('drafting.gameDay')}</SectionHeading>
        <p className="max-w-3xl leading-relaxed text-ink/85">
          <RefText>{t('drafting.gameDayNote')}</RefText>
        </p>
      </section>
    </div>
  )
}
