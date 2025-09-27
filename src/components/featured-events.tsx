'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { events } from '@/lib/events';
import Link from 'next/link';

// Sample of featured events. In a real application, this would be dynamic.
const featuredEvents = [events[1], events[4]];

export function FeaturedEvents() {
  return (
    <Card className="bg-card/80 border-primary/20 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-400/20 rounded-lg">
                <Star className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
                <CardTitle className="font-headline text-2xl text-primary">Sorties mises en avant</CardTitle>
                <CardDescription>Découvrez les événements du moment.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        {featuredEvents.length > 0 && (
          <div className="space-y-3">
            <ul className="bg-background/50 p-4 rounded-md border border-input space-y-4">
              {featuredEvents.map((event) => (
                <li key={event.id}>
                  <Link href={`/events/${event.id}`} className="flex items-center gap-3 group">
                     <div className='p-2 bg-muted rounded-md'>
                        <Star className="w-4 h-4 text-yellow-500 shrink-0" />
                     </div>
                    <div>
                        <p className="font-semibold group-hover:text-primary transition-colors">{event.name}</p>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
