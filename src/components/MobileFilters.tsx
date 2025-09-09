"use client";

import React, { useState } from 'react';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { FilterDropdown } from './FilterDropdown';
import { Filter } from 'lucide-react';

interface MobileFiltersProps {
  editalTypes: any[];
  campi: any[];
  selectedTypes: string[];
  selectedCampi: string[];
  onTypeChange: (id: string) => void;
  onCampusChange: (id: string) => void;
  onSearch: () => void;
}

export function MobileFilters({ editalTypes, campi, selectedTypes, selectedCampi, onTypeChange, onCampusChange, onSearch }: MobileFiltersProps) {
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
          <SheetTitle className="text-2xl font-bold">Filtros</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          <FilterDropdown title="Tipos de edital" options={editalTypes}>
            {editalTypes.map((type: any) => (
              <label key={type._id} className="flex items-center gap-2 text-gray-700">
                <input 
                  type="checkbox" 
                  className="form-checkbox text-green-500 rounded" 
                  checked={selectedTypes.includes(type._id)}
                  onChange={() => onTypeChange(type._id)}
                />
                {type.name}
              </label>
            ))}
          </FilterDropdown>
          <FilterDropdown title="Campus" options={campi}>
            {campi.map((campus: any) => (
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