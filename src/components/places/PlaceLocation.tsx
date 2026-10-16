import { getTranslations } from 'next-intl/server'

import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { MapPreview } from '@/components/map/MapPreview'

type Props = {
  latitude: number
  longitude: number
  placeName: string
  accessDescription?: string | null
}

export async function PlaceLocation({ latitude, longitude, placeName, accessDescription }: Props) {
  const t = await getTranslations('Places')

  return (
    <div id="location" className="scroll-mt-24">
      <Section className="border-t border-border bg-card">
        <Container>
          <h2 className="font-display text-section-title">{t('locationTitle')}</h2>

          <div className={accessDescription ? 'mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12' : 'mt-8'}>
            <div className={accessDescription ? 'lg:col-span-8' : undefined}>
              <MapPreview
                latitude={latitude}
                longitude={longitude}
                frameTitle={t('mapFrameTitle', {
                  name: placeName,
                })}
                openMapLabel={t('openMap')}
              />
            </div>

            {accessDescription && (
              <div className="lg:col-span-4">
                <p className="text-body text-muted-foreground">{accessDescription}</p>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </div>
  )
}
