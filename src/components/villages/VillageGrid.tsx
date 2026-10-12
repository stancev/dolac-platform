import type { Village } from '@/payload-types'

import { VillageCard } from './VillageCard'

type Props = {
  villages: Village[]
}

export function VillageGrid({ villages }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
      {villages.map((village) => (
        <VillageCard key={village.id} village={village} />
      ))}
    </div>
  )
}
