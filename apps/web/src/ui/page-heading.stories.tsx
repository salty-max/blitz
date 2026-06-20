import type { Meta, StoryObj } from '@storybook/react-vite'

import { PageHeading } from './page-heading'

const meta = {
  title: 'Components/PageHeading',
  component: PageHeading,
  tags: ['autodocs'],
  args: { children: 'Star Players' },
} satisfies Meta<typeof PageHeading>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
