import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Pagination, type PaginationProps } from './pagination'

/** Holds the page in local state so the stories are interactive. */
function ControlledPagination(args: PaginationProps) {
  const [page, setPage] = useState(args.page)
  return <Pagination {...args} page={page} onPageChange={setPage} />
}

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  args: { page: 3, pageCount: 12, onPageChange: () => {} },
  render: (args) => <ControlledPagination {...args} />,
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const FewPages: Story = { args: { page: 2, pageCount: 4 } }
