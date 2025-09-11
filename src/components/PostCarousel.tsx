"use client";

import React, { useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PostCard } from './PostCard';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
}

interface PostCarouselProps {
  posts: Post[];
}

export function PostCarousel({ posts }: PostCarouselProps) {
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
      breakpoints: {
        '(min-width: 640px)': { slidesToScroll: 1 },
        '(min-width: 1024px)': { slidesToScroll: 1 }
      }
    },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );

  
  const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true);

  
  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );

  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  
  const onSelect = useCallback((emblaApi: any) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  
  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  
  if (!posts || posts.length === 0) {
    return (
      <section className="w-full py-16 flex justify-center items-center bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-700">
          Não há posts recentes para exibir.
        </h2>
      </section>
    );
  }

  return (
    <section className="relative w-full py-5 px-8 mb-5">
      <div className="container relative mx-auto max-w-7xl">
        <div className="relative">
          
          <div className="overflow-hidden rounded-xl" ref={emblaRef}>
            <div className="flex">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-8"
                >
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </div>

          
          <button
            className={`absolute -left-6 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg z-10 transition-all duration-200 hidden md:block ${
              prevBtnDisabled 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-gray-50 hover:shadow-xl'
            }`}
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            aria-label="Anterior"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>

          <button
            className={`absolute -right-6 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg z-10 transition-all duration-200 hidden md:block ${
              nextBtnDisabled 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-gray-50 hover:shadow-xl'
            }`}
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            aria-label="Próximo"
          >
            <ArrowRight className="h-5 w-5 text-gray-700" />
          </button>


          <div className="sm:hidden mt-4 text-center">
            <p className="text-sm text-gray-500">
              Deslize para ver mais posts →
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}