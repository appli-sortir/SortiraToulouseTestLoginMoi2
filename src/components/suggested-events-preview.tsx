
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Megaphone, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { events } from '@/lib/events';

// Sample of suggested events. In a real application, this would be dynamic from another source.
const suggestedEvents = [
  { id: 'sugg1', name: 'Festival des Lanternes' },
  { id: 'sugg2', name: 'Marché de Noël' },
  { id: 'sugg3', name: 'Toulouse les Orgues' },
];

export function SuggestedEventsPreview() {
  return (
    <Card className="bg-card/80 border-primary/20 shadow-sm flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-400/20 rounded-lg">
                <Megaphone className="w-6 h-6 text-blue-500" />
            </div>
            <div>
                <CardTitle className="font-headline text-2xl text-primary">Événements Suggérés</CardTitle>
                <CardDescription>Proposés par la communauté.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-4">
          <ul className="bg-background/50 p-4 rounded-md border border-input space-y-4">
            {suggestedEvents.map((event) => (
              <li key={event.id} className="flex items-center gap-3">
                 <div className='p-2 bg-muted rounded-md'>
                    <Megaphone className="w-4 h-4 text-blue-500 shrink-0" />
                 </div>
                <p className="font-semibold">{event.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
       <CardFooter>
        <Button asChild variant="ghost" className="w-full">
          <Link href="/dashboard/suggested-events">
            <span>Voir toutes les suggestions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
