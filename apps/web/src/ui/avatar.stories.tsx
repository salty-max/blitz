import type { Meta, StoryObj } from '@storybook/react-vite'

import { Avatar } from './avatar'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  args: { fallback: 'OR', alt: 'Orcland Raiders' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Initials: Story = {}
export const Small: Story = { args: { size: 'sm', fallback: 'DE' } }
export const Large: Story = { args: { size: 'lg', fallback: 'RR' } }
