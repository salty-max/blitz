import { type Team } from '@blitz/data'
import { Link } from '@tanstack/react-router'

import { Chip } from '@/components/ui'

/** A wrapped row of team chips, each linking to that team's roster page. */
export function TeamChips({ teams }: { teams: Team[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {teams.map((team) => (
        <Chip key={team.key} asChild interactive variant="outline">
          <Link to="/codex/teams/$key" params={{ key: team.key }}>
            {team.name}
          </Link>
        </Chip>
      ))}
    </div>
  )
}
