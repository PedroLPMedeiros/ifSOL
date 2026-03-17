export const dynamic = 'force-static'; //era revalidate = 60, mas para o github pages, que é um host de site estático, precisamos forçar a geração estática completa, sem revalidação. Assim, garantimos que o site funcione corretamente no ambiente do github pages, onde não há suporte para funcionalidades dinâmicas ou revalidação incremental.
import { client } from "@/lib/sanity.client";
import groq from "groq";
import { Suspense } from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTopButton } from "@/components/BackToTopButton";
import GaleriaClient from "@/components/GaleriaClient"; 

// export const revalidate = 60; 

const PER_PAGE = 9;


const filtersQuery = groq`
 {
     "campi": *[_type == "campus"] | order(name asc) { _id, name },
     "years": *[_type == "galleryAlbum" && defined(year)].year | order(desc)
 }
`;

const countQuery = groq`
 count(*[_type == "galleryAlbum" && 
 (!defined($campusNames) || campus->name in $campusNames) && 
 (!defined($years) || year in $years)
 ])
`;

const albumsQuery = groq`
 *[_type == "galleryAlbum" && 
     (!defined($campusNames) || campus->name in $campusNames) && 
     (!defined($years) || year in $years)
 ] | order(year desc, _createdAt desc) [$offset...$limit] {
     _id, title, slug, year, campus->{name}, "coverImageUrl": images[0].asset->url, "totalImages": count(images)
 }
`;


async function fetchInitialData( 
    resolvedParams: { campus?: string; year?: string; page?: string }
) {
    const campusNames = resolvedParams.campus?.split(',').filter(Boolean) || null; 
    const yearsArray = resolvedParams.year?.split(',').filter(Boolean).map(Number) || null; 
    const page = Number(resolvedParams.page) || 1; 

    const offset = (page - 1) * PER_PAGE;
    const limit = offset + PER_PAGE;

    const queryParams = { campusNames, years: yearsArray, offset, limit };

   
    const [fetchedFilters, fetchedTotalCount, fetchedAlbums] = await Promise.all([
        client.fetch(filtersQuery),
        client.fetch<number>(countQuery, queryParams),
        client.fetch(albumsQuery, queryParams),
    ]);

    
    const uniqueYears = Array.from(new Set(fetchedFilters.years)).sort((a, b) => {
      return (b as number) - (a as number);
    });

    return {
        albums: fetchedAlbums,
        totalCount: fetchedTotalCount,
        filters: { ...fetchedFilters, years: uniqueYears },
    };
}


export default async function GaleriaPage({ searchParams }: { 
    
    searchParams: Promise<{ campus?: string; year?: string; page?: string }> 
}) {
    const params = await searchParams; 
    const initialData = await fetchInitialData(params); 

    return (
        <main className="min-h-screen flex flex-col">
            <Navbar />
            <Suspense fallback={
                <div className="container mx-auto px-8 py-12 flex-grow">
                    <p className="text-center text-xl text-gray-600">Carregando galeria...</p>
                </div>
            }>
                <GaleriaClient 
                    initialAlbums={initialData.albums}
                    initialTotalCount={initialData.totalCount}
                    initialFilters={initialData.filters}
                />
            </Suspense>
            <Footer />
            <BackToTopButton />
        </main>
    );
}