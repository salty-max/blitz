import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { NumberStepper, type NumberStepperProps } from './number-stepper'

/** Holds the value in local state so the stories are interactive. */
function ControlledStepper(args: NumberStepperProps) {
  const [value, setValue] = useState(args.value)
  return <NumberStepper {...args} value={value} onValueChange={setValue} />
}

const meta = {
  title: 'Components/NumberStepper',
  component: NumberStepper,
  args: { value: 4, onValueChange: () => {}, 'aria-label': 'Linemen' },
  render: (args) => <ControlledStepper {...args} />,
} satisfies Meta<typeof NumberStepper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Bounded: Story = {
  args: { value: 0, min: 0, max: 16, 'aria-label': 'Players' },
}
