import {
  getGlossaryTerm,
  getSkill,
  glossary,
  skills,
  specialRules,
  starAbilities,
} from '@blitz/data'
import { refKeys } from '@blitz/schema'
import { describe, expect, test } from 'bun:test'

import frGlossary from '../src/locales/fr/glossary.json'
import frSkills from '../src/locales/fr/skills.json'
import frRules from '../src/locales/fr/special-rules.json'
import frAbilities from '../src/locales/fr/star-abilities.json'

/** Every key a `[[ref]]` may legitimately point at. */
const known = new Set<string>([
  ...skills.map((s) => s.key),
  ...glossary.map((g) => g.key),
  ...specialRules.map((r) => r.key),
  ...starAbilities.map((a) => a.key),
])

type Overlay = ReadonlyArray<{
  key: string
  effect?: string
  definition?: string
}>

const overlays: { name: string; rows: Overlay; english: { key: string }[] }[] =
  [
    { name: 'skills', rows: frSkills as Overlay, english: skills },
    { name: 'glossary', rows: frGlossary as Overlay, english: glossary },
    { name: 'special rules', rows: frRules as Overlay, english: specialRules },
    {
      name: 'star abilities',
      rows: frAbilities as Overlay,
      english: starAbilities,
    },
  ]

describe('French data overlays', () => {
  for (const { name, rows, english } of overlays) {
    test(`${name}: the fr overlay covers exactly the English keys`, () => {
      const en = [...english.map((e) => e.key)].sort()
      const fr = [...rows.map((r) => r.key)].sort()
      expect(fr).toEqual(en)
    })

    test(`${name}: every translated cross-reference resolves`, () => {
      const dangling: string[] = []
      for (const row of rows) {
        for (const key of refKeys(row.effect ?? row.definition ?? '')) {
          if (!known.has(key)) dangling.push(`${row.key} → ${key}`)
        }
      }
      expect(dangling).toEqual([])
    })
  }

  test('accessors return French prose for fr and English for en', () => {
    expect(getSkill('block', 'en')?.name).toBe('Block')
    expect(getSkill('block', 'fr')?.name).toBe('Blocage')
    expect(getGlossaryTerm('tackle-zone', 'en')?.term).toBe('Tackle Zone')
    expect(getGlossaryTerm('tackle-zone', 'fr')?.term).toBe('Zone de Tacle')
    expect(getSkill('not-a-skill', 'fr')).toBeUndefined()
  })
})
