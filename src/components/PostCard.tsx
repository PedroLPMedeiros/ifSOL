import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/urlFor';
import Link from 'next/link';

interface PostCardProps {
  post: {
    _id: string;
    slug: { current: string };
    title: string;
    mainImage: any;
  };
}

export function PostCard({ post }: PostCardProps) {
  const imageUrl = post.mainImage ? urlFor(post.mainImage).url() : null;

  return (
    <div className="h-full">
      <Link href={`/noticias/${post.slug.current}`} passHref>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 h-full flex flex-col">
          {imageUrl && (
            <div className="relative w-full h-[240px] flex-shrink-0">
              <Image
                src={imageUrl}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between">
            <h3 className="text-lg font-bold text-gray-800 group-hover:text-green-700 transition-colors leading-tight line-clamp-3">
              {post.title}
            </h3>
            <div className="mt-3 text-sm text-green-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Leia mais →
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}