"use client";

import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ActivityCard } from './ActivityCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


interface Activity {
    _id: string;
    title: string;
    description: string;
    icon: any;
    extraText: string;
  }
  
  interface ActivitiesCarouselProps {
    activities: Activity[];
  }
  
  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-20 hidden md:block"
        aria-label="Próximo"
      >
        <ArrowRight className="h-6 w-6 text-gray-700" />
      </button>
    );
  };
  
  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-20 hidden md:block"
        aria-label="Anterior"
      >
        <ArrowLeft className="h-6 w-6 text-gray-700" />
      </button>
    );
  };
  
  export function ActivitiesCarousel({ activities }: ActivitiesCarouselProps) {
    if (!activities || activities.length === 0) {
      return (
        <section className="w-full py-16 flex justify-center items-center bg-gray-200">
          <h2 className="text-xl font-semibold text-gray-700">
            Não há atividades para exibir.
          </h2>
        </section>
      );
    }
  
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
  
    return (
      <section className="relative w-full py-12 px-8">
        <div className="container relative mx-auto h-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-green-800">Atividades da ifSOL</h2>
          <div className="relative">
            <Slider {...settings}>
              {activities.map((activity) => (
                <div key={activity._id} className="px-3">
                  <ActivityCard activity={activity} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
    );
  }