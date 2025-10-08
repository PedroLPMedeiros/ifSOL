
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'sobreNos',
  title: 'Página Sobre Nós',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título da Página',
      type: 'string',
    }),
    defineField({
      name: 'contentBlocks', 
      title: 'Blocos de Conteúdo',
      type: 'array',
      of: [
        { type: 'singleImageBlock' }, 
        { type: 'multiImageBlock' },
        { type: 'wideImageBlock' },
      ],
    }),
  ],
});