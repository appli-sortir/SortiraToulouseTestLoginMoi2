
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, PenSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

// Sample data for conversations. In a real application, this would come from a database.
const sampleConversations = [
  {
    id: '1',
    sender: 'Juliette_Ciné',
    avatarFallback: 'JC',
    lastMessage: "Salut ! Partante pour le ciné de demain soir ? J'ai vu qu'ils passaient le dernier film de...",
    timestamp: '10:42',
    unread: 2,
  },
  {
    id: '2',
    sender: 'Alex_Rando',
    avatarFallback: 'AR',
    lastMessage: "La randonnée de dimanche était super ! Il faudra qu'on se refasse ça bientôt. Prochaine fois, on vise le lac d'Oô ?",
    timestamp: 'Hier',
    unread: 0,
  },
  {
    id: '3',
    sender: 'Sophie_Sport',
    avatarFallback: 'SS',
    lastMessage: "Coucou, je n'ai pas pu venir à la séance de yoga. C'était bien ?",
    timestamp: 'Mardi',
    unread: 1,
  },
  {
    id: '4',
    sender: 'Marco_Musique',
    avatarFallback: 'MM',
    lastMessage: "Merci pour le plan pour le concert, c'était incroyable ! On se capte pour un verre ?",
    timestamp: 'Lundi',
    unread: 0,
  },
];


export default function MessagesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-primary">Messagerie</h1>
        <p className="text-muted-foreground mt-2">
          Discutez avec les autres membres de la communauté.
        </p>
      </div>

       <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:max-w-xs">
              <Input placeholder="Rechercher un message..." className="pl-10" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            <Button className="w-full sm:w-auto">
              <PenSquare className="mr-2" />
              Nouveau Message
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y divide-border">
            {sampleConversations.map((convo) => (
              <li key={convo.id}>
                <Link href="#" className="flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors">
                   <Avatar className="h-12 w-12 text-lg">
                      <AvatarFallback>{convo.avatarFallback}</AvatarFallback>
                    </Avatar>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-primary/90">{convo.sender}</h3>
                      <p className="text-xs text-muted-foreground">{convo.timestamp}</p>
                    </div>
                     <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{convo.lastMessage}</p>
                  </div>
                  {convo.unread > 0 && (
                    <div className="flex items-center justify-center h-full">
                        <Badge className="bg-primary text-primary-foreground h-6 w-6 flex items-center justify-center shrink-0">
                            {convo.unread}
                        </Badge>
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

    </div>
  );
}
