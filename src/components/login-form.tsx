'use client';

import React, { useState } from "react";
import { Loader2 } from "lucide-react"; 

// --- DÉFINITION DES COMPOSANTS SHADCN/UI SIMPLIFIÉS EN LIGNE ---
// Dans un environnement de fichier unique, nous définissons les composants de base directement ici.

// Simulateur de useToast
const useToast = () => {
    const toast = ({ title, description, variant }: { title: string, description: string, variant?: "default" | "destructive" }) => {
        const style = variant === "destructive" 
            ? "bg-red-500 text-white p-3 rounded-lg shadow-xl fixed bottom-4 right-4 z-50 transition-opacity" 
            : "bg-green-500 text-white p-3 rounded-lg shadow-xl fixed bottom-4 right-4 z-50 transition-opacity";
        
        const toastElement = document.createElement('div');
        toastElement.className = style;
        toastElement.innerHTML = `<div class="font-bold">${title}</div><div class="text-sm">${description}</div>`;
        document.body.appendChild(toastElement);

        setTimeout(() => {
            toastElement.classList.add('opacity-0');
            setTimeout(() => toastElement.remove(), 500);
        }, 3000);
    };
    return { toast };
};


// Composant Card
const Card = (props: React.ComponentPropsWithoutRef<'div'>) => (
  <div {...props} className={`rounded-xl bg-white text-gray-900 border border-gray-200 ${props.className || ''}`} />
);
const CardHeader = (props: React.ComponentPropsWithoutRef<'div'>) => (
  <div {...props} className={`flex flex-col space-y-1.5 p-6 ${props.className || ''}`} />
);
const CardTitle = (props: React.ComponentPropsWithoutRef<'h3'>) => (
  <h3 {...props} className={`text-2xl font-semibold leading-none tracking-tight ${props.className || ''}`} />
);
const CardDescription = (props: React.ComponentPropsWithoutRef<'p'>) => (
  <p {...props} className={`text-sm text-gray-500 ${props.className || ''}`} />
);
const CardContent = (props: React.ComponentPropsWithoutRef<'div'>) => (
  <div {...props} className={`p-6 pt-0 ${props.className || ''}`} />
);
const CardFooter = (props: React.ComponentPropsWithoutRef<'div'>) => (
  <div {...props} className={`flex items-center p-6 pt-0 ${props.className || ''}`} />
);

// Composant Button
const Button = (props: React.ComponentPropsWithoutRef<'button'>) => (
  <button
    {...props}
    className={`inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors h-10 px-4 py-2 
      ${props.disabled ? 'opacity-50 cursor-not-allowed bg-gray-200 text-gray-500' : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-md'} 
      ${props.className || ''}`}
    disabled={props.disabled}
  />
);

// Composant Input
const Input = (props: React.ComponentPropsWithoutRef<'input'>) => (
  <input
    {...props}
    className={`flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white 
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 
      disabled:cursor-not-allowed disabled:opacity-50 ${props.className || ''}`}
  />
);

// Composant Label
const Label = (props: React.ComponentPropsWithoutRef<'label'>) => (
  <label {...props} className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${props.className || ''}`} />
);


// --- DÉBUT DU COMPOSANT PRINCIPAL REQUIS PAR L'UTILISATEUR (LoginForm) ---

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [identifiant, setIdentifiant] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  // Fonction de navigation simplifiée pour cet environnement
  const navigateTo = (path: string) => {
    // Dans cet environnement de prévisualisation, nous utilisons console.log
    console.log(`Navigation vers: ${path}`);
    // Si l'environnement supporte la navigation (par exemple, un router), 
    // on utiliserait window.location.href = path;
  };

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
      // Simulation de l'appel API (qui échouera dans cet environnement sans backend, 
      // mais nous conservons la structure)
      console.log("Tentative de connexion...");
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simule la latence réseau

      // SIMULATION: Réussite si l'identifiant est 'demo' et le mot de passe est 'password'
      if (identifiant === "demo" && password === "password") {
         toast({
            title: "Connexion réussie ✅",
            description: `Bienvenue ${identifiant} !`,
        });
        navigateTo("/dashboard");
      } else {
         throw new Error("Identifiant ou mot de passe incorrect.");
      }


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
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-md border-blue-600/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl text-blue-600">
            Connexion
          </CardTitle>
          <CardDescription>
            Connectez-vous pour accéder à votre espace personnel. (Utilisez **demo** / **password** pour simuler la connexion)
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            
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

            {/* Remplacement du composant Link par une balise <a> */}
            <a
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline block text-right"
            >
              Mot de passe oublié ?
            </a>
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
            <p className="text-xs text-gray-500 text-center">
              Pas encore de compte ?{" "}
              {/* Remplacement du composant Link par une balise <a> */}
              <a href="/register" className="underline text-blue-600">
                Créez-en un
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

// Composant racine pour l'environnement React
export default function App() {
    return <LoginForm />;
}
