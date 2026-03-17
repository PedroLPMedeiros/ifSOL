// import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import { Menu } from "lucide-react";

// export function Navbar() {
//   return (
//     <header className="top-0 z-50 h-20 w-full border-b bg-green-400 backdrop-blur flex items-center">
//       <div className="container h-full flex justify-between px-8 md:px-12">
        
//         <div className="flex items-center gap-4">
//           <a href="/">
//             <img 
//             src="/logo.svg"
//             alt= "Logo da ifSOL" 
//             className="h-20 w-auto object-contain max-w-full"/> 
//           </a>
//           <span className="font-light text-black hidden lg:block max-w-sm"> {/*Mudei de md para lg*/}
//             Incubadora Tecnológica para o Fortalecimento dos Empreendimentos Econômicos Solidários do IFRN
//             </span>
//         </div>


        
//         <nav className="hidden lg:flex items-center gap-4 text-gray-800">{/*Mudei de md para lg*/}
//           <a href="/" className="hover:text-gray-950 hover:font-semibold transition-all">Início</a>
//           <a href="/sobreNos" className="hover:text-gray-950 hover:font-semibold transition-all">Sobre Nós</a>
//           <a href="/noticias" className="hover:text-gray-950 hover:font-semibold transition-all">Notícias</a>
//           <a href="/editais" className="hover:text-gray-950 hover:font-semibold transition-all">Editais</a>
//           <a href="/galeria" className="hover:text-gray-950 hover:font-semibold transition-all">Galeria</a>
//           <a href="/nucleos" className="hover:text-gray-950 hover:font-semibold transition-all">Núcleos</a>
//           <a href="/artigos" className="hover:text-gray-950 hover:font-semibold transition-all">Artigos</a>
//         </nav>

//         <div className="lg:hidden h-full flex items-center"> {/*Mudei de md para lg*/}
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button variant="ghost" size="lg">
//                 <Menu className="size-7" />
//                 <span className="sr-only">Abrir menu</span>
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="w-full flex flex-col items-center justify-center bg-green-400 text-gray-900">
              
//               <SheetHeader>
//                 <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
//               </SheetHeader>
//               <nav className="flex flex-col items-center gap-6 text-xl">
//                 <a href="/">Início</a>
//                 <a href="/sobreNos">Sobre Nós</a>
//                 <a href="/noticias">Notícias</a>
//                 <a href="/editais">Editais</a>
//                 <a href="/galeria">Galeria</a>
//                 <a href="/nucleos">Núcleos</a>
//                 <a href="/artigos">Artigos</a>
//                 <hr className="w-70 border-gray-700 my-4"/>
//                 <span className="font-light w-full text-center max-w-xs mx-auto">
//                     Incubadora Tecnológica para o Fortalecimento dos Empreendimentos Econômicos Solidários do IFRN
//                 </span>
//               </nav>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </header>
//   );
// }

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link"; // 1. Importe o Link

export function Navbar() {
  return (
    <header className="top-0 z-50 h-20 w-full border-b bg-green-400 backdrop-blur flex items-center">
      <div className="container h-full flex justify-between px-8 md:px-12">
        
        <div className="flex items-center gap-4">
          {/* 2. Troque <a> por <Link> e href="/" continua igual */}
          <Link href="/">
            <img 
              src="/ifSOL/logo.svg" // 3. Dica: coloque o caminho completo para a logo também
              alt="Logo da ifSOL" 
              className="h-20 w-auto object-contain max-w-full cursor-pointer"/> 
          </Link>
          <span className="font-light text-black hidden lg:block max-w-sm">
            Incubadora Tecnológica para o Fortalecimento dos Empreendimentos Econômicos Solidários do IFRN
          </span>
        </div>

        <nav className="hidden lg:flex items-center gap-4 text-gray-800">
          {/* 4. Troque todos os <a> por <Link> */}
          <Link href="/" className="hover:text-gray-950 hover:font-semibold transition-all">Início</Link>
          <Link href="/sobreNos" className="hover:text-gray-950 hover:font-semibold transition-all">Sobre Nós</Link>
          <Link href="/noticias" className="hover:text-gray-950 hover:font-semibold transition-all">Notícias</Link>
          <Link href="/editais" className="hover:text-gray-950 hover:font-semibold transition-all">Editais</Link>
          <Link href="/galeria" className="hover:text-gray-950 hover:font-semibold transition-all">Galeria</Link>
          <Link href="/nucleos" className="hover:text-gray-950 hover:font-semibold transition-all">Núcleos</Link>
          <Link href="/artigos" className="hover:text-gray-950 hover:font-semibold transition-all">Artigos</Link>
        </nav>

        <div className="lg:hidden h-full flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="lg">
                <Menu className="size-7" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full flex flex-col items-center justify-center bg-green-400 text-gray-900">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col items-center gap-6 text-xl">
                {/* 5. Não esqueça do menu mobile também! */}
                <Link href="/">Início</Link>
                <Link href="/sobreNos">Sobre Nós</Link>
                <Link href="/noticias">Notícias</Link>
                <Link href="/editais">Editais</Link>
                <Link href="/galeria">Galeria</Link>
                <Link href="/nucleos">Núcleos</Link>
                <Link href="/artigos">Artigos</Link>
                <hr className="w-70 border-gray-700 my-4"/>
                <span className="font-light w-full text-center max-w-xs mx-auto">
                    Incubadora Tecnológica para o Fortalecimento dos Empreendimentos Econômicos Solidários do IFRN
                </span>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}