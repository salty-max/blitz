import type { Meta, StoryObj } from '@storybook/react-vite'

import { Checkbox } from './checkbox'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: { 'aria-label': 'Hire an Apothecary' },
  argTypes: { disabled: { control: 'boolean' } },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Off: Story = {}
export const On: Story = { args: { defaultChecked: true } }
export const Disabled: Story = { args: { disabled: true } }

/** Pair the box with a `<label>` so the text toggles it too. */
export const WithLabel: Story = {
  render: (args) => (
    <label className="inline-flex items-center gap-2 text-sm text-ink">
      <Checkbox {...args} aria-label={undefined} />
      Hire an Apothecary
    </label>
  ),
}
