import type { Decorator, Meta, StoryObj } from '@storybook/react-vite'

import { Textarea } from './textarea'

const withWidth: Decorator = (Story) => (
  <div className="max-w-md">
    <Story />
  </div>
)

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  args: { placeholder: 'Pre-match ritual…', rows: 4, 'aria-label': 'Notes' },
  argTypes: {
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  decorators: [withWidth],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Invalid: Story = {
  args: { invalid: true, defaultValue: 'Too short' },
}
export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Notes are locked' },
}
