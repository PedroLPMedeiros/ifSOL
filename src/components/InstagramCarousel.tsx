
// "use client";

// import React, { useCallback, useEffect } from 'react';
// import useEmblaCarousel from 'embla-carousel-react';
// import Autoplay from 'embla-carousel-autoplay';
// import { ArrowLeft, ArrowRight } from 'lucide-react';
// import { InstagramPostCard } from './InstagramPostCard';
// import Link from 'next/link';

// interface InstagramPost {
//   id: string;
//   media_url: string;
//   permalink: string;
//   caption: string;
// }

// interface InstagramCarouselProps {
//   posts: InstagramPost[];
// }

// export function InstagramCarousel({ posts }: InstagramCarouselProps) {
  
//   const [emblaRef, emblaApi] = useEmblaCarousel(
//     {
//       loop: true,
//       align: 'start',
//       slidesToScroll: 1,
//       breakpoints: {
//         '(min-width: 640px)': { slidesToScroll: 1 },
//         '(min-width: 1024px)': { slidesToScroll: 1 }
//       }
//     },
//     [Autoplay({ delay: 4000, stopOnInteraction: true })]
//   );

  
//   const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true);
//   const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true);

  
//   const scrollPrev = useCallback(
//     () => emblaApi && emblaApi.scrollPrev(),
//     [emblaApi]
//   );

//   const scrollNext = useCallback(
//     () => emblaApi && emblaApi.scrollNext(),
//     [emblaApi]
//   );

  
//   const onSelect = useCallback((emblaApi: any) => {
//     setPrevBtnDisabled(!emblaApi.canScrollPrev());
//     setNextBtnDisabled(!emblaApi.canScrollNext());
//   }, []);

  
//   useEffect(() => {
//     if (!emblaApi) return;

//     onSelect(emblaApi);
//     emblaApi.on('reInit', onSelect);
//     emblaApi.on('select', onSelect);
//   }, [emblaApi, onSelect]);

  
//   if (!posts || posts.length === 0) {
//     return null;
//   }

//   return (
//     <section className="relative w-full py-8 sm:py-12 px-4 sm:px-8 bg-gradient-to-br from-pink-50 via-white to-purple-50">
//       <div className="container relative mx-auto max-w-7xl">
        
//         <div className="text-center mb-8 sm:mb-12">
//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//             Nosso Instagram
//           </h2>
//           <p className="text-gray-600 text-sm sm:text-base">
//             Acompanhe nossas últimas publicações e novidades
//           </p>
//         </div>

//         <div className="relative">
          
//           <div className="overflow-hidden rounded-xl" ref={emblaRef}>
//             <div className="flex">
//               {posts.map((post) => (
//                 <div
//                   key={post.id}
//                   className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] min-w-0 pl-3 sm:pl-4 lg:pl-5 pr-3 sm:pr-4 lg:pr-5"
//                 >
//                   <InstagramPostCard post={post} />
//                 </div>
//               ))}
//             </div>
//           </div>

          
//           <button
//             className={`absolute -left-6 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg z-10 transition-all duration-200 hidden md:block ${
//               prevBtnDisabled 
//                 ? 'opacity-50 cursor-not-allowed' 
//                 : 'hover:bg-gray-50 hover:shadow-xl hover:scale-105'
//             }`}
//             onClick={scrollPrev}
//             disabled={prevBtnDisabled}
//             aria-label="Anterior"
//           >
//             <ArrowLeft className="h-5 w-5 text-gray-700" />
//           </button>

//           <button
//             className={`absolute -right-6 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg z-10 transition-all duration-200 hidden md:block ${
//               nextBtnDisabled 
//                 ? 'opacity-50 cursor-not-allowed' 
//                 : 'hover:bg-gray-50 hover:shadow-xl hover:scale-105'
//             }`}
//             onClick={scrollNext}
//             disabled={nextBtnDisabled}
//             aria-label="Próximo"
//           >
//             <ArrowRight className="h-5 w-5 text-gray-700" />
//           </button>

//           <div className="md:hidden mt-6 text-center">
//             <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
//               <span>Deslize para ver mais posts</span>
//               <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
//               </svg>
//             </p>
//           </div>
//         </div>
        
//         <div className="text-center mt-8">
//           <Link 
//             href="https://instagram.com/ifsol.oficial" 
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
//           >
//             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
//             </svg>
//             Seguir no Instagram
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }
