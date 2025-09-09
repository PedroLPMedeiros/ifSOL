import { type SchemaTypeDefinition } from 'sanity'
import post from './post'
import homepage from './homepage'
import cardsactivity from './cardsactivity'
import author from './author'
import edital from './edital'
import editalType from './editalType'
import campus from './campus'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post,
    homepage,
    cardsactivity,
    author,
    edital,
    editalType,
    campus,
  ],
}
