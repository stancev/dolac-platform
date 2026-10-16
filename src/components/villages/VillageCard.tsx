import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { DiscoveryCard } from '@/components/cards/DiscoveryCard'
import type { Media, Village } from '@/payload-types'

type Props = {
  village: Village
}

export async function VillageCard({ village }: Props) {
  const t = await getTranslations('Villages')

  const heroImage = typeof village.heroImage === 'object' ? (village.heroImage as Media) : null

  if (!heroImage?.url) {
    return null
  }

  return (
    <DiscoveryCard
      href={{
        pathname: '/villages/[slug]',
        params: {
          slug: village.slug,
        },
      }}
      image={
        <Image
          src={heroImage.url}
          alt={heroImage.alt || village.name}
          width={heroImage.width || 1200}
          height={heroImage.height || 900}
        />
      }
    >
      <h2 className="font-display text-card-title transition-colors duration-200 group-hover:text-primary">
        {village.name}
      </h2>

      {village.shortDescription && (
        <p className="mt-3 text-body text-muted-foreground">{village.shortDescription}</p>
      )}

      <span className="mt-auto pt-5 inline-flex min-h-11 items-center text-sm font-semibold text-primary">
        {t('cardCta')} →
      </span>
    </DiscoveryCard>
  )
}
