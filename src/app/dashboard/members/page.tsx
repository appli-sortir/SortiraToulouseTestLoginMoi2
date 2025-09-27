'use client';

import { useEffect, useState, useMemo } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { UserPlus, ShieldCheck, Heart, Briefcase, UserCheck, Clock, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

type ConnectionStatus = 'not_connected' | 'request_sent' | 'connected';

interface Member {
  id: string;
  identifiant: string;
  email?: string;
  description?: string;
  interests?: string[];
  status?: {
    accueillant?: boolean;
    cherche_emploi?: boolean;
  };
  role: 'Administrateur' | 'Modérateur' | 'Membre';
  connectionStatus: ConnectionStatus;
}

const roleColors: { [key: string]: string } = {
  Administrateur: 'border-red-500/50 bg-red-500/10 text-red-700',
  Modérateur: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-700',
  Membre: 'border-gray-500/50 bg-gray-500/10 text-gray-700',
};

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [members, setMembers] = useState<Member[]>([]);
  const { toast } = useToast();

  // Charger les membres Firestore
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'identifiant'));
        const usersData: Member[] = querySnapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            identifiant: data.identifiant || 'Inconnu',
            description: data.description || '',
            interests: data.interests || [],
            status: {
              accueillant: data.accueillant || false,
              cherche_emploi: data.cherche_emploi || false,
            },
            role: data.role || 'Membre',
            connectionStatus: 'not_connected', // par défaut
          };
        });
        setMembers(usersData);
      } catch (error) {
        console.error('Erreur Firestore:', error);
        toast({ title: 'Erreur', description: 'Impossible de charger les membres.' });
      }
    };

    fetchMembers();
  }, [toast]);

  // Gérer les connexions
  const handleConnection = (memberId: string) => {
    setMembers((prev) =>
      prev.map((member) => {
        if (member.id === memberId) {
          let newStatus: ConnectionStatus = member.connectionStatus;
          switch (member.connectionStatus) {
            case 'not_connected':
              newStatus = 'request_sent';
              toast({
                title: 'Demande envoyée',
                description: `Votre demande de connexion à ${member.identifiant} a été envoyée.`,
              });
              break;
            case 'request_sent':
              newStatus = 'not_connected';
              toast({
                title: 'Demande annulée',
                description: `Votre demande à ${member.identifiant} a été annulée.`,
              });
              break;
            case 'connected':
              newStatus = 'not_connected';
              toast({
                variant: 'destructive',
                title: 'Déconnecté',
                description: `Vous n'êtes plus connecté à ${member.identifiant}.`,
              });
              break;
          }
          return { ...member, connectionStatus: newStatus };
        }
        return member;
      })
    );
  };

  // Filtrage recherche
  const filteredMembers = useMemo(
    () => members.filter((m) => m.identifiant.toLowerCase().includes(searchTerm.toLowerCase())),
    [members, searchTerm]
  );

  const getButtonContent = (status: ConnectionStatus) => {
    switch (status) {
      case 'not_connected':
        return (
          <>
            <UserPlus className="mr-2 h-4 w-4" /> Se connecter
          </>
        );
      case 'request_sent':
        return (
          <>
            <Clock className="mr-2 h-4 w-4" /> Demande envoyée
          </>
        );
      case 'connected':
        return (
          <>
            <UserCheck className="mr-2 h-4 w-4" /> Connecté
          </>
        );
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-primary">Membres de la communauté</h1>
        <p className="text-muted-foreground mt-2">
          Découvrez les profils et envoyez des demandes de connexion pour discuter.
        </p>
      </div>

      <div className="relative w-full max-w-sm">
        <Input
          placeholder="Rechercher un membre..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMembers.map((member) => (
          <Card
            key={member.id}
            className="flex flex-col h-full overflow-hidden border-primary/10 hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader className="flex flex-row items-center gap-4 p-4 bg-card/50">
              <Avatar className="h-16 w-16 text-xl">
                <AvatarFallback>{member.identifiant.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="font-headline text-xl text-primary">{member.identifiant}</CardTitle>
                <Badge
                  variant="secondary"
                  className={`flex items-center gap-1 mt-1 ${roleColors[member.role]}`}
                >
                  <ShieldCheck className="w-3 h-3" />
                  {member.role}
                </Badge>
                <div className="flex items-center flex-wrap gap-2 mt-2">
                  {member.status?.accueillant && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1 border-green-500/50 bg-green-500/10 text-green-700"
                    >
                      <Heart className="w-3 h-3" />
                      Accueillant
                    </Badge>
                  )}
                  {member.status?.cherche_emploi && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1 border-blue-500/50 bg-blue-500/10 text-blue-700"
                    >
                      <Briefcase className="w-3 h-3" />
                      Cherche emploi
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 flex-grow flex flex-col">
              <p className="text-muted-foreground text-sm mb-4 flex-grow">{member.description}</p>
              {member.interests && member.interests.length > 0 && (
                <div>
                  <h4 className="font-semibold text-sm mb-2 text-primary/80">Centres d'intérêt :</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.interests.map((interest) => (
                      <Badge key={interest} variant="outline" className="font-normal">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="p-4 pt-0 mt-auto">
              <Button
                className="w-full"
                onClick={() => handleConnection(member.id)}
                variant={member.connectionStatus === 'not_connected' ? 'default' : 'secondary'}
              >
                {getButtonContent(member.connectionStatus)}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-16 border-2 border-dashed border-primary/20 rounded-lg">
          <p className="text-muted-foreground">Aucun membre trouvé.</p>
        </div>
      )}
    </div>
  );
}
