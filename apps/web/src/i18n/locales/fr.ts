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
    auth: {
      signIn: 'Connexion',
      signOut: 'Déconnexion',
    },
    footer: {
      github: 'GitHub',
      reportIssue: 'Signaler un problème',
      copyright: '© 2026 Blitz',
      disclaimer:
        'Blitz est un outil non officiel créé par des fans. Blood Bowl et tous les noms associés sont des marques déposées de Games Workshop Limited. Ce projet n’est ni affilié à Games Workshop ni approuvé par celle-ci.',
    },
  },
  auth: {
    eyebrow: 'Coachs',
    title: {
      signIn: 'Connexion',
      signUp: 'Créer un compte',
    },
    fields: {
      name: 'Nom du coach',
      email: 'E-mail',
      password: 'Mot de passe',
    },
    submit: {
      signIn: 'Se connecter',
      signUp: 'Créer le compte',
    },
    toggle: {
      needAccount: 'Nouveau ici ?',
      haveAccount: 'Vous avez déjà un compte ?',
      toSignUp: 'Créer un compte',
      toSignIn: 'Se connecter',
    },
    errors: {
      signIn:
        'Connexion impossible. Vérifiez votre e-mail et votre mot de passe.',
      signUp: 'Création impossible. Cet e-mail est peut-être déjà utilisé.',
    },
  },
  landing: {
    hero: {
      eyebrow: 'Blood Bowl',
      title: 'Tout, en dehors du terrain',
      subtitle:
        'Composez et gérez vos équipes, organisez vos ligues et tournois, et retrouvez chaque règle, compétence et champion dans un codex consultable.',
      cta: 'Ouvrir le codex',
    },
    pillars: {
      codex: {
        kicker: 'La référence',
        label: 'Codex',
        blurb:
          'Chaque équipe, compétence, champion, coup de pouce et règle — interconnectés et consultables, toujours à portée de main.',
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
      starAbility: 'Capacité de champion',
      fallback: 'Référence',
    },
    skillCategory: {
      general: 'Compétence générale',
      agility: 'Compétence d’agilité',
      passing: 'Compétence de passe',
      strength: 'Compétence de force',
      devious: 'Compétence scélérate',
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
      drafting: 'Création d’équipe',
      skills: 'Compétences',
      stars: 'Champions',
      inducements: 'Coups de pouce',
      rules: 'Règles spéciales',
      kickoff: 'Coup d’envoi',
      injuries: 'Blessures',
      prayers: 'Prières',
      spp: 'SPP & améliorations',
      glossary: 'Glossaire',
      rulebook: 'Règles du jeu',
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
        devious: 'Scélérates',
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
      stars: 'Champions',
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
      heading: 'Champions',
      searchPlaceholder: 'Rechercher un nom ou une compétence…',
      searchLabel: 'Rechercher des champions',
      hireableBy: 'Recrutable par',
      filterLabel: 'Filtrer par équipe recruteuse',
      anyTeam: 'Toutes les équipes',
      noMatch: 'Aucun champion ne correspond.',
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
    kickoff: {
      heading: 'Coup d’envoi & météo',
      events: 'Coups d’envoi',
      weather: 'Météo',
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
    spp: {
      heading: 'SPP & améliorations',
      earning: 'Gagner des SPP',
      action: 'Action',
      advancementCost: 'Coût des améliorations',
      advancementNote:
        '1° = une compétence primaire, 2° = une compétence secondaire. Le coût augmente à mesure qu’un joueur prend des améliorations.',
      level: 'Niveau',
      randomPrimary: '1° aléatoire',
      chosenPrimary: '1° choisie',
      randomSecondary: '2° aléatoire',
      chosenSecondary: '2° choisie',
      characteristic: 'Caractéristique',
      characteristicTable: 'Amélioration de caractéristique',
      improvement: 'Amélioration',
      characteristicNote:
        'Un joueur peut refuser le jet et prendre une compétence à la place — les SPP sont tout de même dépensés.',
      valueIncrease: 'Hausse de valeur par amélioration',
      advancement: 'Amélioration',
      value: 'Valeur actuelle',
    },
    drafting: {
      heading: 'Créer une équipe',
      budgetRoster: 'Budget & effectif',
      draftNote:
        'Une équipe débutante en ligue commence avec {{budget}} et recrute {{min}} à {{max}} joueurs, tous issus de sa [[page:teams|liste d’équipe]] — chaque poste limite le nombre que vous pouvez aligner.',
      staff: 'Encadrement & extras',
      cols: { asset: 'Élément', cost: 'Coût', limit: 'Limite' },
      money: '{{n}} po',
      perTeam: 'selon l’équipe',
      perPoint: '{{v}} / point',
      max: 'max {{n}}',
      apothLimit: '1 (si éligible)',
      fanLimit: 'départ {{start}}, max {{max}} au recrutement',
      assets: {
        reroll: 'Relance d’équipe',
        apothecary: 'Apothicaire',
        coach: 'Entraîneur adjoint',
        cheerleader: 'Pom-pom girl',
        fan: 'Fan dévoué',
      },
      rerollNote:
        'Une relance d’équipe achetée après le recrutement coûte le double.',
      tv: 'Valeur d’équipe',
      tvNote:
        'La valeur d’équipe (VE) est la valeur de chaque joueur, extra de banc et relance d’équipe. La valeur d’équipe actuelle (VEA) retire les joueurs qui ne peuvent pas jouer ce match ; l’écart entre les valeurs des deux équipes est ce que dépensent les [[page:inducements|coups de pouce]].',
      gameDay: 'Renforts d’avant-match',
      gameDayNote:
        'Le coach à la valeur la plus basse équilibre les chances avant le coup d’envoi avec des [[page:inducements|coups de pouce]] pour le match, et peut recruter jusqu’à deux [[page:stars|champions]] — un champion ne gagne jamais de SPP et ignore toute blessure.',
    },
    glossary: {
      heading: 'Glossaire',
    },
    rulebook: {
      heading: 'Règles du jeu',
      notFound: 'Aucun sujet trouvé.',
    },
  },
} as const
