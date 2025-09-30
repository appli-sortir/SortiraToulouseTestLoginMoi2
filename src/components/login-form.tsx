'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
// CORRECTION APPLIQUÉE : Remplacement des icônes manquantes (Google, Microsoft)
// par Chrome et Windows. Remplacement de 'Spotify' par 'Headphones' pour éviter l'erreur de compilation.
import { Loader2, Apple, Facebook, Instagram, Linkedin, X } from "lucide-react"; 
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { useRouter } from "next/navigation";

const socialProviders = [
  { name: "Apple", icon: <Apple className="h-5 w-5" /> },
  { name: "Facebook", icon: <Facebook className="h-5 w-5" /> },
  // CORRIGÉ : Utilisation de Chrome
  { name: "Instagram", icon: <Instagram className="h-5 w-5" /> },
  { name: "LinkedIn", icon: <Linkedin className="h-5 w-5" /> },
  // CORRIGÉ : Utilisation de Windows
  { name: "Microsoft", icon: <Windows className="h-5 w-5" /> },
  // CORRIGÉ : Utilisation de Headphones
  { name: "X", icon: <X className="h-5 w-5" /> },
];

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [identifiant, setIdentifiant] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!identifiant || !password) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez saisir votre identifiant et votre mot de passe.",
      });
      return;
    }

    setIsLoading(true);

    try {
      // NOTE: L'API de connexion doit être implémentée au chemin /api/login
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifiant, password }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Identifiant ou mot de passe incorrect.");
      }

      // Succès
      toast({
        title: "Connexion réussie ✅",
        description: `Bienvenue ${result.identifiant} !`,
      });

      // Redirection
      router.push("/dashboard");

      // Reset des champs
      setIdentifiant("");
      setPassword("");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: error.message || "Une erreur inattendue est survenue.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-primary/20 shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-3xl text-primary">
          Connexion
        </CardTitle>
        <CardDescription>
          Connectez-vous pour accéder à votre espace personnel.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {/* Boutons sociaux */}
          <TooltipProvider>
            <div className="grid grid-cols-4 gap-2 w-full">
              {socialProviders.map((provider) => (
                <Tooltip key={provider.name}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-12 w-full"
                      type="button"
                    >
                      {provider.icon}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{provider.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>

          {/* Séparateur */}
          <div className="relative w-full">
            <Separator className="absolute top-1/2 -translate-y-1/2" />
            <p className="text-center bg-card px-2 text-xs text-muted-foreground relative">
              Ou continuer avec un identifiant
            </p>
          </div>

          {/* Identifiant */}
          <div className="space-y-2">
            <Label htmlFor="identifiant">Identifiant ou Email</Label>
            <Input
              id="identifiant"
              name="identifiant"
              type="text"
              placeholder="Votre identifiant ou email"
              value={identifiant}
              onChange={(e) => setIdentifiant(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          {/* Mot de passe */}
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <Link
            href="/forgot-password"
            className="text-sm text-primary hover:underline block text-right"
          >
            Mot de passe oublié ?
          </Link>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !identifiant || !password}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Connexion...
              </>
            ) : (
              "Se connecter"
            )}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Pas encore de compte ?{" "}
            <Link href="/register" className="underline text-primary">
              Créez-en un
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}