import {
  getGlossaryTerm,
  getSkill,
  getSpecialRule,
  getStarAbility,
  type Skill,
} from '@blitz/data'

/** The category of a reference, used to colour-code it inline and in the drawer. */
export type RefTone = 'skill' | 'term' | 'rule' | 'star'

/** The kind of entry a reference points at — a key into the `ref.kind` catalogue. */
export type RefKind =
  | 'skill'
  | 'rulesTerm'
  | 'league'
  | 'specialRule'
  | 'starAbility'

/** A reference resolved to a uniform shape the drawer can render. */
export interface ResolvedRef {
  key: string
  /** The kind of entry, as a `ref.kind` translation key. */
  kind: RefKind
  name: string
  /** The body text (effect / definition); may itself contain `[[key]]` refs. */
  body: string
  /** A skill's category key, for skills only — the drawer localizes it. */
  category?: Skill['category']
  /** Category used to pick the reference's colour. */
  tone: RefTone
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
      kind: 'skill',
      name: skill.name,
      body: skill.effect,
      category: skill.category,
      tone: 'skill',
    }
  }
  const term = getGlossaryTerm(key)
  if (term) {
    return {
      key,
      kind: 'rulesTerm',
      name: term.term,
      body: term.definition,
      tone: 'term',
    }
  }
  const rule = getSpecialRule(key)
  if (rule) {
    return {
      key,
      kind: rule.category === 'league' ? 'league' : 'specialRule',
      name: rule.name,
      body: rule.effect,
      tone: 'rule',
    }
  }
  const ability = getStarAbility(key)
  if (ability) {
    return {
      key,
      kind: 'starAbility',
      name: ability.name,
      body: ability.effect,
      tone: 'star',
    }
  }
  return undefined
}
