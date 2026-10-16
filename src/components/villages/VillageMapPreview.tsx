import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { MapPreview } from '@/components/map/MapPreview'

type Props = {
  latitude: number
  longitude: number
  title: string
  frameTitle: string
  openMapLabel: string
}

export function VillageMapPreview({ latitude, longitude, title, frameTitle, openMapLabel }: Props) {
  return (
    <Section className="border-t border-border bg-card">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-12">
          <div>
            <h2 className="font-display text-section-title">{title}</h2>
          </div>

          <div>
            <MapPreview
              latitude={latitude}
              longitude={longitude}
              frameTitle={frameTitle}
              openMapLabel={openMapLabel}
            />
          </div>
        </div>
      </Container>
    </Section>
  )
}
