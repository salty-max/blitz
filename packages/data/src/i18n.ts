/**
 * Locale support for the reference data. The English catalogues are canonical;
 * a locale overlay supplies translated prose (names, effects, definitions) for
 * the keys it covers, and any key it omits falls back to English.
 */

/** The locales the reference data ships prose translations for. */
export type DataLocale = 'en' | 'fr'

/** Build a key→fields lookup from a locale overlay array. */
export function overlayMap<T extends { key: string }>(
  rows: readonly Partial<T>[]
): Map<string, Partial<T>> {
  const map = new Map<string, Partial<T>>()
  for (const row of rows) if (row.key) map.set(row.key, row)
  return map
}

/** Apply a locale overlay to a list of entities; English is the identity. */
export function localizeAll<T extends { key: string }>(
  items: readonly T[],
  overlay: Map<string, Partial<T>>,
  locale: DataLocale
): T[] {
  if (locale === 'en') return items as T[]
  return items.map((item) => {
    const fields = overlay.get(item.key)
    return fields ? { ...item, ...fields } : item
  })
}

/** Apply a locale overlay to a single entity, or pass `undefined` through. */
export function localizeOne<T extends { key: string }>(
  item: T | undefined,
  overlay: Map<string, Partial<T>>,
  locale: DataLocale
): T | undefined {
  if (item === undefined || locale === 'en') return item
  const fields = overlay.get(item.key)
  return fields ? { ...item, ...fields } : item
}
