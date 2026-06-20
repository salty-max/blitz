// Generates packages/data/src/keys.gen.ts — the literal key unions for the
// reference data. Run with `bun run gen:keys` after changing any data file.
import { readFileSync, writeFileSync } from 'node:fs'

const dir = 'packages/data/src'
const entities = [
  ['SKILL_KEYS', 'SkillKey', 'skills.json', 'a catalogue skill'],
  ['GLOSSARY_KEYS', 'GlossaryKey', 'glossary.json', 'a glossary term'],
  [
    'SPECIAL_RULE_KEYS',
    'SpecialRuleKey',
    'special-rules.json',
    'a team special rule',
  ],
  ['TEAM_KEYS', 'TeamKey', 'teams.json', 'a team'],
  ['STAR_PLAYER_KEYS', 'StarPlayerKey', 'star-players.json', 'a star player'],
  [
    'STAR_ABILITY_KEYS',
    'StarAbilityKey',
    'star-abilities.json',
    'a star ability',
  ],
  ['INDUCEMENT_KEYS', 'InducementKey', 'inducements.json', 'an inducement'],
  ['CASUALTY_KEYS', 'CasualtyKey', 'casualties.json', 'a casualty result'],
  ['PRAYER_KEYS', 'PrayerKey', 'prayers.json', 'a prayer'],
]

let out =
  '// Generated from the data JSON by scripts/gen-data-keys.ts — do not edit by hand.\n' +
  '// Regenerate with `bun run gen:keys` after changing any data file.\n\n'

for (const [arr, type, file, desc] of entities) {
  const entries = JSON.parse(readFileSync(`${dir}/${file}`, 'utf8'))
  const keys = entries.map((e) => e.key).sort()
  out += `/** Every key of ${desc}. */\nexport const ${arr} = [\n${keys
    .map((k) => `  '${k}',`)
    .join(
      '\n'
    )}\n] as const\n/** The key of ${desc}. */\nexport type ${type} = (typeof ${arr})[number]\n\n`
}

writeFileSync(`${dir}/keys.gen.ts`, `${out.trimEnd()}\n`)
console.log('wrote packages/data/src/keys.gen.ts')
