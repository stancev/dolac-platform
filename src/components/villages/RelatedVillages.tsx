import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import type { Village } from '@/payload-types'

import { VillageGrid } from './VillageGrid'

type Props = {
  villages: Village[]
  title: string
}

export function RelatedVillages({ villages, title }: Props) {
  if (villages.length === 0) {
    return null
  }

  return (
    <Section className="border-t border-border">
      <Container>
        <h2 className="font-display text-section-title">{title}</h2>

        <div className="mt-8">
          <VillageGrid villages={villages} />
        </div>
      </Container>
    </Section>
  )
}
