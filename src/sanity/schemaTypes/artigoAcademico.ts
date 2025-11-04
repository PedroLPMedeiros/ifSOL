import { defineField, defineType } from "sanity";

export default defineType({
    name: "artigoAcademico",
    title: "Artigo Acadêmico",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Título do Artigo",
            type: "string",
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
            title: 'Resumo (Abstract)',
            type: 'string',
            description: 'Forneça um breve resumo do artigo acadêmico.',
        }),
        defineField({
            name: "authors",
            title: "Autores",
            type: "array",
            of: [
                {
                    type: "string",
                },
            ],
            description: 'Liste os autores do artigo acadêmico.',
        }),
        defineField({
            name: "publicationDate",
            title: "Ano de Publicação",
            type: "string",
            description: 'Ex: 2025.',
        }),
        defineField({
            name: 'keywords',
            title: 'Palavras-chave',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Adicione palavras-chave relevantes para o artigo.',
        }),
        defineField({
            name: 'files',
            title: 'Arquivos do Artigo (PDF)',
            type: 'array',
            of: [
                {type: 'file'}
            ],
        }),
        defineField({
            name: 'campus',
            title: 'Campus',
            type: 'reference',
            to: [{ type: 'campus' }],
        }),
    ],
});
        
