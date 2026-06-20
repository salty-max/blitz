import type { Meta, StoryObj } from '@storybook/react-vite'

import { Table } from './table'

const ROWS = [
  { position: 'Lineman', ma: 6, st: 3, cost: '50k' },
  { position: 'Blitzer', ma: 7, st: 3, cost: '85k' },
  { position: 'Thrower', ma: 6, st: 3, cost: '70k' },
]

const meta = {
  title: 'Components/Table',
  component: Table,
  render: () => (
    <Table className="w-[34rem]">
      <Table.Header>
        <Table.Row>
          <Table.Head className="pr-3">Position</Table.Head>
          <Table.Head className="px-2 text-center">MA</Table.Head>
          <Table.Head className="px-2 text-center">ST</Table.Head>
          <Table.Head className="px-2 text-right">Cost</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {ROWS.map((row) => (
          <Table.Row key={row.position}>
            <Table.Cell className="pr-3 font-headline font-semibold uppercase tracking-wide">
              {row.position}
            </Table.Cell>
            <Table.Cell className="px-2 text-center font-headline tabular-nums">
              {row.ma}
            </Table.Cell>
            <Table.Cell className="px-2 text-center font-headline tabular-nums">
              {row.st}
            </Table.Cell>
            <Table.Cell className="px-2 text-right font-headline tabular-nums">
              {row.cost}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
