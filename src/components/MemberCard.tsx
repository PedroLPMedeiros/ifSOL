import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/urlFor';
import { PortableText } from '@portabletext/react';

interface MemberCardProps {
  member: {
    name: string;
    description: any[];
    image: any;
  };
}

export function MemberCard({ member }: MemberCardProps) {
  const imageUrl = member.image ? urlFor(member.image).url() : null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 flex items-center gap-x-4">
      {imageUrl && (
        <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={imageUrl}
            alt={member.name}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className='flex flex-col flex-grow items-center'>
        <h3 className="text-xl font-bold mb-1 text-green-800 text-center">{member.name}</h3>
        <div className="text-sm text-gray-700 text-justify">
            <PortableText value={member.description} />
        </div>
      </div>
    </div>
  );
}