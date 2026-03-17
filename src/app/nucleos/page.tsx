export const dynamic = 'force-static'; //era revalidate = 0, mas para o github pages, que é um host de site estático, precisamos forçar a geração estática completa, sem revalidação. Assim, garantimos que o site funcione corretamente no ambiente do github pages, onde não há suporte para funcionalidades dinâmicas ou revalidação incremental.

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTopButton } from "@/components/BackToTopButton";
import { client } from "@/lib/sanity.client";
import groq from "groq";
import Image from "next/image";
import { urlFor } from "@/lib/urlFor";
import Link from "next/link";

// export const revalidate = 0;

interface Nucleo {
  _id: string;
  name: string;
  slug: { current: string };
  logo: any;
}

const nucleosQuery = groq`*[_type == "nucleoAcademico"] | order(_createdAt desc){
  _id,
  name,
  slug,
  logo,
}`;

export default async function NucleosPage() {
  const nucleos: Nucleo[] = await client.fetch(nucleosQuery);

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-8 py-12 flex-grow">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-green-800">
          Núcleos Acadêmicos
        </h1>
        {nucleos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {nucleos.map((nucleo) => (
              <div key={nucleo._id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <Link href={`/nucleos/${nucleo.slug.current}`} passHref>
                  <div className="flex flex-col items-center p-6 gap-4">
                    {nucleo.logo && (
                      <div className="relative w-32 h-32 rounded-full overflow-hidden">
                        <Image
                          src={urlFor(nucleo.logo).url()}
                          alt={nucleo.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <h2 className="text-xl font-bold text-green-800">{nucleo.name}</h2>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">Nenhum núcleo encontrado.</p>
        )}
      </div>
      <Footer />
      <BackToTopButton />
    </main>
  );
}