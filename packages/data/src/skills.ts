import { type Skill, skillSchema } from '@blitz/schema'

import data from './skills.json'

/**
 * The full Blood Bowl skill catalogue — General, Agility, Passing, Strength,
 * Mutations and Traits. Effects may carry `[[key]]` cross-references to other
 * skills or to glossary keywords.
 */
export const skills: Skill[] = skillSchema.array().parse(data)

const byKey = new Map(skills.map((skill) => [skill.key, skill]))

/** Look up a skill by its key, or `undefined` when there is no such skill. */
export function getSkill(key: string): Skill | undefined {
  return byKey.get(key)
}
