import { casualties, injuries, lastingInjuries } from '@blitz/data'

import { RefText } from '@/components/ref-text'
import { RollTable } from '@/components/roll-table'
import { PageHeading, SectionHeading } from '@/components/ui'

/** The injury sequence — the 2D6 Injury roll (and its Stunty variant) feeding the D16 Casualty table. */
export function InjuriesPage() {
  const standard = injuries.filter((injury) => injury.variant === 'standard')
  const stunty = injuries.filter((injury) => injury.variant === 'stunty')

  return (
    <div className="space-y-10">
      <PageHeading>Injuries</PageHeading>

      <section className="space-y-5">
        <SectionHeading hint="2D6">Injury roll</SectionHeading>
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
        <SectionHeading hint="D16">Casualty table</SectionHeading>
        <RollTable rows={casualties} />
      </section>

      <section className="space-y-5">
        <SectionHeading hint="D6">Lasting injury</SectionHeading>
        <p className="text-sm text-ink/70">
          A Lasting Injury casualty (13–14) rolls here for which characteristic
          drops by 1.
        </p>
        <RollTable rows={lastingInjuries} />
      </section>
    </div>
  )
}
