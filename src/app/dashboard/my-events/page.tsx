
'use client';

import { useState } from 'react';
import { EventList } from '@/components/event-list';
import { events } from '@/lib/events';
import type { Event } from '@/lib/types';
import { CalendarCheck, PlusCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Échantillon de données pour les sorties de l'utilisateur.
// Dans une vraie application, ces données proviendraient d'une base de données.
const mySampleEvents: Event[] = [
  events[0],
  events[2],
];

const myFavoriteEvents: Event[] = events.filter(e => e.isFavorite);

export default function MyEventsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary flex items-center gap-3">
            <CalendarCheck className="w-8 h-8" />
            Mes sorties
          </h1>
          <p className="text-muted-foreground mt-2">
            Gérez les événements que vous avez créés, auxquels vous participez ou que vous avez mis en favoris.
          </p>
        </div>
        <Button asChild>
           <Link href="/dashboard/my-events/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Créer une sortie
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="registered" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="registered">
            <CalendarCheck className="mr-2 h-4 w-4"/>
            Inscrit(e) / Organisateur(trice)
          </TabsTrigger>
          <TabsTrigger value="favorites">
            <Star className="mr-2 h-4 w-4"/>
            Mes favoris
          </TabsTrigger>
        </TabsList>
        <TabsContent value="registered" className="mt-6">
           <EventList events={mySampleEvents} />
        </TabsContent>
        <TabsContent value="favorites" className="mt-6">
          <EventList events={myFavoriteEvents} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
