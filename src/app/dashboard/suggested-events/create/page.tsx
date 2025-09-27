
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

export default function CreateSuggestedEventPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    // Simulate a network request
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Événement suggéré !',
        description: 'Votre suggestion a été envoyée et sera examinée prochainement.',
      });
      // Optionally, redirect the user or clear the form
      (event.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <Link href="/dashboard/suggested-events" className="inline-flex items-center gap-2 text-primary hover:underline font-semibold">
        <ArrowLeft className="w-4 h-4" />
        Retour aux événements suggérés
      </Link>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Suggérer un nouvel événement</CardTitle>
            <CardDescription>
              Faites découvrir un événement à la communauté. Remplissez les détails ci-dessous.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Titre de l'événement *</Label>
              <Input id="title" name="title" placeholder="Ex: Festival des Lanternes" required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="location">Lieu (Nom ou Adresse) *</Label>
              <Input id="location" name="location" placeholder="Ex: Parc du Ritouret, Blagnac" required />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                <Label htmlFor="startDate">Date de début *</Label>
                <Input id="startDate" name="startDate" type="date" required />
                </div>
                <div className="space-y-2">
                <Label htmlFor="endDate">Date de fin (optionnel)</Label>
                <Input id="endDate" name="endDate" type="date" />
                </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea id="description" name="description" placeholder="Décrivez l'événement, ce qui le rend spécial, etc." rows={8} required />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} size="lg">
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  <span>Envoi en cours...</span>
                </>
              ) : (
                'Suggérer l\'événement'
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
