import { hasLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { VillageHero } from '@/components/villages/VillageHero'
import { VillageAbout } from '@/components/villages/VillageAbout'
import { VillageGallery } from '@/components/villages/VillageGallery'
import { VillageMapPreview } from '@/components/villages/VillageMapPreview'
import { RelatedVillages } from '@/components/villages/RelatedVillages'

import { routing } from '@/i18n/routing'
import config from '@/payload.config'

type Locale = (typeof routing.locales)[number]

type Props = {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export default async function VillageDetailPage({ params }: Props) {
  const { locale, slug } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const currentLocale = locale as Locale

  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'villages',
    where: {
      slug: {
        equals: slug,
      },
    },
    locale: currentLocale,
    fallbackLocale: routing.defaultLocale,
    depth: 1,
    limit: 1,
  })

  const village = docs[0]

  if (!village) {
    notFound()
  }

  const t = await getTranslations({
    locale: currentLocale,
    namespace: 'VillageDetail',
  })

  const { docs: relatedVillages } = await payload.find({
    collection: 'villages',
    where: {
      slug: {
        not_equals: village.slug,
      },
    },
    locale: currentLocale,
    fallbackLocale: routing.defaultLocale,
    depth: 1,
    limit: 3,
    sort: 'name',
  })

  return (
    <main>
      <VillageHero village={village} villagesLabel={t('villages')} entityLabel={t('entity')} />

      {village.description && (
        <VillageAbout
          description={village.description as SerializedEditorState}
          title={t('about')}
        />
      )}

      {village.gallery && village.gallery.length > 0 && (
        <VillageGallery gallery={village.gallery} title={t('gallery')} />
      )}

      {village.coordinates?.latitude != null && village.coordinates?.longitude != null && (
        <VillageMapPreview
          latitude={village.coordinates.latitude}
          longitude={village.coordinates.longitude}
          title={t('mapTitle')}
          frameTitle={t('mapFrameTitle')}
          openMapLabel={t('openMap')}
        />
      )}

      <RelatedVillages villages={relatedVillages} title={t('otherVillages')} />
    </main>
  )
}
