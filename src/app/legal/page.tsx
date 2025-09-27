import { Header } from '@/components/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileText } from 'lucide-react';
import Link from 'next/link';

export default function LegalPage() {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6 font-semibold">
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-3xl font-headline text-primary">
              <FileText className="w-8 h-8" />
              Mentions Légales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-foreground/90 leading-relaxed">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-primary/90">Contact</h2>
              <p>
                Pour toute question ou demande d'information, vous pouvez nous contacter à l'adresse e-mail suivante :
                <br />
                <a href="mailto:tolosa31@free.fr" className="text-primary hover:underline">tolosa31@free.fr</a>
              </p>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-primary/90">Éditeur du site</h2>
              <p>
                Le site "Sortir à Toulouse" est édité par :
                <br />
                <strong>Association Happy People 31</strong>
                <br />
                13, bd Lascrosses
                <br />
                31000 Toulouse
              </p>
            </div>
             <div className="space-y-2">
              <h2 className="text-xl font-semibold text-primary/90">Hébergement</h2>
              <p>
                Ce site est hébergé par Firebase, un service de Google.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
