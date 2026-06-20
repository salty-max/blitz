import type { Meta, StoryObj } from '@storybook/react-vite'

import { SectionHeading } from './section-heading'

const meta = {
  title: 'Components/SectionHeading',
  component: SectionHeading,
  args: { children: 'General', hint: '· 12' },
  argTypes: {
    tone: { control: 'inline-radio', options: ['ink', 'blood'] },
    bordered: { control: 'boolean' },
  },
} satisfies Meta<typeof SectionHeading>

export default meta
type Story = StoryObj<typeof meta>

export const Plain: Story = {}
export const Blood: Story = { args: { tone: 'blood' } }
export const Bordered: Story = { args: { tone: 'blood', bordered: true } }
