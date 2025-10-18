'use client';

export const dynamic = 'force-dynamic';

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTopButton } from "@/components/BackToTopButton";
import { GalleryAlbumCard } from "@/components/GalleryAlbumCard";
import { Pagination } from "@/components/Pagination"; 
import { FilterDropdown } from "@/components/FilterDropdown";
import { MobileFilters } from "@/components/GalleryFiltersMobile";
import { client } from "@/lib/sanity.client";
import groq from "groq";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";


interface Album {
  _id: string;
  title: string;
  slug: { current: string };
  year: number;
  campus: { name: string };
  coverImageUrl: string;
  totalImages: number;
}

interface FilterData {
  campi: { _id: string; name: string }[];
  years: number[];
}

const PER_PAGE = 9; 


const filtersQuery = groq`
  {
    "campi": *[_type == "campus"] | order(name asc) {
      _id,
      name
    },
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
    _id,
    title,
    slug,
    year,
    campus->{name},
    "coverImageUrl": images[0].asset->url,
    "totalImages": count(images)
  }
`;


export default function GaleriaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [albums, setAlbums] = useState<Album[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [filters, setFilters] = useState<FilterData>({ campi: [], years: [] });
  
  const [selectedCampi, setSelectedCampi] = useState<string[]>(searchParams.get('campus')?.split(',') || []);
  const [selectedYears, setSelectedYears] = useState<string[]>(searchParams.get('year')?.split(',') || []);

  const currentPage = parseInt(searchParams.get('page') || '1', 10);


  
  useEffect(() => {
    async function fetchData() {
        const offset = (currentPage - 1) * PER_PAGE;
        const limit = offset + PER_PAGE;

        const campusNames = selectedCampi.filter(Boolean).length > 0 ? selectedCampi : null;
        const yearsArray = selectedYears.filter(Boolean).length > 0 ? selectedYears.map(Number) : null;

        const queryParams = {
            campusNames: campusNames,
            years: yearsArray,
            offset: offset,
            limit: limit,
        };

        const [fetchedFilters, fetchedTotalCount, fetchedAlbums] = await Promise.all([
            client.fetch<FilterData>(filtersQuery),
            client.fetch<number>(countQuery, queryParams),
            client.fetch<Album[]>(albumsQuery, queryParams),
        ]);
        const uniqueYears = Array.from(new Set(fetchedFilters.years)).sort((a: number, b: number) => b - a);

        setFilters({ ...fetchedFilters, years: uniqueYears});
        setTotalCount(fetchedTotalCount);
        setAlbums(fetchedAlbums);
    }
    
    fetchData();
  }, [searchParams, currentPage]);


  
  const toggleFilter = (key: 'campus' | 'year', value: string) => {
    if (key === 'campus') {
        setSelectedCampi(prev =>
            prev.includes(value) ? prev.filter(id => id !== value) : [...prev, value]
        );
    } else { 
        setSelectedYears(prev =>
            prev.includes(value) ? prev.filter(id => id !== value) : [...prev, value]
        );
    }
  };


  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedCampi.length > 0) {
      params.set('campus', selectedCampi.join(','));
    }
    if (selectedYears.length > 0) {
      params.set('year', selectedYears.join(','));
    }
    params.set('page', '1');
    router.push(`/galeria?${params.toString()}`);
  };

  const totalPages = Math.ceil(totalCount / PER_PAGE);
  const hasAlbums = albums.length > 0;

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-8 py-12 flex-grow">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-green-800">
          Galeria de Fotos
        </h1>

        
        <div className="md:hidden w-full flex justify-center mb-6">
            <MobileFilters 
                campi={filters.campi} 
                yearOptions={filters.years}  
                selectedCampi={selectedCampi}
                selectedYear={selectedYears}
                onCampusChange={(name) => toggleFilter('campus', name)}
                onYearChange={(year) => toggleFilter('year', year)}
                onSearch={handleSearch}
            />
        </div>

        
        <div className="flex flex-col md:flex-row gap-8">
          
          
          <div className="w-full md:w-3/4 flex flex-col gap-6">
            {hasAlbums ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto w-full">
                {albums.map((album) => (
                  <GalleryAlbumCard 
                    key={album._id} 
                    album={{
                      _id: album._id,
                      title: album.title,
                      slug: album.slug,
                      year: album.year,
                      campusName: album.campus.name, 
                      coverImageURL: album.coverImageUrl,
                      totalImages: album.totalImages,
                    }} 
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-xl text-gray-600 mt-12 w-full">
                Nenhum álbum encontrado para os filtros selecionados.
              </p>
            )}
            
           
            
          </div>

         
          <aside className="hidden md:block w-full md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-28 flex flex-col gap-4">
              <h3 className="text-xl font-bold mb-4 text-green-800">Filtros</h3>
              
              
              <FilterDropdown title="Campus" options={filters.campi}>
                  {filters.campi.map((campus) => (
                      <label key={campus._id} className="flex items-center gap-2 text-gray-700">
                          <input 
                              type="checkbox" 
                              className="form-checkbox text-green-500 rounded" 
                              checked={selectedCampi.includes(campus.name)}
                              onChange={() => toggleFilter('campus', campus.name)}
                          />
                          {campus.name}
                      </label>
                  ))}
              </FilterDropdown>

             
              <FilterDropdown title="Ano" options={filters.years}>
                  {filters.years.map((year) => (
                      <label key={year} className="flex items-center gap-2 text-gray-700">
                          <input 
                              type="checkbox" 
                              className="form-checkbox text-green-500 rounded" 
                              checked={selectedYears.includes(String(year))}
                              onChange={() => toggleFilter('year', String(year))}
                          />
                          {year}
                      </label>
                  ))}
              </FilterDropdown>
              
              <button 
                  onClick={handleSearch}
                  className="w-full mt-4 px-6 py-2 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-colors"
              >
                  Buscar
              </button>
            </div>
          </aside>
        </div>
        <div className="mt-12 w-full">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath="/galeria"
              />
            </div>
      </div>
      <Footer />
      <BackToTopButton />
    </main>
  );
}