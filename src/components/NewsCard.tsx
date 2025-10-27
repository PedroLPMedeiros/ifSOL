import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/urlFor';

interface NewsCardProps {
  post: {
    _id: string;
    slug: { current: string };
    title: string;
    description: string;
    mainImage: any;
  };
}

export function NewsCard({ post }: NewsCardProps) {
  const imageUrl = post.mainImage ? urlFor(post.mainImage).url() : null;

  return (
    <Link href={`/noticias/${post.slug.current}`} passHref>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
        {imageUrl && (
          <div className="relative aspect-video">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-green-700 transition-colors line-clamp-3 h-12">{post.title}</h3> 
          <p className="text-xs text-gray-500 line-clamp-1">{post.description}</p>
        </div>
      </div>
    </Link>
  );
}