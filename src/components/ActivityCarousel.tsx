"use client";

import React, { useRef, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ActivityCard } from './ActivityCard';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ActivitiesCarouselProps {
  activities: any[];
}

export function ActivitiesCarousel({ activities }: ActivitiesCarouselProps) {
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

  if (!activities || activities.length === 0) {
    return (
      <section className="w-full py-16 flex justify-center items-center bg-gray-200">
        <h2 className="text-xl font-semibold text-gray-700">
          Não há atividades para exibir.
        </h2>
      </section>
    );
  }

  return (
    <section className="relative w-full py-12">
      <div className="container relative mx-auto h-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-green-800">Atividades da ifSOL</h2>
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex">
            {activities.map((activity) => (
              <div key={activity._id} className="flex-shrink-0 flex-grow-0 basis-full md:basis-1/2 lg:basis-1/3 p-4">
                <ActivityCard activity={activity} />
              </div>
            ))}
          </div>
        </div>
        <button onClick={scrollPrev} className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-200 transition-colors">
          <ArrowLeft className="h-6 w-6 text-gray-800" />
        </button>
        <button onClick={scrollNext} className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-200 transition-colors">
          <ArrowRight className="h-6 w-6 text-gray-800" />
        </button>
      </div>
    </section>
  );
}