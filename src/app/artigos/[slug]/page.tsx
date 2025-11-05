
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTopButton } from "@/components/BackToTopButton";
import { client } from "@/lib/sanity.client";
import groq from "groq";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FileText } from "lucide-react"; 
import { PortableText } from '@portabletext/react';

export const revalidate = 0;


interface Artigo {
  _id: string;
  title: string;
  // description: string; 
  description: any[];
  slug: { current: string };
  publicationDate: string;
  authors: string[];
  keywords: string[];
  campus: { name: string };
  files: {
    url: string;
    fileName: string;
  }[];
}


const artigoQuery = groq`*[_type == "artigoAcademico" && slug.current == $slug][0]{
  _id,
  title,
  description,
  publicationDate, 
  authors, 
  keywords, 
  "slug": slug.current,
  campus->{name},
  files[]{
    "url": asset->url,
    "fileName": asset->originalFilename
  }
}`;

export default async function ArtigoPage({ params }: { params: { slug: string } }) {
  const artigo: Artigo = await client.fetch(artigoQuery, { slug: params.slug });

  if (!artigo) {
    notFound();
  }
  
  const autoresFormatados = artigo.authors?.join(', ') || 'Não especificado';

  return (
    <main className="min-h-screen flex flex-col ">
      <Navbar />
      <div className="container mx-auto px-8 py-12 flex-grow">
        <article className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-800 text-center">
            {artigo.title}
          </h1>

          
          <p className="text-xl italic text-gray-600 mb-6 text-center">
            {autoresFormatados}
          </p>


          
          <div className="flex flex-wrap justify-center gap-4 mt-8 mb-8">
            <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
              Ano de Publicação: {artigo.publicationDate || 'N/A'}
            </span>
            <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
              Campus: {artigo.campus?.name || 'N/A'}
            </span>
          </div>

          <hr className="my-8 border-gray-200" />
          
          
          <h2 className="text-3xl font-bold mb-4 text-green-800">Resumo</h2>
          <div className="text-lg text-gray-700 mb-12 text-justify">
            <PortableText value={artigo.description}/>
          </div>
          {/* <p className="text-lg text-gray-700 mb-12 text-justify">{artigo.description}</p> */}
          
          
          {artigo.keywords && artigo.keywords.length > 0 && (
              <div className="mb-12">
                  <h3 className="text-xl font-bold mb-3 text-green-800">Palavras-Chave</h3>
                  <div className="flex flex-wrap gap-2">
                      {artigo.keywords.map((tag, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md text-sm">
                              {tag}
                          </span>
                      ))}
                  </div>
              </div>
          )}


          
          <h2 className="text-3xl font-bold mb-4 text-green-800">Acesso ao Documento</h2>
          <div className="flex flex-col gap-4">
            {artigo.files && artigo.files.map((file, index) => (
              <Link 
                key={index} 
                href={file.url || '#'} 
                passHref 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-xl border-2 border-green-500 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-fit"
              >
                <div className="flex items-center px-6 py-3 bg-green-500 text-white font-semibold gap-2">
                  <FileText className="h-5 w-5" /> Ver PDF
                </div>
                <div className="px-6 py-3 bg-white text-gray-700 font-semibold">
                  {file.fileName}
                </div>
              </Link>
            ))}
          </div>
        </article>
      </div>
      <Footer />
      <BackToTopButton />
    </main>
  );
}