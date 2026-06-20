import type { Meta, StoryObj } from '@storybook/react-vite'

import { Eyebrow } from './eyebrow'

const meta = {
  title: 'Components/Eyebrow',
  component: Eyebrow,
  args: { children: 'Third Season Edition' },
  argTypes: {
    tone: { control: 'inline-radio', options: ['blood', 'gold', 'muted'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
  },
} satisfies Meta<typeof Eyebrow>

export default meta
type Story = StoryObj<typeof meta>

export const Blood: Story = { args: { tone: 'blood' } }
export const Gold: Story = { args: { tone: 'gold' } }
export const Muted: Story = { args: { tone: 'muted' } }
