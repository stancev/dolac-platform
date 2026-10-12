import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { Link } from '@/i18n/navigation'
import type { Media, Village } from '@/payload-types'

type Props = {
  village: Village
}

export async function VillageCard({ village }: Props) {
  const t = await getTranslations('Villages')
  const heroImage = typeof village.heroImage === 'object' ? (village.heroImage as Media) : null

  return (
    <article className="group overflow-hidden rounded-lg border border-border bg-card text-card-foreground">
      <Link
        href={{
          pathname: '/villages/[slug]',
          params: {
            slug: village.slug,
          },
        }}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {heroImage?.url && (
          <div className="aspect-4/3 overflow-hidden bg-muted">
            <Image
              src={heroImage.url}
              alt={heroImage.alt || village.name}
              width={heroImage.width || 1200}
              height={heroImage.height || 900}
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </div>
        )}

        <div className="p-5 sm:p-6">
          <h2 className="font-display text-card-title transition-colors duration-200 group-hover:text-primary">
            {village.name}
          </h2>

          {village.shortDescription && (
            <p className="mt-3 text-body leading-6 text-muted-foreground">
              {village.shortDescription}
            </p>
          )}

          <span className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-primary">
            {t('cardCta')} →
          </span>
        </div>
      </Link>
    </article>
  )
}
