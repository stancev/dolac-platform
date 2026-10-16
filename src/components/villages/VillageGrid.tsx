import { CardGrid } from '@/components/layout/CardGrid'
import type { Village } from '@/payload-types'

import { VillageCard } from './VillageCard'

type Props = {
  villages: Village[]
}

export function VillageGrid({ villages }: Props) {
  return (
    <CardGrid>
      {villages.map((village) => (
        <VillageCard key={village.id} village={village} />
      ))}
    </CardGrid>
  )
}
