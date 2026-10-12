import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { RichText } from '@/components/content/RichText'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'

type Props = {
  description: SerializedEditorState
  title: string
}

export function VillageAbout({ description, title }: Props) {
  return (
    <Section className="border-t border-border bg-card">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-12">
          <div>
            <h2 className="font-display text-section-title">{title}</h2>
          </div>

          <div className="max-w-3xl">
            <RichText data={description} />
          </div>
        </div>
      </Container>
    </Section>
  )
}
