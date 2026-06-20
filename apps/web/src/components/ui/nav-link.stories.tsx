import type { Meta, StoryObj } from '@storybook/react-vite'

import { navLinkVariants } from './nav-link'

/**
 * `navLinkVariants` styles a link for either the masthead (on ink) or a section
 * sub-nav (on paper); the active item is keyed off `data-status="active"`.
 */
const meta = {
  title: 'Components/NavLink',
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Section: Story = {
  render: () => (
    <nav className="flex gap-5 font-headline text-sm font-semibold uppercase tracking-wide">
      <a className={navLinkVariants({ tone: 'section' })}>Skills</a>
      <a className={navLinkVariants({ tone: 'section' })} data-status="active">
        Teams
      </a>
      <a className={navLinkVariants({ tone: 'section' })}>Inducements</a>
    </nav>
  ),
}

export const Masthead: Story = {
  render: () => (
    <nav className="flex gap-5 bg-ink p-4 font-headline text-sm font-semibold uppercase tracking-wide">
      <a className={navLinkVariants({ tone: 'masthead' })}>Codex</a>
      <a className={navLinkVariants({ tone: 'masthead' })} data-status="active">
        Teams
      </a>
      <a className={navLinkVariants({ tone: 'masthead' })}>Leagues</a>
    </nav>
  ),
}
