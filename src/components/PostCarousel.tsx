"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import { urlFor } from '@/lib/urlFor';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


interface Post{
  _id: string;
  title: string;
  slug: {current: string};
  mainImage: any;
}

interface PostCarouselProps{
  posts: Post[];
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

export function PostCarousel({ posts }: PostCarouselProps) {
  if (!posts || posts.length === 0) {
    return (
      <section className="w-full py-16 flex justify-center items-center bg-gray-200">
        <h2 className="text-xl font-semibold text-gray-700">
          Não há posts recentes para exibir.
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
    <section className="relative w-full py-5 px-8 mb-5">
      <div className="container relative mx-auto h-auto">
        <div className="relative">
          <Slider {...settings}>
            {posts.map((post) => (
              <div key={post._id} className="px-3">
                <Link href={`/noticias/${post.slug.current}`} passHref>
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                    {post.mainImage && (
                      <div className="relative w-full h-[280px]">
                        <Image
                          src={urlFor(post.mainImage).url()}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-green-700 transition-colors">
                        {post.title}
                      </h3>
                    </div>
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