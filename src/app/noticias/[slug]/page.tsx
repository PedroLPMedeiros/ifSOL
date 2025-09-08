import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTopButton } from "@/components/BackToTopButton";
import { client } from "@/lib/sanity.client";
import groq from "groq";
import Image from "next/image";
import { urlFor } from "@/lib/urlFor";
import { PortableText } from '@portabletext/react';
import { notFound } from "next/navigation";

export const revalidate = 0;

interface Post {
  _id: string;
  title: string;
  description: string;
  slug: { current: string };
  mainImage: any;
  content: any[];
  author: {name: string;};
  _createdAt: string;
}

const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  description,
  author->{name},
  _createdAt,
  "slug": slug.current,
  mainImage,
  content
}`;

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post: Post = await client.fetch(postQuery, { slug: params.slug });

  if (!post) {
    notFound();
  }
  
  const imageUrl = post.mainImage ? urlFor(post.mainImage).url() : null;

  const publishedDate = new Date(post._createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-8 py-12 flex-grow">
        <article className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-green-800">
            {post.title}
          </h2>
          <p className="font-bold text-gray-600 mb-2">
            {post.description}
          </p>
          <p className="text-sm italic text-gray-500 mb-4">
            Por {post.author.name || 'Autor desconhecido'} - Publicado em {publishedDate}
          </p>
          {imageUrl && (
            <div className="relative w-full h-[300px] md:h-[400px] mb-8">
              <Image
                src={imageUrl}
                alt={post.title}
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          )}
          <div className="prose prose-lg mx-auto text-justify">
            <PortableText value={post.content} />
          </div>
        </article>
      </div>
      <Footer />
      <BackToTopButton />
    </main>
  );
}