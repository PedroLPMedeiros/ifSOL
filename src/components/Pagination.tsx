"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 0) return null;

  const showPrev = currentPage > 1;
  const showNext = currentPage < totalPages;

  const baseButtonClasses = "h-10 w-10 border rounded-full flex items-center justify-center transition-colors";
  const activeArrowClasses = "text-green-700"; 
  const disabledArrowClasses = "text-gray-400"; 

  const prevButtonClasses = `${baseButtonClasses} ${
    showPrev ? 'hover:bg-green-100 border-green-500 cursor-pointer' : 'cursor-not-allowed border-gray-300'
  }`;
  const nextButtonClasses = `${baseButtonClasses} ${
    showNext ? 'hover:bg-green-100 border-green-500 cursor-pointer' : 'cursor-not-allowed border-gray-300'
  }`;

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8">
      <div className="flex items-center gap-2">
        <Link href={showPrev ? `/noticias?page=${currentPage - 1}` : '#'} passHref>
          <button className={prevButtonClasses} disabled={!showPrev}>
            <ArrowLeft className={`h-5 w-5 ${showPrev ? activeArrowClasses : disabledArrowClasses}`} />
          </button>
        </Link>
        
        <span className="px-4 py-2 text-sm font-bold text-gray-800">
          Página {currentPage} de {totalPages}
        </span>

        <Link href={showNext ? `/noticias?page=${currentPage + 1}` : '#'} passHref>
          <button className={nextButtonClasses} disabled={!showNext}>
            <ArrowRight className={`h-5 w-5 ${showNext ? activeArrowClasses : disabledArrowClasses}`} />
          </button>
        </Link>
      </div>
    </div>
  );
}