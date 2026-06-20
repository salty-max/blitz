import type { Decorator, Meta, StoryObj } from '@storybook/react-vite'

import { Button } from './button'
import { ToastProvider, useToast } from './toast'

const withProvider: Decorator = (Story) => (
  <ToastProvider>
    <Story />
  </ToastProvider>
)

/** A pair of buttons that raise toasts via the `useToast` hook. */
function ToastDemo() {
  const { toast } = useToast()
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: 'Roster saved',
            description: 'Reikland Reavers — 11 players.',
            tone: 'success',
          })
        }
      >
        Save roster
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: 'Over budget',
            description: 'Trim 40k to draft this roster.',
            tone: 'danger',
          })
        }
      >
        Trigger error
      </Button>
    </div>
  )
}

const meta = {
  title: 'Components/Toast',
  component: ToastProvider,
  args: { children: null },
  render: () => <ToastDemo />,
  decorators: [withProvider],
} satisfies Meta<typeof ToastProvider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
