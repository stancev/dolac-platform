import Image from 'next/image'

import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'

import type { Media, Village } from '@/payload-types'

type Gallery = NonNullable<Village['gallery']>

type Props = {
  gallery: Gallery
  title: string
}

export function VillageGallery({ gallery, title }: Props) {
  const items = gallery.filter(
    (item): item is typeof item & { image: Media } =>
      typeof item.image === 'object' && Boolean(item.image?.url),
  )

  if (items.length === 0) {
    return null
  }

  return (
    <Section className="border-t border-border">
      <Container>
        <h2 className="font-display text-section-title">{title}</h2>

        <div className={items.length === 1 ? 'mt-8' : 'mt-8 grid gap-4 md:grid-cols-2'}>
          {items.map((item) => {
            const image = item.image

            return (
              <figure key={item.id ?? image.id} className="overflow-hidden rounded-lg">
                <Image
                  src={image.url!}
                  alt={image.alt || ''}
                  width={image.width || 1400}
                  height={image.height || 1000}
                  className="aspect-4/3 h-full w-full object-cover"
                />

                {item.caption && (
                  <figcaption className="mt-2 text-meta text-muted-foreground">
                    {item.caption}
                  </figcaption>
                )}
              </figure>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
