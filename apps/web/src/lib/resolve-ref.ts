import {
  getGlossaryTerm,
  getSkill,
  getSpecialRule,
  getStarAbility,
} from '@blitz/data'

/** The category of a reference, used to colour-code it inline and in the drawer. */
export type RefTone = 'skill' | 'term' | 'rule' | 'star'

/** A reference resolved to a uniform shape the drawer can render. */
export interface ResolvedRef {
  key: string
  /** Human label for the kind of entry, e.g. `Skill`, `Rules term`. */
  kind: string
  name: string
  /** The body text (effect / definition); may itself contain `[[key]]` refs. */
  body: string
  /** Optional sub-label, e.g. a skill's category. */
  meta?: string
  /** Category used to pick the reference's colour. */
  tone: RefTone
}

const SKILL_CATEGORY: Record<string, string> = {
  general: 'General skill',
  agility: 'Agility skill',
  passing: 'Passing skill',
  strength: 'Strength skill',
  devious: 'Devious skill',
  mutation: 'Mutation',
  trait: 'Trait',
}

/**
 * Resolve a `[[key]]` reference across the data catalogues (skill, glossary
 * term, special rule, star ability), or `undefined` when nothing matches.
 */
export function resolveRef(key: string): ResolvedRef | undefined {
  const skill = getSkill(key)
  if (skill) {
    return {
      key,
      kind: 'Skill',
      name: skill.name,
      body: skill.effect,
      meta: SKILL_CATEGORY[skill.category] ?? skill.category,
      tone: 'skill',
    }
  }
  const term = getGlossaryTerm(key)
  if (term) {
    return {
      key,
      kind: 'Rules term',
      name: term.term,
      body: term.definition,
      tone: 'term',
    }
  }
  const rule = getSpecialRule(key)
  if (rule) {
    return {
      key,
      kind: rule.category === 'league' ? 'League' : 'Special rule',
      name: rule.name,
      body: rule.effect,
      tone: 'rule',
    }
  }
  const ability = getStarAbility(key)
  if (ability) {
    return {
      key,
      kind: 'Star ability',
      name: ability.name,
      body: ability.effect,
      tone: 'star',
    }
  }
  return undefined
}
