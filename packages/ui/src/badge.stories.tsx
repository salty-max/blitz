import type { Meta, StoryObj } from '@storybook/react-vite'

import { Badge } from './badge'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'Skill' },
  argTypes: {
    tone: { control: 'inline-radio', options: ['blood', 'gold', 'ink'] },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Blood: Story = { args: { tone: 'blood' } }
export const Gold: Story = { args: { tone: 'gold' } }
export const Ink: Story = { args: { tone: 'ink' } }
