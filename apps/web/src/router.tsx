import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'

import { AppShell } from '@/components/app-shell'
import { CodexHome, CodexLayout } from '@/routes/codex'
import { ComingSoon } from '@/routes/coming-soon'
import { GlossaryPage } from '@/routes/glossary'
import { InducementsPage } from '@/routes/inducements'
import { InjuriesPage } from '@/routes/injuries'
import { LandingPage } from '@/routes/landing'
import { PrayersPage } from '@/routes/prayers'
import { RulesPage } from '@/routes/rules'
import { SkillsPage } from '@/routes/skills'
import { StarsPage } from '@/routes/stars'
import { TeamDetail, TeamsIndex } from '@/routes/teams'

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

const codexInjuriesRoute = createRoute({
  getParentRoute: () => codexCategoryRoute,
  path: 'injuries',
  component: InjuriesPage,
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

// Team management — your own rosters across a season.
const teamsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/teams',
  component: () => <ComingSoon title="Team Management" />,
})

// League & tournament management.
const leaguesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/leagues',
  component: () => <ComingSoon title="Leagues" />,
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
      codexInjuriesRoute,
      codexPrayersRoute,
      codexGlossaryRoute,
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
