import type { Meta, StoryObj } from '@storybook/react-vite'

import { RadioGroup } from './radio-group'

const RESULTS = [
  { value: 'win', label: 'Win' },
  { value: 'draw', label: 'Draw' },
  { value: 'loss', label: 'Loss' },
]

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  args: { 'aria-label': 'Match result', defaultValue: 'win' },
  render: (args) => (
    <RadioGroup {...args}>
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
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
