import type {
  GlossaryTerm as RawGlossaryTerm,
  Inducement as RawInducement,
  Position as RawPosition,
  Skill as RawSkill,
  SpecialRule as RawSpecialRule,
  StarPlayer as RawStarPlayer,
  Team as RawTeam,
} from '@blitz/schema'

import type {
  GlossaryKey,
  InducementKey,
  SkillKey,
  SpecialRuleKey,
  StarPlayerKey,
  TeamKey,
} from './keys.gen'

/**
 * The reference-data types, refined from the `@blitz/schema` shapes so that keys
 * and cross-references are typed key unions (e.g. `SkillKey`) rather than bare
 * strings — a typo in code referencing the data is a compile error.
 */

/** A catalogue skill, trait or mutation. */
export type Skill = Omit<RawSkill, 'key'> & { key: SkillKey }

/** A rules-keyword glossary term. */
export type GlossaryTerm = Omit<RawGlossaryTerm, 'key'> & { key: GlossaryKey }

/** A team special rule (a league affiliation or a mechanical rule). */
export type SpecialRule = Omit<RawSpecialRule, 'key'> & { key: SpecialRuleKey }

/** A roster position; its starting skills are skill keys. */
export type Position = Omit<RawPosition, 'startingSkills'> & {
  startingSkills: SkillKey[]
}

/** A team roster; its special rules are special-rule keys. */
export type Team = Omit<RawTeam, 'key' | 'specialRules' | 'positions'> & {
  key: TeamKey
  specialRules: SpecialRuleKey[]
  positions: Position[]
}

/** A star player; its skills and `playsFor` are typed keys. */
export type StarPlayer = Omit<RawStarPlayer, 'key' | 'skills' | 'playsFor'> & {
  key: StarPlayerKey
  skills: SkillKey[]
  playsFor: SpecialRuleKey[]
}

/** An inducement; its `restrictedTo` rules are special-rule keys. */
export type Inducement = Omit<RawInducement, 'key' | 'restrictedTo'> & {
  key: InducementKey
  restrictedTo: SpecialRuleKey[]
}
