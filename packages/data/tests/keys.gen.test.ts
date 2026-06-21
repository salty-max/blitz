import {
  casualties,
  CASUALTY_KEYS,
  glossary,
  GLOSSARY_KEYS,
  INDUCEMENT_KEYS,
  inducements,
  injuries,
  INJURY_KEYS,
  KICKOFF_EVENT_KEYS,
  kickoffEvents,
  LASTING_INJURY_KEYS,
  lastingInjuries,
  PRAYER_KEYS,
  prayers,
  SKILL_KEYS,
  skills,
  SPECIAL_RULE_KEYS,
  specialRules,
  STAR_ABILITY_KEYS,
  STAR_PLAYER_KEYS,
  starAbilities,
  starPlayers,
  TEAM_KEYS,
  teams,
  weather,
  WEATHER_KEYS,
} from '@blitz/data'
import { describe, expect, test } from 'bun:test'

describe('generated key unions (keys.gen.ts)', () => {
  const cases: [string, readonly string[], { key: string }[]][] = [
    ['skills', SKILL_KEYS, skills],
    ['glossary', GLOSSARY_KEYS, glossary],
    ['special rules', SPECIAL_RULE_KEYS, specialRules],
    ['teams', TEAM_KEYS, teams],
    ['star players', STAR_PLAYER_KEYS, starPlayers],
    ['star abilities', STAR_ABILITY_KEYS, starAbilities],
    ['inducements', INDUCEMENT_KEYS, inducements],
    ['casualties', CASUALTY_KEYS, casualties],
    ['injuries', INJURY_KEYS, injuries],
    ['lasting injuries', LASTING_INJURY_KEYS, lastingInjuries],
    ['prayers', PRAYER_KEYS, prayers],
    ['kick-off events', KICKOFF_EVENT_KEYS, kickoffEvents],
    ['weather', WEATHER_KEYS, weather],
  ]

  for (const [name, keys, data] of cases) {
    test(`${name} keys are in sync with the data (else run \`bun run gen:keys\`)`, () => {
      expect([...keys].sort()).toEqual(data.map((entry) => entry.key).sort())
    })
  }
})
