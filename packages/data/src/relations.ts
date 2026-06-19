import { inducements } from './inducements'
import type { SpecialRuleKey } from './keys.gen'
import { getSkill } from './skills'
import { getSpecialRule } from './special-rules'
import { starPlayers } from './star-players'
import { teams } from './teams'
import type {
  Inducement,
  Position,
  Skill,
  SpecialRule,
  StarPlayer,
  Team,
} from './types'

const isSkill = (skill: Skill | undefined): skill is Skill =>
  skill !== undefined
const isRule = (rule: SpecialRule | undefined): rule is SpecialRule =>
  rule !== undefined

const ruleKey = (rule: SpecialRule | SpecialRuleKey): SpecialRuleKey =>
  typeof rule === 'string' ? rule : rule.key

/** Resolve a position's starting-skill keys to the skill objects. */
export function positionSkills(position: Position): Skill[] {
  return position.startingSkills.map((key) => getSkill(key)).filter(isSkill)
}

/** Resolve a star player's skill keys to the skill objects. */
export function starSkills(star: StarPlayer): Skill[] {
  return star.skills.map((key) => getSkill(key)).filter(isSkill)
}

/** Resolve a team's special-rule keys to the special-rule objects. */
export function teamSpecialRules(team: Team): SpecialRule[] {
  return team.specialRules.map((key) => getSpecialRule(key)).filter(isRule)
}

/** The teams that carry a given special rule. */
export function teamsForSpecialRule(
  rule: SpecialRule | SpecialRuleKey
): Team[] {
  const key = ruleKey(rule)
  return teams.filter((team) => team.specialRules.includes(key))
}

/** The star players a team may hire — those it shares a special rule with, plus the universal ones (empty `playsFor`). */
export function starsForTeam(team: Team): StarPlayer[] {
  const rules = new Set<string>(team.specialRules)
  return starPlayers.filter(
    (star) =>
      star.playsFor.length === 0 || star.playsFor.some((r) => rules.has(r))
  )
}

/** The teams that may hire a given star player. */
export function teamsForStar(star: StarPlayer): Team[] {
  if (star.playsFor.length === 0) return [...teams]
  const rules = new Set<string>(star.playsFor)
  return teams.filter((team) => team.specialRules.some((r) => rules.has(r)))
}

/** The inducements a team may buy — the unrestricted ones plus any matching a special rule. */
export function inducementsForTeam(team: Team): Inducement[] {
  const rules = new Set<string>(team.specialRules)
  return inducements.filter(
    (inducement) =>
      inducement.restrictedTo.length === 0 ||
      inducement.restrictedTo.some((r) => rules.has(r))
  )
}
