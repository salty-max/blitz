/**
 * Locale support for the reference data. The English catalogues are canonical;
 * a per-locale overlay supplies translated prose (names, effects, definitions)
 * for the keys it covers. Any key an overlay omits — or any locale that has no
 * overlay at all — falls back to English.
 */

/** The locales the reference data can be read in; `en` is canonical. */
export const DATA_LOCALES = ['en', 'fr'] as const

/** A locale the reference data can be read in. */
export type DataLocale = (typeof DATA_LOCALES)[number]

/** A catalogue's translations: one optional overlay map per non-English locale. */
export type Overlays<T extends { key: string }> = Partial<
  Record<DataLocale, Map<string, Partial<T>>>
>

/** Build a key→fields lookup from a locale overlay array. */
export function overlayMap<T extends { key: string }>(
  rows: readonly Partial<T>[]
): Map<string, Partial<T>> {
  const map = new Map<string, Partial<T>>()
  for (const row of rows) if (row.key) map.set(row.key, row)
  return map
}

/**
 * Apply a locale's overlay to a list of entities. English — or any locale with
 * no overlay — is the identity, so an unsupported locale safely reads English.
 */
export function localizeAll<T extends { key: string }>(
  items: readonly T[],
  overlay: Map<string, Partial<T>> | undefined,
  locale: DataLocale
): T[] {
  if (locale === 'en' || !overlay) return items as T[]
  return items.map((item) => {
    const fields = overlay.get(item.key)
    return fields ? { ...item, ...fields } : item
  })
}

/** Apply a locale's overlay to a single entity, or pass `undefined` through. */
export function localizeOne<T extends { key: string }>(
  item: T | undefined,
  overlay: Map<string, Partial<T>> | undefined,
  locale: DataLocale
): T | undefined {
  if (item === undefined || locale === 'en' || !overlay) return item
  const fields = overlay.get(item.key)
  return fields ? { ...item, ...fields } : item
}
