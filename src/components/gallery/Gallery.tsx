import Image from 'next/image'

import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import type { Media } from '@/payload-types'

type GalleryItem = {
  id?: string | number | null
  image: Media | string | number
  caption?: string | null
}

type Props = {
  items: GalleryItem[]
  title: string
}

export function Gallery({ items, title }: Props) {
  const resolvedItems = items.filter(
    (
      item,
    ): item is GalleryItem & {
      image: Media & { url: string }
    } => typeof item.image === 'object' && item.image !== null && Boolean(item.image.url),
  )

  if (resolvedItems.length === 0) {
    return null
  }

  const gridClass =
    resolvedItems.length === 1
      ? 'mt-8'
      : resolvedItems.length === 2
        ? 'mt-8 grid gap-4 md:grid-cols-2'
        : 'mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3'

  const imageSizes =
    resolvedItems.length === 1
      ? 'calc(100vw - 2.5rem)'
      : resolvedItems.length === 2
        ? '(min-width: 768px) 50vw, calc(100vw - 2.5rem)'
        : '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, calc(100vw - 2.5rem)'

  return (
    <Section className="border-t border-border">
      <Container>
        <h2 className="font-display text-section-title">{title}</h2>

        <div className={gridClass}>
          {resolvedItems.map((item) => {
            const image = item.image

            return (
              <figure key={item.id ?? image.id}>
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src={image.url}
                    alt={image.alt || ''}
                    width={image.width || 1400}
                    height={image.height || 1000}
                    className="aspect-4/3 h-full w-full object-cover"
                    sizes={imageSizes}
                  />
                </div>

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
