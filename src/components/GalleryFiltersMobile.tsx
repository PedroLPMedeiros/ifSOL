"use client";

import React, { useState } from 'react';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { FilterDropdown } from './FilterDropdown';
import { Filter } from 'lucide-react';


interface MobileFiltersProps {
    campi: any[];
    yearOptions: number[];
    selectedCampi: string[];
    selectedYear: string[];
    onCampusChange: (name: string) => void;
    onYearChange: (year: string) => void;
    onSearch: () => void;
}

export function MobileFilters({ campi, yearOptions, selectedCampi, selectedYear, onCampusChange, onYearChange, onSearch }: MobileFiltersProps) {
    const [isOpen, setIsOpen] = useState(false);

    
    const yearFilterOptions = yearOptions.map(y => ({ _id: String(y), name: String(y) }));

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button className="w-full text-base flex items-center justify-center gap-2 bg-green-500">
                    <Filter className="h-4 w-4" /> Filtros
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-4 ">
                <SheetHeader>
                    <SheetTitle className="text-2xl font-bold">Filtros</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-4 p-4">
                    <FilterDropdown title="Campus" options={campi}>
                        {campi.map((campus: any) => (
                            <label key={campus._id} className="flex items-center gap-2 text-gray-700">
                                <input 
                                    type="checkbox" 
                                    className="form-checkbox text-green-500 rounded" 
                                    checked={selectedCampi.includes(campus.name)}
                                    onChange={() => onCampusChange(campus.name)}
                                />
                                {campus.name}
                            </label>
                        ))}
                    </FilterDropdown>
                    
                    
                    <FilterDropdown title="Ano" options={yearOptions}>
                        {yearFilterOptions.map((year) => (
                            <label key={year._id} className="flex items-center gap-2 text-gray-700">
                                <input 
                                    type="checkbox" 
                                    className="form-checkbox text-green-500 rounded" 
                                    checked={selectedYear.includes(year.name)}
                                    onChange={() => onYearChange(year.name)}
                                />
                                {year.name}
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