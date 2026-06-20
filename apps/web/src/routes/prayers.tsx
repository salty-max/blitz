import { prayers } from '@blitz/data'
import { PageHeading } from '@blitz/ui'

import { RollTable } from '@/components/roll-table'

/** The Prayers to Nuffle table — D16 pre-match blessings the underdog may pray for. */
export function PrayersPage() {
  return (
    <div>
      <PageHeading>Prayers to Nuffle</PageHeading>

      <div className="mt-6">
        <RollTable rows={prayers} resultHeader="Prayer" />
      </div>
    </div>
  )
}
