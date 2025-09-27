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
import { useRouter } from 'next/navigation';
import { Separator } from './ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

import { auth } from '@/lib/firebase'; // ton fichier firebase.ts
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider } from 'firebase/auth';

const socialProviders = [
  { name: 'Google', provider: new GoogleAuthProvider(), color: 'text-[#DB4437]' },
  { name: 'Facebook', provider: new FacebookAuthProvider(), color: 'text-[#1877F2]' },
  { name: 'Apple', provider: new OAuthProvider('apple.com'), color: 'text-black' },
  { name: 'X', provider: new OAuthProvider('twitter.com'), color: 'text-blue-500' },
  { name: 'Microsoft', provider: new OAuthProvider('microsoft.com'), color: 'text-[#F25022]' },
  { name: 'LinkedIn', provider: new OAuthProvider('linkedin.com'), color: 'text-[#0A66C2]' },
  { name: 'Yahoo', provider: new OAuthProvider('yahoo.com'), color: 'text-[#400090]' },
  { name: 'Spotify', provider: new OAuthProvider('spotify.com'), color: 'text-green-600' },
];

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleEmailLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: 'Connexion réussie', description: 'Bienvenue !' });
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Erreur de connexion',
        description: error.message || 'Impossible de se connecter avec cet identifiant',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: any) => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, provider);
      toast({ title: 'Connexion réussie', description: 'Bienvenue !' });
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Erreur de connexion',
        description: error.message || `Impossible de se connecter avec ce fournisseur`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-primary/20 shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-3xl text-primary">Connexion</CardTitle>
        <CardDescription>
          Accédez à votre compte pour gérer vos sorties.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleEmailLogin}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Email ou Identifiant</Label>
            <Input id="username" name="username" type="text" placeholder="Votre email ou identifiant" required />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Mot de passe</Label>
              <Link href="#" className="text-sm text-primary hover:underline">Mot de passe oublié ?</Link>
            </div>
            <Input id="password" name="password" type="password" required />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : 'Se connecter'}
          </Button>

          <div className="relative w-full">
            <Separator className="absolute top-1/2 -translate-y-1/2" />
            <p className="text-center bg-card px-2 text-xs text-muted-foreground relative">Ou continuer avec</p>
          </div>

          <TooltipProvider>
            <div className="grid grid-cols-4 gap-2 w-full">
              {socialProviders.map(sp => (
                <Tooltip key={sp.name}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className={`h-12 w-full ${sp.color}`}
                      onClick={() => handleSocialLogin(sp.provider)}
                    >
                      {sp.name[0]}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{sp.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>

          <p className="text-xs text-muted-foreground text-center">
            Pas encore de compte?{' '}
            <Link href="/register" className="underline text-primary">
              Inscrivez-vous
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
