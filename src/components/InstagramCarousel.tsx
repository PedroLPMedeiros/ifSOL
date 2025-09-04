"use client";

import React, {useRef, useCallback} from "react";
import useEmblaCarousel from "embla-carousel-react";
import { InstagramPostCard } from "./InstagramPostCard";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface InstagramPostCardProps {
    posts: any[];
}

export function InstagramCarousel({posts}: InstagramPostCardProps){
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

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full py-12">
      <div className="container relative mx-auto h-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-green-800">Nosso Instagram</h2>
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex">
            {posts.map((post) => (
              <InstagramPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
        <button onClick={scrollPrev} 
        className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-200 transition-colors">
          <ArrowLeft className="h-6 w-6 text-gray-800" />
        </button>
        <button 
        onClick={scrollNext} 
        className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-200 transition-colors">
          <ArrowRight className="h-6 w-6 text-gray-800" />
        </button>
      </div>
    </section>
  );
}