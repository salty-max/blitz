import { kickoffEventSchema } from '@blitz/schema'

import { type DataLocale, localizeAll, localizeOne } from './i18n'
import data from './locales/en/kickoff-events.json'
import { kickoffEventOverlays as overlays } from './overlays'
import type { KickoffEvent } from './types'

/**
 * The Kick-off Event table (2D6) — what happens the moment the ball is kicked,
 * before the receiving team's first turn. Effects may carry `[[key]]` refs.
 */
export const kickoffEvents: KickoffEvent[] = kickoffEventSchema
  .array()
  .parse(data) as KickoffEvent[]

const byKey = new Map<string, KickoffEvent>(
  kickoffEvents.map((event) => [event.key, event])
)

/** The Kick-off Event table in the given locale (English when omitted). */
export function getKickoffEvents(locale: DataLocale = 'en'): KickoffEvent[] {
  return localizeAll(kickoffEvents, overlays[locale], locale)
}

/** Look up a kick-off event by its key in the given locale, or `undefined`. */
export function getKickoffEvent(
  key: string,
  locale: DataLocale = 'en'
): KickoffEvent | undefined {
  return localizeOne(byKey.get(key), overlays[locale], locale)
}
