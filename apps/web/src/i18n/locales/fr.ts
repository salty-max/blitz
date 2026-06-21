/**
 * French UI strings. Mirrors the {@link en} catalogue key for key; canonical
 * Blood Bowl terms (skill and rule names, characteristic abbreviations, SPP,
 * Tier) are kept in English, matching how the game is played at French tables.
 */
export const fr = {
  common: {
    language: { label: 'Langue' },
  },
  masthead: {
    tagline: 'Boîte à outils Blood Bowl',
    nav: {
      codex: 'Codex',
      teams: 'Équipes',
      leagues: 'Ligues',
    },
    footer: {
      github: 'GitHub',
      reportIssue: 'Signaler un problème',
      copyright: '© 2026 Blitz',
      disclaimer:
        'Blitz est un outil non officiel créé par des fans. Blood Bowl et tous les noms associés sont des marques déposées de Games Workshop Limited. Ce projet n’est ni affilié à Games Workshop ni approuvé par celle-ci.',
    },
  },
  landing: {
    hero: {
      eyebrow: 'Blood Bowl',
      title: 'Tout, en dehors du terrain',
      subtitle:
        'Composez et gérez vos équipes, organisez vos ligues et tournois, et retrouvez chaque règle, compétence et joueur vedette dans un codex consultable.',
      cta: 'Ouvrir le codex',
    },
    pillars: {
      codex: {
        kicker: 'La référence',
        label: 'Codex',
        blurb:
          'Chaque équipe, compétence, joueur vedette, coup de pouce et règle — interconnectés et consultables, toujours à portée de main.',
        cta: 'Ouvrir le codex',
      },
      teams: {
        kicker: 'Gestion d’équipe',
        label: 'Équipes',
        blurb:
          'Composez une équipe dans le respect des règles et de votre budget, puis menez-la sur toute une saison : SPP, améliorations, blessures persistantes et valeur d’équipe.',
        cta: 'Créer une équipe',
      },
      leagues: {
        kicker: 'Ligues & tournois',
        label: 'Ligues',
        blurb:
          'Créez une compétition, planifiez les matchs, enregistrez les résultats et suivez le classement et la progression jusqu’à la finale.',
        cta: 'Gérer une ligue',
      },
    },
  },
  comingSoon: {
    title: {
      teamManagement: 'Gestion d’équipe',
      leagues: 'Ligues',
    },
    body: 'Bientôt disponible.',
  },
  ref: {
    kind: {
      skill: 'Compétence',
      rulesTerm: 'Terme de règles',
      league: 'Ligue',
      specialRule: 'Règle spéciale',
      starAbility: 'Capacité de vedette',
      fallback: 'Référence',
    },
    skillCategory: {
      general: 'Compétence générale',
      agility: 'Compétence d’agilité',
      passing: 'Compétence de passe',
      strength: 'Compétence de force',
      devious: 'Compétence sournoise',
      mutation: 'Mutation',
      trait: 'Trait',
    },
    back: 'Retour',
    close: 'Fermer',
    unknown: 'Référence inconnue',
    notFound: 'Aucune entrée trouvée pour « {{key}} ».',
  },
  codex: {
    eyebrow: 'Édition Troisième Saison',
    heading: 'Le codex Blood Bowl',
    back: 'Codex',
    categories: {
      teams: 'Équipes',
      skills: 'Compétences',
      stars: 'Joueurs vedettes',
      inducements: 'Coups de pouce',
      rules: 'Règles spéciales',
      injuries: 'Blessures',
      prayers: 'Prières',
      glossary: 'Glossaire',
    },
    rollTable: {
      roll: 'Jet',
      result: 'Résultat',
      effect: 'Effet',
    },
    skills: {
      heading: 'Compétences & traits',
      categories: {
        general: 'Générales',
        agility: 'Agilité',
        passing: 'Passe',
        strength: 'Force',
        devious: 'Sournoises',
        mutation: 'Mutations',
        trait: 'Traits',
      },
    },
    teams: {
      heading: 'Équipes',
      filterAll: 'Toutes',
      tier: 'Tier {{n}}',
      positions: '{{n}} postes',
      notFound: 'Aucune équipe trouvée.',
      rerolls: 'Relances',
      apothecary: 'Apothicaire',
      yes: 'Oui',
      no: 'Non',
      specialRules: 'Règles spéciales',
      stars: 'Joueurs vedettes',
      table: {
        position: 'Poste',
        max: 'Max',
        cost: 'Coût',
        skills: 'Compétences',
        access: 'Accès',
      },
      accessLegend:
        'Accès — primaire / secondaire : G générale · A agilité · S force · P passe · M mutation · D sournoise.',
    },
    stars: {
      heading: 'Joueurs vedettes',
      searchPlaceholder: 'Rechercher un nom ou une compétence…',
      searchLabel: 'Rechercher des joueurs vedettes',
      hireableBy: 'Recrutable par',
      filterLabel: 'Filtrer par équipe recruteuse',
      anyTeam: 'Toutes les équipes',
      noMatch: 'Aucune vedette ne correspond.',
      fields: {
        skills: 'Compétences',
        abilities: 'Capacités',
        playsFor: 'Joue pour',
        leaguesAndRules: 'Ligues & règles spéciales',
      },
    },
    inducements: {
      heading: 'Coups de pouce',
      costMax: '{{cost}} · max {{max}}',
      restrictedTo: 'Réservé à',
      teams: 'Équipes',
    },
    rules: {
      heading: 'Règles spéciales',
      groups: {
        league: 'Affiliations de ligue',
        special: 'Règles mécaniques',
      },
    },
    injuries: {
      heading: 'Blessures',
      injuryRoll: 'Jet de blessure',
      stuntyNote:
        'Les joueurs avec le trait [[stunty]] utilisent ce tableau plus sévère.',
      casualtyTable: 'Tableau des blessés',
      lastingInjury: 'Blessure persistante',
      lastingNote:
        'Une blessure persistante (13–14) se résout ici pour déterminer quelle caractéristique baisse de 1.',
    },
    prayers: {
      heading: 'Prières à Nuffle',
      resultHeader: 'Prière',
    },
    glossary: {
      heading: 'Glossaire',
    },
  },
} as const
