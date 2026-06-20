import type { Meta, StoryObj } from '@storybook/react-vite'

import { CharacteristicsRow } from './characteristics'

const meta = {
  title: 'Composites/CharacteristicsRow',
  component: CharacteristicsRow,
  args: { characteristics: { ma: 7, st: 4, ag: 3, pa: 4, av: 9 } },
} satisfies Meta<typeof CharacteristicsRow>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** Roll-target stats may be `null` (a player with no Passing characteristic). */
export const NoPassing: Story = {
  args: { characteristics: { ma: 5, st: 5, ag: 4, pa: null, av: 10 } },
}
