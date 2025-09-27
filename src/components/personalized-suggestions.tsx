
'use client';

import React, { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2, Loader2, Sparkles } from 'lucide-react';
import { personalizedEventSuggestions } from '@/ai/flows/personalized-event-suggestions';
import { useToast } from '@/hooks/use-toast';

export function PersonalizedSuggestions() {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleGetSuggestions = async () => {
    startTransition(async () => {
      try {
        const result = await personalizedEventSuggestions({
          userPreferences: 'Music, Museums, Parks in Toulouse',
          pastActivity: 'Visited Musée des Augustins, attended a concert at Le Bikini.',
        });
        setSuggestions(result.suggestions);
        if (result.suggestions.length === 0) {
          toast({
            title: 'Pas de nouvelles suggestions',
            description: "Nous n'avons pas trouvé de nouveaux événements pour vous pour le moment. Revenez plus tard !",
          });
        }
      } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
        toast({
          variant: 'destructive',
          title: "Erreur lors de l'obtention des suggestions",
          description: errorMessage,
        });
      }
    });
  };
  
  return (
    <Card className="bg-card/80 border-primary/20 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-4">
            <div className="p-3 bg-accent/20 rounded-lg">
                <Wand2 className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
                <CardTitle className="font-headline text-2xl text-primary">Pour toi</CardTitle>
                <CardDescription>Laisse l'IA trouver des événements rien que pour toi.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        {suggestions.length > 0 && (
          <div className="mb-6 space-y-3">
            <h4 className="font-semibold text-foreground">Voici quelques événements qui pourraient vous plaire :</h4>
            <ul className="bg-background/50 p-4 rounded-md border border-input space-y-2">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent shrink-0" />
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Button onClick={handleGetSuggestions} disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Génération...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              {suggestions.length > 0 ? 'Obtenir de nouvelles suggestions' : 'Obtenir des suggestions'}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
