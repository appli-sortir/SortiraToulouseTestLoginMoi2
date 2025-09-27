

'use client';

import Image from 'next/image';
import { events } from '@/lib/events';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, MapPin, Ticket, ArrowLeft, Users, UserPlus, UserX, Clock, Check, Hourglass, Trash2, MessageSquare, Flag, Star, Send } from 'lucide-react';
import { MapView } from '@/components/map-view';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { isPast, parse } from 'date-fns';
import { cn } from '@/lib/utils';


interface EventPageProps {
  params: {
    id: string;
  };
}

// Sample data for participants. In a real app, this would be fetched from a database.
const sampleParticipants = [
  { id: '1', name: 'Alex', avatarFallback: 'A', isOrganizer: true },
  { id: '2', name: 'Juliette', avatarFallback: 'J', isOrganizer: false },
  { id: '3', name: 'Marco', avatarFallback: 'M', isOrganizer: false },
];

const sampleWaitingList = [
    { id: '4', name: 'Sophie', avatarFallback: 'S' },
    { id: '5', name: 'Tom', avatarFallback: 'T' },
];

type Reply = {
  id: string;
  author: string;
  avatarFallback: string;
  content: string;
  date: string;
};

type Comment = {
  id: string;
  author: string;
  avatarFallback: string;
  content: string;
  date: string;
  replies: Reply[];
};

const sampleComments: Comment[] = [
    {
        id: 'comment1',
        author: 'Juliette_Ciné',
        avatarFallback: 'JC',
        date: 'Il y a 3 jours',
        content: "J'ai hâte ! C'est mon groupe de jazz préféré. Est-ce que quelqu'un part du centre-ville pour un covoiturage ?",
        replies: [
            { id: 'reply1', author: 'Marco_Musique', avatarFallback: 'MM', date: 'Il y a 2 jours', content: "Moi je pars de Jean Jaurès si ça t'intéresse !" },
        ]
    },
    {
        id: 'comment2',
        author: 'Alex_Rando',
        avatarFallback: 'AR',
        date: 'Il y a 1 jour',
        content: "Le concert commence à 20h pile ou les portes ouvrent à 20h ? Merci !",
        replies: []
    }
];

const StarRating = ({ rating, setRating }: { rating: number, setRating: (rating: number) => void }) => {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={cn(
                        "w-5 h-5 cursor-pointer",
                        rating >= star ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                    )}
                    onClick={() => setRating(star)}
                />
            ))}
        </div>
    );
};


export default function EventPage({ params }: EventPageProps) {
  const event = events.find((e) => e.id === params.id);
  const { toast } = useToast();

  const [participants, setParticipants] = useState(sampleParticipants);
  const [waitingList, setWaitingList] = useState(sampleWaitingList);
  const [comments, setComments] = useState<Comment[]>(sampleComments);
  const [userStatus, setUserStatus] = useState<'none' | 'registered' | 'waiting'>('registered');

  const [eventRating, setEventRating] = useState(0);
  const [organizerRating, setOrganizerRating] = useState(0);
  const [participantRatings, setParticipantRatings] = useState<{[key: string]: { rating: number, comment: string }}>({});
  
  // This would come from the user's session in a real app
  const currentUser = { id: 'currentUser', name: 'Sophie_Sport', role: 'Administrateur', isOrganizer: false };

  if (!event) {
    notFound();
  }
  
  const isEventPast = useMemo(() => {
    // A simple simulation. In a real app, use a robust date-parsing library.
    // Making 'Concert de Jazz' always in the past for demonstration
    if (event.id === '1') return true; 
    try {
      const eventDate = parse(event.date.split(' - ')[0], 'MMMM d, yyyy', new Date());
      return isPast(eventDate);
    } catch {
      return false;
    }
  }, [event.date, event.id]);


  const organizer = participants.find(p => p.isOrganizer);
  const isCurrentUserOrganizer = organizer?.name === currentUser.name; // Simplified logic
  const isCurrentUserParticipant = userStatus === 'registered';

  const maxCapacity = 15;
  const isFull = participants.length >= maxCapacity;
  const canManage = currentUser.role === 'Administrateur' || currentUser.role === 'Modérateur' || isCurrentUserOrganizer;

  const handleRegister = () => {
    if (!isFull) {
      setUserStatus('registered');
      toast({ title: 'Inscription réussie !', description: `Vous êtes inscrit à "${event.name}".` });
    } else {
      setUserStatus('waiting');
      toast({ title: 'Vous êtes en liste d\'attente', description: 'Nous vous préviendrons si une place se libère.' });
    }
  };

  const handleUnregister = () => {
    const previousStatus = userStatus;
    setUserStatus('none');
    if (previousStatus === 'registered') {
        toast({ title: 'Désinscription confirmée', description: `Vous n'êtes plus inscrit à "${event.name}".` });
    } else if (previousStatus === 'waiting') {
        toast({ title: 'Sortie de la liste d\'attente', description: `Vous n'êtes plus sur la liste d'attente pour "${event.name}".` });
    }
  };

   const removeParticipant = (participantId: string) => {
    setParticipants(prev => prev.filter(p => p.id !== participantId));
    toast({ title: 'Participant retiré', description: 'Le participant a bien été désinscrit.' });
  };

  const approveFromWaitingList = (userId: string) => {
    const userToApprove = waitingList.find(u => u.id === userId);
    if (userToApprove && !isFull) {
        setWaitingList(prev => prev.filter(u => u.id !== userId));
        setParticipants(prev => [...prev, {...userToApprove, isOrganizer: false}]);
        toast({ title: 'Participant approuvé', description: `${userToApprove.name} a été ajouté à la liste des participants.` });
    } else {
        toast({ variant: 'destructive', title: 'Action impossible', description: 'La sortie est complète. Libérez une place avant d\'approuver.'});
    }
  };

  const handleCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const textarea = form.querySelector<HTMLTextAreaElement>('textarea[name="comment"]');
    if (textarea && textarea.value) {
      const newComment: Comment = {
        id: `comment${Date.now()}`,
        author: 'Vous',
        avatarFallback: 'V',
        content: textarea.value,
        date: 'À l\'instant',
        replies: [],
      };
      setComments(prevComments => [newComment, ...prevComments]);
      textarea.value = '';
    }
  };
  
  const handleReplySubmit = (commentId: string, event: React.FormEvent<HTMLFormElement>) => {
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
          setComments(prevComments =>
              prevComments.map(comment =>
                  comment.id === commentId ? { ...comment, replies: [...comment.replies, newReply] } : comment
              )
          );
          input.value = '';
      }
  };

  const handleReport = (contentId: string, contentType: 'comment' | 'reply') => {
    toast({
      title: 'Contenu signalé',
      description: 'Merci. Nos modérateurs vont examiner ce contenu.',
    });
  };

  const handleRatingSubmit = () => {
    // In a real app, this would send the data to the backend.
    console.log({ eventRating, organizerRating });
    toast({
        title: 'Évaluation enregistrée',
        description: "Merci pour votre retour !",
    });
  };

  const handleParticipantRatingSubmit = (participantId: string) => {
    console.log(`Rating for ${participantId}:`, participantRatings[participantId]);
     toast({
        title: `Évaluation pour ${participants.find(p => p.id === participantId)?.name} enregistrée`,
        description: "L'évaluation a été transmise aux modérateurs.",
    });
  }


  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <Link href="/dashboard/all-events" className="inline-flex items-center gap-2 text-primary hover:underline mb-6 font-semibold">
          <ArrowLeft className="w-4 h-4" />
          Retour à toutes les sorties
        </Link>
        <div className="bg-card rounded-xl overflow-hidden shadow-lg border border-primary/10">
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={event.image}
              alt={event.name}
              fill
              className="object-cover"
              sizes="100vw"
              priority
              data-ai-hint="event photo"
            />
          </div>
          <div className="p-6 md:p-8 space-y-8">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {event.category}
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">
                    {event.name}
                  </h1>
                </div>
                 <div className="mt-4 sm:mt-0 sm:ml-4 shrink-0 space-x-2">
                   {userStatus === 'none' && (
                     <Button onClick={handleRegister}>
                       <UserPlus className="mr-2 h-4 w-4" />
                       {isFull ? 'Rejoindre la liste d\'attente' : 'S\'inscrire'}
                     </Button>
                   )}
                   {(userStatus === 'registered' || userStatus === 'waiting') && (
                     <Button variant="outline" onClick={handleUnregister}>
                       <UserX className="mr-2 h-4 w-4" />
                        {userStatus === 'registered' ? 'Se désinscrire' : 'Quitter la liste d\'attente'}
                     </Button>
                   )}
                   {event.ticketsUrl && (
                      <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                        <a href={event.ticketsUrl} target="_blank" rel="noopener noreferrer">
                          <Ticket className="mr-2 h-4 w-4" />
                          Acheter des billets
                        </a>
                      </Button>
                    )}
                 </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-muted-foreground mb-6">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-3 text-primary/70" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-primary/70" />
                  <span>{event.address}</span>
                </div>
                 <div className="flex items-center">
                  <Users className="w-5 h-5 mr-3 text-primary/70" />
                  <span>{participants.length} / {maxCapacity} participants</span>
                </div>
              </div>
            </div>
            
            <Separator />

            <div>
              <h2 className="text-2xl font-headline font-bold text-primary mb-4">À propos de cette sortie</h2>
              <div className="max-w-none text-foreground/90 leading-relaxed space-y-4">
                <p>{event.longDescription}</p>
              </div>
            </div>

            <Separator />
            
             <div>
                <h2 className="text-2xl font-headline font-bold text-primary mb-4">Participants ({participants.length})</h2>
                {participants.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {participants.map(p => (
                            <Card key={p.id} className="flex items-center justify-between p-3">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarFallback>{p.avatarFallback}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium">{p.name}</span>
                                    {p.isOrganizer && <Badge variant="outline">Orga.</Badge>}
                                </div>
                                {canManage && !p.isOrganizer && (
                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeParticipant(p.id)}>
                                        <UserX className="w-4 h-4 text-destructive" />
                                    </Button>
                                )}
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground">Personne n'est encore inscrit. Soyez le premier !</p>
                )}
             </div>

            {canManage && waitingList.length > 0 && (
              <>
                <Separator />
                 <div>
                    <h2 className="text-2xl font-headline font-bold text-primary mb-4">Liste d'attente ({waitingList.length})</h2>
                     <div className="space-y-3">
                        {waitingList.map(u => (
                            <Card key={u.id} className="flex items-center justify-between p-3 bg-muted/50">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarFallback>{u.avatarFallback}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium">{u.name}</span>
                                </div>
                                <div className="space-x-2">
                                     <Button variant="ghost" size="sm" onClick={() => approveFromWaitingList(u.id)} disabled={isFull}>
                                        <Check className="w-4 h-4 mr-2 text-green-500"/>
                                        Approuver
                                    </Button>
                                     <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => {}}>
                                        <Trash2 className="w-4 h-4 text-destructive" />
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
              </>
            )}


            <Separator />
            
            <div>
              <h2 className="text-2xl font-headline font-bold text-primary mb-4">Commentaires ({comments.length})</h2>
               <Card className="bg-muted/30 p-4">
                    <form onSubmit={handleCommentSubmit} className="flex flex-col gap-4">
                        <Textarea name="comment" placeholder="Ajoutez un commentaire public..." rows={3} />
                        <Button type="submit" className="self-end">
                            Commenter
                        </Button>
                    </form>
                    <Separator className="my-6" />
                     <div className="space-y-6">
                        {comments.map(comment => (
                            <div key={comment.id} className="flex items-start gap-3">
                                <Avatar className="h-9 w-9">
                                    <AvatarFallback>{comment.avatarFallback}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-4">
                                    <div className="bg-background p-3 rounded-md border">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                                <span className="font-semibold text-foreground">{comment.author}</span>
                                                <span>•</span>
                                                <span>{comment.date}</span>
                                            </div>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-6 w-6"><Flag className="w-3 h-3 text-muted-foreground" /></Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Signaler ce commentaire ?</AlertDialogTitle>
                                                        <AlertDialogDescription>Le signalement sera examiné par un modérateur.</AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleReport(comment.id, 'comment')}>Confirmer</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                        <p>{comment.content}</p>
                                    </div>

                                    {/* Replies */}
                                    <div className="space-y-4 pl-8 border-l-2 border-dashed">
                                        {comment.replies.map(reply => (
                                            <div key={reply.id} className="flex items-start gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback>{reply.avatarFallback}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 bg-background p-3 rounded-md border">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                                                            <span className="font-semibold text-foreground">{reply.author}</span>
                                                            <span>•</span>
                                                            <span>{reply.date}</span>
                                                        </div>
                                                         <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="h-6 w-6"><Flag className="w-3 h-3 text-muted-foreground" /></Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Signaler cette réponse ?</AlertDialogTitle>
                                                                    <AlertDialogDescription>Le signalement sera examiné par un modérateur.</AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                                                                    <AlertDialogAction onClick={() => handleReport(reply.id, 'reply')}>Confirmer</AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </div>
                                                    <p className="text-sm">{reply.content}</p>
                                                </div>
                                            </div>
                                        ))}
                                         <form className="flex items-center gap-3 pt-2" onSubmit={(e) => handleReplySubmit(comment.id, e)}>
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback>V</AvatarFallback>
                                            </Avatar>
                                            <Input name="reply" placeholder="Répondre..." className="flex-grow" />
                                            <Button type="submit" size="sm">Répondre</Button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {isEventPast && (
                <>
                    <Separator />
                    <div>
                        <h2 className="text-2xl font-headline font-bold text-primary mb-4">Évaluations post-sortie</h2>
                        <Card className="bg-muted/30 p-6">
                            {isCurrentUserParticipant && !isCurrentUserOrganizer && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold">Évaluer la sortie</h3>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Note pour l'événement</Label>
                                            <StarRating rating={eventRating} setRating={setEventRating} />
                                        </div>
                                        {organizer && (
                                          <div className="space-y-2">
                                              <Label>Note pour l'organisateur ({organizer.name})</Label>
                                              <StarRating rating={organizerRating} setRating={setOrganizerRating} />
                                          </div>
                                        )}
                                        <div className="space-y-2">
                                            <Label>Commentaire (privé, visible uniquement par les modérateurs)</Label>
                                            <Textarea placeholder="Votre retour est précieux..." />
                                        </div>
                                    </div>
                                    <Button onClick={handleRatingSubmit}><Send className="mr-2 h-4 w-4" /> Envoyer mon évaluation</Button>
                                </div>
                            )}

                            {isCurrentUserOrganizer && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold">Évaluer les participants</h3>
                                    <p className="text-sm text-muted-foreground">Ces notes ne seront visibles que par les modérateurs et administrateurs.</p>
                                    <div className="space-y-4">
                                      {participants.filter(p => !p.isOrganizer).map(participant => (
                                        <Card key={participant.id} className="p-4 bg-background">
                                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                            <div className="flex items-center gap-3">
                                              <Avatar><AvatarFallback>{participant.avatarFallback}</AvatarFallback></Avatar>
                                              <span className="font-semibold">{participant.name}</span>
                                            </div>
                                            <div className="flex-grow space-y-2">
                                                <StarRating 
                                                    rating={participantRatings[participant.id]?.rating || 0} 
                                                    setRating={(rating) => setParticipantRatings(prev => ({...prev, [participant.id]: {...prev[participant.id], rating}}))}
                                                />
                                                <Textarea 
                                                    placeholder="Ajouter un commentaire privé..." 
                                                    className="text-sm"
                                                    value={participantRatings[participant.id]?.comment || ''}
                                                    onChange={(e) => setParticipantRatings(prev => ({...prev, [participant.id]: {...prev[participant.id], comment: e.target.value}}))}
                                                />
                                            </div>
                                             <Button size="sm" onClick={() => handleParticipantRatingSubmit(participant.id)}>Envoyer</Button>
                                          </div>
                                        </Card>
                                      ))}
                                    </div>
                                </div>
                            )}
                        </Card>
                    </div>
                </>
            )}

            <Separator />

            <div>
              <h2 className="text-2xl font-headline font-bold text-primary mb-4">Lieu</h2>
              <MapView location={event.location} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
