/**
 * English UI strings, grouped into namespaces. The `fr` catalogue mirrors this
 * shape exactly; this one is the canonical source and the fallback for any key
 * a translation has not yet filled.
 */
export const en = {
  common: {
    language: { label: 'Language' },
  },
  masthead: {
    tagline: 'Blood Bowl Toolkit',
    nav: {
      codex: 'Codex',
      teams: 'Teams',
      leagues: 'Leagues',
    },
    footer: {
      github: 'GitHub',
      reportIssue: 'Report an issue',
      copyright: '© 2026 Blitz',
      disclaimer:
        'Blitz is an unofficial, fan-made tool. Blood Bowl and all associated names are trademarks of Games Workshop Limited. This project is not affiliated with or endorsed by Games Workshop.',
    },
  },
  landing: {
    hero: {
      eyebrow: 'Blood Bowl',
      title: 'Everything off the pitch',
      subtitle:
        'Build and manage your teams, run your leagues and tournaments, and look up every rule, skill and star in a searchable codex.',
      cta: 'Open the codex',
    },
    pillars: {
      codex: {
        kicker: 'The reference',
        label: 'Codex',
        blurb:
          'Every team, skill, star player, inducement and rule — cross-linked and searchable, always a tap away.',
        cta: 'Open the codex',
      },
      teams: {
        kicker: 'Team management',
        label: 'Teams',
        blurb:
          'Draft a roster within the rules and your budget, then carry it through a season: SPP, advancements, lasting injuries and team value.',
        cta: 'Build a team',
      },
      leagues: {
        kicker: 'Leagues & tournaments',
        label: 'Leagues',
        blurb:
          'Set up a competition, schedule fixtures, record results, and track standings and progression to the final.',
        cta: 'Run a league',
      },
    },
  },
  codex: {
    eyebrow: 'Third Season Edition',
    heading: 'The Blood Bowl Codex',
    back: 'Codex',
    categories: {
      teams: 'Teams',
      skills: 'Skills',
      stars: 'Star Players',
      inducements: 'Inducements',
      rules: 'Special Rules',
      injuries: 'Injuries',
      prayers: 'Prayers',
      glossary: 'Glossary',
    },
  },
} as const
