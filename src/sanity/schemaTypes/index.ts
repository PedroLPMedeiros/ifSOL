import { type SchemaTypeDefinition } from 'sanity'
import post from './post'
import homepage from './homepage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post,
    homepage,
  ],
}
