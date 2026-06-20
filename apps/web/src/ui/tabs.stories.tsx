import type { Meta, StoryObj } from '@storybook/react-vite'

import { Tabs } from './tabs'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  render: () => (
    <Tabs defaultValue="roster" className="w-96">
      <Tabs.List>
        <Tabs.Trigger value="roster">Roster</Tabs.Trigger>
        <Tabs.Trigger value="staff">Staff</Tabs.Trigger>
        <Tabs.Trigger value="history">History</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="roster" className="text-sm text-ink/80">
        11 players · 1,000k team value.
      </Tabs.Content>
      <Tabs.Content value="staff" className="text-sm text-ink/80">
        2 re-rolls, an apothecary, 3 cheerleaders.
      </Tabs.Content>
      <Tabs.Content value="history" className="text-sm text-ink/80">
        Played 6 — won 4, drew 1, lost 1.
      </Tabs.Content>
    </Tabs>
  ),
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
