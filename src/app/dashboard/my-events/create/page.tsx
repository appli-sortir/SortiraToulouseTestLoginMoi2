

'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft, Calendar as CalendarIcon, Clock, Users, School, Heart } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categories } from '@/lib/events';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';


export default function CreateEventPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [participants, setParticipants] = useState(10);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    // Simulate a network request
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Sortie créée !',
        description: 'Votre nouvelle sortie a été enregistrée avec succès.',
      });
    }, 1500);
  };

  return (
    <div className="space-y-8">
        <Link href="/dashboard/my-events" className="inline-flex items-center gap-2 text-primary hover:underline font-semibold">
          <ArrowLeft className="w-4 h-4" />
          Retour à mes sorties
        </Link>
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Créer une nouvelle sortie</CardTitle>
              <CardDescription>
                Remplissez les informations ci-dessous pour proposer un nouvel événement à la communauté.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">

              {/* Section Principale */}
              <div className="space-y-4 p-4 border rounded-lg">
                 <h3 className="font-semibold text-lg text-primary">Informations principales</h3>
                 <div className="space-y-2">
                    <Label htmlFor="title">Titre *</Label>
                    <Input id="title" name="title" placeholder="Ex: Pique-nique au Jardin des Plantes" required />
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" placeholder="Décrivez votre sortie, ce que vous allez faire, l'ambiance, etc." rows={5} />
                 </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="category">Catégorie *</Label>
                        <Select name="category" required>
                            <SelectTrigger><SelectValue placeholder="Sélectionnez une catégorie" /></SelectTrigger>
                            <SelectContent>
                                {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label>Photo de présentation</Label>
                        <Input type="file" />
                        <p className="text-xs text-muted-foreground">Une photo par défaut sera utilisée si vous n'en téléchargez pas.</p>
                    </div>
                 </div>
              </div>

               {/* Section Public Cible */}
              <div className="space-y-4 p-4 border rounded-lg">
                 <h3 className="font-semibold text-lg text-primary">Public spécifique (optionnel)</h3>
                 <p className="text-sm text-muted-foreground">Cochez si votre sortie s'adresse à un public particulier. L'accès sera modéré.</p>
                 <div className="flex items-center space-x-2 pt-2">
                    <Checkbox id="girlsOnly" />
                    <Label htmlFor="girlsOnly" className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-pink-500" />
                      Sortie entre filles
                    </Label>
                </div>
                 <div className="flex items-center space-x-2">
                    <Checkbox id="studentsOnly" />
                    <Label htmlFor="studentsOnly" className="flex items-center gap-2">
                       <School className="w-4 h-4 text-blue-500" />
                       Sortie étudiante
                    </Label>
                </div>
              </div>


               {/* Section Date & Heure */}
              <div className="space-y-4 p-4 border rounded-lg">
                 <h3 className="font-semibold text-lg text-primary">Date & Heure</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>Date de l'événement *</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Choisissez une date</span>}
                            </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                            </PopoverContent>
                        </Popover>
                    </div>
                     <div className="space-y-2">
                         <Label htmlFor="time">Heure de début *</Label>
                         <Input id="time" name="time" type="time" required />
                     </div>
                      <div className="space-y-2">
                         <Label htmlFor="duration">Durée (optionnel)</Label>
                         <Input id="duration" name="duration" placeholder="Ex: 2h30, toute la soirée..." />
                     </div>
                 </div>
              </div>
              
              {/* Section Lieu */}
               <div className="space-y-4 p-4 border rounded-lg">
                 <h3 className="font-semibold text-lg text-primary">Lieu</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <Label htmlFor="venueName">Nom du lieu</Label>
                        <Input id="venueName" name="venueName" placeholder="Ex: Le Bikini, Jardin des Plantes..."/>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="address">Adresse du RDV *</Label>
                        <Input id="address" name="address" placeholder="Entrez l'adresse complète" required/>
                    </div>
                 </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox id="visio" />
                    <Label htmlFor="visio">Cet événement est (aussi) en visio</Label>
                </div>
                 <div className="flex items-center space-x-2">
                    <Checkbox id="hybrid" />
                    <Label htmlFor="hybrid">Cet événement est hybride (présentiel et visio)</Label>
                </div>
              </div>

               {/* Section Participants */}
              <div className="space-y-4 p-4 border rounded-lg">
                 <h3 className="font-semibold text-lg text-primary">Participants & Inscriptions</h3>
                 <div className="space-y-4">
                    <Label htmlFor="participants">Nombre de participants (1-100)</Label>
                    <div className="flex items-center gap-4">
                        <Slider
                            id="participants"
                            min={1} max={100} step={1}
                            value={[participants]}
                            onValueChange={(value) => setParticipants(value[0])}
                        />
                        <span className="font-bold text-lg text-primary w-12 text-center">{participants}</span>
                    </div>
                 </div>

                 <div className="flex items-center space-x-2 pt-2">
                    <Checkbox id="allowGuests" />
                    <Label htmlFor="allowGuests">Les participants peuvent amener des invités</Label>
                </div>
                
                 <div className="flex items-center space-x-2 pt-2">
                    <Checkbox id="enableWaitingList" defaultChecked/>
                    <Label htmlFor="enableWaitingList">Activer la liste d'attente quand la sortie est complète</Label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="space-y-2">
                        <Label>Date d'ouverture des inscriptions</Label>
                        <Input type="date" />
                    </div>
                    <div className="space-y-2">
                        <Label>Date de clôture des inscriptions</Label>
                         <Input type="date" />
                    </div>
                </div>

                 <div className="flex items-center space-x-2 pt-4">
                    <Checkbox id="isFree" />
                    <Label htmlFor="isFree">Cet événement est gratuit</Label>
                </div>
              </div>


            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} size="lg">
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    <span>Création en cours...</span>
                  </>
                ) : (
                  'Publier la sortie'
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
    </div>
  );
}
