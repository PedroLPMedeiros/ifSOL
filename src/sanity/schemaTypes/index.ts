import { type SchemaTypeDefinition } from 'sanity'
import post from './post'
import homepage from './homepage'
import cardsactivity from './cardsactivity'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post,
    homepage,
    cardsactivity,
  ],
}
