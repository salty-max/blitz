import { Table } from '@blitz/ui'

import { RefText } from '@/components/ref-text'

/** A row of a {@link RollTable}: a die roll (single face or inclusive range), the result, and its effect. */
export type RollTableRow = {
  key: string
  roll: number | [number, number]
  name: string
  effect: string
}

const rollLabel = (roll: number | [number, number]): string => {
  if (typeof roll === 'number') return `${roll}`
  return roll[0] === roll[1] ? `${roll[0]}` : `${roll[0]}–${roll[1]}`
}

/** A dice-roll reference table — the roll, the result it yields, and the result's effect. */
export function RollTable({
  rows,
  resultHeader = 'Result',
}: {
  rows: RollTableRow[]
  /** Heading for the middle column (e.g. `Prayer`); defaults to `Result`. */
  resultHeader?: string
}) {
  return (
    <Table className="min-w-[36rem]">
      <Table.Header>
        <Table.Row>
          <Table.Head className="pr-3 text-center">Roll</Table.Head>
          <Table.Head className="px-3">{resultHeader}</Table.Head>
          <Table.Head className="px-3">Effect</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rows.map((row) => (
          <Table.Row key={row.key}>
            <Table.Cell className="pr-3 text-center font-display text-xl tabular-nums text-blood">
              {rollLabel(row.roll)}
            </Table.Cell>
            <Table.Cell className="px-3 font-headline font-semibold uppercase tracking-wide">
              {row.name}
            </Table.Cell>
            <Table.Cell className="px-3 text-ink/85">
              <RefText>{row.effect}</RefText>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
