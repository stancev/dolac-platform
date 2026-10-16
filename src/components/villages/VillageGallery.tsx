import { Gallery } from '@/components/gallery/Gallery'
import type { Village } from '@/payload-types'

type Props = {
  gallery: Village['gallery']
  title: string
}

export function VillageGallery({ gallery, title }: Props) {
  return <Gallery items={gallery ?? []} title={title} />
}
