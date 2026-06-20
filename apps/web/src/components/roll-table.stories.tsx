import type { Decorator, Meta, StoryObj } from '@storybook/react-vite'

import { RefDrawerProvider } from '@/reference/ref-drawer'

import { RollTable, type RollTableRow } from './roll-table'

const withDrawer: Decorator = (Story) => (
  <RefDrawerProvider>
    <Story />
  </RefDrawerProvider>
)

const ROWS: RollTableRow[] = [
  {
    key: 'stunned',
    roll: [2, 7],
    name: 'Stunned',
    effect: 'Recovers on the pitch.',
  },
  {
    key: 'ko',
    roll: [8, 9],
    name: 'Knocked-out',
    effect: 'Carried off to the Reserves.',
  },
  {
    key: 'casualty',
    roll: [10, 12],
    name: 'Casualty',
    effect: 'Taken out of action — roll on the Casualty table.',
  },
]

const meta = {
  title: 'Composites/RollTable',
  component: RollTable,
  tags: ['autodocs'],
  args: { rows: ROWS },
  decorators: [withDrawer],
} satisfies Meta<typeof RollTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
