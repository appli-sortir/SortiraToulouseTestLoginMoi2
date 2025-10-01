'use client';

import React, { useState } from 'react';
import { Loader2 } from 'lucide-react'; 

// --- DÉFINITION DES COMPOSANTS SHADCN/UI SIMPLIFIÉS EN LIGNE ---
// Composants tirés du Canvas pour assurer la compatibilité.

// Simulateur de useToast
const useToast = () => {
    const toast = ({ title, description, variant }: { title: string, description: string, variant?: "default" | "destructive" }) => {
        const style = variant === "destructive" 
            ? "bg-red-500 text-white p-3 rounded-xl shadow-xl fixed bottom-4 right-4 z-50 transition-opacity" 
            : "bg-green-500 text-white p-3 rounded-xl shadow-xl fixed bottom-4 right-4 z-50 transition-opacity";
        
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

// Composant Checkbox (Simplifié)
const Checkbox = (props: React.ComponentPropsWithoutRef<'input'> & { onCheckedChange?: (checked: boolean) => void }) => (
    <input 
        type="checkbox" 
        {...props}
        className={`h-4 w-4 rounded border border-gray-300 text-blue-600 focus:ring-blue-500 ${props.className || ''}`}
        onChange={(e) => {
            if (props.onChange) props.onChange(e);
            if (props.onCheckedChange) props.onCheckedChange(e.target.checked);
        }}
    />
);

// Composants Select (Simplifiés)
const Select = (props: React.ComponentPropsWithoutRef<'select'>) => <select {...props} className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />;
const SelectTrigger = (props: React.ComponentPropsWithoutRef<'div'>) => <div {...props} className="flex items-center justify-between" />;
const SelectValue = (props: React.ComponentPropsWithoutRef<'span'>) => <span {...props} />;
const SelectContent = (props: React.ComponentPropsWithoutRef<'div'>) => <div {...props} className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 p-1" />;
const SelectItem = (props: React.ComponentPropsWithoutRef<'option'>) => <option {...props} className="p-2 hover:bg-gray-100 cursor-pointer" />;


// --- FIN DE LA DÉFINITION DES COMPOSANTS SHADCN/UI SIMPLIFIÉS EN LIGNE ---

// La liste des fournisseurs sociaux a été supprimée
/*
const socialProviders = [ ... ];
*/

// Fonction de validation du mot de passe
function validatePassword(password: string) {
  const errors: string[] = [];
  if (password.length < 8) {
    errors.push("Au moins 8 caractères");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Au moins une majuscule");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Au moins une minuscule");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Au moins un chiffre");
  }
  return errors;
}

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  // Suppression de 'useRouter' car non supporté dans cet environnement
  // const router = useRouter(); 
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [captchaChecked, setCaptchaChecked] = useState(false);

  const passwordErrors = validatePassword(password);

  // Fonction de navigation simplifiée
  const navigateTo = (path: string) => {
    console.log(`Navigation vers: ${path}`);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const identifiant = formData.get('username') as string;
    const email = formData.get('email') as string;
    const genre = formData.get('genre') as string;
    const isMajor = formData.get('is-major') === 'on';
    const isStudent = formData.get('is-student') === 'on';

    // Vérif mots de passe
    if (passwordErrors.length > 0) {
      toast({ 
        variant: 'destructive', 
        title: 'Mot de passe trop faible', 
        description: passwordErrors.join(', ') 
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({ 
        variant: 'destructive', 
        title: 'Erreur', 
        description: 'Les mots de passe ne correspondent pas.' 
      });
      return;
    }

    if (!captchaChecked) {
      toast({ 
        variant: 'destructive', 
        title: 'Vérification requise', 
        description: 'Veuillez cocher la case "Je ne suis pas un robot".' 
      });
      return;
    }

    setIsLoading(true);

    try {
      // SIMULATION de l'appel API
      console.log("Tentative d'inscription...");
      await new Promise(resolve => setTimeout(resolve, 1500)); 

      // SIMULATION: Réussite
      const result = { identifiant: identifiant || email };
      
      toast({ 
        title: 'Inscription réussie 🎉', 
        description: `Bienvenue ${result.identifiant}! Vous pouvez maintenant vous connecter.` 
      });

      // Redirection vers la page de connexion après une inscription réussie simulée
      navigateTo("/login"); 

      // Nettoyage
      setPassword('');
      setConfirmPassword('');
      setCaptchaChecked(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: error.message || "Une erreur inattendue est survenue lors de l'inscription.",
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
            Inscription
          </CardTitle>
          <CardDescription>
            Créez votre compte pour accéder à toutes les fonctionnalités.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            
            {/* Les boutons sociaux et le séparateur "Ou continuer avec" ont été supprimés */}

            {/* Identifiant */}
            <div className="space-y-2">
              <Label htmlFor="username">Identifiant</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Choisissez un identifiant"
                disabled={isLoading}
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Votre adresse email"
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
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              {password && passwordErrors.length > 0 && (
                <ul className="text-xs text-red-500 list-disc pl-5">
                  {passwordErrors.map((err, i) => <li key={i}>{err}</li>)}
                </ul>
              )}
            </div>

            {/* Confirmation Mot de passe */}
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
              <Input 
                id="confirm-password" 
                name="confirm-password" 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
              />
              {confirmPassword && confirmPassword !== password && (
                <p className="text-xs text-red-500">Les mots de passe ne correspondent pas</p>
              )}
            </div>

            {/* Genre */}
            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Select name="genre">
                <SelectTrigger id="genre"><SelectValue placeholder="Sélectionner..." /></SelectTrigger>
                <SelectContent>
                  {/* Utilisation de <select> et <option> simplifiés */}
                  <option value="homme">Homme</option>
                  <option value="femme">Femme</option>
                  <option value="autre">Autre</option>
                  <option value="non-specifie">Non spécifié</option>
                </SelectContent>
              </Select>
            </div>

            {/* Checkbox Majeur */}
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="is-major" name="is-major" required />
              <Label htmlFor="is-major">Je certifie être majeur(e)</Label>
            </div>

            {/* Checkbox Étudiant */}
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="is-student" name="is-student" />
              <Label htmlFor="is-student">Je suis étudiant(e)</Label>
            </div>

            {/* Checkbox Captcha */}
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="captcha" onCheckedChange={(checked) => setCaptchaChecked(checked)} />
              <Label htmlFor="captcha">Je ne suis pas un robot</Label>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={
                isLoading || 
                passwordErrors.length > 0 || 
                password !== confirmPassword || 
                !captchaChecked
              }
            >
              {isLoading ? (
                <><Loader2 className="animate-spin mr-2" />Création du compte...</>
              ) : "S'inscrire"}
            </Button>
            <p className="text-xs text-gray-500 text-center">
              Déjà un compte? <a href="/login" className="underline text-blue-600">Connectez-vous</a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

// Composant racine pour l'environnement React
export default function App() {
    return <RegisterForm />;
}
