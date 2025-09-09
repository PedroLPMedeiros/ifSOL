"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterDropdownProps {
  title: string;
  options: any[];
  children: React.ReactNode;
}

export function FilterDropdown({ title, children }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 rounded-md font-semibold text-gray-700 hover:bg-gray-200 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <ChevronDown
          className={`h-4 w-4 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>
      {isOpen && <div className="mt-2 pl-4 flex flex-col gap-2">{children}</div>}
    </div>
  );
}