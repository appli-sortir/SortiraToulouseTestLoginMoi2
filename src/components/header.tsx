
import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { LogIn, Languages, UserPlus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Logo } from './logo';


export function Header() {
  return (
    <header className="py-8 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center relative">
        <div className="flex w-full items-center justify-between">
            <div className="flex-shrink-0 invisible lg:visible">
               <Link href="/" className="flex items-center gap-3">
                <Logo />
              </Link>
            </div>
            
            <div className="flex-1 flex flex-col justify-center items-center gap-4 text-center">
              <div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-primary whitespace-nowrap">
                  Sortir à Toulouse
                </h1>
                <p className="mt-3 text-lg text-foreground/80 max-w-2xl mx-auto">
                  Application pour sortir à Toulouse, créée tes sorties, inscris-toi aux sorties.
                  <br />
                  C'est gratuit et sans limites.
                </p>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Languages />
                    <span className="hidden sm:inline-block ml-2">Traduire</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <div id="google_translate_element"></div>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button asChild variant="outline">
                <Link href="/register">
                  <UserPlus />
                  <span>S'inscrire</span>
                </Link>
              </Button>
              <Button asChild>
                <Link href="/login">
                  <LogIn />
                  <span>Connexion</span>
                </Link>
              </Button>
            </div>
        </div>

        {/* Buttons for smaller screens */}
        <div className="flex lg:hidden items-center gap-2 mt-6">
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                <Languages />
                <span className="ml-2">Traduire</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <div id="google_translate_element"></div>
            </DropdownMenuContent>
            </DropdownMenu>
            <Button asChild variant="outline">
            <Link href="/register">
                <UserPlus />
                <span>S'inscrire</span>
            </Link>
            </Button>
            <Button asChild>
            <Link href="/login">
                <LogIn />
                <span>Connexion</span>
            </Link>
            </Button>
        </div>
      </div>
    </header>
  );
}
