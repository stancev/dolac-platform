import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { DiscoveryCard } from '@/components/cards/DiscoveryCard'
import type { Media, Place, Village } from '@/payload-types'

type Props = {
  place: Place
  imagePriority?: boolean
}

export async function PlaceCard({ place, imagePriority = false }: Props) {
  const t = await getTranslations('Places')

  const heroImage = typeof place.heroImage === 'object' ? (place.heroImage as Media) : null

  const village =
    place.village && typeof place.village === 'object' ? (place.village as Village) : null

  if (!heroImage?.url) {
    return null
  }

  return (
    <DiscoveryCard
      href={{
        pathname: '/places/[slug]',
        params: {
          slug: place.slug,
        },
      }}
      image={
        <Image
          src={heroImage.url}
          alt={heroImage.alt || place.name}
          width={heroImage.width || 1200}
          height={heroImage.height || 900}
          sizes="
    (max-width: 767px) calc(100vw - 2.5rem),
    (max-width: 1023px) calc(50vw - 2rem),
    30vw
  "
          loading={imagePriority ? 'eager' : 'lazy'}
          fetchPriority={imagePriority ? 'high' : 'auto'}
        />
      }
    >
      <p className="text-eyebrow text-primary">{t(`types.${place.placeType}`)}</p>

      <h2 className="mt-2 font-display text-card-title transition-colors duration-200 group-hover:text-primary">
        {place.name}
      </h2>

      {village && <p className="mt-2 text-meta text-muted-foreground">{village.name}</p>}

      <p className="mt-3 text-body text-muted-foreground">{place.shortDescription}</p>

      <span className="mt-auto pt-5 inline-flex min-h-11 items-center text-sm font-semibold text-primary">
        {t('cardCta')} →
      </span>
    </DiscoveryCard>
  )
}
