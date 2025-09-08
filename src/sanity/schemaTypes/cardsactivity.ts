
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'activity',
  title: 'Atividade',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título da Atividade',
      type: 'string',
    }),
    defineField({
      name: 'description', 
      title: 'Descrição',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'icon',
      title: 'Ícone da Atividade',
      type: 'image',
    }),
    defineField({
      name: 'extraText',
      title: 'Texto Adicional (ex: Horário)',
      type: 'string',
    }),
  ],
});