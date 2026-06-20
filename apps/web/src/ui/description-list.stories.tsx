import type { Meta, StoryObj } from '@storybook/react-vite'

import { DescriptionList } from './description-list'

const meta = {
  title: 'Components/DescriptionList',
  component: DescriptionList,
  render: () => (
    <DescriptionList className="w-[34rem]">
      <DescriptionList.Row term="Block">
        Not knocked down on a Both Down result.
      </DescriptionList.Row>
      <DescriptionList.Row term="Dodge">
        Re-roll a failed Dodge once per turn.
      </DescriptionList.Row>
      <DescriptionList.Row term="Tackle">
        Opponents can&rsquo;t use Dodge to leave your tackle zone.
      </DescriptionList.Row>
    </DescriptionList>
  ),
} satisfies Meta<typeof DescriptionList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
