import { getTranslations } from 'next-intl/server'
import { getPayload } from 'payload'

import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { PlaceGrid } from '@/components/places/PlaceGrid'
import { PlaceTypeFilter } from '@/components/places/PlaceTypeFilter'
import { Link } from '@/i18n/navigation'
import { filterablePlaceTypes, type PlaceType } from '@/lib/placeTypes'
import config from '@/payload.config'

type Props = {
  params: Promise<{
    locale: string
  }>
  searchParams: Promise<{
    type?: string | string[]
  }>
}

function isFilterablePlaceType(value: string | undefined): value is PlaceType {
  return value !== undefined && (filterablePlaceTypes as readonly string[]).includes(value)
}

export default async function PlacesPage({ params, searchParams }: Props) {
  const { locale } = await params
  const query = await searchParams

  const requestedType = typeof query.type === 'string' ? query.type : undefined

  const activeType = isFilterablePlaceType(requestedType) ? requestedType : undefined

  const payload = await getPayload({ config })
  const t = await getTranslations('Places')

  const [{ docs: places }, { docs: placeTypes }] = await Promise.all([
    payload.find({
      collection: 'places',
      locale: locale as 'sr' | 'en',
      fallbackLocale: 'sr',
      depth: 1,
      limit: 100,
      sort: 'name',
      ...(activeType && {
        where: {
          placeType: {
            equals: activeType,
          },
        },
      }),
    }),

    payload.find({
      collection: 'places',
      depth: 0,
      pagination: false,
      select: {
        placeType: true,
      },
    }),
  ])

  const availableTypes = Array.from(
    new Set(
      placeTypes
        .map((place) => place.placeType)
        .filter(
          (type): type is PlaceType =>
            type !== undefined && (filterablePlaceTypes as readonly PlaceType[]).includes(type),
        ),
    ),
  )

  return (
    <main>
      <Section>
        <Container>
          <div className="max-w-3xl">
            <p className="text-eyebrow text-primary">{t('eyebrow')}</p>

            <h1 className="mt-3 font-display text-page-title">{t('title')}</h1>

            <p className="mt-5 text-lead text-muted-foreground">{t('description')}</p>
          </div>

          <div className="mt-8">
            <PlaceTypeFilter activeType={activeType} availableTypes={availableTypes} />
          </div>
        </Container>
      </Section>

      <section className="pb-16 sm:pb-20 lg:pb-24">
        <Container>
          {places.length > 0 ? (
            <PlaceGrid places={places} />
          ) : (
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="text-body text-muted-foreground">{t('empty')}</p>

              {activeType && (
                <Link
                  href="/places"
                  className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-primary hover:underline"
                >
                  {t('showAll')}
                </Link>
              )}
            </div>
          )}
        </Container>
      </section>
    </main>
  )
}
