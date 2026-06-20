import type {
  Casualty as RawCasualty,
  GlossaryTerm as RawGlossaryTerm,
  Inducement as RawInducement,
  Position as RawPosition,
  Prayer as RawPrayer,
  Skill as RawSkill,
  SpecialRule as RawSpecialRule,
  StarAbility as RawStarAbility,
  StarPlayer as RawStarPlayer,
  Team as RawTeam,
} from '@blitz/schema'

import type {
  CasualtyKey,
  GlossaryKey,
  InducementKey,
  PrayerKey,
  SkillKey,
  SpecialRuleKey,
  StarAbilityKey,
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

/** A star player's unique special ability. */
export type StarAbility = Omit<RawStarAbility, 'key'> & { key: StarAbilityKey }

/** A star player; its skills, `playsFor` and `abilities` are typed keys. */
export type StarPlayer = Omit<
  RawStarPlayer,
  'key' | 'skills' | 'playsFor' | 'abilities'
> & {
  key: StarPlayerKey
  skills: SkillKey[]
  playsFor: SpecialRuleKey[]
  abilities: StarAbilityKey[]
}

/** An inducement; its `restrictedTo` rules are special-rule keys. */
export type Inducement = Omit<RawInducement, 'key' | 'restrictedTo'> & {
  key: InducementKey
  restrictedTo: SpecialRuleKey[]
}

/** A Casualty-table result. */
export type Casualty = Omit<RawCasualty, 'key'> & { key: CasualtyKey }

/** A Prayers to Nuffle result. */
export type Prayer = Omit<RawPrayer, 'key'> & { key: PrayerKey }
