import type { Decorator, Meta, StoryObj } from '@storybook/react-vite'

import { FormField } from './form-field'
import { Input } from './input'
import { RadioGroup } from './radio-group'

const RESULTS = [
  { value: 'win', label: 'Win' },
  { value: 'draw', label: 'Draw' },
  { value: 'loss', label: 'Loss' },
]

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

/** A group control: the label names the `radiogroup` via `aria-labelledby`. */
export const WithRadioGroup: Story = {
  args: {
    label: 'Match result',
    children: (
      <RadioGroup defaultValue="win" className="mt-1">
        {RESULTS.map((option) => (
          <label
            key={option.value}
            className="inline-flex items-center gap-2 text-sm text-ink"
          >
            <RadioGroup.Item value={option.value} />
            {option.label}
          </label>
        ))}
      </RadioGroup>
    ),
  },
}
