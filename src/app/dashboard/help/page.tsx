
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LifeBuoy } from 'lucide-react';
import { useState } from 'react';

// Sample data for FAQs. In a real app, this would be fetched from a database
// and managed in a global state or via API calls.
const initialFaqs = [
  { 
    id: 'faq1', 
    question: 'Comment puis-je créer une sortie ?', 
    answer: 'Pour créer une sortie, allez dans la section "Mes sorties" et cliquez sur le bouton "Créer une sortie". Remplissez ensuite les détails de votre événement et publiez-le.' 
  },
  { 
    id: 'faq2', 
    question: 'Comment puis-je me connecter avec un autre membre ?', 
    answer: 'Rendez-vous sur la page "Membres", trouvez la personne avec qui vous souhaitez vous connecter, et cliquez sur le bouton "Se connecter" sur sa carte de profil pour envoyer une demande.' 
  },
  { 
    id: 'faq3', 
    question: 'Que faire si je vois un contenu inapproprié ?', 
    answer: 'Vous pouvez signaler tout contenu (membre, message, sortie, note) qui vous semble inapproprié via l\'icône de drapeau ou le bouton de signalement. Nos modérateurs examineront le signalement et prendront les mesures nécessaires.' 
  },
  { 
    id: 'faq4', 
    question: 'Comment puis-je modifier mon profil ?', 
    answer: 'Vous pouvez mettre à jour toutes vos informations personnelles, vos préférences et vos centres d\'intérêt depuis la page "Mon Profil". N\'oubliez pas de sauvegarder vos modifications.' 
  },
  { 
    id: 'faq5', 
    question: 'Quels sont les différents rôles sur le site ?', 
    answer: 'Il y a trois rôles : Membre, Modérateur et Administrateur. Les Modérateurs aident à gérer les contenus signalés. Les Administrateurs ont des droits supplémentaires, comme la gestion des rôles des autres utilisateurs.' 
  },
];


export default function HelpPage() {
  // In a real application, this state would be shared with the Administration page
  // or fetched from a persistent data source.
  const [faqs, setFaqs] = useState(initialFaqs);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-primary flex items-center gap-3">
          <LifeBuoy className="w-8 h-8" />
          Aide & FAQ
        </h1>
        <p className="text-muted-foreground mt-2">
          Trouvez les réponses à vos questions les plus fréquentes.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Foire Aux Questions</CardTitle>
          <CardDescription>
            Cliquez sur une question pour voir la réponse.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {faqs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                <AccordionItem value={faq.id} key={faq.id}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-center text-muted-foreground p-8">Aucune question dans la FAQ pour le moment.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
