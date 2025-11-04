import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTopButton } from "@/components/BackToTopButton";
import { NewsCard } from "@/components/NewsCard";
import { Pagination } from "@/components/Pagination";
import { client } from "@/lib/sanity.client";
import groq from "groq";

export const revalidate = 0;

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  mainImage: any;
}


const postsQuery = groq`*[_type == "post"] | order(_createdAt desc) [($start)...($end)]{
  _id,
  title,
  slug,
  description,
  mainImage,
}`;

const countQuery = groq`count(*[_type == "post"])`;
const postsPerPage = 8;

export default async function NoticiasPage({searchParams}: {searchParams: {page?: string} }) {
    const page = parseInt(searchParams.page || '1', 10);
    const start = (page - 1) * postsPerPage;
    const end = start + postsPerPage;

    const [posts, totalPosts] = await Promise.all([
        client.fetch(postsQuery, {start, end}),
        client.fetch(countQuery),
    ]);

    console.log('Posts:', posts);
    console.log('Total de posts:', totalPosts);

    const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-8 py-12 flex-grow">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-green-800">Todas as Notícias</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.length > 0 ? (
            posts.map((post: Post) => (
              <NewsCard key={post._id} post={post} />
            ))
          ) : (
            <p className="text-center text-gray-500">Nenhuma notícia encontrada.</p>
          )}
        </div>
            {/* <Pagination 
            currentPage={page} 
            totalPages={totalPages} 
            basePath="/noticias"/> */}
      </div>

      <Pagination //adicionando pagination no final da página 
            currentPage={page} 
            totalPages={totalPages} 
            basePath="/noticias"/>
      <Footer />
      <BackToTopButton />
    </main>
  );
}