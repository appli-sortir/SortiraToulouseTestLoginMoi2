
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Megaphone, PlusCircle, Calendar, MapPin, Flag, Search } from 'lucide-react';
import { MapView } from '@/components/map-view';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Link from 'next/link';


type SuggestedEvent = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  locationName: string;
  location: {
    lat: number;
    lng: number;
  };
  author: string;
}

const sampleSuggestedEvents: SuggestedEvent[] = [
  {
    id: 'sugg1',
    title: 'Festival des Lanternes',
    description: "Un événement féerique qui illumine le parc du Ritouret à Blagnac. Des centaines de lanternes géantes créent un spectacle de lumière incroyable. Idéal pour une sortie en famille ou entre amis.",
    startDate: '1 décembre 2024',
    endDate: '2 février 2025',
    locationName: 'Parc du Ritouret, Blagnac',
    location: { lat: 43.649, lng: 1.385 },
    author: 'Alex_Rando'
  },
  {
    id: 'sugg2',
    title: 'Marché de Noël de la Place du Capitole',
    description: "Le traditionnel marché de Noël avec ses chalets en bois, ses odeurs de vin chaud et ses idées cadeaux artisanales. Incontournable pour se mettre dans l'ambiance des fêtes.",
    startDate: '22 novembre 2024',
    endDate: '26 décembre 2024',
    locationName: 'Place du Capitole, Toulouse',
    location: { lat: 43.604, lng: 1.444 },
    author: 'Juliette_Ciné'
  },
  {
    id: 'sugg3',
    title: 'Toulouse les Orgues',
    description: "Festival international qui met en valeur le patrimoine exceptionnel des orgues de Toulouse et de sa région. Concerts, visites, et rencontres avec des artistes.",
    startDate: '3 octobre 2024',
    endDate: '13 octobre 2024',
    locationName: 'Divers lieux à Toulouse',
    location: { lat: 43.600, lng: 1.440 },
    author: 'Marco_Musique'
  }
];

export default function SuggestedEventsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const filteredEvents = sampleSuggestedEvents.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReport = (eventId: string, eventTitle: string) => {
    // In a real app, this would send a report to the backend.
    console.log(`Reporting event ${eventId}: "${eventTitle}"`);
    toast({
      title: 'Événement signalé',
      description: 'Merci pour votre aide. Nos modérateurs vont examiner ce signalement.',
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-primary flex items-center gap-3">
          <Megaphone className="w-8 h-8" />
          Événements suggérés par la communauté
        </h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          Découvrez les événements proposés par d'autres membres. Après vérification par un modérateur, ils pourront être ajoutés à la liste principale.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full max-w-sm">
            <Input 
              placeholder="Chercher un événement..." 
              className="pl-10" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
        <Button asChild>
          <Link href="/dashboard/suggested-events/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Suggérer un événement
          </Link>
        </Button>
      </div>

      <div className="space-y-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden">
             <CardHeader>
               <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-xl font-bold text-primary/90">{event.title}</CardTitle>
                  <CardDescription>Suggéré par {event.author}</CardDescription>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                      <Flag className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Signaler cet événement ?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Êtes-vous sûr de vouloir signaler cet événement ? Un modérateur examinera votre demande.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleReport(event.id, event.title)}>Confirmer</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-foreground/90 leading-relaxed">{event.description}</p>
                <Separator/>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">
                          Du {event.startDate} {event.endDate && `au ${event.endDate}`}
                      </span>
                  </div>
                   <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{event.locationName}</span>
                  </div>
                </div>
              </div>
               <MapView location={event.location} />
            </CardContent>
          </Card>
        ))}
         {filteredEvents.length === 0 && (
            <div className="text-center py-16 border-2 border-dashed border-primary/20 rounded-lg">
                <p className="text-muted-foreground">Aucun événement suggéré ne correspond à votre recherche.</p>
            </div>
        )}
      </div>
    </div>
  );
}
