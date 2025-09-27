
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Facebook, Lightbulb } from 'lucide-react';
import Link from 'next/link';

export function Suggestions() {
  return (
    <Card className="bg-card/80 border-primary/20 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-400/20 rounded-lg">
                <Lightbulb className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
                <CardTitle className="font-headline text-2xl text-primary">Suggestions</CardTitle>
                <CardDescription>Découvrez d'autres plateformes pour trouver encore plus de sorties.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="flex flex-col border-primary/10">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-primary/90 flex items-center gap-2">
              <Facebook className="w-5 h-5" />
              Groupes Facebook
            </CardTitle>
            <CardDescription>
              Une sélection de groupes pour trouver des sorties et activités à Toulouse.
            </CardDescription>
          </CardHeader>
          <CardFooter className="mt-auto pt-0">
            <Button asChild className="w-full" variant="outline">
              <Link href="/dashboard/facebook-groups">
                <ExternalLink className="mr-2 h-4 w-4" />
                Voir les groupes
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col border-primary/10">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-primary/90 flex items-center gap-2">
              <ExternalLink className="w-5 h-5" />
              Événements Meetup
            </CardTitle>
            <CardDescription>
              Découvrez les événements du groupe "Expats in Toulouse".
            </CardDescription>
          </CardHeader>
          <CardFooter className="mt-auto pt-0">
            <Button asChild className="w-full" variant="outline">
              <a href="https://www.meetup.com/fr-FR/expats-in-toulouse/events/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Visiter Meetup
              </a>
            </Button>
          </CardFooter>
        </Card>
      </CardContent>
    </Card>
  );
}
