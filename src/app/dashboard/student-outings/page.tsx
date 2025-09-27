
import { EventList } from '@/components/event-list';
import { events } from '@/lib/events';
import type { Event } from '@/lib/types';
import { School } from 'lucide-react';

export default function StudentOutingsPage() {
  // In a real application, you would implement proper server-side access control
  // based on the user's session and profile data (role, student status, etc.).
  // This is just a simulation.

  const studentEvents: Event[] = events.filter(
    (event) => event.category === 'sortie étudiante'
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-primary flex items-center gap-3">
            <School className="w-8 h-8" />
            Sorties étudiantes
        </h1>
        <p className="text-muted-foreground mt-2">
          Découvrez les événements et bons plans réservés à la communauté étudiante. L'accès est modéré.
        </p>
      </div>
      <EventList events={studentEvents} />
    </div>
  );
}
