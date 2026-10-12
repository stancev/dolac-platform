import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type Props = HTMLAttributes<HTMLElement>

export function Section({ className, ...props }: Props) {
  return <section className={cn('py-14 sm:py-16 lg:py-20', className)} {...props} />
}
