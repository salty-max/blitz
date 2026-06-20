import type { Meta, StoryObj } from '@storybook/react-vite'

import { Switch } from './switch'

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: { 'aria-label': 'Toggle' },
  argTypes: { disabled: { control: 'boolean' } },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Off: Story = {}
export const On: Story = { args: { defaultChecked: true } }
export const Disabled: Story = { args: { disabled: true } }
export const DisabledOn: Story = {
  args: { disabled: true, defaultChecked: true },
}
