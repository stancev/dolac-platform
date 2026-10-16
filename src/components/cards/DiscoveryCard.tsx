import type { ComponentProps, ReactNode } from 'react'

import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

type Props = {
  href: ComponentProps<typeof Link>['href']
  image: ReactNode
  children: ReactNode
  className?: string
}

export function DiscoveryCard({ href, image, children, className }: Props) {
  return (
    <article
      className={cn(
        'group h-full overflow-hidden rounded-lg border border-border bg-card text-card-foreground',
        'transition-colors duration-200 hover:border-primary/30',
        className,
      )}
    >
      <Link
        href={href}
        className="flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <div
          className="
            aspect-4/3 overflow-hidden bg-muted
            [&_img]:h-full [&_img]:w-full [&_img]:object-cover
            [&_img]:transition-transform [&_img]:duration-200
            group-hover:[&_img]:scale-[1.02]
          "
        >
          {image}
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">{children}</div>
      </Link>
    </article>
  )
}
