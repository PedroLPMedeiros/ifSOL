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
      title: 'Seções Sobre o Projeto',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'singleImageBlock',
          title: 'Bloco de Imagem Única',
          fields: [
            defineField({ name: 'heading', title: 'Título', type: 'string' }),
            defineField({ name: 'content', title: 'Conteúdo', type: 'array', of: [{ type: 'block' }] }),
            defineField({ name: 'image', title: 'Imagem', type: 'image' }),
          ],
        },
        {
          type: 'object',
          name: 'multiImageBlock',
          title: 'Bloco de Múltiplas Imagens',
          fields: [
            defineField({ name: 'heading', title: 'Título', type: 'string' }),
            defineField({ name: 'content', title: 'Conteúdo', type: 'array', of: [{ type: 'block' }] }),
            defineField({
              name: 'images',
              title: 'Imagens',
              type: 'array',
              of: [
                {
                  type: 'image',
                  fields: [
                    defineField({ name: 'link', title: 'Link (URL)', type: 'url' }),
                  ],
                },
              ],
            }),
          ],
        },
        {
          type: 'object',
          name: 'wideImageBlock',
          title: 'Bloco de Imagem de Destaque',
          fields: [
            defineField({ name: 'heading', title: 'Título', type: 'string' }),
            defineField({ name: 'content', title: 'Conteúdo', type: 'array', of: [{ type: 'block' }] }),
            defineField({
              name: 'images',
              title: 'Imagens',
              type: 'array',
              of: [
                { type: 'image',
                  fields: [
                    defineField({ name: 'link', title: 'Link: (URL)', type: 'url'}),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'activities',
      title: 'Atividades da ifSOL',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'activity' }],
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