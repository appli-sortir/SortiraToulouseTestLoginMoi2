
import { HomePageClient } from '@/components/home-page-client';
import { events, categories } from '@/lib/events';
import { Button } from '@/components/ui/button';
import { PlusCircle, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function AllEventsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary flex items-center gap-3">
            <Calendar className="w-8 h-8" />
            Toutes les sorties
          </h1>
          <p className="text-muted-foreground mt-2">
            Parcourez tous les événements disponibles, recherchez par nom et filtrez par date ou catégorie.
          </p>
        </div>
        <Button asChild>
           <Link href="/dashboard/my-events/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Créer une sortie
          </Link>
        </Button>
      </div>
      <HomePageClient allEvents={events} categories={categories} />
    </div>
  );
}
