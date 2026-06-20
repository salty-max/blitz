import type { Decorator, Meta, StoryObj } from '@storybook/react-vite'

import { RefDrawerProvider } from '@/reference/ref-drawer'

import { RollTable, type RollTableRow } from './roll-table'

const withDrawer: Decorator = (Story) => (
  <RefDrawerProvider>
    <Story />
  </RefDrawerProvider>
)

/** The 2D6 Injury table — inclusive ranges, with effects that cross-link into the drawer. */
const INJURY_ROWS: RollTableRow[] = [
  {
    key: 'stunned',
    roll: [2, 7],
    name: 'Stunned',
    effect: 'The player is left [[stunned]] and recovers on the pitch.',
  },
  {
    key: 'ko',
    roll: [8, 9],
    name: 'Knocked-out',
    effect: 'Carried off to the Reserves until the next kick-off.',
  },
  {
    key: 'casualty',
    roll: [10, 12],
    name: 'Casualty',
    effect: 'Taken out of action — roll on the [[casualty|Casualty]] table.',
  },
]

/** A D16 Prayers-to-Nuffle table — single-face rolls and a custom result header. */
const PRAYER_ROWS: RollTableRow[] = [
  {
    key: 'treacherous-trapdoor',
    roll: 1,
    name: 'Treacherous Trapdoor',
    effect:
      'Trapdoors may open under players — roll a D6; on a 1 the player falls.',
  },
  {
    key: 'friends-with-the-ref',
    roll: 2,
    name: 'Friends with the Ref',
    effect: 'Argue the Call succeeds on a 5+.',
  },
  {
    key: 'stiletto',
    roll: 3,
    name: 'Stiletto',
    effect: 'A random player gains [[stab]].',
  },
]

const meta = {
  title: 'Composites/RollTable',
  component: RollTable,
  tags: ['autodocs'],
  args: { rows: INJURY_ROWS },
  decorators: [withDrawer],
} satisfies Meta<typeof RollTable>

export default meta
type Story = StoryObj<typeof meta>

/** The Injury table: 2D6 ranges with `[[stunned]]` and `[[casualty]]` cross-links — click an effect to open the drawer. */
export const Default: Story = {}

/** A custom `resultHeader` ("Prayer") over single-face rolls, with a `[[stab]]` skill link in an effect. */
export const CustomHeader: Story = {
  args: { rows: PRAYER_ROWS, resultHeader: 'Prayer' },
}
