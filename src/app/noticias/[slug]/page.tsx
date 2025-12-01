import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTopButton } from "@/components/BackToTopButton";
import { client } from "@/lib/sanity.client";
import groq from "groq";
import Image from "next/image";
import { urlFor } from "@/lib/urlFor";
import { PortableText } from '@portabletext/react';
import { notFound } from "next/navigation";
import Link from "next/link";

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

interface RecentPost {
  _id: string;
  title: string;
  slug: {current: string};
  mainImage: any;
}

const postQuery = groq`
  {
    "post": *[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      description,
      author->{name},
      _createdAt,
      "slug": slug.current,
      mainImage,
      content
    },
    "recentPosts": *[_type == "post" && slug.current != $slug] | order(_createdAt desc) [0...3]{
      _id,
      title,
      slug,
      mainImage
    }
  }
`;


export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) { 
  const resolvedParams = await params; //added
  const {post, recentPosts} = await client.fetch(postQuery, {slug: resolvedParams.slug}); 

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
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-green-800">
            {post.title}
          </h1>
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

        {recentPosts && recentPosts.length > 0 && (
          <section className="mt-16 border-t pt-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-green-800">Notícias recentes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {recentPosts.map((recentPost: RecentPost) => (
                <div key={recentPost._id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                  <Link href={`/noticias/${recentPost.slug.current}`} passHref>
                    <div className="relative w-full h-40 rounded-t-lg overflow-hidden">
                      {recentPost.mainImage && (
                        <Image
                          src={urlFor(recentPost.mainImage).url()}
                          alt={recentPost.title}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-green-800 hover:underline transition-colors">
                        {recentPost.title}
                      </h3>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
      <BackToTopButton />
    </main>
  );
}