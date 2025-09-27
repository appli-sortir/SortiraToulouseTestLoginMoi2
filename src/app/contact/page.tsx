
'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Loader2, Mail, Send, ArrowLeft } from 'lucide-react';
import { Header } from '@/components/header';
import Link from 'next/link';
import Image from 'next/image';

export default function ContactPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    // In a real application, you would handle the form submission here,
    // e.g., by sending an email or saving the message to a database.
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Message envoyé !',
        description: 'Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.',
      });
      (event.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
         <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6 font-semibold">
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>
        <div className="grid md:grid-cols-2 gap-12">
            <Card>
                 <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-3xl font-headline text-primary">
                            <Mail className="w-8 h-8" />
                            Contactez-nous
                        </CardTitle>
                        <CardDescription>
                            Une question, une suggestion ? Remplissez le formulaire ci-dessous.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Votre nom</Label>
                            <Input id="name" name="name" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Votre email</Label>
                            <Input id="email" name="email" type="email" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subject">Sujet</Label>
                            <Input id="subject" name="subject" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" name="message" rows={5} required />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start gap-4">
                        <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Envoi en cours...
                            </>
                        ) : (
                             <>
                                <Send className="mr-2 h-4 w-4" />
                                Envoyer le message
                            </>
                        )}
                        </Button>
                         <p className="text-xs text-muted-foreground">
                            Ou envoyez-nous un e-mail directement à :{' '}
                            <a href="mailto:tolosa-appli@gmail.com" className="text-primary hover:underline">
                                tolosa-appli@gmail.com
                            </a>
                        </p>
                    </CardFooter>
                 </form>
            </Card>
             <div className="relative h-full min-h-[300px] hidden md:block">
                 <Image 
                    src="https://placehold.co/600x800/26282A/FFFFFF?text=Sortir\nà\nToulouse&font=playfair-display" 
                    alt="Image de Toulouse"
                    fill
                    className="object-cover rounded-lg"
                    data-ai-hint="historic building Toulouse"
                  />
            </div>
        </div>
      </div>
    </>
  );
}
