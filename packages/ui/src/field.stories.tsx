import type { Meta, StoryObj } from '@storybook/react-vite'

import { Field } from './field'

const meta = {
  title: 'Components/Field',
  component: Field,
  tags: ['autodocs'],
  args: { label: 'Skills', children: 'Block · Tackle · Mighty Blow' },
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** The standalone `Field.Label`, used inline beside other content. */
export const StandaloneLabel: Story = {
  render: () => <Field.Label>Hireable by</Field.Label>,
}
