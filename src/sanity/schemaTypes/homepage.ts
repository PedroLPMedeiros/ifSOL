
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homepage',
  title: 'Página Inicial',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título da Página',
      type: 'string',
    }),
    defineField({
      name: 'heroSection',
      title: 'Seção Hero',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Título Principal', type: 'string' }),
        defineField({ name: 'subheading', title: 'Subtítulo', type: 'string' }),
        defineField({ name: 'image', title: 'Imagem de Fundo', type: 'image' }),
      ],
    }),
    defineField({
      name: 'aboutSections',
      title: 'Seções de Descrição',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'textImageBlock',
          title: 'Bloco de Texto e Imagem',
          fields: [
            defineField({ name: 'heading', title: 'Título', type: 'string' }),
            defineField({ name: 'content', title: 'Conteúdo', type: 'array', of: [{ type: 'block' }] }),
            defineField({ name: 'image', title: 'Imagem', type: 'image' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'featuredPosts',
      title: 'Carrossel de Posts',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'post' }],
        },
      ],
    }),
  ],
});