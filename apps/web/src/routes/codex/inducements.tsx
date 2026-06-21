import {
  type DataLocale,
  getInducements,
  type Inducement,
  type Team,
  teamsForSpecialRule,
} from '@blitz/data'
import { useTranslation } from 'react-i18next'

import { TeamChips } from '@/components/team-chips'
import { useDataLocale } from '@/i18n/use-data-locale'
import { gp } from '@/lib/format'
import { RefChips } from '@/reference/ref-chips'
import { RefText } from '@/reference/ref-text'
import { DescriptionList, Field, PageHeading } from '@/ui'

/** The teams eligible for an inducement — those sharing one of its special rules. */
function teamsForInducement(
  inducement: Inducement,
  locale: DataLocale
): Team[] {
  const byKey = new Map<string, Team>()
  for (const rule of inducement.restrictedTo) {
    for (const team of teamsForSpecialRule(rule, locale)) {
      byKey.set(team.key, team)
    }
  }
  return [...byKey.values()]
}

/** The inducements catalogue — cost, limit, effect and eligibility per inducement. */
export function InducementsPage() {
  const { t } = useTranslation('codex')
  const locale = useDataLocale()
  return (
    <div>
      <PageHeading>{t('inducements.heading')}</PageHeading>

      <DescriptionList className="mt-6">
        {getInducements(locale).map((inducement) => (
          <DescriptionList.Row
            key={inducement.key}
            width="lg"
            className="py-3"
            term={
              <>
                <span className="block">{inducement.name}</span>
                <span className="block text-sm tabular-nums text-blood">
                  {t('inducements.costMax', {
                    cost: gp(inducement.cost),
                    max: inducement.max,
                  })}
                </span>
              </>
            }
          >
            <RefText>{inducement.effect}</RefText>
            {inducement.restrictedTo.length > 0 && (
              <div className="mt-2 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Field.Label>{t('inducements.restrictedTo')}</Field.Label>
                  <RefChips keys={inducement.restrictedTo} />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Field.Label>{t('inducements.teams')}</Field.Label>
                  <TeamChips teams={teamsForInducement(inducement, locale)} />
                </div>
              </div>
            )}
          </DescriptionList.Row>
        ))}
      </DescriptionList>
    </div>
  )
}
