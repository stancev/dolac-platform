import { getTranslations } from 'next-intl/server'

export default async function HomePage() {
  const t = await getTranslations('Home')

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-river">
          {t('eyebrow')}
        </p>

        <h1 className="font-display text-5xl font-semibold tracking-tight sm:text-6xl">
          {t('title')}
        </h1>

        <p className="mt-6 text-lg leading-8 text-muted-foreground">{t('description')}</p>
      </div>
    </main>
  )
}
