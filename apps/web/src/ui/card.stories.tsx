import type { Meta, StoryObj } from '@storybook/react-vite'

import { Card } from './card'

const meta = {
  title: 'Components/Card',
  component: Card,
  argTypes: { interactive: { control: 'boolean' } },
  render: (args) => (
    <Card {...args} className="w-72">
      <h2 className="font-display text-3xl uppercase group-hover:text-paper">
        Orcland Raiders
      </h2>
      <p className="mt-2 text-sm text-ink/70 group-hover:text-paper/80">
        A bashy team of Orcs and Goblins.
      </p>
    </Card>
  ),
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Static: Story = { args: { interactive: false } }

export const Interactive: Story = { args: { interactive: true } }
