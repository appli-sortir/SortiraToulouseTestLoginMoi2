
'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Star } from 'lucide-react';
import type { Event } from '@/lib/types';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const [isFavorite, setIsFavorite] = useState(event.isFavorite);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevents navigation when clicking the star
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    // In a real app, you would also make an API call to update the backend
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 border-primary/10 bg-card">
      <CardHeader className="p-0 relative">
        <div className="relative h-48 w-full">
          <Image
            src={event.image}
            alt={event.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            data-ai-hint="event photo"
          />
        </div>
         <Button 
            size="icon" 
            variant="ghost" 
            className="absolute top-2 right-2 h-9 w-9 rounded-full bg-black/30 hover:bg-black/50 text-white"
            onClick={toggleFavorite}
            aria-label="Mettre en favori"
          >
            <Star className={cn("h-5 w-5 transition-colors", isFavorite ? "fill-yellow-400 text-yellow-400" : "fill-transparent text-white")} />
          </Button>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Badge variant="secondary" className="mb-2">{event.category}</Badge>
        <CardTitle className="font-headline text-xl mb-2 text-primary/90">{event.name}</CardTitle>
        <p className="text-muted-foreground text-sm line-clamp-2">{event.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 text-sm text-muted-foreground flex flex-col items-start gap-2">
         <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="truncate">{event.address}</span>
          </div>
      </CardFooter>
    </Card>
  );
}
