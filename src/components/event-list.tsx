'use client';

import { EventCard } from './event-card';
import Link from 'next/link';
import type { Event } from '@/lib/types';

interface EventListProps {
  events: Event[];
}

export function EventList({ events }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-dashed border-primary/20 rounded-lg">
        <p className="text-muted-foreground">No events found for this category.</p>
        <p className="text-sm text-muted-foreground/80">Try selecting another one!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event) => (
        <Link href={`/events/${event.id}`} key={event.id} className="group">
          <EventCard event={event} />
        </Link>
      ))}
    </div>
  );
}
