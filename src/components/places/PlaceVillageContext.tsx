import { getTranslations } from 'next-intl/server'

import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Link } from '@/i18n/navigation'
import type { Place, Village } from '@/payload-types'

type Props = {
  village: Place['village']
}

export async function PlaceVillageContext({ village }: Props) {
  if (!village || typeof village !== 'object') {
    return null
  }

  const resolvedVillage = village as Village
  const t = await getTranslations('Places')

  return (
    <Section className="border-t border-border">
      <Container>
        <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
          <p className="text-eyebrow text-muted-foreground">{t('villageContextLabel')}</p>

          <h2 className="mt-2 font-display text-card-title">{resolvedVillage.name}</h2>

          <Link
            href={{
              pathname: '/villages/[slug]',
              params: {
                slug: resolvedVillage.slug,
              },
            }}
            className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {t('exploreVillage')} →
          </Link>
        </div>
      </Container>
    </Section>
  )
}
