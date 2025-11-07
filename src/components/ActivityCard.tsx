
import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/urlFor';
import { PortableText } from '@portabletext/react';

interface ActivityCardProps {
  activity: {
    _id: string;
    title: string;
    description: any[];
    icon: any;
    extraText: string;
  };
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const iconUrl = activity.icon ? urlFor(activity.icon).url() : null;

  return (
    <div className="flex flex-col items-center p-4 sm:p-6 border-2 border-green-500 rounded-lg text-center shadow-lg bg-white h-full min-h-[300px] sm:min-h-[340px]">
      {iconUrl && (
        <Image
          src={iconUrl}
          alt={activity.title || "Activity Icon"}
          width={64}
          height={64}
          className="mb-4 object-contain flex-shrink-0"
        />
      )}
      
      <h3 className="text-lg sm:text-xl font-bold mb-2 text-green-800 leading-tight min-h-[2.5rem] flex items-center">
        {activity.title}
      </h3>
      
      <div className="text-sm text-gray-700 mb-4 flex-grow">
        <PortableText value={activity.description} />
      </div>
      
      {activity.extraText && (
        <p className="text-xs font-bold mt-auto text-green-600 bg-green-50 px-3 py-1 rounded-full">
          {activity.extraText}
        </p>
      )}
    </div>
  );
}