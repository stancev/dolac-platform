import Image from 'next/image'

import { Container } from '@/components/layout/Container'
import { Link } from '@/i18n/navigation'
import type { Media, Village } from '@/payload-types'

type Props = {
  village: Village
  villagesLabel: string
  entityLabel: string
}

export function VillageHero({ village, villagesLabel, entityLabel }: Props) {
  const heroImage = typeof village.heroImage === 'object' ? (village.heroImage as Media) : null

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-6 text-meta text-muted-foreground">
          <Link href="/villages" className="transition-colors hover:text-foreground">
            {villagesLabel}
          </Link>

          <span aria-hidden="true"> / </span>

          <span className="text-foreground">{village.name}</span>
        </nav>

        <div className="grid items-center gap-8 lg:grid-cols-[5fr_7fr] lg:gap-12">
          <div>
            <p className="text-eyebrow text-primary">{entityLabel}</p>

            <h1 className="mt-3 font-display text-page-title">{village.name}</h1>

            <p className="mt-5 text-lead text-muted-foreground">{village.shortDescription}</p>
          </div>

          {heroImage?.url && (
            <div className="overflow-hidden rounded-lg bg-muted">
              <Image
                src={heroImage.url}
                alt={heroImage.alt || village.name}
                width={heroImage.width || 1400}
                height={heroImage.height || 1000}
                className="aspect-4/3 h-full w-full object-cover"
                priority
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
