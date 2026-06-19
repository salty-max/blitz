import { specialRuleSchema } from '@blitz/schema'

import data from './special-rules.json'
import type { SpecialRule } from './types'

/**
 * The team special rules — league affiliations (which gate star-player and
 * inducement eligibility) and mechanical team rules. Teams, star players and
 * inducements reference these by key.
 */
export const specialRules: SpecialRule[] = specialRuleSchema
  .array()
  .parse(data) as SpecialRule[]

const byKey = new Map<string, SpecialRule>(
  specialRules.map((rule) => [rule.key, rule])
)
const byName = new Map<string, SpecialRule>(
  specialRules.map((rule) => [rule.name, rule])
)

/** Look up a special rule by its key or its name, or `undefined` when there is none. */
export function getSpecialRule(keyOrName: string): SpecialRule | undefined {
  return byKey.get(keyOrName) ?? byName.get(keyOrName)
}
