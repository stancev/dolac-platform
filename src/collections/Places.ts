import type { CollectionConfig } from 'payload'
import { placeTypes } from '@/lib/placeTypes'

export const Places: CollectionConfig = {
  slug: 'places',

  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'placeType', 'village', 'featured', 'updatedAt'],
  },

  access: {
    read: () => true,
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'placeType',
      type: 'select',
      required: true,
      options: placeTypes.map((value) => ({
        label: value,
        value,
      })),
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'coordinates',
      type: 'group',
      fields: [
        {
          name: 'latitude',
          type: 'number',
          required: true,
        },
        {
          name: 'longitude',
          type: 'number',
          required: true,
        },
      ],
    },
    {
      name: 'village',
      type: 'relationship',
      relationTo: 'villages',
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'accessDescription',
      type: 'textarea',
      localized: true,
      admin: {
        description:
          'Kratko objasni kako se fizički stiže do lokaliteta od najbližeg javnog puta ili poznate tačke, uključujući samo praktična ograničenja koja su stvarno relevantna.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
