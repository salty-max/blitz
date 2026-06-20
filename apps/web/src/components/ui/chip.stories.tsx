import type { Meta, StoryObj } from '@storybook/react-vite'

import { Chip } from './chip'

const meta = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  args: { children: 'Skill' },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['blood', 'ink', 'gold', 'outline', 'accent'],
    },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    interactive: { control: 'boolean' },
  },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

/** Filled label — used for the drawer's reference-kind badge. */
export const Blood: Story = { args: { variant: 'blood' } }
export const Ink: Story = { args: { variant: 'ink' } }

/** Filled gold — used for cost badges (with `tabular-nums`). */
export const Gold: Story = { args: { variant: 'gold', children: '120k' } }

/** Bordered, interactive — used for reference / team chips (hovers to blood). */
export const Outline: Story = {
  args: { variant: 'outline', interactive: true },
}
export const Accent: Story = { args: { variant: 'accent', interactive: true } }
