/**
 * French UI strings. Mirrors the {@link en} catalogue key for key; canonical
 * Blood Bowl terms (skill and rule names, characteristic abbreviations, SPP)
 * are kept in English, matching how the game is played at French tables.
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
  },
} as const
