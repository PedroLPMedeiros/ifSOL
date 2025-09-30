import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTopButton } from "@/components/BackToTopButton";
import { client } from "@/lib/sanity.client";
import groq from "groq";
import { urlFor } from "@/lib/urlFor";
import { PortableText } from '@portabletext/react';
import { notFound } from "next/navigation";
import Link from "next/link";
import { ActivitiesCarousel } from "@/components/ActivityCarousel";
import { MemberCard } from "@/components/MemberCard";
import { Instagram } from "lucide-react";

export const revalidate = 0;

interface Nucleo {
  _id: string;
  name: string;
  slug: { current: string };
  logo: any;
  description: any[];
  members: any[];
  activities: any[];
  instagramUrl?: string;
}

const nucleoQuery = groq`*[_type == "nucleoAcademico" && slug.current == $slug][0]{
  _id,
  name,
  "slug": slug.current,
  logo,
  description,
  members[]->{
    _id,
    name,
    image,
    description
  },
  activities[]->,
  instagramUrl
}`;

export default async function NucleoPage({ params }: { params: { slug: string } }) {
  const nucleo: Nucleo = await client.fetch(nucleoQuery, { slug: params.slug });

  if (!nucleo) {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-8 py-12 flex-grow">
        <article className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-green-800">
            {nucleo.name}
          </h1>
          <div className="prose prose-lg mx-auto text-justify">
            <PortableText value={nucleo.description} />
          </div>
        </article>

        
        {nucleo.members && nucleo.members.length > 0 && (
          <section className="mt-16 border-t pt-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-green-800">Membros</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {nucleo.members.map((member: any) => (
                <MemberCard key={member._id} member={member} />
              ))}
            </div>
          </section>
        )}

        {nucleo.activities && nucleo.activities.length > 0 && (
          <section className="mt-16 border-t pt-8">
            <ActivitiesCarousel activities={nucleo.activities} />
          </section>

          
        )}

        {nucleo.instagramUrl && (
            
                <Link href={nucleo.instagramUrl} passHref target="_blank">
                    <button className="px-6 py-3 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded-full font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2 mx-auto cursor-pointer">
                        Visitar Instagram 
                        <Instagram className="h-5 w-5"/>
                    </button>
                </Link>
       
        )}

      </div>
      <Footer />
      <BackToTopButton />
    </main>
  );
}