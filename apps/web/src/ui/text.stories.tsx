import type { Meta, StoryObj } from '@storybook/react-vite'

import { Text } from './text'

const VARIANTS = [
  'display',
  'title',
  'heading',
  'subheading',
  'eyebrow',
  'label',
  'labelLg',
  'overline',
  'lead',
  'body',
  'caption',
  'stat',
  'figure',
] as const

const INK_TONES = [
  'default',
  'secondary',
  'muted',
  'blood',
  'gold',
  'pitch',
] as const

const meta = {
  title: 'Components/Text',
  component: Text,
  args: { children: 'Block with the best.' },
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    tone: {
      control: 'inline-radio',
      options: [...INK_TONES, 'paper', 'paperMuted'],
    },
    weight: {
      control: 'inline-radio',
      options: ['normal', 'medium', 'semibold', 'bold'],
    },
    tabular: { control: 'boolean' },
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Body: Story = {}
export const Heading: Story = {
  args: { variant: 'heading', children: 'Section heading' },
}
export const Label: Story = { args: { variant: 'label', children: 'Re-rolls' } }
export const Stat: Story = {
  args: { variant: 'stat', tone: 'blood', children: '110k' },
}

/** The full type scale, one row per variant. */
export const Scale: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex items-baseline gap-4">
          <Text variant="overline" tone="muted" className="w-20 shrink-0">
            {variant}
          </Text>
          <Text variant={variant}>Block with the best</Text>
        </div>
      ))}
    </div>
  ),
}

/** Ink and accent tones on paper; the paper tones shown on a dark surface. */
export const Tones: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        {INK_TONES.map((tone) => (
          <Text key={tone} variant="labelLg" tone={tone}>
            {tone}
          </Text>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 bg-ink p-3">
        {(['paper', 'paperMuted'] as const).map((tone) => (
          <Text key={tone} variant="labelLg" tone={tone}>
            {tone}
          </Text>
        ))}
      </div>
    </div>
  ),
}
