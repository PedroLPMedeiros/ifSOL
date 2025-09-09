
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTopButton } from "@/components/BackToTopButton";
import { client } from "@/lib/sanity.client";
import groq from "groq";
import { notFound } from "next/navigation";
import Link from "next/link";

export const revalidate = 0;

interface Edital {
  _id: string;
  title: string;
  description: string;
  slug: { current: string };
  editalType: { name: string };
  campus: { name: string };
  files: {
    url: string;
    fileName: string;
  }[];
}

const editalQuery = groq`*[_type == "edital" && slug.current == $slug][0]{
  _id,
  title,
  description,
  "slug": slug.current,
  editalType->{name},
  campus->{name},
  files[]{
    "url": asset->url,
    "fileName": asset->originalFilename
  }
}`;

export default async function EditalPage({ params }: { params: { slug: string } }) {
  const edital: Edital = await client.fetch(editalQuery, { slug: params.slug });

  if (!edital) {
    notFound();
  }
  
  return (
    <main className="min-h-screen flex flex-col ">
      <Navbar />
      <div className="container mx-auto px-8 py-12 flex-grow">
        <article className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-800">
            {edital.title}
          </h1>

          <div className="flex flex-wrap gap-4 mt-8 mb-8">
            <span className="px-4 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-semibold">
              Tipo: {edital.editalType?.name || 'Não especificado'}
            </span>
            <span className="px-4 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-semibold">
              Campus: {edital.campus?.name || 'Não especificado'}
            </span>
          </div>


          <p className="text-lg text-gray-700 mb-12 text-justify">{edital.description}</p>

          <div className="flex flex-col gap-4">
            {edital.files && edital.files.map((file, index) => (
              <Link key={index} href={file.url || '#'} passHref target="_blank" rel="noopener noreferrer">
                <div className="inline-flex rounded-xl border-2 border-green-500 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="px-6 py-2 bg-green-400 text-gray-600 font-semibold">
                    PDF
                  </div>
                  <div className="px-6 py-2 bg-white text-gray-700 font-semibold">
                    {file.fileName}
                  </div>
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