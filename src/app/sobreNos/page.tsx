import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTopButton } from "@/components/BackToTopButton";
import { AboutSection } from "@/components/AboutSections"; 
import { client } from "@/lib/sanity.client";
import groq from "groq";


export const revalidate = 0; 

interface SobreNosData {
  title: string;
  contentBlocks: any[];
}

const sobreNosQuery = groq`*[_type == "sobreNos"][0]{
  title,
  contentBlocks
}`;

export default async function SobreNosPage() {
  
  const data: SobreNosData | null = await client.fetch(sobreNosQuery);
  
  const contentBlocks = data?.contentBlocks || [];

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-8 py-12 flex-grow">
        <h1 className="text-5xl md:text-5xl mb-10 font-bold text-center text-green-800">
          Sobre Nós
        </h1>
        
        {contentBlocks.length > 0 ? (
          
          <AboutSection data={contentBlocks} />
        ) : (
          <p className="text-center text-xl text-gray-600">
            Nenhum conteúdo disponível para a página "Sobre Nós" no momento.
          </p>
        )}
      </div>
      <Footer />
      <BackToTopButton />
    </main>
  );
}