import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'nucleoAcademico',
  title: 'Núcleo Acadêmico',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome do Núcleo',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'logo',
      title: 'Logo do Núcleo',
      type: 'image',
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'members',
      title: 'Membros',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'member' }],
        },
      ],
    }),
    defineField({
      name: 'activities',
      title: 'Atividades do Núcleo',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'activity' }],
        },
      ],
    }),
    defineField({
      name: 'instagramUrl',
      title: 'URL do Instagram',
      type: 'url',
    }),
  ],
});