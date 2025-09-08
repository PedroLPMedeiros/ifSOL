
import React from "react";
import { urlFor } from "@/lib/urlFor"; 

type HeroSectionProps = {
  data: {
    heading: string;
    subheading: string;
    image: any;
  };
};

export function HeroSection({ data }: HeroSectionProps) {
  if (!data) {
    return null;
  }
  
  const imageUrl = data.image ? urlFor(data.image).url() : null;

  return (
    <section className="relative flex flex-col items-center justify-center text-center py-20 px-8">
      <h1 className="text-5xl md:text-6xl font-bold mb-9 text-green-700">
        {data.heading}
      </h1>
      <p className="text-xl md:text-2xl font-normal text-shadow-2xs text-gray-700 max-w-2xl p-4 rounded-lg">
        {data.subheading}
      </p>

    </section>
  );
}