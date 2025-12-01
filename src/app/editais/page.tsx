
import { client } from "@/lib/sanity.client";
import groq from "groq";
import { Suspense } from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTopButton } from "@/components/BackToTopButton";
import EditaisClient from "@/components/EditaisClient";

export const revalidate = 60; 

const ITEMS_PER_PAGE = 6;

async function fetchInitialData(
    tipos: string[] = [], 
    campi: string[] = [], 
    page: number = 1
) {
    const filterConditions = [
        tipos.length > 0 ? `editalType._ref in [${tipos.map(id => `'${id}'`).join(',')}]` : '',
        campi.length > 0 ? `campus._ref in [${campi.map(id => `'${id}'`).join(',')}]` : '',
    ].filter(Boolean).join(' && ');

    const initialQueries = groq`
        {
          "editais": *[_type == "edital" ${filterConditions ? `&& ${filterConditions}` : ''}] 
            | order(_createdAt desc) [${(page - 1) * ITEMS_PER_PAGE}...${page * ITEMS_PER_PAGE}] {
              _id, title, description, "slug": slug.current, editalType->{name}, campus->{name}
            },
          "totalItems": count(*[_type == "edital" ${filterConditions ? `&& ${filterConditions}` : ''}]),
          "editalTypes": *[_type == "editalType"]{_id, name},
          "campi": *[_type == "campus"]{_id, name}
        }
    `;

    const data = await client.fetch(initialQueries);
    if (!data.editais) {
        data.editais = [];
    }
    if (!data.totalItems) {
        data.totalItems = 0;
    }
    
    return data;
}


export default async function EditaisPage({ 
    searchParams 
}: { 
    searchParams: Promise<{ tipos?: string; campi?: string; page?: string }>
}) { 
    
    const params = await searchParams; 
    const tipos = params.tipos?.split(',').filter(Boolean) || []; 
    const campi = params.campi?.split(',').filter(Boolean) || []; 
    const page = Number(params.page) || 1; 

    const initialData = await fetchInitialData(tipos, campi, page);

    return (
        <main className="min-h-screen flex flex-col">
            <Navbar />
            
            <Suspense fallback={
                <div className="container mx-auto px-8 py-12 flex-grow">
                    <p className="text-center text-xl text-gray-600">Carregando filtros...</p>
                </div>
            }>
                
                <EditaisClient 
                    initialEditais={initialData.editais}
                    initialTotalItems={initialData.totalItems}
                    initialEditalTypes={initialData.editalTypes}
                    initialCampi={initialData.campi}
                />
            </Suspense>
            <Footer />
            <BackToTopButton />
        </main>
    );
}