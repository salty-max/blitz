import {
  createRootRoute,
  createRoute,
  createRouter,
  type ParsedLocation,
  redirect,
} from '@tanstack/react-router'

import { AppShell } from '@/layout/app-shell'
import { authClient } from '@/lib/auth-client'
import { AuthPage } from '@/routes/auth'
import { CodexHome, CodexLayout } from '@/routes/codex/codex'
import { DraftingPage } from '@/routes/codex/drafting'
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
import { TeamBuilderPage } from '@/routes/teams/team-builder'
import { TeamsListPage } from '@/routes/teams/teams-list'

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

const codexDraftingRoute = createRoute({
  getParentRoute: () => codexCategoryRoute,
  path: 'drafting',
  component: DraftingPage,
})

// Route guard — bounce to /login (remembering where the coach was headed)
// when there's no session.
async function requireAuth({ location }: { location: ParsedLocation }) {
  let signedIn = false
  try {
    signedIn = Boolean((await authClient.getSession()).data)
  } catch {
    // Auth API unreachable — fail safe by treating the coach as signed out.
  }
  if (!signedIn) {
    // `redirect()` is a thrown control-flow signal, not an Error — TanStack's pattern.
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect({ to: '/login', search: { redirect: location.href } })
  }
}

// Team management — your own rosters. Requires a signed-in coach; the index
// lists saved teams while /new and /$id open the builder through the outlet.
const teamsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/teams',
  beforeLoad: requireAuth,
})

const teamsIndexRoute = createRoute({
  getParentRoute: () => teamsRoute,
  path: '/',
  component: TeamsListPage,
})

const teamsNewRoute = createRoute({
  getParentRoute: () => teamsRoute,
  path: 'new',
  component: TeamBuilderPage,
})

const teamEditRoute = createRoute({
  getParentRoute: () => teamsRoute,
  path: '$id',
  component: TeamBuilderPage,
})

// League & tournament management. Requires a signed-in coach.
const leaguesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/leagues',
  beforeLoad: requireAuth,
  component: () => <ComingSoon titleKey="leagues" />,
})

// Sign in / sign up. `redirect` carries where to return after authenticating.
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => ({
    redirect: typeof search.redirect === 'string' ? search.redirect : undefined,
  }),
  component: AuthPage,
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
      codexDraftingRoute,
    ]),
  ]),
  teamsRoute.addChildren([teamsIndexRoute, teamsNewRoute, teamEditRoute]),
  leaguesRoute,
  loginRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
