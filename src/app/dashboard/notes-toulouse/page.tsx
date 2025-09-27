
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { StickyNote, Search, MessageSquare, PlusCircle, Flag, MapPin } from 'lucide-react';
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
    description: "Rien de tel qu'une balade à vélo ou à pied le long du Canal du Midi pour s'échapper de la ville. C'est plat, accessible à tous et les paysages sont toujours magnifiques, peu importe la saison.",
    replies: []
  },
];


export default function NotesToulousePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [notes, setNotes] = useState(sampleNotes);
  const { toast } = useToast();

  const filteredNotes = useMemo(() => 
    notes.filter(note => 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.author.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), // This date sort is illustrative
    [notes, searchTerm]
  );

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
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-headline font-bold text-primary flex items-center gap-3">
          <StickyNote className="w-8 h-8" />
          Notes sur Toulouse et sa banlieue
        </h1>
        <p className="text-muted-foreground mt-2">
          Partagez vos bons plans, vos découvertes ou posez vos questions sur la vie à Toulouse.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full max-w-sm">
            <Input 
            placeholder="Chercher par mot-clé..." 
            className="pl-10" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
        <Button asChild>
          <Link href="/dashboard/notes-toulouse/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Publier une note
          </Link>
        </Button>
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
               {note.address && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{note.address}</span>
                </div>
              )}
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
