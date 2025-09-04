"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/urlFor';
import { PortableText } from '@portabletext/react';

type SingleImageBlockProps = {
  data: {
    heading: string;
    content: any[];
    image: any;
    _type: 'singleImageBlock';
  };
};

type MultiImageBlockProps = {
  data: {
    heading: string;
    content: any[];
    images: any[];
    _type: 'multiImageBlock';
  };
};

type WideImageBlockProps = {
    data: {
        heading: string;
        content: any[];
        images: {link?: string}[];
        _type: 'wideImageBlock';
    }
}

function SingleImageBlock({ data }: SingleImageBlockProps) {
  const imageUrl = data.image ? urlFor(data.image).url() : null;

  return (
    <div className="w-full flex flex-col items-center py-16 px-8">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-green-800">
        {data.heading}
      </h2>
      <div className="text-lg text-gray-700 max-w-3xl">
        <PortableText value={data.content} />
      </div>
      {imageUrl && (
        <div className="relative mt-8 w-full h-[25vh] md:h-[50vh] md:max-w-4xl md:mx-auto">
          <Image
            src={imageUrl}
            alt={data.heading || "Section Image"}
            fill
            className="object-contain rounded-lg shadow-accent"
          />
        </div>
      )}
    </div>
  );
}

function MultiImageBlock({ data }: MultiImageBlockProps) {
  return (
    <div className="w-full flex flex-col items-center py-16 px-8">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-green-800">
        {data.heading}
      </h2>
      <div className="text-lg text-gray-700 max-w-3xl mb-3">
        <PortableText value={data.content} />
      </div>
      <div className="mt-8 w-full max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {data.images.map((img, index) => {
          const imageUrl = urlFor(img).url();
          const link = img.link;
          
          return (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden shadow-accent hover:scale-105 transition-transform duration-300">
              {imageUrl ? (
                link ? (
                  <Link href={link} passHref target='_blank' rel='nooper noreferrer'>
                    <Image
                      src={imageUrl}
                      alt={`Imagem ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </Link>
                ) : (
                  <Image
                    src={imageUrl}
                    alt={`Imagem ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                )
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Imagem não encontrada</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WideImageBlock({ data }: WideImageBlockProps) {
    if (!data || !data.images) {
      return null; 
    }
    
    return (
      <div className="w-full flex flex-col items-center py-16 px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-green-800">
          {data.heading}
        </h2>
        <div className="text-lg text-gray-700 max-w-3xl">
          <PortableText value={data.content} />
        </div>
  
        <div className="mt-8 w-full max-w-3xl mx-auto flex flex-col gap-4"> 
          {data.images.map((img, index) => {
            const imageUrl = img ? urlFor(img).url() : null;
            
            return (
              <div key={index} 
              className="relative min-h-40 rounded-lg overflow-hidden shadow-accent">
                {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={data.heading || `Section Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">Imagem não encontrada</span>
                    </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

type AboutSectionProps = {
  data: any[];
};

export function AboutSection({ data }: AboutSectionProps) {
  if (!data || data.length === 0) {
    return null; 
  }

  return (
    <section className="flex flex-col items-center bg-white">
      {data.map((block) => {
        if (block._type === 'singleImageBlock') {
          return <SingleImageBlock key={block._key} data={block} />;
        }
        if (block._type === 'multiImageBlock') {
          return <MultiImageBlock key={block._key} data={block} />;
        }
            if (block._type === 'wideImageBlock'){
                return <WideImageBlock key={block._key} data={block} />;
            }
        return null; 
      })}
    </section>
  );
}