'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Separator } from './ui/separator';
import { Checkbox } from './ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [captchaChecked, setCaptchaChecked] = useState(false);

  const passwordErrors = validatePassword(password);

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
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          identifiant, 
          email, 
          password, 
          genre, 
          majeur: isMajor, 
          etudiant: isStudent 
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Erreur lors de l'inscription");

      toast({ 
        title: 'Inscription réussie 🎉', 
        description: `Bienvenue ${result.identifiant}! Vous pouvez maintenant vous connecter.` 
      });

      // Nettoyage
      setPassword('');
      setConfirmPassword('');
      setCaptchaChecked(false);
      event.currentTarget.reset();
      router.push('/login');

    } catch (error: any) {
      toast({ 
        variant: 'destructive', 
        title: 'Erreur', 
        description: error.message || 'Une erreur est survenue lors de l\'inscription.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-primary/20 shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-3xl text-primary">Inscription</CardTitle>
        <CardDescription>Créez un compte pour rejoindre la communauté.</CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">

          <div className="relative w-full">
            <Separator className="absolute top-1/2 -translate-y-1/2" />
            <p className="text-center bg-card px-2 text-xs text-muted-foreground relative">
              Inscription par email
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Identifiant</Label>
            <Input id="username" name="username" type="text" placeholder="Choisissez un identifiant" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="Votre adresse email" required />
          </div>

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

          <div className="space-y-2">
            <Label htmlFor="genre">Genre</Label>
            <Select name="genre">
              <SelectTrigger id="genre"><SelectValue placeholder="Sélectionner..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="homme">Homme</SelectItem>
                <SelectItem value="femme">Femme</SelectItem>
                <SelectItem value="autre">Autre</SelectItem>
                <SelectItem value="non-specifie">Non spécifié</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="is-major" name="is-major" required />
            <Label htmlFor="is-major">Je certifie être majeur(e)</Label>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="is-student" name="is-student" />
            <Label htmlFor="is-student">Je suis étudiant(e)</Label>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="captcha" onCheckedChange={(checked) => setCaptchaChecked(!!checked)} />
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
          <p className="text-xs text-muted-foreground text-center">
            Déjà un compte? <Link href="/login" className="underline text-primary">Connectez-vous</Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
