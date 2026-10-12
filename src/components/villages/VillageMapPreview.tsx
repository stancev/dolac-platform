import { ExternalLink } from 'lucide-react'

import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'

type Props = {
  latitude: number
  longitude: number
  title: string
  frameTitle: string
  openMapLabel: string
}

const MAP_BOUNDS_OFFSET = 0.012

export function VillageMapPreview({ latitude, longitude, title, frameTitle, openMapLabel }: Props) {
  const left = longitude - MAP_BOUNDS_OFFSET
  const right = longitude + MAP_BOUNDS_OFFSET
  const top = latitude + MAP_BOUNDS_OFFSET
  const bottom = latitude - MAP_BOUNDS_OFFSET

  const embedUrl =
    `https://www.openstreetmap.org/export/embed.html` +
    `?bbox=${left},${bottom},${right},${top}` +
    `&layer=mapnik` +
    `&marker=${latitude},${longitude}`

  const mapUrl =
    `https://www.openstreetmap.org/` +
    `?mlat=${latitude}&mlon=${longitude}` +
    `#map=15/${latitude}/${longitude}`

  return (
    <Section className="border-t border-border bg-card">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-12">
          <div>
            <h2 className="font-display text-section-title">{title}</h2>
          </div>

          <div>
            <div className="overflow-hidden rounded-lg border border-border bg-muted">
              <iframe
                src={embedUrl}
                title={frameTitle}
                loading="lazy"
                className="h-72 w-full border-0 sm:h-80"
              />
            </div>

            <a
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              {openMapLabel}
              <ExternalLink aria-hidden="true" className="size-4" />
            </a>
          </div>
        </div>
      </Container>
    </Section>
  )
}
