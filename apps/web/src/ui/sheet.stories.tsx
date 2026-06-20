import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from './button'
import { Sheet } from './sheet'

const meta = {
  title: 'Components/Sheet',
  component: Sheet,
  render: () => (
    <Sheet>
      <Sheet.Trigger asChild>
        <Button variant="outline">Open filters</Button>
      </Sheet.Trigger>
      <Sheet.Content>
        <div className="mx-auto w-full max-w-5xl px-5 py-5">
          <Sheet.Title>Filters</Sheet.Title>
          <Sheet.Description className="mt-2 text-sm text-ink/70">
            Narrow the roster by position and cost.
          </Sheet.Description>
          <div className="mt-6 flex justify-end">
            <Sheet.Close asChild>
              <Button>Done</Button>
            </Sheet.Close>
          </div>
        </div>
      </Sheet.Content>
    </Sheet>
  ),
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
