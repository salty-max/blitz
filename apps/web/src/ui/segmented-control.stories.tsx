import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import {
  SegmentedControl,
  type SegmentedControlProps,
} from './segmented-control'

const WEATHER = [
  { value: 'sweltering', label: 'Sweltering' },
  { value: 'sunny', label: 'Sunny' },
  { value: 'pouring', label: 'Pouring Rain' },
  { value: 'blizzard', label: 'Blizzard' },
]

/** Holds the selection in local state so the stories are interactive. */
function ControlledSegmentedControl(args: SegmentedControlProps<string>) {
  const [value, setValue] = useState(args.value)
  return <SegmentedControl {...args} value={value} onValueChange={setValue} />
}

const meta = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  args: {
    options: WEATHER,
    value: 'sunny',
    onValueChange: () => {},
    'aria-label': 'Weather',
  },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md'] } },
  render: (args) => <ControlledSegmentedControl {...args} />,
} satisfies Meta<typeof SegmentedControl>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Small: Story = { args: { size: 'sm' } }
export const TwoOptions: Story = {
  args: {
    options: [
      { value: 'home', label: 'Home' },
      { value: 'away', label: 'Away' },
    ],
    value: 'home',
    'aria-label': 'Fixture side',
  },
}
