import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { Link } from '@/i18n/navigation'
import type { Media, Place, Village } from '@/payload-types'

type Props = {
  place: Place
}

export async function PlaceHero({ place }: Props) {
  const t = await getTranslations('Places')

  const heroImage = typeof place.heroImage === 'object' ? (place.heroImage as Media) : null

  const village =
    place.village && typeof place.village === 'object' ? (place.village as Village) : null

  if (!heroImage?.url) {
    return null
  }

  return (
    <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-5">
        <p className="text-eyebrow text-primary">{t(`types.${place.placeType}`)}</p>

        <h1 className="mt-3 font-display text-page-title">{place.name}</h1>

        <p className="mt-5 text-lead text-muted-foreground">{place.shortDescription}</p>

        {village && (
          <div className="mt-5">
            <p className="text-eyebrow text-muted-foreground">{t('villageLabel')}</p>

            <Link
              href={{
                pathname: '/villages/[slug]',
                params: {
                  slug: village.slug,
                },
              }}
              className="mt-1 inline-flex min-h-11 items-center text-meta font-semibold text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {village.name}
            </Link>
          </div>
        )}

        <a
          href="#location"
          className="mt-6 hidden min-h-11 items-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:inline-flex"
        >
          {t('showOnMap')}
        </a>
      </div>

      <div className="lg:col-span-7">
        <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-muted sm:aspect-[16/10] lg:aspect-[4/3]">
          <Image
            src={heroImage.url}
            alt={heroImage.alt || place.name}
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover"
          />
        </div>

        <a
          href="#location"
          className="mt-6 inline-flex min-h-11 items-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:hidden"
        >
          {t('showOnMap')}
        </a>
      </div>
    </div>
  )
}
