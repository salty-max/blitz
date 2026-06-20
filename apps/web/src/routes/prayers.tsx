import { prayers } from '@blitz/data'

import { RollTable } from '@/components/roll-table'

/** The Prayers to Nuffle table — D16 pre-match blessings the underdog may pray for. */
export function PrayersPage() {
  return (
    <div>
      <h1 className="font-display text-5xl uppercase">Prayers to Nuffle</h1>

      <div className="mt-6">
        <RollTable rows={prayers} resultHeader="Prayer" />
      </div>
    </div>
  )
}
