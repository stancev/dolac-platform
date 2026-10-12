import type { Metadata } from 'next'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import React from 'react'

import { routing } from '@/i18n/routing'
import { inter, sourceSerif } from '@/lib/fonts'

import '../styles.css'

export const metadata: Metadata = {
  title: 'Naš kraj',
  description: 'Digitalni atlas Dolca, Gradišta i belopalanačkog dela Sićevačke klisure.',
}

type Props = {
  children: React.ReactNode
  params: Promise<{
    locale: string
  }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html
      lang={locale === 'sr' ? 'sr-Latn' : locale}
      className={`${inter.variable} ${sourceSerif.variable}`}
    >
      <body>
        <NextIntlClientProvider>
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
