
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateNotePage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    // Simulate a network request
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Note publiée !',
        description: 'Votre note a été partagée avec la communauté.',
      });
      // Optionally, redirect the user or clear the form
      (event.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <Link href="/dashboard/notes-toulouse" className="inline-flex items-center gap-2 text-primary hover:underline font-semibold">
        <ArrowLeft className="w-4 h-4" />
        Retour aux notes
      </Link>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Publier une nouvelle note</CardTitle>
            <CardDescription>
              Partagez une information, un bon plan ou une question avec la communauté.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Titre *</Label>
              <Input id="title" name="title" placeholder="Ex: Meilleur café de Toulouse" required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="address">Adresse (optionnel)</Label>
              <Input id="address" name="address" placeholder="Ex: 1 Rue du Taur, 31000 Toulouse" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea id="description" name="description" placeholder="Détaillez votre note..." rows={8} required />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} size="lg">
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  <span>Publication en cours...</span>
                </>
              ) : (
                'Publier'
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
