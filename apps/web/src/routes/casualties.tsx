import { casualties, type Casualty } from '@blitz/data'

import { RefText } from '@/components/ref-text'

/** Format a D16 roll range — a single face shows one number, a span shows "a–b". */
function rollLabel(roll: Casualty['roll']): string {
  return roll[0] === roll[1] ? `${roll[0]}` : `${roll[0]}–${roll[1]}`
}

/** The Casualty table — the D16 result rolled when a player is taken out of action. */
export function CasualtiesPage() {
  return (
    <div>
      <h1 className="font-display text-5xl uppercase">Casualties</h1>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b-2 border-ink font-headline text-xs uppercase tracking-wide text-ink/55">
              <th className="py-2 pr-3 text-center">Roll</th>
              <th className="px-3 py-2">Result</th>
              <th className="px-3 py-2">Effect</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10">
            {casualties.map((casualty) => (
              <tr key={casualty.key} className="align-baseline">
                <td className="py-2.5 pr-3 text-center font-display text-xl tabular-nums text-blood">
                  {rollLabel(casualty.roll)}
                </td>
                <td className="px-3 py-2.5 font-headline font-semibold uppercase tracking-wide">
                  {casualty.name}
                </td>
                <td className="px-3 py-2.5 text-ink/85">
                  <RefText>{casualty.effect}</RefText>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
