
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const keywords = ["à visiter", "à voir", "activité", "aide", "alternance", "animation", "animaux", "artisan", "artiste", "astuces", "atelier", "bar", "bien-être", "bon restaurant", "bons plans", "bricolage", "cadeau", "chanter", "collection", "commerce", "concert", "cours", "couture", "cuisine", "décoration", "déménagement", "dépannage", "disquaire", "emploi", "évènement", "expert", "fête", "fleurs", "formation", "fripes", "garde d'enfant", "informatique", "jardinage", "jouer de la musique", "langues", "lieu calme", "livre", "location", "logement", "manutention", "matériel", "médical", "mode", "moto", "nettoyage", "nuisibles", "photo", "piscine", "prêt", "question", "radio", "randonnée", "réparation", "restaurant", "santé", "service", "Shopping", "solidarité", "spécialiste", "spectacle", "spirituel", "sport", "stage", "températures", "théâtre", "vacances", "vélo", "vidéo", "voiture"];

export default function CreateExchangePage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    // Simulate a network request
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Publication envoyée !',
        description: 'Votre publication a été partagée avec la communauté.',
      });
      // Optionally, redirect the user or clear the form
      (event.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <Link href="/dashboard/exchange-in-toulouse" className="inline-flex items-center gap-2 text-primary hover:underline font-semibold">
        <ArrowLeft className="w-4 h-4" />
        Retour aux échanges
      </Link>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Publier un nouvel échange</CardTitle>
            <CardDescription>
              Partagez une demande, une offre ou une information avec la communauté de Toulouse.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Titre *</Label>
              <Input id="title" name="title" placeholder="Ex: Recherche partenaire de randonnée" required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="theme">Thème *</Label>
               <Select name="theme" required>
                <SelectTrigger id="theme">
                  <SelectValue placeholder="Sélectionnez un thème" />
                </SelectTrigger>
                <SelectContent>
                  {keywords.map(keyword => (
                    <SelectItem key={keyword} value={keyword}>
                      {keyword.charAt(0).toUpperCase() + keyword.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
             <div className="space-y-2">
              <Label htmlFor="address">Adresse (optionnel)</Label>
              <Input id="address" name="address" placeholder="Ex: 1 Rue du Taur, 31000 Toulouse" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea id="description" name="description" placeholder="Détaillez votre demande ou votre proposition..." rows={8} required />
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
    
