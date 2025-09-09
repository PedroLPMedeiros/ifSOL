import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'editalType',
  title: 'Tipo de Edital',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome do Tipo',
      type: 'string',
    }),
  ],
});