import {
  glossary,
  GLOSSARY_KEYS,
  INDUCEMENT_KEYS,
  inducements,
  SKILL_KEYS,
  skills,
  SPECIAL_RULE_KEYS,
  specialRules,
  STAR_PLAYER_KEYS,
  starPlayers,
  TEAM_KEYS,
  teams,
} from '@blitz/data'
import { describe, expect, test } from 'bun:test'

describe('generated key unions (keys.gen.ts)', () => {
  const cases: [string, readonly string[], { key: string }[]][] = [
    ['skills', SKILL_KEYS, skills],
    ['glossary', GLOSSARY_KEYS, glossary],
    ['special rules', SPECIAL_RULE_KEYS, specialRules],
    ['teams', TEAM_KEYS, teams],
    ['star players', STAR_PLAYER_KEYS, starPlayers],
    ['inducements', INDUCEMENT_KEYS, inducements],
  ]

  for (const [name, keys, data] of cases) {
    test(`${name} keys are in sync with the data (else run \`bun run gen:keys\`)`, () => {
      expect([...keys].sort()).toEqual(data.map((entry) => entry.key).sort())
    })
  }
})
