import { weatherSchema } from '@blitz/schema'

import { type DataLocale, localizeAll, localizeOne } from './i18n'
import data from './locales/en/weather.json'
import { weatherOverlays as overlays } from './overlays'
import type { Weather } from './types'

/**
 * The Weather table (2D6) — the conditions for the drive, re-rolled by the
 * Changing Weather kick-off event. Effects may carry `[[key]]` refs.
 */
export const weather: Weather[] = weatherSchema.array().parse(data) as Weather[]

const byKey = new Map<string, Weather>(
  weather.map((entry) => [entry.key, entry])
)

/** The Weather table in the given locale (English when omitted). */
export function getWeather(locale: DataLocale = 'en'): Weather[] {
  return localizeAll(weather, overlays[locale], locale)
}

/** Look up a weather result by its key in the given locale, or `undefined`. */
export function getWeatherResult(
  key: string,
  locale: DataLocale = 'en'
): Weather | undefined {
  return localizeOne(byKey.get(key), overlays[locale], locale)
}
