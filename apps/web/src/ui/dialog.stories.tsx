import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from './button'
import { Dialog } from './dialog'

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  render: () => (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant="outline">Disband team</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Disband team?</Dialog.Title>
        <Dialog.Description>
          This permanently removes the Reikland Reavers and their season
          history. This can't be undone.
        </Dialog.Description>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button variant="ghost">Cancel</Button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <Button>Disband</Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  ),
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
