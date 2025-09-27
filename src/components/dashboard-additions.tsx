

'use client';

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Facebook, LogOut } from 'lucide-react';
import Link from 'next/link';

export function DashboardAdditions() {
  // In a real app, logic to show/hide cards based on user role would be needed here.
  // For now, we show all for demonstration purposes.
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
       <Card className="flex flex-col border-primary/10">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary/90 flex items-center gap-2">
            <Facebook className="w-5 h-5" />
            Groupes Facebook
          </CardTitle>
          <CardDescription>
            Découvrez plus de sorties et d'activités à Toulouse.
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
       <Card className="flex flex-col border-primary/10 bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary/90 flex items-center gap-2">
            <LogOut className="w-5 h-5" />
            Déconnexion
          </CardTitle>
          <CardDescription>
            Terminer votre session et revenir à la page d'accueil.
          </CardDescription>
        </CardHeader>
        <CardFooter className="mt-auto pt-0">
          <Button asChild className="w-full" variant="secondary">
            <Link href="/">
              Se déconnecter
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
