
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { PostCarousel } from "@/components/PostCarousel"; // Importe o novo componente
import { client } from "@/lib/sanity.client";
import groq from "groq";
import { AboutSection } from "@/components/AboutSections";
import { ActivitiesCarousel } from "@/components/ActivityCarousel";
import { InstagramCarousel } from "@/components/InstagramCarousel";
import { PortableText } from "next-sanity";

const homepageQuery = groq`*[_type == "homepage"][0]{
  heroSection,
  aboutSections,
  "activities": activities[]->{
    _id,
    title,
    description,
    icon,
    extraText
  }
}`;

const postsQuery = groq`*[_type == "post"] | order(_createdAt desc) [0..6]{
  _id,
  title,
  slug,
  mainImage
}`;

const dummyInstagramPosts = [
  { id: '1', media_url: 'https://via.placeholder.com/300', permalink: '#', caption: 'Post 1' },
  { id: '2', media_url: 'https://via.placeholder.com/300', permalink: '#', caption: 'Post 2' },
  { id: '3', media_url: 'https://via.placeholder.com/300', permalink: '#', caption: 'Post 3' },
  { id: '4', media_url: 'https://via.placeholder.com/300', permalink: '#', caption: 'Post 4' },
  { id: '5', media_url: 'https://via.placeholder.com/300', permalink: '#', caption: 'Post 5' },
];

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
      <ActivitiesCarousel activities={homepageData?.activities}/>
      <InstagramCarousel posts={dummyInstagramPosts}/>
    </main>
  );
}