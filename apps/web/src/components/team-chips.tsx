import { type Team } from '@blitz/data'
import { Link } from '@tanstack/react-router'

import { chipClass } from '@/components/ref-chips'

/** A wrapped row of team chips, each linking to that team's roster page. */
export function TeamChips({ teams }: { teams: Team[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {teams.map((team) => (
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
  )
}
