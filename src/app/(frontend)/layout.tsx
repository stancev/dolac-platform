import type { Metadata } from 'next'
import React from 'react'

import { inter, sourceSerif } from '@/lib/fonts'

import './styles.css'

export const metadata: Metadata = {
  title: 'Naš kraj',
  description: 'Digitalni atlas Dolca, Gradišta i belopalanačkog dela Sićevačke klisure.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr-Latn" className={`${inter.variable} ${sourceSerif.variable}`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
