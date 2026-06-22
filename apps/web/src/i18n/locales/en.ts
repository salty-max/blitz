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
    auth: {
      signIn: 'Sign in',
      signOut: 'Sign out',
    },
    footer: {
      github: 'GitHub',
      reportIssue: 'Report an issue',
      copyright: '© 2026 Blitz',
      disclaimer:
        'Blitz is an unofficial, fan-made tool. Blood Bowl and all associated names are trademarks of Games Workshop Limited. This project is not affiliated with or endorsed by Games Workshop.',
    },
  },
  auth: {
    title: {
      signIn: 'Sign in',
      signUp: 'Create an account',
    },
    fields: {
      name: 'Name',
      email: 'Email',
      password: 'Password',
    },
    submit: {
      signIn: 'Sign in',
      signUp: 'Create account',
    },
    toggle: {
      needAccount: 'New here?',
      haveAccount: 'Already have an account?',
      toSignUp: 'Create an account',
      toSignIn: 'Sign in',
    },
    errors: {
      signIn: 'Could not sign you in. Check your email and password.',
      signUp:
        'Could not create your account. That email may already be in use.',
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
  comingSoon: {
    title: {
      teamManagement: 'Team Management',
      leagues: 'Leagues',
    },
    body: 'Coming soon.',
  },
  ref: {
    kind: {
      skill: 'Skill',
      rulesTerm: 'Rules term',
      league: 'League',
      specialRule: 'Special rule',
      starAbility: 'Star ability',
      fallback: 'Reference',
    },
    skillCategory: {
      general: 'General skill',
      agility: 'Agility skill',
      passing: 'Passing skill',
      strength: 'Strength skill',
      devious: 'Devious skill',
      mutation: 'Mutation',
      trait: 'Trait',
    },
    back: 'Back',
    close: 'Close',
    unknown: 'Unknown reference',
    notFound: 'No entry found for “{{key}}”.',
  },
  codex: {
    eyebrow: 'Third Season Edition',
    heading: 'The Blood Bowl Codex',
    back: 'Codex',
    categories: {
      teams: 'Teams',
      drafting: 'Drafting',
      skills: 'Skills',
      stars: 'Star Players',
      inducements: 'Inducements',
      rules: 'Special Rules',
      kickoff: 'Kick-off',
      injuries: 'Injuries',
      prayers: 'Prayers',
      spp: 'SPP & Advancement',
      glossary: 'Glossary',
      rulebook: 'Rulebook',
    },
    rollTable: {
      roll: 'Roll',
      result: 'Result',
      effect: 'Effect',
    },
    skills: {
      heading: 'Skills & Traits',
      categories: {
        general: 'General',
        agility: 'Agility',
        passing: 'Passing',
        strength: 'Strength',
        devious: 'Devious',
        mutation: 'Mutations',
        trait: 'Traits',
      },
    },
    teams: {
      heading: 'Teams',
      filterAll: 'All',
      tier: 'Tier {{n}}',
      positions: '{{n}} positions',
      notFound: 'No team found.',
      rerolls: 'Re-rolls',
      apothecary: 'Apothecary',
      yes: 'Yes',
      no: 'No',
      specialRules: 'Special rules',
      stars: 'Star Players',
      table: {
        position: 'Position',
        max: 'Max',
        cost: 'Cost',
        skills: 'Skills',
        access: 'Access',
      },
      accessLegend:
        'Access — primary / secondary: G general · A agility · S strength · P passing · M mutation · D devious.',
    },
    stars: {
      heading: 'Star Players',
      searchPlaceholder: 'Search name or skill…',
      searchLabel: 'Search star players',
      hireableBy: 'Hireable by',
      filterLabel: 'Filter by hiring team',
      anyTeam: 'Any team',
      noMatch: 'No stars match.',
      fields: {
        skills: 'Skills',
        abilities: 'Abilities',
        playsFor: 'Plays for',
        leaguesAndRules: 'Leagues & special rules',
      },
    },
    inducements: {
      heading: 'Inducements',
      costMax: '{{cost}} · max {{max}}',
      restrictedTo: 'Restricted to',
      teams: 'Teams',
    },
    rules: {
      heading: 'Special Rules',
      groups: {
        league: 'League affiliations',
        special: 'Mechanical rules',
      },
    },
    kickoff: {
      heading: 'Kick-off & Weather',
      events: 'Kick-off events',
      weather: 'Weather',
    },
    injuries: {
      heading: 'Injuries',
      injuryRoll: 'Injury roll',
      stuntyNote: 'Players with the [[stunty]] trait use this harsher table.',
      casualtyTable: 'Casualty table',
      lastingInjury: 'Lasting injury',
      lastingNote:
        'A Lasting Injury casualty (13–14) rolls here for which characteristic drops by 1.',
    },
    prayers: {
      heading: 'Prayers to Nuffle',
      resultHeader: 'Prayer',
    },
    spp: {
      heading: 'SPP & Advancement',
      earning: 'Earning SPP',
      action: 'Action',
      advancementCost: 'Advancement cost',
      advancementNote:
        '1° = a Primary-category skill, 2° = a Secondary-category skill. The cost rises as a player takes more advances.',
      level: 'Level',
      randomPrimary: 'Random 1°',
      chosenPrimary: 'Chosen 1°',
      randomSecondary: 'Random 2°',
      chosenSecondary: 'Chosen 2°',
      characteristic: 'Characteristic',
      characteristicTable: 'Characteristic improvement',
      improvement: 'Improvement',
      characteristicNote:
        'A player may decline the roll and take a skill instead — the SPP are still spent.',
      valueIncrease: 'Value increase per advancement',
      advancement: 'Advancement',
      value: 'Current value',
    },
    drafting: {
      heading: 'Drafting a team',
      budgetRoster: 'Budget & roster',
      draftNote:
        'A rookie league team starts with {{budget}} and drafts {{min}}–{{max}} players, all from its [[page:teams|roster]] — each position caps how many you may field.',
      staff: 'Sideline staff & assets',
      cols: { asset: 'Asset', cost: 'Cost', limit: 'Limit' },
      money: '{{n}} gp',
      perTeam: 'per team',
      perPoint: '{{v}} / point',
      max: 'max {{n}}',
      apothLimit: '1 (if eligible)',
      fanLimit: 'start {{start}}, max {{max}} at draft',
      assets: {
        reroll: 'Team Re-roll',
        apothecary: 'Apothecary',
        coach: 'Assistant Coach',
        cheerleader: 'Cheerleader',
        fan: 'Dedicated Fan',
      },
      rerollNote: 'A team re-roll bought after the draft costs double.',
      tv: 'Team Value',
      tvNote:
        "Team Value (TV) is the worth of every player, sideline asset and team re-roll. Current Team Value (CTV) drops the players who can't take the field this game; the gap between the two teams' values is what [[page:inducements|inducements]] spend.",
      gameDay: 'Game-day help',
      gameDayNote:
        'The lower-value coach evens the odds before kick-off with [[page:inducements|inducements]] for the match, and may hire up to two [[page:stars|star players]] — a star never earns SPP and shrugs off any casualty.',
    },
    glossary: {
      heading: 'Glossary',
    },
    rulebook: {
      heading: 'Rulebook',
      notFound: 'No topic found.',
    },
  },
} as const
