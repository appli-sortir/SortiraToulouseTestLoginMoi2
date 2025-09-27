
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Repeat, Search, MessageSquare, PlusCircle, Flag, MapPin, Tag } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


type Reply = {
  id: string;
  author: string;
  avatarFallback: string;
  content: string;
  date: string;
}

type Note = {
  id: string;
  title: string;
  description: string;
  author: string;
  avatarFallback: string;
  date: string;
  theme: string;
  address?: string;
  replies: Reply[];
}

const sampleNotes: Note[] = [
  {
    id: 'note1',
    title: 'Découverte du Jardin Japonais',
    author: 'Alex_Rando',
    avatarFallback: 'AR',
    date: 'Il y a 2 jours',
    theme: 'à visiter',
    address: 'Jardin Japonais Pierre Baudis, 31000 Toulouse',
    description: "Un vrai havre de paix en plein cœur de Toulouse. Idéal pour une balade relaxante le week-end. L'entrée est gratuite et ça vaut vraiment le détour, surtout au printemps avec les cerisiers en fleurs !",
    replies: [
      { id: 'reply1', author: 'Juliette_Ciné', avatarFallback: 'JC', date: 'Il y a 1 jour', content: "J'adore cet endroit ! Parfait pour lire un livre tranquillement." },
      { id: 'reply2', author: 'Sophie_Sport', avatarFallback: 'SS', date: 'Il y a 5 heures', content: "Super suggestion, je ne connaissais pas. J'irai y faire un tour ce week-end." },
    ]
  },
  {
    id: 'note2',
    title: 'Meilleur Cassoulet de la ville ?',
    author: 'Marco_Musique',
    avatarFallback: 'MM',
    date: 'Il y a une semaine',
    theme: 'bon restaurant',
    address: "Restaurant Emile, 13 Place Saint-Georges, 31000 Toulouse",
    description: "Pour tous les amateurs de bonne bouffe, je pense avoir trouvé le meilleur cassoulet chez 'Emile'. C'est un peu cher, mais l'expérience est incroyable. Qui a d'autres adresses à partager ?",
    replies: []
  },
   {
    id: 'note3',
    title: 'Idée de balade le long du canal',
    author: 'Alex_Rando',
    avatarFallback: 'AR',
    date: 'Il y a 3 jours',
    theme: 'randonnée',
    description: "Rien de tel qu'une balade à vélo ou à pied le long du Canal du Midi pour s'échapper de la ville. C'est plat, accessible à tous et les paysages sont toujours magnifiques, peu importe la saison.",
    replies: []
  },
];

const keywordsList = ["à visiter", "à voir", "activité", "aide", "alternance", "animation", "animaux", "artisan", "artiste", "astuces", "atelier", "bar", "bien-être", "bon restaurant", "bons plans", "bricolage", "cadeau", "chanter", "collection", "commerce", "concert", "cours", "couture", "cuisine", "décoration", "déménagement", "dépannage", "disquaire", "emploi", "évènement", "expert", "fête", "fleurs", "formation", "fripes", "garde d'enfant", "informatique", "jardinage", "jouer de la musique", "langues", "lieu calme", "livre", "location", "logement", "manutention", "matériel", "médical", "mode", "moto", "nettoyage", "nuisibles", "photo", "piscine", "prêt", "question", "radio", "randonnée", "réparation", "restaurant", "santé", "service", "Shopping", "solidarité", "spécialiste", "spectacle", "spirituel", "sport", "stage", "températures", "théâtre", "vacances", "vélo", "vidéo", "voiture"];
const keywordsString = keywordsList.join(', ');

export default function ExchangeInToulousePage() {
  const [selectedTheme, setSelectedTheme] = useState('Tous les thèmes');
  const [searchTerm, setSearchTerm] = useState('');
  const [notes, setNotes] = useState(sampleNotes);
  const { toast } = useToast();

  const filteredNotes = useMemo(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    
    return notes.filter(note => {
      const themeMatch = selectedTheme === 'Tous les thèmes' || note.theme === selectedTheme;
      
      const searchMatch = 
        note.title.toLowerCase().includes(lowercasedSearchTerm) ||
        note.description.toLowerCase().includes(lowercasedSearchTerm) ||
        note.author.toLowerCase().includes(lowercasedSearchTerm) ||
        (note.address && note.address.toLowerCase().includes(lowercasedSearchTerm));

      return themeMatch && searchMatch;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // This date sort is illustrative
  }, [notes, selectedTheme, searchTerm]);

  const handleReplySubmit = (noteId: string, event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.querySelector<HTMLInputElement>('input[name="reply"]');
    if (input && input.value) {
      const newReply: Reply = {
        id: `reply${Date.now()}`,
        author: 'Vous',
        avatarFallback: 'V',
        content: input.value,
        date: 'À l\'instant',
      };
      setNotes(prevNotes => 
        prevNotes.map(note => 
          note.id === noteId ? { ...note, replies: [...note.replies, newReply] } : note
        )
      );
      input.value = '';
    }
  };

  const handleReport = (contentId: string, contentType: 'note' | 'reply', content: string) => {
    // In a real app, this would send a report to the backend.
    console.log(`Reporting ${contentType} ${contentId}: "${content}"`);
    toast({
      title: 'Contenu signalé',
      description: 'Merci pour votre aide. Nos modérateurs vont examiner ce contenu.',
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary flex items-center gap-3">
            <Repeat className="w-8 h-8" />
            Échanges sur Toulouse et sa banlieue
          </h1>
          <p className="text-muted-foreground mt-2 max-w-3xl">
            Fait-nous part de tes passions, de tes envies ou tes besoins.
            Demande, consulte, aide, échange à propos de :
          </p>
           <p className="text-xs italic text-muted-foreground mt-2">{keywordsString}.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                    <SelectTrigger className="w-full sm:w-[240px]">
                    <SelectValue placeholder="Filtrer par thème..." />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="Tous les thèmes">Tous les thèmes</SelectItem>
                    {keywordsList.map(keyword => (
                        <SelectItem key={keyword} value={keyword}>
                        {keyword.charAt(0).toUpperCase() + keyword.slice(1)}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <div className="relative w-full sm:w-auto">
                    <Input 
                        placeholder="Chercher par mot-clé..." 
                        className="pl-10 w-full sm:w-[240px]" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
            </div>
            <Button asChild>
                <Link href="/dashboard/exchange-in-toulouse/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                Publier un échange
                </Link>
            </Button>
        </div>
      </div>


      <div className="space-y-6">
        {filteredNotes.map((note) => (
          <Card key={note.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                    <CardTitle className="text-xl font-bold text-primary/90">{note.title}</CardTitle>
                    <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-2">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                                <AvatarFallback>{note.avatarFallback}</AvatarFallback>
                            </Avatar>
                            <span>{note.author}</span>
                        </div>
                        <span>•</span>
                        <span>{note.date}</span>
                    </div>
                </div>
                 <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                      <Flag className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Signaler cette publication ?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Êtes-vous sûr de vouloir signaler cette publication ? Un modérateur examinera votre demande.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleReport(note.id, 'note', note.title)}>Confirmer</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="flex items-center gap-2">
                        <Tag className="w-3 h-3" />
                        {note.theme}
                    </Badge>
                    {note.address && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{note.address}</span>
                        </div>
                    )}
                </div>
              <p className="text-foreground/90 leading-relaxed">{note.description}</p>
            </CardContent>
            <CardFooter className="flex-col items-start gap-4 bg-muted/50 p-4">
               <h4 className="font-semibold text-sm flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Réponses ({note.replies.length})
                </h4>
              <div className="w-full space-y-4">
                {note.replies.map(reply => (
                  <div key={reply.id} className="flex items-start gap-3">
                     <Avatar className="h-8 w-8">
                        <AvatarFallback>{reply.avatarFallback}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 bg-background p-3 rounded-md">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                                <span className="font-semibold text-foreground">{reply.author}</span>
                                <span>•</span>
                                <span>{reply.date}</span>
                            </div>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0">
                                  <Flag className="w-3 h-3 text-muted-foreground" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Signaler cette réponse ?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Êtes-vous sûr de vouloir signaler cette réponse ? Un modérateur examinera votre demande.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleReport(reply.id, 'reply', reply.content)}>Confirmer</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                        </div>
                        <p>{reply.content}</p>
                    </div>
                  </div>
                ))}

                <form className="flex items-center gap-3 pt-2" onSubmit={(e) => handleReplySubmit(note.id, e)}>
                     <Avatar className="h-8 w-8">
                        <AvatarFallback>V</AvatarFallback>
                    </Avatar>
                    <Input name="reply" placeholder="Écrire une réponse..." className="flex-grow" />
                    <Button type="submit" size="sm">Envoyer</Button>
                </form>
              </div>
            </CardFooter>
          </Card>
        ))}

         {filteredNotes.length === 0 && (
            <div className="text-center py-16 border-2 border-dashed border-primary/20 rounded-lg">
                <p className="text-muted-foreground">Aucune publication ne correspond à votre recherche.</p>
            </div>
        )}
      </div>
    </div>
  );
}
