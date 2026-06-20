import type { Meta, StoryObj } from '@storybook/react-vite'

import { Select } from './select'

const meta = {
  title: 'Components/Select',
  component: Select,
  render: () => (
    <Select defaultValue="orc">
      <Select.Trigger className="w-56" aria-label="Team">
        <Select.Value />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="orc">Orc</Select.Item>
        <Select.Item value="elf">Wood Elf</Select.Item>
        <Select.Item value="undead">Undead</Select.Item>
        <Select.Item value="dwarf" disabled>
          Dwarf (sold out)
        </Select.Item>
      </Select.Content>
    </Select>
  ),
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
