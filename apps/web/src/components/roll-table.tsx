import { useTranslation } from 'react-i18next'

import { RefText } from '@/reference/ref-text'
import { cn, Table, textVariants } from '@/ui'

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
  resultHeader,
}: {
  rows: RollTableRow[]
  /** Heading for the middle column (e.g. `Prayer`); defaults to the localized `Result`. */
  resultHeader?: string
}) {
  const { t } = useTranslation('codex')
  return (
    <Table className="min-w-[36rem]">
      <Table.Header>
        <Table.Row>
          <Table.Head className="pr-3 text-center">
            {t('rollTable.roll')}
          </Table.Head>
          <Table.Head className="px-3">
            {resultHeader ?? t('rollTable.result')}
          </Table.Head>
          <Table.Head className="px-3">{t('rollTable.effect')}</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rows.map((row) => (
          <Table.Row key={row.key}>
            <Table.Cell
              className={cn(
                textVariants({ variant: 'stat', tone: 'blood' }),
                'whitespace-nowrap pr-3 text-center'
              )}
            >
              {rollLabel(row.roll)}
            </Table.Cell>
            <Table.Cell
              className={cn(textVariants({ variant: 'labelLg' }), 'px-3')}
            >
              {row.name}
            </Table.Cell>
            <Table.Cell
              className={cn(textVariants({ tone: 'default' }), 'px-3')}
            >
              <RefText>{row.effect}</RefText>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
