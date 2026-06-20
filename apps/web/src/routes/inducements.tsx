import {
  type Inducement,
  inducements,
  type Team,
  teamsForSpecialRule,
} from '@blitz/data'
import { DescriptionList, Field, PageHeading } from '@blitz/ui'

import { RefChips } from '@/components/ref-chips'
import { RefText } from '@/components/ref-text'
import { TeamChips } from '@/components/team-chips'
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
      <PageHeading>Inducements</PageHeading>

      <DescriptionList className="mt-6">
        {inducements.map((inducement) => (
          <DescriptionList.Row
            key={inducement.key}
            width="lg"
            className="py-3"
            term={
              <>
                <span className="block">{inducement.name}</span>
                <span className="block text-sm tabular-nums text-blood">
                  {gp(inducement.cost)} · max {inducement.max}
                </span>
              </>
            }
          >
            <RefText>{inducement.effect}</RefText>
            {inducement.restrictedTo.length > 0 && (
              <div className="mt-2 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Field.Label>Restricted to</Field.Label>
                  <RefChips keys={inducement.restrictedTo} />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Field.Label>Teams</Field.Label>
                  <TeamChips teams={teamsForInducement(inducement)} />
                </div>
              </div>
            )}
          </DescriptionList.Row>
        ))}
      </DescriptionList>
    </div>
  )
}
