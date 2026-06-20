import { prayers } from '@blitz/data'

import { RefText } from '@/components/ref-text'

/** The Prayers to Nuffle table — D16 pre-match blessings the underdog may pray for. */
export function PrayersPage() {
  return (
    <div>
      <h1 className="font-display text-5xl uppercase">Prayers to Nuffle</h1>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b-2 border-ink font-headline text-xs uppercase tracking-wide text-ink/55">
              <th className="py-2 pr-3 text-center">Roll</th>
              <th className="px-3 py-2">Prayer</th>
              <th className="px-3 py-2">Effect</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10">
            {prayers.map((prayer) => (
              <tr key={prayer.key} className="align-baseline">
                <td className="py-2.5 pr-3 text-center font-display text-xl tabular-nums text-blood">
                  {prayer.roll}
                </td>
                <td className="px-3 py-2.5 font-headline font-semibold uppercase tracking-wide">
                  {prayer.name}
                </td>
                <td className="px-3 py-2.5 text-ink/85">
                  <RefText>{prayer.effect}</RefText>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
