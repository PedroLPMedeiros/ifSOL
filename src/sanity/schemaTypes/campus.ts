import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'campus',
  title: 'Campus',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome do Campus',
      type: 'string',
    }),
  ],
});