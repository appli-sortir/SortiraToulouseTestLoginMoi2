
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Users, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';

const sampleMembers = [
  { id: '1', name: 'Alex' },
  { id: '2', name: 'Sam' },
  { id: '3', name: 'Chris' },
];

export function MembersPreview() {
  return (
    <Card className="bg-card/80 border-primary/20 shadow-sm flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-400/20 rounded-lg">
                <Users className="w-6 h-6 text-blue-500" />
            </div>
            <div>
                <CardTitle className="font-headline text-2xl text-primary">Membres</CardTitle>
                <CardDescription>Rencontrez la communauté.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-4">
          <ul className="bg-background/50 p-4 rounded-md border border-input space-y-4">
            {sampleMembers.map((member) => (
              <li key={member.id} className="flex items-center gap-3">
                 <Avatar className="h-9 w-9">
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="font-semibold">{member.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
       <CardFooter>
        <Button asChild variant="ghost" className="w-full">
          <Link href="/dashboard/members">
            <span>Voir tous les membres</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
