import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { getPayload } from 'payload'

import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { PlaceHero } from '@/components/places/PlaceHero'
import { PlaceAbout } from '@/components/places/PlaceAbout'
import { PlaceGallery } from '@/components/places/PlaceGallery'
import { PlaceLocation } from '@/components/places/PlaceLocation'
import { PlaceVillageContext } from '@/components/places/PlaceVillageContext'
import { RelatedPlaces } from '@/components/places/RelatedPlaces'
import { Link } from '@/i18n/navigation'
import config from '@/payload.config'

type Props = {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export default async function PlacePage({ params }: Props) {
  const { locale, slug } = await params

  const payload = await getPayload({ config })
  const t = await getTranslations('Places')

  const { docs } = await payload.find({
    collection: 'places',
    locale: locale as 'sr' | 'en',
    fallbackLocale: 'sr',
    depth: 2,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const place = docs[0]

  if (!place) {
    notFound()
  }

  return (
    <main>
      <Section>
        <Container>
          <nav
            aria-label={t('breadcrumbLabel')}
            className="mb-8 flex flex-wrap items-center gap-2 text-meta text-muted-foreground"
          >
            <Link href="/places" className="transition-colors hover:text-foreground">
              {t('breadcrumb')}
            </Link>

            <span aria-hidden="true">/</span>

            <span aria-current="page" className="text-foreground">
              {place.name}
            </span>
          </nav>

          <PlaceHero place={place} />
        </Container>
      </Section>

      <PlaceAbout description={place.description} />
      <PlaceGallery gallery={place.gallery} title={t('galleryTitle')} />
      <PlaceLocation
        latitude={place.coordinates.latitude}
        longitude={place.coordinates.longitude}
        placeName={place.name}
        accessDescription={place.accessDescription}
      />
      <PlaceVillageContext village={place.village} />
      <RelatedPlaces
        currentPlaceId={place.id}
        village={place.village}
        locale={locale as 'sr' | 'en'}
      />
    </main>
  )
}
