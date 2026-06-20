import type { Meta, StoryObj } from '@storybook/react-vite'

import { EmptyState } from './empty-state'

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  args: { children: 'No stars match.' },
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
