import { specialRules, teamsForSpecialRule } from '@blitz/data'
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
            <h2 className="flex items-baseline gap-2 border-b-2 border-ink pb-1 font-display text-3xl uppercase text-blood">
              {label}
              <span className="font-headline text-base font-semibold text-ink/40">
                · {group.length}
              </span>
            </h2>
            <dl className="mt-3 divide-y divide-ink/10">
              {group.map((rule) => {
                const ruleTeams = teamsForSpecialRule(rule)
                return (
                  <div
                    key={rule.key}
                    className="grid gap-1 py-2.5 sm:grid-cols-[14rem_1fr] sm:gap-4"
                  >
                    <dt className="font-headline text-lg font-semibold uppercase tracking-wide">
                      {rule.name}
                    </dt>
                    <dd className="text-ink/85">
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
                    </dd>
                  </div>
                )
              })}
            </dl>
          </section>
        )
      })}
    </div>
  )
}
