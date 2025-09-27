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
import { Loader2, Facebook, Linkedin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Separator } from './ui/separator';
import { Checkbox } from './ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { hash } from 'bcryptjs';
import { db } from '@/lib/firebase';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';

const socialProviders = [
  { name: 'Google', icon: <Facebook className="h-5 w-5" /> },
  { name: 'LinkedIn', icon: <Linkedin className="h-5 w-5" /> },
  // Tu peux compléter avec tous les autres icônes comme Google, Apple, X, etc.
];

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [captchaChecked, setCaptchaChecked] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const genre = formData.get('genre') as string;
    const isMajor = (formData.get('is-major') as string | null) === 'on';
    const isStudent = (formData.get('is-student') as string | null) === 'on';
    const profilePicture = (formData.get('profile-picture') as File) || null;

    if (password !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Les mots de passe ne correspondent pas.',
      });
      return;
    }

    if (!captchaChecked) {
      toast({
        variant: 'destructive',
        title: 'Vérification requise',
        description: 'Veuillez cocher la case "Je ne suis pas un robot".',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Vérifier si l'utilisateur existe déjà
      const userRef = doc(db, 'users', username);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        toast({
          variant: 'destructive',
          title: 'Utilisateur existant',
          description: 'Cet identifiant est déjà utilisé.',
        });
        setIsLoading(false);
        return;
      }

      // Hasher le mot de passe
      const hashedPassword = await hash(password, 10);

      // Créer l'utilisateur dans Firestore
      await setDoc(userRef, {
        username,
        email,
        password: hashedPassword,
        genre,
        isMajor,
        isStudent,
        profilePictureUrl: profilePicture ? URL.createObjectURL(profilePicture) : null,
        createdAt: new Date(),
      });

      toast({
        title: 'Inscription réussie!',
        description: 'Bienvenue! Vous pouvez maintenant vous connecter.',
      });

      // Réinitialiser le formulaire
      setPassword('');
      setConfirmPassword('');
      setCaptchaChecked(false);
      event.currentTarget.reset();
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Une erreur est survenue lors de l’inscription.',
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
          <TooltipProvider>
            <div className="grid grid-cols-4 gap-2 w-full">
              {socialProviders.map((provider) => (
                <Tooltip key={provider.name}>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="h-12 w-full">
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

          <div className="relative w-full">
            <Separator className="absolute top-1/2 -translate-y-1/2" />
            <p className="text-center bg-card px-2 text-xs text-muted-foreground relative">
              Ou continuer avec un email
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
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
            <Input
              id="confirm-password"
              name="confirm-password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="genre">Genre</Label>
            <Select name="genre">
              <SelectTrigger id="genre">
                <SelectValue placeholder="Sélectionner..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="homme">Homme</SelectItem>
                <SelectItem value="femme">Femme</SelectItem>
                <SelectItem value="autre">Autre</SelectItem>
                <SelectItem value="non-specifie">Non spécifié</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-picture">Photo de profil</Label>
            <Input id="profile-picture" type="file" accept="image/*" />
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="is-major" required />
            <Label htmlFor="is-major">Je certifie être majeur(e)</Label>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="is-student" />
            <Label htmlFor="is-student">Je suis étudiant(e)</Label>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="captcha" onCheckedChange={(checked) => setCaptchaChecked(!!checked)} />
            <Label htmlFor="captcha">Je ne suis pas un robot</Label>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" />
                <span>Création du compte...</span>
              </>
            ) : (
              "S'inscrire"
            )}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Déjà un compte?{' '}
            <Link href="/login" className="underline text-primary">
              Connectez-vous
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
