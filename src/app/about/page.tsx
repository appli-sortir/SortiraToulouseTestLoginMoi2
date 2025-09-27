import { Header } from '@/components/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Info } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
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
              <Info className="w-8 h-8" />
              À propos de Sortir à Toulouse
            </CardTitle>
            <CardDescription>Notre mission : connecter les gens et animer la ville.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/90 leading-relaxed">
            <p>
              "Sortir à Toulouse" est né d'une idée simple : faciliter les rencontres et la découverte d'activités dans la magnifique Ville Rose. Que vous soyez nouveau à Toulouse, étudiant, touriste de passage ou Toulousain de longue date, notre plateforme a pour but de vous aider à trouver des événements qui vous ressemblent et à vous connecter avec des personnes qui partagent vos centres d'intérêt.
            </p>
            <p>
              Notre mission est de créer une communauté vivante et bienveillante où chacun peut proposer ou participer à des sorties, qu'il s'agisse d'un concert, d'une randonnée, d'un atelier créatif ou d'un simple verre en terrasse. Nous croyons que les plus belles expériences naissent des rencontres et du partage.
            </p>
            <p>
              Rejoignez-nous pour explorer tout ce que Toulouse a à offrir et pour construire ensemble une communauté plus connectée et solidaire.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
