"use client"

import React, { useRef, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { PostCard } from './PostCard';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PostCarouselProps {
  posts: any[];
}

export function PostCarousel({ posts }: PostCarouselProps) {

     if (!posts || posts.length === 0) {
    return (
      <section className="w-full py-16 flex justify-center items-center bg-yellow-200">
        <h2 className="text-xl font-semibold text-gray-700">
          Não há posts recentes para exibir.
        </h2>
      </section>
    );
  }

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="relative w-full overflow-hidden bg-gray-100 py-12">
      <div className="container relative mx-auto h-auto">
    
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </div>

       
        <button
          onClick={scrollPrev}
          className="absolute top-1/2 -left-4 md:-left-8 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-gray-800" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute top-1/2 -right-4 md:-right-8 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-200 transition-colors"
        >
          <ArrowRight className="h-6 w-6 text-gray-800" />
        </button>
      </div>
    </section>
  );
}