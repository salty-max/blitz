import { specialRules, teamsForSpecialRule } from '@blitz/data'
import { DescriptionList, DescriptionRow, SectionHeading } from '@blitz/ui'
import { Link } from '@tanstack/react-router'

import { chipClass } from '@/components/ref-chips'
import { RefText } from '@/components/ref-text'

const GROUPS = [
  ['league', 'League affiliations'],
  ['special', 'Mechanical rules'],
] as const

/** The special-rules catalogue — league affiliations and mechanical team rules. */
export function RulesPage() {
  return (
    <div>
      <h1 className="font-display text-5xl uppercase">Special Rules</h1>

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
                  <DescriptionRow key={rule.key} width="lg" term={rule.name}>
                    <RefText>{rule.effect}</RefText>
                    {ruleTeams.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {ruleTeams.map((team) => (
                          <Link
                            key={team.key}
                            to="/codex/teams/$key"
                            params={{ key: team.key }}
                            className={chipClass()}
                          >
                            {team.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </DescriptionRow>
                )
              })}
            </DescriptionList>
          </section>
        )
      })}
    </div>
  )
}
