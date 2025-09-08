import { type SchemaTypeDefinition } from 'sanity'
import post from './post'
import homepage from './homepage'
import cardsactivity from './cardsactivity'
import author from './author'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post,
    homepage,
    cardsactivity,
    author,
  ],
}
