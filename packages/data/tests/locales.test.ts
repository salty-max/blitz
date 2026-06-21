import {
  casualties,
  getGlossaryTerm,
  getSkill,
  getTeam,
  glossary,
  inducements,
  injuries,
  lastingInjuries,
  prayers,
  skills,
  specialRules,
  starAbilities,
  teams,
} from '@blitz/data'
import { refKeys } from '@blitz/schema'
import { describe, expect, test } from 'bun:test'

import frCasualties from '../src/locales/fr/casualties.json'
import frGlossary from '../src/locales/fr/glossary.json'
import frInducements from '../src/locales/fr/inducements.json'
import frInjuries from '../src/locales/fr/injuries.json'
import frLasting from '../src/locales/fr/lasting-injuries.json'
import frPrayers from '../src/locales/fr/prayers.json'
import frSkills from '../src/locales/fr/skills.json'
import frRules from '../src/locales/fr/special-rules.json'
import frAbilities from '../src/locales/fr/star-abilities.json'
import frTeams from '../src/locales/fr/teams.json'

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
    {
      name: 'inducements',
      rows: frInducements as Overlay,
      english: inducements,
    },
    { name: 'casualties', rows: frCasualties as Overlay, english: casualties },
    { name: 'injuries', rows: frInjuries as Overlay, english: injuries },
    {
      name: 'lasting injuries',
      rows: frLasting as Overlay,
      english: lastingInjuries,
    },
    { name: 'prayers', rows: frPrayers as Overlay, english: prayers },
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

  test('teams: the fr overlay covers every team and position key', () => {
    const overlay = frTeams as ReadonlyArray<{
      key: string
      positions?: { key: string }[]
    }>
    const byKey = new Map(overlay.map((t) => [t.key, t]))
    expect([...byKey.keys()].sort()).toEqual(
      [...teams.map((t) => t.key)].sort()
    )
    const missing: string[] = []
    for (const team of teams) {
      const positions = byKey.get(team.key)?.positions ?? []
      const covered = new Set(positions.map((p) => p.key))
      for (const position of team.positions) {
        if (!covered.has(position.key))
          missing.push(`${team.key}/${position.key}`)
      }
    }
    expect(missing).toEqual([])
  })

  test('accessors return French prose for fr and English for en', () => {
    expect(getSkill('block', 'en')?.name).toBe('Block')
    expect(getSkill('block', 'fr')?.name).toBe('Blocage')
    expect(getGlossaryTerm('tackle-zone', 'en')?.term).toBe('Tackle Zone')
    expect(getGlossaryTerm('tackle-zone', 'fr')?.term).toBe('Zone de Tacle')
    expect(getTeam('amazon', 'en')?.name).toBe('Amazon')
    expect(getTeam('amazon', 'fr')?.name).toBe('Amazones')
    expect(getSkill('not-a-skill', 'fr')).toBeUndefined()
  })
})
