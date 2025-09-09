import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'edital',
  title: 'Edital',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título do Edital',
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
      name: 'description',
      title: 'Breve Descrição',
      type: 'text',
    }),
    defineField({
      name: 'files',
      title: 'Arquivo do Edital (PDF)',
      type: 'array',
      of: [{type: 'file'}]
    }),
    defineField({
      name: 'editalType',
      title: 'Tipo de Edital',
      type: 'reference',
      to: [{ type: 'editalType' }],
    }),
    defineField({
      name: 'campus',
      title: 'Campus',
      type: 'reference',
      to: [{ type: 'campus' }],
    }),
  ],
});