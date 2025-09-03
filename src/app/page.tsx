// src/app/page.tsx

import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { PostCarousel } from "@/components/PostCarousel"; // Importe o novo componente
import { client } from "@/lib/sanity.client";
import groq from "groq";
import { AboutSection } from "@/components/AboutSections";

const homepageQuery = groq`*[_type == "homepage"][0]{
  heroSection,
  aboutSections
}`;

const postsQuery = groq`*[_type == "post"] | order(_createdAt desc) [0..6]{
  _id,
  title,
  slug,
  mainImage
}`;

export default async function Home() {
  const [homepageData, postsData] = await Promise.all([
    client.fetch(homepageQuery),
    client.fetch(postsQuery),
  ]);

  return (
    <main>
      <Navbar />
      <HeroSection data={homepageData?.heroSection} />
      <PostCarousel posts={postsData} /> 
      <AboutSection data={homepageData?.aboutSections}/>
    </main>
  );
}