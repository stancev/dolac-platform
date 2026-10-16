import { Gallery } from '@/components/gallery/Gallery'
import type { Place } from '@/payload-types'

type Props = {
  gallery: Place['gallery']
  title: string
}

export function PlaceGallery({ gallery, title }: Props) {
  return <Gallery items={gallery ?? []} title={title} />
}
