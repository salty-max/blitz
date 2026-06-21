import { type DataLocale, overlayMap, type Overlays } from './i18n'
import frCasualties from './locales/fr/casualties.json'
import frGlossary from './locales/fr/glossary.json'
import frInducements from './locales/fr/inducements.json'
import frInjuries from './locales/fr/injuries.json'
import frKickoffEvents from './locales/fr/kickoff-events.json'
import frLastingInjuries from './locales/fr/lasting-injuries.json'
import frPrayers from './locales/fr/prayers.json'
import frSkills from './locales/fr/skills.json'
import frSpecialRules from './locales/fr/special-rules.json'
import frStarAbilities from './locales/fr/star-abilities.json'
import frTeams from './locales/fr/teams.json'
import frWeather from './locales/fr/weather.json'
import type {
  Casualty,
  GlossaryTerm,
  Inducement,
  Injury,
  KickoffEvent,
  LastingInjury,
  Prayer,
  Skill,
  SpecialRule,
  StarAbility,
  Weather,
} from './types'

/**
 * Translation overlays for the reference catalogues, registered in one place.
 * Adding a language is done here (plus dropping its `locales/<lang>/*.json`
 * files) — the loaders consume these maps and never change. Each catalogue
 * lists its rows per non-English locale.
 */
function build<T extends { key: string }>(
  byLocale: Partial<Record<DataLocale, readonly { key: string }[]>>
): Overlays<T> {
  const out: Overlays<T> = {}
  for (const locale of Object.keys(byLocale) as DataLocale[]) {
    const rows = byLocale[locale]
    if (rows) out[locale] = overlayMap(rows as readonly Partial<T>[])
  }
  return out
}

export const skillOverlays = build<Skill>({ fr: frSkills })
export const glossaryOverlays = build<GlossaryTerm>({ fr: frGlossary })
export const specialRuleOverlays = build<SpecialRule>({ fr: frSpecialRules })
export const starAbilityOverlays = build<StarAbility>({ fr: frStarAbilities })
export const inducementOverlays = build<Inducement>({ fr: frInducements })
export const casualtyOverlays = build<Casualty>({ fr: frCasualties })
export const injuryOverlays = build<Injury>({ fr: frInjuries })
export const lastingInjuryOverlays = build<LastingInjury>({
  fr: frLastingInjuries,
})
export const prayerOverlays = build<Prayer>({ fr: frPrayers })
export const kickoffEventOverlays = build<KickoffEvent>({ fr: frKickoffEvents })
export const weatherOverlays = build<Weather>({ fr: frWeather })

/** A team's locale overlay — its name, optional description and position names. */
export type TeamOverlay = {
  key: string
  name?: string
  description?: string
  positions?: { key: string; name: string }[]
}

export const teamOverlays: Partial<
  Record<DataLocale, Map<string, TeamOverlay>>
> = {
  fr: new Map(
    (frTeams as unknown as TeamOverlay[]).map((team) => [team.key, team])
  ),
}
