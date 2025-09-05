import React from "react";

export function Footer() {
    return (
        <footer 
        className="w-full bg-green-400 py-6 text-black text-center">
            <div className="container mx-auto">
                <p className="text-sm">
                    © {new Date().getFullYear()} ifSOL. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    )
}