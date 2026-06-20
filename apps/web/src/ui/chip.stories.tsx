import type { Meta, StoryObj } from '@storybook/react-vite'

import { Chip } from './chip'

const meta = {
  title: 'Components/Chip',
  component: Chip,
  args: { children: 'Skill' },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['blood', 'ink', 'gold', 'pitch', 'outline', 'accent'],
    },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    interactive: { control: 'boolean' },
  },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

/** Filled labels — colour-code the drawer's reference-kind badge by category. */
export const Blood: Story = { args: { variant: 'blood', children: 'Skill' } }
export const Ink: Story = { args: { variant: 'ink', children: 'Rules term' } }
export const Pitch: Story = {
  args: { variant: 'pitch', children: 'Special rule' },
}

/** Filled gold — used for cost badges (with `tabular-nums`). */
export const Gold: Story = { args: { variant: 'gold', children: '120k' } }

/** Bordered, interactive — used for reference / team chips (hovers to blood). */
export const Outline: Story = {
  args: { variant: 'outline', interactive: true },
}
export const Accent: Story = { args: { variant: 'accent', interactive: true } }
