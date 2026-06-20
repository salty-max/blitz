import type { Decorator, Meta, StoryObj } from '@storybook/react-vite'

import { RefChips } from './ref-chips'
import { RefDrawerProvider } from './ref-drawer'

const withDrawer: Decorator = (Story) => (
  <RefDrawerProvider>
    <Story />
  </RefDrawerProvider>
)

const meta = {
  title: 'Composites/RefChips',
  component: RefChips,
  tags: ['autodocs'],
  args: { keys: ['block', 'dodge', 'tackle', 'mighty-blow'] },
  argTypes: {
    tone: { control: 'inline-radio', options: ['default', 'accent'] },
  },
  decorators: [withDrawer],
} satisfies Meta<typeof RefChips>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Accent: Story = { args: { tone: 'accent' } }
