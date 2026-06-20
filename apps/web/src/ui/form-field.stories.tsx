import type { Decorator, Meta, StoryObj } from '@storybook/react-vite'

import { FormField } from './form-field'
import { Input } from './input'

const withWidth: Decorator = (Story) => (
  <div className="max-w-xs">
    <Story />
  </div>
)

const meta = {
  title: 'Components/FormField',
  component: FormField,
  args: {
    label: 'Team name',
    children: <Input placeholder="Naggaroth Nightmares" />,
  },
  decorators: [withWidth],
} satisfies Meta<typeof FormField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithHint: Story = {
  args: { hint: 'Shown on the league table.' },
}
export const WithError: Story = {
  args: {
    error: 'That name is already taken.',
    children: <Input defaultValue="Reikland Reavers" />,
  },
}
export const Required: Story = { args: { required: true } }
