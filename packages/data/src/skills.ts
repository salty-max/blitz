import { skillSchema } from '@blitz/schema'

import { type DataLocale, localizeAll, localizeOne } from './i18n'
import data from './locales/en/skills.json'
import { skillOverlays as overlays } from './overlays'
import type { Skill } from './types'

/**
 * The full Blood Bowl skill catalogue — General, Agility, Passing, Strength,
 * Mutations and Traits. Effects may carry `[[key]]` cross-references to other
 * skills or to glossary keywords.
 */
export const skills: Skill[] = skillSchema.array().parse(data) as Skill[]

const byKey = new Map<string, Skill>(skills.map((skill) => [skill.key, skill]))

/** The full skill catalogue in the given locale (English when omitted). */
export function getSkills(locale: DataLocale = 'en'): Skill[] {
  return localizeAll(skills, overlays[locale], locale)
}

/** Look up a skill by its key in the given locale, or `undefined`. */
export function getSkill(
  key: string,
  locale: DataLocale = 'en'
): Skill | undefined {
  return localizeOne(byKey.get(key), overlays[locale], locale)
}
