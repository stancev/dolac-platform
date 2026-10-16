import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['sr', 'en'],
  defaultLocale: 'sr',

  localePrefix: 'always',

  // Za sada želimo da "/" predvidljivo vodi na srpski.
  // Jezik će korisnik menjati preko locale switchera.
  localeDetection: false,

  pathnames: {
    '/': '/',

    '/villages': {
      sr: '/sela',
      en: '/villages',
    },

    '/villages/[slug]': {
      sr: '/sela/[slug]',
      en: '/villages/[slug]',
    },

    '/places': {
      sr: '/mesta',
      en: '/places',
    },
    '/places/[slug]': {
      sr: '/mesta/[slug]',
      en: '/places/[slug]',
    },
  },
})
