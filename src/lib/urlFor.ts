import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity.client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}