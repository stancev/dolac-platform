import { getTranslations } from 'next-intl/server'

import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { RichText } from '@/components/content/RichText'
import type { Place } from '@/payload-types'

type Props = {
  description: Place['description']
}

export async function PlaceAbout({ description }: Props) {
  if (!description) {
    return null
  }

  const t = await getTranslations('Places')

  return (
    <Section>
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-section-title">{t('aboutTitle')}</h2>
          </div>

          <div className="lg:col-span-8">
            <div className="max-w-180">
              <RichText data={description} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
