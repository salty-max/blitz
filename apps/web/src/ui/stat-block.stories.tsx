import type { Decorator, Meta, StoryObj } from '@storybook/react-vite'

import { StatBlock } from './stat-block'

const withWidth: Decorator = (Story) => (
  <div className="w-48">
    <Story />
  </div>
)

const meta = {
  title: 'Components/StatBlock',
  component: StatBlock,
  args: { label: 'Team value', value: '1,000k', hint: 'Tier 1' },
  decorators: [withWidth],
} satisfies Meta<typeof StatBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Record: Story = {
  args: { label: 'Record', value: '4–1–1', hint: 'Played 6' },
}
