import {
  type Inducement,
  inducements,
  type Team,
  teamsForSpecialRule,
} from '@blitz/data'
import { Link } from '@tanstack/react-router'

import { FieldLabel } from '@/components/field-label'
import { chipClass, RefChips } from '@/components/ref-chips'
import { RefText } from '@/components/ref-text'
import { gp } from '@/lib/format'

/** The teams eligible for an inducement — those sharing one of its special rules. */
function teamsForInducement(inducement: Inducement): Team[] {
  const byKey = new Map<string, Team>()
  for (const rule of inducement.restrictedTo) {
    for (const team of teamsForSpecialRule(rule)) byKey.set(team.key, team)
  }
  return [...byKey.values()]
}

/** The inducements catalogue — cost, limit, effect and eligibility per inducement. */
export function InducementsPage() {
  return (
    <div>
      <h1 className="font-display text-5xl uppercase">Inducements</h1>

      <dl className="mt-6 divide-y divide-ink/10">
        {inducements.map((inducement) => (
          <div
            key={inducement.key}
            className="grid gap-1 py-3 sm:grid-cols-[14rem_1fr] sm:gap-4"
          >
            <dt>
              <span className="block font-headline text-lg font-semibold uppercase tracking-wide">
                {inducement.name}
              </span>
              <span className="font-headline text-sm font-semibold uppercase tracking-wide tabular-nums text-blood">
                {gp(inducement.cost)} · max {inducement.max}
              </span>
            </dt>
            <dd className="text-ink/85">
              <RefText>{inducement.effect}</RefText>
              {inducement.restrictedTo.length > 0 && (
                <div className="mt-2 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <FieldLabel>Restricted to</FieldLabel>
                    <RefChips keys={inducement.restrictedTo} />
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <FieldLabel>Teams</FieldLabel>
                    <div className="flex flex-wrap gap-1.5">
                      {teamsForInducement(inducement).map((team) => (
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
                  </div>
                </div>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
