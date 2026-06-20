import { casualties, injuries, lastingInjuries } from '@blitz/data'

import { RefText } from '@/components/ref-text'

type Row = { key: string; roll: [number, number]; name: string; effect: string }

/** Format a dice roll range — a single face shows one number, a span shows "a–b". */
function rollLabel(roll: [number, number]): string {
  return roll[0] === roll[1] ? `${roll[0]}` : `${roll[0]}–${roll[1]}`
}

/** A roll table — a dice range, the result it yields, and the result's effect. */
function RollTable({ rows }: { rows: Row[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b-2 border-ink font-headline text-xs uppercase tracking-wide text-ink/55">
            <th className="py-2 pr-3 text-center">Roll</th>
            <th className="px-3 py-2">Result</th>
            <th className="px-3 py-2">Effect</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink/10">
          {rows.map((row) => (
            <tr key={row.key} className="align-baseline">
              <td className="py-2.5 pr-3 text-center font-display text-xl tabular-nums text-blood">
                {rollLabel(row.roll)}
              </td>
              <td className="px-3 py-2.5 font-headline font-semibold uppercase tracking-wide">
                {row.name}
              </td>
              <td className="px-3 py-2.5 text-ink/85">
                <RefText>{row.effect}</RefText>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** A section heading paired with the dice it is rolled on. */
function TableHead({ children, die }: { children: string; die: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <h2 className="font-display text-3xl uppercase">{children}</h2>
      <span className="font-headline text-xs font-semibold uppercase tracking-wide text-ink/45">
        {die}
      </span>
    </div>
  )
}

/** The injury sequence — the 2D6 Injury roll (and its Stunty variant) feeding the D16 Casualty table. */
export function InjuriesPage() {
  const standard = injuries.filter((injury) => injury.variant === 'standard')
  const stunty = injuries.filter((injury) => injury.variant === 'stunty')

  return (
    <div className="space-y-10">
      <h1 className="font-display text-5xl uppercase">Injuries</h1>

      <section className="space-y-5">
        <TableHead die="2D6">Injury roll</TableHead>
        <RollTable rows={standard} />
        <div className="space-y-3">
          <p className="text-sm text-ink/70">
            <RefText>
              {'Players with the [[stunty]] trait use this harsher table.'}
            </RefText>
          </p>
          <RollTable rows={stunty} />
        </div>
      </section>

      <section className="space-y-5">
        <TableHead die="D16">Casualty table</TableHead>
        <RollTable rows={casualties} />
      </section>

      <section className="space-y-5">
        <TableHead die="D6">Lasting injury</TableHead>
        <p className="text-sm text-ink/70">
          A Lasting Injury casualty (13–14) rolls here for which characteristic
          drops by 1.
        </p>
        <RollTable rows={lastingInjuries} />
      </section>
    </div>
  )
}
