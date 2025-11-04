import { type SchemaTypeDefinition } from 'sanity'
import post from './post'
import homepage from './homepage'
import cardsactivity from './cardsactivity'
import author from './author'
import edital from './edital'
import editalType from './editalType'
import campus from './campus'
import nucleoAcademico from './nucleoAcademico'
import member from './member'
import galleryAlbum from './galleryAlbum'
import sobreNos from './sobreNos'
import { multiImageBlock, singleImageBlock, wideImageBlock } from './contentBlocks'
import artigoAcademico from './artigoAcademico'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post,
    homepage,
    cardsactivity,
    author,
    edital,
    editalType,
    campus,
    nucleoAcademico,
    member,
    galleryAlbum,
    sobreNos,
    singleImageBlock,
    multiImageBlock,
    wideImageBlock,
    artigoAcademico
  ],
}
