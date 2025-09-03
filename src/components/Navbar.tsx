import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 h-20 w-full border-b bg-green-400 backdrop-blur flex items-center">
      <div className="container h-full flex justify-between px-8 md:px-12">
        
        <div className="flex items-center gap-4">
          <a href="/">
            <img 
            src="/logo.svg"
            alt= "Logo da ifSOL" 
            className="h-20 w-auto object-contain max-w-full"/> 
          </a>
          <span className="font-light text-black hidden md:block">
            Instituto Federal de Educação, Ciência e Tecnologia do Rio Grande do Norte
            </span>
        </div>


        
        <nav className="hidden md:flex items-center gap-4 text-gray-800">
          <a href="/" className="hover:text-gray-950 hover:font-semibold transition-all">Início</a>
          <a href="/noticias" className="hover:text-gray-950 hover:font-semibold transition-all">Notícias</a>
          <a href="/editais" className="hover:text-gray-950 hover:font-semibold transition-all">Editais</a>
          <a href="/galeria" className="hover:text-gray-950 hover:font-semibold transition-all">Galeria</a>
          <a href="/nucleos" className="hover:text-gray-950 hover:font-semibold transition-all">Núcleos</a>
        </nav>

        <div className="md:hidden h-full flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="lg">
                <Menu className="w-full" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full flex flex-col items-center justify-center bg-green-400 text-gray-900">
              <nav className="flex flex-col items-center gap-6 text-xl">
                <a href="/" className="font-bold">Início</a>
                <a href="/noticias">Notícias</a>
                <a href="/editais">Editais</a>
                <a href="/galeria">Galeria</a>
                <a href="/nucleos">Núcleos</a>
                <hr className="w-70 border-gray-700 my-4"/>
                <span className="font-light w-full text-center">
                    Instituto federal de Educação, Ciências e tecnologia do Rio Grande do Norte
                </span>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}