import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'

import { CodexLayout } from '@/components/codex-layout'
import { ComingSoon } from '@/routes/coming-soon'
import { HomePage } from '@/routes/home'
import { SkillsPage } from '@/routes/skills'

const rootRoute = createRootRoute({ component: CodexLayout })

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const skillsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/skills',
  component: SkillsPage,
})

const teamsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/teams',
  component: () => <ComingSoon title="Teams" />,
})

const starsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/stars',
  component: () => <ComingSoon title="Star Players" />,
})

const inducementsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/inducements',
  component: () => <ComingSoon title="Inducements" />,
})

const rulesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/rules',
  component: () => <ComingSoon title="Special Rules" />,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  skillsRoute,
  teamsRoute,
  starsRoute,
  inducementsRoute,
  rulesRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
