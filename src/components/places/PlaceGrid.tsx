import { CardGrid } from '@/components/layout/CardGrid'
import type { Place } from '@/payload-types'

import { PlaceCard } from './PlaceCard'

type Props = {
  places: Place[]
}

export function PlaceGrid({ places }: Props) {
  return (
    <CardGrid>
      {places.map((place, index) => (
        <PlaceCard key={place.id} place={place} imagePriority={index === 0} />
      ))}
    </CardGrid>
  )
}
