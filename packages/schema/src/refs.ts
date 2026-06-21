/** A run of plain text, or a `[[key]]` cross-reference to another entry. */
export type RefSegment =
  | { kind: 'text'; text: string }
  | { kind: 'ref'; key: string; label?: string }

const REF_PATTERN = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g

/**
 * Split text into plain runs and `[[key]]` / `[[key|label]]` cross-references, so
 * a renderer can turn each reference into a link — a tooltip in body text, or a
 * navigable push in the codex sheet. The display label defaults to the
 * referenced entry's name (resolved by the caller) unless an explicit one is
 * given.
 */
export function parseRefs(text: string): RefSegment[] {
  const segments: RefSegment[] = []
  let cursor = 0
  for (const match of text.matchAll(REF_PATTERN)) {
    const start = match.index ?? cursor
    if (start > cursor) {
      segments.push({ kind: 'text', text: text.slice(cursor, start) })
    }
    const [, key, label] = match
    segments.push({
      kind: 'ref',
      key: key.trim(),
      ...(label ? { label: label.trim() } : {}),
    })
    cursor = start + match[0].length
  }
  if (cursor < text.length) {
    segments.push({ kind: 'text', text: text.slice(cursor) })
  }
  return segments
}

/** The distinct cross-reference keys mentioned in a string, for integrity checks. */
export function refKeys(text: string): string[] {
  return [
    ...new Set([...text.matchAll(REF_PATTERN)].map((match) => match[1].trim())),
  ]
}

/**
 * Codex pages that prose may link to with a `[[page:<key>]]` reference. Unlike a
 * plain `[[key]]` (which opens an entry in the drawer), a page reference
 * navigates — used to point at a dedicated table page instead of repeating it.
 */
export const PAGE_REF_KEYS = [
  'teams',
  'skills',
  'stars',
  'inducements',
  'rules',
  'kickoff',
  'weather',
  'injuries',
  'prayers',
  'glossary',
  'spp',
  'rulebook',
] as const
export type PageRefKey = (typeof PAGE_REF_KEYS)[number]

/** The prefix marking a reference as a codex-page link rather than a drawer entry. */
export const PAGE_REF_PREFIX = 'page:'

/** The fully-qualified `page:`-prefixed keys, for cross-reference integrity checks. */
export const pageRefKeys: string[] = PAGE_REF_KEYS.map(
  (key) => `${PAGE_REF_PREFIX}${key}`
)
