import { defineField, defineType } from 'sanity';

export const singleImageBlock = defineType({
    name: 'singleImageBlock',
    title: 'Bloco de Imagem Única',
    type: 'object',
    fields: [
        defineField({ name: 'heading', title: 'Título', type: 'string' }),
        defineField({ name: 'content', title: 'Conteúdo', type: 'array', of: [{ type: 'block' }] }),
        defineField({ name: 'image', title: 'Imagem', type: 'image' }),
    ],
});

export const multiImageBlock = defineType({
    name: 'multiImageBlock',
    title: 'Bloco de Múltiplas Imagens',
    type: 'object',
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
});
export const wideImageBlock = defineType({
    name: 'wideImageBlock',
    title: 'Bloco de Imagem de Destaque',
    type: 'object',
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
});