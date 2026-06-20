import type { Meta, StoryObj } from '@storybook/react-vite'

import { Breadcrumb } from './breadcrumb'

const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  args: { children: null },
  render: () => (
    <Breadcrumb>
      <Breadcrumb.Item asChild>
        <a href="#codex">Codex</a>
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item asChild>
        <a href="#teams">Teams</a>
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item current>Orcland Raiders</Breadcrumb.Item>
    </Breadcrumb>
  ),
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
