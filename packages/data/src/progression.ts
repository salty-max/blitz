import { type Progression, progressionSchema } from '@blitz/schema'

import { type DataLocale } from './i18n'
import data from './locales/en/progression.json'
import { progressionOverlay } from './overlays'

/**
 * Player progression — how Star Player Points are earned and spent: the SPP
 * table, the advancement cost grid, the characteristic-improvement table, and
 * the value each advancement adds.
 */
export const progression: Progression = progressionSchema.parse(data)

function localizeRows<T extends { key: string }>(
  rows: T[],
  overlay: Map<string, Partial<T>> | undefined
): T[] {
  if (!overlay) return rows
  return rows.map((row) => {
    const fields = overlay.get(row.key)
    return fields ? { ...row, ...fields } : row
  })
}

/** The progression tables in the given locale (English when omitted). */
export function getProgression(locale: DataLocale = 'en'): Progression {
  const overlay = progressionOverlay[locale]
  if (locale === 'en' || !overlay) return progression
  return {
    sppActions: localizeRows(progression.sppActions, overlay.sppActions),
    advancementCosts: localizeRows(
      progression.advancementCosts,
      overlay.advancementCosts
    ),
    characteristicGains: localizeRows(
      progression.characteristicGains,
      overlay.characteristicGains
    ),
    valueIncreases: localizeRows(
      progression.valueIncreases,
      overlay.valueIncreases
    ),
  }
}
