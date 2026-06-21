import { ruleTopicSchema } from '@blitz/schema'

import { type DataLocale } from './i18n'
import data from './locales/en/rule-topics.json'
import { ruleTopicOverlays as overlays } from './overlays'
import type { RuleTopic } from './types'

/**
 * The rulebook — the core rules modelled as topics (turn structure, the drive,
 * blocking, passing, …), each an ordered list of prose sections whose bodies
 * carry `[[key]]` cross-references into the rest of the codex.
 */
export const ruleTopics: RuleTopic[] = ruleTopicSchema
  .array()
  .parse(data) as RuleTopic[]

const byKey = new Map<string, RuleTopic>(
  ruleTopics.map((topic) => [topic.key, topic])
)

/** Merge a topic's overlay — its title, summary and per-section heading/body. */
function localizeTopic(topic: RuleTopic, locale: DataLocale): RuleTopic {
  if (locale === 'en') return topic
  const tr = overlays[locale]?.get(topic.key)
  if (!tr) return topic
  const sections = new Map((tr.sections ?? []).map((s) => [s.key, s]))
  return {
    ...topic,
    title: tr.title ?? topic.title,
    summary: tr.summary ?? topic.summary,
    sections: topic.sections.map((section) => {
      const t = sections.get(section.key)
      return t
        ? {
            ...section,
            heading: t.heading ?? section.heading,
            body: t.body ?? section.body,
          }
        : section
    }),
  }
}

/** Every rulebook topic in the given locale (English when omitted). */
export function getRuleTopics(locale: DataLocale = 'en'): RuleTopic[] {
  return locale === 'en'
    ? ruleTopics
    : ruleTopics.map((topic) => localizeTopic(topic, locale))
}

/** Look up a rulebook topic by its key in the given locale, or `undefined`. */
export function getRuleTopic(
  key: string,
  locale: DataLocale = 'en'
): RuleTopic | undefined {
  const topic = byKey.get(key)
  return topic ? localizeTopic(topic, locale) : undefined
}
