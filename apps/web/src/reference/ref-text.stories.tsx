import type { Decorator, Meta, StoryObj } from '@storybook/react-vite'

import { RefDrawerProvider } from './ref-drawer'
import { RefText } from './ref-text'

const withDrawer: Decorator = (Story) => (
  <RefDrawerProvider>
    <Story />
  </RefDrawerProvider>
)

/**
 * Renders prose with `[[key]]` / `[[key|label]]` cross-references as buttons
 * that open the rule drawer. Wrapped in `RefDrawerProvider` so the links work.
 */
const meta = {
  title: 'Composites/RefText',
  component: RefText,
  args: {
    children:
      'Must [[follow-up]] and throw a second block if the target was [[push-back|pushed back]].',
  },
  decorators: [withDrawer],
} satisfies Meta<typeof RefText>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
