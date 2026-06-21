import { specialRules, teamsForSpecialRule } from '@blitz/data'
import { useTranslation } from 'react-i18next'

import { TeamChips } from '@/components/team-chips'
import { RefText } from '@/reference/ref-text'
import { DescriptionList, PageHeading, SectionHeading } from '@/ui'

const GROUPS = ['league', 'special'] as const

/** The special-rules catalogue — league affiliations and mechanical team rules. */
export function RulesPage() {
  const { t } = useTranslation('codex')

  return (
    <div>
      <PageHeading>{t('rules.heading')}</PageHeading>

      {GROUPS.map((category) => {
        const group = specialRules.filter((rule) => rule.category === category)
        return (
          <section key={category} className="mt-8">
            <SectionHeading tone="blood" bordered hint={`· ${group.length}`}>
              {t(`rules.groups.${category}`)}
            </SectionHeading>
            <DescriptionList className="mt-3">
              {group.map((rule) => {
                const ruleTeams = teamsForSpecialRule(rule)
                return (
                  <DescriptionList.Row
                    key={rule.key}
                    width="lg"
                    term={rule.name}
                  >
                    <RefText>{rule.effect}</RefText>
                    {ruleTeams.length > 0 && (
                      <div className="mt-2">
                        <TeamChips teams={ruleTeams} />
                      </div>
                    )}
                  </DescriptionList.Row>
                )
              })}
            </DescriptionList>
          </section>
        )
      })}
    </div>
  )
}
