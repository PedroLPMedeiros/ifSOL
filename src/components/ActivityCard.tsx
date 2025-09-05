
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
    <div className="flex flex-col items-center p-6 border-2 bg-white border-green-500 rounded-lg text-center shadow-lg h-full">
      {iconUrl && (
        <Image
          src={iconUrl}
          alt={activity.title || "Activity Icon"}
          width={64}
          height={64}
          className="mb-4 object-contain"
        />
      )}
      <h3 className="text-xl font-bold mb-2 text-green-800">{activity.title}</h3>
      <p className="text-sm text-gray-700 mb-4">{activity.description}</p>
      {activity.extraText && (
        <p className="text-xs font-bold text-gray-700 mt-auto">{activity.extraText}</p>
      )}
    </div>
  );
}