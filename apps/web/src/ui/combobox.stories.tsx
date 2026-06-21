import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Combobox } from './combobox'

const STARS = [
  { value: 'griff', label: 'Griff Oberwald' },
  { value: 'morg', label: 'Morg ’n’ Thorg' },
  { value: 'hakflem', label: 'Hakflem Skuttlespike' },
  { value: 'varag', label: 'Varag Ghoul-Chewer' },
  { value: 'eldril', label: 'Eldril Sidewinder' },
  { value: 'roxanna', label: 'Roxanna Darknail' },
]

const SKILLS = [
  { value: 'block', label: 'Block' },
  { value: 'dodge', label: 'Dodge' },
  { value: 'guard', label: 'Guard' },
  { value: 'mighty-blow', label: 'Mighty Blow' },
  { value: 'tackle', label: 'Tackle' },
  { value: 'wrestle', label: 'Wrestle' },
]

/** Single-select: pick one star, the popover closes on choice. */
function HireStar() {
  const [value, setValue] = useState<string | null>(null)
  return (
    <Combobox
      options={STARS}
      value={value}
      onValueChange={setValue}
      placeholder="Hire a star…"
      aria-label="Star player"
    />
  )
}

/** Multi-select: toggle several skills, the popover stays open. */
function PickSkills() {
  const [value, setValue] = useState<string[]>(['block'])
  return (
    <Combobox
      multiple
      options={SKILLS}
      value={value}
      onValueChange={setValue}
      placeholder="Add skills…"
      aria-label="Skills"
    />
  )
}

const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  args: { options: STARS, value: null, onValueChange: () => {} },
  render: () => <HireStar />,
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Multiple: Story = { render: () => <PickSkills /> }
