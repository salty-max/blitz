import { getGlossaryTerm, getSkill, glossary, skills } from '@blitz/data'
import { refKeys } from '@blitz/schema'
import { describe, expect, test } from 'bun:test'

describe('skill & keyword catalogue', () => {
  test('the skill catalogue loads and resolves by key', () => {
    expect(skills.length).toBeGreaterThan(80)
    expect(getSkill('block')?.name).toBe('Block')
    expect(getSkill('block')?.category).toBe('general')
    expect(getSkill('sneaky-git')?.category).toBe('devious')
    expect(getSkill('not-a-skill')).toBeUndefined()
  })

  test('the glossary loads and resolves by key', () => {
    expect(glossary.length).toBeGreaterThan(10)
    expect(getGlossaryTerm('tackle-zone')?.term).toBe('Tackle Zone')
    expect(getGlossaryTerm('not-a-term')).toBeUndefined()
  })

  test('keys are unique across skills and the glossary', () => {
    const keys = [...skills.map((s) => s.key), ...glossary.map((g) => g.key)]
    expect(new Set(keys).size).toBe(keys.length)
  })

  test('every cross-reference resolves to a known entry', () => {
    const known = new Set([
      ...skills.map((s) => s.key),
      ...glossary.map((g) => g.key),
    ])
    const dangling: string[] = []
    for (const skill of skills) {
      for (const key of refKeys(skill.effect)) {
        if (!known.has(key)) dangling.push(`${skill.key} → ${key}`)
      }
    }
    for (const term of glossary) {
      for (const key of refKeys(term.definition)) {
        if (!known.has(key)) dangling.push(`${term.key} → ${key}`)
      }
    }
    expect(dangling).toEqual([])
  })
})
