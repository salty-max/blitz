import { type SpecialRule, specialRuleSchema } from '@blitz/schema'

import data from './special-rules.json'

/**
 * The team special rules — league affiliations (which gate star-player and
 * inducement eligibility) and mechanical team rules. Teams, star players and
 * inducements reference these by `name`.
 */
export const specialRules: SpecialRule[] = specialRuleSchema.array().parse(data)

const byKey = new Map(specialRules.map((rule) => [rule.key, rule]))
const byName = new Map(specialRules.map((rule) => [rule.name, rule]))

/** Look up a special rule by its key or its name, or `undefined` when there is none. */
export function getSpecialRule(keyOrName: string): SpecialRule | undefined {
  return byKey.get(keyOrName) ?? byName.get(keyOrName)
}
