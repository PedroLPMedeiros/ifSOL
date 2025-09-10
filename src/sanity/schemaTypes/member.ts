import { defineField, defineType } from 'sanity';
import { PortableText } from '@portabletext/react';

export default defineType({
  name: 'member',
  title: 'Membro',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Foto do Membro',
      type: 'image',
    }),
    defineField({
      name: 'description',
      title: 'Breve Descrição',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
});