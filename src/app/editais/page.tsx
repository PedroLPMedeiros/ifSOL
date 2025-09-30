
"use client";

import { client } from "@/lib/sanity.client";
import groq from "groq";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterDropdown } from "@/components/FilterDropdown";
import { BackToTopButton } from "@/components/BackToTopButton";
import { Pagination } from "@/components/Pagination";
import { MobileFilters } from "@/components/MobileFilters";

interface Edital {
  _id: string;
  title: string;
  description: string;
  slug: { current: string };
  editalType: { name: string };
  campus: { name: string };
}

interface FilterOption {
  _id: string;
  name: string;
}

const ITEMS_PER_PAGE = 6;

export default function EditaisPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [editais, setEditais] = useState<Edital[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [editalTypes, setEditalTypes] = useState<FilterOption[]>([]);
  const [campi, setCampi] = useState<FilterOption[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCampi, setSelectedCampi] = useState<string[]>([]);

  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    async function fetchData() {
      const typesFromUrl = searchParams.get('tipos')?.split(',') || [];
      const campiFromUrl = searchParams.get('campi')?.split(',') || [];
      
      setSelectedTypes(typesFromUrl.filter(Boolean));
      setSelectedCampi(campiFromUrl.filter(Boolean));
      
      const filterConditions = [
        typesFromUrl.length > 0 ? `editalType._ref in [${typesFromUrl.map(id => `'${id}'`).join(',')}]` : '',
        campiFromUrl.length > 0 ? `campus._ref in [${campiFromUrl.map(id => `'${id}'`).join(',')}]` : '',
      ].filter(Boolean).join(' && ');
      
      const countQuery = groq`
        count(*[_type == "edital" ${filterConditions ? `&& ${filterConditions}` : ''}])
      `;
      
      const editalQuery = groq`
        *[_type == "edital" ${filterConditions ? `&& ${filterConditions}` : ''}] 
        | order(_createdAt desc) [${(currentPage - 1) * ITEMS_PER_PAGE}...${currentPage * ITEMS_PER_PAGE}] {
          _id,
          title,
          description,
          "slug": slug.current,
          editalType->{name},
          campus->{name},
        }
      `;

      const [fetchedEditais, fetchedTotalItems, fetchedFilters] = await Promise.all([
        client.fetch(editalQuery),
        client.fetch(countQuery),
        client.fetch(groq`
          {
            "editalTypes": *[_type == "editalType"]{_id, name},
            "campi": *[_type == "campus"]{_id, name}
          }
        `),
      ]);

      setEditais(fetchedEditais);
      setTotalItems(fetchedTotalItems);
      setEditalTypes(fetchedFilters.editalTypes);
      setCampi(fetchedFilters.campi);
    }

    fetchData();
  }, [searchParams, currentPage]);

  const handleTypeChange = (typeId: string) => {
    setSelectedTypes(prev =>
      prev.includes(typeId)
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleCampusChange = (campusId: string) => {
    setSelectedCampi(prev =>
      prev.includes(campusId)
        ? prev.filter(id => id !== campusId)
        : [...prev, campusId]
    );
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedTypes.length > 0) {
      params.set('tipos', selectedTypes.join(','));
    }
    if (selectedCampi.length > 0) {
      params.set('campi', selectedCampi.join(','));
    }
    params.set('page', '1');
    router.push(`/editais?${params.toString()}`);
  };

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-8 py-12 flex-grow">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-green-800 text-center">
          Editais
        </h1>

         <div className="md:hidden w-full flex justify-center mb-6">
          <MobileFilters 
            editalTypes={editalTypes} 
            campi={campi} 
            selectedTypes={selectedTypes}
            selectedCampi={selectedCampi}
            onTypeChange={handleTypeChange}
            onCampusChange={handleCampusChange}
            onSearch={handleSearch}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-3/4 flex flex-col gap-6">
            {editais.length > 0 ? (
              editais.map((edital) => (
                <div key={edital._id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col items-start gap-4">
                  <h2 className="text-2xl font-bold text-green-800">{edital.title}</h2>
                  <p className="text-gray-700 line-clamp-2">{edital.description}</p>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                    <span>Tipo: {edital.editalType?.name || 'Não especificado'}</span>
                    <span>Campus: {edital.campus?.name || 'Não especificado'}</span>
                  </div>
                  <Link href={`/editais/${edital.slug}`} passHref>
                    <button className="mt-auto px-6 py-2 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-colors cursor-pointer">
                      Ver edital
                    </button>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">Nenhum edital encontrado.</p>
            )}
            
          </div>
          
          <aside className="hidden md:block w-full md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-28 flex flex-col gap-4">
              <h3 className="text-xl font-bold mb-4 text-green-800">Filtros</h3>
              <FilterDropdown title="Tipos de edital" options={editalTypes}>
                {editalTypes.map((type: FilterOption) => (
                  <label key={type._id} className="flex items-center gap-2 text-gray-700">
                    <input 
                      type="checkbox" 
                      className="form-checkbox text-green-500 rounded" 
                      checked={selectedTypes.includes(type._id)}
                      onChange={() => handleTypeChange(type._id)}
                    />
                    {type.name}
                  </label>
                ))}
              </FilterDropdown>
              <FilterDropdown title="Campus" options={campi}>
                {campi.map((campus: FilterOption) => (
                  <label key={campus._id} className="flex items-center gap-2 text-gray-700">
                    <input 
                      type="checkbox" 
                      className="form-checkbox text-green-500 rounded" 
                      checked={selectedCampi.includes(campus._id)}
                      onChange={() => handleCampusChange(campus._id)}
                    />
                    {campus.name}
                  </label>
                ))}
              </FilterDropdown>
              <button 
                onClick={handleSearch}
                className="w-full mt-4 px-6 py-2 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-colors cursor-pointer"
              >
                Buscar
              </button>
            </div>
          </aside>
        </div>
        {totalItems > 0 && (
                <div className="flex justify-center items-center mt-8">
                    <Pagination currentPage={currentPage} totalPages={totalPages} />
                </div>
            )}
      </div>
      <Footer />
      <BackToTopButton />
    </main>
  );
}