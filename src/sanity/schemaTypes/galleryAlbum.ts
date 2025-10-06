import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'galleryAlbum',
  title: 'Álbum da Galeria',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título do Álbum',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'year',
      title: 'Ano do Álbum',
      type: 'number',
      description: 'O ano em que o álbum de fotos foi criado (Ex: 2025)',
      validation: (Rule) => Rule.required().min(2000).max(3000), 
    }),
    defineField({
      name: 'campus',
      title: 'Campus',
      type: 'reference',
      to: [{ type: 'campus' }], 
      description: 'O campus onde as fotos foram tiradas.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Imagens',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Texto Alternativo',
              type: 'string',
              description: 'Breve descrição da imagem para acessibilidade.',
            }),
          ],
        },
      ],
    }),
  ],
});