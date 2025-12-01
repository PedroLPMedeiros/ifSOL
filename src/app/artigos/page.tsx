import {client} from '@/lib/sanity.client';
import groq from 'groq';
import { Suspense } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BackToTopButton } from '@/components/BackToTopButton';
import {ArtigosClient} from "@/components/ArtigosClient"

export const revalidate = 60;

const ITEMS_PER_PAGE = 6;

async function fetchInitialData(
    anos: string[] = [],
    campi: string[] = [],
    page: number = 1
) {
    const anoCondition = anos.length > 0 ?
        `publicationDate in [${anos.map(a => `'${a}'`).join(',')}]` : 
        '';
    const campiCondition = campi.length > 0 ?
        `campus._ref in [${campi.map(id => `'${id}'`).join(',')}]` : 
        '';
    const filterConditions = [anoCondition, campiCondition].filter(Boolean).join(' && ');

    const InitalQueries =  groq`
    {
        "artigos": *[_type == "artigoAcademico" ${filterConditions ? `&& ${filterConditions}` : ''}] | order(_createdAt desc) [${(page - 1) * ITEMS_PER_PAGE}...${page * ITEMS_PER_PAGE}] {
            _id,
            title,
            "description": pt::text(description),
            "slug": slug.current,
            publicationDate,
            campus->{name},
        },
        "totalItems": count(*[_type == "artigoAcademico" ${filterConditions ? `&& ${filterConditions}` : ''}]),
        "initialCampi": *[_type == "campus"]{_id, name},
        "allYearsData": *[_type == "artigoAcademico" && defined(publicationDate)] | order(publicationDate desc) {
            publicationDate
        }
    }
    `;

    const data = await client.fetch(InitalQueries);
    if (!data.artigos) data.artigos = [];
    if (!data.totalItems) data.totalItems = 0;

    const allYears = data.allYearsData 
        .map((item: { publicationDate: string }) => item.publicationDate)
        .reduce((acc: Set<string>, year: string) => acc.add(year), new Set<string>())

    const initialYears = Array.from<string>(allYears).map((year: string) => ({ 
        _id: year, 
        name: year
    }));

    return {
        artigos: data.artigos,
        totalItems: data.totalItems,
        initialYears: initialYears,
        initialCampi: data.initialCampi,
    };
}
    
export default async function ArtigosPage({ searchParams }: {
    
    searchParams: Promise<{anos?: string; campi?: string; page?: string}>
}) {
    const params = await searchParams;
    const anos = params.anos?.split(',').filter(Boolean) || []; 
    const campi = params.campi?.split(',').filter(Boolean) || []; 
    const page = Number(params.page) || 1; 

    const initialData = await fetchInitialData(anos, campi, page);

    return (
        <main className='min-h-screen flex flex-col'>
            <Navbar />
            <Suspense fallback={
                <div className='container mx-auto px-8 py-12 flex-grow'>
                    <p className='text-center text-cl text-gray-600'>Carregando filtros e artigos...</p>
                </div>
            }>
                <ArtigosClient
                    initialArtigos={initialData.artigos}
                    initialTotalItems={initialData.totalItems}
                    initialYears={initialData.initialYears}
                    initialCampi={initialData.initialCampi}
                />
            </Suspense>
            <Footer />
            <BackToTopButton />
        </main>
    );
}