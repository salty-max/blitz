import type { Meta, StoryObj } from '@storybook/react-vite'

import { Accordion } from './accordion'

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  args: { type: 'single', children: null },
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      <Accordion.Item value="block">
        <Accordion.Trigger>Block</Accordion.Trigger>
        <Accordion.Content>
          Not knocked down on a Both Down result.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="dodge">
        <Accordion.Trigger>Dodge</Accordion.Trigger>
        <Accordion.Content>
          Re-roll a failed Dodge once per turn.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="tackle">
        <Accordion.Trigger>Tackle</Accordion.Trigger>
        <Accordion.Content>
          Cancels an opponent's Dodge and Side Step.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
