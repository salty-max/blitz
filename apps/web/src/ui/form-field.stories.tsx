import type { Decorator, Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Combobox } from './combobox'
import { FormField } from './form-field'
import { Input } from './input'
import { RadioGroup } from './radio-group'
import { SegmentedControl } from './segmented-control'

const RESULTS = [
  { value: 'win', label: 'Win' },
  { value: 'draw', label: 'Draw' },
  { value: 'loss', label: 'Loss' },
]

const STARS = [
  { value: 'griff', label: 'Griff Oberwald' },
  { value: 'morg', label: 'Morg ’n’ Thorg' },
  { value: 'varag', label: 'Varag Ghoul-Chewer' },
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

/** A controlled control works too, as long as it's the direct child. */
function SegmentedField() {
  const [value, setValue] = useState('home')
  return (
    <FormField label="Fixture side">
      <SegmentedControl
        options={[
          { value: 'home', label: 'Home' },
          { value: 'away', label: 'Away' },
        ]}
        value={value}
        onValueChange={setValue}
      />
    </FormField>
  )
}
export const WithSegmentedControl: Story = { render: () => <SegmentedField /> }

function ComboboxField() {
  const [value, setValue] = useState<string | null>(null)
  return (
    <FormField label="Star player" hint="Search the roster.">
      <Combobox
        options={STARS}
        value={value}
        onValueChange={setValue}
        placeholder="Hire a star…"
      />
    </FormField>
  )
}
export const WithCombobox: Story = { render: () => <ComboboxField /> }
