import { skillSchema } from '@blitz/schema'

import { type DataLocale, localizeAll, localizeOne, overlayMap } from './i18n'
import frData from './locales/fr/skills.json'
import data from './skills.json'
import type { Skill } from './types'

/**
 * The full Blood Bowl skill catalogue — General, Agility, Passing, Strength,
 * Mutations and Traits. Effects may carry `[[key]]` cross-references to other
 * skills or to glossary keywords.
 */
export const skills: Skill[] = skillSchema.array().parse(data) as Skill[]

const byKey = new Map<string, Skill>(skills.map((skill) => [skill.key, skill]))
const frOverlay = overlayMap<Skill>(frData as unknown as Partial<Skill>[])

/** The full skill catalogue in the given locale (English when omitted). */
export function getSkills(locale: DataLocale = 'en'): Skill[] {
  return localizeAll(skills, frOverlay, locale)
}

/** Look up a skill by its key in the given locale, or `undefined`. */
export function getSkill(
  key: string,
  locale: DataLocale = 'en'
): Skill | undefined {
  return localizeOne(byKey.get(key), frOverlay, locale)
}
