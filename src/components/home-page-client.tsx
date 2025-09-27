
'use client';

import React, { useState, useMemo } from 'react';
import { Header } from '@/components/header';
import { CategoryFilters } from '@/components/category-filters';
import { EventList } from '@/components/event-list';
import { PersonalizedSuggestions } from '@/components/personalized-suggestions';
import type { Event, Category } from '@/lib/types';
import { usePathname } from 'next/navigation';
import { FeaturedEvents } from './featured-events';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { parse, isPast, isFuture } from 'date-fns';
import { ImageMosaic } from './image-mosaic';
import { Partners } from './partners';
import { Suggestions } from './suggestions';
import { SuggestedEventsPreview } from './suggested-events-preview';


interface HomePageClientProps {
  allEvents: Event[];
  categories: Category[];
}

type TimeFilter = 'tous' | 'avenir' | 'passes';

export function HomePageClient({ allEvents, categories }: HomePageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Tous'>('Tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('tous');

  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');

  const filteredEvents = useMemo(() => {
    const now = new Date();
    
    return allEvents.filter(event => {
      const categoryMatch = selectedCategory === 'Tous' || event.category === selectedCategory;
      const searchMatch = event.name.toLowerCase().includes(searchTerm.toLowerCase());

      const eventDateStr = event.date.split(' - ')[0];
      // We assume a format like "Month Day, Year". This is brittle.
      // e.g., "October 26, 2024" or "Tout le mois de Novembre"
      // We will try to parse it, but if it fails, we assume it's a match to not hide it.
      let dateMatch = true;
      try {
        // Attempt to parse dates like "October 26, 2024"
        const eventDate = parse(eventDateStr, 'MMMM d, yyyy', new Date());

        if (!isNaN(eventDate.getTime())) { // Check if parsing was successful
            if (timeFilter === 'avenir') {
                dateMatch = isFuture(eventDate) || event.date.toLowerCase().includes('tout le mois');
            } else if (timeFilter === 'passes') {
                dateMatch = isPast(eventDate);
            }
        }
      } catch (error) {
        // If parsing fails (e.g., "Tout le mois de Novembre"), include it in all time filters
        // to be safe. A more robust solution would be needed for production.
      }


      return categoryMatch && searchMatch && dateMatch;
    });
  }, [selectedCategory, allEvents, searchTerm, timeFilter]);

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      {!isDashboard && <Header />}
      <main className={isDashboard ? "" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"}>
        
        <div className="space-y-12">
          {!isDashboard && (
            <>
              <div className="my-8">
                <ImageMosaic />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-8">
                <PersonalizedSuggestions />
                <SuggestedEventsPreview />
                <FeaturedEvents />
              </div>
               <div className="my-8">
                <Suggestions />
              </div>
               <div className="my-8">
                <Partners />
              </div>
            </>
          )}
          
          {isDashboard && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                  <div className="relative w-full md:max-w-sm">
                      <Input 
                          placeholder="Rechercher une sortie..." 
                          className="pl-10"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex items-center gap-2 p-1 bg-muted rounded-md">
                      <Button variant={timeFilter === 'tous' ? 'default' : 'ghost'} size="sm" onClick={() => setTimeFilter('tous')}>Toutes</Button>
                      <Button variant={timeFilter === 'avenir' ? 'default' : 'ghost'} size="sm" onClick={() => setTimeFilter('avenir')}>À venir</Button>
                      <Button variant={timeFilter === 'passes' ? 'default' : 'ghost'} size="sm" onClick={() => setTimeFilter('passes')}>Passées</Button>
                  </div>
              </div>

              <CategoryFilters 
                categories={['Tous', ...categories]} 
                selectedCategory={selectedCategory} 
                onSelectCategory={setSelectedCategory} 
              />
              <EventList events={filteredEvents} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
