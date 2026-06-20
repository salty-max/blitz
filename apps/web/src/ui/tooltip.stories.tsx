import type { Decorator, Meta, StoryObj } from '@storybook/react-vite'

import { Button } from './button'
import { Tooltip, TooltipProvider } from './tooltip'

const withProvider: Decorator = (Story) => (
  <TooltipProvider delayDuration={200}>
    <Story />
  </TooltipProvider>
)

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  args: {
    content: 'Breaks AV9+ on an 8+ — 15/36 ≈ 42%.',
    children: <Button variant="outline">Block</Button>,
  },
  decorators: [withProvider],
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
