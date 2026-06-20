import type { Decorator, Meta, StoryObj } from '@storybook/react-vite'

import { Input } from './input'

const withWidth: Decorator = (Story) => (
  <div className="max-w-xs">
    <Story />
  </div>
)

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: { placeholder: 'Naggaroth Nightmares', 'aria-label': 'Team name' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  decorators: [withWidth],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Small: Story = { args: { size: 'sm' } }
export const Invalid: Story = {
  args: { invalid: true, defaultValue: 'Nurglings??' },
}
export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Roster locked' },
}
export const Number: Story = {
  args: { type: 'number', defaultValue: 11, 'aria-label': 'Team value' },
}
