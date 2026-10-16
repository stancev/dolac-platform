export const placeTypes = [
  'nature',
  'heritage',
  'swimming',
  'viewpoint',
  'religious',
  'recreation',
  'other',
] as const

export type PlaceType = (typeof placeTypes)[number]

export const filterablePlaceTypes = placeTypes.filter((type) => type !== 'other')
