import { ExternalLink } from 'lucide-react'

type Props = {
  latitude: number
  longitude: number
  frameTitle: string
  openMapLabel: string
}

const MAP_BOUNDS_OFFSET = 0.012

export function MapPreview({ latitude, longitude, frameTitle, openMapLabel }: Props) {
  const left = longitude - MAP_BOUNDS_OFFSET
  const right = longitude + MAP_BOUNDS_OFFSET
  const top = latitude + MAP_BOUNDS_OFFSET
  const bottom = latitude - MAP_BOUNDS_OFFSET

  const embedUrl =
    `https://www.openstreetmap.org/export/embed.html` +
    `?bbox=${left},${bottom},${right},${top}` +
    `&layer=mapnik` +
    `&marker=${latitude},${longitude}`

  const mapUrl =
    `https://www.openstreetmap.org/` +
    `?mlat=${latitude}&mlon=${longitude}` +
    `#map=15/${latitude}/${longitude}`

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-border bg-muted">
        <iframe
          src={embedUrl}
          title={frameTitle}
          loading="lazy"
          className="h-72 w-full border-0 sm:h-80"
        />
      </div>

      <a
        href={mapUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary hover:underline"
      >
        {openMapLabel}
        <ExternalLink aria-hidden="true" className="size-4" />
      </a>
    </>
  )
}
