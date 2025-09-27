
import { EventList } from '@/components/event-list';
import { events } from '@/lib/events';
import type { Event } from '@/lib/types';
import { Users } from 'lucide-react';

export default function GirlsOutingsPage() {
  // In a real application, you would implement proper server-side access control
  // based on the user's session and profile data (role, gender, etc.).
  // This is just a simulation.

  const girlsEvents: Event[] = events.filter(
    (event) => event.category === 'soirée entre filles'
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-primary flex items-center gap-3">
            <Users className="w-8 h-8" />
            Sorties entre filles
        </h1>
        <p className="text-muted-foreground mt-2">
          Retrouvez ici les événements exclusivement réservés aux membres féminins. L'accès est modéré.
        </p>
      </div>
      <EventList events={girlsEvents} />
    </div>
  );
}
