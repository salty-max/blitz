import type { Meta, StoryObj } from '@storybook/react-vite'

import { CostBadge } from './cost-badge'

const meta = {
  title: 'Composites/CostBadge',
  component: CostBadge,
  tags: ['autodocs'],
  args: { cost: 120000 },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md'] } },
} satisfies Meta<typeof CostBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Medium: Story = { args: { size: 'md' } }
export const Small: Story = { args: { size: 'sm' } }
