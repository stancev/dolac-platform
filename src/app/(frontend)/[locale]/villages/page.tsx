import { getTranslations } from 'next-intl/server'
import { getPayload } from 'payload'

import { Container } from '@/components/layout/Container'
import { VillageGrid } from '@/components/villages/VillageGrid'
import config from '@/payload.config'

type Props = {
  params: Promise<{
    locale: string
  }>
}

export default async function VillagesPage({ params }: Props) {
  const { locale } = await params

  const payload = await getPayload({ config })
  const t = await getTranslations('Villages')

  const { docs: villages } = await payload.find({
    collection: 'villages',
    locale: locale as 'sr' | 'en',
    fallbackLocale: 'sr',
    sort: 'name',
    limit: 100,
    depth: 1,
  })

  return (
    <main>
      <section className="py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="text-eyebrow text-primary">{t('eyebrow')}</p>

            <h1 className="mt-3 font-display text-page-title">{t('title')}</h1>

            <p className="mt-5 text-lead text-muted-foreground">{t('description')}</p>
          </div>
        </Container>
      </section>

      <section className="pb-16 sm:pb-20 lg:pb-24">
        <Container>
          <VillageGrid villages={villages} />
        </Container>
      </section>
    </main>
  )
}
