"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick'; // Importe o Slider
import { ArrowLeft, ArrowRight } from 'lucide-react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption: string;
}

interface InstagramCarouselProps {
  posts: InstagramPost[];
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

export function InstagramCarousel({ posts }: InstagramCarouselProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // 4 posts no desktop
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // 2 posts no tablet
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // 1 post no mobile
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="relative w-full py-12 px-8">
      <div className="container relative mx-auto h-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-green-800">Nosso Instagram</h2>
        <div className="relative">
          <Slider {...settings}>
            {posts.map((post) => (
              <div key={post.id} className="px-3">
                <Link href={post.permalink} passHref target="_blank" rel="noopener noreferrer">
                  <div className="relative aspect-square rounded-lg overflow-hidden shadow-md group">
                    <Image
                      src={post.media_url}
                      alt={post.caption || `Post do Instagram ${post.id}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}