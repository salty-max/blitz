import { type DataLocale } from './i18n'
import { getInducements } from './inducements'
import type { SpecialRuleKey } from './keys.gen'
import { getSkill } from './skills'
import { getSpecialRule } from './special-rules'
import { getStarAbility } from './star-abilities'
import { starPlayers } from './star-players'
import { getTeams } from './teams'
import type {
  Inducement,
  Position,
  Skill,
  SpecialRule,
  StarAbility,
  StarPlayer,
  Team,
} from './types'

const isSkill = (skill: Skill | undefined): skill is Skill =>
  skill !== undefined
const isRule = (rule: SpecialRule | undefined): rule is SpecialRule =>
  rule !== undefined
const isAbility = (ability: StarAbility | undefined): ability is StarAbility =>
  ability !== undefined

const ruleKey = (rule: SpecialRule | SpecialRuleKey): SpecialRuleKey =>
  typeof rule === 'string' ? rule : rule.key

/** Resolve a position's starting-skill keys to the skill objects. */
export function positionSkills(
  position: Position,
  locale: DataLocale = 'en'
): Skill[] {
  return position.startingSkills
    .map((key) => getSkill(key, locale))
    .filter(isSkill)
}

/** Resolve a star player's skill keys to the skill objects. */
export function starSkills(
  star: StarPlayer,
  locale: DataLocale = 'en'
): Skill[] {
  return star.skills.map((key) => getSkill(key, locale)).filter(isSkill)
}

/** Resolve a star player's ability keys to the ability objects. */
export function abilitiesOf(
  star: StarPlayer,
  locale: DataLocale = 'en'
): StarAbility[] {
  return star.abilities
    .map((key) => getStarAbility(key, locale))
    .filter(isAbility)
}

/** Resolve a team's special-rule keys to the special-rule objects. */
export function teamSpecialRules(
  team: Team,
  locale: DataLocale = 'en'
): SpecialRule[] {
  return team.specialRules
    .map((key) => getSpecialRule(key, locale))
    .filter(isRule)
}

/** The teams that carry a given special rule. */
export function teamsForSpecialRule(
  rule: SpecialRule | SpecialRuleKey,
  locale: DataLocale = 'en'
): Team[] {
  const key = ruleKey(rule)
  return getTeams(locale).filter((team) => team.specialRules.includes(key))
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
export function teamsForStar(
  star: StarPlayer,
  locale: DataLocale = 'en'
): Team[] {
  if (star.playsFor.length === 0) return [...getTeams(locale)]
  const rules = new Set<string>(star.playsFor)
  return getTeams(locale).filter((team) =>
    team.specialRules.some((r) => rules.has(r))
  )
}

/** The inducements a team may buy — the unrestricted ones plus any matching a special rule. */
export function inducementsForTeam(
  team: Team,
  locale: DataLocale = 'en'
): Inducement[] {
  const rules = new Set<string>(team.specialRules)
  return getInducements(locale).filter(
    (inducement) =>
      inducement.restrictedTo.length === 0 ||
      inducement.restrictedTo.some((r) => rules.has(r))
  )
}
