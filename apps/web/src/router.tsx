import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'

import { AppShell } from '@/layout/app-shell'
import { CodexHome, CodexLayout } from '@/routes/codex/codex'
import { GlossaryPage } from '@/routes/codex/glossary'
import { InducementsPage } from '@/routes/codex/inducements'
import { InjuriesPage } from '@/routes/codex/injuries'
import { KickoffPage } from '@/routes/codex/kickoff'
import { PrayersPage } from '@/routes/codex/prayers'
import { RulebookIndex, RulebookTopic } from '@/routes/codex/rulebook'
import { RulesPage } from '@/routes/codex/rules'
import { SkillsPage } from '@/routes/codex/skills'
import { SppPage } from '@/routes/codex/spp'
import { StarsPage } from '@/routes/codex/stars'
import { TeamDetail, TeamsIndex } from '@/routes/codex/teams'
import { ComingSoon } from '@/routes/coming-soon'
import { LandingPage } from '@/routes/landing'

const rootRoute = createRootRoute({ component: AppShell })

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
})

// Codex — the reference. Renders its index (the landing) or, for a category,
// the shared sub-nav layout, through the outlet.
const codexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/codex',
})

const codexIndexRoute = createRoute({
  getParentRoute: () => codexRoute,
  path: '/',
  component: CodexHome,
})

// Pathless layout — gives every category page the codex sub-nav while keeping
// the URLs at /codex/<category>.
const codexCategoryRoute = createRoute({
  getParentRoute: () => codexRoute,
  id: 'category',
  component: CodexLayout,
})

// Teams — an index of rosters, each linking to its detail page. No component of
// its own; it renders the index or a team detail through the outlet.
const codexTeamsRoute = createRoute({
  getParentRoute: () => codexCategoryRoute,
  path: 'teams',
})

const codexTeamsIndexRoute = createRoute({
  getParentRoute: () => codexTeamsRoute,
  path: '/',
  component: TeamsIndex,
})

const codexTeamDetailRoute = createRoute({
  getParentRoute: () => codexTeamsRoute,
  path: '$key',
  component: TeamDetail,
})

const codexSkillsRoute = createRoute({
  getParentRoute: () => codexCategoryRoute,
  path: 'skills',
  component: SkillsPage,
})

const codexStarsRoute = createRoute({
  getParentRoute: () => codexCategoryRoute,
  path: 'stars',
  component: StarsPage,
})

const codexInducementsRoute = createRoute({
  getParentRoute: () => codexCategoryRoute,
  path: 'inducements',
  component: InducementsPage,
})

const codexRulesRoute = createRoute({
  getParentRoute: () => codexCategoryRoute,
  path: 'rules',
  component: RulesPage,
})

// Rulebook — the core rules as topic pages, like teams: an index of topics and
// a detail page per topic, through the outlet.
const codexRulebookRoute = createRoute({
  getParentRoute: () => codexCategoryRoute,
  path: 'rulebook',
})

const codexRulebookIndexRoute = createRoute({
  getParentRoute: () => codexRulebookRoute,
  path: '/',
  component: RulebookIndex,
})

const codexRulebookTopicRoute = createRoute({
  getParentRoute: () => codexRulebookRoute,
  path: '$topic',
  component: RulebookTopic,
})

const codexInjuriesRoute = createRoute({
  getParentRoute: () => codexCategoryRoute,
  path: 'injuries',
  component: InjuriesPage,
})

const codexKickoffRoute = createRoute({
  getParentRoute: () => codexCategoryRoute,
  path: 'kickoff',
  component: KickoffPage,
})

const codexPrayersRoute = createRoute({
  getParentRoute: () => codexCategoryRoute,
  path: 'prayers',
  component: PrayersPage,
})

const codexGlossaryRoute = createRoute({
  getParentRoute: () => codexCategoryRoute,
  path: 'glossary',
  component: GlossaryPage,
})

const codexSppRoute = createRoute({
  getParentRoute: () => codexCategoryRoute,
  path: 'spp',
  component: SppPage,
})

// Team management — your own rosters across a season.
const teamsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/teams',
  component: () => <ComingSoon titleKey="teamManagement" />,
})

// League & tournament management.
const leaguesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/leagues',
  component: () => <ComingSoon titleKey="leagues" />,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  codexRoute.addChildren([
    codexIndexRoute,
    codexCategoryRoute.addChildren([
      codexTeamsRoute.addChildren([codexTeamsIndexRoute, codexTeamDetailRoute]),
      codexSkillsRoute,
      codexStarsRoute,
      codexInducementsRoute,
      codexRulesRoute,
      codexRulebookRoute.addChildren([
        codexRulebookIndexRoute,
        codexRulebookTopicRoute,
      ]),
      codexKickoffRoute,
      codexInjuriesRoute,
      codexPrayersRoute,
      codexGlossaryRoute,
      codexSppRoute,
    ]),
  ]),
  teamsRoute,
  leaguesRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
