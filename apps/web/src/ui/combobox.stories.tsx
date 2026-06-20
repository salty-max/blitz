import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Combobox, type ComboboxProps } from './combobox'

const STARS = [
  { value: 'griff', label: 'Griff Oberwald' },
  { value: 'morg', label: 'Morg ’n’ Thorg' },
  { value: 'hakflem', label: 'Hakflem Skuttlespike' },
  { value: 'varag', label: 'Varag Ghoul-Chewer' },
  { value: 'eldril', label: 'Eldril Sidewinder' },
  { value: 'roxanna', label: 'Roxanna Darknail' },
]

/** Holds the selection in local state so the story is interactive. */
function ControlledCombobox(args: ComboboxProps) {
  const [value, setValue] = useState(args.value)
  return <Combobox {...args} value={value} onValueChange={setValue} />
}

const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  args: {
    options: STARS,
    value: null,
    onValueChange: () => {},
    placeholder: 'Hire a star…',
    'aria-label': 'Star player',
  },
  render: (args) => <ControlledCombobox {...args} />,
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
