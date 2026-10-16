import { getTranslations } from 'next-intl/server'

import { Link } from '@/i18n/navigation'
import { filterablePlaceTypes, type PlaceType } from '@/lib/placeTypes'
import { cn } from '@/lib/utils'

type Props = {
  activeType?: PlaceType
  availableTypes?: PlaceType[]
}

export async function PlaceTypeFilter({ activeType, availableTypes }: Props) {
  const t = await getTranslations('Places')

  const visibleTypes = availableTypes
    ? filterablePlaceTypes.filter((type) => availableTypes.includes(type))
    : filterablePlaceTypes

  return (
    <nav
      aria-label={t('filterLabel')}
      className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible"
    >
      <Link
        href="/places"
        aria-current={!activeType ? 'page' : undefined}
        className={cn(
          'inline-flex min-h-11 shrink-0 items-center rounded-full border px-4 text-sm font-medium',
          'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          !activeType
            ? 'border-primary bg-primary text-primary-foreground'
            : 'border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground',
        )}
      >
        {t('all')}
      </Link>

      {visibleTypes.map((type) => {
        const isActive = activeType === type

        return (
          <Link
            key={type}
            href={{
              pathname: '/places',
              query: {
                type,
              },
            }}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'inline-flex min-h-11 shrink-0 items-center rounded-full border px-4 text-sm font-medium',
              'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              isActive
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground',
            )}
          >
            {t(`types.${type}`)}
          </Link>
        )
      })}
    </nav>
  )
}
