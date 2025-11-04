
"use client";

import React, { useState } from 'react';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { FilterDropdown } from './FilterDropdown';
import { Filter } from 'lucide-react';

interface FilterOption {
    _id: string; 
    name: string;
}

interface ArtigoMobileFiltersProps {
    availableYears: FilterOption[];
    campi: FilterOption[];
    selectedYears: string[];
    selectedCampi: string[];
    onYearChange: (year: string) => void;
    onCampusChange: (id: string) => void;
    onSearch: () => void;
}

export function ArtigoMobileFilters({ 
    availableYears, 
    campi, 
    selectedYears, 
    selectedCampi, 
    onYearChange, 
    onCampusChange, 
    onSearch 
}: ArtigoMobileFiltersProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button className="w-full text-base flex items-center justify-center gap-2 bg-green-500">
                    <Filter className="h-4 w-4" /> Filtros
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-4">
                <SheetHeader>
                    <SheetTitle className="text-2xl font-bold">Filtros de Artigos</SheetTitle>
                </SheetHeader>
                
                <div className="flex flex-col gap-4">
                    
                    <FilterDropdown title="Ano de Publicação" options={availableYears}>
                        {availableYears.map((year: FilterOption) => (
                            <label key={year._id} className="flex items-center gap-2 text-gray-700">
                                <input 
                                    type="checkbox" 
                                    className="form-checkbox text-green-500 rounded" 
                                    checked={selectedYears.includes(year._id)}
                                    onChange={() => onYearChange(year._id)}
                                />
                                {year.name}
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
                                    onChange={() => onCampusChange(campus._id)}
                                />
                                {campus.name}
                            </label>
                        ))}
                    </FilterDropdown>
                </div>
                <Button 
                    onClick={() => {
                        onSearch();
                        setIsOpen(false);
                    }}
                    className="w-full mt-6 px-6 py-2 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-colors"
                >
                    Buscar
                </Button>
            </SheetContent>
        </Sheet>
    );
}