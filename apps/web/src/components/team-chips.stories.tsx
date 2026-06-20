import { teams } from '@blitz/data'
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite'
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'

import { TeamChips } from './team-chips'

const withRouter: Decorator = (Story) => {
  const router = createRouter({
    routeTree: createRootRoute({ component: () => <Story /> }),
    history: createMemoryHistory({ initialEntries: ['/'] }),
  })
  return <RouterProvider router={router} />
}

/** The chips link to team pages, so the story runs inside a minimal router. */
const meta = {
  title: 'Composites/TeamChips',
  component: TeamChips,
  tags: ['autodocs'],
  args: { teams: teams.slice(0, 6) },
  decorators: [withRouter],
} satisfies Meta<typeof TeamChips>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
