import { PAGE_REF_PREFIX, type PageRefKey } from '@blitz/schema'

/**
 * Where each `[[page:<key>]]` reference navigates within the codex. Weather
 * shares the kick-off page, which carries both tables.
 */
const PAGE_ROUTES = {
  teams: '/codex/teams',
  drafting: '/codex/drafting',
  skills: '/codex/skills',
  stars: '/codex/stars',
  inducements: '/codex/inducements',
  rules: '/codex/rules',
  kickoff: '/codex/kickoff',
  weather: '/codex/kickoff',
  injuries: '/codex/injuries',
  prayers: '/codex/prayers',
  glossary: '/codex/glossary',
  spp: '/codex/spp',
  rulebook: '/codex/rulebook',
} as const satisfies Record<PageRefKey, string>

/** A codex route a page reference points at — the union of valid link targets. */
export type PageLinkRoute = (typeof PAGE_ROUTES)[PageRefKey]

/**
 * The route a `[[page:<key>]]` reference navigates to, or `undefined` when the
 * key isn't a page reference (a plain drawer reference, handled elsewhere).
 */
export function pageLinkRoute(key: string): PageLinkRoute | undefined {
  if (!key.startsWith(PAGE_REF_PREFIX)) return undefined
  const slug = key.slice(PAGE_REF_PREFIX.length)
  return (PAGE_ROUTES as Record<string, PageLinkRoute>)[slug]
}
