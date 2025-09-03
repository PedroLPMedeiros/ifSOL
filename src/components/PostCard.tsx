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
    <div className="flex-shrink-0 flex-grow-0 basis-full md:basis-1/2 lg:basis-1/2 p-2">
      <Link href={`/posts/${post.slug.current}`} passHref>
        <div className="w-full h-full relative overflow-hidden rounded-lg shadow-lg">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={post.title}
              width={500}
              height={300}
              className="object-cover w-full h-full"
            />
          )}
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
            <h3 className="text-lg font-bold">{post.title}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
}