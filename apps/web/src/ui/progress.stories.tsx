import type { Decorator, Meta, StoryObj } from '@storybook/react-vite'

import { Progress } from './progress'

const withWidth: Decorator = (Story) => (
  <div className="w-72">
    <Story />
  </div>
)

const meta = {
  title: 'Components/Progress',
  component: Progress,
  args: { value: 720, max: 1000, 'aria-label': 'Budget used' },
  argTypes: {
    tone: {
      control: 'inline-radio',
      options: ['blood', 'gold', 'pitch', 'ink'],
    },
  },
  decorators: [withWidth],
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Gold: Story = {
  args: {
    value: 6,
    max: 16,
    tone: 'gold',
    'aria-label': 'SPP to next advance',
  },
}
