import { getTranslations } from 'next-intl/server'
import { getPayload } from 'payload'

import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { PlaceGrid } from '@/components/places/PlaceGrid'
import type { Place, Village } from '@/payload-types'
import config from '@/payload.config'

type Props = {
  currentPlaceId: Place['id']
  village: Place['village']
  locale: 'sr' | 'en'
}

export async function RelatedPlaces({ currentPlaceId, village, locale }: Props) {
  if (!village || typeof village !== 'object') {
    return null
  }

  const resolvedVillage = village as Village

  const payload = await getPayload({ config })
  const t = await getTranslations('Places')

  const { docs: places } = await payload.find({
    collection: 'places',
    locale,
    fallbackLocale: 'sr',
    depth: 2,
    limit: 3,
    sort: 'name',
    where: {
      and: [
        {
          village: {
            equals: resolvedVillage.id,
          },
        },
        {
          id: {
            not_equals: currentPlaceId,
          },
        },
      ],
    },
  })

  if (places.length === 0) {
    return null
  }

  return (
    <Section className="border-t border-border">
      <Container>
        <h2 className="font-display text-section-title">
          {t('morePlacesInVillage', {
            village: resolvedVillage.name,
          })}
        </h2>

        <div className="mt-8">
          <PlaceGrid places={places} />
        </div>
      </Container>
    </Section>
  )
}
