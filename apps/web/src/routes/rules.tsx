import { specialRules, teamsForSpecialRule } from '@blitz/data'
import { DescriptionList, PageHeading, SectionHeading } from '@blitz/ui'

import { RefText } from '@/components/ref-text'
import { TeamChips } from '@/components/team-chips'

const GROUPS = [
  ['league', 'League affiliations'],
  ['special', 'Mechanical rules'],
] as const

/** The special-rules catalogue — league affiliations and mechanical team rules. */
export function RulesPage() {
  return (
    <div>
      <PageHeading>Special Rules</PageHeading>

      {GROUPS.map(([category, label]) => {
        const group = specialRules.filter((rule) => rule.category === category)
        return (
          <section key={category} className="mt-8">
            <SectionHeading tone="blood" bordered hint={`· ${group.length}`}>
              {label}
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
