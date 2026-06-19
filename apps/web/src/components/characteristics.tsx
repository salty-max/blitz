import type { Characteristics } from '@blitz/schema'

const STATS = [
  { key: 'ma', label: 'MA', target: false },
  { key: 'st', label: 'ST', target: false },
  { key: 'ag', label: 'AG', target: true },
  { key: 'pa', label: 'PA', target: true },
  { key: 'av', label: 'AV', target: true },
] as const

/** A player's MA / ST / AG / PA / AV profile; roll-target stats render as "n+". */
export function CharacteristicsRow({
  characteristics,
}: {
  characteristics: Characteristics
}) {
  return (
    <dl className="inline-flex divide-x divide-ink/15 border border-ink/15 text-center font-headline tabular-nums">
      {STATS.map((stat) => {
        const value = characteristics[stat.key]
        return (
          <div key={stat.key} className="px-2.5 py-1">
            <dt className="text-[0.625rem] font-bold uppercase tracking-wider text-ink/45">
              {stat.label}
            </dt>
            <dd className="mt-1 text-base font-semibold leading-none">
              {value === null ? '–' : stat.target ? `${value}+` : value}
            </dd>
          </div>
        )
      })}
    </dl>
  )
}
