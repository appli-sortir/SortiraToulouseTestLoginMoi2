
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Handshake, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

const partners = [
    {
        name: 'Bilingue 31',
        url: 'http://www.bilingue.fr.nf/'
    },
    {
        name: 'Happy People Toulouse',
        url: 'http://www.happypeople.fr.nf'
    }
];

export function Partners() {
  return (
    <Card className="bg-card/80 border-primary/20 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-4">
            <div className="p-3 bg-green-400/20 rounded-lg">
                <Handshake className="w-6 h-6 text-green-500" />
            </div>
            <div>
                <CardTitle className="font-headline text-2xl text-primary">Nos Partenaires</CardTitle>
                <CardDescription>Découvrez les associations qui nous soutiennent.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partners.map((partner) => (
             <Button asChild key={partner.name} variant="outline" className="h-32 text-2xl font-bold">
                <a href={partner.url} target="_blank" rel="noopener noreferrer">
                    {partner.name}
                    <ExternalLink className="ml-3 h-5 w-5" />
                </a>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
