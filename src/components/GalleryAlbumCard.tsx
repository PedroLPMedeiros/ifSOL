import React from "react";
import Image from "next/image";
import Link from "next/link";

interface GalleryAlbumCardProps {
    album: {
        _id: string;
        title: string;
        slug: { current: string};
        year: number;
        campusName: string;
        coverImageURL: string;
        totalImages: number;
    };
}

export function GalleryAlbumCard({album}: GalleryAlbumCardProps){
    return (
        <Link href={`/galeria/${album.slug.current}`} passHref>
      <div className="bg-white rounded-lg shadow-xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
        <div className="relative h-[240px] flex-shrink-0 w-full">
          <Image
            src={album.coverImageURL}
            alt={album.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw" 
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-300 flex items-end p-4">
            <div className="text-white">
              <h3 className="text-2xl font-bold">{album.title}</h3>
              <p className="text-sm">
                {album.campusName} • {album.year} ({album.totalImages} fotos)
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
    );
}